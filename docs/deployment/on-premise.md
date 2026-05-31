---
id: on-premise
title: On-Premise Deployment
sidebar_label: On-Premise
---

On-premise deployment means Athena runs inside infrastructure controlled by the customer, typically a Kubernetes cluster in the customer's data center or private cloud. This model is important for regulated organizations that cannot send datasets, model artifacts, or operational logs to a vendor-managed environment. Athena's recommended on-premise packaging path is Helm.

## Target architecture

The Helm chart installs three primary workloads:

- backend API
- frontend web UI
- optional feature store worker

The backend exposes FastAPI endpoints, training orchestration, model registry operations, audit logging, and feature store APIs. The frontend serves the browser application. The feature store worker runs background materialization or online-store synchronization work when enabled.

Screenshot placeholder: Kubernetes architecture diagram with Ingress, frontend Service, backend Service, feature worker, persistent volume, optional Redis, optional Postgres, and optional local Ollama.

## Prerequisites

Minimum prerequisites:

- Kubernetes 1.27 or newer
- Helm 3.x
- container images for Athena backend and frontend
- a default StorageClass or an existing PersistentVolumeClaim
- an Ingress controller if public or internal HTTP routing is required
- TLS certificate management through the customer's standard process
- strong secrets for authentication and preferences encryption

For production-scale installations, customers should provide Redis and Postgres. Redis is an in-memory data store often used for low-latency queues or online values. Postgres is a relational database suitable for durable registry and metadata storage.

## Quick install

Create `custom-values.yaml`:

```yaml
image:
  backend:
    repository: registry.example.com/athena-backend
    tag: v1.0.0
  frontend:
    repository: registry.example.com/athena-frontend
    tag: v1.0.0

auth:
  enabled: true
  jwtSecret: "replace-with-strong-random-secret"
  bootstrapSecret: "replace-with-strong-random-bootstrap-secret"

prefs:
  secret: "replace-with-strong-random-prefs-secret"

ingress:
  enabled: true
  host: athena.customer.local
  tls:
    enabled: true
    secretName: athena-tls

corsOrigins:
  - https://athena.customer.local
```

Install:

```bash
helm install athena ./charts/athena --values custom-values.yaml
```

Check:

```bash
helm status athena
kubectl get pods -l app.kubernetes.io/name=athena
kubectl get svc -l app.kubernetes.io/name=athena
```

## On-premise local LLM

Some customers require that LLM calls remain inside their network. LLM means large language model. In this case use the on-prem preset and configure a local Ollama endpoint:

```bash
helm install athena ./charts/athena \
  --values charts/athena/values-onprem.yaml \
  --values custom-values.yaml
```

```yaml
llm:
  provider: ollama
  baseUrl: http://ollama:11434
  model: llama3.1
```

This keeps LLM-assisted workflows private, assuming the local model and network policy are also controlled by the customer.

## Persistent data

The chart mounts persistent storage at `/data`. Athena uses this path for mutable state:

- `/data/uploads`
- `/data/model_registry`
- `/data/audit/audit.jsonl`
- `/data/monitoring/history.jsonl`
- `/data/db/athena_jobs.db`
- `/data/db/athena_prefs.db`
- `/data/db/athena_decisions.db`
- `/data/db/athena_feature_store.db`
- `/data/feature_store`

For pilots, SQLite-backed files on persistent volume may be acceptable. SQLite is a file-based relational database. For multi-user production, prefer Postgres/Redis where the Helm values support them.

## Upgrade and rollback

Preview:

```bash
helm template athena ./charts/athena --values custom-values.yaml
```

Upgrade:

```bash
helm upgrade athena ./charts/athena --values custom-values.yaml
```

Rollback:

```bash
helm history athena
helm rollback athena <REVISION>
```

Run smoke tests after every install, upgrade, or rollback. A Helm release that applies successfully is not enough; the application must also answer health checks, enforce auth behavior, and respect CORS.

For regulated environments, also record the chart version, image tags, values file checksum, Kubernetes namespace, and operator name in the deployment evidence. This makes later incident review and vendor risk review much easier.

---
id: installation
title: Installation
sidebar_label: Installation
---

Athena can be installed for local evaluation with Docker Compose, for customer-owned Kubernetes clusters with Helm, or for local developer work with separate backend and frontend processes. This page defines the installation paths and the minimum secrets a secure deployment needs. Docker Compose means a single-machine container runtime managed by `docker compose`. Helm means the Kubernetes package manager used to install and upgrade applications from charts.

## Choose an installation path

Use Docker Compose when you want the fastest packaged-product evaluation on a laptop or demo VM. It starts the backend API, frontend UI, and reverse proxy using the repository deployment files. Use Helm when Athena is going into a customer cluster, because Helm gives you repeatable values files, Kubernetes Services, Ingress, persistent volumes, and upgrade/rollback commands. Use local development mode only when changing Athena code.

Screenshot placeholder: terminal running `make compose-up`, browser open on Athena dashboard, and backend health endpoint returning `status=ok`.

## Local developer mode

From the Athena application repository:

```bash
make dev
```

This starts the FastAPI backend, waits for `/api/health`, and then starts the Next.js frontend. FastAPI is the Python web framework that exposes Athena's API. Next.js is the React framework that serves the browser UI.

Open:

```text
Frontend: http://localhost:3000
Backend API docs: http://localhost:8000/docs
```

If the default ports are busy:

```bash
BACKEND_PORT=8010 FRONTEND_PORT=3010 make dev
```

If old development processes are still running:

```bash
make dev-stop
ATHENA_DEV_KILL_PORTS=1 make dev
```

## Docker Compose product mode

Docker Compose is the simplest way to run Athena as a packaged application without Kubernetes:

```bash
make docker-build
make compose-up
make compose-smoke
```

Stop the stack:

```bash
make compose-down
```

Compose is appropriate for local demonstrations and isolated pilots. It is not the preferred long-term enterprise deployment model because high availability, storage lifecycle, ingress, and secret rotation are easier to manage in Kubernetes.

## Helm installation

For Kubernetes 1.27+ and Helm 3.x:

```bash
helm install athena ./charts/athena --values custom-values.yaml
```

Minimal customer values:

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

Check status:

```bash
helm status athena
kubectl get pods -l app.kubernetes.io/name=athena
kubectl get svc -l app.kubernetes.io/name=athena
```

## Required secrets

Athena should not run in production without explicit secrets. `ATHENA_JWT_SECRET` signs JSON Web Tokens, which are compact authentication tokens used by the API. `ATHENA_AUTH_BOOTSTRAP_KEY` controls initial token issuance or bootstrap access. `ATHENA_PREFS_SECRET` encrypts stored provider preferences such as LLM API keys. LLM means large language model; Athena can use providers such as OpenAI, Gemini, Azure, Anthropic, DeepSeek, or local Ollama depending on configuration.

For on-premise use with a local LLM:

```yaml
llm:
  provider: ollama
  baseUrl: http://ollama:11434
  model: llama3.1
```

## Smoke test after installation

Run:

```bash
BACKEND_URL=https://athena.customer.local \
FRONTEND_URL=https://athena.customer.local \
ALLOWED_ORIGIN=https://athena.customer.local \
scripts/deploy_smoke.sh
```

The smoke test checks API health, frontend reachability, login failure behavior, brute-force rate limiting, and CORS. CORS means Cross-Origin Resource Sharing, the browser policy that decides which origins may call the API.

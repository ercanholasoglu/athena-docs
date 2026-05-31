---
id: backup-recovery
title: Backup & Recovery
sidebar_label: Backup & Recovery
---

Backup and recovery procedures define how Athena state is preserved and restored after accidental deletion, infrastructure failure, bad deployment, or operator error. Backup means copying data to a separate durable location. Recovery means using those copies to restore service. RPO means recovery point objective, the maximum acceptable data loss measured in time. RTO means recovery time objective, the maximum acceptable time to restore service.

## What must be backed up

Athena stores mutable state under `/data` in the Kubernetes chart and VM deployment. The important paths are:

- `/data/uploads`
- `/data/model_registry`
- `/data/audit/audit.jsonl`
- `/data/monitoring/history.jsonl`
- `/data/db/athena_jobs.db`
- `/data/db/athena_prefs.db`
- `/data/db/athena_decisions.db`
- `/data/db/athena_feature_store.db`
- `/data/feature_store`
- `/data/outcome_cache`
- `/data/feedback/feedback.jsonl`
- `/data/tokenops/calls.jsonl`

The model registry stores exported model artifacts. Audit logs store user and system activity. Preferences DB stores encrypted provider configuration. Decision DB stores model-run decisions. Feature store DB stores feature definitions and materialized feature metadata. Losing any of these can break auditability even when the UI still loads.

Screenshot placeholder: operations diagram showing `/data` volume, backup job, object storage bucket, restore target, and smoke test step.

## Recommended backup policy

For a regulated customer pilot:

- backup `/data` at least daily
- keep at least 30 days of backups
- encrypt backups at rest
- restrict backup read access to platform administrators
- test restore before the first customer demo

For production:

- define RPO and RTO with the customer
- snapshot persistent volumes daily or more frequently
- ship audit logs to central logging where required
- back up Postgres and Redis separately if using external stores
- document who can restore data and who approves restore

## VM backup example

If Athena runs on a VM with `/data`, copy data to object storage with a scheduled job:

```bash
sudo tar -czf /tmp/athena-data-$(date +%Y%m%d%H%M%S).tar.gz /data
gsutil cp /tmp/athena-data-*.tar.gz gs://athena-backups-prod/
```

This is a simple pattern, not a full enterprise backup system. Replace it with the customer's approved backup platform when deploying on-premise.

## Kubernetes backup example

For Kubernetes, use the customer's standard persistent-volume snapshot tool or backup platform. Before restore, identify the release:

```bash
helm status athena
kubectl get pvc -l app.kubernetes.io/name=athena
```

Scale down workloads:

```bash
kubectl scale deployment athena-backend --replicas=0
kubectl scale deployment athena-frontend --replicas=0
kubectl scale deployment athena-feature-worker --replicas=0
```

Restore the volume or database snapshot, then scale back up:

```bash
kubectl scale deployment athena-backend --replicas=1
kubectl scale deployment athena-frontend --replicas=1
```

## Restore validation

After restore, run:

```bash
BACKEND_URL=https://athena.customer.local \
FRONTEND_URL=https://athena.customer.local \
ALLOWED_ORIGIN=https://athena.customer.local \
scripts/deploy_smoke.sh
```

Then verify:

- old datasets are visible
- old jobs are visible
- model registry entries are visible
- audit log contains pre-restore events
- feature store definitions are present
- provider preferences can decrypt

If preferences fail to decrypt, check that `ATHENA_PREFS_SECRET` matches the original environment. That secret is part of the restore boundary.

## Operational warning

Do not treat a successful `helm rollback` as a data restore. Helm rollback changes Kubernetes manifests. It does not automatically restore `/data`, databases, or object storage. Application rollback and data recovery are separate procedures.

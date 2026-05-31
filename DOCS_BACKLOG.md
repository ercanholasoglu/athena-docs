# Athena Docs Backlog

Date: 2026-05-31  
Scope: Phase 6 documentation backlog for `docs.athenaml.app`.

This backlog lists the next customer-facing pages after the minimum viable documentation set. Each item includes the intended page, a one-sentence summary, likely source material, and estimated writing effort. Effort assumes a useful first version with concrete commands, implementation caveats, and screenshots or screenshot placeholders where relevant.

## Priority Bands

- **P0:** Needed before a serious customer security, architecture, or deployment review.
- **P1:** Needed before broader pilot onboarding.
- **P2:** Useful for maturity, support scale, and product education.

## Backlog

| Priority | Route | Title | Summary | Source material | Effort |
|---|---|---|---|---|---|
| P0 | `/deployment/helm-chart` | Helm Chart Deployment | Document the Helm chart install path, values files, storage options, probes, ingress, and on-prem presets for customer Kubernetes clusters. | `charts/athena/README.md`, `HELM_DESIGN.md`, `HELM_DISCOVERY.md` | 1.5 days |
| P0 | `/deployment/environment-variables` | Environment Variables | List and explain every `ATHENA_*` and frontend/backend environment variable, including auth, CORS, LLM, feature store, audit, storage, and preferences settings. | `deploy/docker-compose.yml`, `charts/athena/values.yaml`, `src/athena/config.py` | 1.5 days |
| P0 | `/security-compliance/audit-log` | Audit Log | Explain user action logs, model decision records, LLM traces, retention expectations, and how an auditor reconstructs a run. | `src/athena/api/routers/*audit*`, `src/athena/reasoning/*`, `AUDIT_REPORT.md` | 1 day |
| P0 | `/security-compliance/pii-data-handling` | PII Data Handling | Define PII handling across dataset upload, training, reports, LLM calls, logs, exports, and masking expectations. | `AUDIT_REPORT.md`, `FEATURE_STORE_AUDIT.md`, backend upload/report code | 1.5 days |
| P0 | `/security-compliance/kvkk-gdpr` | KVKK and GDPR | Map KVKK and GDPR concepts to Athena data retention, deletion, export, consent, processor responsibilities, and implementation gaps. | `AUDIT_REPORT.md`, data storage code, retention docs | 1.5 days |
| P0 | `/operations/monitoring` | Monitoring | Document health endpoints, metrics, log signals, alert examples, and what customers should monitor in Kubernetes or VM deployments. | `DEPLOY_AUDIT.md`, `SMOKE_TESTS.md`, server health endpoints | 1 day |
| P0 | `/operations/troubleshooting` | Troubleshooting | Provide the first responder guide for install, auth, CORS, LLM provider, feature store, training, and report generation failures. | Support findings, deploy scripts, existing run errors | 1.5 days |
| P0 | `/api-reference/openapi` | OpenAPI Reference | Publish generated OpenAPI output and explain how to regenerate it from the backend for each release. | `src/athena/api/server.py`, OpenAPI schema export command | 1 day |
| P0 | `/release-flow` | Release Flow | Explain branch, staging, release tag, production deployment, rollback, and smoke test discipline. | `RELEASE_FLOW.md`, `.github/workflows/*`, `scripts/restart_athena_vm.sh` | 1 day |
| P0 | `/deployment/staging-production` | Staging and Production Deployment | Describe the staging/prod split, DNS model, Caddy extension, release tag deploys, and operational guardrails. | `DEPLOY_DESIGN.md`, `DEPLOY_AUDIT.md`, `SMOKE_TESTS.md` | 1 day |
| P1 | `/getting-started/quick-tutorial` | Quick Tutorial | Give the shortest complete path from install to one trained model and one inspected decision trace. | Existing MVP pages, sample screenshots | 1 day |
| P1 | `/concepts/llm-trace` | LLM Trace | Define provider/model/prompt/response metadata, prompt hashes, redaction boundaries, and why traces matter for regulated review. | reasoning logs, LLM integration code, audit report | 1 day |
| P1 | `/concepts/validator-agent` | Validator Agent | Explain how Athena validates proposed decisions, detects leakage or bad contracts, and records accepted/rejected actions. | validator/reasoning code, job pipeline UI | 1 day |
| P1 | `/concepts/feature-store` | Feature Store | Explain feature registry, entities, feature views, services, materialization, online lookup, PIT correctness, and current maturity limits. | `FEATURE_STORE_AUDIT.md`, feature store backend code | 1.5 days |
| P1 | `/concepts/hddl` | HDDL | Describe Athena’s high-dimensional data layer for text, image, audio, and sequence workflows beyond tabular AutoML. | HDDL code, Phase 2 lab docs, Streamlit prototype | 1 day |
| P1 | `/deployment/private-cloud` | Private Cloud Deployment | Explain deploying Athena into a customer-owned cloud account with networking, ingress, storage, IAM, and support boundaries. | Helm docs, deployment design, customer architecture notes | 1 day |
| P1 | `/deployment/managed-cloud` | Managed Cloud Deployment | Explain the vendor-managed deployment option, shared responsibilities, update model, monitoring, and support boundaries. | `DEPLOY_DESIGN.md`, release flow docs | 1 day |
| P1 | `/operations/scaling` | Scaling | Document backend/frontend replicas, worker scaling, CPU/memory sizing, large dataset limits, and model training constraints. | Helm values, training pipeline code, resource observations | 1 day |
| P1 | `/tutorials/imbalanced-data` | Working With Imbalanced Data | Explain PR AUC, F1, recall, precision, threshold tuning, and why accuracy can mislead on rare-event datasets. | Porto Seguro runs, engineer summary examples | 1 day |
| P1 | `/tutorials/interpreting-shap` | Interpreting SHAP | Explain global and local SHAP usage, feature importance consensus, correlated feature caveats, and audit-friendly interpretation. | Explainability UI/code, sample reports | 1 day |
| P1 | `/tutorials/churn-prediction` | Churn Prediction | Walk through a customer churn model from dataset framing to decision trace and model registry promotion. | Demo dataset or synthetic scenario | 1.5 days |
| P1 | `/tutorials/text-classification` | Text Classification | Provide an HDDL/Text Studio tutorial for labeling, text feature extraction, model evaluation, and report interpretation. | HDDL/Text Studio implementation, Phase 2 prototypes | 1.5 days |
| P1 | `/sla` | SLA | Define managed-cloud and on-prem support targets, severity levels, response expectations, exclusions, and customer responsibilities. | Commercial/support policy notes | 0.75 day |
| P1 | `/support` | Support | Explain support channels, required ticket data, log collection, emergency escalation, and security issue reporting. | Release/smoke docs, support process notes | 0.75 day |
| P1 | `/changelog` | Changelog | Create a release-note page with version, date, features, fixes, breaking changes, and migration notes. | Git tags, commit history, release flow | 0.5 day |
| P2 | `/security-compliance/threat-model` | Threat Model | Describe major assets, trust boundaries, tenant/data separation assumptions, LLM egress risks, and control gaps. | `AUDIT_REPORT.md`, architecture docs | 1.5 days |
| P2 | `/security-compliance/sso-oidc-setup` | SSO/OIDC Setup | Provide an administrator setup guide for OIDC/SAML-style identity integration and role mapping expectations. | Auth router, login/sso implementation, env vars | 1.5 days |
| P2 | `/operations/backup-dr-runbook` | Disaster Recovery Runbook | Turn backup and recovery concepts into a command-level runbook with restore checks and RPO/RTO validation. | Backup docs, Helm values, storage paths | 1 day |
| P2 | `/operations/logging-retention` | Logging and Retention | Explain structured logging, retention targets, log rotation, sensitive-field handling, and customer SIEM export expectations. | logging code, deploy config, audit findings | 1 day |
| P2 | `/deployment/networking-ingress` | Networking and Ingress | Document service ports, ingress paths, TLS termination, CORS, network policy, and reverse proxy expectations. | Helm templates, Caddy config, deploy audit | 1 day |
| P2 | `/deployment/storage` | Persistent Storage | Explain dataset, model registry, audit, preferences, and feature store persistence paths with backup implications. | Helm PVC templates, storage code, feature store docs | 1 day |
| P2 | `/api-reference/auth` | Auth API Reference | Provide narrative examples for login, token refresh, wrong-credential lockout, rate-limit responses, and auth headers. | OpenAPI, auth router, smoke tests | 1 day |
| P2 | `/api-reference/training-jobs` | Training Jobs API Reference | Provide request/response examples for creating, listing, inspecting, and downloading training job artifacts. | OpenAPI, training routers, UI calls | 1 day |
| P2 | `/api-reference/feature-store` | Feature Store API Reference | Provide request/response examples for features, entities, views, services, training sets, online reads, and materialization. | OpenAPI, feature store router | 1 day |
| P2 | `/api-reference/datasets` | Datasets API Reference | Document dataset upload, inspection, metadata, deletion, and materialized dataset retrieval endpoints. | OpenAPI, dataset routers | 1 day |
| P2 | `/concepts/model-registry` | Model Registry | Explain registered models, versions, lineage, promotion, containerization, and rollback expectations. | model registry code, containerize docs | 1 day |
| P2 | `/concepts/agentic-rag` | Agentic RAG | Explain the planned documentation-aware assistant, retrieval boundaries, citation expectations, and governed answer behavior. | Phase 2 notes, docs chatbot plan | 1 day |
| P2 | `/tutorials/model-registry-promotion` | Promoting a Model | Walk through registering a champion model, reviewing lineage, exporting artifacts, and preparing deployment. | model registry UI/code | 1 day |
| P2 | `/tutorials/feature-store-training-set` | Feature Store Training Set | Walk through registering features, creating a feature service, materializing a training set, and inspecting lineage. | feature store implementation | 1.5 days |
| P2 | `/tutorials/local-llm-onprem` | Local LLM On-Prem | Show how to run Athena with Ollama or another local LLM provider in an on-prem environment. | Helm on-prem values, LLM provider config | 1 day |
| P2 | `/customer-evaluation/vendor-risk-checklist` | Vendor Risk Checklist | Provide a buyer-facing checklist for security, compliance, operations, deployment, and data governance evaluation. | `AUDIT_REPORT.md`, BDDK mapping | 1 day |
| P2 | `/customer-evaluation/poc-plan` | POC Plan | Define a realistic two-to-four week proof-of-concept plan with entry criteria, success metrics, data needs, and exit criteria. | Sales/solution architecture notes | 1 day |

## Suggested Execution Order

1. Finish P0 security, deployment, operations, and API pages first.
2. Add P1 concept pages so customer reviewers understand Athena's decision architecture beyond the first 10 pages.
3. Add P1 tutorials for pilot enablement.
4. Fill P2 pages as the product and customer onboarding process matures.

## Definition of Done

Each page should meet these checks before merge:

- 500+ words unless the page is intentionally reference-like.
- Includes concrete commands, routes, or API examples where relevant.
- Labels planned or partial functionality honestly.
- Defines BDDK, KVKK, GDPR, PII, RPO, RTO, SSO, OIDC, SHAP, and similar terms on first use.
- Has at least one screenshot placeholder if the page explains UI behavior.
- Passes `npm run typecheck`, `npm run build`, and `npm audit --audit-level=high`.

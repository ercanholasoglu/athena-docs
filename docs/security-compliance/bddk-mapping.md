---
id: bddk-mapping
title: BDDK Mapping
sidebar_label: BDDK Mapping
---

BDDK is Turkey's Banking Regulation and Supervision Agency. A BDDK-regulated bank evaluating Athena will care about outsourcing risk, information systems controls, auditability, data governance, model risk management, and operational resilience. This page maps Athena capabilities and current operational requirements to those themes. It is not legal advice; it is an implementation-oriented control map for vendor and architecture review.

## Why Athena needs a BDDK view

Machine-learning platforms can create risk even before a model is deployed. They process sensitive datasets, create derived features, call external or internal LLM providers, store model artifacts, and influence business decisions. BDDK-facing reviewers will ask whether these steps are controlled, logged, reproducible, and recoverable.

LLM means large language model. In Athena, LLMs may be used for feature rationale, report narration, or agentic assistance depending on configuration. When sensitive or personal data may reach an LLM provider, the deployment must define whether the provider is external, private cloud, or local on-premise.

Screenshot placeholder: compliance dashboard showing audit log, decision trace, model registry, data handling controls, and deployment environment.

## Model risk management

Model risk management means the process of controlling errors or misuse created by models. Athena supports this through:

- decision records for model and feature choices
- score sanity warnings for suspicious results
- model comparison tables
- threshold optimization reporting
- explainability outputs such as SHAP and permutation importance
- monitoring and retraining signals
- model registry and export path

SHAP means Shapley Additive Explanations, a method for estimating how features contribute to predictions. SHAP is useful, but reviewers should still check feature leakage, validation strategy, and business reasonableness.

## Audit trail

A bank reviewer should be able to ask, “Who or what made this decision?” Athena's decision architecture is intended to answer with:

- run ID
- dataset ID
- actor or agent name
- strict or exploratory mode
- approval state
- validator result
- LLM provider and model where applicable
- raw JSON payload for critical decisions

For the strongest audit posture, production deployments should preserve audit logs outside the application volume as well, for example in a central logging platform or write-once storage.

## Data governance

Data governance covers where data is stored, who can access it, how long it is retained, and how it is deleted or exported. Athena stores mutable state under `/data` in the Helm and VM deployment model. This includes uploads, model registry artifacts, audit logs, monitoring history, job databases, preferences database, decision database, and feature store data.

Customer policy should define:

- allowed datasets
- prohibited PII fields
- retention period
- backup retention period
- whether LLM calls may include row-level data
- who may export models or reports

PII means personally identifiable information, such as national ID numbers, emails, phone numbers, account numbers, or any data that identifies a person.

## Operational resilience

Operational resilience means Athena can be restored and operated predictably after failure. The minimum controls are:

- Helm-based installation
- persistent volume backup
- documented restore
- smoke tests after deploy and restore
- release-tag-only production deploy
- rollback command

Production should deploy only from release tags such as:

```bash
./scripts/restart_athena_vm.sh --env prod --version release/v1.0.0
```

Mutable `main` should deploy to staging only.

## Current implementation notes

Athena has improved secure defaults, authentication, CORS hardening, login rate limiting, dependency checks, and CI quality gates according to the audit response. Remaining procurement-level work may include immutable audit logging, deeper backup/DR evidence, DSAR support, Prometheus metrics, and vendor documentation packages. DSAR means data subject access request, a privacy request from a person asking to access, delete, or export their data.

## Review checklist

For a bank proof of concept, require:

- strict mode for candidate runs
- no identifier columns in features
- decision logs preserved
- LLM provider policy documented
- SSO enabled or local auth explicitly accepted
- audit log reviewed
- backup/restore tested
- production deploy gated by release tag and approval

This mapping should be reviewed with the bank's internal compliance, legal, and information security teams before production use.

---
id: credit-default-model
title: Credit Default Model Tutorial
sidebar_label: Credit Default Model
---

This tutorial shows an end-to-end Athena workflow for a credit default classification model. Credit default means a borrower fails to meet repayment obligations. Classification means the model predicts a class, for example `default` versus `no default`. The workflow is useful for first demos because it contains the problems that enterprise reviewers care about: class imbalance, feature governance, validation choice, score interpretation, decision trace review, and explainability.

## Goal

The goal is not to produce a production credit model in one click. The goal is to produce an auditable run that shows how Athena handles data inspection, training configuration, feature engineering, validation, model comparison, score sanity, and reporting. In regulated settings, especially banking, the audit trail is as important as the metric.

Screenshot placeholder: completed credit default job showing champion model, PR AUC, ROC AUC, confusion matrix, model comparison, and warning panel.

## Start Athena

For local development:

```bash
make dev
```

For Docker product mode:

```bash
make compose-up
make compose-smoke
```

Open:

```text
http://localhost:3000
```

If your environment is Kubernetes or VM-based, use the hostname provided by your administrator.

## Create or load the demo dataset

Athena includes a fast demo path:

```bash
curl -sS -X POST http://localhost:8000/api/demo/run \
  -H 'Content-Type: application/json' \
  -d '{"scenario_id":"credit_default","start_training":true,"mode":"fast"}'
```

If you use your own dataset, ensure it has:

- one binary target column
- no target leakage columns
- no direct identifiers as model features
- enough positive examples to evaluate recall and precision

Target leakage means the feature contains information that would not be available at prediction time or directly encodes the answer. Identifier columns such as `id`, email, account number, or row number usually do not represent real predictive signal and should be excluded from model features.

## Configure the run

In the training wizard:

1. Select the target column.
2. Choose classification.
3. Select strict mode if the run may be shared with risk or compliance reviewers.
4. Choose a validation strategy. Use random split only when rows are independent. Use time-aware or grouped validation if customers, accounts, branches, or periods can leak across splits.
5. Select candidate models such as logistic regression, XGBoost, LightGBM, or CatBoost.
6. Enable explainability if the result will be reviewed.

XGBoost, LightGBM, and CatBoost are gradient boosting model libraries. They can perform well on tabular data but require careful validation and leakage checks.

## Handle imbalance

Credit default data is often imbalanced. Imbalanced data means one class is much rarer than the other. For example, if only 3 percent of borrowers default, a model can achieve 97 percent accuracy by predicting “no default” for everyone. That model is useless for default detection.

Review these metrics:

- Precision: of predicted defaults, how many were true defaults?
- Recall: of actual defaults, how many did the model find?
- F1: harmonic mean of precision and recall.
- ROC AUC: ranking quality across thresholds.
- PR AUC: precision-recall area, often more useful for rare default events.

Do not promote a model based on accuracy alone.

## Review the decision trace

After the run completes, open the pipeline or decision view. Confirm:

- which models were allowed
- which feature selectors ran
- whether LLM-assisted features were created
- whether validators accepted or rejected proposals
- whether retries occurred
- whether score sanity found leakage
- whether the threshold was optimized for the metric you care about

If Athena flags identifier leakage, stop and rerun after excluding the identifier. Do not explain away the warning because the leaderboard looks acceptable.

## Read explainability outputs

Open explainability views such as SHAP, permutation importance, and model comparison. SHAP means Shapley Additive Explanations and helps estimate feature contribution. Permutation importance measures how much model performance changes when a feature is randomly shuffled.

Explainability is not proof of fairness or correctness. Use it to detect suspicious drivers, validate business intuition, and prioritize deeper review.

## Export evidence

Before sharing the result:

```text
Dataset ID: <copy from UI>
Run ID: <copy from UI>
Champion model: <copy from summary>
Validation strategy: <copy from config>
Primary metric: <copy from summary>
Warnings: <copy all score sanity warnings>
Decision records: <count from summary>
```

Export the engineer summary PDF if available. Keep the run ID with any business presentation so reviewers can trace claims back to raw decision records.

## Production readiness

A promising credit default run is not production-ready until:

- identifiers are excluded
- validation strategy matches the business timeline
- thresholds are calibrated for an approved operating point
- fairness and segment performance are reviewed
- monitoring plan exists
- rollback and retraining process are defined
- model owner approves promotion

This tutorial demonstrates the workflow; your organization's model risk policy decides whether the model may be used.

---
id: first-run
title: First Run
sidebar_label: First Run
---

This guide walks through the first successful Athena model run. A model run is the full workflow from dataset upload through inspection, configuration, feature engineering, training, evaluation, reporting, and review. The first run should be treated as a learning exercise, not as a production promotion. The goal is to understand how Athena records decisions and exposes warnings.

## 1. Open Athena

After installation, open the frontend:

```text
http://localhost:3000
```

or the environment URL provided by your administrator. In a customer cluster this may be an internal hostname such as:

```text
https://athena.customer.local
```

Screenshot placeholder: Athena home dashboard with navigation sections for Data, Train, Analysis, LLM/Agents, and Admin.

## 2. Upload or select a dataset

Go to the dataset area and upload a CSV file. CSV means comma-separated values, although Athena's smart loader can also detect delimiters and encodings in common tabular files. A good first dataset has one clear target column, a mix of numeric and categorical fields, and no direct identifiers in the feature set. An identifier is a column such as `id`, national ID, account number, email address, or unique transaction key that identifies a row rather than describing predictive behavior.

For a built-in product demo, use:

```bash
curl -sS -X POST http://localhost:8000/api/demo/run \
  -H 'Content-Type: application/json' \
  -d '{"scenario_id":"credit_default","start_training":true,"mode":"fast"}'
```

## 3. Configure target and task

Choose the target column, then choose the task. Classification means predicting a class such as default/no-default or churn/no-churn. Regression means predicting a numeric value. Athena detects some structure automatically, but the user remains responsible for confirming the business target and validation approach.

If the dataset has time, customer, account, branch, or group structure, avoid assuming that a random split is sufficient. A random split can overstate performance when related rows appear in both training and validation. Use grouped or time-aware validation when the business question requires it.

## 4. Choose strict or exploratory mode

Strict mode requires more explicit approval. Exploratory mode allows Athena to auto-approve semantic decisions such as feature proposals or retry suggestions. Semantic decisions are decisions that depend on meaning, not just numeric thresholds. For a regulated review, start with strict mode unless the run is clearly experimental.

Screenshot placeholder: training wizard showing strict vs exploratory mode, model whitelist, feature selection, and imbalance settings.

## 5. Run training

Start training and follow the job page. Athena logs stages such as data inspection, configuration, feature engineering, training, evaluation, and save/register. During the run, review:

- model whitelist decisions
- feature selection decisions
- LLM-assisted feature creation
- validator decisions
- retry decisions
- score sanity warnings

If Athena warns about identifier-like columns surviving feature selection, do not promote the model. Drop or move the identifier to metadata, then rerun.

## 6. Read the result

Do not look only at accuracy. In imbalanced data, where one class is much rarer than another, accuracy can be high while minority-class recall is poor. Review precision, recall, F1, ROC AUC, and PR AUC. PR AUC means area under the precision-recall curve and is often more useful than accuracy for rare positive classes.

Open the engineer summary and pipeline views. The engineer summary explains the champion model, model comparison, feature engineering, imbalance handling, threshold optimization, and operational caveats. The pipeline view shows decision nodes and raw JSON for audit.

## 7. Capture evidence

Before sharing results, capture:

- dataset ID
- run ID
- selected champion model
- validation strategy
- score sanity warnings
- decision records count
- LLM model/provider used for reports or feature reasoning
- generated reports or PDFs

This evidence is what separates a useful prototype from an auditable machine-learning workflow.

---
id: decision-architecture
title: Decision Architecture
sidebar_label: Decision Architecture
---

Decision architecture is Athena's system for making, checking, logging, and explaining the decisions that shape a model run. In a traditional AutoML tool, a user may see a final model and a leaderboard but not a complete explanation of how the system moved from raw data to champion model. Athena treats those intermediate choices as first-class evidence.

## What counts as a decision?

A decision is any recorded choice that changes the run outcome or helps explain why the outcome should be trusted or challenged. Examples include:

- which models were allowed by the model whitelist
- which feature selectors ran and with which thresholds
- which generated features were accepted or rejected
- whether a retry was proposed after a weak score
- whether imbalance handling was applied
- which threshold was selected for an operating metric such as F1
- which score sanity warnings were raised
- which report generator produced the engineer summary

An agent is a software component that performs a role in the workflow. Athena uses agents for tasks such as data inspection, feature engineering, validation, reporting, and auto-retry. The important point is not that an agent exists; the important point is that its decision should be visible and reviewable.

## Why this matters

Enterprise model reviews usually ask questions that a single score cannot answer. Why was this feature created? Was the validation split appropriate? Did the system use an identifier column? Was a large language model involved? Did a human approve the decision? Was the run exploratory or strict? Athena's decision architecture is designed to answer these questions without requiring engineers to reconstruct the workflow from logs after the fact.

Screenshot placeholder: Pipeline view with nodes for Auto-Retry, Feature Engineering, Validator, Model Whitelist, Training Contract, Champion Selection, and Score Sanity.

## Decision records and evidence

Decision records should include the decision type, actor, mode, approval state, payload, and raw JSON. Actor means the component or user responsible for the decision. Mode means strict or exploratory. Approval state shows whether the decision was manually approved, automatically approved, rejected, or only logged.

For LLM-assisted decisions, the evidence should include provider, model, prompt hash, response ID where available, and a redacted summary of the reasoning. LLM means large language model. A prompt hash is a fingerprint of the prompt so that auditors can verify consistency without exposing sensitive prompt content. Response ID is the provider-side identifier for the model response when the provider returns one.

## Validators

A validator is a checking component that reviews a proposed action or result before Athena treats it as reliable. Validators can inspect leakage risk, score sanity, configuration consistency, feature source columns, and whether the submitted UI contract was honored. A UI contract is the configuration the user submitted through the training wizard. Athena should not silently inject hidden model or selector parameters outside that contract.

## Score sanity is part of the architecture

A high score is not automatically good. If an identifier-like column survives feature selection, the score may reflect leakage rather than predictive signal. Leakage means information available during training would not be available or appropriate at prediction time. Athena flags such cases so users know not to trust the score as-is.

## How to use the decision architecture

After every serious run:

1. Open the pipeline view.
2. Review decision nodes.
3. Open raw JSON for critical decisions.
4. Compare engineer summary claims against decision records.
5. Confirm strict/exploratory mode.
6. Confirm score sanity warnings are resolved.
7. Export or preserve the run report before promotion.

Decision architecture does not make every model production-ready. It makes the path to the model visible enough that engineers, auditors, and business owners can decide what to fix before promotion.

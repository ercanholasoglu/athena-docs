---
id: strict-vs-exploratory
title: Strict vs Exploratory
sidebar_label: Strict vs Exploratory
---

Athena supports two operating styles: strict and exploratory. The distinction matters because it changes how much the system can auto-approve and how much evidence reviewers should expect before trusting a run. Strict mode is designed for governed workflows where human approval and explicit traceability matter. Exploratory mode is designed for fast investigation where the user accepts more automation in exchange for speed.

## Strict mode

Strict mode means Athena should behave conservatively. Semantic decisions should require approval or be clearly flagged when they are not approved. A semantic decision is a decision that depends on meaning or domain interpretation, such as accepting an LLM-generated feature rationale, changing imbalance strategy, or retrying with a stronger model set because the score is low.

Strict mode is appropriate when:

- the run may become a production candidate
- regulated data is involved
- a bank, insurer, or auditor will review the result
- feature creation must be explainable before training
- model risk management evidence is required

Model risk management means the governance process used to identify, measure, monitor, and control risks created by models. In a banking context, this includes development evidence, validation evidence, change control, limitations, monitoring, and approval trail.

## Exploratory mode

Exploratory mode allows Athena to auto-approve some semantic decisions. This is useful when the user is still learning the data, comparing approaches, or looking for quick feedback. For example, Athena may auto-approve a retry suggestion or create candidate features without asking for a manual step every time.

Exploratory mode is appropriate when:

- the goal is research or triage
- the dataset is non-sensitive or synthetic
- speed matters more than governance
- the user will rerun in strict mode before promotion

Exploratory mode does not mean unlogged. Athena should still record decisions, alternatives, LLM calls, validators, and raw JSON. The difference is that approval may be automatic rather than manual.

Screenshot placeholder: training wizard showing `STRICT`, `EXPLORATORY`, and `EXPLAINABLE` badges near a completed run.

## Compliance tradeoff

The practical compliance tradeoff is simple: exploratory mode can produce useful insights faster, but strict mode produces stronger evidence. For a customer demo, exploratory mode is acceptable if the purpose is to demonstrate capability. For a bank proof of concept, strict mode should be used for any model that will be discussed as a candidate for deployment.

BDDK is Turkey's Banking Regulation and Supervision Agency. BDDK-regulated institutions typically need to show that outsourced technology and model-related processes are controlled, auditable, and aligned with internal risk management. Strict mode is the better default for that audience because it reduces ambiguity about who or what approved a decision.

## How to review mode after the run

After training, reviewers should check:

- the mode badge on the job page
- decision records where `auto_approved` is true or false
- the `mode_when_approved` field in raw JSON
- whether LLM-assisted feature creation was enabled
- whether retries changed the model set or hyperparameter budget
- whether any warning says the score should not be trusted

If a model was trained in exploratory mode and looks promising, treat it as a candidate only. Rerun with strict mode, explicit feature exclusions, fixed validation strategy, and documented approvals. This creates a cleaner promotion record.

## Recommended policy

Use this default policy:

- Exploratory mode for discovery and demos.
- Strict mode for proof-of-concept results shared with customer risk teams.
- Strict mode for any run that may be registered, exported, or deployed.
- Strict mode when LLM-generated features are enabled on sensitive data.

This policy gives teams the speed of Athena during early work without losing the governance discipline needed for enterprise adoption.

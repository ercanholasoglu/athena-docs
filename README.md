# Athena Docs

Customer-facing documentation site for Athena, intended to be served from `https://docs.athenaml.app`.

## Stack

This repository uses Docusaurus v3. The stack was selected because Athena needs a developer-friendly documentation site with versioning, future i18n support, customer-facing polish, and room for React/MDX customization.

## Local Development

```bash
npm install
npm run start
```

Build the static site:

```bash
npm run build
```

Serve the built site locally:

```bash
npm run serve
```

## Repository Boundary

This repository is intentionally separate from the Athena application repository. Documentation can be updated, reviewed, and deployed independently from product code releases while still linking to release-specific Athena versions.

## Source Material

Initial content should be migrated from:

- Athena `README.md`
- Athena `docs/`
- `DEPLOY_AUDIT.md`
- `DEPLOY_DESIGN.md`
- `RELEASE_FLOW.md`
- `SMOKE_TESTS.md`
- `FEATURE_STORE_AUDIT.md`
- Helm chart documentation under `charts/athena/`

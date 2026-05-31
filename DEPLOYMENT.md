# Deploying Athena Docs

The docs site is a Docusaurus static site intended to be served from:

```text
https://docs.athenaml.app
```

## Deployment Target

The first deployment target is GitHub Pages.

Reason:

- Docusaurus produces static files.
- GitHub Pages gives simple HTTPS hosting.
- Push to `main` can deploy automatically through GitHub Actions.
- The docs repository can remain independent from the Athena application release flow.

## GitHub Repository

Expected repository:

```text
ercanholasoglu/athena-docs
```

Create and push:

```bash
gh repo create ercanholasoglu/athena-docs --private --source=. --remote=origin --push
```

If the repository already exists:

```bash
git remote add origin git@github.com:ercanholasoglu/athena-docs.git
git push -u origin main
```

## GitHub Pages Settings

In the GitHub repository:

1. Go to Settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Confirm the custom domain is `docs.athenaml.app`.
5. Enable "Enforce HTTPS" after DNS resolves correctly.

The repository includes:

```text
static/CNAME
```

Docusaurus copies this into the build output so GitHub Pages knows the custom domain.

## DNS

At the DNS provider, create:

```text
docs.athenaml.app  CNAME  ercanholasoglu.github.io
```

If Cloudflare is used, start with DNS-only mode until GitHub Pages verifies the domain and issues HTTPS. After verification, Cloudflare proxy can be evaluated separately.

## CI/CD

The workflow is:

```text
.github/workflows/deploy-pages.yml
```

On every push to `main`, it:

1. installs dependencies with `npm ci`
2. runs `npm run typecheck`
3. runs `npm audit --audit-level=high`
4. runs `npm run build`
5. uploads the `build/` artifact
6. deploys to GitHub Pages

## Verification

After DNS and Pages are active:

```bash
curl -I https://docs.athenaml.app
curl -fsS https://docs.athenaml.app | grep -i "Athena Documentation"
```

Expected:

- HTTP 200
- valid TLS certificate
- page body contains Athena documentation content

## Current Manual Blockers

- GitHub Pages must be enabled with source `GitHub Actions`.
- DNS must point `docs.athenaml.app` to `ercanholasoglu.github.io`.
- The domain currently does not return a valid Athena Docs page until those steps are complete.

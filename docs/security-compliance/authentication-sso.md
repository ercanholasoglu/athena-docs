---
id: authentication-sso
title: Authentication & SSO
sidebar_label: Authentication & SSO
---

Authentication is the process of proving who a user is. Authorization is the process of deciding what that user may do. Athena supports local authentication for controlled deployments and an SSO-oriented architecture for enterprise identity providers. SSO means single sign-on, where a user signs in through a corporate identity provider such as Microsoft Entra ID, Okta, Google Workspace, or Keycloak.

## Local authentication

Athena's API uses JWTs for authenticated sessions. JWT means JSON Web Token, a signed token containing claims such as subject, role, and expiry. In production, authentication should be enabled and secrets must be strong.

Important environment variables:

```text
ATHENA_AUTH_ENABLED=1
ATHENA_JWT_SECRET=<strong-random-secret>
ATHENA_AUTH_BOOTSTRAP_KEY=<strong-random-bootstrap-key>
ATHENA_PREFS_SECRET=<strong-random-prefs-secret>
```

`ATHENA_PREFS_SECRET` is included here because provider preferences and API keys are security-sensitive. It is used to encrypt stored preferences.

Screenshot placeholder: Admin Settings screen showing authentication enabled, SSO settings, user list, and role assignment.

## Roles

RBAC means role-based access control. Athena's common roles are:

- `admin`: can manage settings, users, providers, and administrative areas
- `analyst`: can run workflows and review model outputs
- `viewer`: can inspect outputs without making operational changes

The exact permission model should be reviewed with the customer before production use. Do not assume IdP groups are direct Athena permissions. They should be mapped into Athena roles.

## OIDC SSO model

OIDC means OpenID Connect, an identity protocol built on OAuth 2.0. Athena's enterprise SSO design expects an OIDC issuer. The issuer can be the customer's identity provider directly or a broker such as Keycloak that federates to Azure AD, Okta, Google Workspace, LDAP, or Active Directory.

Required values:

- issuer URL
- client ID
- client secret
- redirect URI
- group claim name
- group-to-role mapping

Example issuer URL for Microsoft Entra ID:

```text
https://login.microsoftonline.com/<tenant-id>/v2.0
```

Example redirect URI:

```text
https://athena.customer.local/login/sso/callback
```

## Group-to-role mapping

Athena should map identity-provider groups into Athena roles. For example:

```text
athena-admins -> admin
athena-analysts -> analyst
athena-viewers -> viewer
```

If a user belongs to multiple groups, use the highest privilege role according to a documented order, typically `admin > analyst > viewer`. If no mapping matches, default to the lowest safe role or deny access depending on customer policy.

## Helm SSO configuration

Example:

```yaml
sso:
  enabled: true
  issuerUrl: https://idp.example.com
  clientId: athena
  clientSecret: "replace-with-client-secret"
  redirectUri: https://athena.customer.local/login/sso/callback
  groupRoleMap: "admins=admin,analysts=analyst,viewers=viewer"
```

Store `clientSecret` in the customer's secret management system where possible. Avoid committing secrets in values files.

## Security review checklist

Before a customer pilot:

- authentication enabled
- JWT secret strong and not a default value
- bootstrap key strong and rotated after initial setup
- local login disabled if corporate SSO is mandatory
- SSO redirect URI matches the deployed hostname
- group claim verified with a real user
- admin group mapped explicitly
- audit log records login success and failure
- repeated failed login attempts return HTTP 429

This checklist is not a substitute for the customer's security review, but it gives implementation teams a concrete baseline.

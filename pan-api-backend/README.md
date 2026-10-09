# AJ Digital Point PAN API Backend — Scaffold

**Status: scaffold only; not deployed; no provider API is connected.** This service intentionally refuses PAN-related requests until written provider authorization, approved API documentation/credentials, an authenticated staff/customer workflow, and a security review are completed.

## Included baseline controls
- Helmet security headers and disabled Express fingerprint header.
- Explicit single-origin CORS allowlist.
- JSON request size limit and request rate limit.
- No-store responses for API routes.
- No PAN lookup, application submission, OTP, document-upload or payment endpoints.
- Generic error responses; no request bodies or identifiers logged.
- Provider integration defaults to disabled.

## Local setup
1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env` locally. Never commit `.env`.
3. Run `npm install`, then `npm run check`, then `npm start`.
4. Check `GET /health` and `GET /api/provider/status`. All `/api/pan/*` paths deliberately return HTTP 503.

## Before any real provider integration
1. Contact the chosen provider using its official business/partner channel and obtain written authorization for the exact service and use case.
2. Obtain provider API documentation, sandbox access, production approval and permitted-use terms directly from the provider.
3. Choose and configure a backend host with HTTPS, secret manager, access logs, monitoring, backups and incident response. GitHub Pages is static hosting and cannot host this Node backend.
4. Configure provider credentials in the host's secret manager—not in GitHub, source files, frontend JavaScript, or chat.
5. Add authenticated and role-limited access, CSRF protection where cookie sessions are used, provider signature/token validation, idempotency, audit events that exclude sensitive values, retention/deletion controls, and security testing based on provider docs.
6. Review applicable Indian privacy/data protection requirements and publish the actual business contact/grievance channel before collecting any customer data.
7. Test with provider-approved sandbox data and obtain production go-live approval.

## Important
- `PAN_PROVIDER_ENABLED=true` is only a configuration flag. It does not create authorization, validate credentials, or turn on any PAN endpoint.
- Do not collect real Aadhaar/PAN numbers, OTPs, documents, or payments through this scaffold.
- This code is not a substitute for a security audit or provider approval.

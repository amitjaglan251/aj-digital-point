# Secure deployment checklist (Render Web Service)

This backend scaffold is intentionally not connected to a provider. Deploying it only makes health/status endpoints available; all PAN routes remain disabled.

## Why Render is the initial hosting recommendation
The current project is a Node.js/Express server. A Render Web Service supports Node.js/Express, reads the PORT environment variable, and lets you configure secrets in its dashboard. GitHub Pages cannot run this server-side process. Review current plans and limitations before choosing a plan; a free service may sleep after inactivity and is not a production recommendation for sensitive-data workflows.

Official docs:
- Web Services: https://render.com/docs/web-services
- Environment Variables and Secrets: https://render.com/docs/configure-environment-variables
- First Deploy: https://render.com/docs/your-first-deploy

## Deploy the disabled scaffold
1. Sign in to Render and connect the GitHub repository through Render's official flow.
2. Create **New → Web Service** and select this repository.
3. Set the branch to `feat/pan-secure-backend-scaffold` for initial review (do not deploy the main website as the API service).
4. Set **Root Directory** to `pan-api-backend`.
5. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
6. Set **Health Check Path** to `/health`.
7. Set environment variables in the Render dashboard:
   - `NODE_ENV=production`
   - `ALLOWED_ORIGIN=https://amitjaglan251.github.io`
   - `PAN_PROVIDER_ENABLED=false`
   - `PAN_PROVIDER_NAME=unconfigured`
8. Deploy and confirm `/health` responds with status ok and `/api/provider/status` says integration is disabled. Requests under `/api/pan/*` should return HTTP 503.
9. Do not add provider secrets yet. No provider API credentials are needed for this disabled scaffold.

## Before production customer-data use
- Obtain provider's written authorization for the exact service and use case; verify eligibility and contract terms.
- Obtain official documentation and sandbox credentials through the provider's verified channel.
- Add authentication and role-based access for any protected staff/customer workflow, provider-specific request signing, replay/idempotency controls, audit logging that excludes sensitive values, and documented retention/deletion controls.
- Complete threat modelling, dependency scanning, security testing, privacy/legal review, incident response and restore testing.
- Store secrets only in the hosting provider's secret manager. Never commit `.env`, credentials, private keys, PAN/Aadhaar data, OTPs, or real customer files.
- Do not set `PAN_PROVIDER_ENABLED=true` just to test. That flag alone does not implement or authorize any provider integration.
- Use a paid/appropriate production service with required reliability, monitoring and access controls before any real sensitive workflow. Confirm current pricing directly with the host before creating billable resources.

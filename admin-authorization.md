# AJ DIGITAL POINT — Admin Authorization

The PAN admin dashboard uses Firebase Authentication for sign-in, but Google sign-in alone must NOT be treated as proof of admin authority.

## Production requirement

Use Firebase Authentication + custom claims (for example `admin: true`) or a trusted backend/Cloud Function to authorize staff. Firestore rules should check the admin claim before allowing reads or status updates on `serviceRequests`.

Do not place a service-account private key in this GitHub repository or in browser JavaScript.

## Recommended rollout

1. Enable the required sign-in provider in Firebase Authentication.
2. Create the intended staff account.
3. From a trusted server/admin environment, assign the `admin: true` custom claim to that account.
4. Publish Firestore rules that allow `serviceRequests` reads/updates only when `request.auth.token.admin == true`.
5. Test with the staff account and a non-admin account.
6. Keep customer creation limited to authenticated/approved request flow and never expose the whole request collection publicly.

This repository intentionally does not include a service-account credential or a hard-coded administrator email.
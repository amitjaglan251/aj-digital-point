# Official Notice Verification Progress — Batch 24
Checked: 10 October 2026

## Scope
This batch continues the one-by-one audit of existing records in `central-jobs.js`. It does not add records or assume the total has changed.

## Records updated

### 1. DRDO PXE Balasore Apprentices 2026–27
- Dataset ID: `drdo-pxe-apprentice-2026`
- Official notice page: https://drdo.gov.in/drdo/en/offerings/vacancies/pxe-balasore-invites-eligible-candidates-engagement-apprentices-under
- Official PDF: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtPXE23092026.pdf
- Advertisement: `PXE/HRD/AT/01/2026-27`
- Official listing date window: 23/09/2026–12/10/2026.
- Checked record fields: 49 seats (15 Graduate Apprentice + 34 Technician Apprentice), discipline split, 2022–2026 pass-out window, regular-mode qualification, NATS requirement, monthly stipend (₹12,300 Graduate; ₹10,900 Technician), postal submission route and no-fee wording.
- Age: no fixed numeric age cutoff found in the notice reviewed; record explicitly says so instead of inventing one.
- Outcome: specific official URL and field-level verification note committed.

### 2. DRDO DIPR Delhi ITI Apprentices 2026
- Dataset ID: `drdo-dipr-iti-apprentice-2026`
- Official notice page: https://drdo.gov.in/drdo/en/offerings/vacancies/dipr-delhi-invites-eligible-candidates-engagement-iti-pass-out-apprentices
- Official PDF: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtDIPR22092026.pdf
- Advertisement: `0675/Apprentice/DIPR/Adm`
- Official listing date window: 22/09/2026–13/10/2026.
- Checked record fields: 24 seats, trade-wise split (1 + 2 + 2 + 1 + 14 + 2 + 2), reservation split, stated trade-wise stipend rates, portal/email application route, 12-month duration and no-fee wording.
- Age/correction window: no numeric cutoff/correction window stated in the reviewed notice; record says this rather than guessing.
- Outcome: specific official URL and field-level verification note committed.

### 3. DRDO / IIT (BHU) Director, DIA-CoE
- Dataset ID: `drdo-director-dia-coe-2026`
- Official DRDO page: https://drdo.gov.in/drdo/en/offerings/vacancies/advertisement-post-director-dia-coe-bhu
- Host institution positions page: https://iitbhu.ac.in/positions
- Confirmed: IIT (BHU) Varanasi institution wording; published/open date 30/09/2026; closing date 30/10/2026.
- Still pending: direct advertisement/form inspection for qualifications, experience, remuneration and required documents. Record is explicitly **not fully verified**.

## Official source cross-check
The DRDO vacancy listing shows PXE, DIPR, DIA-CoE, GTRE, DMRL, CAIR and RCI entries with the relevant advertisement numbers and listing dates. The DIA-CoE item links to IIT (BHU) Varanasi's positions page. Source: https://drdo.gov.in/drdo/offerings/vacancies

## Commits
- PXE and DIPR correction commit: https://github.com/amitjaglan251/aj-digital-point/commit/cbed782884f49709126d331c31178666dc9d4a7f
- DIA-CoE institution/source correction commit: https://github.com/amitjaglan251/aj-digital-point/commit/6031f279696513e89a0090b0bdb46cdb5193fbdf

## Inventory and deployment status
- `central-jobs.js` still contains **371 records**.
- This batch individually updated two records to specific official notice links and field-level verification notes, plus corrected the DIA-CoE institution/source fields while leaving detailed criteria pending.
- Latest Pages deployment and browser-verification runs for the newest commit were queued at the time of checking. An earlier Pages build for the PXE/DIPR commit completed successfully, but the newest commit has not yet been confirmed live.
- This batch is not a claim that all 371 records have been fully verified. Continue record-by-record; only mark fully verified when the primary advertisement itself supports the recorded fields.

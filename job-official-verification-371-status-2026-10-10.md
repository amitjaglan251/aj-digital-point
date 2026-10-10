# 371-Record Official Verification — Status Snapshot
Checked: 10 October 2026

## Verified inventory size
The current `central-jobs.js` parses to **371 records**. This is the actual current inventory; no 372nd record is assumed or fabricated.

## What this snapshot confirms
- Records present: **371**
- Records missing an `official` URL: **24**
- Records using only the generic DRDO homepage as `official`: **8**
- The dataset contains a mix of active vacancies, results/selected-candidate notices, and other recruitment-related items. Each item needs its own official source check and the correct record type/status.

## Important limitation
This is an inventory/data-quality check, **not** official-notice verification of all 371 records. A record is not fully confirmed merely because it has a URL or a verificationStatus string. Full verification requires opening the primary authority notice and comparing, where applicable:
1. exact post title and recruiting authority;
2. advertisement number and publication date;
3. vacancy count and category/post breakdown;
4. application start/closing dates, fee deadline and correction window;
5. education, experience, age cutoff and relaxations;
6. fee, selection process, exam/interview schedule and pay/stipend;
7. application/notification links and any cancellation, extension, result or corrigendum;
8. record status and whether it should appear as active, upcoming, expired, result, or archive.

## Immediate priority queue identified
- Replace generic official links for the eight DRDO-related records that still point to `https://drdo.gov.in/`, once the matching official notice page/PDF is confirmed.
- Resolve the 24 records with no primary official URL.
- Recheck records whose `verificationStatus` explicitly says some key fields have not yet been independently rechecked.
- Do not mark a record “fully verified” unless the primary source was inspected; retain “pending/unverified” where PDF/source access fails.

## Recent batch reports
- Batch 21 — DRDO ITR Chandipur Apprentices: https://github.com/amitjaglan251/aj-digital-point/blob/main/job-official-verification-batch-21-2026-10-10.md
- Batch 22 — DRDO MTRDC Bengaluru JRF: https://github.com/amitjaglan251/aj-digital-point/blob/main/job-official-verification-batch-22-2026-10-10.md
- 371-record inventory audit: https://github.com/amitjaglan251/aj-digital-point/blob/main/job-one-pass-audit-371-records-2026-10-10.md

## Completion criterion
The target is **371/371 individually checked**, with a source reference and field-by-field outcome for every record. This criterion is **not yet met**. This snapshot does not change `central-jobs.js` or claim that the live site is fully verified.

# Official Notice Verification — Batch 24
Checked: 10 October 2026

## Record corrected: ICMR-BMHRC Group B & C Direct Recruitment 2026
Dataset ID: `icmr-bmhrc-group-b-c-2026`

### Official source reviewed
BMHRC official advertisement index:
https://bmhrc.ac.in/content/Hindi/2532_1_Advertisement.aspx

The current official index lists other notices, including the Principal (Nursing College) post, rolling Senior Resident recruitment, faculty positions, and Medical Officer contract recruitment. It did **not** show a matching Group B & C recruitment under the dataset's stated `Advt. 01/BMHRC/Bhopal/2026`.

### Correction committed
- The record title now clearly says **UNVERIFIED**.
- Removed unsupported open/closing dates from the active date fields.
- Vacancy, qualification, age, fee, salary and selection details are explicitly unconfirmed.
- Linked the official BMHRC advertisement index.
- Verification status set to **HOLD**. Do not treat as an active or fully verified vacancy unless the exact official advertisement/corrigendum is located.

This avoids publishing a potentially mismatched recruitment notice as if confirmed.

## Additional primary-source checks: APPSC
Official recruitment index:
https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications

The official APPSC page lists the detailed notifications dated 06/10/2026 for:
- Notification 07/2026 — Group-I Services
- Notification 08/2026 — Assistant Environmental Engineer
- Notification 19/2026 — Horticulture Officer

The official APPSC homepage also lists the detailed notifications and application notices:
https://portal-psc.ap.gov.in/

However, automated retrieval of the APPSC site timed out during this check, so detailed PDF tables (vacancy/category roster, fees/exemptions and all post-specific conditions) were **not** independently transcribed. Those records remain **PARTIAL**, not fully verified. The Group-I vacancy total has a known public-summary conflict (163 vs 166); neither value is marked confirmed.

## Inventory integrity
- `central-jobs.js` remains at **371 records**.
- This batch does not add a fabricated record or mark an unverified item as verified.
- Batch 24 completion is limited to the BMHRC record being safely placed on hold and the APPSC official listing being rechecked; this is **not** completion of 371/371.

# Official Recruitment Verification — Batch 13
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings

| Dataset ID | Official source checked | Verified finding | Action |
|---|---|---|---|
| `rrb-04-2026-je-correction` | [RRB Chandigarh official employment-notice index](https://www.rrbcdg.gov.in/employment-notices.php) | The official index reviewed lists the current JE/DMS/CMA/CS/MS notice as CEN 05/2025, not a matching CEN 04/2026 Junior Engineer recruitment. A claimed 4,029 revised posts and 25/09/2026 correction deadline were not matched to an official notice in this pass. | **Hold/suppress the CEN 04/2026 record** until an exact official CEN and correction notice are identified. Do not merge it with CEN 05/2025. |
| `upsc-engineering-services-2026` | [UPSC Active Examinations](https://www.upsc.gov.in/examinations/active-exams); [UPSC What's New](https://www.upsc.gov.in/whats-new) | UPSC's official Active Examinations page lists “Engineering Services (Preliminary) Examination, 2027”. The exact notice/PDF was not retrievable in this pass, so the record's claimed 480 vacancies and 06/10/2026 closing time are **not independently confirmed here**. | Keep the official exam identity/link; mark vacancy count and exact application dates as pending PDF-level verification. Do not treat the exam name alone as proof of the other fields. |
| `india-optel-project-technician-2026` | [India Optel Limited official recruitment site](https://www.indiaoptel.in/) — exact advertisement PDF not retrieved in this pass | Existing audit data lists an advertisement closing on 03/10/2026. As of the audit date (10/10/2026), that deadline is in the past; the exact post-wise table and any extension/corrigendum were not re-established in this pass. | Display as closed only if the exact official advertisement confirms the date; verify any extension before finalizing status. Do not silently change the advertised vacancy total. |

## Batch status
Three records reviewed. One unsupported RRB JE 2026 identity should be held pending an exact official CEN. UPSC ESE (Preliminary) 2027 is confirmed as an official exam listing, but its vacancy and date fields remain pending notice/PDF verification. India Optel needs a final extension/status check.

## Audit limitation
This is an incremental batch, not a completed 371/371 notice-level audit. No live website code was changed by this report, and this file alone does not establish deployment status.

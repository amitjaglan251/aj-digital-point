# Official Recruitment Verification — Batch 3
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings and changes

| Dataset ID | Official source | Finding | Action |
|---|---|---|---|
| `bank-of-baroda-2482-lbo` | [Bank of Baroda — Local Bank Officer Recruitment](https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09) | Advertisement BOB/HRM/REC/ADVT/2026/16 lists 2,482 posts and an extended deadline of 17/09/2026. | Restored the record that had been hidden in the prior pass; corrected title, post, dates, vacancy, official/notice links and closed status. |
| `bank-of-baroda-1100-so-2026` | [WMS advertisement](https://bankofbaroda.bank.in/hi-in/career/current-opportunities/wealth-management-services-department-bob-hrm-rec-advt-2026-17) and [C&IC advertisement](https://bankofbaroda.bank.in/hi-in/career/current-opportunities/corporate-institutional-credit-department-bob-hrm-rec-advt-2026-17) | The 1,100 total combines two separate advertisements: 1,000 Wealth Management Services posts closing 16/10/2026 and 100 Corporate & Institutional Credit posts closing 01/10/2026. | Restored with explicit separate deadlines and direct department-specific official links. |
| `pgcil-apprentice-2026` | [POWERGRID official apprentice page](https://www.powergrid.in/en/rolling-advertisement-for-enagagement-of-apprentices) | Official page confirms application dates 25/08/2026–10/09/2026. | Added official notice link and marked closed. |
| `spmcil-assistant-manager` | [SPMCIL Latest Careers](https://www.spmcil.com/en/latest-careers/) | Matching official record is Advt. 02/2026 for Executive E-2/E-1 level posts, published 25/07/2026, listed closing date 31/08/2026 5:00 PM. Later notices/corrigenda are listed, but a reopening was not confirmed. | Corrected misleading post title and added official link; marked closed/pending any confirmed extension. |
| `aai-389-jr-executive-manager` | [AAI Recruitment Dashboard](https://www.aai.aero/en/careers/recruitment/Offical) | Official dashboard confirms Advertisement 12/2026/CHQ/DR-CBT, 389 posts, posted 22/07/2026, with subsequent exam/press-note updates. | Corrected title, post and links; marked partial because the exact closing date and every post-wise field still need detailed-PDF reconciliation. |
| `indian-overseas-bank-so` | [IOB official Specialist Officer PDF](https://www.iob.in/upload/CEDocuments/iobLateral-Recruitement-Specialist-Officers-11092025.pdf) | The matching notice found is dated 12/09/2025, Advertisement HRDD/RECT/03/2025-26, for 127 posts and closing date 03/10/2025—not the dataset's claimed September 2026 recruitment. | Removed the mismatched 2026 record pending a matching current official notice. |
| `csir-43-technician-1` | [CSIR official recruitment archive](https://www.csir.res.in/en/career-opportunities/recruitment/archive-recruitment) | The official archive lists different notices, including a CSIR Hqrs Group-II/Technician-I notice with one post; the exact 43-post record was not matched. | Hidden pending identification of the exact official notice; did not relabel a different recruitment as the same vacancy. |
| `kea-210-group-c-2026` | [KEA official portal](https://cetonline.karnataka.gov.in/kea/) | Secondary summaries report Notification ED/KEA/46/Rect/2026(KK), 210 posts and a 30/09/2026 closing date. The exact official PDF was not retrieved in this pass. | Official portal linked; record remains explicitly partial and closed, with post-wise details pending. |
| `mp-high-court-1174-assistant` | [MP High Court official site](https://mphc.gov.in/) | Published summaries report Advertisement 614/Exam/2026, 1,174 Assistant Grade-III posts and a 15/09/2026 deadline. The exact official PDF URL and all details were not fully reconciled in this pass. | Corrected title/dates and added the official portal; record remains partial pending exact-PDF verification. |

## What was changed
- Corrected the public runtime overrides and cache-busted both the Latest Jobs listing and Job Details page to load `job-data-quality-fixes.js?v=20261010-11`.
- Restored the two Bank of Baroda records after locating official pages; this corrects the earlier overly cautious removal.
- Added source-backed updates for POWERGRID, SPMCIL and AAI.
- Hid the IOB 2026 and CSIR 43-post entries because the matching official notices were not substantiated.

## Audit limitation
This batch does not complete the requested 371/371 notice-by-notice audit. Records marked **partial** must not be described as fully verified. For full verification, every field must be compared with the exact official advertisement and all relevant corrigenda, not just a careers page or a reachable URL.

## Live site and checks
- [Latest Jobs](https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html)
- [Job Details](https://amitjaglan251.github.io/aj-digital-point/job-details.html)
- [GitHub Actions — deployment/browser tests](https://github.com/amitjaglan251/aj-digital-point/actions)

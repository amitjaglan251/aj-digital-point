# Official Recruitment Data Corrections — Progress Batch 23
Checked: 10 October 2026

## Source-data inventory
- Current `central-jobs.js` still contains **371 records**.
- Missing `official` fields after this pass: **0**.
- Missing `notice` fields after this pass: **0**.
- Duplicate titles found by a normalized exact-title scan: **0**.
- Records whose verificationStatus still indicates incomplete/unverified work: **335**. These must not be described as fully verified.

## Changes committed to `central-jobs.js`
### DRDO records
- RCI Hyderabad apprenticeship: added the 195-seat split (50 Graduate, 30 Diploma, 115 ITI), dates, age/marks/pass-out criteria, registration-route summary and official PDF link.
- DMRL JRF: added the 18-post discipline split, reported stipend/age details and official advertisement PDF.
- CAIR JRF: added one Mathematics JRF, eligibility summary, stipend, email deadline and walk-in date from the official advertisement PDF.
- MTRDC JRF: replaced generic DRDO homepage with official vacancy listing URL; official listing confirms ad number and 16/09/2026–15/10/2026 dates. Several detailed fields remain marked as secondary-source corroboration pending independent PDF confirmation.
- DRL Tezpur and DGRE Chandigarh items reclassified as selection/result notices rather than new open recruitment notices.
- Director DIA-CoE record flagged because institution wording differs across DRDO pages.
- RCI duplicate-topic record flagged as a possible duplicate; it is not yet removed.

### Other recruitment records
- Added official authority links and verification notes for Bank of Baroda LBO, POWERGRID apprentices, SPMCIL executives, NGEL recruitment, CSIR Technician (1), and AAI 389-post recruitment.
- Added official recruitment/career portals and explicit pending/closed notes for Bank of Baroda SO, Indian Overseas Bank SO, Federal Bank Sales Officer, South Indian Bank roles, ITBP Medical Officer, DGQA Technician, IAF Non-Combatant, ICSI Executive Assistant, Army NCC Special Entry (men/women), BSEB STET, BGSSL, DPCC, KEA, Delhi Transco and MP High Court.
- Flagged discrepancies instead of silently choosing a value: BGSSL vacancy-count discrepancy (2,049 reported versus 1,949 in one post-wise table); SPMCIL title/post mapping; Delhi Transco deadline conflict; MP High Court 1,174 Assistant record not matched to an exact notice; BSEB STET 2026 notice not found on the official portal.

## Primary sources checked in this pass
- DRDO vacancies listing: https://drdo.gov.in/drdo/offerings/vacancies
- DRDO page 1: https://drdo.gov.in/drdo/en/offerings/vacancies?page=1
- RCI official advertisement PDF: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtRCI01102026.pdf
- DMRL official advertisement PDF: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtDMRL06102026.pdf
- CAIR official advertisement PDF: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtCAIR06102026.pdf
- Bank of Baroda LBO notice: https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09
- POWERGRID apprentice notice: https://www.powergrid.in/en/news/powergrid-invites-online-applications-one-year-apprenticeship-training-program-under
- SPMCIL executives notice: https://www.spmcil.com/en/latest-careers/advt-no-02-2026-recruitment-of-executives-at-e-2-level-e-1-level-in-various-functional-areas/
- NGEL careers: https://ngel.in/career
- CSIR recruitment portal: https://recruitment.csir.res.in/index.php
- AAI recruitment dashboard: https://www.aai.aero/en/careers/recruitment/Offical
- Delhi Transco official website: https://dtl.gov.in/

## Deployment status
GitHub Actions runs triggered by the latest source commit were **queued** at the time of this check. Do not claim the live website has finished deploying or passed browser verification until those runs report success and the live page is checked.

## Completion assessment
This is real progress on source links, data accuracy, and classification, but **371/371 full official-notice verification is not complete**. The 335 records with incomplete verification statuses still require individual primary-source checks, and some records need direct advertisement-level details rather than an authority homepage. Preserve pending/unverified status until that work is done.

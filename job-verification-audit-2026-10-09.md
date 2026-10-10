# AJ DIGITAL POINT — Job Dataset Verification Audit
Audit date: 09 October 2026
Repository: https://github.com/amitjaglan251/aj-digital-point
Dataset: central-jobs.js

## Scope and method
A static quality scan was run across the full job dataset. It checks record counts, duplicate IDs/titles, key-field completeness, generic placeholder language, missing official/apply/notice URLs, and entries with future-looking deadlines. This is a data-quality audit, not a claim that every one of the 371 notices has been individually re-verified against its issuing authority.

## Findings
- Job records scanned: 371
- Duplicate IDs: 0
- Duplicate/near-duplicate title groups: 1
- Records missing one or more of official, apply, or notice URLs: 24
- Records whose opening date contains generic/uncertain wording: 151
- Records whose vacancy details contain generic/uncertain wording: 82
- Records with generic “latest update not separately recorded” wording: 271
- Records with a future-looking last-date token as of 09/10/2026: 156. These need individual live-status checks; date parsing alone does not prove the application is open.
- Records with generic wording in selection/qualification fields also require notice-level review.

## High-priority risks identified
1. **Unconfirmed recruitment notices:** WBPSC Clerkship Examination 2024 has a date explicitly marked unverified; RRB CEN 05/2026 Paramedical has a record marked unconfirmed, while another duplicate-style record lists 590 posts and 14/10/2026 without equivalent verification wording. These should not be presented as confirmed unless the matching official notification is located.
2. **Potential duplicate/overlapping records:** Andhra Pradesh PSC Group-I, AEE and Horticulture Officer appear in multiple records; Punjab District Courts Clerk and MECL Non-Executive also have overlapping entries. Compare IDs, retain one authoritative canonical record where they represent the same notice, and keep separate records only for distinct notices.
3. **Missing links:** 24 records have at least one of official/apply/notice absent. Populate each from the issuing authority's own website after checking the exact advertisement; do not infer links from third-party sites.
4. **Generic dates and details:** 151 opening dates and 82 vacancy fields contain generic/uncertain wording. Transcribe the notice-specific information or label it unconfirmed. Do not replace missing values with guessed dates/counts.
5. **Stale updates:** 271 records have a generic latest-update string. Replace with the actual notice date, corrigendum/extension status, last checked date and official source, or state that no newer official update was found after checking.

## Official sources checked during this pass
- IBPS Careers / ongoing recruitment: https://www.ibps.in/index.php/careers/ and https://www.ibps.in/index.php/recruitment/
- India Post vacancies: https://www.indiapost.gov.in/vacancies and GDS portal: https://www.indiapost.gov.in/gdsonlineengagement
- Employment News official advertisements: https://employmentnews.gov.in/newemp/MoreContentS.aspx?n=WebAdvertisement
- TRAI vacancies: https://www.trai.gov.in/vacancies
- Haryana Chief Secretary Office notices for TRAI Joint Advisor Guwahati/Kolkata, linked in the job data correction script.

## Completion status
**Dataset-wide static audit completed; full notice-by-notice verification remains in progress.** Do not describe all 371 records as fully verified until each record has a checked official notice/source and current status. Prioritize all records with unconfirmed dates/counts, missing official links, overlapping IDs, and deadlines within the next 7 days.


## Phase 2 — targeted live-status review (10 October 2026)

The site now loads the updated safeguard script with cache-busting versions on both `latest-jobs.html` and `job-details.html`.

- Runtime feed count after the targeted safeguards: **366 records** (from 371). This is the expected result after removing five entries: one obsolete combined TRAI entry, two duplicate entries (MECL and IEB), and two RRB CEN 05/2026 Paramedical entries whose matching official notice was not found.
- **RRB CEN 05/2026 Paramedical:** removed from the public feed until an exact matching official CEN notice can be confirmed. This avoids displaying the unverified 590-post count and 14/10/2026 deadline as a current opportunity.
- **IEB Special Recruitment Drive:** retained as one entry. IBPS's official ongoing-recruitment page lists registration from 15/09/2026 through 10/10/2026. The entry is marked **partially verified**: the listing and closing date are checked, but detailed eligibility, vacancy count, fee and selection criteria still require the underlying official notice.
- **MECL Non-Executive Advertisement 03/Rectt./2026:** retained as one canonical entry; its detailed record is marked as verified against the official advertisement, with 122 posts and a listed deadline of 11/10/2026.
- **GATE 2027:** official IIT Madras site confirms extended registration with late fee through 12/10/2026 and application rectification from 14/10/2026 to 21/10/2026.
- **TRAI Joint Advisor:** the combined legacy record is removed; the Guwahati and Kolkata notices remain as separate location-specific records.

### Sources for Phase 2
- IBPS ongoing recruitment list: https://www.ibps.in/index.php/recruitment/
- MECL advertisement notices: https://mecl.co.in/ContentPageMecl.aspx?ControlID=61&Lng=EN&page=advertisement-notices-and-results
- GATE 2027 official dates: https://gate2027.iitm.ac.in/important_dates
- RRB official employment notices: https://www.rrbcdg.gov.in/employment-notices.php
- TRAI official vacancies: https://www.trai.gov.in/vacancies

### Remaining work
This targeted pass does **not** mean every remaining record is fully verified. The outstanding queue still includes missing official/apply/notice links, generic opening dates, generic vacancy details, stale update text, and overlapping records in other recruitment families. Continue by verifying deadline-near records against their issuing authority and then work through missing-link and generic-field batches.
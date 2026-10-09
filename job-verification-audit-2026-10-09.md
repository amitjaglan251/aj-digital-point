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

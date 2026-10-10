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

## Phase 3 — admissions and DRDO listing checks (10 October 2026)

- **NVS Class XI Lateral Entry Selection Test 2027–28:** the official NVS registration portal explicitly shows the deadline extended to **15/10/2026**. The website record now identifies this as an admission entry, uses the official registration portal, and avoids inventing a single vacancy count.
- **DRDO MTRDC Bengaluru JRF:** the official DRDO page confirms Advertisement No. **MTRDC/RF/RECT/2026/02**, opened/published **16/09/2026**, closing **15/10/2026**. The listing now points to the exact official notice page and asks applicants to read its attached advertisement for the interview and eligibility rules.
- **DRDO DGRE JRF:** removed from the public vacancy feed because the official DRDO entry found is a *selected-candidates list*, not an open JRF recruitment advertisement. It should not be shown as a current vacancy.
- Runtime feed count after phases 2–3: **365 records** (from 371), after removing five duplicate/unconfirmed/obsolete entries plus the DGRE selected-candidates notice. The original source dataset is preserved; the filtering is implemented in the site’s quality-safeguard script.

### Sources for Phase 3
- NVS Class XI registration portal: https://cbseitms.nic.in/2026/nvsxi_11/
- DRDO official Skill-Seeker / vacancies listing: https://drdo.gov.in/drdo/en/offerings/vacancies/Skill-Seeker
- DRDO MTRDC JRF advertisement page: https://drdo.gov.in/drdo/en/offerings/vacancies/mtrdc-bengaluru-invites-eligible-candidates-walk-interview-post-jrf

The full notice-by-notice verification remains in progress. The feed’s remaining generic fields and missing official links still need review in subsequent batches.

## Phase 4 — DRDO current notices and IGNOU data correction (10 October 2026)

- **IGNOU Non-Teaching Recruitment:** corrected an internal data mismatch where the post and short-summary fields incorrectly named a Rajasthan Safai Karamchari recruitment. The entry now names Assistant Director, Technical Manager and Technical Assistant, with the official post-wise totals (2, 4 and 8) and IGNOU application/notice links.
- **DRDO RCI Hyderabad Apprentices:** verified the official advertisement and corrected the record to 195 indicative seats: Graduate Apprentice 50, Technician/Diploma Apprentice 30, ITI Trade Apprentice 115. The notice requires at least 70% or CGPA 7.5 for regular candidates who passed in 2022–2026; the exact trade/portal instructions remain in the PDF.
- **DRDO DMRL JRF:** verified 14 positions (Electronics 3, Mechanical 7, Chemical 2, Physics 2), ₹37,000/month plus HRA, maximum age 28 and deadline 27/10/2026 against the official notice.
- **DRDO CAIR JRF:** added the exact official notice page and verified the listing dates 06/10/2026–30/10/2026 and walk-in date 24/11/2026. Detailed eligibility should be checked in the linked advertisement.
- **New records added:** DRDO ITR Chandipur Apprentice (Advt. ITR/HRD/AT/11/2026; deadline 02/11/2026; discipline-wise seats and stipends in the official PDF) and DRDO GTRE Consultant (3 posts; deadline 29/10/2026; maximum age 63 years). These were missing from the dataset and have been added through the quality-safeguard script.
- **Runtime expected feed count:** 367 records after the six previously removed obsolete/duplicate/unconfirmed entries, plus two newly added official notices. This is a static expectation based on the script and dataset; a live browser rendering check is still recommended.

### Sources for Phase 4
- DRDO ITR official advertisement: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtITR09102026.pdf
- DRDO GTRE official advertisement: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtGTRE08102026.pdf
- DRDO RCI official advertisement: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtRCI01102026.pdf
- DRDO DMRL official advertisement: https://drdo.gov.in/drdo/sites/default/files/vacancy/advtDMRL06102026.pdf
- DRDO CAIR official listing: https://drdo.gov.in/drdo/en/offerings/vacancies/cair-bengaluru-invites-eligible-candidates-walk-interview-post-jrf-24th
- IGNOU official career page: https://www.ignou.ac.in/announcement/Career?nav=5

Notice-by-notice verification of all remaining records is still in progress.

## Phase 5 — missing official links and unconfirmed record cleanup (10 October 2026)

- **Bank of Baroda LBO (2,482 posts):** linked the record to the bank's official career page and confirmed the extended closing date **17/09/2026**. It is explicitly marked closed/archive, not an active application.
- **AAI Managers/Junior Executives (389 posts):** linked the record to the official AAI recruitment dashboard and confirmed Advt. **12/2026/CHQ/DR-CBT**, total posts and official dashboard updates. Applicants must use the dashboard for the latest application/result status.
- **Bank of Baroda 1,100 SO record:** removed from the public feed pending a matching official notice; no exact official 1,100-post SO notice was confirmed in this pass.
- **Bihar STET 2026 record:** removed from the public feed pending a matching official 2026 notice. The official portal result found in this pass refers to STET 2025, so it must not be used as evidence for a 2026 recruitment.
- Both `latest-jobs.html` and `job-details.html` now reference quality script version `20261010-05`.

### Sources for Phase 5
- Bank of Baroda LBO official notice: https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09
- AAI official recruitment dashboard: https://www.aai.aero/en/careers/recruitment/allAirports/allAirports/allAirports/bilaspur.jsp?combine=&order=field_name_of_department&page=5&sort=desc
- BSEB STET official portal (the result found is STET 2025): https://bsebstet.org/index.html

This phase is a targeted verification of specific records, not a complete verification of every remaining vacancy.
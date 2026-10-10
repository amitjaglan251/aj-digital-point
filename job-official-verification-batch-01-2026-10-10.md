# Official Recruitment Verification — Batch 1
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Scope
This first manual-source batch reviewed ten high-priority records from `central-jobs.js` against official recruitment portals, official government releases, or the official employer career page. It is **not** a completed 371/371 audit. Where only a listing page was available, the record is explicitly marked partial rather than fully verified.

## Findings

| Dataset ID | Official source checked | Finding | Action |
|---|---|---|---|
| `appsc-group-i-07-2026` | [APPSC recruitment notifications](https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications) | Notification 07/2026 / Group-I Services title and publication date 06/10/2026 confirmed. Detailed PDF fields not fully reconciled in this batch. | Marked partially verified; full dates, vacancies, eligibility and fee remain pending. |
| `appsc-aee-08-2026` | [APPSC official portal](https://portal-psc.ap.gov.in/) | Notification 08/2026 / Assistant Environmental Engineer title and publication date 06/10/2026 confirmed. | Marked partially verified; detailed notice still needs comparison. |
| `appsc-horticulture-officer-19-2026` | [APPSC recruitment notifications](https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications) | Notification 19/2026 / Horticulture Officer title and publication date 06/10/2026 confirmed. | Marked partially verified; detailed notice still needs comparison. |
| `ncrtc-supervisor-jr-maintainer` | [NCRTC Jobs and Results](https://www.ncrtc.co.in/jobs.php) | Codes 32/2026 and 33/2026 show opening 10/09/2026 and closing 09/10/2026. The page still displayed status “Open” on 10/10/2026, creating a status/date conflict. | Deadline recorded as elapsed and status explicitly flagged ambiguous; do not advise applicants to assume the portal is open. |
| `upsc-advt-11-2026` | [PIB official release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2308745&lang=1&reg=19) | Applications closed 02/10/2026 for posts outside UT Ladakh and 09/10/2026 for UT Ladakh posts. | Marked closed; vacancy-by-vacancy details still need PDF comparison. |
| `rcfl-94-management-trainee-2026` | [RCF official recruitment page](https://rcfltd.com/hrrecruitment/recruitment-1) | Corrigendum for Advertisement 16022026 extended application deadline to 20/09/2026 5:00 PM. | Marked closed; all vacancy and eligibility fields not re-audited. |
| `indiaoptel-project-technician-2026` | [India Optel career page](https://indiaoptel.in/career/) | Dataset deadline 03/10/2026 is past as of the audit date; matching official notice was not reconciled in this pass. | Flagged for closure/status confirmation; not marked fully verified. |
| `icmr-bmhrc-group-b-c-2026` | [Official BMHRC advertisements](https://bmhrc.ac.in/content/Hindi/2532_1_Advertisement.aspx) | Current official advertisement page did not show a matching 2026 Group B/C recruitment. Search surfaced the matching Group B/C advertisement as Advt. 125/BMHRC/Bhopal/2023, dated 30/09/2023, not a 2026 notice. | Removed from the public vacancy feed pending an authentic current notice. |
| `wbpsc-clerkship-12-2024-2026` | [WBPSC notifications](https://www.psc.wb.gov.in/notification_announcement.jsp) | Official page lists the indicative Clerkship Examination 2024 announcement dated 23/12/2024; no official 2026 closing-date extension was located in this pass. | Keep the deadline labelled unverified; do not treat 26/10/2026 as confirmed. |
| `mecl-non-executive-2026` | [Employment News official job highlights](https://employmentnews.gov.in/newemp/Home.aspx?job_highlight=0) | Official Employment News lists MECL Accountant & Others with closing date 11/10/2026. Exact detailed MECL PDF and all field values were not compared in this batch. | Deadline cross-check only; vacancy/eligibility/fee still pending. |

## Code changes in this batch
- Added partial/closed/ambiguous verification notes to the relevant runtime records.
- Removed `icmr-bmhrc-group-b-c-2026` from the public feed because the official page did not substantiate a 2026 notice and the matching Group B/C notice found was from 2023.
- Bumped `job-data-quality-fixes.js` cache version to `20261010-08` in both listing and details pages.

## Remaining work
The full 371-record request is not complete. Remaining records must be checked in manageable batches against the matching official advertisement and any corrigenda. For every record, compare post title, notification number, post-wise and total vacancies, opening/closing dates, eligibility, age and relaxation, fee, selection process, application mode and links. A reachable URL or a generic official careers page alone is insufficient to call a record fully verified.

## Live pages
- [Latest Jobs](https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html)
- [Job Details](https://amitjaglan251.github.io/aj-digital-point/job-details.html)
- [Workflow runs](https://github.com/amitjaglan251/aj-digital-point/actions)

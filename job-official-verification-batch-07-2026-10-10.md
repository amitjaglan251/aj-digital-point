# Official Recruitment Verification — Batch 7
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings

| Dataset ID | Official source checked | Verified finding | Required action / status |
|---|---|---|---|
| `hssc-cet-group-d-05-2026` | [HSSC official advertisements](https://www.hssc.gov.in/advertisement) | HSSC lists Advertisement 05/2026 (Group-D), published 18/06/2026, and a separate closing-date extension notice dated 03/07/2026. The live official page labels the apply link “Apply for CET Group D-05/2026”, but this page alone does not establish that applications remain open on 10/10/2026. | **Application status needs exact notice/portal check**. Do not label active based only on a visible Apply link; transcribe the extension and current portal status. |
| `hssc-advt-06-2026-group-c` | [HSSC official advertisements](https://www.hssc.gov.in/advertisement) and [official application portal](https://adv062026.hryssc.com/hssc/employeeOnboardingHomepage) | HSSC lists Advt. 06/2026 (Group-C), publication date 22/06/2026. The official portal says Group-C CET 2025 qualified candidates must register again using their CET Registration Number. This check did not independently establish a current closing date. | **Partially verified**: title/publication and registration instruction confirmed; exact deadline and post-wise details must be reconciled with the advertisement/corrigenda. |
| `bpsc-tre-4-32388-2026` | [BPSC official exam calendar](https://bpsc.bihar.gov.in/exam-calendar/) and [BPSC Hindi exam calendar](https://bpsc.bihar.gov.in/hi/exam-calendar-2/) | The official English exam calendar lists TRE 4.0 with 32,388 vacancies and says the PT date will be published after the advertisement period. A separate official Hindi calendar search result lists School Teacher Recruitment Examination (TRE-4) with 46,595 and a 22–27/09/2026 schedule. These are conflicting calendar entries/versions and do not support treating the dataset's 26/10/2026 deadline as verified. | **High-priority reconciliation**: identify the current final advertisement/corrigendum and exact application portal dates; do not combine 32,388 and 46,595 into one vacancy count. |
| `ruhs-medical-officer-600-2026` | [RUHS official Medical Officer page](https://old.ruhsraj.org/quick_links/mo2024.php) | The official page found in this pass is for Medical Officer (Medical) Direct Recruitment Examination 2024, including 1,700-post-cycle notices/results. It does not confirm the dataset record “Medical Officer Recruitment 2026 — 600 Posts” or the stored 13/10/2026 deadline. | **Unconfirmed match**: do not advertise the 600-post 2026 record as verified without a matching RUHS 2026 advertisement and application notice. |
| `psssb-group-b-13-2026` | [Punjab Subordinate Services Selection Board official portal](https://sssb.punjab.gov.in/) | This pass did not retrieve an official notice that conclusively matches “Group B Recruitment 2026 — Advt. 13/2026”, 10 posts and 22/10/2026. | **Unconfirmed match**: exact official advertisement PDF and current application notice must be located before confirming count/date. |

## Batch status
- 5 records checked against issuing-authority pages or portals.
- HSSC advertisement titles/publication dates are confirmed, but a live Apply link alone is not proof of an open application window.
- BPSC TRE-4 and RUHS Medical Officer records have material unresolved discrepancies.
- No inferred vacancy count or deadline has been marked as verified.

## Completion statement
This is an incremental batch, not the final 371/371 verification. The master dataset still requires individual notice-level comparison and a full live-site browser test.

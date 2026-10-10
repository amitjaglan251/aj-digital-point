# Official Recruitment Verification — Batch 2
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings

| Dataset ID | Official source | Finding | Action |
|---|---|---|---|
| `upsc-engineering-services-2026` | [UPSC ESE 2027 official page](https://www.upsc.gov.in/examinations/Engineering%20Services%20%28Preliminary%29%20Examination%2C%202027) | UPSC confirms notification 16/09/2026, last date 06/10/2026 6:00 PM, exam 31/01/2027. | Marked application window closed; official notice link corrected. Other detail fields still need PDF comparison. |
| `ibps-rrb-office-assistant-officer-2026` | [IBPS CRP-RRBs-XV official page](https://www.ibps.in/index.php/rural-bank-xv/) | Official page lists corrigenda and updated vacancies through 25/09/2026. Stored application deadline 27/09/2026 has passed. Exact updated bank/state/category totals are not yet transcribed. | Marked deadline/listing checked and closed; vacancy table still pending. |
| `upsc-epfo-80-apfc` | [UPSC Recruitment Test Notices](https://www.upsc.gov.in/recruitment/recruitment-test/notices) | Official UPSC notices list 74 APFC posts under Advertisement 52/2025 (Special), not a matching 80-post 2026 recruitment. The current dataset entry's deadline was explicitly unverified. | Removed from public feed until the exact current notice can be identified. |
| `ssc-cpo-si-2026` | [SSC official notice board](https://ssc.gov.in/) and [SSC 2026–27 calendar PDF](https://ssc.gov.in/api/attachment/uploads/masterData/ExamCalendar/Tentative_Calendar2026_27_08012026.pdf) | The calendar planned the 2026 CPO notice/closing window for May/June, while the dataset listed 30/09/2026 and 1,871 posts. The current official notice board reviewed in this pass did not substantiate that record. | Removed from public feed pending a matching detailed SSC 2026 notice/corrigendum. |
| `ssc-chsl-2536-2026` | [SSC official notice board](https://ssc.gov.in/) and [SSC 2026–27 calendar PDF](https://ssc.gov.in/api/attachment/uploads/masterData/ExamCalendar/Tentative_Calendar2026_27_08012026.pdf) | Calendar planned CHSL 2026 advertisement/closing window for April/May; the record's 07/10/2026 deadline and 2,536 posts were not confirmed by a matching detailed 2026 notice. | Removed from public feed pending the official 2026 notice and vacancy table. |
| `bank-of-baroda-2482-lbo` | [Bank of Baroda official site](https://www.bankofbaroda.bank.in/) | This record had no official, notice or apply URL, and a matching official 2,482-post notice was not located in this pass. | Removed from public feed pending a matching official advertisement. |
| `ssc-chte-2025-preference` | [SSC official portal](https://ssc.gov.in/) | Exact notice substantiating the stored 11/09/2026 preference-form deadline was not located in this pass. | Marked partial; deadline remains unverified. |

## Code changes
- Marked UPSC ESE 2027 as closed using the official UPSC examination page.
- Recorded the latest IBPS CRP-RRB-XV update page and marked the application window closed.
- Removed the unconfirmed EPFO 80-post, SSC CPO 2026, SSC CHSL 2026 and Bank of Baroda 2,482-post entries from the public feed pending a matching official notice.
- Updated the quality-script cache version to `20261010-09` on listing and details pages.

## Status
This is batch 2 only. The complete 371-record official-notice comparison remains unfinished. Removing an unverified record is a safety measure against presenting an unsupported deadline or vacancy count as fact; it can be restored after its exact official notice is identified.

## Links
- [Latest Jobs](https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html)
- [Job Details](https://amitjaglan251.github.io/aj-digital-point/job-details.html)
- [GitHub Actions](https://github.com/amitjaglan251/aj-digital-point/actions)

# Official Recruitment Verification — Batch 5
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings and changes

| Dataset ID | Official source checked | Finding | Action |
|---|---|---|---|
| `south-indian-bank-junior-officer` | [South Indian Bank Careers](https://recruit.southindianbank.com/RDC/index.jsp) | The official recruitment portal shows no current opening and refers to results for the Junior Officer (Business Promotion Officer) cycle. The matching 2026 notice found elsewhere states 20/02/2026–02/03/2026, not the stored 31/08/2026 deadline. | Hidden until the exact matching notice for the stored date can be identified. |
| `south-indian-bank-probationary-officer` | [South Indian Bank Careers](https://recruit.southindianbank.com/RDC/index.jsp) | No matching current official Probationary Officer notice confirming the stored 29/07/2026 deadline was located in this pass. | Hidden pending exact notice. |
| `delhi-dpcc-environment-engineer` | [Delhi Pollution Control Committee](https://dpcc.delhi.gov.in/) | The exact official 2026 recruitment notice matching the stored post and 25/09/2026 deadline was not located in this pass. | Hidden pending exact notice. |
| `delhi-dtl-assistant-manager-trainee` | [Delhi Transco Limited](https://dtl.gov.in/) | The exact official 2026 notice matching the stored post and 30/09/2026 deadline was not located in this pass. | Hidden pending exact notice. |
| `icsi-executive-assistant` | [ICSI Recruitment Management System](https://stimulate.icsi.edu/RECRUITMENT/IndexHome/IndexHome) | Official portal lists Regular Posts under Advt. No. 02/2026 and later Executive Assistant written-test notices. The original 12/08/2026 deadline and all vacancy/eligibility details were not fully reconciled in this pass. | Added the official portal and marked partial/closed, rather than fully verified. |

## Code changes
- Hid four records whose exact current official notice could not be matched: South Indian Bank Junior Officer, South Indian Bank Probationary Officer, Delhi DPCC Environment Engineer and Delhi DTL Assistant Manager Trainee.
- Added the official ICSI recruitment system link and explicit partial-verification status.
- Bumped the quality-script cache version to `20261010-13` on Latest Jobs and Job Details.

## Status
The complete 371/371 official notice comparison is still in progress. These changes are meant to avoid showing unsupported posts or deadlines as verified. Records marked partial still require exact-notice comparison.

## Links
- [Latest Jobs](https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html)
- [Job Details](https://amitjaglan251.github.io/aj-digital-point/job-details.html)
- [GitHub Actions](https://github.com/amitjaglan251/aj-digital-point/actions)

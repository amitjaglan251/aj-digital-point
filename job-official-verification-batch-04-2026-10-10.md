# Official Recruitment Verification — Batch 4
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings and changes

| Dataset ID | Official source checked | Finding | Action |
|---|---|---|---|
| `federal-bank-sales-officer-2026` | [Federal Bank Careers](https://www.federal.bank.in/careers) | No matching official 2026 recruitment notice for the record's 31/08/2026 deadline was found. Federal Bank warns candidates about non-existent recruitment postings and says openings are announced through official channels. | Hidden pending an exact matching notice. |
| `itbp-capf-282-medical-officer` | [ITBP Recruitment portal](https://recruitment.itbpolice.nic.in/) | No matching 2026 notice substantiating this 282-post Medical Officer record was located; results found in the official portal were for other recruitment cycles/notices. | Hidden pending exact current notice. |
| `dgqa-15-technician` | [Ministry of Defence](https://www.mod.gov.in/) | No matching official 2026 notice for the stated 15 Technician (Semi-Skilled) posts was located in this pass. | Hidden pending exact official advertisement. |
| `iaf-agniveer-non-combatant` | [Indian Air Force official portal](https://careerairforce.gov.in/) | No matching official 2026 Non-Combatant notice confirming the stored deadline 17/08/2026 was located in this pass. | Hidden pending exact official advertisement. |
| `upsssc-jr-engineer-agriculture` | [UPSSSC](https://upsssc.gov.in/) | Existing source links incorrectly pointed to SSC. | Corrected official/notice/apply URLs to UPSSSC; exact advertisement and dates remain pending. |
| `upessc-12405-assistant-teacher` | [UPESSC](https://upessc.up.gov.in/) | Existing source links incorrectly pointed to SSC. The 12,405-post figure and 15/10/2026 deadline were not matched to the exact official notice in this pass. | Corrected links to UPESSC and explicitly marked the key fields unverified. |
| `indian-navy-275-ssc-officer` | [Join Indian Navy](https://www.joinindiannavy.gov.in/) | Existing source links incorrectly pointed to SSC. The 275-post count and 03/08/2026 extended deadline were not matched to the exact notice in this pass. | Corrected the recruiting authority links; exact details remain pending. |
| `ngel-engineer-executive` | [NGEL official portal](https://www.ngel.in/) | Public summaries report Advt. 04/26, 147 Engineer/Executive posts and 07/09/2026 deadline; the exact official PDF was not retrieved in this pass. | Added official portal and marked all unconfirmed details provisional/closed. |
| `army-ncc-special-entry-men`, `army-ncc-special-entry-women` | [Indian Army official portal](https://joinindianarmy.nic.in/) | Existing records had no official links. Exact NCC Special Entry notices and the recorded 2026 dates were not matched in this pass. | Added official portal links and marked records as needing exact-notice verification. |

## Code changes
- Removed four unsupported records from the public feed pending exact official notice: Federal Bank Sales Officer, ITBP 282 Medical Officer, DGQA 15 Technician, and IAF Non-Combatant.
- Corrected recruiting links that incorrectly pointed to SSC for UPSSSC, UPESSC and Indian Navy.
- Added official authority links and explicit partial-verification notes for NGEL and Army NCC Special Entry records.
- Bumped the quality-script cache version to `20261010-12` on Latest Jobs and Job Details.

## Status
This is another partial batch, not a 371/371 completion. Every record marked **partial** or **needs exact-notice verification** still requires comparison against its exact official PDF and any corrigenda. Generic careers pages alone are not enough to call a record fully verified.

## Links
- [Latest Jobs](https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html)
- [Job Details](https://amitjaglan251.github.io/aj-digital-point/job-details.html)
- [GitHub Actions](https://github.com/amitjaglan251/aj-digital-point/actions)

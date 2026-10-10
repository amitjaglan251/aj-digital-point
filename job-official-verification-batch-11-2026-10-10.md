# Official Recruitment Verification — Batch 11
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings

| Dataset ID | Official source checked | Verified finding | Required action / status |
|---|---|---|---|
| `coast-guard-cgept-01-02-2027` | [Indian Coast Guard official recruitment page](https://www.indiancoastguard.gov.in/recruitment) and [official registration-start notice](https://www.indiancoastguard.gov.in/registration-process-cgept-0127-cgept-0227-batches-scheduled-commence-06-oct-26-all-candidates-are) | The Coast Guard says registration for CGEPT-01/27 and CGEPT-02/27 was scheduled to commence 06/10/2026; the notice is dated 05/10/2026. SSC also shows the CGEPT notice dated 06/10/2026. This establishes the opening date and batch names, but the sources fetched in this pass did not expose a confirmed closing date or batch-wise vacancy count. | **Partially verified**: retain official notice and SSC application entry, but do not invent the last date or vacancies. Update those fields only after reading the linked notice/application portal. |
| `rrb-alp-11127-2026-exam` | [RRB Chandigarh CEN 01/2026 ALP notices](https://www.rrbcdg.gov.in/2026-01-alp.php), [official detailed CEN PDF](https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf), [official indicative notice PDF](https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-IndicativeNotice.pdf) | Official RRB notice confirms CEN 01/2026 for Assistant Loco Pilot, 11,127 vacancies, registration 15/05/2026–14/06/2026. The detailed CEN is the controlling source; the indicative notice independently states the application dates and total. | **Core fields verified**: show application as closed after 14/06/2026; keep any November exam date only in a separate exam field if the latest official exam notice confirms it. Do not describe this as an upcoming application. |
| `upcoming-rrb-alp-2026-27` | Same RRB CEN 01/2026 official notices above | This entry says “Upcoming Recruitment” even though the CEN 01/2026 application window closed 14/06/2026. | **Status correction required**: remove from Upcoming Vacancies or rename as a closed application/exam update. It must not imply a new application window is open or awaited for the same CEN. |

## Batch status
Three records reviewed. RRB ALP application dates and total vacancies are verified from the official RRB source; the “upcoming” duplicate should not appear as a future application. Coast Guard CGEPT opening date is verified, but deadline and vacancy totals remain unconfirmed in this pass.

## Audit limitation
This is an incremental batch, not a completed 371/371 notice-level audit. The linked live site and browser rendering still require an independent deployment check.

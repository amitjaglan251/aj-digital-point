# Official Recruitment Verification — Batch 12
**Audit date:** 10 October 2026  
**Repository:** `amitjaglan251/aj-digital-point`

## Findings

| Dataset ID | Official source checked | Verified finding | Action |
|---|---|---|---|
| `rrb-ntpc-5165-2026` | [RRB Chandigarh official employment notices](https://www.rrbcdg.gov.in/employment-notices.php) and [official RRB notice index](https://www.rrbcdg.gov.in/) | The official notice index lists current/ recent NTPC recruitments as CEN 06/2025 (Graduate) and CEN 07/2025 (Undergraduate), with their own notices and application windows. The 2026 entry claiming 5,165 posts and linking to CEN 06/2026 + CEN 07/2026 was not matched to an official 2026 NTPC notice in this pass. | **Suppress pending exact official CEN**. Do not display 5,165 as a verified current NTPC vacancy total. Keep 2025 graduate and undergraduate recruitment records distinct. |
| `upcoming-rrb-alp-2026-27` | [RRB CEN 01/2026 ALP official page](https://www.rrbcdg.gov.in/2026-01-alp.php) | Official RRB page identifies CEN 01/2026 ALP and application dates 15/05/2026–14/06/2026. The same application cycle is closed, so it should not be represented as a future application opening. | Suppression rule already added in Batch 11; this batch rechecked the rationale. |
| `upcoming-rrb-group-d-2026-27` and `upcoming-rrb-technician-2026-27` | [RRB official employment-notice index](https://www.rrbcdg.gov.in/employment-notices.php) | The index shows published CEN notices for existing cycles, including CEN 09/2025 Level-1/Group-D and CEN 02/2025 Technician. A future 2026-27 application window or vacancy count was not confirmed by the official notices reviewed. | These may be displayed only as **“Notification awaited — no official 2026-27 notice confirmed”**, with no fabricated opening date or post count. They are informational watchlist items, not active vacancies. |

## Batch status
Three dataset entries reviewed. One unsupported “RRB NTPC 2026 — 5,165 Posts” entry is now held out of the public vacancy feed. The ALP duplicate suppression from Batch 11 remains in place. Upcoming Group-D/Technician items must remain clearly marked as awaited, not active jobs.

## Audit limitation
This is an incremental verification batch, not a completed 371/371 notice-level audit. It does not confirm live-browser rendering or deployment status.

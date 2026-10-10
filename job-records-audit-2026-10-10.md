# AJ DIGITAL POINT — All-record recruitment audit (10 October 2026)

## Scope and important limitation

This is an automated field-completeness and date/link-shape audit of all records in `central-jobs.js` on 10/10/2026. It is **not** proof that every advertisement has been manually compared with its official PDF. Semantic checks (correct post title, post count, eligibility, fee, age, dates and selection rules) still require notice-by-notice review. The live-browser Playwright workflow is tracked separately in `.github/workflows/live-site-browser-verification.yml`.

## Dataset summary

- Source records: **371**
- Records missing at least one of Official / Notice / Apply URLs: **24**
- Generic opening date: **147**
- Generic or relative deadline: **41**
- Generic vacancy count: **88**
- Records with a deadline date token earlier than 10/10/2026: **82** (may include correctly archived entries; confirm application status)
- Records flagged by at least one of these rules: **220**
- Duplicate IDs: **0**

## Record-level review queue

Flags indicate where a reviewer should start; they do not automatically mean a recruitment is false. Missing official links should be resolved first, then compare the official notice for post name, dates, vacancy, qualifications, age, fee and selection method.

| ID | Post / recruitment | Category | Opening | Deadline | Vacancy | Flags |
|---|---|---|---|---|---|---|
| rrb-04-2026-je-correction | RRB 04/2026 Junior Engineer Correction Form | Central Job | 14/08/2026 | 25/09/2026 11:59 PM | 4,029 revised posts (JE/DMS/CMA) | deadline appears past |
| upsc-engineering-services-2026 | UPSC Engineering Services (Preliminary) Examination 2027 Online Form | Central Job | 16/09/2026 | 06/10/2026 06:00 PM | 480 Posts | deadline appears past |
| india-optel-project-technician-2026 | India Optel Limited Recruitment 2026 — Advertisement IOLHqrs/100(6)/2026-Rectt (160 posts) | Central Job | 12/09/2026 | 03/10/2026 | 160 fixed-term contract positions across Project Technician (98), Junior Project Engineer (57), Welfare Officer (3), and Consultant (Coordination) (2). | deadline appears past |
| upsc-advt-11-2026 | UPSC Advt. 11/2026 Various Posts Online Form | Central Job | 12/09/2026 | 02/10/2026 06:00 PM (09/10/2026 for UT Ladakh posts) | Post-wise vacancy — see official notification | generic vacancy count; deadline appears past |
| upsc-epfo-80-apfc | UPSC EPFO APFC Recruitment — Vacancy Count and Schedule Need Official Reconciliation | Central Job | Unverified | Unverified — do not rely on 14/09/2026 without locating the matching official detailed advertisement/corrigendum. | The existing record says 80 APFC, but the UPSC homepage currently lists a notice for 74 APFC posts. These may refer to different notices; 80 is not verified for this record. | deadline appears past |
| rcfl-94-management-trainee-2026 | RCF Management Trainee Recruitment 2026 — Advt. 16022026 (Applications Closed) | Central Job | 08/08/2026 08:00 AM | 20/09/2026 05:00 PM (extended; closed) | Management Trainee roles advertised across Chemical, Boiler, Mechanical, Electrical, Instrumentation, Materials, Civil, Fire, CC Lab, Industrial Engineering, Information Technology, Rajbhasha, Finance and Marketing. The record title says 94 vacancies, but the total has not yet been reconciled against the complete original vacancy table. | deadline appears past |
| ncrtc-supervisor-jr-maintainer | NCRTC Recruitment 2026 — O&M Staff (32/2026) & Supervisors/Non-Supervisors (33/2026) | Central Job | 10/09/2026 10:00 AM | 09/10/2026 11:55 PM | 90 posts across two separate notices: Job ID 32/2026 (direct recruitment) — 67 posts: Supervisor-I Operations 2; Electronics 18; Electrical 14; Mechanical 3; Civil 6; Junior Maintainer Electrical 8; Fitter 9; RAC 5; Electronics 2. Job ID 33/2026 (contract, regular pay scale) — 23 posts: Supervisor-I IT 5; IT Full Stack Developer 1; IT Full Stack Developer (ITMS) 1; IT AFC & NCMC (ITMS) 1; Corporate Hospitality 1; Corporate Communications 1; Electrical 2; Civil 7; Junior Maintainer Electrical 2; Fitter 2. Category totals across both notices: UR 65, EWS 2, OBC-NCL 15, SC 6, ST 2. One PwBD reservation is identified in each notice; check the relevant PDF for post/disability mapping. | deadline appears past |
| ssc-cpo-si-2026 | SSC CPO Sub-Inspector Vacancy Online Form | Central Job | 14/08/2026 | 30/09/2026 11:00 PM | 1,871 tentative posts: Delhi Police SI Executive Male 205, Delhi Police SI Executive Female 112, CAPFs SI GD 1,320, and CISF SI Fire 234; confirm final vacancy corrigenda on SSC. | deadline appears past |
| ibps-rrb-office-assistant-officer-2026 | IBPS CRP-RRBs-XV — Office Assistant & Officers (Updated Vacancy Corrigenda) | Central Job | 01/09/2026 | 27/09/2026 11:59 PM (closed) | IBPS published updated vacancy lists dated 09/09, 15/09 and 25/09/2026 for CRP-RRBs-XV. Use the latest 25/09/2026 vacancy attachment for bank/state/post/category counts; exact totals have not yet been transcribed into this record. | deadline appears past |
| bank-of-india-specialist-officer-2026 | Bank of India Specialist Officer Online Form | Central Job | 10/09/2026 | 25/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic vacancy count; deadline appears past |
| ssc-chte-2025-preference | SSC CHTE Vacancy 2025 Post Preference Form | Central Job | See official notification | 11/09/2026 11:00 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| uiicl-225-administrative-officer | UIICL 225 Administrative Officer Online Form | Central Job | 08/09/2026 | 28/09/2026 11:59 PM | 225 Administrative Officer (Scale I) posts | deadline appears past |
| ssc-chsl-2536-2026 | SSC CHSL 2026 — Dates and 2,536 Vacancy Count Need Official Confirmation | Central Job | Unverified — 08/04/2026 not confirmed by the current detailed SSC 2026 notice. | Unverified — current SSC official notice board reviewed on 09/10/2026 does not confirm 07/10/2026 as the 2026 CHSL application closing date. | The database previously listed 2,536 posts, but the matching SSC CHSL 2026 detailed notification and latest vacancy table have not been located in the current official notice board. Treat 2,536 as unverified until matched to an official 2026 notice. | deadline appears past |
| bank-of-baroda-2482-lbo | Bank of Baroda 2482 LBO Vacancy Online Form | Central Job | See official notification | 17/09/2026 11:59 PM Extended | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| nspcl-senior-assistant-officer-engineer | NSPCL Senior Assistant Officer Engineer Form | Central Job | See official notification | 22/09/2026 06:00 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| sbi-specialist-cadre-officer-2026 | SBI Bank Specialist Cadre Officer Online Form | Central Job | See official notification | 25/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| bank-of-baroda-1100-so-2026 | Bank of Baroda 1100 SO Vacancy Online Form | Central Job | See official notification | 24/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| ibps-11403-clerk-correction | IBPS 11403 Clerk CRP-XVI Correction Form | Central Job | See official notification | 05/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| pfrda-assistant-manager-grade-a | PFRDA Assistant Manager (Grade A) Online Form | Central Job | 03/09/2026 | 24/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic vacancy count; deadline appears past |
| india-post-23757-gds-2026 | India Post 23757 Gramin Dak Sevak Online Form | Central Job | 02/09/2026 | 21/09/2026 05:00 PM | 23,757 GDS posts as listed for Schedule II July 2026 | deadline appears past |
| upsc-127-geo-scientist | UPSC 127 Geo Scientist Vacancy Online Form | Central Job | See official notification | 22/09/2026 06:00 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| ssc-1748-je-2026 | SSC 1748 Junior Engineer Vacancy Online Form | Central Job | See official notification | 22/09/2026 11:00 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| nic-scientific-technical-assistant | NIC Scientific / Technical Assistant Online Form | Central Job | See official notification | 30/09/2026 05:30 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| bgissl-2049-various-vacancies | BGSSL 2049 Various Vacancies Online Form | Central Job | See official notification | 30/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| concor-mt-assistant-officer | CONCOR MT, Assistant Officer Online Form | Central Job | See official notification | 30/09/2026 11:55 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| uco-bank-specialist-officer | UCO Bank Specialist Officer (SO) Online Form | Central Job | See official notification | 18/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| beml-non-executive-2026 | BEML Non-Executive Vacancy Online Form 2026 | Central Job | See official notification | 08/09/2026 06:00 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| sbi-trade-finance-officer | SBI Bank Trade Finance Officer Online Form | Central Job | See official notification | 19/09/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| indian-overseas-bank-so | Overseas Bank Specialist Officer Online Form | Central Job | See official notification | 15/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| federal-bank-sales-officer-2026 | Federal Bank Sales Officer Online Form 2026 | Central Job | See official notification | 31/08/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| pgcil-apprentice-2026 | PGCIL Apprentice Vacancy Online Form 2026 | Central Job | See official notification | 10/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| spmcil-assistant-manager | SPMCIL Assistant Manager Vacancy Online Form | Central Job | See official notification | 31/08/2026 05:00 PM Extended | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| ngel-engineer-executive | NGEL Engineer/ Executive Vacancy Online Form | Central Job | See official notification | 07/09/2026 06:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| south-indian-bank-junior-officer | South Indian Bank Junior Officer Online Form | Central Job | See official notification | 31/08/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| csir-43-technician-1 | CSIR 43 Technician (1) Vacancy Online Form | Central Job | See official notification | 17/09/2026 05:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| itbp-capf-282-medical-officer | ITBP CAPF 282 Medical Officer Online Form | Central Job | See official notification | 08/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| aai-389-jr-executive-manager | AAI 389 Jr Executive, Manager Online Form | Central Job | See official notification | 07/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| bank-of-baroda-specialist-officer | Bank of Baroda Specialist Officer Online Form | Central Job | See official notification | 26/08/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| dgqa-15-technician | DGQA 15 Technician (Semi-Skilled) Offline Form | Central Job | See official notification | 07/08/2026 05:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| iaf-agniveer-non-combatant | IAF Agniveer (Non-Combatant) Offline Form | Central Job | See official notification | 17/08/2026 05:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| isro-92-scientist-engineer-2026 | ISRO 92 Scientist / Engineer Online Form 2026 | Central Job | See official notification | 17/08/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| indian-navy-275-ssc-officer | Indian Navy 275 SSC Officer Posts Online Form | Central Job | See official notification | 03/08/2026 11:59 PM Extended | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| south-indian-bank-probationary-officer | South Indian Bank Probationary Officer Form | Central Job | See official notification | 29/07/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| icsi-executive-assistant | ICSI Executive Assistant Vacancy Online Form | Central Job | See official notification | 12/08/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| army-ncc-special-entry-women | Army NCC Special Entry (Women) Online Form | Central Job | See official notification | 21/08/2026 03:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| army-ncc-special-entry-men | Army NCC Special Entry (Men) Online Form | Central Job | See official notification | 20/08/2026 03:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| delhi-dpcc-environment-engineer | Delhi DPCC Environment Engineer Offline Form | State Job | See official notification | 25/09/2026 05:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| upsssc-jr-engineer-agriculture | UPSSSC Jr Engineer (Agriculture) Online Form | State Job | See official notification | 07/10/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| psssb-04-26-group-d | PSSSB 04/26 Group D (2098 Post) Form Re-Open | State Job | See official notification | 21/09/2026 05:00 PM Extended | Post-wise vacancy — see official notification | generic opening date; generic vacancy count; deadline appears past |
| kea-210-group-c-2026 | KEA 210 Group C Vacancy Online Form 2026 | State Job | See official notification | 30/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| gadvasu-non-teaching-2026 | GADVASU Non-Teaching Recruitment 2026 — Advertisement No. 03/2026 | State Job | 16/09/2026 | 08/10/2026 04:00 PM — online application and fee payment deadline (closed) | 45 posts total: Steno Typist 15; Clerk 20; Storekeeper 10. Post counts are from official Advertisement No. 03/2026. | deadline appears past |
| upessc-12405-assistant-teacher | UPESSC 12405 Assistant Teacher Online Form | State Job | See official notification | 15/10/2026 11:59 PM | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| delhi-dtl-assistant-manager-trainee | Delhi DTL Assist. Manager Trainee Online Form | State Job | See official notification | 30/09/2026 11:59 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| bseb-bihar-stet-2026 | BSEB Bihar STET 2026 Apply Online Form | State Job | See official notification | 22/09/2026 11:59 PM Extended | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| mp-high-court-1174-assistant | MP High Court 1174 Assistant Online Form 2026 | State Job | See official notification | 30/09/2026 05:00 PM | Post-wise vacancy — see official notification | missing official URL; missing notice URL; missing application URL; generic opening date; generic vacancy count; deadline appears past |
| isro-sac-jrf-2026 | ISRO SAC JRF / Research Associate / Project Scientist-I Online Form 2026 | Central Job | 10/09/2026 | 30/09/2026 | Post-wise vacancy — see official notification | generic vacancy count; deadline appears past |
| isro-nsil-cmd-2026 | ISRO NSIL Chairman-cum-Managing Director Online Form 2026 | Central Job | 21/08/2026 | 21/09/2026 | 1 Post | deadline appears past |
| ssc-chsl-2026-2536 | SSC CHSL 2026 — LDC/JSA/DEO Recruitment | Central Job | 08/09/2026 | 07/10/2026 11:00 PM | 2,536 Posts | deadline appears past |
| mecl-nonexecutive-03-2026 | MECL Advertisement 03/Rectt./2026 — Non-Executive Posts | Central Job | 12/09/2026 | 11/10/2026 | Various Non-Executive Posts | generic vacancy count |
| private-jio-graduate-engineer-trainee-87210862 | Jio — Graduate Engineer Trainee | Private Job | 05/10/2026 | Check official career portal | Multiple openings | generic/relative deadline |
| private-jio-home-service-intern-rohtak | Jio Home Service Intern — Rohtak | Private Job | 01/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-jio-customer-care-amritsar | Jio Customer Care Executive Voice — Amritsar | Private Job | 05/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-jio-customer-care-pathankot | Jio Customer Care Executive Voice — Pathankot | Private Job | 05/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-jio-area-talent-acquisition-jalandhar | Jio Area Talent Acquisition Executive — Jalandhar | Private Job | 05/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-cognizant-sr-quality-engineer-2026 | Cognizant — Sr. Quality Engineer — Chennai/Bangalore | Private Job | 05/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-cognizant-data-scientist-bangalore-2026 | Cognizant — Data Scientist — Bangalore | Private Job | 02/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-cognizant-power-platform-chennai-2026 | Cognizant — Microsoft Power Platform / Power Automate Developer — Chennai | Private Job | 01/10/2026 | Check official career portal | 1 listed opening | generic/relative deadline |
| private-tcs-india-careers-2026 | TCS India — Entry Level, Internships & Lateral Hiring | Private Job | 05/10/2026 | Check official career portal | Multiple openings | generic/relative deadline |
| private-infosys-careers-2026 | Infosys — Graduates, Experienced & Internships | Private Job | 05/10/2026 | Check official career portal | Multiple openings | generic/relative deadline |
| private-hcltech-india-careers-2026 | HCLTech — Current Openings in India | Private Job | 05/10/2026 | Check official career portal | Multiple openings | generic/relative deadline |
| upcoming-ssc-cgl-2026 | SSC CGL 2027 — Upcoming Recruitment | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-ssc-chsl-2027 | SSC CHSL 2027 — Upcoming Recruitment | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-rrb-group-d-2026-27 | Railway RRB Group D — Upcoming Recruitment | Upcoming Vacancy | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-rrb-alp-2026-27 | Railway RRB ALP — Upcoming Recruitment | Upcoming Vacancy | See official notification | 03–05/11/2026 (Exam) | 11,127 posts — CEN 01/2026; application closed | generic opening date |
| upcoming-rrb-technician-2026-27 | Railway RRB Technician — Upcoming Recruitment | Upcoming Vacancy | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-ibps-po-2027 | IBPS PO/MT 2027 — Upcoming Recruitment | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-ibps-clerk-2027 | IBPS CSA/Clerk 2027 — Upcoming Recruitment | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-ibps-rrb-2027 | IBPS RRB 2027 — Office Assistant & Officer Posts | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-upsc-civil-services-2027 | UPSC Civil Services Examination 2027 — Upcoming | Upcoming Vacancy | See official notification | As per UPSC Annual Calendar | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-upsc-nda-na-2027 | UPSC NDA & NA Examination 2027 — Upcoming | Upcoming Vacancy | See official notification | As per UPSC Annual Calendar | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-upsc-cds-2027 | UPSC CDS Examination 2027 — Upcoming | Upcoming Vacancy | See official notification | As per UPSC Annual Calendar | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-hssc-group-c-2026-27 | HSSC Group C Recruitment — Upcoming Haryana Vacancies | Upcoming Vacancy | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-haryana-police-2026-27 | Haryana Police Recruitment — Upcoming Constable/SI Vacancies | Upcoming Vacancy | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-reet-2026 | REET 2026 — Upcoming Teacher Eligibility Examination | Upcoming Vacancy | See official notification | To be announced | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| upcoming-bpsc-tre-5-2027 | BPSC Teacher Recruitment — Upcoming Vacancy | Upcoming Vacancy | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| banking-ibps-2026-27-calendar | IBPS PO/MT, Specialist Officer & CSA 2026-27 — Recruitment Calendar | Banking Job | See official notification | Notification / cycle-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| banking-sbi-cbo-upcoming-2026 | SBI Circle Based Officer (CBO) 2026-27 — Upcoming | Banking Job | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| banking-rbi-upcoming-2026-27 | RBI Upcoming Recruitment — Assistant / Grade B / Other Posts | Banking Job | See official notification | Notification-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| banking-nabard-upcoming-2026-27 | NABARD Upcoming Recruitment — Grade A / Assistant Manager & Other Posts | Banking Job | See official notification | Notification awaited | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| sainik-school-teaching-nonteaching-2026-27 | Sainik Schools Teaching & Non-Teaching Recruitment — 2026-27 | Sainik School | See official notification | School-wise / notification-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| sainik-school-contractual-staff-2026 | Sainik Schools Contractual Academic, Administrative & General Staff | Sainik School | See official notification | School-wise / notification-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| nvs-recruitment-2026-27 | NVS Teaching & Non-Teaching Recruitment — 2026-27 | Navodaya Vidyalaya | See official notification | Notification-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| nvs-contractual-teachers-2026-27 | Jawahar Navodaya Vidyalaya Contractual Teacher Recruitment — 2026-27 | Navodaya Vidyalaya | See official notification | School/Region-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| nvs-class-11-lateral-entry-2027-28 | NVS Class XI Lateral Entry Selection Test 2027-28 | Navodaya Vidyalaya | See official notification | 15/10/2026 | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| ibps-so-xvi-2026 | IBPS Specialist Officer (SO) XVI Recruitment 2026 — IT, Marketing, Law, HR & Other Posts | Banking Job | 23/09/2026 | 06/10/2026 11:59 PM | As per IBPS CRP-SPL-XVI notification | deadline appears past |
| ibps-banker-faculty-executive-secretary-2026 | IBPS Banker Faculty / Banker Faculty-Technical / Executive Secretary Recruitment 2026 | Banking Job | 23/09/2026 | 06/10/2026 | As per IBPS Advertisement IBPS/2026-27/03 | deadline appears past |
| hssc-cet-group-d-05-2026 | HSSC CET Group-D 05/2026 — Haryana Recruitment | State Job | 19/06/2026 | As per current HSSC application window | Post-wise vacancy — see official notification | generic vacancy count |
| hssc-advt-06-2026-group-c | HSSC CET Phase-II Group-C — Advt. 06/2026 | State Job | See official notification | 30/06/2026 11:59 PM | CET Phase-II Group-C posts — as per Advt. 06/2026 | generic opening date; deadline appears past |
| haryana-government-upcoming-recruitment-2026-27 | Haryana Government Group-C / Group-D Upcoming Recruitment 2026-27 | Upcoming Vacancy | See official notification | Notification-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| haryana-private-jobs-2026-27 | Haryana Private Jobs — Latest Company Vacancies 2026-27 | Private Job | See official notification | Company-wise | Post-wise vacancy — see official notification | generic opening date; generic vacancy count |
| iocl-western-apprentice-335-2026 | IOCL Western Region Apprentice Recruitment 2026 — 335 Posts | Apprenticeship | See official notification | As per IOCL/NAPS-NATS notification | 335 Apprentices | generic opening date |
| drdo-rci-apprentice-2027 | DRDO RCI Hyderabad Apprentice Recruitment 2027 | Apprenticeship | See official notification | 01/11/2026 | As per Advt. RCI/HRD/Apprenticeship/Advt/2027 | generic opening date |
| naval-dockyard-mumbai-apprentice-283-2026 | Naval Dockyard Mumbai Apprentice Recruitment 2026 — 283 Posts | Apprenticeship | See official notification | Notification-wise | 283 Apprentices / 32 trades | generic opening date |
| mp-police-asi-subedar-steno-655-2026 | MP Police ASI / Subedar / Stenographer Recruitment 2026 — 655 Posts | 12th Pass | See official notification | 08/10/2026 | 655 | generic opening date; deadline appears past |
| army-aoc-group-c-2615-2026 | Army Ordnance Corps Group C Recruitment 2026 — 2,615 Posts | 10th Pass | See official notification | Check official notice | 2,615 | generic opening date; generic/relative deadline |
| mecl-accountant-other-2026 | MECL Accountant & Other Recruitment 2026 | Government Jobs | See official notification | 11/10/2026 | As per notification | generic opening date; generic vacancy count |
| ndma-young-consultant-2026 | NDMA Young Consultant — Forest Fire Risk Management | Government Jobs | See official notification | 18/10/2026 | As per notification | generic opening date; generic vacancy count |
| nbems-executive-director-2026 | NBEMS Executive Director Recruitment 2026 | Government Jobs | See official notification | 30/10/2026 | As per notification | generic opening date; generic vacancy count |
| rrb-ntpc-5165-2026 | RRB NTPC 2026 — 5,165 Posts | Railway Jobs | See official notification | As per CEN 06/2026 & CEN 07/2026 schedule | 5,165 | generic opening date |
| rrb-alp-11127-2026-exam | RRB Assistant Loco Pilot 2026 — 11,127 Posts | Railway Jobs | See official notification | Application closed — Exam 03/11/2026 to 05/11/2026 | 11,127 | generic opening date |
| rrc-western-sports-quota-2026-27 | Western Railway Sports Quota Recruitment 2026-27 | Railway Jobs | See official notification | Check official notification | Sports-discipline wise | generic opening date; generic/relative deadline |
| drdo-director-dia-coe-2026 | DRDO Director, DIA-CoE, BHU Recruitment 2026 | Defence / Research | See official notification | 30/10/2026 | 1 | generic opening date |
| drdo-dgre-jrf-2026-27 | DRDO DGRE Chandigarh JRF Recruitment 2026-27 | Defence / Research | See official notification | 15/10/2026 | As per notification | generic opening date; generic vacancy count |
| drdo-mtrdc-jrf-2026 | DRDO MTRDC Bengaluru JRF Recruitment 2026 | Defence / Research | See official notification | 15/10/2026 | As per notification | generic opening date; generic vacancy count |
| psssb-group-b-13-2026 | PSSSB Group B Recruitment 2026 — Advt. 13/2026 | Punjab Jobs | See official notification | 22/10/2026 | 10 | generic opening date |
| punjab-police-10000-upcoming-2026 | Punjab Police Recruitment 2026 — Around 10,000 Posts Upcoming | Punjab Police | See official notification | Notification awaited | Around 10,000 announced | generic opening date |
| ap-police-constable-1027-2026 | AP Police Constable Recruitment 2026 — 1,027 Posts | Police Jobs | See official notification | Application dates to be announced | 1,027 | generic opening date |
| ruhs-medical-officer-600-2026 | RUHS Medical Officer Recruitment 2026 — 600 Posts | Rajasthan Jobs | See official notification | 13/10/2026 | 600 | generic opening date |
| upsc-direct-recruitment-12-2026 | UPSC Direct Recruitment — Advertisement No. 12/2026 | UPSC Jobs | See official notification | 16/10/2026 | Post-wise | generic opening date |
| employment-news-nsic-tsc-2026 | NSIC Technical Services Centre Recruitment — Employment News Issue 27 | Central Government Jobs | See official notification | Check official advertisement | As per advertisement | generic opening date; generic/relative deadline |
| employment-news-cfti-2026 | Central Footwear Training Institute Recruitment — Employment News Issue 27 | Central Government Jobs | See official notification | Check official advertisement | As per advertisement | generic opening date; generic/relative deadline |
| ignou-teaching-2026 | IGNOU Teaching Recruitment 2026 — Professor / Associate Professor / Assistant Professor | Teaching / University | See official notification | 20/10/2026 | Subject-wise | generic opening date |
| bpsc-tre-4-32388-2026 | BPSC TRE 4.0 Recruitment 2026 — 32,388 Teachers | Teaching Jobs | See official notification | 26/10/2026 | 32,388 | generic opening date |
| upessc-assistant-professor-1936-2026 | UPESSC Assistant Professor Recruitment 2026 — 1,936 Posts | Teaching Jobs | See official notification | 07/10/2026 | 1,936 | generic opening date; deadline appears past |
| up-pgt-2607-2026 | UP PGT Recruitment 2026 — 2,607 Posts | Teaching Jobs | See official notification | Check official schedule | 2,607 | generic opening date; generic/relative deadline |
| esic-alwar-faculty-166-2026 | ESIC Medical College Alwar Faculty & Senior Resident Recruitment 2026 — 166 Posts | Health / Teaching | See official notification | Rolling / walk-in schedule | 166 provisional | generic opening date |
| haryana-health-multiple-2026 | Haryana Health Department — Medical Officer, Specialist, Staff Nurse & Laboratory Technician Recruitments | Haryana Health Jobs | See official notification | Department/notice-wise | Post-wise | generic opening date |
| uiic-ao-225-2026 | UIIC Administrative Officer (AO) 2026 — 225 Posts | Insurance Jobs | See official notification | Application closed — Exam 22/10/2026 | 225 | generic opening date |
| ibps-csa-xvi-2026 | IBPS Customer Service Associates (CSA) XVI — 2026 | Banking Jobs | See official notification | Registration closed — Preliminary Exam 10-11/10/2026 | As per notification | generic opening date; generic vacancy count |
| ibps-so-xvi-2026-main | IBPS Specialist Officer (SPL) XVI — 2026 | Banking Jobs | See official notification | Registration closed — Main Exam 01/11/2026 | As per notification | generic opening date; generic vacancy count |
| ibps-rrb-xv-2026 | IBPS RRB XV — Officers & Office Assistants 2026 | Banking Jobs | See official notification | As per notification | As per notification | generic opening date; generic/relative deadline; generic vacancy count |
| ibps-local-bank-officer-2026-27 | IBPS Local Bank Officer in JMGS-I 2026-27 | Banking Jobs | See official notification | Application not yet started | As per notification | generic opening date; generic vacancy count |
| upsc-adv-12-2026-direct-2026 | UPSC Direct Recruitment Advertisement No. 12/2026 — Various Posts | UPSC Jobs | See official notification | 16/10/2026 | Post-wise | generic opening date |
| upsc-engineering-services-2027 | UPSC Engineering Services Examination 2027 | UPSC Jobs | See official notification | As per UPSC schedule | As per notification | generic opening date; generic vacancy count |
| ssc-cpo-1871-2026 | SSC CPO 2026 — 1,871 Sub-Inspector Posts | SSC Jobs | See official notification | Application closed — Exam 20–28/11/2026 | 1,871 | generic opening date |
| ssc-chsl-2026-exam-update | SSC CHSL 2026 — 2,536 Posts | SSC Jobs | See official notification | Application closes 07/10/2026 | 2,536 | generic opening date; deadline appears past |
| upsc-epfo-apfc-80-2026 | UPSC EPFO APFC 2026 — 80 Posts | UPSC / EPFO | See official notification | Application closed — Exam 20/12/2026 | 80 | generic opening date |
| canara-bank-apprentice-3500-2026 | Canara Bank Graduate Apprentice Recruitment 2026 — 3,500 Posts | Banking Jobs | See official notification | 17/10/2026 | 3,500 | generic opening date |
| nit-non-faculty-2026 | NIT Non-Faculty Recruitment 2026 | Central Government Jobs | See official notification | 30/10/2026 | Post-wise | generic opening date |
| ieb-srd-2026 | IEB Special Recruitment Drive 2026 | Central Government Jobs | See official notification | 10/10/2026 | As per notification | generic opening date; generic vacancy count |
| sahitya-akademi-30-2026 | Sahitya Akademi Recruitment 2026 — 30 Posts | Central Government Jobs | See official notification | 21/10/2026 | 30 | generic opening date |
| rrb-nursing-superintendent-365-2026 | RRB Nursing Superintendent Recruitment 2026 — 365 Posts | Railway Jobs | See official notification | 14/10/2026 11:59 PM | 365 | generic opening date |
| rajasthan-safai-24752-2026 | Rajasthan Contractual Safai Karamchari Recruitment 2026 — 24,752 Posts | Rajasthan Jobs | See official notification | 13/10/2026 | 24,752 | generic opening date |
| up-prt-12405-2026 | UP PRT Teacher Recruitment 2026 — 12,405 Posts | Teaching Jobs | See official notification | 15/10/2026 | 12,405 | generic opening date |
| up-pgt-2607-2026-oct | UP PGT Teacher Recruitment 2026 — 2,607 Posts | Teaching Jobs | See official notification | 17/10/2026 | 2,607 | generic opening date |
| bpsc-tre-4-33320-2026 | BPSC TRE 4.0 Teacher Recruitment 2026 — 33,320 Posts | Teaching Jobs | See official notification | 26/10/2026 | 33,320 | generic opening date |
| up-assistant-professor-1926-2026 | UP Assistant Professor Recruitment 2026 — 1,926 Posts | Teaching Jobs | See official notification | As per official schedule | 1,926 | generic opening date |
| aiims-rewari-jr-25-2026 | AIIMS Rewari Junior Resident Recruitment 2026 — 25 Posts | Haryana Health Jobs | See official notification | 28/10/2026 | 25 | generic opening date |
| sainik-school-kunjpura-15-2026 | Sainik School Kunjpura Recruitment 2026 — 15 Posts | Haryana Jobs | See official notification | 31/10/2026 | 15 | generic opening date |
| nift-em-jrf-2026 | NIFTEM JRF Recruitment 2026 | Haryana Jobs | See official notification | 08/10/2026 | 1 | generic opening date; deadline appears past |
| rites-assistant-manager-2-2026 | RITES Assistant Manager Recruitment 2026 — 2 Posts | Haryana Jobs | See official notification | 27/10/2026 | 2 | generic opening date |
| mp-police-7500-2026 | MP Police Constable Recruitment 2026 — 7,500 Posts | Police Jobs | See official notification | As per official notification | 7,500 | generic opening date |
| mp-asi-subedar-655-2026 | MP Police ASI / Subedar Recruitment 2026 — 655 Posts | Police Jobs | See official notification | As per official notification | 655 | generic opening date |
| rrc-jaipur-apprentice-2008-2026 | RRC Jaipur / North Western Railway Apprentice Recruitment 2026 — 2,008 Posts | Apprenticeship | See official notification | 06/11/2026 | 2,008 | generic opening date |
| cdac-844-2026 | C-DAC Recruitment 2026 — 844 Various Posts | Central Government Jobs | See official notification | As per official notification | 844 | generic opening date |
| mecon-159-ftft-2026 | MECON FTFT Recruitment 2026 — 159 Various Posts | PSU Jobs | See official notification | As per official notification | 159 | generic opening date |
| dsssb-641-2026 | DSSSB Recruitment 2026 — 641 Peon, PA & Other Posts | Delhi Government Jobs | See official notification | As per official notification | 641 | generic opening date |
| upcoming-ssc-gd-2027 | SSC GD Constable 2027 — Upcoming Recruitment | Upcoming Vacancy | See official notification | Notification/Application window as per SSC calendar | To be notified | generic opening date |
| upcoming-upsc-nda-na-i-2027 | UPSC NDA & NA (I) 2027 — Upcoming | Upcoming Vacancy | See official notification | Notification/application dates as per UPSC Annual Calendar 2027 | To be notified | generic opening date |
| upcoming-upsc-cds-i-2027 | UPSC CDS (I) 2027 — Upcoming Defence Recruitment | Upcoming Vacancy | See official notification | Notification/application dates as per UPSC Annual Calendar 2027 | To be notified | generic opening date |
| upcoming-upsc-cisf-ac-2027 | UPSC CISF AC(EXE) LDCE 2027 — Upcoming | Upcoming Vacancy | See official notification | Notification/application dates as per UPSC Annual Calendar 2027 | To be notified | generic opening date |
| upcoming-ssc-cgl-2027 | SSC CGL 2027 — Upcoming Graduate Level Recruitment | Upcoming Vacancy | See official notification | Expected as per next SSC calendar/notification | To be notified | generic opening date |
| upcoming-ssc-je-2027 | SSC Junior Engineer 2027 — Upcoming | Upcoming Vacancy | See official notification | Expected as per next SSC calendar/notification | To be notified | generic opening date |
| upcoming-rrb-group-d-next | RRB Group D — Next Recruitment / Upcoming Cycle | Upcoming Vacancy | See official notification | Official notification awaited | To be notified | generic opening date |
| upcoming-rrb-alp-next | RRB ALP — Next Recruitment / Upcoming Cycle | Upcoming Vacancy | See official notification | Official notification awaited | To be notified | generic opening date |
| upcoming-hssc-group-c-2027 | HSSC Group C — Upcoming Recruitment Cycle | Upcoming Vacancy | See official notification | Official advertisement awaited | To be notified | generic opening date |
| upcoming-haryana-police-2027 | Haryana Police — Upcoming Recruitment Cycle | Upcoming Vacancy | See official notification | Official notification awaited | To be notified | generic opening date |
| upcoming-nvs-2027 | Navodaya Vidyalaya Samiti — Upcoming Teaching & Non-Teaching Recruitment | Upcoming Vacancy | See official notification | Official notification awaited | To be notified | generic opening date |
| upcoming-sainik-schools-2027 | Sainik Schools — Upcoming Teaching & Non-Teaching Recruitment | Upcoming Vacancy | See official notification | School-wise notification awaited | School-wise | generic opening date |
| state-haryana | HSSC CET Phase-II Group-C Recruitment 2026 (Advt. No. 06/2026) | State Job | 24/06/2026 | 30/06/2026 (11:59 PM) | 1,238 posts: Prison Assistant Superintendent (Male) 30, Prison Assistant Superintendent (Female) 3, Prison Warder (Female) 112, Prison Warder (Male) 1,093. | deadline appears past |
| bihar-bpsc-72nd-cce-2026 | BPSC 72nd Combined Competitive Examination | State Job | Notification-wise | Check official notification | 1,189 posts listed in BPSC exam calendar | generic/relative deadline |
| hppscc-64-10-2026 | HPPSC Assistant Professor (Superspecialty) GI Surgery — Advt. 64/10-2026 | State Job | 06/10/2026 | Check official notification | Assistant Professor, GI Surgery | generic/relative deadline |
| hppsc-agriculture-development-officer-2026 | Agriculture Development Officer Group-A (Job-Trainee) — Advt. 63/9-2026 | State Job | 25/09/2026 | Check official notification | Agriculture Development Officer Group-A | generic/relative deadline |
| odisha-aee-civil-2026 | OPSC Assistant Executive Engineer (Civil) — Advt. No.07 of 2026-27 | State Job | Notification-wise | Check official advertisement | Category-wise vacancy published by OPSC | generic/relative deadline |
| odisha-assistant-agriculture-engineer-2026 | OPSC Assistant Agriculture Engineer — Advt. No.08 of 2026-27 | State Job | Notification-wise | Check official advertisement | Assistant Agriculture Engineer posts | generic/relative deadline |
| puducherry-forest-consultant-2026 | Consultant — Directorate of Forests & Wildlife | State Job | 28/09/2026 | 09/10/2026 | Consultant engagement | deadline appears past |
| andaman-dhs-various-posts-2026 | DHS North & Middle Andaman — Various Posts Recruitment | State Job | 07/10/2026 | As per notice | Various posts | generic vacancy count |
| chandigarh-utcps-contract-2026 | UT Child Protection Society — Contractual Posts (Corrigendum) | State Job | 05/10/2026 | Check official corrigendum | Contractual posts — see notice | generic/relative deadline |
| haryana-hssc-groupd-052026 | HSSC CET Group-D 05/2026 — Apply / Recruitment | State Job | Notification-wise | 03/07/2026 11:59 PM | CET Group-D posts — as per Advt. 05/2026 | deadline appears past |
| hppsc-ado-63-2026 | HPPSC Agriculture Development Officer Group-A (Job-Trainee) — Advt. 63/9-2026 | State Job | 25/09/2026 | Check official HPPSC advertisement | Agriculture Development Officer — as notified | generic/relative deadline |
| mpesb-subedar-asi-steno-2026 | MPESB Subedar (Secretarial), Stenographer & Assistant Sub-Inspector (Secretarial) Recruitment 2026 | State Job | 24/09/2026 | 08/10/2026 | As per MPESB recruitment notification | deadline appears past |
| odisha-osssc-radiographer-2026-v2 | OSSSC Radiographer Recruitment 2026 — Registration / Re-registration / Online Application | State Job | 30/09/2026 | Check official extension notice | Radiographer-2026 — as per official recruitment notification | generic/relative deadline |
| odisha-ssb-junior-assistant-chse-2026 | Odisha SSB Junior Assistant in CHSE Recruitment 2026 — Advt. 03/2026 | State Job | 29/06/2026 | 13/04/2026 | 883 Posts | deadline appears past |
| railway-ncr-gdce-01-2026 | North Central Railway GDCE Recruitment 2026 — Notification No. RRC/NCR/GDCE-01/2026 | Central Job | 28/09/2026 | Check official detailed notification | Posts under General Departmental Competitive Examination — as per detailed zonal notification | generic/relative deadline |
| railway-nwr-cultural-quota-2026 | North Western Railway Cultural Quota Recruitment 2026-27 | Central Job | 18/08/2026 | Check official notification | Cultural Quota posts as notified by RRC NWR | generic/relative deadline |
| rrb-paramedical-cen-05-2026 | RRB Paramedical Recruitment 2026 — CEN 05/2026 | Railway Job | 11/09/2026 | 09/10/2026 | 590 posts — Nursing Superintendent, Pharmacist, Health & Malaria Inspector Grade III and other paramedical categories | deadline appears past |
| kvs-deputy-commissioner-direct-2026 | Kendriya Vidyalaya Sangathan — Deputy Commissioner Direct Recruitment 2026 | Teaching Job | 01/10/2026 | Check official Advertisement No. 05/2026 | Deputy Commissioner — direct recruitment | generic/relative deadline |
| ircon-mts-office-support-015-2026 | IRCON MTS / Office Support Recruitment 2026 — IRCON/RECT/2026/015 | Private Job | As per official notification | 07/10/2026 | MTS / Office Support posts | deadline appears past |
| ircon-clerk-deo-017-2026 | IRCON Junior Office Assistant / Clerk / DEO Recruitment 2026 — IRCON/RECT/2026/017 | Private Job | As per official notification | 07/10/2026 | Junior Office Assistant / Clerk / DEO posts | deadline appears past |
| ircon-storekeeper-material-018-2026 | IRCON Storekeeper / Material Assistant Recruitment 2026 — IRCON/RECT/2026/018 | Private Job | As per official notification | 07/10/2026 | Storekeeper / Material Assistant posts | deadline appears past |
| ircon-trade-technician-019-2026 | IRCON Trade Technician — Fitter / Electrician / Welder Recruitment 2026 — IRCON/RECT/2026/019 | Private Job | As per official notification | 07/10/2026 | Trade Technician posts in Fitter, Electrician and Welder categories | deadline appears past |
| iit-jodhpur-apprentice-2-2026 | IIT Jodhpur Apprentice Recruitment 2026 — IITJ/Apprentice (2)/2026 | Apprenticeship | 30/09/2026 | Check official advertisement | Apprentice positions as notified by IIT Jodhpur | generic/relative deadline |
| apprenticeship-job-fair-begusarai-2026 | Apprenticeship-Cum-Job Fair — Begusarai, Bihar — 07 October 2026 | Apprenticeship | 07/10/2026 | 07/10/2026 | 910 vacancies across 20 registered establishments | deadline appears past |
| tnpsc-technical-08-2026 | TNPSC Combined Technical Services Examination — Interview Posts | State Job | 07/09/2026 | 06/10/2026 | As per Notification No.08/2026 | generic vacancy count; deadline appears past |
| telangana-hyd-ayush-2026 | Hyderabad District AYUSH — Various Posts under NAM Scheme 2026 | State Job | 12/10/2026 | 22/10/2026 05:00 PM | Various posts: Medical Officer, Dietician, MPW, Psychosocial Counselor, Yoga Professional | generic vacancy count |
| ddd-samagra-shiksha-2026 | Directorate of Education — Samagra Shiksha Contract Recruitment 2026 | State Job | 16/09/2026 | 09/10/2026 | Posts as per Directorate of Education advertisement | deadline appears past |
| haryana-ulb-taxation-experts-2026 | Haryana ULB Taxation Experts / Associates / Sanitation Experts Associates Recruitment | State Job | See official recruitment notice | 30/09/2026 | Post-wise contractual vacancies | generic opening date; deadline appears past |
| andaman-dhs-various-posts-2026-v2 | DHS North & Middle Andaman — Various Posts Recruitment 2026 | State Job | 07/10/2026 | As per notice | Various posts — exact post-wise vacancies in notice | generic vacancy count |
| cdsco-deputy-director-2026 | CDSCO Deputy Director — Central Drugs Testing Laboratory, Mumbai | Central Job | 05/10/2026 | See official advertisement | 1 post / as per official advertisement | generic/relative deadline |
| telangana-hyd-ayush-outsourcing-2026 | Hyderabad District AYUSH — Various Categories Recruitment 2026 | State Job | 12/10/2026 | 22/10/2026 | Various posts — Medical Officer, Dietician, MPW, Psychosocial Counselor, Yoga Professional and others as notified | generic vacancy count |
| coast-guard-cgept-01-02-2027 | Indian Coast Guard CGEPT — Batches 01/2027 & 02/2027 | Defence | 06/10/2026 | See official notification | Enrolled Personnel recruitment — batch-wise vacancies in official notification | generic/relative deadline |
| wbpsc-principal-diet-2026 | WBPSC Principal — District Institute of Education & Training Recruitment 2026 | State Job | See official notification | See official extension notice | Principal posts as notified under Advt. 05/2026 | generic opening date; generic/relative deadline |
| uksssc-groupc-553-2026 | UKSSSC Group-C Junior Assistant, Registration Clerk & Other Recruitment 2026 | State Job | 08/09/2026 | 07/10/2026 | 553 posts | deadline appears past |
| kerala-nam-pathanamthitta-2026 | NAM Pathanamthitta Ayurveda Therapist, GNM Nurse & MPW Recruitment 2026 | State Job | 06/10/2026 | 13/10/2026 | Various posts | generic vacancy count |
| arunachal-apssb-chsl-2026 | APSSB Combined Higher Secondary Level Examination 2026 | State Job | See official notification | 08/10/2026 03:00 PM | Post-wise vacancies in CHSL Examination 2026 advertisement | generic opening date; deadline appears past |
| meghalaya-kisce-nutritionist-yp-2026 | Meghalaya KISCE Nutritionist & Young Professional Recruitment 2026 | State Job | 17/09/2026 | See official advertisement | Nutritionist and Young Professional posts | generic/relative deadline |
| nagaland-governor-secretariat-mts-2026 | Nagaland Governor's Secretariat MTS, Bearer & Masalchi Recruitment 2026 | State Job | 07/10/2026 | See official addendum | MTS, Bearer and Masalchi posts | generic/relative deadline |
| mizoram-mpsc-peon-3-2026 | Mizoram PSC Peon (PE) Recruitment 2026 | State Job | See official advertisement | 13/10/2026 | 3 posts | generic opening date |
| mizoram-mpsc-ldc-4-2026 | Mizoram PSC Lower Divisional Clerk (LDC) Recruitment 2026 | State Job | See official advertisement | 12/10/2026 | 4 posts | generic opening date |
| sikkim-state-support-mission-4-2026 | Sikkim State Support Mission — Team Leader & Sector Experts | State Job | 03/10/2026 | See official notice | 4 posts — 1 Team Leader + 3 Sector Experts | generic/relative deadline |
| odisha-opsc-aee-civil-2026 | OPSC Assistant Executive Engineer (Civil) Recruitment 2026 | State Job | See official advertisement | See official advertisement/corrigendum | Post-wise vacancies under Advt. No. 07/2026-27 | generic opening date; generic/relative deadline |
| odisha-opsc-assistant-agri-eng-2026 | OPSC Assistant Agriculture Engineer Recruitment 2026 | State Job | See official advertisement | See official advertisement/corrigendum | Post-wise vacancies under Advt. No. 08/2026-27 | generic opening date; generic/relative deadline |
| tripura-tpsc-forest-ranger-2026 | Tripura PSC Forest Ranger Recruitment 2026 | State Job | See official notification | See official notification | Forest Ranger posts as notified by TPSC | generic opening date; generic/relative deadline |
| kerala-kscste-executive-director-2026 | KSCSTE Executive Director — CWRDM | State Job | See official notice | 17/10/2026 05:00 PM | 1 post | generic opening date |
| kerala-kscste-director-jntbgri-2026 | KSCSTE Director — JNTBGRI | State Job | See official notice | 22/10/2026 05:00 PM | 1 post | generic opening date |
| wb-psc-principal-diet-2026 | WBPSC Principal, District Institute of Education & Training — Advt 05/2026 | Teaching | 30/04/2026 | Expired — 21/05/2026 | 12 posts | deadline appears past |
| odisha-osssc-radiographer-2026-extension | OSSSC Radiographer Recruitment 2026 — Application Deadline Extension | State Job | See official notice | See official extension notice | As per Radiographer-2026 advertisement | generic opening date; generic/relative deadline |
| tripura-high-court-cook-2026 | Tripura High Court Cook (Group-D) Recruitment 2026 | State Job | 25/09/2026 | See official notification | 1 post | generic/relative deadline |
| rajasthan-jen-direct-joint-2026 | Rajasthan Direct Joint Recruitment of JEN 2026 | State Job | 14/09/2026 | See official Rajasthan Recruitment Portal | Post-wise vacancies as per official JEN 2026 recruitment notice | generic/relative deadline |
| neet-ug-mbbs-counselling-2026 | NEET UG 2026 MBBS / BDS Counselling — Schedule, Seat Matrix & Allotment | Counselling / Admission | Round 3 registration: 22/09/2026 | Round 3 registration closed: 27/09/2026; see latest MCC schedule for subsequent rounds | MBBS / BDS and B.Sc Nursing seats under MCC-managed quotas; seat matrix varies by round. | deadline appears past |

## Verification standard for closure

A record should only be marked fully verified when the official notice/career page has been opened and the post name, dates, total and post-wise vacancies, eligibility, age/relaxation, fee, selection process and direct application/notice links have been compared. A successful Pages deployment or a syntactically valid URL is not enough. Expired notices should be marked closed/archive and not presented as open applications.

## Live/browser verification

Browser test workflow: https://github.com/amitjaglan251/aj-digital-point/actions/workflows/live-site-browser-verification.yml
Live Jobs: https://amitjaglan251.github.io/aj-digital-point/latest-jobs.html
Job Details: https://amitjaglan251.github.io/aj-digital-point/job-details.html

## Follow-up update — 10 October 2026

After the baseline audit, the post-processing file `job-data-quality-fixes.js` was updated for MECL Non-Executive Recruitment, Advertisement 03/Rectt./2026. The canonical record now displays the reported total of 122 vacancies across 16 post categories, a general age ceiling of 30 years as of 01/09/2026, the reported ₹500 fee for General/OBC-NCL/EWS candidates with exemptions subject to the notice, and a summary of the selection stages. The official MECL advertisement listing and IBPS-hosted application portal are linked.

**Verification status remains PARTIAL:** registration dates and the existence of the advertisement are confirmed from official pages, but post-wise vacancy/category distribution, qualifications, experience, and all category-specific conditions have not yet been fully transcribed and cross-checked against the detailed PDF. Treat the detailed notice as authoritative; do not interpret this follow-up as completion of the 371-record manual verification.

The fix is loaded with cache-busted versions in `latest-jobs.html` (`job-data-quality-fixes.js?v=20261010-34`) and `job-details.html` (`job-data-quality-fixes.js?v=20261010-31`). GitHub source files were re-fetched after the commits to confirm these references and MECL fields; this source check is not a live browser-render verification.


## Follow-up update — IBPS-hosted active recruitment portals

Checked the live IBPS recruitment index and the individual registration portals for these current listings:

- **KUCBL Managers and Assistant Managers:** registration and online fee payment 02/10/2026–25/10/2026; application print through 10/11/2026. Official portal: https://ibpsreg.ibps.in/kucbldec25/
- **MPA Class I & II Posts:** registration and online fee payment 29/09/2026–28/10/2026; application print through 12/11/2026. Official portal: https://ibpsreg.ibps.in/mpajul26/

The IBPS index also lists both recruitments. These checks confirm the advertised titles and portal date windows only. Vacancy totals, post-wise qualifications, age criteria, fee concessions and selection details remain marked **partially verified** until they are transcribed from each detailed notification. Application-print dates do not extend the registration deadline.

Sources: IBPS recruitment index https://www.ibps.in/index.php/recruitment/ ; KUCBL registration portal above; MPA registration portal above. Source-page check completed 10/10/2026; this is not a live browser-render test of the AJ DIGITAL POINT website.


## Follow-up update — Kendrapara Urban Co-operative Bank recruitment notice reviewed

The issuing bank career page and its 23-page detailed PDF were reviewed on 10 October 2026. The record now identifies the issuer as **The Kendrapara Urban Co-operative Bank Ltd., Odisha** (rather than the ambiguous expanded acronym), and includes the notice-backed post counts (Manager: 6; Assistant Manager: 8), Odisha-residency condition, degree/experience criteria, age limits, application fee, written-test pattern, viva-voce selection, document checklist, issuer career page, detailed PDF and IBPS application portal.

**Date discrepancy disclosed:** the notice's opening schedule and live IBPS portal give registration/fee payment as **02/10/2026–25/10/2026**, while a later fee paragraph inside the PDF says the fee window ends **21/10/2026**. The site uses the schedule/portal date and explicitly warns candidates to follow the live portal and any official corrigendum. No exam date is asserted; the bank only says November/December 2026 tentatively.

Official sources:
- Bank career page: https://www.kendraparaucb.bank.in/career.html
- Detailed notification PDF: https://www.kendraparaucb.bank.in/resizeimages/Recruitment_Notification_Manager_Asst_Manager_2026.pdf
- IBPS application portal: https://ibpsreg.ibps.in/kucbldec25/

This improves one record from date-only confirmation to detailed-notice review. It does **not** mean the full 371-record manual verification is complete, nor is it a live browser-render test of AJ DIGITAL POINT.


## Follow-up update — Canara Bank Graduate Apprentices FY 2026–27

The Canara Bank official 20-page advertisement and IBPS registration portal were re-opened and cross-checked on 10 October 2026. The site record now includes additional notice-backed details beyond the previously stored seat count, eligibility, age and stipend:

- 3,500 provisional training seats, with state/category allocation linked to the official PDF; Haryana has 114 indicative seats and lists Hindi/Punjabi as local language.
- Fee: SC/ST/PwBD nil; all other categories ₹500 including intimation charges (non-refundable, GST included).
- State-wise merit based on 12th (HSC/10+2) or Diploma marks: minimum 60%, or 55% for SC/ST/PwBD; older age breaks equal-percentage ties.
- Document verification, applicable local-language test and medical fitness; 12-month apprenticeship period.
- Stipend ₹16,650 per month in total: ₹10,500 from the Bank and ₹6,150 Government DBT share, as described in the notice.
- Document checklist, official bank career page, detailed advertisement PDF and IBPS application portal.

The record clearly distinguishes apprenticeship training from regular employment and notes that the bank does not guarantee regular employment after training. Application dates remain 01/10/2026–17/10/2026; application printing through 01/11/2026 is not an extension of the application deadline.

Official sources:
- Bank career page: https://www.canarabank.bank.in/engagement-of-graduate-apprentices-in-canara-bank-under-apprentices-act-1961-for-fy-2026-27
- Detailed official PDF: https://www.canarabank.bank.in/documents/d/guest/apprenticeship-advertisement-2026-27
- IBPS registration portal: https://ibpsreg.ibps.in/cabgasep26/

This is a detailed verification of one record, not completion of all 371 records and not a live browser-render test of the AJ DIGITAL POINT website.


## Follow-up update — NIT Raipur Group B/C non-teaching recruitment listing

The official NIT Raipur recruitment listing was checked on 10 October 2026. It identifies **Recruitment for various Group B & C Non-Teaching posts under Direct Recruitment**, Advertisement No. **NITRR/R-1/Advt./2026/1035 dated 29/09/2026**, with a last date of **30/10/2026**. The site now includes a record linked to the institute's official recruitment page.

**Only the title, advertisement reference/date and last date are confirmed in this pass.** The exact post-wise vacancy totals/category split, opening date, qualifications, experience/age limits, fee, selection stages and direct application URL have not yet been transcribed from the linked detailed advertisement. Those fields are explicitly marked as notice-dependent rather than guessed. The recruitment page is used as the entry point because the search result did not expose a reliable direct PDF/application URL.

Official source: https://nitrr.ac.in/advertisement.php/downloads/recruitment/results.php

This is one more source-confirmed recruitment listing, not a claim that all details are verified or that the complete 371-record audit is finished. Live browser rendering of AJ DIGITAL POINT remains unverified.

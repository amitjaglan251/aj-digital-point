/* AJ DIGITAL POINT — recruitment data quality safeguards.
 * Reviewed 10/10/2026 against official recruitment pages.
 * Keep uncertain notices out of the public vacancy feed until a matching
 * official notification can be confirmed; never show an unverified deadline
 * or vacancy count as an active recruitment.
 */
(function () {
  const data = window.AJ_JOB_DATA;
  if (!Array.isArray(data)) return;

  const obsoleteIds = new Set([
    // Obsolete combined TRAI entry; the two location-specific circulars remain.
    "haryana-cs-joint-advisor-trai-2026",
    // Duplicate records for the same official notice; retain the richer canonical record.
    "mecl-nonexecutive-03-2026",
    "ieb-srd-2026",
    // RRB CEN 05/2026 Paramedical notice could not be matched on the official RRB
    // employment-notices page on 10/10/2026. Remove both unconfirmed records until verified.
    "rrb-cen-05-2026-paramedical",
    "rrb-cen-05-2026-paramedical-new",
    // DRDO DGRE page entry is a selected-candidates list, not an open recruitment notice.
    "drdo-dgre-jrf-2026-27",
    // Official 2026 notices could not be matched; similarly named current BSEB page is STET 2025.
    "bseb-bihar-stet-2026",
    // No matching current BMHRC Group B/C recruitment was found on the official recruitment page;
    // the matching official Group B/C notice found in search was from 2023, not 2026.
    "icmr-bmhrc-group-b-c-2026",
    // These records contain material conflicts with official calendars/pages or lack a matching current notice.
    "upsc-epfo-80-apfc",
    "ssc-cpo-si-2026",
    "ssc-chsl-2536-2026",
    // The matching IOB Specialist Officer PDF found is Advertisement HRDD/RECT/03/2025-26,
    // dated 12/09/2025 with closing date 03/10/2025; no matching 2026 notice was located.
    "indian-overseas-bank-so",
    // CSIR official archive did not substantiate the generic 43-post record; it lists different
    // notices (including a CSIR Hqrs Technician-I notice with one post), so keep hidden pending match.
    "csir-43-technician-1",
    // No matching official current notice found for these records in this pass; hide until identified.
    "federal-bank-sales-officer-2026",
    "itbp-capf-282-medical-officer",
    "dgqa-15-technician",
    "iaf-agniveer-non-combatant",
    // Stored dates could not be matched to the official recruitment cycle; hide until exact notice is identified.
    "south-indian-bank-junior-officer",
    "south-indian-bank-probationary-officer",
    "delhi-dpcc-environment-engineer",
    "delhi-dtl-assistant-manager-trainee",
    // Exact official notice not located for the 2,049-post BGSSL record or the 206-post generic BOB SO record.
    "bgissl-2049-various-vacancies",
    "bank-of-baroda-specialist-officer",
    // Batch 7 official-source reconciliation (10/10/2026): these records have unresolved
    // notice/deadline conflicts; hide until the exact current advertisement is matched.
    "bpsc-tre-4-32388-2026",
    "ruhs-medical-officer-600-2026",
    "psssb-group-b-13-2026",
    "rrb-nursing-superintendent-365-2026",
    "upsc-epfo-apfc-80-2026",
    "ssc-chsl-2026-exam-update",
    "nvs-recruitment-2026-27",
    // CEN 01/2026 ALP application already closed; do not list same notice as an upcoming vacancy.
    "upcoming-rrb-alp-2026-27",
    // No matching current official CEN was found for the claimed 5,165-post 2026 NTPC record.
    "rrb-ntpc-5165-2026",
    "mecl-accountant-other-2026",
    // The record is not the same as the current MECL Non-Executive Advt. 03/Rectt./2026.
    // Exact 2026 Accountant notice and 11/10/2026 deadline were not established.
    // The other three records also lack a fully matching current official application notice.
    // Keep them out of the public feed rather than showing unverified dates/counts as active.
    // Duplicate representations of UPSC Advt. 12/2026; retain the canonical record with detailed dates.
    "upsc-direct-recruitment-12-2026",
    "upsc-adv-12-2026-direct-2026"
  ]);

  const seen = new Set();
  window.AJ_JOB_DATA = data.filter(function (item) {
    if (!item || typeof item !== "object") return true;
    if (obsoleteIds.has(item.id)) return false;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  // UPSC Advertisement No. 12/2026 was announced by PIB on 26/09/2026.
  // Official PIB notice states applications run 26/09/2026–16/10/2026; retain this
  // canonical record while suppressing duplicate IDs below. Vacancy details are post-wise
  // and must be taken from the detailed UPSC advertisement, not inferred here.
  const upscAd12 = window.AJ_JOB_DATA.find(function (item) {
    return item.id === "upsc-direct-recruitment-advt-12-2026";
  });
  if (upscAd12) {
    upscAd12.openDate = "26/09/2026";
    upscAd12.lastDate = "16/10/2026";
    upscAd12.official = "https://www.upsc.gov.in/recruitment/recruitment-advertisement";
    upscAd12.notice = "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2315209&lang=1&reg=3";
    upscAd12.apply = "https://upsconline.nic.in/";
    upscAd12.vacancy = "Post-wise vacancies as specified in UPSC Advertisement No. 12/2026; check the detailed official advertisement.";
    upscAd12.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: PIB official press release confirms UPSC Advertisement No. 12/2026 application window 26/09/2026–16/10/2026. Consult the detailed UPSC advertisement for post-wise vacancy, eligibility, fee and selection details.";
    upscAd12.updates = "Official PIB notice published 26/09/2026 confirms online applications from 26/09/2026 to 16/10/2026. Detailed vacancy/eligibility particulars must be checked in the UPSC advertisement.";
  }

  // The IBPS official recruitment page lists IEB Special Recruitment Drive (SRD)
  // for 15/09/2026–10/10/2026. Only the listing and closing date are verified here;
  // candidates must read the official notice for all eligibility details.
  const ieb = window.AJ_JOB_DATA.find(function (item) {
    return item.id === "ieb-special-recruitment-2026";
  });
  if (ieb) {
    ieb.openDate = "15/09/2026";
    ieb.lastDate = "10/10/2026";
    ieb.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: IBPS official recruitment page confirms the IEB Special Recruitment Drive listing and 10/10/2026 closing date. Vacancy count, eligibility, fee and selection details must be checked in the official notice.";
    ieb.updates = "Official IBPS registration portal checked 10/10/2026. Registration and fee payment close 10/10/2026; application print is available through 25/10/2026. Printing availability does not extend registration. Read the official notice for complete eligibility and instructions.";
    ieb.notice = "https://www.ibps.in/index.php/recruitment/";
    ieb.official = "https://www.ibps.in/index.php/recruitment/";
    ieb.apply = "https://www.ibps.in/index.php/recruitment/";
  }

  // NVS official Class XI lateral-entry portal confirms the extended deadline
  // of 15/10/2026. Keep the date verified, but do not invent a single vacancy count.
  const nvsXI = window.AJ_JOB_DATA.find(function (item) {
    return item.id === "nvs-class-11-lateral-entry-2027-28";
  });
  if (nvsXI) {
    nvsXI.category = "Admission";
    nvsXI.mode = "Online Admission";
    nvsXI.openDate = "See official prospectus/notification";
    nvsXI.lastDate = "15/10/2026 (extended)";
    nvsXI.vacancy = "Class XI lateral-entry admission; school/stream-wise seat availability as per NVS prospectus and eligibility criteria.";
    nvsXI.qualification = "Class X students in eligible schools/areas, subject to NVS Class XI Lateral Entry Selection Test 2027-28 prospectus and criteria.";
    nvsXI.official = "https://navodaya.gov.in/";
    nvsXI.apply = "https://cbseitms.nic.in/2026/nvsxi_11/";
    nvsXI.notice = "https://cbseitms.nic.in/2026/nvsxi_11/";
    nvsXI.verificationStatus = "DEADLINE VERIFIED 10/10/2026: official NVS registration portal says Class XI (2027-28) application deadline extended to 15/10/2026. Check the official prospectus for eligibility, region/district rules and available seats.";
    nvsXI.updates = "Official NVS Class XI 2027-28 registration portal checked 10/10/2026; deadline extended to 15/10/2026. Keep photograph/signature files ready as specified on the portal; follow the prospectus for eligibility.";
  }

  // DRDO's official listing confirms this is a live MTRDC JRF walk-in notice,
  // advertisement MTRDC/RF/RECT/2026/02, closing 15/10/2026.
  const mtrdc = window.AJ_JOB_DATA.find(function (item) {
    return item.id === "drdo-mtrdc-jrf-2026";
  });
  if (mtrdc) {
    mtrdc.openDate = "16/09/2026";
    mtrdc.lastDate = "15/10/2026";
    mtrdc.official = "https://drdo.gov.in/drdo/offerings/vacancies";
    mtrdc.apply = "https://drdo.gov.in/drdo/en/offerings/vacancies/mtrdc-bengaluru-invites-eligible-candidates-walk-interview-post-jrf";
    mtrdc.notice = "https://drdo.gov.in/drdo/en/offerings/vacancies/mtrdc-bengaluru-invites-eligible-candidates-walk-interview-post-jrf";
    mtrdc.verificationStatus = "OFFICIAL LISTING VERIFIED 10/10/2026: DRDO confirms Advertisement MTRDC/RF/RECT/2026/02, published/opened 16/09/2026, closing 15/10/2026. Read the attached official advertisement for exact eligibility, interview date and application instructions.";
    mtrdc.updates = "Official DRDO page lists MTRDC/RF/RECT/2026/02, published 16/09/2026, deadline 15/10/2026. The linked page includes the official advertisement PDF.";
  }

  // IBPS record corrections from official registration pages checked 10/10/2026.
  const ibpsCsa = window.AJ_JOB_DATA.find(function (item) { return item.id === "ibps-csa-xvi-2026"; });
  if (ibpsCsa) {
    ibpsCsa.category = "Banking Jobs";
    ibpsCsa.openDate = "01/08/2026";
    ibpsCsa.lastDate = "28/08/2026 (closed)";
    ibpsCsa.official = "https://www.ibps.in/index.php/crp-updates/";
    ibpsCsa.notice = "https://www.ibps.in/index.php/crp-updates/";
    ibpsCsa.apply = "https://ibpsreg.ibps.in/csaxvijul26/";
    ibpsCsa.verificationStatus = "APPLICATION DATES VERIFIED FROM OFFICIAL IBPS CSA-XVI REGISTRATION PORTAL: registration 01/08/2026–28/08/2026; editing 04–05/09/2026; print deadline 23/09/2026. Preliminary exam 10–11/10/2026 is an exam date, not the application deadline. Use the 29/09/2026 official vacancy update for post counts.";
    ibpsCsa.updates = "IBPS CSA-XVI application window is closed. Official portal checked 10/10/2026; registration ended 28/08/2026. Preliminary call letter was posted 01/10/2026; preliminary exam dates are 10–11/10/2026.";
  }

  const ibpsRrb = window.AJ_JOB_DATA.find(function (item) { return item.id === "ibps-rrb-xv-2026"; });
  if (ibpsRrb) {
    ibpsRrb.category = "Banking Jobs";
    ibpsRrb.openDate = "01/09/2026";
    ibpsRrb.lastDate = "27/09/2026 (closed)";
    ibpsRrb.official = "https://www.ibps.in/index.php/rural-bank-xv/";
    ibpsRrb.notice = "https://www.ibps.in/index.php/rural-bank-xv/";
    ibpsRrb.apply = "https://www.ibps.in/index.php/rural-bank-xv/";
    ibpsRrb.vacancy = "Use the latest official updated-vacancy attachment dated 25/09/2026 for bank/state/post/category totals; do not rely on older vacancy figures.";
    ibpsRrb.verificationStatus = "OFFICIAL IBPS RRB-XV NOTICE/CORRIGENDA PAGE CHECKED 10/10/2026. Notification published 01/09/2026; registration closed 27/09/2026. Updated vacancy lists are dated 09/09, 15/09 and 25/09/2026. Detailed totals must be transcribed from the 25/09 attachment.";
    ibpsRrb.updates = "Application registration closed 27/09/2026; Office Assistant edit window closed 08/10/2026. The official candidate portals still show application-print availability through 12/10/2026, which does not reopen registration. Exam schedule per official IBPS 2026–27 calendar: Officer Scale I prelims 21–22/11/2026; Office Assistant prelims 06, 12 and 13/12/2026; Officers Scale II/III single exam 20/12/2026; Office Assistant main 30/01/2027.";
  }

  const ibpsLbo = window.AJ_JOB_DATA.find(function (item) { return item.id === "ibps-local-bank-officer-2026-27"; });
  if (ibpsLbo) {
    ibpsLbo.category = "Banking Jobs";
    ibpsLbo.title = "Bank of Baroda Local Bank Officer Recruitment 2026 — Application Closed";
    ibpsLbo.post = "Local Bank Officer";
    ibpsLbo.openDate = "18/08/2026";
    ibpsLbo.lastDate = "17/09/2026 (closed)";
    ibpsLbo.official = "https://www.bankofbaroda.in/career";
    ibpsLbo.notice = "https://ibpsreg.ibps.in/bobjul26/index.php?stat=0";
    ibpsLbo.apply = "https://ibpsreg.ibps.in/bobjul26/index.php?stat=0";
    ibpsLbo.verificationStatus = "APPLICATION WINDOW VERIFIED FROM OFFICIAL BANK OF BARODA/IBPS REGISTRATION PORTAL: registration and fee payment 18/08/2026–17/09/2026; last date to print application 02/10/2026. The print deadline is not the application deadline.";
    ibpsLbo.updates = "Bank of Baroda Local Bank Officer application window closed 17/09/2026. Official registration portal checked 10/10/2026; application print deadline was 02/10/2026.";
  }

  // The 06/10/2026 IBPS update relates to Banker Faculty / Technical / Executive Secretary,
  // not the CRP Specialist Officers XVI application deadline. Keep the SPL record closed
  // and explicitly distinguish examination dates from registration dates.
  for (const id of ["ibps-so-xvi-2026", "ibps-so-xvi-2026-main"]) {
    const ibpsSo = window.AJ_JOB_DATA.find(function (item) { return item.id === id; });
    if (ibpsSo) {
      ibpsSo.category = "Banking Jobs";
      ibpsSo.lastDate = "Application closed — exact registration deadline must be taken from CRP-SPL-XVI notification";
      ibpsSo.official = "https://www.ibps.in/index.php/specialist-officers-xvi/";
      ibpsSo.notice = "https://www.ibps.in/index.php/specialist-officers-xvi/";
      ibpsSo.apply = "https://www.ibps.in/index.php/specialist-officers-xvi/";
      ibpsSo.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: official IBPS page confirms CRP-SPL-XVI notification dated 01/07/2026 and vacancy corrigendum dated 27/08/2026. The stored 06/10/2026 deadline is not supported by the page and appears to confuse an unrelated IBPS addendum. Keep closed; do not publish 06/10/2026 as the application deadline.";
      ibpsSo.updates = "CRP-SPL-XVI application period is closed. Official exam calendar lists preliminary exam 29/08/2026 and main exam 01/11/2026; exam dates are not application dates. Check the official CRP-SPL-XVI notice for the exact registration window.";
    }
  }

  // Canara Bank Graduate Apprentices FY 2026-27 — verified from the bank's official PDF.
  const canaraApprentice = window.AJ_JOB_DATA.find(function (item) { return item.id === "canara-bank-apprentice-3500-2026"; });
  if (canaraApprentice) {
    canaraApprentice.category = "Banking Jobs";
    canaraApprentice.openDate = "01/10/2026";
    canaraApprentice.lastDate = "17/10/2026";
    canaraApprentice.vacancy = "3,500 indicative training seats; state-wise/category-wise allocation is in the official PDF and may vary.";
    canaraApprentice.qualification = "Graduation in any discipline from a recognized university; candidates must have passed graduation between 01/01/2023 and 01/09/2026 inclusive. NATS profile must be 100% complete before applying.";
    canaraApprentice.age = "20–28 years as on 01/09/2026; category-wise relaxations as specified in the official advertisement.";
    canaraApprentice.salary = "₹16,650 per month including applicable Government subsidy, as stated in the official notice.";
    canaraApprentice.official = "https://www.canarabank.bank.in/engagement-of-graduate-apprentices-in-canara-bank-under-apprentices-act-1961-for-fy-2026-27";
    canaraApprentice.notice = "https://www.canarabank.bank.in/documents/d/guest/apprenticeship-advertisement-2026-27";
    canaraApprentice.apply = "https://ibpsreg.ibps.in/cabgasep26/";
    canaraApprentice.verificationSource = canaraApprentice.notice;
    canaraApprentice.verificationStatus = "VERIFIED FROM CANARA BANK OFFICIAL FY 2026-27 ADVERTISEMENT PDF AND REGISTRATION PORTAL. 3,500 indicative seats, 01/10–17/10/2026 registration window, eligibility age/date, graduation window and stipend cross-checked.";
    canaraApprentice.updates = "Official Canara Bank notice checked 10/10/2026. Registration closes 17/10/2026; last date to print application is 01/11/2026. Total 3,500 training seats are provisional and may vary.";
  }

  // NIT non-faculty portal dates are confirmed, but institute-specific notice fields remain partial.
  const nitNonFaculty = window.AJ_JOB_DATA.find(function (item) { return item.id === "nit-non-faculty-2026"; });
  if (nitNonFaculty) {
    nitNonFaculty.openDate = "01/10/2026";
    nitNonFaculty.lastDate = "30/10/2026";
    nitNonFaculty.notice = "https://ibpsreg.ibps.in/nitrjul26/index.php?stat=0";
    nitNonFaculty.apply = "https://ibpsreg.ibps.in/nitrjul26/index.php?stat=0";
    nitNonFaculty.verificationStatus = "APPLICATION DATES VERIFIED FROM THE OFFICIAL IBPS REGISTRATION PORTAL: 01/10/2026–30/10/2026; application print deadline 15/11/2026. Exact institute name, post-wise vacancy, eligibility, age and fee still need the issuing institute's detailed notice.";
    nitNonFaculty.updates = "Official registration portal checked 10/10/2026. Applications close 30/10/2026; printing deadline 15/11/2026. Read the issuing institute's notice for post-wise requirements.";
  }

  const sahityaAkademi = window.AJ_JOB_DATA.find(function (item) { return item.id === "sahitya-akademi-30-2026"; });
  if (sahityaAkademi) {
    sahityaAkademi.openDate = "See official notice";
    sahityaAkademi.lastDate = "21/10/2026";
    sahityaAkademi.official = "https://www.sahitya-akademi.gov.in/recruitment/vacancy.jsp";
    sahityaAkademi.notice = "https://www.sahitya-akademi.gov.in/recruitment/vacancy.jsp";
    sahityaAkademi.apply = "https://www.sahitya-akademi.gov.in/recruitment/vacancy.jsp";
    sahityaAkademi.vacancy = "Various direct-recruitment posts; verify the exact total and post-wise distribution from the official advertisement/corrigendum.";
    sahityaAkademi.verificationStatus = "OFFICIAL DEADLINE VERIFIED 10/10/2026: Sahitya Akademi vacancy page lists various direct-recruitment posts with last date 21/10/2026 and links to corrigendum, eligibility criteria and prescribed application formats. The dataset's 30-post total remains unconfirmed.";
    sahityaAkademi.updates = "Official Sahitya Akademi vacancy page checked 10/10/2026; application deadline 21/10/2026. Read the corrigendum and relevant application format; post count still requires full notice reconciliation.";
  }

  // RRB CEN 01/2026 ALP — official RRB notice confirms application dates and total.
  const rrbAlp = window.AJ_JOB_DATA.find(function (item) { return item.id === "rrb-alp-11127-2026-exam"; });
  if (rrbAlp) {
    rrbAlp.category = "Railway Jobs";
    rrbAlp.openDate = "15/05/2026";
    rrbAlp.lastDate = "14/06/2026 (closed)";
    rrbAlp.vacancy = "11,127";
    rrbAlp.official = "https://www.rrbcdg.gov.in/2026-01-alp.php";
    rrbAlp.notice = "https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf";
    rrbAlp.apply = "https://www.rrbapply.gov.in/";
    rrbAlp.verificationSource = rrbAlp.notice;
    rrbAlp.verificationStatus = "APPLICATION DATES AND TOTAL VERIFIED FROM OFFICIAL RRB CEN 01/2026: registration 15/05/2026–14/06/2026; 11,127 Assistant Loco Pilot vacancies. Application is closed. Keep exam schedule in a separate field and verify it from the latest official RRB exam notice.";
    rrbAlp.updates = "RRB CEN 01/2026 application window closed on 14/06/2026. Official notice and indicative notice confirm 11,127 posts. This is not an upcoming application window.";
  }

  // Coast Guard CGEPT batches: opening date confirmed; deadline/vacancy totals not independently confirmed.
  const coastGuardCgept = window.AJ_JOB_DATA.find(function (item) { return item.id === "coast-guard-cgept-01-02-2027"; });
  if (coastGuardCgept) {
    coastGuardCgept.openDate = "06/10/2026";
    coastGuardCgept.official = "https://www.indiancoastguard.gov.in/recruitment";
    coastGuardCgept.notice = "https://www.indiancoastguard.gov.in/registration-process-cgept-0127-cgept-0227-batches-scheduled-commence-06-oct-26-all-candidates-are";
    coastGuardCgept.apply = "https://ssc.gov.in/";
    coastGuardCgept.verificationSource = coastGuardCgept.notice;
    coastGuardCgept.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: Indian Coast Guard official notice confirms CGEPT-01/27 and CGEPT-02/27 registration was scheduled to commence 06/10/2026. Closing date and batch-wise vacancy counts were not confirmed from the source fetched in this pass; do not infer them.";
    coastGuardCgept.updates = "Official Coast Guard registration-start notice dated 05/10/2026. Applications are submitted through SSC as directed by the official notice. Confirm the current closing date and batch-wise vacancy details on the linked official notice/SSC portal before applying.";
  }

  // Correct the IGNOU non-teaching record's mismatched post/summary fields.
  const ignou = window.AJ_JOB_DATA.find(function (item) {
    return item.id === "ignou-nonteaching-2026";
  });
  if (ignou) {
    ignou.title = "IGNOU Non-Teaching Recruitment 2026 — Advertisement No. 69/2026/Admn.";
    ignou.post = "Assistant Director, Technical Manager, Technical Assistant";
    ignou.shortInfo = "IGNOU non-teaching recruitment under Advertisement No. 69/2026/Admn. Total 14 posts across Assistant Director, Technical Manager and Technical Assistant. Online applications close 02/11/2026 at 11:59:59 PM; signed application printout with self-attested documents is due by 12/11/2026 as specified in the advertisement.";
    ignou.verificationStatus = "VERIFIED FROM OFFICIAL IGNOU CAREER PAGE AND DETAILED ADVERTISEMENT. Corrected mismatched post/summary fields; 14 posts and 03/10/2026–02/11/2026 application window confirmed.";
    ignou.updates = "Official IGNOU career page checked 10/10/2026. Application window ends 02/11/2026 23:59:59; signed printout with supporting documents due 12/11/2026.";
    ignou.verificationSource = "https://www.ignou.ac.in/announcement/Career?nav=5";
    ignou.official = "https://www.ignou.ac.in/announcement/Career?nav=5";
    ignou.notice = "https://www.ignou.ac.in/viewFile/ad/notification/Detailed_Advertisement.pdf";
    ignou.apply = "https://ignount.samarth.edu.in/";
    ignou.postVacancies = [
      { post: "Assistant Director", vacancy: "2 (UR 2); maximum age 48 years; Level 10" },
      { post: "Technical Manager", vacancy: "4 (UR 3, OBC-NCL 1); maximum age 42 years; Level 10" },
      { post: "Technical Assistant", vacancy: "8 (UR 5, SC 1, OBC-NCL 2); maximum age 37 years; Level 8" }
    ];
  }

  // Fill official URLs and exact source dates for already-listed DRDO notices.
  const rci = window.AJ_JOB_DATA.find(function (item) { return item.id === "drdo-rci-apprentice-2027"; });
  if (rci) {
    rci.openDate = "01/10/2026";
    rci.lastDate = "01/11/2026";
    rci.vacancy = "195 indicative seats: Graduate Apprentice 50, Technician (Diploma) Apprentice 30, ITI Trade Apprentice 115. DRDO states vacancies may vary.";
    rci.qualification = "Regular candidates who passed the relevant Graduate/Diploma/ITI qualification in 2022–2026 and scored at least 70% or CGPA 7.5, as prescribed in the official advertisement. Trade/discipline eligibility applies.";
    rci.age = "As prescribed in the official advertisement and applicable apprenticeship rules.";
    rci.selection = "Academic merit and/or interview as required, followed by document verification.";
    rci.official = "https://drdo.gov.in/drdo/en/offerings/vacancies/rci-hyderabad-invites-eligible-candidates-engagement-apprentices-under";
    rci.apply = "https://nats.education.gov.in/";
    rci.notice = "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtRCI01102026.pdf";
    rci.verificationStatus = "VERIFIED FROM OFFICIAL DRDO LISTING AND RCI ADVERTISEMENT PDF. Dates, indicative category-wise seat totals, minimum marks and application portal cross-checked.";
    rci.updates = "Official DRDO listing published 01/10/2026; closing date 01/11/2026. RCI notice states 50 Graduate, 30 Diploma and 115 ITI seats (indicative). Apply using the relevant NATS/NAPS portal and the exact instructions in the PDF.";
  }

  const dmrl = window.AJ_JOB_DATA.find(function (item) { return item.id === "drdo-dmrl-jrf-2026"; });
  if (dmrl) {
    dmrl.openDate = "06/10/2026";
    dmrl.lastDate = "27/10/2026";
    dmrl.vacancy = "14 JRF posts: Electronics 3, Mechanical 7, Chemical 2, Physics 2.";
    dmrl.qualification = "Post-specific: Electronics/Mechanical/Chemical B.E./B.Tech first class with valid GATE score OR relevant first-class M.E./M.Tech plus first-class B.E./B.Tech; Physics requires M.Sc. Physics first division with valid NET. Read the official PDF for full criteria.";
    dmrl.age = "Maximum 28 years on closing date; relaxations as stated in the official advertisement.";
    dmrl.fee = "No application fee is stated in the reviewed official advertisement.";
    dmrl.selection = "Interview/assessment and screening as prescribed by DMRL.";
    dmrl.apply = "https://drdo.gov.in/drdo/en/offerings/vacancies/dmrl-invites-application-candidates-post-jrf";
    dmrl.notice = "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtDMRL06102026.pdf";
    dmrl.official = "https://drdo.gov.in/drdo/offerings/vacancies";
    dmrl.salary = "JRF stipend ₹37,000 per month plus HRA as per DRDO rules.";
    dmrl.verificationStatus = "VERIFIED FROM OFFICIAL DRDO LISTING AND DMRL ADVERTISEMENT PDF.";
    dmrl.updates = "DRDO published DMRL/HRD/JRF/2026/01 on 06/10/2026; applications close 27/10/2026. The official notice lists 14 discipline-wise positions.";
  }

  const cair = window.AJ_JOB_DATA.find(function (item) { return item.id === "drdo-cair-jrf-2026"; });
  if (cair) {
    cair.openDate = "06/10/2026";
    cair.lastDate = "30/10/2026";
    cair.apply = "https://drdo.gov.in/drdo/en/offerings/vacancies/cair-bengaluru-invites-eligible-candidates-walk-interview-post-jrf-24th";
    cair.notice = cair.apply;
    cair.official = "https://drdo.gov.in/drdo/offerings/vacancies";
    cair.selection = "Walk-in interview on 24/11/2026, as stated in the official listing; check the linked advertisement for reporting time, eligibility and documents.";
    cair.verificationStatus = "OFFICIAL DRDO LISTING VERIFIED 10/10/2026: CAIR/HRT/JRF/2026/03, published 06/10/2026, deadline 30/10/2026 and walk-in interview date 24/11/2026. Full qualification/vacancy details must be taken from the linked notice.";
    cair.updates = "Official DRDO listing confirms CAIR/HRT/JRF/2026/03, opened 06/10/2026, closes 30/10/2026; walk-in interview is listed for 24/11/2026.";
  }

  // New official DRDO listings discovered in the 10 October review.
  if (!window.AJ_JOB_DATA.some(function (item) { return item.id === "drdo-itr-apprentice-2026"; })) {
    window.AJ_JOB_DATA.push({
      id: "drdo-itr-apprentice-2026",
      category: "Apprenticeship",
      title: "DRDO ITR Chandipur Apprentice Recruitment 2026 — Advt. ITR/HRD/AT/11/2026",
      post: "Graduate Apprentice and Technician (Diploma) Apprentice",
      shortInfo: "DRDO Integrated Test Range (ITR), Chandipur invites applications for one-year apprenticeship training. The official notice lists indicative discipline-wise seats and monthly stipends of ₹12,300 for Graduate Apprentices and ₹10,900 for Technician Apprentices. Applications must reach by Speed Post/Registered Post on or before 02/11/2026.",
      openDate: "09/10/2026",
      lastDate: "02/11/2026",
      mode: "Offline — typed application by Speed Post / Registered Post",
      vacancy: "54 indicative seats across Graduate and Technician (Diploma) apprenticeship categories; discipline-wise breakup is in the official PDF and may change.",
      qualification: "Relevant B.E./B.Tech, BBA, B.Com or B.Lib.Sc. for Graduate Apprentices; relevant Diploma for Technician Apprentices. Qualifying course passed in 2022–2026, regular mode; higher qualification or one year or more post-qualification training/job experience makes candidates ineligible under the notice. NATS registration required.",
      age: "Minimum 18 years; maximum age and relaxation as per Apprentices Act/Rules and NATS/NAPS guidelines.",
      fee: "No application fee stated in the official advertisement.",
      selection: "Shortlisting followed by written test, personal interview or both, as determined by ITR.",
      official: "https://drdo.gov.in/drdo/en/offerings/vacancies/itr-chandipur-invites-applications-engagement-graduate-technician-diploma",
      apply: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtITR09102026.pdf",
      notice: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtITR09102026.pdf",
      organization: "Defence Research and Development Organisation (DRDO), Integrated Test Range (ITR), Chandipur",
      salary: "Graduate Apprentice ₹12,300/month; Technician (Diploma) Apprentice ₹10,900/month.",
      dataAuditDate: "10/10/2026",
      verificationSource: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtITR09102026.pdf",
      verificationStatus: "VERIFIED FROM OFFICIAL DRDO ADVERTISEMENT PDF dated 09/10/2026. Application mode, deadline, qualification year window, stipend and selection method checked. Vacancy counts are indicative and may change.",
      updates: "Official DRDO notice published 09/10/2026. Typed application and self-attested documents must reach Director, ITR Chandipur, Balasore, Odisha 756025 by Speed Post/Registered Post on or before 02/11/2026.",
      documents: "Typed application, educational marksheets/certificates, NATS enrollment details, caste/category certificate where applicable, identity proof and recent photograph; selected candidates must provide medical fitness certificate at joining.",
      postVacancies: [
        { post: "Graduate Apprentice", vacancy: "32 indicative seats across listed disciplines" },
        { post: "Technician (Diploma) Apprentice", vacancy: "22 indicative seats across listed disciplines" }
      ],
      postQualifications: [
        { label: "Graduate Apprentice", value: "Relevant B.E./B.Tech disciplines; BBA Administration/HR; B.Com Financial/Cost Accounting; B.Lib.Sc. as detailed in official notice. Stipend ₹12,300/month." },
        { label: "Technician (Diploma) Apprentice", value: "Relevant Diploma disciplines as detailed in official notice. Stipend ₹10,900/month." }
      ],
      physicalEligibility: [{ label: "PST / PET", details: "No PST/PET is specified in the apprenticeship advertisement; medical fitness certificate is required at joining." }]
    });
  }

  if (!window.AJ_JOB_DATA.some(function (item) { return item.id === "drdo-gtre-consultant-2026"; })) {
    window.AJ_JOB_DATA.push({
      id: "drdo-gtre-consultant-2026",
      category: "Central Job",
      title: "DRDO GTRE Consultant Recruitment 2026 — 3 Posts",
      post: "Consultant — Technical and Admin & Allied",
      shortInfo: "DRDO GTRE Bengaluru invites applications from retired Central/State Government, PSU, autonomous-body, university or Government R&D employees for consultant engagement. Three posts are listed at retired Pay Levels 12, 11 and 6. Applications close 29/10/2026.",
      openDate: "08/10/2026",
      lastDate: "29/10/2026",
      mode: "Offline / Email as prescribed in the official PDF",
      vacancy: "3 posts: one each for retired Pay Level 12 (Technical), Pay Level 11 (Technical), and Pay Level 6 (Admin & Allied).",
      qualification: "Retired employees of Central/State Government, PSU, autonomous bodies, universities or Government R&D organisations with relevant practical experience, clean service record and post-specific Terms of Reference. DRDO experience preferred.",
      age: "Maximum 63 years as on 29/10/2026; at least 15 days must have elapsed between retirement and consultant appointment.",
      fee: "No application fee stated in the official advertisement.",
      selection: "Screening and shortlisting by committees against eligibility and post-specific Terms of Reference.",
      official: "https://drdo.gov.in/drdo/en/offerings/vacancies/gtre-bangalore-invites-application-engagement-retired-government-employees",
      apply: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtGTRE08102026.pdf",
      notice: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtGTRE08102026.pdf",
      organization: "Defence Research and Development Organisation (DRDO), Gas Turbine Research Establishment (GTRE), Bengaluru",
      salary: "Monthly remuneration depends on retired pay level and pension status; see official PDF. Non-pensioner rates shown include ₹60,000 (Level 12), ₹50,000 (Level 11), ₹30,000 (Level 6).",
      dataAuditDate: "10/10/2026",
      verificationSource: "https://drdo.gov.in/drdo/sites/default/files/vacancy/advtGTRE08102026.pdf",
      verificationStatus: "VERIFIED FROM OFFICIAL DRDO GTRE ADVERTISEMENT PDF. Post count, pay levels, eligibility, age ceiling, application email/post option and closing date checked.",
      updates: "Official notice published on DRDO website 09/10/2026; applications must be received by 29/10/2026. Read post-specific TOR annexures before applying.",
      documents: "Application in prescribed format and supporting service/retirement documents as required by the official notice. Submit by email to director.gtre@gov.in or to the postal address in the PDF.",
      postVacancies: [
        { post: "Consultant — Technical (retired Pay Level 12)", vacancy: "1" },
        { post: "Consultant — Technical (retired Pay Level 11)", vacancy: "1" },
        { post: "Consultant — Admin & Allied (retired Pay Level 6)", vacancy: "1" }
      ],
      postQualifications: [{ label: "Eligibility", value: "Retired government/PSU/autonomous body/university/Government R&D employees with relevant experience; see Terms of Reference annexures." }],
      physicalEligibility: [{ label: "PST / PET", details: "Not applicable as a physical recruitment test in the consultant advertisement." }]
    });
  }

  // Bank of Baroda Local Bank Officers: official notice confirms 2,482 posts and
  // closing date 17/09/2026. Keep as expired/archive information, not an open job.
  const bobLbo = window.AJ_JOB_DATA.find(function (item) { return item.id === "bank-of-baroda-2482-lbo"; });
  if (bobLbo) {
    bobLbo.title = "Bank of Baroda Local Bank Officers (LBO) Recruitment 2026 — 2,482 Posts";
    bobLbo.post = "Local Bank Officer (LBO)";
    bobLbo.openDate = "03/09/2026";
    bobLbo.lastDate = "17/09/2026 (closed)";
    bobLbo.official = "https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09";
    bobLbo.notice = "https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09";
    bobLbo.apply = "https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09";
    bobLbo.verificationStatus = "OFFICIAL BANK OF BARODA CAREER PAGE VERIFIED 10/10/2026: 2,482 LBO vacancies and extended closing date 17/09/2026 confirmed. Application is closed; this record is for archive/reference only.";
    bobLbo.updates = "Official Bank of Baroda page checked 10/10/2026. The bank page lists 2,482 vacancies and confirms last date 17/09/2026, with an addendum extending the application deadline.";
    bobLbo.verificationSource = "https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09";
  }

  // AAI 389 Manager/Junior Executive entry: official recruitment dashboard confirms
  // Advt. 12/2026/CHQ/DR-CBT, 389 posts, and a September 2026 update.
  const aai389 = window.AJ_JOB_DATA.find(function (item) { return item.id === "aai-389-jr-executive-manager"; });
  if (aai389) {
    aai389.title = "AAI Managers and Junior Executives Recruitment 2026 — 389 Posts";
    aai389.post = "Manager and Junior Executive (discipline-wise posts as per Advt. 12/2026/CHQ/DR-CBT)";
    aai389.official = "https://www.aai.aero/en/careers/recruitment/allAirports/allAirports/allAirports/bilaspur.jsp?combine=&order=field_name_of_department&page=5&sort=desc";
    aai389.notice = aai389.official;
    aai389.apply = aai389.official;
    aai389.verificationStatus = "OFFICIAL AAI RECRUITMENT DASHBOARD VERIFIED 10/10/2026: Advt. No. 12/2026/CHQ/DR-CBT and 389 total posts confirmed. The dashboard shows updates through 23/09/2026; check the official dashboard for the current registration/result status and any notice.";
    aai389.updates = "AAI official recruitment dashboard checked 10/10/2026. It lists 389 Manager/Junior Executive posts under Advt. 12/2026/CHQ/DR-CBT and updates dated 03/08/2026 and 23/09/2026.";
    aai389.verificationSource = aai389.official;
  }

  // Phase 6 additions sourced from official IGNOU and BEE career pages (10/10/2026).
  const officialCareer = "https://www.ignou.ac.in/announcement/Career?nav=5";
  const ignouAssocId = "ignou-administrative-associate-nagpur-2026";
  if (!window.AJ_JOB_DATA.some(function (item) { return item.id === ignouAssocId; })) {
    window.AJ_JOB_DATA.push({
      id: ignouAssocId,
      category: "Private/Contractual",
      state: "Maharashtra",
      organization: "Indira Gandhi National Open University (IGNOU), Regional Centre Nagpur",
      title: "IGNOU Administrative Associate Recruitment 2026 — 2 Posts",
      post: "Administrative Associate",
      shortInfo: "IGNOU Regional Centre Nagpur invites applications for 2 contractual Administrative Associate positions.",
      openDate: "08/10/2026",
      lastDate: "26/10/2026",
      mode: "Offline application by post",
      vacancy: "02",
      qualification: "Graduation in any discipline from a recognized university/organisation; minimum 2 years' experience and knowledge of MS Office.",
      age: "See official advertisement; engagement terms mention maximum tenure up to age 70, not an application age limit.",
      fee: "See official advertisement; no fee amount stated on the career listing.",
      selection: "Shortlisting/interview as determined by IGNOU; read the official advertisement.",
      notice: "https://www.ignou.ac.in/viewFile/ad/notification/Engagement-Administrative-Associate.pdf",
      official: officialCareer,
      apply: "https://www.ignou.ac.in/viewFile/ad/notification/Engagement-Administrative-Associate.pdf",
      documents: "Prescribed application form and self-attested testimonials; submit by post to IGNOU Regional Centre Nagpur as specified in the official PDF.",
      salary: "₹30,000 per month",
      dataAuditDate: "10/10/2026",
      verificationSource: "https://www.ignou.ac.in/viewFile/ad/notification/Engagement-Administrative-Associate.pdf",
      verificationStatus: "VERIFIED FROM OFFICIAL IGNOU CAREER PAGE AND PDF 10/10/2026.",
      updates: "Official IGNOU career page checked 10/10/2026: 2 posts, graduation, 2 years' experience/MS Office, ₹30,000 monthly remuneration, deadline 26/10/2026.",
      postVacancies: [{ post: "Administrative Associate", vacancy: "2" }],
      postQualifications: [{ label: "Essential qualification", value: "Graduation in any discipline and at least 2 years' experience with MS Office knowledge." }]
    });
  }

  const beeCareer = "https://beeindia.gov.in/show_content.php?lang=1&level=0&lid=14&ls_id=205";
  const beeEntries = [
    {
      id: "bee-sector-experts-project-engineers-2026",
      title: "BEE Sector Experts and Project Engineers Recruitment 2026",
      post: "Sector Experts and Project Engineers",
      openDate: "05/10/2026",
      lastDate: "17/11/2026",
      shortInfo: "Bureau of Energy Efficiency published a vacancy circular for Sector Experts and Project Engineers.",
      vacancy: "See official circular; total post count not stated in the career listing.",
      qualification: "Post-specific qualification and experience as described in the official PDF.",
      salary: "As specified in the official vacancy circular.",
      verificationStatus: "OFFICIAL BEE CAREER LISTING VERIFIED 10/10/2026; post-wise count and eligibility must be read from the linked circular."
    },
    {
      id: "bee-technical-nontechnical-recruitment-2026",
      title: "BEE Technical and Non-Technical Posts Recruitment 2026",
      post: "Various technical and non-technical posts",
      openDate: "01/10/2026",
      lastDate: "30 days from publication date — verify exact closing time in official notice",
      shortInfo: "Bureau of Energy Efficiency invites applications from Indian nationals for specified technical and non-technical posts.",
      vacancy: "Post-wise vacancy count and designations are listed in the official advertisement.",
      qualification: "Post-wise qualifications and experience as stated in the official advertisement.",
      salary: "As per the official advertisement.",
      verificationStatus: "OFFICIAL BEE CAREER LISTING VERIFIED 10/10/2026. Closing wording is copied from the official listing; check the PDF for computation of the deadline and application method."
    },
    {
      id: "bee-ddg-technical-2026",
      title: "BEE Deputy Director General (Technical) Recruitment 2026",
      post: "Deputy Director General (Technical)",
      openDate: "19/09/2026",
      lastDate: "19/10/2026",
      shortInfo: "Bureau of Energy Efficiency published a vacancy circular for Deputy Director General (Technical).",
      vacancy: "See official circular for post count and appointment details.",
      qualification: "Eligibility, service conditions and application procedure as described in the official circular.",
      salary: "As specified in the official vacancy circular.",
      verificationStatus: "OFFICIAL BEE CAREER LISTING VERIFIED 10/10/2026; read the PDF for eligibility and submission instructions."
    }
  ];
  beeEntries.forEach(function (entry) {
    if (window.AJ_JOB_DATA.some(function (item) { return item.id === entry.id; })) return;
    window.AJ_JOB_DATA.push({
      id: entry.id,
      category: "Central",
      state: "Central Government",
      organization: "Bureau of Energy Efficiency (BEE), Ministry of Power",
      title: entry.title,
      post: entry.post,
      shortInfo: entry.shortInfo,
      openDate: entry.openDate,
      lastDate: entry.lastDate,
      mode: "As specified in official notification",
      vacancy: entry.vacancy,
      qualification: entry.qualification,
      age: "As specified in official notification; do not infer an age limit from the summary listing.",
      fee: "As specified in official notification.",
      selection: "As specified in official notification.",
      notice: beeCareer,
      official: beeCareer,
      apply: beeCareer,
      documents: "Read the official BEE vacancy circular for application format, required documents and submission method.",
      salary: entry.salary,
      dataAuditDate: "10/10/2026",
      verificationSource: beeCareer,
      verificationStatus: entry.verificationStatus,
      updates: "BEE official careers page checked 10/10/2026. Open the circular from the official page to confirm post-wise eligibility, fee, age and application procedure."
    });
  });

  // Fix the detailed IGNOU non-teaching notice URL to the exact PDF linked by
  // the official career page; correct teaching recruitment's online/hard-copy dates.
  const ignouNT = window.AJ_JOB_DATA.find(function (item) { return item.id === "ignou-nonteaching-2026"; });
  if (ignouNT) {
    ignouNT.notice = "https://www.ignou.ac.in/viewFile/ad/notification/Detailed_Advertisement.pdf";
    ignouNT.official = "https://www.ignou.ac.in/announcement/Career?nav=5";
    ignouNT.apply = "https://ignount.samarth.edu.in/";
    ignouNT.vacancy = "14 total: Assistant Director 2; Technical Manager 4; Technical Assistant 8.";
    ignouNT.verificationStatus = "OFFICIAL IGNOU CAREER PAGE AND ADVERTISEMENT PDF VERIFIED 10/10/2026. 14 posts, post-wise age limits and online closing date 02/11/2026 confirmed.";
    ignouNT.updates = "Official IGNOU notice (Advt. 69/2026/Admn.) checked 10/10/2026. Online registration runs 03/10/2026–02/11/2026 23:59:59 IST.";
    ignouNT.verificationSource = "https://www.ignou.ac.in/viewFile/ad/notification/Detailed_Advertisement.pdf";
  }

  const ignouTeaching = window.AJ_JOB_DATA.find(function (item) { return item.id === "ignou-teaching-2026"; });
  if (ignouTeaching) {
    ignouTeaching.title = "IGNOU Teaching Recruitment 2026 — Professor, Associate Professor and Assistant Professor";
    ignouTeaching.post = "Professor / Associate Professor / Assistant Professor across IGNOU Schools of Studies";
    ignouTeaching.openDate = "20/09/2026";
    ignouTeaching.lastDate = "20/10/2026 (online); hard-copy receipt by 30/10/2026";
    ignouTeaching.official = "https://www.ignou.ac.in/announcement/Career?nav=5";
    ignouTeaching.notice = "https://www.ignou.ac.in/viewFile/acd/notification/Advertisement-IGNOU-2026.pdf";
    ignouTeaching.apply = "https://cuignourec.samarth.edu.in/";
    ignouTeaching.verificationStatus = "OFFICIAL IGNOU CAREER PAGE AND TEACHING ADVERTISEMENT VERIFIED 10/10/2026. Online deadline 20/10/2026; hard-copy deadline 30/10/2026.";
    ignouTeaching.updates = "Advertisement No. 01/2026/ACD dated 19/09/2026. Apply online by 20/10/2026 and send hard copy by 30/10/2026 as stated in the official career page.";
    ignouTeaching.verificationSource = "https://www.ignou.ac.in/viewFile/acd/notification/Advertisement-IGNOU-2026.pdf";
  }

  const ignouDeputationId = "ignou-deputy-assistant-registrar-deputation-2026";
  if (!window.AJ_JOB_DATA.some(function (item) { return item.id === ignouDeputationId; })) {
    window.AJ_JOB_DATA.push({
      id: ignouDeputationId,
      category: "Central",
      state: "Central Government",
      organization: "Indira Gandhi National Open University (IGNOU)",
      title: "IGNOU Deputy Registrar / Assistant Registrar Recruitment 2026 — Deputation",
      post: "Deputy Registrar and Assistant Registrar (deputation basis)",
      shortInfo: "IGNOU invites eligible candidates for Deputy Registrar and Assistant Registrar posts on deputation basis.",
      openDate: "12/09/2026",
      lastDate: "12/10/2026 (online); print copy with testimonials by 27/10/2026",
      mode: "Online application plus hard-copy submission",
      vacancy: "Check official advertisement for post-wise vacancies.",
      qualification: "Eligibility and deputation conditions as prescribed in the official advertisement; applicants should verify service/experience criteria before applying.",
      age: "As specified in official deputation advertisement.",
      fee: "As specified in official advertisement.",
      selection: "As specified in official deputation advertisement.",
      notice: "https://www.ignou.ac.in/viewFile/ad/notification/Advertisement.pdf",
      official: "https://www.ignou.ac.in/announcement/Career?nav=5",
      apply: "https://ignount.samarth.edu.in/",
      documents: "Online application printout and self-attested testimonials must reach the Recruitment Cell, IGNOU, as specified in the official notice.",
      dataAuditDate: "10/10/2026",
      verificationSource: "https://www.ignou.ac.in/viewFile/ad/notification/Advertisement.pdf",
      verificationStatus: "OFFICIAL IGNOU CAREER PAGE AND DEPUTATION ADVERTISEMENT VERIFIED 10/10/2026. Online deadline 12/10/2026; hard-copy deadline 27/10/2026.",
      updates: "IGNOU career page checked 10/10/2026. Online applications close 12/10/2026; print copy with testimonials is due by 27/10/2026.",
      postQualifications: [{ label: "Eligibility", value: "Read the official deputation advertisement for cadre, service, experience and eligibility conditions." }]
    });
  }


  // Official-source batch 1 review (10/10/2026). This records only what the cited
  // official pages directly confirm; it does not imply every detail was checked.
  const markVerified = function (id, status, source, update) {
    const item = window.AJ_JOB_DATA.find(function (record) { return record.id === id; });
    if (!item) return;
    item.verificationStatus = status;
    item.verificationSource = source;
    item.dataAuditDate = "10/10/2026";
    item.updates = update;
  };

  const appscSource = "https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications";
  markVerified("appsc-group-i-07-2026",
    "PARTIALLY VERIFIED 10/10/2026: APPSC official portal confirms Notification No. 07/2026 and Group-I Services title, published 06/10/2026. Post-wise vacancies, eligibility, fee and closing date must still be matched against the detailed PDF.",
    appscSource,
    "Official APPSC recruitment listing confirms Notification No. 07/2026, Group-I Services, published 06/10/2026. Detailed-notice fields remain pending review.");
  markVerified("appsc-aee-08-2026",
    "PARTIALLY VERIFIED 10/10/2026: APPSC official portal confirms Notification No. 08/2026 for Assistant Environmental Engineer, published 06/10/2026. Detailed PDF fields and deadline remain pending review.",
    appscSource,
    "Official APPSC portal confirms Notification No. 08/2026 and post title. Do not treat vacancy/eligibility/date fields as fully verified until compared with the detailed notice.");
  markVerified("appsc-horticulture-officer-19-2026",
    "PARTIALLY VERIFIED 10/10/2026: APPSC official portal confirms Notification No. 19/2026 for Horticulture Officer, published 06/10/2026. Detailed PDF fields and deadline remain pending review.",
    appscSource,
    "Official APPSC portal confirms Notification No. 19/2026 and post title. Detailed-notice fields remain pending review.");

  const ncrtc = window.AJ_JOB_DATA.find(function (item) { return item.id === "ncrtc-supervisor-jr-maintainer"; });
  if (ncrtc) {
    ncrtc.lastDate = "09/10/2026 (closed)";
    ncrtc.official = "https://www.ncrtc.co.in/jobs.php";
    ncrtc.verificationSource = "https://www.ncrtc.co.in/jobs.php";
    ncrtc.dataAuditDate = "10/10/2026";
    ncrtc.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: official NCRTC Jobs page confirms codes 32/2026 and 33/2026, opening 10/09/2026 and closing 09/10/2026. The aggregate page label still displayed Open, but the official closing date has passed; treat this application window as closed unless NCRTC publishes an extension.";
    ncrtc.updates = "Official NCRTC Jobs page lists Coded notices 32/2026 and 33/2026 with closing date 09/10/2026. The aggregate page label was still Open on 10/10/2026 despite the passed deadline; no extension was shown on the official listing.";
  }

  markVerified("upsc-advt-11-2026",
    "DEADLINE VERIFIED / CLOSED 10/10/2026: PIB official release confirms applications for UPSC Advertisement 11/2026 closed 02/10/2026 for posts outside UT Ladakh and 09/10/2026 for UT Ladakh posts. Post-wise fields still require notice comparison.",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2308745&lang=1&reg=19",
    "PIB's official release confirms the two application deadlines. Mark application window closed; retain only for closed-notice reference unless the site's policy archives it.");

  markVerified("rcfl-94-management-trainee-2026",
    "DEADLINE VERIFIED / CLOSED 10/10/2026: RCF official recruitment page confirms Advertisement 16022026 deadline was extended to 20/09/2026 at 5:00 PM. Full vacancy and eligibility details were not re-audited in this pass.",
    "https://rcfltd.com/hrrecruitment/recruitment-1",
    "Official RCF corrigendum confirms the extended closing date 20/09/2026 5:00 PM. Application window is closed.");

  markVerified("india-optel-project-technician-2026",
    "CLOSING DATE PASSED — STATUS NEEDS OFFICIAL CAREER-PAGE RECHECK: stored deadline is 03/10/2026. Exact official advertisement and full details have not yet been matched in this pass.",
    "https://indiaoptel.in/career/",
    "Stored deadline 03/10/2026 is past as of 10/10/2026. Do not display as open unless an official extension is found.");


  // Official-source batch 2 review (10/10/2026).
  const ese2027 = window.AJ_JOB_DATA.find(function (item) { return item.id === "upsc-engineering-services-2026"; });
  if (ese2027) {
    ese2027.title = "UPSC Engineering Services (Preliminary) Examination 2027 — Applications Closed";
    ese2027.post = "Engineering Services (Preliminary) Examination, 2027";
    ese2027.lastDate = "06/10/2026 06:00 PM (closed)";
    ese2027.official = "https://www.upsc.gov.in/examinations/Engineering%20Services%20%28Preliminary%29%20Examination%2C%202027";
    ese2027.notice = ese2027.official;
    ese2027.verificationSource = ese2027.official;
    ese2027.dataAuditDate = "10/10/2026";
    ese2027.verificationStatus = "OFFICIAL UPSC EXAMINATION PAGE VERIFIED 10/10/2026: notification 16/09/2026, application deadline 06/10/2026 at 6:00 PM, examination 31/01/2027. Application window is closed. Vacancy, fee and post-specific eligibility should be compared with the linked notice before republishing as a detailed vacancy.";
    ese2027.updates = "UPSC official examination page confirms 06/10/2026 6:00 PM application deadline and 31/01/2027 exam date. Marked closed as of 10/10/2026.";
  }

  markVerified("ibps-rrb-office-assistant-officer-2026",
    "DEADLINE / OFFICIAL LISTING VERIFIED 10/10/2026: IBPS official CRP-RRBs-XV page lists vacancy updates and corrigenda through 25/09/2026. Stored application deadline is 27/09/2026 and is closed; exact latest bank/state/category vacancy totals remain to be transcribed from the 25/09 attachment.",
    "https://www.ibps.in/index.php/rural-bank-xv/",
    "Official IBPS page lists CRP-RRBs-XV corrigenda and updated vacancies dated 25/09/2026. Application window is closed; use the 25/09/2026 attachment, not older vacancy tables.");

  markVerified("ssc-chte-2025-preference",
    "PARTIAL 10/10/2026: SSC official portal is the correct authority, but this batch did not locate the exact post-preference notice to substantiate the stored 11/09/2026 deadline. Keep deadline unverified until the exact SSC notice is linked.",
    "https://ssc.gov.in/",
    "SSC 2026-27 calendar and current notice board reviewed; the exact 2025 CHTE preference-window notice was not located in this pass. Do not call the deadline fully verified.");


  // Official-source batch 3: restore and correct Bank of Baroda records after
  // finding the matching official career pages; add direct official POWERGRID/SPMCIL sources.
  const bobLboVerified = window.AJ_JOB_DATA.find(function (item) { return item.id === "bank-of-baroda-2482-lbo"; });
  if (bobLboVerified) {
    bobLboVerified.title = "Bank of Baroda Local Bank Officer Recruitment 2026 — 2,482 Posts (Closed)";
    bobLboVerified.post = "Local Bank Officers (LBO), JMG/S-I";
    bobLboVerified.organization = "Bank of Baroda";
    bobLboVerified.openDate = "18/08/2026";
    bobLboVerified.lastDate = "17/09/2026 (extended; closed)";
    bobLboVerified.vacancy = "2,482 Local Bank Officer posts, as listed on the official recruitment page.";
    bobLboVerified.official = "https://bankofbaroda.bank.in/career/current-opportunities/recruitment-of-local-bank-officers-on-regular-basis-07-09";
    bobLboVerified.notice = bobLboVerified.official;
    bobLboVerified.apply = bobLboVerified.official;
    bobLboVerified.verificationSource = bobLboVerified.official;
    bobLboVerified.dataAuditDate = "10/10/2026";
    bobLboVerified.verificationStatus = "OFFICIAL BANK OF BARODA CAREER PAGE VERIFIED 10/10/2026: Advertisement BOB/HRM/REC/ADVT/2026/16 lists 2,482 Local Bank Officer posts, last date 17/09/2026, with addendum extending the application deadline. Application window closed.";
    bobLboVerified.updates = "Bank of Baroda's official career page lists 2,482 vacancies and 17/09/2026 as the extended closing date. Application window is closed; use the advertisement and addendum on the official page for full post-wise eligibility and vacancy details.";
  }

  const bob1100 = window.AJ_JOB_DATA.find(function (item) { return item.id === "bank-of-baroda-1100-so-2026"; });
  if (bob1100) {
    bob1100.title = "Bank of Baroda Specialist Recruitment 2026 — 1,100 Posts Across Two Departments";
    bob1100.post = "Wealth Management Services (1,000 posts) and Corporate & Institutional Credit (100 posts)";
    bob1100.organization = "Bank of Baroda";
    bob1100.openDate = "04/09/2026";
    bob1100.lastDate = "WMS: 16/10/2026 (extended); C&IC: 01/10/2026 (closed)";
    bob1100.vacancy = "1,100 combined posts: 1,000 in Wealth Management Services and 100 in Corporate & Institutional Credit. These are separate official advertisements with different deadlines.";
    bob1100.qualification = "Post-specific qualifications and experience differ by role; check the matching official advertisement for the relevant department.";
    bob1100.notice = "https://bankofbaroda.bank.in/hi-in/career/current-opportunities/wealth-management-services-department-bob-hrm-rec-advt-2026-17 ; https://bankofbaroda.bank.in/hi-in/career/current-opportunities/corporate-institutional-credit-department-bob-hrm-rec-advt-2026-17";
    bob1100.official = "https://bankofbaroda.bank.in/career/current-opportunities";
    bob1100.apply = bob1100.official;
    bob1100.verificationSource = bob1100.notice;
    bob1100.dataAuditDate = "10/10/2026";
    bob1100.verificationStatus = "OFFICIAL BANK OF BARODA CAREER PAGES VERIFIED 10/10/2026: Wealth Management Services has 1,000 vacancies and a 16/10/2026 extended deadline; Corporate & Institutional Credit has 100 vacancies and a 01/10/2026 deadline. The combined 1,100 figure is the sum of two separate advertisements, not one shared deadline.";
    bob1100.updates = "Important: this combined card covers two separate Bank of Baroda advertisements. WMS (1,000 posts) closes 16/10/2026 after extensions; C&IC (100 posts) closed 01/10/2026. Read the relevant official department notice before applying.";
  }

  const pgcil = window.AJ_JOB_DATA.find(function (item) { return item.id === "pgcil-apprentice-2026"; });
  if (pgcil) {
    pgcil.title = "POWERGRID Apprentice Recruitment 2026 — Application Closed";
    pgcil.organization = "Power Grid Corporation of India Limited (POWERGRID)";
    pgcil.openDate = "25/08/2026";
    pgcil.lastDate = "10/09/2026 (closed)";
    pgcil.official = "https://www.powergrid.in/en/rolling-advertisement-for-enagagement-of-apprentices";
    pgcil.notice = pgcil.official;
    pgcil.apply = pgcil.official;
    pgcil.verificationSource = pgcil.official;
    pgcil.dataAuditDate = "10/10/2026";
    pgcil.verificationStatus = "OFFICIAL POWERGRID APPRENTICE PAGE VERIFIED 10/10/2026: applications opened 25/08/2026 and closed 10/09/2026. Application window closed.";
    pgcil.updates = "Official POWERGRID page confirms apprenticeship applications from 25/08/2026 to 10/09/2026. The record is retained for reference but must not be presented as currently open.";
  }

  const spmcil = window.AJ_JOB_DATA.find(function (item) { return item.id === "spmcil-assistant-manager"; });
  if (spmcil) {
    spmcil.title = "SPMCIL Executive Recruitment 2026 — Advt. No. 02/2026 (Closed)";
    spmcil.post = "Executive posts at E-2 and E-1 levels in various functional areas";
    spmcil.organization = "Security Printing and Minting Corporation of India Limited (SPMCIL)";
    spmcil.openDate = "25/07/2026";
    spmcil.lastDate = "31/08/2026 05:00 PM (closed; check official corrigenda/notices)";
    spmcil.official = "https://www.spmcil.com/en/latest-careers/";
    spmcil.notice = spmcil.official;
    spmcil.apply = spmcil.official;
    spmcil.verificationSource = spmcil.official;
    spmcil.dataAuditDate = "10/10/2026";
    spmcil.verificationStatus = "OFFICIAL SPMCIL CAREERS PAGE VERIFIED 10/10/2026: Advt. 02/2026 is for Executive E-2/E-1 posts, published 25/07/2026, with listed closing date 31/08/2026 5:00 PM. The page also lists later notices/corrigenda; no confirmed extension reopening the application window was established in this pass.";
    spmcil.updates = "Official SPMCIL career page shows Advt. 02/2026 closing 31/08/2026 5:00 PM. Later notices are listed on the same page; verify any corrigendum before assuming applications reopened.";
  }


  const aai389Verified = window.AJ_JOB_DATA.find(function (item) { return item.id === "aai-389-jr-executive-manager"; });
  if (aai389Verified) {
    aai389Verified.title = "AAI Managers & Junior Executives Recruitment 2026 — Advt. 12/2026/CHQ/DR-CBT";
    aai389Verified.post = "Managers and Junior Executives in various disciplines";
    aai389Verified.organization = "Airports Authority of India (AAI)";
    aai389Verified.vacancy = "389 posts, as listed on the official AAI Recruitment Dashboard.";
    aai389Verified.official = "https://www.aai.aero/en/careers/recruitment/Offical";
    aai389Verified.notice = "https://www.aai.aero/en/careers/recruitment/Offical";
    aai389Verified.apply = "https://www.aai.aero/en/careers/recruitment/Offical";
    aai389Verified.verificationSource = "https://www.aai.aero/en/careers/recruitment/Offical";
    aai389Verified.dataAuditDate = "10/10/2026";
    aai389Verified.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: official AAI Recruitment Dashboard confirms Advertisement 12/2026/CHQ/DR-CBT and 389 total posts, posted 22/07/2026. The stored 07/09/2026 deadline was not independently confirmed from the detailed advertisement in this pass; treat the deadline as unverified until checked against the PDF/corrigendum.";
    aai389Verified.updates = "AAI official dashboard confirms 389 posts under Advt. 12/2026/CHQ/DR-CBT and has exam/press-note updates through 23/09/2026. Deadline and post-wise vacancy/eligibility tables still require detailed-advertisement reconciliation.";
  }


  const kea210 = window.AJ_JOB_DATA.find(function (item) { return item.id === "kea-210-group-c-2026"; });
  if (kea210) {
    kea210.title = "KEA Group C Recruitment 2026 — 210 Urban Local Body Posts (Closed)";
    kea210.post = "Water Supply Operator / Assistant Water Supply Operator / Electrician Grade I & II";
    kea210.organization = "Karnataka Examinations Authority (KEA), on behalf of Directorate of Municipal Administration";
    kea210.openDate = "16/09/2026";
    kea210.lastDate = "30/09/2026 (closed; verify any official extension)";
    kea210.vacancy = "210 posts reported for Kalyana-Karnataka Urban Local Bodies under Notification ED/KEA/46/Rect/2026(KK); post-wise totals must be checked against the official notification.";
    kea210.official = "https://cetonline.karnataka.gov.in/kea/";
    kea210.notice = "https://cetonline.karnataka.gov.in/kea/";
    kea210.apply = "https://cetonline.karnataka.gov.in/kea/";
    kea210.verificationSource = "https://cetonline.karnataka.gov.in/kea/";
    kea210.dataAuditDate = "10/10/2026";
    kea210.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: matching secondary summaries identify Notification ED/KEA/46/Rect/2026(KK), 210 posts, application window 16/09/2026–30/09/2026. The exact official PDF was not retrieved in this pass; keep vacancy breakdown/eligibility marked pending and use the KEA portal for the original notice.";
    kea210.updates = "Reported application window ended 30/09/2026. Exact official PDF and post-wise vacancy table still need reconciliation; do not show as open unless an official extension is located.";
  }

  const mphc = window.AJ_JOB_DATA.find(function (item) { return item.id === "mp-high-court-1174-assistant"; });
  if (mphc) {
    mphc.title = "MP High Court Assistant Grade-III Recruitment 2026 — 1,174 Posts (Application Closed)";
    mphc.post = "Assistant Grade-III in District & Sessions Courts";
    mphc.organization = "High Court of Madhya Pradesh, Jabalpur";
    mphc.openDate = "17/08/2026";
    mphc.lastDate = "15/09/2026 (closed)";
    mphc.vacancy = "1,174 posts reported under Advertisement No. 614/Exam/2026; category/establishment distribution should be read from the official PDF.";
    mphc.official = "https://mphc.gov.in/";
    mphc.notice = "https://mphc.gov.in/";
    mphc.apply = "https://mphc.gov.in/";
    mphc.verificationSource = "https://mphc.gov.in/";
    mphc.dataAuditDate = "10/10/2026";
    mphc.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: recruitment title, 1,174 posts and 15/09/2026 closing date are corroborated by published recruitment summaries; MP High Court official site is linked, but the exact official PDF URL and all detailed fields were not fully reconciled in this pass. Exam-date notice reportedly dated 09/10/2026 should be confirmed on the official site.";
    mphc.updates = "Application window is closed. Visit the MP High Court official site for Advertisement 614/Exam/2026 and the latest examination schedule; detailed eligibility, fee and post-wise distribution remain pending exact-PDF comparison.";
  }


  // Official-source batch 4: correct unrelated SSC URLs and record direct recruiting authorities.
  const upssscJe = window.AJ_JOB_DATA.find(function (item) { return item.id === "upsssc-jr-engineer-agriculture"; });
  if (upssscJe) {
    upssscJe.official = "https://upsssc.gov.in/";
    upssscJe.notice = "https://upsssc.gov.in/";
    upssscJe.apply = "https://upsssc.gov.in/";
    upssscJe.verificationSource = "https://upsssc.gov.in/";
    upssscJe.dataAuditDate = "10/10/2026";
    upssscJe.verificationStatus = "NEEDS EXACT-NOTICE VERIFICATION 10/10/2026: prior URLs incorrectly pointed to SSC. Replaced them with the official Uttar Pradesh Subordinate Services Selection Commission portal; exact post/advertisement and deadline must be matched to the corresponding official notice before treating details as verified.";
    upssscJe.updates = "Official authority link corrected to UPSSSC. The prior SSC links were unrelated; detailed notice, eligibility, vacancy and deadline still need exact confirmation.";
  }

  const upessc = window.AJ_JOB_DATA.find(function (item) { return item.id === "upessc-12405-assistant-teacher"; });
  if (upessc) {
    upessc.title = "UPESSC SUPER TET 2026 — 12,405 Assistant Teacher Posts";
    upessc.post = "Assistant Teacher, Primary Urban; Assistant Teacher Attached to Primary (Boys/Girls)";
    upessc.organization = "Uttar Pradesh Education Service Selection Commission (UPESSC)";
    upessc.openDate = "16/09/2026";
    upessc.lastDate = "15/10/2026 (fee/application deadline per published recruitment reports)";
    upessc.vacancy = "12,405 total: 11,508 Assistant Teacher (Primary, Urban) and 897 Attached Primary posts in aided institutions (473 boys' schools; 424 girls' schools).";
    upessc.official = "https://upessc.up.gov.in/";
    upessc.notice = "https://upessc.up.gov.in/";
    upessc.apply = "https://upessc.up.gov.in/";
    upessc.verificationSource = "https://upessc.up.gov.in/";
    upessc.dataAuditDate = "10/10/2026";
    upessc.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: official UPESSC portal link confirmed; reputable published recruitment reports identify Advertisement No. 05/2026, 12,405 posts, application start 16/09/2026, fee/application deadline 15/10/2026 and correction deadline 19/10/2026. The direct official detailed PDF was not independently retrieved in this pass, so use the UPESSC portal as the final authority. Do not present the reported 03–04/12/2026 exam date as confirmed without an official schedule.";
    upessc.updates = "Advertisement No. 05/2026 reported for 12,405 posts. Complete OTR/application and fee steps by 15/10/2026; reported correction window ends 19/10/2026. Verify the detailed notice and any exam schedule directly on the official UPESSC portal.";
  }

  const navySsc = window.AJ_JOB_DATA.find(function (item) { return item.id === "indian-navy-275-ssc-officer"; });
  if (navySsc) {
    navySsc.official = "https://www.joinindiannavy.gov.in/";
    navySsc.notice = "https://www.joinindiannavy.gov.in/";
    navySsc.apply = "https://www.joinindiannavy.gov.in/";
    navySsc.verificationSource = "https://www.joinindiannavy.gov.in/";
    navySsc.dataAuditDate = "10/10/2026";
    navySsc.verificationStatus = "NEEDS EXACT-NOTICE VERIFICATION 10/10/2026: prior URLs incorrectly pointed to SSC. Replaced with the official Indian Navy recruitment portal; the 275-post figure and 03/08/2026 extended deadline were not independently matched to the exact notice in this pass.";
    navySsc.updates = "Official Indian Navy recruitment portal link corrected. Exact SSC officer entry notification, vacancy total and closing date still need reconciliation.";
  }

  const ngel = window.AJ_JOB_DATA.find(function (item) { return item.id === "ngel-engineer-executive"; });
  if (ngel) {
    ngel.title = "NGEL Engineer / Executive Recruitment 2026 — Advt. 04/26 (Application Closed)";
    ngel.organization = "NTPC Green Energy Limited (NGEL)";
    ngel.openDate = "18/08/2026";
    ngel.lastDate = "07/09/2026 (reported; closed; exact official PDF pending)";
    ngel.official = "https://www.ngel.in/";
    ngel.notice = "https://www.ngel.in/";
    ngel.apply = "https://www.ngel.in/";
    ngel.verificationSource = "https://www.ngel.in/";
    ngel.dataAuditDate = "10/10/2026";
    ngel.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: public recruitment summaries report Advt. 04/26 for 147 Engineer/Executive posts and a 07/09/2026 deadline, but the exact official NGEL PDF was not retrieved in this pass. Keep vacancy and deadline explicitly provisional until official notice is located.";
    ngel.updates = "Application deadline is reported as 07/09/2026 and has passed. Official NGEL portal linked; exact advertisement PDF and post-wise details remain pending.";
  }

  const armyNccIds = ["army-ncc-special-entry-men", "army-ncc-special-entry-women"];
  armyNccIds.forEach(function (id) {
    const item = window.AJ_JOB_DATA.find(function (record) { return record.id === id; });
    if (!item) return;
    item.official = "https://joinindianarmy.nic.in/";
    item.notice = "https://joinindianarmy.nic.in/";
    item.apply = "https://joinindianarmy.nic.in/";
    item.verificationSource = "https://joinindianarmy.nic.in/";
    item.dataAuditDate = "10/10/2026";
    item.verificationStatus = "NEEDS EXACT-NOTICE VERIFICATION 10/10/2026: official Indian Army recruitment portal link added, but the recorded 2026 NCC Special Entry dates and vacancy details were not matched to the exact official notification in this pass.";
    item.updates = "Application dates in the record are past. Use the official Indian Army portal to locate the matching NCC Special Entry notification; exact dates and vacancy details remain unverified.";
  });


  const icsi = window.AJ_JOB_DATA.find(function (item) { return item.id === "icsi-executive-assistant"; });
  if (icsi) {
    icsi.official = "https://stimulate.icsi.edu/RECRUITMENT/IndexHome/IndexHome";
    icsi.notice = icsi.official;
    icsi.apply = icsi.official;
    icsi.verificationSource = icsi.official;
    icsi.dataAuditDate = "10/10/2026";
    icsi.verificationStatus = "PARTIALLY VERIFIED 10/10/2026: ICSI's official recruitment management system lists Regular Posts, Advt. No. 02/2026, and later Executive Assistant written-test notices. The exact application deadline 12/08/2026 and vacancy/eligibility fields were not fully reconciled to the original advertisement in this pass; application is closed.";
    icsi.updates = "Official ICSI recruitment system is linked. The portal currently shows notices related to the Executive Assistant written test, not an open application; original Advt. 02/2026 must be checked for exact post-wise details.";
  }


  const bobWms = window.AJ_JOB_DATA.find(function (item) { return item.id === "bank-of-baroda-regular-hr-2026"; });
  if (bobWms) {
    bobWms.title = "Bank of Baroda Wealth Management Services Recruitment 2026 — 1,000 Posts";
    bobWms.post = "Professionals for Wealth Management Services Department";
    bobWms.organization = "Bank of Baroda";
    bobWms.openDate = "04/09/2026";
    bobWms.lastDate = "16/10/2026 (extended)";
    bobWms.vacancy = "1,000 posts in the Wealth Management Services Department under Advertisement BOB/HRM/REC/ADVT/2026/17.";
    bobWms.official = "https://bankofbaroda.bank.in/hi-in/career/current-opportunities/wealth-management-services-department-bob-hrm-rec-advt-2026-17";
    bobWms.notice = bobWms.official;
    bobWms.apply = bobWms.official;
    bobWms.verificationSource = bobWms.official;
    bobWms.dataAuditDate = "10/10/2026";
    bobWms.verificationStatus = "OFFICIAL BANK OF BARODA CAREER PAGE VERIFIED 10/10/2026: WMS Department Advertisement BOB/HRM/REC/ADVT/2026/17 lists 1,000 vacancies and an extended application deadline of 16/10/2026. Post-specific eligibility and vacancy distribution must be read from the linked official PDF.";
    bobWms.updates = "Official Bank of Baroda page lists 1,000 Wealth Management Services posts and the extended closing date 16/10/2026. This is distinct from the separate 100-post Corporate & Institutional Credit advertisement.";
  }


  // Sainik School Kunjpura staff recruitment: exact official five-page PDF checked 10/10/2026.
  const kunjpuraStaff = window.AJ_JOB_DATA.find(function (item) { return item.id === "sainik-school-kunjpura-15-2026"; });
  if (kunjpuraStaff) {
    kunjpuraStaff.title = "Sainik School Kunjpura Staff Recruitment 2026 — 15 Regular & Contractual Posts";
    kunjpuraStaff.organization = "Sainik School Kunjpura, Karnal, Haryana";
    kunjpuraStaff.post = "TGT General Science, TGT Hindi/Sanskrit, TGT Maths, TGT English, Horse Riding Instructor, Band Master, Mess Manager, Nursing Sister (Female), Ward Boys";
    kunjpuraStaff.shortInfo = "Official Recruitment of Staff notice invites applications for 15 regular and contractual posts. Last date for receipt of application by post is 31/10/2026. Application must use the prescribed form, include attested certificates/testimonials and passport-size photograph, and include a non-refundable ₹500 bank draft payable at Karnal. This is an offline postal application, not an online form.";
    kunjpuraStaff.openDate = "25/09/2026";
    kunjpuraStaff.lastDate = "31/10/2026 (application must reach the school by this date)";
    kunjpuraStaff.mode = "Offline / postal application";
    kunjpuraStaff.vacancy = "15 posts: TGT General Science 1; TGT Hindi/Sanskrit 2; TGT Maths 2; TGT English 1; Horse Riding Instructor 1; Band Master 1; Mess Manager 1; Nursing Sister (Female) 1; Ward Boys 5.";
    kunjpuraStaff.qualification = "TGT posts: relevant graduate/integrated degree with at least 50% marks in the subject and B.Ed. or equivalent; CTET/STET required as stated in the notice. Horse Riding Instructor: matriculation and Horse Riding Instructor course. Band Master: Potential Band Master/Band Major/Drum Major course at AEC Training College & Centre Pachmarhi or equivalent Navy/Air Force course. Mess Manager: matriculation, at least 5 years' independent catering-organisation experience and ability to maintain mess accounts/computer applications. Nursing Sister: nursing diploma/GNM/B.Sc Nursing plus 5 years' experience/service after training. Ward Boys: matriculation; good communication skills. Refer to the official PDF for each post's full conditions.";
    kunjpuraStaff.age = "As on 31/10/2026: TGT posts 21–35 years; Horse Riding Instructor 18–50; Band Master 21–50; Mess Manager 18–50; Nursing Sister 18–50; Ward Boys 18–50.";
    kunjpuraStaff.fee = "₹500 non-refundable fee by bank draft in favour of Principal, Sainik School Kunjpura, Karnal, payable at Karnal.";
    kunjpuraStaff.selection = "Shortlisting followed by written, practical and/or interview stages as applicable to the post.";
    kunjpuraStaff.salary = "TGT posts: Level 7. Horse Riding Instructor and Band Master: ₹35,000/month; Mess Manager: ₹29,200/month; Nursing Sister: ₹30,000/month; Ward Boys: ₹25,000/month.";
    kunjpuraStaff.official = "https://sskunjpura.org/";
    kunjpuraStaff.notice = "https://sskunjpura.org/admin/logged/images/academicupdate/c4ca4238a0b923820dcc509a6f75849bRecruitment-Notice.pdf";
    kunjpuraStaff.apply = "https://sskunjpura.org/";
    kunjpuraStaff.verificationSource = kunjpuraStaff.notice;
    kunjpuraStaff.dataAuditDate = "10/10/2026";
    kunjpuraStaff.verificationStatus = "VERIFIED AGAINST THE OFFICIAL FIVE-PAGE SAINIK SCHOOL KUNJPURA RECRUITMENT PDF. Confirmed 15 posts and post-wise counts, age limits, core qualifications, pay, ₹500 bank-draft fee, offline postal submission and 31/10/2026 receipt deadline.";
    kunjpuraStaff.updates = "Official PDF checked 10/10/2026. Application must reach the Principal, Sainik School Kunjpura, Karnal by 31/10/2026; postal delay is the applicant's responsibility. Download and read the full official notice before applying.";
  }


  // BTSC official recruitment table and exact advertisement PDFs checked 10/10/2026.
  const btscRecords = [
    {
      id: "btsc-scientific-assistant-30-2026",
      title: "BTSC Scientific Assistant Recruitment 2026 — Advt. No. 30/2026",
      post: "Scientific Assistant",
      openDate: "25/09/2026",
      lastDate: "24/10/2026 11:55 PM",
      notice: "https://btsc.bihar.gov.in/sites/default/files/Advertisement/30_2026.pdf",
      status: "PARTIALLY VERIFIED 10/10/2026: BTSC official recruitment table confirms Advertisement 30/2026, Scientific Assistant, registration 25/09/2026–24/10/2026, application deadline and payment last day 24/10/2026. Direct official PDF linked; post-wise vacancy/qualification/fee fields still require transcription from the PDF.",
      update: "Official BTSC table and Advertisement 30/2026 PDF linked. Applications close 24/10/2026; check the PDF for exact qualification, vacancy distribution, fee and selection rules."
    },
    {
      id: "btsc-fso-29-2026",
      title: "BTSC Food Safety Officer Recruitment 2026 — Advt. No. 29/2026",
      post: "Food Safety Officer",
      openDate: "25/09/2026",
      lastDate: "24/10/2026 11:55 PM",
      notice: "https://btsc.bihar.gov.in/sites/default/files/Advertisement/29_2026.pdf",
      status: "PARTIALLY VERIFIED 10/10/2026: BTSC official recruitment table confirms Advertisement 29/2026, Food Safety Officer, registration 25/09/2026–24/10/2026, application deadline and payment last day 24/10/2026. Direct official PDF linked; post-wise vacancy/qualification/fee fields still require transcription from the PDF.",
      update: "Official BTSC table and Advertisement 29/2026 PDF linked. Applications close 24/10/2026; check the PDF for exact qualification, vacancy distribution, fee and selection rules."
    },
    {
      id: "btsc-fishery-extension-28-2026",
      title: "BTSC Fishery Extension Officer Recruitment 2026 — Advt. No. 28/2026",
      post: "Fishery Extension Officer",
      openDate: "24/09/2026",
      lastDate: "23/10/2026 11:55 PM",
      notice: "https://btsc.bihar.gov.in/sites/default/files/Advertisement/28_2026.pdf",
      status: "PARTIALLY VERIFIED 10/10/2026: BTSC official recruitment table confirms Advertisement 28/2026, Fishery Extension Officer, registration 24/09/2026–23/10/2026, application deadline and payment last day 23/10/2026. Direct official PDF linked; post-wise vacancy/qualification/fee fields still require transcription from the PDF.",
      update: "Official BTSC table and Advertisement 28/2026 PDF linked. Applications close 23/10/2026; check the PDF for exact qualification, vacancy distribution, fee and selection rules."
    }
  ];
  btscRecords.forEach(function (cfg) {
    const record = window.AJ_JOB_DATA.find(function (item) { return item.id === cfg.id; });
    if (!record) return;
    record.title = cfg.title;
    record.post = cfg.post;
    record.organization = "Bihar Technical Service Commission (BTSC)";
    record.openDate = cfg.openDate;
    record.lastDate = cfg.lastDate;
    record.official = "https://btsc.bihar.gov.in/index.php/hi/recruitment";
    record.notice = cfg.notice;
    record.apply = "https://btsc.pariksha.nic.in/";
    record.verificationSource = cfg.notice;
    record.dataAuditDate = "10/10/2026";
    record.verificationStatus = cfg.status;
    record.updates = cfg.update;
  });


  // IBPS official recruitment index + matching registration portals checked 10/10/2026.
  // These entries intentionally publish only the verified title and dates; vacancy/eligibility
  // details remain marked pending until the issuing notice is transcribed.
  const ibpsCurrentListings = [
    {
      id: "kucbl-managers-assistant-managers-2026",
      title: "KUCBL Managers and Assistant Managers Recruitment 2026",
      post: "Managers and Assistant Managers",
      organization: "Kangra Central Cooperative Bank Limited (KUCBL)",
      openDate: "02/10/2026",
      lastDate: "25/10/2026",
      official: "https://www.ibps.in/index.php/recruitment/",
      notice: "https://ibpsreg.ibps.in/kucbldec25/",
      apply: "https://ibpsreg.ibps.in/kucbldec25/",
      vacancy: "Post-wise vacancy count: check the official detailed notification; not independently transcribed in this verification pass.",
      qualification: "Check the official detailed notification for post-wise qualification and experience requirements.",
      fee: "Refer to the official detailed notification and application portal.",
      selection: "As specified in the official detailed notification.",
      verificationSource: "https://ibpsreg.ibps.in/kucbldec25/",
      dataAuditDate: "10/10/2026",
      verificationStatus: "PARTIALLY VERIFIED 10/10/2026: IBPS official recruitment index and registration portal confirm the recruitment title and registration window 02/10/2026–25/10/2026. Vacancy count, eligibility, fee and selection details still require transcription from the official notice.",
      updates: "Registration and online fee payment close 25/10/2026; application printing is available through 10/11/2026. Print availability does not extend the registration deadline."
    },
    {
      id: "mpa-class-i-ii-posts-2026",
      title: "MPA Recruitment 2026 — Class I & II Posts",
      post: "Class I & II Posts",
      organization: "MPA",
      openDate: "29/09/2026",
      lastDate: "28/10/2026",
      official: "https://www.ibps.in/index.php/recruitment/",
      notice: "https://ibpsreg.ibps.in/mpajul26/",
      apply: "https://ibpsreg.ibps.in/mpajul26/",
      vacancy: "Post-wise vacancy count: check the official detailed notification; not independently transcribed in this verification pass.",
      qualification: "Check the official detailed notification for post-wise qualification and experience requirements.",
      fee: "Refer to the official detailed notification and application portal.",
      selection: "As specified in the official detailed notification.",
      verificationSource: "https://ibpsreg.ibps.in/mpajul26/",
      dataAuditDate: "10/10/2026",
      verificationStatus: "PARTIALLY VERIFIED 10/10/2026: IBPS official recruitment index and registration portal confirm the title and registration window 29/09/2026–28/10/2026. Vacancy count, eligibility, fee and selection details still require transcription from the official notice.",
      updates: "Registration and online fee payment close 28/10/2026; application printing is available through 12/11/2026. Print availability does not extend the registration deadline."
    },
    {
      id: "mecl-non-executive-advt-03-2026",
      title: "MECL Non-Executive Recruitment 2026 — Advt. 03/Rectt./2026",
      post: "Non-Executive Posts",
      organization: "Mineral Exploration and Consultancy Limited (MECL)",
      openDate: "12/09/2026",
      lastDate: "11/10/2026",
      official: "https://www.ibps.in/index.php/recruitment/",
      notice: "https://www.ibps.in/index.php/recruitment/",
      apply: "https://www.ibps.in/index.php/recruitment/",
      vacancy: "Post-wise vacancy count: consult MECL Advt. 03/Rectt./2026; not independently transcribed in this verification pass.",
      qualification: "Refer to MECL Advt. 03/Rectt./2026 for post-wise qualification, age and experience.",
      fee: "Refer to the official detailed notification.",
      selection: "As specified in MECL Advt. 03/Rectt./2026.",
      verificationSource: "https://www.ibps.in/index.php/recruitment/",
      dataAuditDate: "10/10/2026",
      verificationStatus: "PARTIALLY VERIFIED 10/10/2026: IBPS official recruitment index lists MECL Recruitment of Non-Executive Posts with registration 12/09/2026–11/10/2026. The detailed MECL advertisement fields still require independent transcription.",
      updates: "The official IBPS recruitment index lists 11/10/2026 as the closing date. Candidates should open the detailed MECL notice immediately to confirm post-wise eligibility, fee and application instructions."
    }
  ];
  ibpsCurrentListings.forEach(function (cfg) {
    let record = window.AJ_JOB_DATA.find(function (item) {
      if (!item || typeof item !== "object") return false;
      if (item.id === cfg.id) return true;
      const title = String(item.title || "") + " " + String(item.post || "") + " " + String(item.organization || "");
      if (cfg.id.indexOf("kucbl-") === 0) return /KUCBL|Kangra Central Cooperative Bank/i.test(title) && /Manager/i.test(title);
      if (cfg.id.indexOf("mpa-") === 0) return /MPA/i.test(title) && /Class I|Class II/i.test(title);
      return /MECL/i.test(title) && /Non.?Executive/i.test(title);
    });
    if (!record) {
      record = { id: cfg.id, title: cfg.title, post: cfg.post, organization: cfg.organization };
      window.AJ_JOB_DATA.push(record);
    }
    Object.keys(cfg).forEach(function (key) { record[key] = cfg[key]; });
  });

})();
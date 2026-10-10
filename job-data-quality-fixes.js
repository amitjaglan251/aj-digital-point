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
    // No matching official 1100-post Bank of Baroda SO notice found in this pass.
    "bank-of-baroda-1100-so-2026",
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
    ieb.updates = "Official IBPS recruitment page checked 10/10/2026. Registration window shown as 15/09/2026–10/10/2026. Read the linked official notice for complete eligibility and instructions.";
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

})();
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
    "drdo-dgre-jrf-2026-27"
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

})();
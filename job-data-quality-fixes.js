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
  }
})();
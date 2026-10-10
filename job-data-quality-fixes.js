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
    "rrb-cen-05-2026-paramedical-new"
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
})();
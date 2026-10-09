/* AJ DIGITAL POINT — job data quality safeguards.
 * Reviewed 09/10/2026. The canonical TRAI Guwahati and Kolkata records
 * already exist in central-jobs.js with separate official notices.
 * Remove only the obsolete combined legacy record; do not duplicate the
 * canonical location-specific records.
 */
(function () {
  const data = window.AJ_JOB_DATA;
  if (!Array.isArray(data)) return;

  const obsoleteId = "haryana-cs-joint-advisor-trai-2026";
  const canonicalIds = new Set([
    "trai-joint-advisor-guwahati-2026",
    "trai-joint-advisor-kolkata-2026"
  ]);

  // Drop the legacy combined entry and any accidental duplicate canonical IDs,
  // keeping the first canonical record supplied by central-jobs.js.
  const seen = new Set();
  window.AJ_JOB_DATA = data.filter(function (item) {
    if (!item || typeof item !== "object") return true;
    if (item.id === obsoleteId) return false;
    if (canonicalIds.has(item.id)) {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
    }
    return true;
  });
})();
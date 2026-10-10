import fs from 'node:fs/promises';
import vm from 'node:vm';

const root = process.cwd();
const source = await fs.readFile(root + '/central-jobs.js', 'utf8');
const quality = await fs.readFile(root + '/job-data-quality-fixes.js', 'utf8');
const context = { window: {}, console };
vm.runInNewContext(source, context, { timeout: 15000, filename: 'central-jobs.js' });
vm.runInNewContext(quality, context, { timeout: 15000, filename: 'job-data-quality-fixes.js' });
const records = context.window.AJ_JOB_DATA;
if (!Array.isArray(records)) throw new Error('AJ_JOB_DATA did not initialize.');

const genericOpen = /see official|as per notification|not specified|check official/i;
const genericLast = /see official|as per notification|not specified|check official|30 days from/i;
const genericVacancy = /see official|not specified|as per notification|various|check official/i;
const cutoff = new Date('2026-10-10T00:00:00Z');
const hasPastDate = value => {
  const match = String(value || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return false;
  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return date < cutoff;
};
const recordAudit = records.map(record => {
  const flags = [];
  if (!record.official) flags.push('missing_official_url');
  if (!record.notice) flags.push('missing_notice_url');
  if (!record.apply) flags.push('missing_apply_url');
  if (genericOpen.test(record.openDate || '')) flags.push('generic_open_date');
  if (genericLast.test(record.lastDate || '')) flags.push('generic_or_relative_deadline');
  if (genericVacancy.test(record.vacancy || '')) flags.push('generic_vacancy_count');
  if (hasPastDate(record.lastDate)) flags.push('deadline_date_before_2026-10-10_review_status');
  for (const field of ['official', 'notice', 'apply']) {
    if (record[field]) {
      try {
        const url = new URL(record[field]);
        if (!['http:', 'https:'].includes(url.protocol)) flags.push('invalid_' + field + '_protocol');
      } catch { flags.push('invalid_' + field + '_url'); }
    }
  }
  return {
    id: record.id, title: record.title || record.post || '',
    category: record.category || '', state: record.state || '',
    openDate: record.openDate || '', lastDate: record.lastDate || '',
    vacancy: record.vacancy || '', official: record.official || '',
    notice: record.notice || '', apply: record.apply || '',
    verificationStatus: record.verificationStatus || '',
    verificationSource: record.verificationSource || '',
    flags
  };
});
const urlSet = new Set();
for (const record of records) for (const field of ['official', 'notice', 'apply']) {
  const value = record[field];
  if (value) { try { urlSet.add(new URL(value).href); } catch {} }
}
const urls = [...urlSet];
const results = new Array(urls.length);
let cursor = 0;
async function checkOne(url) {
  let status = null, finalUrl = url, method = 'HEAD', error = '';
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000), headers: { 'user-agent': 'AJDigitalPointRecruitmentAudit/1.0' } });
    status = response.status; finalUrl = response.url || url;
    if ([400, 403, 405, 406, 429, 501].includes(status)) {
      method = 'GET-range';
      try { await response.body?.cancel(); } catch {}
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10000), headers: { 'range': 'bytes=0-0', 'user-agent': 'AJDigitalPointRecruitmentAudit/1.0' } });
      status = response.status; finalUrl = response.url || url;
      try { await response.body?.cancel(); } catch {}
    } else { try { await response.body?.cancel(); } catch {} }
  } catch (e) { error = String(e?.cause?.code || e?.name || e).slice(0, 180); }
  const bucket = status === null ? 'network_error' : status >= 200 && status < 400 ? 'reachable' : status === 401 || status === 403 || status === 429 ? 'blocked_or_rate_limited' : status === 404 || status === 410 ? 'not_found' : status >= 500 ? 'server_error' : 'other_http_status';
  return { url, finalUrl, method, status, bucket, error };
}
await Promise.all(Array.from({ length: Math.min(12, urls.length) }, async () => {
  while (cursor < urls.length) {
    const index = cursor++;
    results[index] = await checkOne(urls[index]);
  }
}));
const byUrl = new Map(results.map(result => [result.url, result]));
const recordLinkAudit = recordAudit.map(record => ({
  ...record,
  linkChecks: {
    official: record.official ? byUrl.get(record.official) || null : null,
    notice: record.notice ? byUrl.get(record.notice) || null : null,
    apply: record.apply ? byUrl.get(record.apply) || null : null
  }
}));
const summary = {
  generatedAt: new Date().toISOString(),
  sourceRecordCount: (source.match(/"id"\s*:/g) || []).length,
  effectiveRuntimeRecordCount: records.length,
  uniqueHttpUrlsChecked: urls.length,
  linkStatusCounts: results.reduce((acc, result) => { acc[result.bucket] = (acc[result.bucket] || 0) + 1; return acc; }, {}),
  recordsMissingAnyOfficialLink: recordAudit.filter(r => !r.official || !r.notice || !r.apply).length,
  recordsWithGenericOpeningDate: recordAudit.filter(r => r.flags.includes('generic_open_date')).length,
  recordsWithGenericDeadline: recordAudit.filter(r => r.flags.includes('generic_or_relative_deadline')).length,
  recordsWithGenericVacancy: recordAudit.filter(r => r.flags.includes('generic_vacancy_count')).length,
  recordsWithPastDeadlineDateToReview: recordAudit.filter(r => r.flags.includes('deadline_date_before_2026-10-10_review_status')).length,
  recordsWithAnyFieldFlags: recordAudit.filter(r => r.flags.length).length,
  limitation: 'HTTP reachability and field completeness are automated checks only; they do not prove that the official notice content matches every vacancy field.'
};
await fs.mkdir(root + '/browser-test-artifacts', { recursive: true });
await fs.writeFile(root + '/browser-test-artifacts/record-audit.json', JSON.stringify({ summary, links: results, records: recordLinkAudit }, null, 2));
console.log(JSON.stringify(summary, null, 2));

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = 'https://amitjaglan251.github.io/aj-digital-point/';
const root = process.cwd();
const outDir = path.join(root, 'browser-test-artifacts');
await fs.mkdir(outDir, { recursive: true });
const files = (await fs.readdir(root)).filter(f => f.endsWith('.html')).sort();
const browser = await chromium.launch({ headless: true });
const report = {
  base, totalHtmlPages: files.length, startedAt: new Date().toISOString(),
  pages: [], brokenInternalLinks: [], pageErrors: [], failedRequests: [],
  summary: { desktopPassed: 0, mobilePassed: 0, pagesWithHorizontalOverflow: [], pagesMissingPremiumCss: [], pagesWithoutTitle: [], forms: 0, buttons: 0, inputs: 0, links: 0 }
};
const seenLinks = new Set();
try {
  // Wait for GitHub Pages to serve the latest committed homepage.
  const warm = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  let live = false;
  for (let i = 0; i < 18; i++) {
    try {
      const response = await warm.goto(base + '?audit=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (response && response.status() < 400 && (await warm.title()).length) { live = true; break; }
    } catch {}
    await warm.waitForTimeout(10000);
  }
  await warm.close();
  if (!live) throw new Error('GitHub Pages homepage did not become available after waiting.');

  for (const file of files) {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
    const entry = { file, desktop: {}, mobile: {} };
    page.on('pageerror', e => report.pageErrors.push({ file, message: String(e) }));
    page.on('requestfailed', req => {
      if (req.url().startsWith(base)) report.failedRequests.push({ file, url: req.url(), error: req.failure()?.errorText });
    });
    try {
      const response = await page.goto(new URL(file, base).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(250);
      const desktop = await page.evaluate(() => {
        const visible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        const styles = [...document.styleSheets].map(s => s.href || '').filter(Boolean);
        return {
          title: document.title, bodyTextLength: (document.body?.innerText || '').trim().length,
          width: innerWidth, documentWidth: document.documentElement.scrollWidth,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
          premiumCssLoaded: styles.some(s => s.includes('premium.css')) || [...document.styleSheets].some(sheet => { try { return [...sheet.cssRules].some(rule => rule.href && rule.href.includes('premium.css')); } catch { return false; } }),
          links: [...document.querySelectorAll('a[href]')].filter(visible).map(a => a.href),
          buttons: [...document.querySelectorAll('button,[role="button"]')].filter(visible).length,
          forms: [...document.querySelectorAll('form')].filter(visible).length,
          inputs: [...document.querySelectorAll('input,select,textarea')].filter(visible).length,
          imagesMissing: [...document.images].filter(i => visible(i) && (!i.complete || i.naturalWidth === 0)).map(i => i.src).slice(0, 10)
        };
      });
      entry.desktop = { status: response?.status() ?? null, ...desktop };
      report.summary.forms += desktop.forms;
      report.summary.buttons += desktop.buttons;
      report.summary.inputs += desktop.inputs;
      report.summary.links += desktop.links.length;
      if (!desktop.title) report.summary.pagesWithoutTitle.push(file);
      if (!desktop.premiumCssLoaded) report.summary.pagesMissingPremiumCss.push(file);
      if (desktop.horizontalOverflow) report.summary.pagesWithHorizontalOverflow.push({ file, viewport: 'desktop', width: desktop.width, documentWidth: desktop.documentWidth });
      for (const href of desktop.links) {
        try {
          const u = new URL(href);
          if (u.origin === new URL(base).origin && !u.pathname.endsWith('#')) seenLinks.add(u.href);
        } catch {}
      }
      if (response && response.status() < 400 && desktop.bodyTextLength > 0) report.summary.desktopPassed++;
      if (['index.html','services-dashboard.html','latest-jobs.html','tools-center.html'].includes(file)) {
        await page.screenshot({ path: path.join(outDir, file.replace('.html','') + '-desktop.png'), fullPage: true });
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(150);
      const mobile = await page.evaluate(() => ({
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        visibleButtons: [...document.querySelectorAll('button,[role="button"]')].filter(el => el.offsetWidth || el.offsetHeight).length,
        visibleInputs: [...document.querySelectorAll('input,select,textarea')].filter(el => el.offsetWidth || el.offsetHeight).length
      }));
      entry.mobile = mobile;
      if (mobile.horizontalOverflow) report.summary.pagesWithHorizontalOverflow.push({ file, viewport: 'mobile', width: mobile.width, documentWidth: mobile.documentWidth });
      if (!mobile.horizontalOverflow) report.summary.mobilePassed++;
      if (file === 'index.html' || file === 'services-dashboard.html' || file === 'tools-center.html') {
        await page.screenshot({ path: path.join(outDir, file.replace('.html','') + '-mobile.png'), fullPage: true });
      }
    } catch (e) {
      entry.error = String(e);
      report.pageErrors.push({ file, message: String(e) });
    } finally {
      report.pages.push(entry);
      await page.close();
    }
  }

  // Exercise safe calculator/QR tools with synthetic values; no real forms or payments are submitted.
  const toolTests = [
    { file: 'age-calculator.html', fields: { '#dob': '1990-01-01' }, button: '#calc', result: '#result', expect: /वर्ष|years|महीने/ },
    { file: 'date-difference.html', fields: { '#a': '2024-01-01', '#b': '2024-12-31' }, button: '#go', result: '#r', expect: /दिन|days|साल/ },
    { file: 'emi-calculator.html', fields: { '#p': '500000', '#rate': '10', '#years': '5' }, button: '#go', result: '#r', expect: /Monthly EMI/ },
    { file: 'gst-calculator.html', fields: { '#amt': '1000' }, button: '#go', result: '#r', expect: /GST/ },
    { file: 'qr-generator.html', fields: { '#text': 'https://example.com' }, button: '#make', result: '#status', expect: /तैयार|ready/i }
  ];
  report.toolTests = [];
  for (const test of toolTests) {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const result = { file: test.file, passed: false };
    try {
      await p.goto(new URL(test.file, base).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
      for (const [selector, value] of Object.entries(test.fields)) await p.locator(selector).fill(value);
      await p.locator(test.button).click();
      await p.waitForTimeout(350);
      result.output = await p.locator(test.result).innerText();
      result.passed = test.expect.test(result.output);
      if (!result.passed) result.error = 'Unexpected or empty result text';
    } catch (e) { result.error = String(e); }
    report.toolTests.push(result);
    await p.close();
  }

  // Image resize and PDF merge are tested with generated sample files only.
  {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const result = { file: 'image-resizer.html', passed: false };
    try {
      await p.goto(new URL('image-resizer.html', base).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p5sAAAAASUVORK5CYII=', 'base64');
      await p.locator('#imageInput').setInputFiles({ name: 'audit-sample.png', mimeType: 'image/png', buffer: png });
      await p.waitForFunction(() => document.querySelector('#originalPreview')?.naturalWidth > 0, { timeout: 10000 });
      await p.locator('.image-menu-btn[onclick*="resize-section"]').click();
      await p.locator('#customWidth').fill('100');
      await p.locator('#customHeight').fill('100');
      await p.locator('button[onclick*="resizeUsingValues"]').click();
      await p.waitForFunction(() => document.querySelector('#resizedPreview')?.naturalWidth === 100, { timeout: 10000 });
      result.output = await p.locator('#successMessage').innerText();
      result.passed = true;
    } catch (e) { result.error = String(e); }
    report.toolTests.push(result);
    await p.close();
  }
  {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const result = { file: 'pdf-merge.html', passed: false };
    try {
      await p.goto(new URL('pdf-merge.html', base).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const objects = [
        '1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n',
        '2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n',
        '3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Resources << >> /Contents 4 0 R >>\\nendobj\\n',
        '4 0 obj\\n<< /Length 0 >>\\nstream\\n\\nendstream\\nendobj\\n'
      ];
      let pdf = '%PDF-1.4\\n';
      const offsets = [0];
      for (const obj of objects) { offsets.push(Buffer.byteLength(pdf, 'binary')); pdf += obj; }
      const xref = Buffer.byteLength(pdf, 'binary');
      pdf += 'xref\\n0 5\\n0000000000 65535 f \\n';
      for (let i = 1; i < offsets.length; i++) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \\n';
      pdf += 'trailer\\n<< /Size 5 /Root 1 0 R >>\\nstartxref\\n' + xref + '\\n%%EOF';
      const buffer = Buffer.from(pdf, 'binary');
      await p.locator('#files').setInputFiles([
        { name: 'sample-one.pdf', mimeType: 'application/pdf', buffer },
        { name: 'sample-two.pdf', mimeType: 'application/pdf', buffer }
      ]);
      await p.locator('#merge').click();
      await p.waitForFunction(() => document.querySelector('#status')?.textContent.includes('2 PDF merge'), { timeout: 15000 });
      result.output = await p.locator('#status').innerText();
      result.passed = true;
    } catch (e) { result.error = String(e); }
    report.toolTests.push(result);
    await p.close();
  }

  // Probe each distinct same-site destination once without submitting forms or changing user data.
  const request = await browser.newContext();
  const linkList = [...seenLinks].slice(0, 300);
  for (let i = 0; i < linkList.length; i += 12) {
    const chunk = linkList.slice(i, i + 12);
    const results = await Promise.all(chunk.map(async href => {
      try {
        const response = await request.request.get(href, { timeout: 8000, maxRedirects: 3 });
        if (response.status() >= 400) return { url: href, status: response.status() };
      } catch (e) { return { url: href, error: String(e) }; }
      return null;
    }));
    report.brokenInternalLinks.push(...results.filter(Boolean));
  }
  await request.close();
  report.checkedInternalLinks = linkList.length;
  report.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(outDir, 'full-site-audit.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ summary: report.summary, checkedInternalLinks: report.checkedInternalLinks, brokenInternalLinks: report.brokenInternalLinks, pageErrors: report.pageErrors.slice(0, 30), failedRequests: report.failedRequests.slice(0, 30) }, null, 2));
  if (report.pages.length !== files.length) throw new Error('Not all HTML pages were audited.');
  if (report.summary.pagesWithoutTitle.length) throw new Error('Some pages have no document title.');
  if (report.brokenInternalLinks.length) throw new Error('Broken same-site links were detected.');
  if (report.toolTests.some(t => !t.passed)) throw new Error('One or more calculator/QR tool interaction tests failed.');
  if (report.summary.pagesWithHorizontalOverflow.length) throw new Error('Horizontal overflow detected; see full-site-audit.json.');
} finally {
  await browser.close();
}

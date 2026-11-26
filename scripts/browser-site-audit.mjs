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
          premiumCssLoaded: styles.some(s => s.includes('premium.css')),
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

  // Probe each distinct same-site destination once without submitting forms or changing user data.
  const request = await browser.newPage();
  for (const href of [...seenLinks].slice(0, 500)) {
    try {
      const response = await request.goto(href, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (!response || response.status() >= 400) report.brokenInternalLinks.push({ url: href, status: response?.status() ?? 'no response' });
    } catch (e) { report.brokenInternalLinks.push({ url: href, error: String(e) }); }
  }
  await request.close();
  report.checkedInternalLinks = Math.min(seenLinks.size, 500);
  report.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(outDir, 'full-site-audit.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ summary: report.summary, checkedInternalLinks: report.checkedInternalLinks, brokenInternalLinks: report.brokenInternalLinks, pageErrors: report.pageErrors.slice(0, 30), failedRequests: report.failedRequests.slice(0, 30) }, null, 2));
  if (report.pages.length !== files.length) throw new Error('Not all HTML pages were audited.');
  if (report.summary.pagesWithoutTitle.length) throw new Error('Some pages have no document title.');
  if (report.brokenInternalLinks.length) throw new Error('Broken same-site links were detected.');
  if (report.summary.pagesWithHorizontalOverflow.length) throw new Error('Horizontal overflow detected; see full-site-audit.json.');
} finally {
  await browser.close();
}

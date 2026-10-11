#!/usr/bin/env python3
"""Conservative official-site change monitor for AJ DIGITAL POINT.
Uses only Python standard library. It publishes detected official links as leads;
it does NOT claim a notice's details have been independently verified.
"""
import json, os, re, html, hashlib, time
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data")
SOURCES_FILE = os.path.join(DATA_DIR, "official_sources.json")
STATE_FILE = os.path.join(DATA_DIR, "official_updates_state.json")
OUTPUT_JSON = os.path.join(ROOT, "auto-updates.json")
OUTPUT_HTML = os.path.join(ROOT, "auto-updates.html")
KEYWORDS = re.compile(r"(result|merit|rank.?list|answer.?key|admit.?card|hall.?ticket|recruit|vacan|career|notification|notice|advertisement|admission|counselling|counseling|seat.?allot|exam|scheme|application|form|short.?list|shortlist|provisional|date.?sheet|time.?table|timetable|certificate|scholarship|revaluation|supplementary|entrance)", re.I)
SKIP = re.compile(r"(privacy|cookie|facebook|instagram|youtube|twitter|linkedin|login|sign.?in|javascript|mailto:)", re.I)
MAX_LINKS_PER_SOURCE = 12
TIMEOUT = 18

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links=[]
        self._href=None
        self._text=[]
    def handle_starttag(self, tag, attrs):
        if tag.lower()=="a":
            self._href=dict(attrs).get("href")
            self._text=[]
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower()=="a" and self._href is not None:
            self.links.append((self._href, " ".join(" ".join(self._text).split())))
            self._href=None; self._text=[]

def get(url):
    req=Request(url, headers={"User-Agent":"AJDigitalPointOfficialMonitor/1.0 (+https://amitjaglan251.github.io/aj-digital-point/)", "Accept":"text/html,application/xhtml+xml,*/*"})
    with urlopen(req, timeout=TIMEOUT) as resp:
        raw=resp.read(2_000_000)
        charset=resp.headers.get_content_charset() or "utf-8"
        return raw.decode(charset, errors="replace")

def absolute(base, href):
    from urllib.parse import urljoin, urlparse
    u=urljoin(base, href.strip())
    p=urlparse(u)
    if p.scheme not in ("http","https") or not p.netloc: return None
    if p.netloc.lower() != urlparse(base).netloc.lower(): return None
    if SKIP.search(u): return None
    return u.split("#",1)[0]

def clean_text(text):
    return re.sub(r"\s+", " ", html.unescape(text or "")).strip()[:240]

def main():
    with open(SOURCES_FILE, encoding="utf-8") as f: sources=json.load(f)["sources"]
    try:
        with open(STATE_FILE, encoding="utf-8") as f: state=json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        state={"seen":{}, "page_hashes":{}}
    seen=set(state.get("seen",{}).keys())
    updates=[]; health=[]
    now=datetime.now(timezone.utc).isoformat(timespec="seconds")
    for source in sources:
        name, url, category=source["name"], source["url"], source["category"]
        try:
            body=get(url)
            digest=hashlib.sha256(body.encode("utf-8",errors="replace")).hexdigest()
            parser=LinkParser(); parser.feed(body)
            candidates=[]
            for href, label in parser.links:
                target=absolute(url, href)
                label=clean_text(label)
                if not target or not label or len(label)<3 or not KEYWORDS.search(label+" "+target): continue
                if target.rstrip("/") == url.rstrip("/"): continue
                key=hashlib.sha256((name+"|"+target).encode()).hexdigest()
                candidates.append((key, {"source":name,"source_url":url,"category":category,"title":label,"url":target,"detected_at":now}))
            # Prefer unseen links, newest in page order. Limit each source to keep output readable.
            unique=[]; local=set()
            for key,item in candidates:
                if key in local: continue
                local.add(key)
                if key not in seen:
                    unique.append((key,item))
            for key,item in unique[:MAX_LINKS_PER_SOURCE]:
                updates.append(item)
                state.setdefault("seen",{})[key]={"url":item["url"],"title":item["title"],"first_detected":now}
            state.setdefault("page_hashes",{})[url]={"hash":digest,"checked_at":now,"status":"ok"}
            health.append({"name":name,"url":url,"status":"ok","new_links":min(len(unique),MAX_LINKS_PER_SOURCE)})
        except Exception as e:
            health.append({"name":name,"url":url,"status":"error","error":str(e)[:180],"checked_at":now})
            # Continue monitoring other sources even if one host is down.
    updates=updates[:200]
    payload={"generated_at":now,"description":"Automatically detected links from configured official websites. These are leads; read the original notice before acting.","total_new_links_this_run":len(updates),"sources_checked":len(sources),"sources_ok":sum(1 for x in health if x["status"]=="ok"),"sources_failed":sum(1 for x in health if x["status"]!="ok"),"updates":updates,"source_health":health}
    with open(OUTPUT_JSON,"w",encoding="utf-8") as f: json.dump(payload,f,ensure_ascii=False,indent=2)
    # Keep up to 1000 seen link keys so repeat runs do not keep publishing the same URLs.
    if len(state.get("seen",{}))>5000:
        state["seen"]=dict(list(state["seen"].items())[-4000:])
    with open(STATE_FILE,"w",encoding="utf-8") as f: json.dump(state,f,ensure_ascii=False,indent=2)
    rows=[]
    if updates:
        for x in updates:
            rows.append('<article class="item"><div class="meta">'+html.escape(x["category"])+' · '+html.escape(x["source"])+'</div><h2>'+html.escape(x["title"])+'</h2><p>इस लिंक को संबंधित official source पर खोलकर notice की तारीख, eligibility, deadline और PDF स्वयं verify करें।</p><a href="'+html.escape(x["url"],quote=True)+'" target="_blank" rel="noopener noreferrer">Official notice / page खोलें ↗</a><div class="source">Source: <a href="'+html.escape(x["source_url"],quote=True)+'" target="_blank" rel="noopener noreferrer">'+html.escape(x["source"])+'</a></div></article>')
    else:
        rows.append('<p class="empty">इस scan में कोई नया matching link नहीं मिला। इसका अर्थ यह नहीं कि किसी official website पर update नहीं आया; कुछ portals JavaScript, PDF-only notices या bot protection इस्तेमाल करते हैं।</p>')
    errors=[x for x in health if x["status"]!="ok"]
    error_html=('<details><summary>Source check status ('+str(len(errors))+' failed)</summary><ul>'+''.join('<li>'+html.escape(x["name"])+': '+html.escape(x.get("error","request failed"))+'</li>' for x in errors)+'</ul></details>') if errors else '<p class="health">इस run में सभी configured source pages ने response दिया। Individual notices की पुष्टि फिर भी जरूरी है।'
    doc='''<!doctype html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Auto-Detected Official Updates | AJ DIGITAL POINT</title><meta name="description" content="Configured official websites se automatically detected job, admission, result and scheme links. Verify each original notice."><link rel="canonical" href="https://amitjaglan251.github.io/aj-digital-point/auto-updates.html"><style>*{box-sizing:border-box}body{margin:0;font-family:Arial, sans-serif;background:#f4f7fb;color:#172033;line-height:1.55}.wrap{max-width:1050px;margin:auto;padding:20px}.hero{background:#12366b;color:white;padding:24px;border-radius:16px}.hero h1{margin:0 0 8px}.hero p{margin:6px 0}.stats{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}.stat,.item,.warning{background:white;border:1px solid #dce4ef;border-radius:12px;padding:15px}.stat{flex:1;min-width:130px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:14px}.item h2{font-size:18px;margin:8px 0}.meta,.source{font-size:13px;color:#53647c}.item a{color:#0759b5;overflow-wrap:anywhere}.warning{margin:14px 0;border-left:4px solid #d58b00}.empty{padding:18px;background:white;border-radius:12px}.footer{color:#53647c;font-size:13px;margin-top:22px}a{overflow-wrap:anywhere}</style></head><body><main class="wrap"><header class="hero"><h1>AJ DIGITAL POINT — Auto-Detected Official Updates</h1><p>Jobs · Admit Cards · Results · Admissions · Schemes · Notices</p><p>Last scan (UTC): '''+html.escape(now)+'''</p></header><section class="stats"><div class="stat"><b>New links this run</b><br>'''+str(len(updates))+'''</div><div class="stat"><b>Configured sources</b><br>'''+str(len(sources))+'''</div><div class="stat"><b>Sources responded</b><br>'''+str(payload["sources_ok"])+'''</div><div class="stat"><b>Sources failed</b><br>'''+str(payload["sources_failed"])+'''</div></section><section class="warning"><b>ज़रूरी सूचना:</b> यह automatic link monitor है, पूर्ण सरकारी सत्यापन सेवा नहीं। कुछ websites के JavaScript pages, PDF-only notices, login pages या blocked pages scan में नहीं आ सकते। किसी भी तारीख, vacancy, fee, eligibility या result को सही मानने से पहले मूल official notification/PDF देखें। यह पेज नए matching links दिखाता है; यह पुराने job/result records को अपने-आप edit या verified mark नहीं करता।</section><section class="grid">'''+''.join(rows)+'''</section><h2>Monitoring status</h2>'''+error_html+'''<p class="footer">AJ DIGITAL POINT · Independent information portal · <a href="index.html">Home</a> · <a href="latest-jobs.html">Jobs</a> · <a href="results.html">Results</a> · <a href="admissions.html">Admissions</a> · <a href="govt-schemes.html">Schemes</a></p></main></body></html>'''
    with open(OUTPUT_HTML,"w",encoding="utf-8") as f: f.write(doc)
    print("sources:",len(sources),"ok:",payload["sources_ok"],"failed:",payload["sources_failed"],"new_links:",len(updates))
    # If every source failed, fail the job so Actions clearly signals the outage.
    if payload["sources_failed"] == len(sources):
        raise SystemExit("All configured official source pages failed")
if __name__=="__main__": main()

/* AJ DIGITAL POINT — attach only strongly matching links from configured official-source scans.
   The monitor restricts discovered links to the same host as each configured official source.
   This displays links; it does not auto-verify or rewrite dates, eligibility, vacancy counts, or selection status. */
(function(){
  'use strict';
  const FEED='auto-updates.json';
  const STOP=new Set(['official','source','page','updated','result','results','answer','key','admit','card','notice','notification','recruitment','recruit','exam','examination','check','download','online','apply','form','the','for','and','with','post','posts','of','in','to','at','by','from','2026','2025','2024','2023','latest','new','final','written','test','update','updates']);
  const clean=s=>String(s||'').toLowerCase().replace(/&amp;/g,'&').replace(/[^a-z0-9]+/g,' ').trim();
  const tokens=s=>clean(s).split(/\s+/).filter(t=>t.length>1&&!STOP.has(t));
  const code=s=>(clean(s).match(/\b(?:advt|advertisement|notification|notice)\s*(?:no\s*)?[a-z0-9/-]+/i)||[])[0]||'';
  function matches(jobTitle,item){
    const title=String(item.title||'');
    if(!title || /^official source page updated:/i.test(title)) return false;
    const a=tokens(jobTitle), b=new Set(tokens(title+' '+(item.category||'')));
    if(a.length<2) return false;
    const common=a.filter(t=>b.has(t));
    const unique=[...new Set(common)];
    const ca=code(jobTitle), cb=code(title);
    if(ca&&cb&&clean(ca)!==clean(cb)) return false;
    // Require two meaningful shared terms; generic portal-homepage links won't qualify.
    if(unique.length<2) return false;
    const specificity=unique.filter(t=>/\d/.test(t)||t.length>=4).length;
    return specificity>=1;
  }
  function addLink(container,item,detail){
    if(!container||container.querySelector('[data-aj-official-url="'+CSS.escape(item.url)+'"]')) return;
    let url;
    try{url=new URL(item.url,location.href)}catch(_){return}
    if(!/^https?:$/.test(url.protocol)) return;
    const a=document.createElement('a');
    a.href=url.href; a.target='_blank'; a.rel='noopener noreferrer'; a.dataset.ajOfficialUrl=item.url;
    a.className=detail?'detail-link':'aj-auto-official-link';
    a.textContent='🔗 Official Update — '+String(item.title||'Open official notice')+' ↗';
    a.style.cssText=detail?'grid-column:1/-1;':'display:inline-flex;align-items:center;background:#e8f3ff;color:#064b91;border:1px solid #9bc9f4;border-radius:7px;padding:7px 10px;text-decoration:none;font-size:12px;font-weight:800;margin-top:6px;';
    a.title='Original link detected on '+String(item.source||'configured official source')+'. Verify the notice before acting.';
    container.appendChild(a);
  }
  function attachCards(items){
    document.querySelectorAll('.job-card').forEach(card=>{
      const title=card.querySelector('h3')?.textContent||'';
      const matched=items.filter(x=>matches(title,x)).slice(0,3);
      if(!matched.length)return;
      let area=card.querySelector('.actions');
      if(!area){area=document.createElement('div');area.className='actions';card.appendChild(area);}
      matched.forEach(x=>addLink(area,x,false));
    });
  }
  function attachDetail(items){
    const heading=document.querySelector('.detail-hero h1, h1');
    const title=heading?.textContent||'';
    const matched=items.filter(x=>matches(title,x)).slice(0,8);
    if(!matched.length)return;
    let box=document.getElementById('ajMatchedOfficialUpdates');
    if(!box){
      box=document.createElement('section');box.id='ajMatchedOfficialUpdates';box.className='jobbox';
      const h=document.createElement('h2');h.textContent='🔔 इस भर्ती के नए Official Updates';box.appendChild(h);
      const note=document.createElement('p');note.className='muted';note.textContent='ये लिंक official source monitor से मिले हैं और job title से match किए गए हैं। तारीख, पात्रता और अंतिम स्थिति मूल notice में जाँचें।';box.appendChild(note);
      const links=document.createElement('div');links.className='link-grid';box.appendChild(links);
      const parent=document.getElementById('linkGrid')?.closest('.jobbox')||document.getElementById('linkGrid')?.parentElement;
      if(parent&&parent.parentElement) parent.parentElement.insertBefore(box,parent.nextSibling); else document.querySelector('main')?.appendChild(box);
    }
    const area=box.querySelector('.link-grid');
    matched.forEach(x=>addLink(area,x,true));
  }
  fetch(FEED+'?v='+Date.now(),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('feed unavailable');return r.json()}).then(data=>{
    const items=[...(Array.isArray(data.all_updates)?data.all_updates:[]),...(Array.isArray(data.updates)?data.updates:[])];
    const seen=new Set();const unique=items.filter(x=>x&&x.url&&!seen.has(x.url)&&seen.add(x.url));
    attachCards(unique);attachDetail(unique);
    const app=document.getElementById('app');
    if(app&&window.MutationObserver)new MutationObserver(()=>attachCards(unique)).observe(app,{childList:true,subtree:true});
  }).catch(()=>{ /* keep the page usable if the feed is temporarily unavailable */ });
})();
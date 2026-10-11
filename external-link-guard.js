/* AJ DIGITAL POINT: route external navigation through the branded link confirmation page. */
(function(){
  if(location.pathname.endsWith('/external-link.html')||location.pathname.endsWith('external-link.html')) return;
  document.addEventListener('click',function(event){
    const a=event.target&&event.target.closest?event.target.closest('a[href]'):null;
    if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey) return;
    if(a.hasAttribute('download')||a.getAttribute('target')==='_blank'||a.dataset.directExternal==='true') return;
    let u;try{u=new URL(a.href,location.href)}catch(e){return}
    if(!['http:','https:'].includes(u.protocol)||u.origin===location.origin) return;
    if(/(^|\.)whatsapp\.com$/i.test(u.hostname)||/^chat\.whatsapp\.com$/i.test(u.hostname)) return;
    event.preventDefault();
    const label=(a.innerText||a.getAttribute('aria-label')||'बाहरी लिंक').trim().slice(0,160);
    location.href='external-link.html?url='+encodeURIComponent(u.href)+'&label='+encodeURIComponent(label);
  },true);
})();
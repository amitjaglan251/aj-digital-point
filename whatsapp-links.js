/* AJ DIGITAL POINT WhatsApp community links — injected on portal pages */
(function(){
  if(document.getElementById('aj-whatsapp-community-top')) return;
  const group='https://chat.whatsapp.com/Kw4IRwTUZ9iAAgyxF10CQk';
  const channel='https://whatsapp.com/channel/0029VajGtbVCcW4mxZNgAo2x';
  const style=document.createElement('style');
  style.textContent=`
    .aj-wa-community{box-sizing:border-box;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;padding:10px 14px;background:#eafff1;border:1px solid #a7e7bb;color:#14532d;font:700 14px/1.4 Arial,sans-serif;text-align:center}
    .aj-wa-community .aj-wa-title{font-weight:900}
    .aj-wa-community a{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 13px;border-radius:999px;background:#128c4a;color:#fff!important;text-decoration:none!important;font-weight:900;box-shadow:0 2px 5px #00000012}
    .aj-wa-community a.aj-wa-channel{background:#075e54}
    .aj-wa-community a:focus,.aj-wa-community a:hover{filter:brightness(.92);text-decoration:underline!important}
    #aj-whatsapp-community-bottom{margin:18px auto 0;border-radius:10px;max-width:1200px}
    @media(max-width:520px){.aj-wa-community{gap:7px;padding:10px 8px;font-size:13px}.aj-wa-community a{flex:1 1 145px;padding:9px 8px}}
  `;
  document.head.appendChild(style);
  function makeBar(id,label){
    const bar=document.createElement('section');bar.id=id;bar.className='aj-wa-community';
    bar.setAttribute('aria-label','AJ DIGITAL POINT WhatsApp community');
    bar.innerHTML='<span class="aj-wa-title">'+label+'</span><a href="'+group+'" target="_blank" rel="noopener noreferrer">💬 WhatsApp Group Join करें</a><a class="aj-wa-channel" href="'+channel+'" target="_blank" rel="noopener noreferrer">📢 WhatsApp Channel Follow करें</a>';
    return bar;
  }
  const top=makeBar('aj-whatsapp-community-top','AJ DIGITAL POINT से जुड़ें:');
  const body=document.body;
  body.insertBefore(top,body.firstChild);
  const bottom=makeBar('aj-whatsapp-community-bottom','लेटेस्ट Jobs, Result और Updates पाएँ:');
  const footer=body.querySelector('footer');
  if(footer) body.insertBefore(bottom,footer);
  else body.appendChild(bottom);
})();
const services=[
{c:'identity',i:'🪪',n:'PAN Card Services',d:'New PAN, correction, reprint और official PAN services.',u:'pan-services.html'},
{c:'identity',i:'🔗',n:'PAN–Aadhaar Link Status',d:'Official Income Tax service के माध्यम से link status check करें.',u:'https://www.incometax.gov.in/iec/foportal/help/how-to-link-aadhaar',o:1},
{c:'identity',i:'🆔',n:'Aadhaar Services',d:'Aadhaar update और official citizen services.',u:'aadhaar-update.html'},
{c:'identity',i:'🗳️',n:'Voter ID',d:'Voter registration, correction और status के official services.',u:'https://voters.eci.gov.in/',o:1},
{c:'vehicle',i:'🚗',n:'Vehicle / RC',d:'Vehicle और registration related official services.',u:'https://parivahan.gov.in/',o:1},
{c:'vehicle',i:'🪪',n:'Driving Licence',d:'DL application, renewal और transport services.',u:'https://parivahan.gov.in/',o:1},
{c:'vehicle',i:'⚠️',n:'Traffic Challan',d:'Official eChallan portal खोलें.',u:'https://echallan.parivahan.gov.in/',o:1},
{c:'business',i:'🧾',n:'GST Services',d:'GST registration, search और taxpayer services.',u:'https://www.gst.gov.in/',o:1},
{c:'business',i:'🏢',n:'Udyam Registration',d:'MSME/Udyam registration का official portal.',u:'https://udyamregistration.gov.in/',o:1},
{c:'business',i:'👷',n:'EPFO / PF',d:'PF account और EPFO services.',u:'https://www.epfindia.gov.in/',o:1},
{c:'business',i:'💰',n:'Income Tax',d:'Income Tax e-Filing की official services.',u:'https://www.incometax.gov.in/iec/foportal/',o:1},
{c:'citizen',i:'📜',n:'Haryana Certificates',d:'Income, caste, residence, EWS आदि के official Haryana services.',u:'https://saralharyana.gov.in/',o:1},
{c:'citizen',i:'🏥',n:'Ayushman Bharat',d:'Ayushman Bharat की official information और services.',u:'https://pmjay.gov.in/',o:1},
{c:'citizen',i:'🛂',n:'Passport',d:'Passport application और status की official services.',u:'https://www.passportindia.gov.in/',o:1},
{c:'citizen',i:'👨‍👩‍👧',n:'Haryana Family ID',d:'Parivar Pehchan Patra का official portal.',u:'https://meraparivar.haryana.gov.in/',o:1},
{c:'citizen',i:'🏠',n:'Haryana Land Records',d:'Jamabandi और land record services.',u:'https://jamabandi.nic.in/',o:1},
{c:'documents',i:'🖼️',n:'Photo Resize',d:'Online image resize tool.',u:'image-resizer.html'},
{c:'documents',i:'📄',n:'Image to PDF',d:'Multiple images को PDF में convert करें.',u:'image-to-pdf.html'},
{c:'documents',i:'🧮',n:'Age Calculator',d:'Age calculation utility.',u:'age-calculator.html'},
{c:'jobs',i:'💼',n:'Haryana Govt Jobs',d:'Haryana government job updates और links.',u:'haryana-govt-jobs.html'}
];
const grid=document.getElementById('serviceGrid'),search=document.getElementById('search'),cat=document.getElementById('category'),empty=document.getElementById('empty'),count=document.getElementById('resultCount');
function render(){const q=search.value.trim().toLowerCase(),c=cat.value;const list=services.filter(s=>(c==='all'||s.c===c)&&(!q||(s.n+' '+s.d+' '+s.c).toLowerCase().includes(q)));grid.innerHTML=list.map(s=>`<article class="card"><span class="icon">${s.i}</span><h3>${s.n}</h3><p>${s.d}</p><a href="${s.u}" ${s.o?'target="_blank" rel="noopener noreferrer"':''}>Open Service →</a></article>`).join('');empty.style.display=list.length?'none':'block';count.textContent=`${list.length} services available`}
search.addEventListener('input',render);cat.addEventListener('change',render);document.getElementById('clear').onclick=()=>{search.value='';render();search.focus()};document.getElementById('menuBtn').onclick=()=>document.getElementById('nav').classList.toggle('open');render();

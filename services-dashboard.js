const services=[
{c:'identity',i:'🪪',n:'PAN Card Services',d:'New PAN, correction, reprint और official PAN services.',u:'pan-service-request.html',k:'pan card permanent account number correction reprint',b:'Popular'},
{c:'identity',i:'🔎',n:'PAN Status',d:'AJ DIGITAL POINT request status और authorised PAN status services.',u:'pan-status.html',k:'pan status track application',b:'Popular'},
{c:'identity',i:'🔗',n:'PAN–Aadhaar Link Status',d:'Income Tax Department की official service से link status check करें.',u:'service-details.html?service=link',k:'pan aadhaar link linking'},
{c:'identity',i:'🆔',n:'Aadhaar Services',d:'Aadhaar update और official citizen services.',u:'aadhaar-update.html',k:'aadhaar aadhar update uidai',b:'Popular'},
{c:'identity',i:'🔎',n:'PAN Verification',d:'Authorized/official PAN verification service.',u:'https://www.incometax.gov.in/iec/foportal/',o:1,k:'pan verify verification income tax',b:'Official'},
{c:'identity',i:'🗳️',n:'Voter ID',d:'Voter registration, correction और status के official services.',u:'service-details.html?service=voter',k:'voter election epic'},
{c:'identity',i:'🛂',n:'Passport Services',d:'Passport application और status की official services.',u:'https://www.passportindia.gov.in/',o:1,k:'passport seva application status',b:'Official'},
{c:'vehicle',i:'🚗',n:'Vehicle / RC',d:'Registration Certificate और vehicle related official services.',u:'service-details.html?service=rc',k:'vehicle rc registration certificate',b:'Popular'},
{c:'vehicle',i:'🔍',n:'Vehicle Information',d:'Vehicle-related information के लिए official Parivahan services.',u:'https://parivahan.gov.in/',o:1,k:'vehicle number parivahan details',b:'Official'},
{c:'vehicle',i:'🪪',n:'Driving Licence',d:'DL application, renewal और transport services.',u:'service-details.html?service=dl',k:'driving license licence dl renewal',b:'Popular'},
{c:'vehicle',i:'⚠️',n:'Traffic Challan',d:'Official eChallan portal खोलें.',u:'service-details.html?service=challan',k:'challan traffic fine echallan'},
{c:'vehicle',i:'📋',n:'Vehicle Registration Services',d:'RC related application और services.',u:'https://vahan.parivahan.gov.in/',o:1,k:'vahan rc registration',b:'Official'},
{c:'business',i:'🧾',n:'GST Services',d:'GST registration, search और taxpayer services.',u:'service-details.html?service=gst',k:'gst registration tax taxpayer',b:'Popular'},
{c:'business',i:'🏢',n:'Udyam Registration',d:'MSME/Udyam registration का official portal.',u:'https://udyamregistration.gov.in/',o:1,k:'udyam msme registration',b:'Official'},
{c:'business',i:'👷',n:'EPFO / PF',d:'PF account और EPFO services.',u:'https://www.epfindia.gov.in/',o:1,k:'epfo pf provident fund pension'},
{c:'business',i:'💰',n:'Income Tax',d:'Income Tax e-Filing की official services.',u:'https://www.incometax.gov.in/iec/foportal/',o:1,k:'income tax itr filing pan',b:'Official'},
{c:'business',i:'🏛️',n:'MCA Services',d:'Company/LLP related official services.',u:'https://www.mca.gov.in/',o:1,k:'mca company llp corporate'},
{c:'business',i:'🚀',n:'Startup India',d:'Startup ecosystem और official services.',u:'https://www.startupindia.gov.in/',o:1,k:'startup business entrepreneur'},
{c:'citizen',i:'📜',n:'Haryana Certificates',d:'Income, caste, residence, EWS आदि के official Haryana services.',u:'service-details.html?service=cert',k:'haryana income caste certificate residence domicile ews',b:'Popular'},
{c:'citizen',i:'🏥',n:'Ayushman Bharat',d:'Ayushman Bharat की official information और services.',u:'https://pmjay.gov.in/',o:1,k:'ayushman health pmjay card',b:'Official'},
{c:'citizen',i:'👨‍👩‍👧',n:'Haryana Family ID',d:'Parivar Pehchan Patra का official portal.',u:'https://meraparivar.haryana.gov.in/',o:1,k:'family id parivar pehchan patra ppp'},
{c:'citizen',i:'🏠',n:'Haryana Land Records',d:'Jamabandi और land record services.',u:'https://jamabandi.nic.in/',o:1,k:'jamabandi land record property',b:'Official'},
{c:'citizen',i:'👮',n:'Haryana Police Services',d:'Police verification और citizen services के official links.',u:'https://haryanapolice.gov.in/',o:1,k:'police verification pcc haryana police'},
{c:'citizen',i:'🌾',n:'Haryana Agriculture',d:'Agriculture department की official services.',u:'https://agri.haryana.gov.in/',o:1,k:'farmer agriculture fasal subsidy'},
{c:'citizen',i:'💼',n:'Haryana Employment',d:'Employment और job-seeker services.',u:'https://hrex.gov.in/',o:1,k:'employment rojgar hrex job'},
{c:'documents',i:'🖼️',n:'Photo Resize',d:'Online image resize tool.',u:'image-resizer.html',k:'photo image resize compress'},
{c:'documents',i:'📄',n:'Image to PDF',d:'Multiple images को PDF में convert करें.',u:'image-to-pdf.html',k:'image jpg png pdf converter',b:'Popular'},
{c:'documents',i:'🧮',n:'Age Calculator',d:'Age calculation utility.',u:'age-calculator.html',k:'age date calculator'},
{c:'documents',i:'🗂️',n:'PDF Tools',d:'PDF और document utilities.',u:'image-to-pdf.html',k:'pdf document tools'},
{c:'jobs',i:'💼',n:'Haryana Govt Jobs',d:'Haryana government job updates और links.',u:'haryana-govt-jobs.html',k:'haryana government sarkari jobs recruitment',b:'Popular'},
{c:'jobs',i:'🎓',n:'Education Services',d:'Education-related government portals और resources.',u:'https://www.india.gov.in/',o:1,k:'education scholarship student india',b:'Official'}
];
const grid=document.getElementById('serviceGrid'),search=document.getElementById('search'),cat=document.getElementById('category'),empty=document.getElementById('empty'),count=document.getElementById('resultCount'),pills=[...document.querySelectorAll('.pill')];
document.getElementById('totalServices').textContent=services.length;
document.getElementById('totalCategories').textContent=new Set(services.map(s=>s.c)).size;
function render(){const q=search.value.trim().toLowerCase(),c=cat.value;const list=services.filter(s=>(c==='all'||s.c===c)&&(!q||(s.n+' '+s.d+' '+s.c+' '+(s.k||'')).toLowerCase().includes(q)));grid.innerHTML=list.map(s=>`<article class="card"><div class="card-top"><span class="icon">${s.i}</span>${s.b?`<span class="badge-tag ${s.b.toLowerCase()}">${s.b}</span>`:''}</div><span class="card-category">${categoryName(s.c)}</span><h3>${s.n}</h3><p>${s.d}</p><a href="${s.u}" ${s.o?'target="_blank" rel="noopener noreferrer"':''}>${s.o?'Official Portal →':'View Service →'}</a></article>`).join('');empty.style.display=list.length?'none':'block';count.textContent=`${list.length} service${list.length===1?'':'s'} available`;pills.forEach(p=>p.classList.toggle('active',p.dataset.category===c));}
function categoryName(c){return {identity:'Identity',vehicle:'Vehicle',business:'Business',citizen:'Citizen',documents:'Tools',jobs:'Jobs'}[c]||'Service'}
search.addEventListener('input',render);cat.addEventListener('change',render);pills.forEach(p=>p.addEventListener('click',()=>{cat.value=p.dataset.category;render();document.getElementById('services').scrollIntoView({behavior:'smooth',block:'start'})}));document.getElementById('clear').onclick=()=>{search.value='';render();search.focus()};document.getElementById('resetFilters').onclick=()=>{search.value='';cat.value='all';render()};document.getElementById('menuBtn').onclick=()=>{const n=document.getElementById('nav'),b=document.getElementById('menuBtn');n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))};render();
(function(){
const extra={
Haryana:[['🎓 Admissions','College/University Admissions','https://admissions.highereduhry.ac.in/'],['💼 Govt Jobs','Haryana HSSC Recruitment','https://www.hssc.gov.in/'],['🧑‍🏫 Teacher Jobs','Haryana Teacher Recruitment','https://www.hssc.gov.in/']],
Rajasthan:[['🎓 Admissions','Rajasthan Higher Education','https://hte.rajasthan.gov.in/'],['💼 Govt Jobs','RPSC Recruitment','https://rpsc.rajasthan.gov.in/'],['🧑‍🏫 Teacher Jobs','Rajasthan Staff Selection Board','https://rssb.rajasthan.gov.in/']],
Punjab:[['🎓 Admissions','Punjab Higher Education','https://punjab.gov.in/'],['💼 Govt Jobs','Punjab Public Service Commission','https://ppsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Punjab Education Recruitment','https://educationrecruitmentboard.com/']],
Delhi:[['🎓 Admissions','Delhi University Admissions','https://admission.uod.ac.in/'],['💼 Govt Jobs','Delhi Subordinate Services Selection Board','https://dsssb.delhi.gov.in/'],['🧑‍🏫 Teacher Jobs','DSSSB Recruitment','https://dsssb.delhi.gov.in/']],
Uttar_Pradesh:[['🎓 Admissions','UP Higher Education','https://up.gov.in/'],['💼 Govt Jobs','UPPSC Recruitment','https://uppsc.up.nic.in/'],['🧑‍🏫 Teacher Jobs','UP Basic Education Board','https://basiceducation.up.gov.in/']],
Bihar:[['🎓 Admissions','Bihar University Admissions','https://bihar.gov.in/'],['💼 Govt Jobs','BPSC Recruitment','https://bpsc.bih.nic.in/'],['🧑‍🏫 Teacher Jobs','Bihar Teacher Recruitment','https://www.bpsc.bih.nic.in/']],
Maharashtra:[['🎓 Admissions','Maharashtra Higher Education','https://www.mahacet.org/'],['💼 Govt Jobs','MPSC Recruitment','https://mpsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Maharashtra Teacher Recruitment','https://mahateacherrecruitment.org.in/']],
Gujarat:[['🎓 Admissions','Gujarat ACPC Admissions','https://gujacpc.admissions.nic.in/'],['💼 Govt Jobs','GPSC Recruitment','https://gpsc.gujarat.gov.in/'],['🧑‍🏫 Teacher Jobs','Gujarat Teacher Recruitment','https://ojas.gujarat.gov.in/']],
Karnataka:[['🎓 Admissions','Karnataka Admissions','https://kea.kar.nic.in/'],['💼 Govt Jobs','KPSC Recruitment','https://kpsc.kar.nic.in/'],['🧑‍🏫 Teacher Jobs','Karnataka Recruitment','https://kpsc.kar.nic.in/']],
Madhya_Pradesh:[['🎓 Admissions','MP Higher Education Admissions','https://epravesh.mponline.gov.in/'],['💼 Govt Jobs','MPPSC Recruitment','https://mppsc.mp.gov.in/'],['🧑‍🏫 Teacher Jobs','MPESB Recruitment','https://esb.mp.gov.in/']],
West_Bengal:[['🎓 Admissions','West Bengal Centralised Admission','https://wbcap.in/'],['💼 Govt Jobs','WBPSC Recruitment','https://psc.wb.gov.in/'],['🧑‍🏫 Teacher Jobs','West Bengal School Service Commission','https://www.westbengalssc.com/']],
Odisha:[['🎓 Admissions','Odisha SAMS Admissions','https://samsodisha.gov.in/'],['💼 Govt Jobs','OPSC Recruitment','https://www.opsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Odisha Staff Selection Commission','https://www.ossc.gov.in/']],
Tamil_Nadu:[['🎓 Admissions','Tamil Nadu Admissions','https://www.tneaonline.org/'],['💼 Govt Jobs','TNPSC Recruitment','https://www.tnpsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Tamil Nadu TRB','https://www.trb.tn.gov.in/']],
Telangana:[['🎓 Admissions','Telangana DOST Admissions','https://dost.cgg.gov.in/'],['💼 Govt Jobs','TSPSC Recruitment','https://www.tspsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Telangana Teacher Recruitment','https://schooledu.telangana.gov.in/']],
Andhra_Pradesh:[['🎓 Admissions','AP Higher Education Admissions','https://cets.apsche.ap.gov.in/'],['💼 Govt Jobs','APPSC Recruitment','https://psc.ap.gov.in/'],['🧑‍🏫 Teacher Jobs','AP Teacher Recruitment','https://schooledu.ap.gov.in/']],
Kerala:[['🎓 Admissions','Kerala Admissions','https://admissions.keralauniversity.ac.in/'],['💼 Govt Jobs','Kerala PSC Recruitment','https://www.keralapsc.gov.in/'],['🧑‍🏫 Teacher Jobs','Kerala Teacher Recruitment','https://education.kerala.gov.in/']],
Jharkhand:[['🎓 Admissions','Jharkhand Higher Education','https://jharkhand.gov.in/'],['💼 Govt Jobs','JSSC Recruitment','https://jssc.nic.in/'],['🧑‍🏫 Teacher Jobs','Jharkhand Education','https://schooleducation.jharkhand.gov.in/']],
Chhattisgarh:[['🎓 Admissions','Chhattisgarh Admissions','https://cgdte.admissions.nic.in/'],['💼 Govt Jobs','CGPSC Recruitment','https://psc.cg.gov.in/'],['🧑‍🏫 Teacher Jobs','CG Vyapam Recruitment','https://vyapam.cgstate.gov.in/']],
Uttarakhand:[['🎓 Admissions','Uttarakhand Admissions','https://ukadmission.samarth.ac.in/'],['💼 Govt Jobs','UKPSC Recruitment','https://psc.uk.gov.in/'],['🧑‍🏫 Teacher Jobs','Uttarakhand Education','https://schooleducation.uk.gov.in/']],
Himachal_Pradesh:[['🎓 Admissions','Himachal Pradesh Admissions','https://admissions.hpushimla.in/'],['💼 Govt Jobs','HPPSC Recruitment','https://hppsc.hp.gov.in/'],['🧑‍🏫 Teacher Jobs','HP Education Recruitment','https://education.hp.gov.in/']],
Assam:[['🎓 Admissions','Assam Higher Education','https://dhe.assam.gov.in/'],['💼 Govt Jobs','Assam Public Service Commission','https://apsc.nic.in/'],['🧑‍🏫 Teacher Jobs','Assam Education Recruitment','https://education.assam.gov.in/']],
Goa:[['🎓 Admissions','Goa Admissions','https://dhe.goa.gov.in/'],['💼 Govt Jobs','Goa Public Service Commission','https://gpsc.goa.gov.in/'],['🧑‍🏫 Teacher Jobs','Goa Education','https://education.goa.gov.in/']],
Jammu_Kashmir:[['🎓 Admissions','J&K Admissions','https://jkadworld.com/'],['💼 Govt Jobs','JKPSC Recruitment','https://jkpsc.nic.in/'],['🧑‍🏫 Teacher Jobs','J&K Education','https://schooleducation.jk.gov.in/']]
};
const key=new URLSearchParams(location.search).get('state')||'Haryana';
const box=document.getElementById('services');
if(!box||!extra[key])return;
extra[key].forEach(x=>{const d=document.createElement('div');d.className='service-card extra-service-card';d.innerHTML='<h3>'+x[0]+'</h3><div>'+x[1]+'</div><a href="'+x[2]+'" target="_blank" rel="noopener noreferrer">Open Official Portal →</a>';box.appendChild(d);});
})();
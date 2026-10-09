/* AJ DIGITAL POINT — verified data corrections for the job-details dataset.
   Sources checked 09/10/2026:
   TRAI official vacancy listing: https://www.trai.gov.in/vacancies
   Haryana CS Office Guwahati notice: https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf
   Haryana CS Office Kolkata notice: https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf
*/
(function(){
  const data=window.AJ_JOB_DATA;
  if(!Array.isArray(data)) return;
  const d=data.find(x=>x && x.id==="haryana-cs-joint-advisor-trai-2026");
  if(!d) return;
  Object.assign(d,{
    category:"Central Job",
    state:"Assam / West Bengal",
    organization:"Telecom Regulatory Authority of India (TRAI)",
    department:"TRAI Camp Office Guwahati (under TRAI RO Kolkata) and TRAI Regional Office Kolkata",
    authority:"Telecom Regulatory Authority of India",
    title:"TRAI Joint Advisor Notices 2026 — Guwahati & Kolkata (2 Separate Deputation Notices)",
    post:"Joint Advisor — Guwahati and Kolkata (separate notices)",
    shortInfo:"यह एक संयुक्त सारांश है, एक single vacancy नहीं। TRAI ने Guwahati Camp Office के लिए 1 Joint Advisor post और Kolkata Regional Office के लिए 1 Joint Advisor post अलग-अलग notices में प्रकाशित की है। दोनों deputation (foreign service terms) के लिए हैं; दोनों की dates अलग हैं।",
    openDate:"Guwahati: 28/09/2026; Kolkata: 14/05/2026. Haryana Chief Secretary Office ने दोनों notices 07/10/2026 को repost किए।",
    lastDate:"Guwahati: 06/11/2026; Kolkata: 16/10/2026 (TRAI official listing के अनुसार)",
    feeDate:"दोनों deputation notices में अलग fee-payment date प्रकाशित नहीं है; application fee निर्दिष्ट नहीं है।",
    correctionDate:"दोनों notices के लिए कोई correction window official listing में दर्ज नहीं है।",
    examDate:"कोई written exam date प्रकाशित नहीं; selection deputation process के अनुसार।",
    mode:"Online application plus prescribed forwarding / hard-copy process, as stated in each notice",
    vacancy:"2 separate notices; 1 Joint Advisor post at Guwahati + 1 Joint Advisor post at Kolkata (2 posts total, separately notified)",
    categoryVacancy:"Guwahati: 1 Joint Advisor post. Kolkata: 1 Joint Advisor post. Category-wise reservation breakup इन deputation notices में प्रकाशित नहीं है।",
    qualification:"संबंधित क्षेत्र में अनुभव के साथ इनमें से एक qualification route: AICTE-recognised institution से Electronics / Telecommunications / Electrical / Electrical & Electronics Engineering / Information Technology / Computer Science Engineering में Bachelor's degree; या UGC-recognised institution से MBA / Economics / Commerce / Engineering / Law / Science / Humanities में Bachelor's या Master's degree; या ICAI / ICMAI membership. अंतिम पात्रता संबंधित location की official PDF से मिलाएँ।",
    eligibility:"यह सामान्य public direct recruitment नहीं है। पात्र serving officers Central/State Government, UT Administration, autonomous body, statutory organisation, PSU, recognised university या recognised research institution से होने चाहिए और संबंधित notice में दिए service conditions में से एक पूरा करना चाहिए: parent cadre/department में analogous post पर regular service; या Level-12 (₹78,800–₹2,09,200) में regular appointment के बाद 4 वर्ष सेवा; या Group A/equivalent में कम-से-कम 12 वर्ष regular service, जिसमें Level-11/equivalent पर कम-से-कम 6 वर्ष regular service शामिल हो। प्रत्येक notice की PDF में exact wording और conditions verify करें।",
    age:"अधिकतम 56 वर्ष, संबंधित post के लिए TRAI में आवेदन प्राप्त होने की अंतिम तिथि पर।",
    ageAsOn:"Guwahati: 06/11/2026; Kolkata: 16/10/2026 (दोनों posts की अलग closing dates)",
    ageRelaxation:"अलग category-wise relaxation सूचीबद्ध नहीं; deputation notice में अधिकतम आयु 56 वर्ष दी गई है। संबंधित official PDF को अंतिम मानें।",
    fee:"दोनों official deputation notices में application fee निर्दिष्ट नहीं है।",
    paymentMode:"Application fee/payment method notice में निर्दिष्ट नहीं है। किसी third party को payment न करें; केवल official TRAI portal और notice के निर्देश मानें।",
    selection:"Relevant service eligibility, qualifications and experience के आधार पर deputation process. Written examination/test schedule इन listings में प्रकाशित नहीं है।",
    salary:"Pay Level-13: ₹1,23,100–₹2,15,900 (7th CPC Pay Matrix), plus applicable allowances as per rules.",
    apply:"https://vacancies.trai.gov.in/",
    notice:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf",
    official:"https://www.trai.gov.in/vacancies",
    documents:"Online application का printout; पिछले 5 वर्षों के attested ACR/APAR; vigilance/disciplinary clearance; cadre clearance; relevant educational qualification, service and experience records; और संबंधित notification में बताए अन्य deputation papers. Exact checklist location-specific PDF से verify करें।",
    updates:"TRAI official listing: Guwahati notice released 28/09/2026, last date 06/11/2026; Kolkata notice released 14/05/2026, latest listed last date 16/10/2026. Haryana Chief Secretary Office ने दोनों notices 07/10/2026 को publish/repost किए।",
    dataAuditDate:"09/10/2026",
    postQualifications:[
      {label:"Post / location 1",value:"Joint Advisor — TRAI Camp Office Guwahati (under TRAI RO Kolkata); 1 post; last date 06/11/2026."},
      {label:"Post / location 2",value:"Joint Advisor — TRAI Regional Office Kolkata; 1 post; latest listed last date 16/10/2026."},
      {label:"Eligible applicant",value:"Eligible serving government / PSU / other specified public-sector officers on deputation; this is not a general open direct-recruitment vacancy."},
      {label:"Education and service",value:"Specified engineering degree, eligible Bachelor's/Master's degree route, or ICAI/ICMAI membership, plus the relevant experience/service conditions. Check the location-specific official PDF."}
    ],
    postVacancies:[
      {post:"Joint Advisor — TRAI Camp Office Guwahati",vacancy:"1 post; last date 06/11/2026"},
      {post:"Joint Advisor — TRAI Regional Office Kolkata",vacancy:"1 post; latest listed last date 16/10/2026"}
    ],
    physicalEligibility:[
      {label:"PST / PET",details:"TRAI vacancy listings and the notices are deputation notices; no PST/PET standards are listed in the vacancy summary. Check the full location-specific notice for any additional condition."}
    ],
    relatedLinks:[
      {title:"Apply / TRAI Vacancy Portal",date:"Official application portal",url:"https://vacancies.trai.gov.in/"},
      {title:"Guwahati Joint Advisor Notice — Haryana CS Office PDF",date:"Published 07/10/2026; TRAI release 28/09/2026; last date 06/11/2026",url:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf"},
      {title:"Kolkata Joint Advisor Notice — Haryana CS Office PDF",date:"Published 07/10/2026; TRAI release 14/05/2026; latest listed last date 16/10/2026",url:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf"},
      {title:"TRAI Official Vacancies Listing",date:"Verified 09/10/2026",url:"https://www.trai.gov.in/vacancies"}
    ],
    links:{
      apply:"https://vacancies.trai.gov.in/",
      notification:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf",
      official:"https://www.trai.gov.in/vacancies"
    },
    verificationStatus:"Verified against TRAI's official vacancy listing and both Haryana Chief Secretary Office PDF notices. This record summarizes two separate posts; each location has its own deadline and notification.",
    verificationSource:"TRAI vacancies: https://www.trai.gov.in/vacancies | Guwahati PDF: https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf | Kolkata PDF: https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf"
  });
})();

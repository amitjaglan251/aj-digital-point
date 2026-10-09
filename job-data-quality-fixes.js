/* AJ DIGITAL POINT — verified job-data corrections.
 * Checked 09/10/2026 against TRAI's official vacancy listing and Haryana CS Office notices.
 * Never merge distinct notifications when their locations/deadlines differ.
 */
(function(){
  const data = window.AJ_JOB_DATA;
  if (!Array.isArray(data)) return;

  const idx = data.findIndex(x => x && x.id === "haryana-cs-joint-advisor-trai-2026");
  if (idx < 0) return;
  const base = data[idx];

  const common = {
    category: "Central Job",
    organization: "Telecom Regulatory Authority of India (TRAI)",
    department: "Telecom Regulatory Authority of India",
    authority: "Telecom Regulatory Authority of India",
    post: "Joint Advisor",
    mode: "Deputation on foreign service terms; follow the location-specific official notice for submission procedure.",
    feeDate: "अलग fee-payment date प्रकाशित नहीं है।",
    correctionDate: "Official listing में correction window प्रकाशित नहीं है।",
    examDate: "Written exam date प्रकाशित नहीं है; deputation selection notice के अनुसार होगा।",
    fee: "TRAI की official vacancy listing में application fee का उल्लेख नहीं है; PDF notice के निर्देश अंतिम मानें।",
    paymentMode: "Fee/payment method को notice में verify करें। किसी अनधिकृत व्यक्ति या third-party को भुगतान न करें।",
    age: "अधिकतम आयु 56 वर्ष (TRAI official listing/notice के अनुसार; संबंधित अंतिम तारीख पर लागू शर्तें देखें)।",
    ageRelaxation: "अलग category-wise relaxation की पुष्टि उपलब्ध summary से नहीं होती; official notice देखें।",
    eligibility: "यह deputation vacancy है, सामान्य open direct recruitment नहीं। केवल notice में निर्धारित service/cadre eligibility पूरी करने वाले serving officers आवेदन करें।",
    selection: "Deputation प्रक्रिया; exact scrutiny, forwarding और selection conditions के लिए location-specific official PDF देखें।",
    salary: "Pay Level-13: ₹1,23,100–₹2,15,900 (official vacancy information के अनुसार); allowances/conditions notice और applicable rules के अनुसार।",
    official: "https://www.trai.gov.in/vacancies",
    apply: "https://vacancies.trai.gov.in/",
    dataAuditDate: "09/10/2026",
    updates: "TRAI official vacancy listing को 09/10/2026 को cross-check किया गया। Haryana Chief Secretary Office ने notice 07/10/2026 को repost किया।",
    physicalEligibility: [
      {label:"PST / PET",details:"यह deputation notice है। TRAI vacancy summary में PST/PET standards सूचीबद्ध नहीं हैं; कोई physical standard लागू है या नहीं, full official PDF देखें।"}
    ]
  };

  const guwahati = Object.assign({}, base, common, {
    id: "trai-joint-advisor-guwahati-2026",
    category: "Central Job",
    state: "Assam — Guwahati",
    organization: "Telecom Regulatory Authority of India (TRAI)",
    department: "TRAI Camp Office Guwahati (under TRAI Regional Office Kolkata)",
    title: "TRAI Joint Advisor Recruitment 2026 — Guwahati",
    post: "Joint Advisor — TRAI Camp Office Guwahati",
    shortInfo: "TRAI Camp Office Guwahati (under TRAI Regional Office Kolkata) में Joint Advisor के 1 पद के लिए deputation notice। यह सामान्य direct recruitment नहीं है; eligibility और application forwarding के लिए official notice पढ़ें।",
    openDate: "28/09/2026",
    lastDate: "06/11/2026",
    vacancy: "1 post",
    categoryVacancy: "Joint Advisor — Guwahati: 1 post. Category-wise breakup official summary में सूचीबद्ध नहीं है।",
    qualification: "Education, experience और service eligibility की सटीक शर्तें Guwahati-specific official PDF में verify करें।",
    eligibilityExtra: "केवल notice में निर्धारित eligible serving government/PSU/other public-sector officers; deputation/cadre conditions लागू।",
    ageAsOn: "06/11/2026 — application receipt की अंतिम तारीख के संबंध में official notice देखें।",
    documents: "Official notice में मांगे गए application, service/cadre, vigilance/disciplinary clearance, APAR/ACR, qualification और experience documents; exact checklist PDF से लें।",
    notice: "https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf",
    links: {apply:"https://vacancies.trai.gov.in/", notification:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf", official:"https://www.trai.gov.in/vacancies"},
    relatedLinks: [
      {title:"Guwahati Joint Advisor — Official Notice (Haryana CS Office PDF)",date:"TRAI release 28/09/2026; listed last date 06/11/2026",url:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf"},
      {title:"TRAI Official Vacancies",date:"Official listing",url:"https://www.trai.gov.in/vacancies"},
      {title:"TRAI Vacancy / Apply Portal",date:"Official portal",url:"https://vacancies.trai.gov.in/"}
    ],
    verificationStatus: "TRAI official listing से post count, release date और closing date cross-check किए गए। Qualification/service conditions के लिए linked Guwahati-specific PDF को अंतिम मानें।",
    verificationSource: "https://www.trai.gov.in/vacancies | https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Guwahati.pdf"
  });

  const kolkata = Object.assign({}, base, common, {
    id: "trai-joint-advisor-kolkata-2026",
    category: "Central Job",
    state: "West Bengal — Kolkata",
    organization: "Telecom Regulatory Authority of India (TRAI)",
    department: "TRAI Regional Office Kolkata",
    title: "TRAI Joint Advisor Recruitment 2026 — Kolkata",
    post: "Joint Advisor — TRAI Regional Office Kolkata",
    shortInfo: "TRAI Regional Office Kolkata में Joint Advisor के 1 पद के लिए अलग deputation notice। यह Guwahati notice से अलग vacancy है। Eligibility, extension notices और application forwarding के लिए official PDF/listing देखें।",
    openDate: "14/05/2026",
    lastDate: "16/10/2026 (TRAI official vacancy listing पर प्रदर्शित)",
    vacancy: "1 post",
    categoryVacancy: "Joint Advisor — Kolkata: 1 post. Category-wise breakup official summary में सूचीबद्ध नहीं है।",
    qualification: "Education, experience और service eligibility की सटीक शर्तें Kolkata-specific official PDF तथा जारी extension letters में verify करें।",
    eligibilityExtra: "केवल notice में निर्धारित eligible serving government/PSU/other public-sector officers; deputation/cadre conditions लागू।",
    ageAsOn: "16/10/2026 — application receipt की अंतिम तारीख के संबंध में official notice और extensions देखें।",
    documents: "Official notice में मांगे गए application, service/cadre, vigilance/disciplinary clearance, APAR/ACR, qualification और experience documents; exact checklist PDF से लें।",
    notice: "https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf",
    links: {apply:"https://vacancies.trai.gov.in/", notification:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf", official:"https://www.trai.gov.in/vacancies"},
    relatedLinks: [
      {title:"Kolkata Joint Advisor — Official Notice (Haryana CS Office PDF)",date:"TRAI release 14/05/2026; listing shows last date 16/10/2026",url:"https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf"},
      {title:"TRAI Official Vacancies and extension letters",date:"Official listing",url:"https://www.trai.gov.in/vacancies"},
      {title:"TRAI Vacancy / Apply Portal",date:"Official portal",url:"https://vacancies.trai.gov.in/"}
    ],
    verificationStatus: "TRAI official listing से post count, release date और currently displayed closing date cross-check किए गए। Kolkata notice के extension letters भी official listing में हैं; linked notice/listing को अंतिम मानें।",
    verificationSource: "https://www.trai.gov.in/vacancies | https://csharyana.gov.in/wp-content/uploads/2026/10/Joint-Advisor-Kolkata.pdf"
  });

  // Replace the old combined summary with two independent, searchable job records.
  data[idx] = guwahati;
  if (!data.some(x => x && x.id === kolkata.id)) data.push(kolkata);
  window.AJ_JOB_DATA = data;
})();
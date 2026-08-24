import { collection, query, where, getDocs, limit } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { db, auth } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("statusForm");
  const input = document.getElementById("requestId");
  const result = document.getElementById("statusResult");
  form?.addEventListener("submit", async e => {
    e.preventDefault();
    const id = input.value.trim().toUpperCase();
    if (!/^AJAD-\d{6}-\d{4}$/.test(id)) { result.innerHTML = "<p>कृपया सही Request ID दर्ज करें। उदाहरण: AJAD-260824-1234</p>"; return; }
    result.innerHTML = "<p>Request status check हो रहा है...</p>";
    try {
      if (!auth.currentUser) await signInAnonymously(auth);
      const q = query(collection(db,"aadhaarRequests"), where("requestId","==",id), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) { result.innerHTML = "<p>यह Request ID नहीं मिली। कृपया दोबारा check करें।</p>"; return; }
      const d = snap.docs[0].data();
      const status = String(d.status || "Pending");
      result.innerHTML = `<div class="status-card"><h3>Request Found</h3><p><strong>Request ID:</strong> ${esc(d.requestId)}</p><p><strong>Status:</strong> <strong>${esc(status)}</strong></p></div>`;
    } catch (err) { console.error(err); result.innerHTML = "<p>Status check नहीं हो पाया। कृपया बाद में प्रयास करें।</p>"; }
  });
});
function esc(v){return String(v).replace(/[&<>\"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}

/* =====================================================
   AJ DIGITAL POINT
   Main JavaScript
===================================================== */

function searchPortal() {
    const input = document.getElementById("portalSearch");
    if (!input) return;
    const searchText = input.value.trim().toLowerCase();
    if (searchText === "") { showMessage("कृपया Job, Form या Service का नाम लिखें।"); return; }
    const allItems = document.querySelectorAll(".service-box, .update-item, .info-card");
    let found = false;
    allItems.forEach(function(item) {
        const text = item.innerText.toLowerCase();
        if (text.includes(searchText)) { item.style.outline = "3px solid red"; item.scrollIntoView({behavior:"smooth",block:"center"}); found = true; }
        else item.style.outline = "";
    });
    if (!found) showMessage("इस नाम की Service अभी नहीं मिली।");
}

document.addEventListener("DOMContentLoaded", function() {
    const search = document.getElementById("portalSearch");
    if (search) search.addEventListener("keydown", function(event) { if (event.key === "Enter") searchPortal(); });

    document.querySelectorAll('a[href*="sarkarinetwork.com/"]').forEach(function(link) {
        const originalUrl = link.href;
        const title = link.textContent.trim();
        const localUrl = "yojana.html?title=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(originalUrl);
        link.setAttribute("href", localUrl); link.removeAttribute("target"); link.removeAttribute("rel");
    });

    /* Name-only state folders. Clicking anywhere on a folder opens that state's services. */
    const stateNames = {
        "Haryana":"Haryana", "Rajasthan":"Rajasthan", "Punjab":"Punjab", "Delhi":"Delhi",
        "Uttar Pradesh":"Uttar_Pradesh", "Bihar":"Bihar", "Maharashtra":"Maharashtra", "Gujarat":"Gujarat",
        "Karnataka":"Karnataka", "Madhya Pradesh":"Madhya_Pradesh", "West Bengal":"West_Bengal",
        "Tamil Nadu":"Tamil_Nadu", "Andhra Pradesh":"Andhra_Pradesh", "Telangana":"Telangana",
        "Kerala":"Kerala", "Jharkhand":"Jharkhand", "Chhattisgarh":"Chhattisgarh", "Uttarakhand":"Uttarakhand",
        "Himachal Pradesh":"Himachal_Pradesh", "Assam":"Assam", "Goa":"Goa"
    };
    document.querySelectorAll(".statewise-card").forEach(function(card) {
        const heading = card.querySelector("h3");
        if (!heading) return;
        const state = heading.textContent.trim();
        const key = stateNames[state];
        if (!key) return;
        card.classList.add("state-folder-clickable");
        card.setAttribute("role", "link");
        card.setAttribute("tabindex", "0");
        card.setAttribute("title", state + " की सभी services देखें");
        function openState() { window.location.href = "state-services.html?state=" + encodeURIComponent(key); }
        card.addEventListener("click", function() { openState(); });
        card.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openState(); }
        });
    });
});

function showMessage(message) {
    const box = document.getElementById("messageBox");
    const text = document.getElementById("messageText");
    if (!box || !text) return;
    text.textContent = message; box.style.display = "block";
    setTimeout(function() { box.style.display = "none"; }, 3500);
}
function closeMessage() { const box = document.getElementById("messageBox"); if (box) box.style.display = "none"; }
function showAllUpdates(type) {
    if (type === "latest") { showMessage("Latest Updates के और options जल्द जोड़े जाएंगे।"); return; }
    if (type === "upcoming") { showMessage("Upcoming Services जल्द update की जाएंगी।"); return; }
}

const searchInput = document.getElementById("portalSearch");
if (searchInput) searchInput.addEventListener("input", function() {
    if (searchInput.value.trim() === "") document.querySelectorAll(".service-box, .update-item, .info-card").forEach(function(item) { item.style.outline = ""; });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href="image-resizer.html"]').forEach(function(link) {
        link.addEventListener("click", function(event) { event.preventDefault(); window.location.href = "/aj-digital-point/image-resizer.html"; });
    });
    document.querySelectorAll('a[href="#"]').forEach(function(link) {
        const text = link.textContent.trim().toLowerCase(); let target = null;
        if (text.includes("image to pdf")) target = "image-to-pdf.html";
        else if (text.includes("pdf to image")) target = "pdf-to-image.html";
        else if (text.includes("file size compressor")) target = "file-size-compressor.html";
        if (target) link.setAttribute("href", target);
    });
});

"use strict";

import {
    collection,
    query,
    where,
    getDocs,
    limit
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    db
} from "./firebase-config.js";


/* =========================================================
   AJ DIGITAL POINT
   CUSTOMER STATUS CHECK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("statusForm");

    if (!form) {
        console.warn("statusForm नहीं मिला।");
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        await checkRequestStatus();

    });

});


/* =========================================================
   CHECK STATUS
   ========================================================= */

async function checkRequestStatus() {

    const input =
        document.getElementById("requestId");

    const resultBox =
        document.getElementById("statusResult");

    if (!input || !resultBox) {
        return;
    }


    const requestId =
        input.value
            .trim()
            .toUpperCase();


    /* -----------------------------------------------------
       VALIDATION
       ----------------------------------------------------- */

    if (requestId === "") {

        showMessage(
            resultBox,
            "कृपया Request ID दर्ज करें।",
            "error"
        );

        return;
    }


    if (!/^AJAD-\d{6}-\d{4}$/.test(requestId)) {

        showMessage(
            resultBox,
            "कृपया सही Request ID डालें। उदाहरण: AJAD-260815-1234",
            "error"
        );

        return;
    }


    /* -----------------------------------------------------
       LOADING
       ----------------------------------------------------- */

    resultBox.innerHTML = `
        <div class="status-loading">
            <div class="status-spinner"></div>
            <p>Request status check हो रहा है...</p>
        </div>
    `;


    try {

        /* -------------------------------------------------
           FIRESTORE SEARCH
           ------------------------------------------------- */

        const requestsRef =
            collection(
                db,
                "aadhaarRequests"
            );


        const q =
            query(
                requestsRef,
                where(
                    "requestId",
                    "==",
                    requestId
                ),
                limit(1)
            );


        const snapshot =
            await getDocs(q);


        /* -------------------------------------------------
           REQUEST NOT FOUND
           ------------------------------------------------- */

        if (snapshot.empty) {

            showMessage(
                resultBox,
                "यह Request ID नहीं मिली। कृपया Request ID दोबारा check करें।",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           REQUEST FOUND
           ------------------------------------------------- */

        let request = null;


        snapshot.forEach((doc) => {

            request = {
                id: doc.id,
                ...doc.data()
            };

        });


        renderStatus(
            resultBox,
            request
        );


    } catch (error) {

        console.error(
            "Status check error:",
            error
        );


        showMessage(
            resultBox,
            "Status check नहीं हो पाया। कृपया Internet connection और Firebase settings check करें।",
            "error"
        );

    }

}


/* =========================================================
   RENDER STATUS
   ========================================================= */

function renderStatus(
    resultBox,
    request
) {

    const status =
        normalizeStatus(
            request.status
        );


    const statusClass =
        getStatusClass(
            status
        );


    const statusText =
        getStatusText(
            status
        );


    const customerName =
        request.customerName ||
        request.name ||
        "Not Available";


    const updates =
        request.updates ||
        "Not Available";


    const mobile =
        request.mobile ||
        "Not Available";


    const date =
        formatRequestDate(
            request
        );


    resultBox.innerHTML = `

        <div class="status-card">

            <div class="status-card-header">

                <div>

                    <span class="status-label">
                        Request ID
                    </span>

                    <h3>
                        ${escapeHTML(
                            request.requestId || "-"
                        )}
                    </h3>

                </div>

                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>

            </div>


            <div class="status-progress">

                <div class="progress-step ${
                    isStepActive(status, "Pending")
                        ? "active"
                        : ""
                }">

                    <span>1</span>

                    <small>
                        Pending
                    </small>

                </div>


                <div class="progress-line ${
                    isProgressPassed(status, 2)
                        ? "active"
                        : ""
                }"></div>


                <div class="progress-step ${
                    isStepActive(status, "Processing")
                        ? "active"
                        : ""
                }">

                    <span>2</span>

                    <small>
                        Processing
                    </small>

                </div>


                <div class="progress-line ${
                    isProgressPassed(status, 3)
                        ? "active"
                        : ""
                }"></div>


                <div class="progress-step ${
                    isStepActive(status, "Approved")
                        ? "active"
                        : ""
                }">

                    <span>3</span>

                    <small>
                        Approved
                    </small>

                </div>

            </div>


            <div class="status-info-grid">


                <div class="status-info">

                    <span>
                        Customer
                    </span>

                    <strong>
                        ${escapeHTML(
                            customerName
                        )}
                    </strong>

                </div>


                <div class="status-info">

                    <span>
                        Mobile
                    </span>

                    <strong>
                        ${escapeHTML(
                            mobile
                        )}
                    </strong>

                </div>


                <div class="status-info">

                    <span>
                        Update Required
                    </span>

                    <strong>
                        ${escapeHTML(
                            updates
                        )}
                    </strong>

                </div>


                <div class="status-info">

                    <span>
                        Request Date
                    </span>

                    <strong>
                        ${escapeHTML(
                            date
                        )}
                    </strong>

                </div>


            </div>


            <div class="status-message">

                ${getStatusMessage(status)}

            </div>


            ${
                status === "Rejected"
                    ? `
                        <div class="rejected-note">
                            ⚠️ आपकी request rejected है।
                            अधिक जानकारी के लिए
                            AJ DIGITAL POINT से संपर्क करें।
                        </div>
                    `
                    : ""
            }


            <button
                type="button"
                class="check-again-btn"
                id="checkAgainBtn">

                🔄 Check Again

            </button>


        </div>

    `;


    const checkAgainBtn =
        document.getElementById(
            "checkAgainBtn"
        );


    if (checkAgainBtn) {

        checkAgainBtn.addEventListener(
            "click",
            () => {

                resultBox.innerHTML = "";

                const input =
                    document.getElementById(
                        "requestId"
                    );

                if (input) {
                    input.focus();
                }

            }
        );

    }

}


/* =========================================================
   STATUS NORMALIZE
   ========================================================= */

function normalizeStatus(status) {

    if (!status) {
        return "Pending";
    }

    const value =
        String(status)
            .trim()
            .toLowerCase();


    if (value === "pending") {
        return "Pending";
    }

    if (value === "processing") {
        return "Processing";
    }

    if (
        value === "approved" ||
        value === "completed" ||
        value === "complete"
    ) {
        return "Approved";
    }

    if (value === "rejected") {
        return "Rejected";
    }


    return "Pending";

}


/* =========================================================
   STATUS CLASS
   ========================================================= */

function getStatusClass(status) {

    switch (status) {

        case "Processing":
            return "processing";

        case "Approved":
            return "approved";

        case "Rejected":
            return "rejected";

        default:
            return "pending";

    }

}


/* =========================================================
   STATUS TEXT
   ========================================================= */

function getStatusText(status) {

    switch (status) {

        case "Processing":
            return "🔵 Processing";

        case "Approved":
            return "🟢 Approved";

        case "Rejected":
            return "🔴 Rejected";

        default:
            return "🟡 Pending";

    }

}


/* =========================================================
   STATUS MESSAGE
   ========================================================= */

function getStatusMessage(status) {

    switch (status) {

        case "Processing":

            return `
                🔄 आपकी request अभी processing में है।
                कृपया थोड़ा समय प्रतीक्षा करें।
            `;


        case "Approved":

            return `
                ✅ आपकी request approved हो गई है।
                आगे की प्रक्रिया के लिए AJ DIGITAL POINT
                से संपर्क करें।
            `;


        case "Rejected":

            return `
                ❌ आपकी request approve नहीं हुई।
                अधिक जानकारी के लिए AJ DIGITAL POINT
                से संपर्क करें।
            `;


        default:

            return `
                🕐 आपकी request प्राप्त हो गई है।
                अभी verification/process शुरू होना बाकी है।
            `;

    }

}


/* =========================================================
   PROGRESS
   ========================================================= */

function isStepActive(
    status,
    step
) {

    if (status === "Rejected") {
        return false;
    }

    if (status === step) {
        return true;
    }

    if (
        step === "Pending" &&
        (
            status === "Processing" ||
            status === "Approved"
        )
    ) {
        return true;
    }

    if (
        step === "Processing" &&
        status === "Approved"
    ) {
        return true;
    }

    return false;

}


function isProgressPassed(
    status,
    step
) {

    if (status === "Rejected") {
        return false;
    }

    if (
        step === 2 &&
        (
            status === "Processing" ||
            status === "Approved"
        )
    ) {
        return true;
    }

    if (
        step === 3 &&
        status === "Approved"
    ) {
        return true;
    }

    return false;

}


/* =========================================================
   DATE
   ========================================================= */

function formatRequestDate(request) {

    if (
        request.createdAt &&
        typeof request.createdAt.toDate === "function"
    ) {

        return request.createdAt
            .toDate()
            .toLocaleString("en-IN");

    }


    if (request.date) {

        return String(
            request.date
        );

    }


    return "Not Available";

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
    resultBox,
    message,
    type
) {

    resultBox.innerHTML = `

        <div class="status-message-box ${type}">

            ${escapeHTML(message)}

        </div>

    `;

}


/* =========================================================
   HTML SECURITY
   ========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
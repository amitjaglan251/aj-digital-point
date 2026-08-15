"use strict";

import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    db,
    auth
} from "./firebase-config.js";


/* =========================================================
   AJ DIGITAL POINT
   ADMIN PANEL
   ========================================================= */


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let allRequests = [];

let filteredRequests = [];

let selectedRequest = null;


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginSection =
    document.getElementById(
        "loginSection"
    );

const adminDashboard =
    document.getElementById(
        "adminDashboard"
    );

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );

const adminEmail =
    document.getElementById(
        "adminEmail"
    );

const adminPassword =
    document.getElementById(
        "adminPassword"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const loginError =
    document.getElementById(
        "loginError"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const refreshButton =
    document.getElementById(
        "refreshButton"
    );

const requestList =
    document.getElementById(
        "requestList"
    );

const requestCount =
    document.getElementById(
        "requestCount"
    );

const loading =
    document.getElementById(
        "loading"
    );

const emptyState =
    document.getElementById(
        "emptyState"
    );


/* =========================================================
   STATS
   ========================================================= */

const totalCount =
    document.getElementById(
        "totalCount"
    );

const pendingCount =
    document.getElementById(
        "pendingCount"
    );

const processingCount =
    document.getElementById(
        "processingCount"
    );

const approvedCount =
    document.getElementById(
        "approvedCount"
    );

const rejectedCount =
    document.getElementById(
        "rejectedCount"
    );


/* =========================================================
   MODAL
   ========================================================= */

const detailsModal =
    document.getElementById(
        "detailsModal"
    );

const detailsContent =
    document.getElementById(
        "detailsContent"
    );

const closeModalButton =
    document.getElementById(
        "closeModalButton"
    );

const modalStatus =
    document.getElementById(
        "modalStatus"
    );

const updateStatusButton =
    document.getElementById(
        "updateStatusButton"
    );

const printButton =
    document.getElementById(
        "printButton"
    );

const deleteButton =
    document.getElementById(
        "deleteButton"
    );

const modalMessage =
    document.getElementById(
        "modalMessage"
    );


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            await adminLogin();

        }
    );

}


/* =========================================================
   LOGIN FUNCTION
   ========================================================= */

async function adminLogin() {

    const email =
        adminEmail
            ? adminEmail.value.trim()
            : "";

    const password =
        adminPassword
            ? adminPassword.value
            : "";


    if (!email) {

        showLoginError(
            "कृपया Admin Email दर्ज करें।"
        );

        return;

    }


    if (!password) {

        showLoginError(
            "कृपया Password दर्ज करें।"
        );

        return;

    }


    setLoginLoading(true);


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        hideLoginError();


    } catch (error) {

        console.error(
            "Admin Login Error:",
            error
        );


        let message =
            "Login failed। Email और Password check करें।";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            message =
                "Email या Password गलत है।";

        }


        if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "Email format सही नहीं है।";

        }


        if (
            error.code ===
            "auth/user-not-found"
        ) {

            message =
                "यह Admin account मौजूद नहीं है।";

        }


        if (
            error.code ===
            "auth/wrong-password"
        ) {

            message =
                "Password गलत है।";

        }


        if (
            error.code ===
            "auth/too-many-requests"
        ) {

            message =
                "बहुत ज्यादा login attempts हुए हैं। थोड़ी देर बाद फिर कोशिश करें।";

        }


        showLoginError(
            message
        );

    } finally {

        setLoginLoading(false);

    }

}


/* =========================================================
   AUTH STATE
   ========================================================= */

onAuthStateChanged(
    auth,
    function (user) {

        if (user) {

            showAdminDashboard();

            loadRequests();

        } else {

            showLoginSection();

        }

    }
);


/* =========================================================
   SHOW ADMIN DASHBOARD
   ========================================================= */

function showAdminDashboard() {

    if (loginSection) {

        loginSection.classList.add(
            "hidden"
        );

    }


    if (adminDashboard) {

        adminDashboard.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLoginSection() {

    if (adminDashboard) {

        adminDashboard.classList.add(
            "hidden"
        );

    }


    if (loginSection) {

        loginSection.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            try {

                await signOut(
                    auth
                );

                allRequests = [];

                filteredRequests = [];

                selectedRequest = null;


                if (requestList) {

                    requestList.innerHTML =
                        "";

                }


            } catch (error) {

                console.error(
                    "Logout Error:",
                    error
                );

                alert(
                    "Logout नहीं हो पाया।"
                );

            }

        }
    );

}


/* =========================================================
   LOAD FIRESTORE REQUESTS
   ========================================================= */

async function loadRequests() {

    setLoading(
        true
    );


    try {

        const requestsRef =
            collection(
                db,
                "aadhaarRequests"
            );


        const q =
            query(
                requestsRef,
                orderBy(
                    "createdAt",
                    "desc"
                )
            );


        const snapshot =
            await getDocs(
                q
            );


        allRequests = [];


        snapshot.forEach(
            function (item) {

                allRequests.push({

                    id:
                        item.id,

                    ...item.data()

                });

            }
        );


        updateStats();

        applyFilters();


    } catch (error) {

        console.error(
            "Load Requests Error:",
            error
        );


        /*
         * यदि createdAt में किसी पुराने record की वजह से
         * orderBy error आता है तो simple collection read
         * से दोबारा कोशिश करेंगे।
         */

        try {

            const requestsRef =
                collection(
                    db,
                    "aadhaarRequests"
                );


            const snapshot =
                await getDocs(
                    requestsRef
                );


            allRequests = [];


            snapshot.forEach(
                function (item) {

                    allRequests.push({

                        id:
                            item.id,

                        ...item.data()

                    });

                }
            );


            allRequests.sort(
                function (a, b) {

                    return (
                        getTimestamp(
                            b.createdAt
                        ) -
                        getTimestamp(
                            a.createdAt
                        )
                    );

                }
            );


            updateStats();

            applyFilters();


        } catch (secondError) {

            console.error(
                "Second Load Error:",
                secondError
            );


            showEmptyMessage(
                "Requests load नहीं हो सकीं। Firebase Rules और Internet connection check करें।"
            );

        }

    } finally {

        setLoading(
            false
        );

    }

}


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            applyFilters();

        }
    );

}


/* =========================================================
   STATUS FILTER
   ========================================================= */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        function () {

            applyFilters();

        }
    );

}


/* =========================================================
   REFRESH
   ========================================================= */

if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        async function () {

            await loadRequests();

        }
    );

}


/* =========================================================
   APPLY FILTERS
   ========================================================= */

function applyFilters() {

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const status =
        statusFilter
            ? statusFilter.value
            : "all";


    filteredRequests =
        allRequests.filter(
            function (item) {


                /* -----------------------------
                   SEARCH
                   ----------------------------- */

                const searchableText = (

                    item.requestId ||
                    ""

                ) + " " + (

                    item.customerName ||
                    item.name ||
                    ""

                ) + " " + (

                    item.mobile ||
                    ""

                ) + " " + (

                    item.email ||
                    ""

                );


                const matchesSearch =
                    search === "" ||
                    searchableText
                        .toLowerCase()
                        .includes(
                            search
                        );


                /* -----------------------------
                   STATUS
                   ----------------------------- */

                const currentStatus =
                    normalizeStatus(
                        item.status
                    );


                const matchesStatus =
                    status === "all" ||
                    currentStatus === status;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    renderRequests();

}


/* =========================================================
   RENDER REQUEST LIST
   ========================================================= */

function renderRequests() {

    if (!requestList) {
        return;
    }


    requestList.innerHTML =
        "";


    if (requestCount) {

        requestCount.textContent =
            filteredRequests.length +
            (
                filteredRequests.length === 1
                    ? " request"
                    : " requests"
            );

    }


    if (
        filteredRequests.length === 0
    ) {

        if (emptyState) {

            emptyState.classList.remove(
                "hidden"
            );

        }

        return;

    }


    if (emptyState) {

        emptyState.classList.add(
            "hidden"
        );

    }


    filteredRequests.forEach(
        function (item) {

            const card =
                createRequestCard(
                    item
                );


            requestList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE REQUEST CARD
   ========================================================= */

function createRequestCard(
    item
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "request-card";


    const status =
        normalizeStatus(
            item.status
        );


    const statusClass =
        status.toLowerCase();


    card.innerHTML = `

        <div class="request-card-header">

            <div>

                <strong class="request-id">

                    ${escapeHTML(
                        item.requestId ||
                        "-"
                    )}

                </strong>

                <span class="request-date">

                    ${escapeHTML(
                        formatDate(
                            item.createdAt ||
                            item.date
                        )
                    )}

                </span>

            </div>


            <span
                class="status-badge ${statusClass}">

                ${escapeHTML(
                    status
                )}

            </span>

        </div>


        <div class="request-card-body">

            <div class="request-info">

                <span>
                    👤 Customer
                </span>

                <strong>
                    ${escapeHTML(
                        item.customerName ||
                        item.name ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="request-info">

                <span>
                    📱 Mobile
                </span>

                <strong>
                    ${escapeHTML(
                        item.mobile ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="request-info">

                <span>
                    🔄 Update
                </span>

                <strong>
                    ${escapeHTML(
                        item.updates ||
                        "-"
                    )}
                </strong>

            </div>

        </div>


        <div class="request-card-actions">

            <button
                type="button"
                class="view-btn"
                data-id="${escapeAttribute(
                    item.id
                )}">

                👁️ View Details

            </button>


            <button
                type="button"
                class="quick-status-btn"
                data-id="${escapeAttribute(
                    item.id
                )}">

                🔄 Change Status

            </button>

        </div>

    `;


    const viewButton =
        card.querySelector(
            ".view-btn"
        );


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            function () {

                openDetails(
                    item.id
                );

            }
        );

    }


    const quickStatusButton =
        card.querySelector(
            ".quick-status-btn"
        );


    if (quickStatusButton) {

        quickStatusButton.addEventListener(
            "click",
            function () {

                openDetails(
                    item.id
                );

            }
        );

    }


    return card;

}


/* =========================================================
   UPDATE STATS
   ========================================================= */

function updateStats() {

    let pending = 0;

    let processing = 0;

    let approved = 0;

    let rejected = 0;


    allRequests.forEach(
        function (item) {

            const status =
                normalizeStatus(
                    item.status
                );


            if (
                status === "Pending"
            ) {

                pending++;

            }


            if (
                status === "Processing"
            ) {

                processing++;

            }


            if (
                status === "Approved"
            ) {

                approved++;

            }


            if (
                status === "Rejected"
            ) {

                rejected++;

            }

        }
    );


    if (totalCount) {

        totalCount.textContent =
            allRequests.length;

    }


    if (pendingCount) {

        pendingCount.textContent =
            pending;

    }


    if (processingCount) {

        processingCount.textContent =
            processing;

    }


    if (approvedCount) {

        approvedCount.textContent =
            approved;

    }


    if (rejectedCount) {

        rejectedCount.textContent =
            rejected;

    }

}


/* =========================================================
   OPEN DETAILS
   ========================================================= */

function openDetails(
    documentId
) {

    const item =
        allRequests.find(
            function (request) {

                return (
                    request.id ===
                    documentId
                );

            }
        );


    if (!item) {

        alert(
            "Request नहीं मिली।"
        );

        return;

    }


    selectedRequest =
        item;


    if (modalStatus) {

        modalStatus.value =
            normalizeStatus(
                item.status
            );

    }


    if (detailsContent) {

        detailsContent.innerHTML = `

            <div class="detail-row">

                <span>
                    Request ID
                </span>

                <strong>
                    ${escapeHTML(
                        item.requestId ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Customer Name
                </span>

                <strong>
                    ${escapeHTML(
                        item.customerName ||
                        item.name ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Mobile
                </span>

                <strong>
                    ${escapeHTML(
                        item.mobile ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Aadhaar
                </span>

                <strong>
                    ${escapeHTML(
                        item.maskedAadhaar ||
                        item.aadhaar ||
                        "Not Provided"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Email
                </span>

                <strong>
                    ${escapeHTML(
                        item.email ||
                        "Not Provided"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Update Required
                </span>

                <strong>
                    ${escapeHTML(
                        item.updates ||
                        "-"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Additional Details
                </span>

                <strong>
                    ${escapeHTML(
                        item.details ||
                        "No details"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Photo
                </span>

                <strong>
                    ${escapeHTML(
                        item.photo ||
                        "No photo"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Document
                </span>

                <strong>
                    ${escapeHTML(
                        item.document ||
                        "No document"
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Current Status
                </span>

                <strong>
                    ${escapeHTML(
                        normalizeStatus(
                            item.status
                        )
                    )}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Request Date
                </span>

                <strong>
                    ${escapeHTML(
                        formatDate(
                            item.createdAt ||
                            item.date
                        )
                    )}
                </strong>

            </div>

        `;

    }


    hideModalMessage();


    if (detailsModal) {

        detailsModal.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

if (closeModalButton) {

    closeModalButton.addEventListener(
        "click",
        closeModal
    );

}


function closeModal() {

    if (detailsModal) {

        detailsModal.classList.add(
            "hidden"
        );

    }


    selectedRequest =
        null;

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

if (detailsModal) {

    detailsModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                detailsModal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   UPDATE STATUS
   ========================================================= */

if (updateStatusButton) {

    updateStatusButton.addEventListener(
        "click",
        async function () {

            await updateRequestStatus();

        }
    );

}


async function updateRequestStatus() {

    if (!selectedRequest) {

        alert(
            "पहले request select करें।"
        );

        return;

    }


    const newStatus =
        modalStatus
            ? modalStatus.value
            : "Pending";


    const oldStatus =
        normalizeStatus(
            selectedRequest.status
        );


    if (
        newStatus === oldStatus
    ) {

        showModalMessage(
            "Status पहले से " +
            newStatus +
            " है।"
        );

        return;

    }


    updateStatusButton.disabled =
        true;

    updateStatusButton.textContent =
        "Updating...";


    try {

        const requestRef =
            doc(
                db,
                "aadhaarRequests",
                selectedRequest.id
            );


        await updateDoc(
            requestRef,
            {

                status:
                    newStatus,

                updatedAt:
                    new Date()

            }
        );


        /* Update local data */

        selectedRequest.status =
            newStatus;

        selectedRequest.updatedAt =
            new Date();


        const index =
            allRequests.findIndex(
                function (item) {

                    return (
                        item.id ===
                        selectedRequest.id
                    );

                }
            );


        if (index !== -1) {

            allRequests[index] =
                selectedRequest;

        }


        updateStats();

        applyFilters();


        showModalMessage(
            "✅ Status successfully updated to " +
            newStatus
        );


        setTimeout(
            function () {

                closeModal();

            },
            1200
        );


    } catch (error) {

        console.error(
            "Update Status Error:",
            error
        );


        showModalMessage(
            "❌ Status update नहीं हो पाया। Firebase Rules check करें।"
        );

    } finally {

        updateStatusButton.disabled =
            false;

        updateStatusButton.textContent =
            "🔄 Update Status";

    }

}


/* =========================================================
   DELETE REQUEST
   ========================================================= */

if (deleteButton) {

    deleteButton.addEventListener(
        "click",
        async function () {

            await deleteRequest();

        }
    );

}


async function deleteRequest() {

    if (!selectedRequest) {

        alert(
            "पहले request select करें।"
        );

        return;

    }


    const requestId =
        selectedRequest.requestId ||
        selectedRequest.id;


    const confirmed =
        window.confirm(

            "क्या आप इस request को delete करना चाहते हैं?\n\n" +

            "Request ID: " +
            requestId +

            "\n\nयह action वापस नहीं किया जा सकता।"

        );


    if (!confirmed) {
        return;
    }


    deleteButton.disabled =
        true;

    deleteButton.textContent =
        "Deleting...";


    try {

        const requestRef =
            doc(
                db,
                "aadhaarRequests",
                selectedRequest.id
            );


        await deleteDoc(
            requestRef
        );


        allRequests =
            allRequests.filter(
                function (item) {

                    return (
                        item.id !==
                        selectedRequest.id
                    );

                }
            );


        updateStats();

        applyFilters();

        closeModal();


        alert(
            "Request successfully deleted."
        );


    } catch (error) {

        console.error(
            "Delete Error:",
            error
        );


        alert(
            "Request delete नहीं हो पाई। Firebase Rules check करें।"
        );

    } finally {

        deleteButton.disabled =
            false;

        deleteButton.textContent =
            "🗑️ Delete";

    }

}


/* =========================================================
   PRINT REQUEST
   ========================================================= */

if (printButton) {

    printButton.addEventListener(
        "click",
        function () {

            if (!selectedRequest) {

                return;

            }


            printRequest(
                selectedRequest
            );

        }
    );

}


function printRequest(
    item
) {

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=800,height=700"
        );


    if (!printWindow) {

        alert(
            "Popup blocked है। Browser में popup allow करें।"
        );

        return;

    }


    const html = `

<!DOCTYPE html>

<html lang="hi">

<head>

    <meta charset="UTF-8">

    <title>
        Request Receipt -
        ${escapeHTML(
            item.requestId ||
            "-"
        )}
    </title>


    <style>

        body {

            font-family:
                Arial,
                sans-serif;

            padding:
                30px;

            color:
                #111;

        }


        .header {

            text-align:
                center;

            border-bottom:
                2px solid #111;

            padding-bottom:
                15px;

            margin-bottom:
                20px;

        }


        .header h1 {

            margin:
                0;

        }


        .header p {

            margin:
                5px 0;

        }


        .row {

            display:
                flex;

            justify-content:
                space-between;

            gap:
                20px;

            padding:
                10px 0;

            border-bottom:
                1px solid #ddd;

        }


        .label {

            font-weight:
                bold;

        }


        .status {

            font-weight:
                bold;

        }


        .footer {

            margin-top:
                30px;

            text-align:
                center;

            font-size:
                12px;

        }


        @media print {

            body {

                padding:
                    10px;

            }

        }

    </style>

</head>


<body>


    <div class="header">

        <h1>
            AJ DIGITAL POINT
        </h1>

        <p>
            Aadhaar Update Assistance
        </p>

        <p>
            Request Receipt
        </p>

    </div>


    <div class="row">

        <span class="label">
            Request ID
        </span>

        <span>
            ${escapeHTML(
                item.requestId ||
                "-"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Customer Name
        </span>

        <span>
            ${escapeHTML(
                item.customerName ||
                item.name ||
                "-"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Mobile
        </span>

        <span>
            ${escapeHTML(
                item.mobile ||
                "-"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Aadhaar
        </span>

        <span>
            ${escapeHTML(
                item.maskedAadhaar ||
                item.aadhaar ||
                "Not Provided"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Update Required
        </span>

        <span>
            ${escapeHTML(
                item.updates ||
                "-"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Email
        </span>

        <span>
            ${escapeHTML(
                item.email ||
                "Not Provided"
            )}
        </span>

    </div>


    <div class="row">

        <span class="label">
            Status
        </span>

        <span class="status">

            ${escapeHTML(
                normalizeStatus(
                    item.status
                )
            )}

        </span>

    </div>


    <div class="row">

        <span class="label">
            Request Date
        </span>

        <span>
            ${escapeHTML(
                formatDate(
                    item.createdAt ||
                    item.date
                )
            )}
        </span>

    </div>


    <div class="footer">

        <p>
            AJ DIGITAL POINT
        </p>

        <p>
            Jalalpur Kalan, Jind, Haryana - 126102
        </p>

        <p>
            Phone: 8053620341
        </p>

        <p>
            This is an Aadhaar update assistance request receipt.
        </p>

    </div>


    <script>

        window.onload = function () {

            window.print();

        };

    <\/script>


</body>

</html>

    `;


    printWindow.document.open();

    printWindow.document.write(
        html
    );

    printWindow.document.close();

}


/* =========================================================
   STATUS NORMALIZATION
   ========================================================= */

function normalizeStatus(
    status
) {

    if (!status) {

        return "Pending";

    }


    const value =
        String(status)
            .trim()
            .toLowerCase();


    if (
        value === "processing" ||
        value === "in progress" ||
        value === "in-progress"
    ) {

        return "Processing";

    }


    if (
        value === "approved" ||
        value === "approve" ||
        value === "completed" ||
        value === "complete"
    ) {

        return "Approved";

    }


    if (
        value === "rejected" ||
        value === "reject" ||
        value === "cancelled" ||
        value === "canceled"
    ) {

        return "Rejected";

    }


    return "Pending";

}


/* =========================================================
   DATE
   ========================================================= */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }


    try {

        let date;


        if (
            typeof value === "object" &&
            typeof value.toDate === "function"
        ) {

            date =
                value.toDate();

        }

        else if (
            value instanceof Date
        ) {

            date =
                value;

        }

        else if (
            typeof value === "number"
        ) {

            date =
                new Date(value);

        }

        else {

            date =
                new Date(value);

        }


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return String(
                value
            );

        }


        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    } catch (error) {

        return "-";

    }

}


/* =========================================================
   TIMESTAMP
   ========================================================= */

function getTimestamp(
    value
) {

    if (!value) {

        return 0;

    }


    try {

        if (
            typeof value === "object" &&
            typeof value.toDate === "function"
        ) {

            return value
                .toDate()
                .getTime();

        }


        if (
            value instanceof Date
        ) {

            return value.getTime();

        }


        return new Date(
            value
        ).getTime();

    } catch (error) {

        return 0;

    }

}


/* =========================================================
   LOADING
   ========================================================= */

function setLoading(
    isLoading
) {

    if (!loading) {
        return;
    }


    if (isLoading) {

        loading.classList.remove(
            "hidden"
        );

    } else {

        loading.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   EMPTY MESSAGE
   ========================================================= */

function showEmptyMessage(
    message
) {

    if (requestList) {

        requestList.innerHTML =
            "";

    }


    if (emptyState) {

        emptyState.classList.remove(
            "hidden"
        );


        const paragraph =
            emptyState.querySelector(
                "p"
            );


        if (paragraph) {

            paragraph.textContent =
                message;

        }

    }

}


/* =========================================================
   LOGIN ERROR
   ========================================================= */

function showLoginError(
    message
) {

    if (!loginError) {
        return;
    }


    loginError.textContent =
        message;


    loginError.classList.remove(
        "hidden"
    );

}


function hideLoginError() {

    if (loginError) {

        loginError.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   LOGIN LOADING
   ========================================================= */

function setLoginLoading(
    isLoading
) {

    if (!loginButton) {
        return;
    }


    if (isLoading) {

        loginButton.disabled =
            true;

        loginButton.textContent =
            "Logging in...";

    } else {

        loginButton.disabled =
            false;

        loginButton.textContent =
            "🔐 Login";

    }

}


/* =========================================================
   MODAL MESSAGE
   ========================================================= */

function showModalMessage(
    message
) {

    if (!modalMessage) {
        return;
    }


    modalMessage.textContent =
        message;


    modalMessage.classList.remove(
        "hidden"
    );

}


function hideModalMessage() {

    if (modalMessage) {

        modalMessage.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   HTML SECURITY
   ========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )

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


/* =========================================================
   ATTRIBUTE SECURITY
   ========================================================= */

function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}
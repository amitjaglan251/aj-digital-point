"use strict";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    db,
    auth
} from "./firebase-config.js";


/* =========================================================
   AJ DIGITAL POINT
   Aadhaar Update Assistance
   ========================================================= */

let requestData = {};
let selectedPhotoData = "";


/* =========================================================
   CUSTOMER SESSION
   Anonymous Firebase Login
   ========================================================= */

async function ensureCustomerSession() {

    if (auth.currentUser) {
        return auth.currentUser;
    }

    const result =
        await signInAnonymously(auth);

    return result.user;
}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "aadhaarForm"
            );

        if (form) {

            form.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();

                    await submitRequest();

                }
            );

        }


        const startButton =
            document.getElementById(
                "startFormButton"
            );

        if (startButton) {

            startButton.addEventListener(
                "click",
                startForm
            );

        }


        setupPhotoPreview();

        setupDocumentPreview();

        setupAadhaarFormatting();

        setupMobileFormatting();

        setupCopyButton();

        setupCheckStatusButton();

    }
);


/* =========================================================
   STEP 1 - CUSTOMER CONSENT
   ========================================================= */

function startForm() {

    const consent =
        document.getElementById(
            "consent"
        );


    if (
        !consent ||
        !consent.checked
    ) {

        alert(
            "कृपया customer की consent स्वीकार करें।"
        );

        return;

    }


    const consentSection =
        document.getElementById(
            "consentSection"
        );

    const formSection =
        document.getElementById(
            "formSection"
        );


    if (consentSection) {

        consentSection.classList.add(
            "hidden"
        );

    }


    if (formSection) {

        formSection.classList.remove(
            "hidden"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* Make available if inline onclick is used */
window.startForm = startForm;


/* =========================================================
   SUBMIT REQUEST
   ========================================================= */

async function submitRequest() {

    const nameInput =
        document.getElementById(
            "customerName"
        );

    const mobileInput =
        document.getElementById(
            "mobile"
        );

    const aadhaarInput =
        document.getElementById(
            "aadhaar"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const detailsInput =
        document.getElementById(
            "details"
        );

    const finalConsent =
        document.getElementById(
            "finalConsent"
        );


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    const mobile =
        mobileInput
            ? mobileInput.value.trim()
            : "";


    const aadhaar =
        aadhaarInput
            ? aadhaarInput.value
                .replace(/\s/g, "")
            : "";


    const email =
        emailInput
            ? emailInput.value.trim()
            : "";


    const details =
        detailsInput
            ? detailsInput.value.trim()
            : "";


    /* =====================================================
       NAME VALIDATION
       ===================================================== */

    if (name === "") {

        alert(
            "Customer name दर्ज करें।"
        );

        if (nameInput) {

            nameInput.focus();

        }

        return;

    }


    /* =====================================================
       MOBILE VALIDATION
       ===================================================== */

    if (
        !/^[6-9][0-9]{9}$/.test(
            mobile
        )
    ) {

        alert(
            "कृपया सही 10 digit mobile number दर्ज करें।"
        );

        if (mobileInput) {

            mobileInput.focus();

        }

        return;

    }


    /* =====================================================
       AADHAAR VALIDATION
       ===================================================== */

    if (
        aadhaar !== "" &&
        !/^[0-9]{12}$/.test(
            aadhaar
        )
    ) {

        alert(
            "Aadhaar number 12 digit होना चाहिए।"
        );

        if (aadhaarInput) {

            aadhaarInput.focus();

        }

        return;

    }


    /* =====================================================
       UPDATE TYPES
       ===================================================== */

    const selectedUpdates = [];


    document
        .querySelectorAll(
            'input[name="update"]:checked'
        )
        .forEach(
            function (item) {

                selectedUpdates.push(
                    item.value
                );

            }
        );


    if (
        selectedUpdates.length === 0
    ) {

        alert(
            "कम से कम एक update type चुनें।"
        );

        return;

    }


    /* =====================================================
       FINAL CONSENT
       ===================================================== */

    if (
        !finalConsent ||
        !finalConsent.checked
    ) {

        alert(
            "कृपया final customer consent स्वीकार करें।"
        );

        return;

    }


    /* =====================================================
       MASK AADHAAR
       ===================================================== */

    let maskedAadhaar =
        "Not Provided";


    if (
        aadhaar.length === 12
    ) {

        maskedAadhaar =
            "XXXX XXXX " +
            aadhaar.substring(
                8,
                12
            );

    }


    /* =====================================================
       REQUEST ID
       ===================================================== */

    const requestId =
        generateRequestId();


    /* =====================================================
       FILE INFORMATION
       ===================================================== */

    const documentName =
        getDocumentName();


    const photoSelected =
        selectedPhotoData !== "";


    /* =====================================================
       REQUEST DATA
       
       IMPORTANT:
       Full Aadhaar number Firestore में save नहीं होगा।
       Photo/document file contents भी Firestore में
       save नहीं किए जा रहे हैं।
       ===================================================== */

    requestData = {

        requestId: requestId,

        name: name,

        mobile: mobile,

        aadhaar: maskedAadhaar,

        email: email,

        updates:
            selectedUpdates.join(", "),

        details: details,

        photo:
            photoSelected
                ? "Customer photo selected"
                : "No photo selected",

        document:
            documentName,

        date:
            new Date().toLocaleString(
                "en-IN"
            ),

        status:
            "Pending"

    };


    /* =====================================================
       SUBMIT BUTTON
       ===================================================== */

    const submitButton =
        document.querySelector(
            '#aadhaarForm button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Submitting...";

    }


    try {

        /* =================================================
           FIREBASE ANONYMOUS LOGIN
           ================================================= */

        await ensureCustomerSession();


        /* =================================================
           FIRESTORE COLLECTION
           ================================================= */

        const requestsRef =
            collection(
                db,
                "aadhaarRequests"
            );


        /* =================================================
           SAVE REQUEST
           ================================================= */

        const docRef =
            await addDoc(
                requestsRef,
                {

                    requestId:
                        requestData.requestId,

                    customerName:
                        requestData.name,

                    mobile:
                        requestData.mobile,

                    maskedAadhaar:
                        requestData.aadhaar,

                    email:
                        requestData.email,

                    updates:
                        requestData.updates,

                    details:
                        requestData.details,

                    photo:
                        requestData.photo,

                    document:
                        requestData.document,

                    status:
                        "Pending",

                    createdAt:
                        serverTimestamp()

                }
            );


        requestData.firestoreId =
            docRef.id;


        /* =================================================
           SUCCESS
           ================================================= */

        showSuccess();


    } catch (error) {

        console.error(
            "Firestore request error:",
            error
        );


        alert(
            "Request submit नहीं हो पाई।\n\n" +
            "कृपया Internet connection और Firebase settings check करें।"
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "✅ Request Submit करें";

        }

    }

}


/* =========================================================
   REQUEST ID GENERATOR
   ========================================================= */

function generateRequestId() {

    const now =
        new Date();


    const year =
        now
            .getFullYear()
            .toString()
            .slice(-2);


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        "AJAD-" +
        year +
        month +
        day +
        "-" +
        random
    );

}


/* =========================================================
   SHOW SUCCESS RECEIPT
   ========================================================= */

function showSuccess() {

    const formSection =
        document.getElementById(
            "formSection"
        );

    const successSection =
        document.getElementById(
            "successSection"
        );


    if (formSection) {

        formSection.classList.add(
            "hidden"
        );

    }


    if (successSection) {

        successSection.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       REQUEST ID
       ===================================================== */

    const successRequestId =
        document.getElementById(
            "successRequestId"
        );


    if (successRequestId) {

        successRequestId.textContent =
            requestData.requestId;

    }


    /* =====================================================
       STATUS
       ===================================================== */

    const successStatus =
        document.getElementById(
            "successStatus"
        );


    if (successStatus) {

        successStatus.textContent =
            requestData.status ||
            "Pending";

    }


    /* =====================================================
       REQUEST DETAILS
       ===================================================== */

    const detailsBox =
        document.getElementById(
            "requestDetails"
        );


    if (detailsBox) {

        detailsBox.innerHTML = `

            <div class="receipt-row">

                <span>
                    Request ID
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.requestId
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Customer Name
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.name
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Mobile
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.mobile
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Aadhaar
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.aadhaar
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Update Required
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.updates
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Email
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.email ||
                        "Not Provided"
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Photo
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.photo
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Document
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.document
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Status
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.status
                    )}
                </strong>

            </div>


            <div class="receipt-row">

                <span>
                    Request Date
                </span>

                <strong>
                    ${escapeHTML(
                        requestData.date
                    )}
                </strong>

            </div>

        `;

    }


    /* =====================================================
       PHOTO PREVIEW
       ===================================================== */

    const successPhoto =
        document.getElementById(
            "successPhoto"
        );


    if (successPhoto) {

        successPhoto.innerHTML = "";


        if (
            selectedPhotoData !== ""
        ) {

            const img =
                document.createElement(
                    "img"
                );


            img.src =
                selectedPhotoData;


            img.alt =
                "Customer Photo Preview";


            successPhoto.appendChild(
                img
            );

        }

    }


    /* =====================================================
       BUTTONS
       ===================================================== */

    setupCopyButton();

    setupCheckStatusButton();


    /* =====================================================
       SCROLL
       ===================================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   COPY REQUEST ID
   ========================================================= */

function copyRequestId() {

    if (
        !requestData.requestId
    ) {

        alert(
            "Request ID उपलब्ध नहीं है।"
        );

        return;

    }


    const requestId =
        requestData.requestId;


    /* Modern Clipboard */

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(
                requestId
            )
            .then(
                function () {

                    showCopiedMessage();

                }
            )
            .catch(
                function () {

                    fallbackCopy(
                        requestId
                    );

                }
            );

        return;

    }


    fallbackCopy(
        requestId
    );

}


/* =========================================================
   FALLBACK COPY
   ========================================================= */

function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    textarea.style.position =
        "fixed";

    textarea.style.left =
        "-9999px";


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {

        document.execCommand(
            "copy"
        );

        showCopiedMessage();

    } catch (error) {

        alert(
            "Request ID: " +
            text
        );

    }


    document.body.removeChild(
        textarea
    );

}


/* =========================================================
   COPIED MESSAGE
   ========================================================= */

function showCopiedMessage() {

    const button =
        document.getElementById(
            "copyRequestIdButton"
        );


    if (!button) {
        return;
    }


    const originalText =
        "📋 Copy Request ID";


    button.textContent =
        "✅ Copied!";


    setTimeout(
        function () {

            button.textContent =
                originalText;

        },
        2000
    );

}


/* =========================================================
   COPY BUTTON SETUP
   ========================================================= */

function setupCopyButton() {

    const button =
        document.getElementById(
            "copyRequestIdButton"
        );


    if (!button) {
        return;
    }


    button.onclick =
        copyRequestId;

}


/* =========================================================
   CHECK STATUS BUTTON
   ========================================================= */

function setupCheckStatusButton() {

    const button =
        document.getElementById(
            "checkStatusButton"
        );


    if (!button) {
        return;
    }


    button.onclick =
        function () {

            if (
                !requestData.requestId
            ) {

                alert(
                    "Request ID उपलब्ध नहीं है।"
                );

                return;

            }


            const url =
                "status-check.html?requestId=" +
                encodeURIComponent(
                    requestData.requestId
                );


            window.location.href =
                url;

        };

}


/* =========================================================
   PHOTO PREVIEW
   ========================================================= */

function setupPhotoPreview() {

    const photoInput =
        document.getElementById(
            "customerPhoto"
        );


    if (!photoInput) {
        return;
    }


    photoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            const preview =
                document.getElementById(
                    "photoPreview"
                );


            if (preview) {

                preview.innerHTML =
                    "";

            }


            selectedPhotoData =
                "";


            if (!file) {
                return;
            }


            /* TYPE */

            const allowedTypes = [

                "image/jpeg",

                "image/png",

                "image/webp"

            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "केवल JPG, PNG या WEBP photo चुनें।"
                );

                this.value =
                    "";

                return;

            }


            /* SIZE */

            const maxSize =
                5 * 1024 * 1024;


            if (
                file.size > maxSize
            ) {

                alert(
                    "Photo का size 5 MB से कम होना चाहिए।"
                );

                this.value =
                    "";

                return;

            }


            /* FILE READER */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    selectedPhotoData =
                        event.target.result;


                    if (!preview) {
                        return;
                    }


                    const img =
                        document.createElement(
                            "img"
                        );


                    img.src =
                        selectedPhotoData;


                    img.alt =
                        "Customer Photo Preview";


                    const label =
                        document.createElement(
                            "div"
                        );


                    label.className =
                        "preview-label";


                    label.textContent =
                        "Photo Selected";


                    preview.appendChild(
                        img
                    );


                    preview.appendChild(
                        label
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   DOCUMENT PREVIEW
   ========================================================= */

function setupDocumentPreview() {

    const documentInput =
        document.getElementById(
            "customerDocument"
        );


    if (!documentInput) {
        return;
    }


    documentInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            const info =
                document.getElementById(
                    "documentInfo"
                );


            if (info) {

                info.innerHTML =
                    "";

                info.classList.remove(
                    "show"
                );

            }


            if (!file) {
                return;
            }


            const allowedTypes = [

                "image/jpeg",

                "image/png",

                "application/pdf"

            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "केवल JPG, PNG या PDF document चुनें।"
                );

                this.value =
                    "";

                return;

            }


            const maxSize =
                10 * 1024 * 1024;


            if (
                file.size > maxSize
            ) {

                alert(
                    "Document का size 10 MB से कम होना चाहिए।"
                );

                this.value =
                    "";

                return;

            }


            if (info) {

                info.innerHTML =

                    "<strong>Selected:</strong> " +

                    escapeHTML(
                        file.name
                    ) +

                    "<br>" +

                    "<strong>Size:</strong> " +

                    formatFileSize(
                        file.size
                    );


                info.classList.add(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   DOCUMENT NAME
   ========================================================= */

function getDocumentName() {

    const input =
        document.getElementById(
            "customerDocument"
        );


    if (
        !input ||
        !input.files ||
        input.files.length === 0
    ) {

        return "No document selected";

    }


    return input.files[0].name;

}


/* =========================================================
   FILE SIZE
   ========================================================= */

function formatFileSize(bytes) {

    if (
        bytes < 1024
    ) {

        return (
            bytes +
            " Bytes"
        );

    }


    if (
        bytes < 1024 * 1024
    ) {

        return (
            (bytes / 1024)
                .toFixed(1) +
            " KB"
        );

    }


    return (
        (bytes / (1024 * 1024))
            .toFixed(1) +
        " MB"
    );

}


/* =========================================================
   AADHAAR FORMATTING
   ========================================================= */

function setupAadhaarFormatting() {

    const aadhaarInput =
        document.getElementById(
            "aadhaar"
        );


    if (!aadhaarInput) {
        return;
    }


    aadhaarInput.addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .substring(
                        0,
                        12
                    );


            const groups =
                value.match(
                    /.{1,4}/g
                );


            this.value =
                groups
                    ? groups.join(" ")
                    : "";

        }
    );

}


/* =========================================================
   MOBILE FORMATTING
   ========================================================= */

function setupMobileFormatting() {

    const mobileInput =
        document.getElementById(
            "mobile"
        );


    if (!mobileInput) {
        return;
    }


    mobileInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .substring(
                        0,
                        10
                    );

        }
    );

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function sendWhatsApp() {

    if (
        !requestData.requestId
    ) {

        alert(
            "पहले request submit करें।"
        );

        return;

    }


    const phone =
        "918053620341";


    const message =

`AJ DIGITAL POINT
Aadhaar Update Assistance Request

Request ID:
${requestData.requestId}

Customer Name:
${requestData.name}

Mobile:
${requestData.mobile}

Aadhaar:
${requestData.aadhaar}

Update Required:
${requestData.updates}

Status:
${requestData.status}

Photo:
${requestData.photo}

Document:
${requestData.document}

Request Date:
${requestData.date}

Check Status:
${window.location.origin}/status-check.html?requestId=${encodeURIComponent(requestData.requestId)}

Note:
यह Aadhaar update assistance request है।
Final processing official UIDAI process और verification के अनुसार होगी।`;


    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* Make available to inline onclick */
window.sendWhatsApp =
    sendWhatsApp;


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
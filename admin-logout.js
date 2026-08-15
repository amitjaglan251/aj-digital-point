import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";

console.log("Admin logout script loaded");


document.addEventListener("DOMContentLoaded", () => {

    const logoutButton =
        document.getElementById("logoutButton");

    if (!logoutButton) {
        console.error("logoutButton नहीं मिला");
        return;
    }

    logoutButton.addEventListener("click", async () => {

        const ok = confirm(
            "क्या आप Admin Panel से Logout करना चाहते हैं?"
        );

        if (!ok) {
            return;
        }

        logoutButton.disabled = true;
        logoutButton.textContent = "Logging out...";

        try {

            await signOut(auth);

            console.log("Firebase logout successful");

            window.location.href =
                "admin-login.html";

        } catch (error) {

            console.error(
                "Logout Error:",
                error
            );

            alert(
                "Logout में समस्या आई:\n" +
                error.message
            );

            logoutButton.disabled = false;
            logoutButton.textContent = "🚪 Logout";
        }

    });

});
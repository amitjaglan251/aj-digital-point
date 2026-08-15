import {
    signInWithEmailAndPassword
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


const form =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const button =
    document.getElementById("loginButton");

const message =
    document.getElementById("loginMessage");


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        message.textContent = "";

        button.disabled = true;

        button.textContent =
            "Logging in...";


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            message.textContent =
                "Login successful...";

            message.style.color =
                "#08752c";


            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(error);


            message.style.color =
                "#b00020";


            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                message.textContent =
                    "Email या password गलत है।";

            } else if (
                error.code ===
                "auth/too-many-requests"
            ) {

                message.textContent =
                    "बहुत अधिक प्रयास हुए हैं। थोड़ी देर बाद फिर कोशिश करें।";

            } else {

                message.textContent =
                    "Login failed. Firebase settings check करें।";

            }


            button.disabled = false;

            button.textContent =
                "🔐 Login";

        }

    }
);
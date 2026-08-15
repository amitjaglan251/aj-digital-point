import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDIeZrcPjDvryOhMU4sH-LLeS0usCUY43I",
  authDomain: "aj-digital-point-aadhaar.firebaseapp.com",
  projectId: "aj-digital-point-aadhaar",
  storageBucket: "aj-digital-point-aadhaar.firebasestorage.app",
  messagingSenderId: "3681003262",
  appId: "1:3681003262:web:fe5a3e294d80b719c9a7af"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
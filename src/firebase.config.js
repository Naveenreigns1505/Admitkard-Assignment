// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzDFPsCBBQPs8ECyL1LPgPXKBhwwRgea8",
    authDomain: "otp-verification-489fb.firebaseapp.com",
    projectId: "otp-verification-489fb",
    storageBucket: "otp-verification-489fb.appspot.com",
    messagingSenderId: "674619725304",
    appId: "1:674619725304:web:cb22f184b8ba801dc2720d",
    measurementId: "G-R1ESREXX18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
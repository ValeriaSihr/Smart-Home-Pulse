// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5CjxuxeTIhDe9gpgtOGCIzcs99J_m5Ac",
  authDomain: "smart-home-pulse-37a4d.firebaseapp.com",
  projectId: "smart-home-pulse-37a4d",
  storageBucket: "smart-home-pulse-37a4d.firebasestorage.app",
  messagingSenderId: "780370414817",
  appId: "1:780370414817:web:8d106be4fe6c5f21d5fba0",
  measurementId: "G-62753BDGFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

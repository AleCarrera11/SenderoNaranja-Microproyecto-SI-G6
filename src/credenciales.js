// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoE6FPMkThZBLAfQbDsoyagG6fS3uMC5s",
  authDomain: "sendero-naranja.firebaseapp.com",
  projectId: "sendero-naranja",
  storageBucket: "sendero-naranja.firebasestorage.app",
  messagingSenderId: "279078252507",
  appId: "1:279078252507:web:ae8ae53299710b094841fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFireStore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP6Vap6iTU_pUZWB-uNDv6ciIe9P2rj2s",
  authDomain: "react-firebase-91c6a.firebaseapp.com",
  projectId: "react-firebase-91c6a",
  storageBucket: "react-firebase-91c6a.appspot.com",
  messagingSenderId: "948626808728",
  appId: "1:948626808728:web:c1e7a1d98ac086be5995ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

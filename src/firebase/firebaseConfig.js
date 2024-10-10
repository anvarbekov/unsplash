// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoN_5VBbL724U3dHCwqZ2zpvWqS0U1mNk",
  authDomain: "my-splash-6beaa.firebaseapp.com",
  projectId: "my-splash-6beaa",
  storageBucket: "my-splash-6beaa.appspot.com",
  messagingSenderId: "587850455055",
  appId: "1:587850455055:web:59a1c2b0b6fe4978e5ab7a",
  measurementId: "G-BGP0TLGKMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth
export const auth = getAuth();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "real-estate-54ca1.firebaseapp.com",
  projectId: "real-estate-54ca1",
  storageBucket: "real-estate-54ca1.appspot.com",
  messagingSenderId: "763525281730",
  appId: "1:763525281730:web:8a005028be4f5cbcddc85b",
  measurementId: "G-K5CC82LFBB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

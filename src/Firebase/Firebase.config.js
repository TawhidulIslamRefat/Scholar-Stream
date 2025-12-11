// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  //   apiKey: "AIzaSyDlz2aWxlk8Uj4Jtj8jCr1MLvx7ogJfnoI",
  //   authDomain: "scholarstream-670dd.firebaseapp.com",
  //   projectId: "scholarstream-670dd",
  //   storageBucket: "scholarstream-670dd.firebasestorage.app",
  //   messagingSenderId: "815568249270",
  //   appId: "1:815568249270:web:62ce4948c063cb857de117"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


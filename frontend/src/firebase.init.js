// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxu9tUUTnfYyxGJMp8kLFpNl-zjh9XAxg",
  authDomain: "seo-website-d4cd4.firebaseapp.com",
  projectId: "seo-website-d4cd4",
  storageBucket: "seo-website-d4cd4.appspot.com",
  messagingSenderId: "826522337073",
  appId: "1:826522337073:web:8c62491d26a58c239e3a10",
  measurementId: "G-Y51DNMYEKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
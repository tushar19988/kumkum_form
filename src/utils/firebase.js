import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFoR2LI_UvHsAn4b_jzmPMaZpBO-FYs5E",
  authDomain: "kumkum-web-9883.firebaseapp.com",
  projectId: "kumkum-web-9883",
  storageBucket: "kumkum-web-9883.firebasestorage.app",
  messagingSenderId: "755878243300",
  appId: "1:755878243300:web:ed6584a77df10ab54535f1",
  measurementId: "G-X0NGXTSTJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

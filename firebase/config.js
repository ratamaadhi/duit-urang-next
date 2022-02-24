import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTwd-GYQR4doh3xjGjTjULx8epYoYV6_Q",
  authDomain: "duit-urang.firebaseapp.com",
  projectId: "duit-urang",
  storageBucket: "duit-urang.appspot.com",
  messagingSenderId: "1000170179373",
  appId: "1:1000170179373:web:40893cdd71ba8c932221a4",
  measurementId: "G-5FNKB4DFF4"
};

// init app
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init auth
const auth = getAuth()

export { db, auth };
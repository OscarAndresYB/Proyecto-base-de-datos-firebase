// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjlFEkv3Cjr0WN0NWKBm8pPdB0sOL8nuY",
  authDomain: "racso-fc007.firebaseapp.com",
  projectId: "racso-fc007",
  storageBucket: "racso-fc007.appspot.com",
  messagingSenderId: "344309437962",
  appId: "1:344309437962:web:b53ffa06e11906568931f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
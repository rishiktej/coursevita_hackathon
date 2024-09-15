// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"; // Import authentication functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL9YKDORO9X9jmQAtjYooOWsGXHq_At40",
  authDomain: "dreamroute-bd850.firebaseapp.com",
  projectId: "dreamroute-bd850",
  storageBucket: "dreamroute-bd850.appspot.com",
  messagingSenderId: "874906428711",
  appId: "1:874906428711:web:76f30fe803d9ec29893502",
  measurementId: "G-RKP6JVT14W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider
export { auth, provider, signInWithPopup, signOut };

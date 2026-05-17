// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// optional only if you want analytics
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnJMlspS5n65abdrrXEm7arjKAeW-z1fA",
  authDomain: "baguio-auth.firebaseapp.com",
  projectId: "baguio-auth",
  storageBucket: "baguio-auth.firebasestorage.app",
  messagingSenderId: "72339101368",
  appId: "1:72339101368:web:f38f6de1715fcd9e3cc64d",
  measurementId: "G-NWYSZS554K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// optional
// export const analytics = getAnalytics(app);
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoP_iT1RNMrQT0EdLT2f2Unb2PYD09MpY",
  authDomain: "resume-builder-f0154.firebaseapp.com",
  projectId: "resume-builder-f0154",
  storageBucket: "resume-builder-f0154.firebasestorage.app",
  messagingSenderId: "397810368619",
  appId: "1:397810368619:web:b723bd8b8c125d8632b12e",
  measurementId: "G-7DN1N847BL"
};

// Initialize Firebase safely in Next.js (ensuring it only happens once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Core Services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics needs to run only in the browser context
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };

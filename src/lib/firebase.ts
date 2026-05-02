import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwCrdvsm5BCfeRoepPSPxARS5AI5IZZb4",
  authDomain: "indicabrasiloficial.firebaseapp.com",
  projectId: "indicabrasiloficial",
  storageBucket: "indicabrasiloficial.firebasestorage.app",
  messagingSenderId: "825733093888",
  appId: "1:825733093888:web:21625f919a84a7fa5916e5",
  measurementId: "G-QN1T3L7DZ2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics conditionally to avoid errors in environments without browser extensions
export const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

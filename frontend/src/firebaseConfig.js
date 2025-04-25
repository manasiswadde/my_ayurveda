import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh0LpAKE9z3yGmt639q0jg6awMcw5X2Bg",
  authDomain: "ayurveda-f3454.firebaseapp.com",
  projectId: "ayurveda-f3454",
  storageBucket: "ayurveda-f3454.firebasestorage.app",
  messagingSenderId: "852163411791",
  appId: "1:852163411791:web:94ef62d6ad66b0d18f0f3a",
  measurementId: "G-FGLNJ2G1TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

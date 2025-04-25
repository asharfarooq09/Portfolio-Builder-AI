
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-7FIuHluEsnkqmpXUNyO5B5746bpN5yc",
  authDomain: "portfolio-ai-20c63.firebaseapp.com",
  projectId: "portfolio-ai-20c63",
  storageBucket: "portfolio-ai-20c63.firebasestorage.app",
  messagingSenderId: "149546639662",
  appId: "1:149546639662:web:a4e304a6562429e6055abf",
  measurementId: "G-QRSJWGVT95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;

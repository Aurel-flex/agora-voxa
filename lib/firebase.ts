import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // On l'activera quand tu feras la vidéo

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Vérifie si Firebase est déjà initialisé (évite les bugs avec le rechargement à chaud de Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// On exporte les outils dont on va se servir
export const auth = getAuth(app);
export const db = getFirestore(app);
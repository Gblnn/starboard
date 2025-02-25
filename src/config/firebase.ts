import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase early
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistent auth state immediately
setPersistence(auth, browserLocalPersistence).catch(console.error);

// Connect to emulator only if VITE_USE_FIREBASE_EMULATOR is set
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

const db = getFirestore(app);

export { auth, db };

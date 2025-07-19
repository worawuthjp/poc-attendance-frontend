// lib/firebase.ts
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyAydh4HonHnWClxoWdhzLrRlRo1hfqNhxk",
  authDomain: "marketplace-834cd.firebaseapp.com",
  projectId: "marketplace-834cd",
  storageBucket: "marketplace-834cd.firebasestorage.app",
  messagingSenderId: "75484057041",
  appId: "1:75484057041:web:458f9bff6932a95aebe4f0",
  measurementId: "G-MLEBJ3DEWK"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db: Firestore = getFirestore(app);

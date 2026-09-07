import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg_fqNTywNo2JWO8ooiDXJurV3wsfxVXY",
  authDomain: "lead-rescue-web.firebaseapp.com",
  projectId: "lead-rescue-web",
  storageBucket: "lead-rescue-web.firebasestorage.app",
  messagingSenderId: "108459310988",
  appId: "1:108459310988:web:c69a80d592a41ff7bae0a9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
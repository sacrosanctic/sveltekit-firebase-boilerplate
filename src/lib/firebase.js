import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
//TODO: add firebaes config
const firebaseConfig = {
  apiKey: "AIzaSyC5fpdS_OIrTC1JHYHpv9VMfmQF56O3qn4",
  authDomain: "sveltekit-firebase-boilerplate.firebaseapp.com",
  projectId: "sveltekit-firebase-boilerplate",
  storageBucket: "sveltekit-firebase-boilerplate.appspot.com",
  messagingSenderId: "989328729984",
  appId: "1:989328729984:web:e7d9b6f12312ce4184c365"
}

export const app = initializeApp(firebaseConfig, "CLIENT");
export const auth = getAuth(app)
export const db = getFirestore(app); 
setPersistence(auth, browserLocalPersistence)
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "$lib/firebase";

const q = query(collection(db, "Todos"));

export const querySnapshot = await getDocs(q);
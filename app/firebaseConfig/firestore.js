import { firebaseClient } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

const firestoreDB = getFirestore(firebaseClient)
export default firestoreDB
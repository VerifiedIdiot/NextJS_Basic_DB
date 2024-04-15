import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseClient from "./firebaseConfig";



const db = getFirestore(firebaseClient);

async function testFirestore() {
  const querySnapshot = await getDocs(collection(db, "some-collection"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

export default testFirestore;

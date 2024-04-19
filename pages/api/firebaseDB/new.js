// pages/api/firebase/new.js

import { collection, addDoc, getFirestore } from "firebase/firestore";
import { firebaseClient } from "@/app/firebaseConfig/firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const firestoreDB = getFirestore(firebaseClient);
      const newDoc = await addDoc(collection(firestoreDB, "next-app-project"), req.body);
      res.status(201).json({ id: newDoc.id, ...req.body });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}

// pages/api/firebase/read/[docId].js

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseClient } from "@/app/firebaseConfig/firebaseConfig";

export default async function handler(req, res) {
  const { docId } = req.query;
  if (req.method === "GET") {
    try {
      const firestoreDB = getFirestore(firebaseClient);
      const docRef = doc(firestoreDB, "next-app-project", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        res.status(200).json(docSnap.data());
      } else {
        res.status(404).json({ error: "Document not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}

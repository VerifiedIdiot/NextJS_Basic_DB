// pages/api/firebase/update/[docId].js

import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { firebaseClient } from "@/app/firebaseConfig/firebaseConfig";

export default async function handler(req, res) {
  const { docId } = req.query;
  if (req.method === "PUT") {
    try {
      const firestoreDB = getFirestore(firebaseClient);
      const docRef = doc(firestoreDB, "next-app-project", docId);
      await updateDoc(docRef, req.body);
      res.status(200).json({ message: "Document updated successfully", id: docId, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}

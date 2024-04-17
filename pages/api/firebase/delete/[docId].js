// pages/api/firebase/delete/[docId].js

import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { firebaseClient } from "@/app/firebaseConfig/firebaseConfig";

export default async function handler(req, res) {
  const { docId } = req.query;
  if (req.method === "DELETE") {
    try {
      const firestoreDB = getFirestore(firebaseClient);
      const docRef = doc(firestoreDB, "next-app-project", docId);
      await deleteDoc(docRef);
      res.status(200).json({ message: "Document deleted successfully", id: docId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}

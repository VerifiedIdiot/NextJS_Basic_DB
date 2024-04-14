import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    // console.log(req.query)

    const db = await connectDB()
    const result = await db.collection('comment').find({ parent_id : new ObjectId(req.query.parent_id) }).toArray()
    
    res.status(200).json(result)
  }


 

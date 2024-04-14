// GET /api/like/count
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { postId } = req.query; // postId를 쿼리 매개변수로 받습니다.
        const db = (await connectDB).db('my_mongo_db')
        const likesCollection = await db.collection('likes');
        const likeCount = await likesCollection.countDocuments({ postId: new ObjectId(postId) });

        res.status(200).json({ postId: postId, likeCount });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: "Method Not Allowed" });
    }
}

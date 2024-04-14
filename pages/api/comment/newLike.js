import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    
 
    if (req.method === 'POST') {
        req.body = JSON.parse(req.body);
        if (!req.body.postId) {
            return res.status(400).json({ error: '글 ID 누락되었습니다.' });
        }

        const db = (await connectDB).db('my_mongo_db') 
        const userLikes = await db.collection('likes');
        const userAlreadyLiked = await userLikes.findOne({
            postId: new ObjectId(req.body.postId),
            userId: new ObjectId(req.body.userId) 
        });

        if (userAlreadyLiked) {
            return res.status(409).json({ error: '이미 좋아요를 눌렀습니다.' });
        }

        const result = await userLikes.insertOne({
            postId: new ObjectId(req.body.postId),
            userId: new ObjectId(req.body.userId),
        });

        if (result.acknowledged) {
            const likeCount = await userLikes.countDocuments({ postId: new ObjectId(req.body.postId) });
            res.status(201).json({ success: true, likeCount });
        } else {
            res.status(500).json({ error: '좋아요 저장 실패' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

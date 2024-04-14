import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"; 
export default async function handler(req, res) {
    const loginSession = await getServerSession(req, res, authOptions);
    
    if (req.method === 'POST') {
        req.body = JSON.parse(req.body);
        
        if (!req.body.comment || !req.body.parentId || !loginSession.user.email) {
            return res.status(400).json({ error: '댓글 내용, 부모 ID, 또는 사용자 이메일이 누락되었습니다.' });
        }

        const postData = {
            content: req.body.comment,
            parent_id: new ObjectId(req.body.parentId),
            author: loginSession.user.email,
            // likeCount: 0,
        };
        
        const db = await connectDB();
        const result = await db.collection('comment').insertOne(postData);

        if (result.acknowledged) {
            // 새로 추가된 댓글의 정보를 클라이언트에 반환
            res.status(200).json({
                _id: result.insertedId,
                content: postData.content,
                parent_id: postData.parent_id,
                author: postData.author,
                // likeCount: postData.likeCount
            });
        } else {
            res.status(500).json({ error: '댓글을 저장하는 데 실패했습니다.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

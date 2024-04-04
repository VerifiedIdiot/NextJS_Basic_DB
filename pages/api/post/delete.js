import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == 'DELETE'){
    console.log(req.body)
   
    try {
      const documentId = req.body; // 클라이언트에서 받은 ID 추출

      // 유효한 ObjectId인지 확인
      if (!documentId || !ObjectId.isValid(documentId)) {
        return res.status(400).json({ message: "유효하지 않은 ID입니다." });
      }

      const db = (await connectDB).db('my_mongo_db');
      const result = await db.collection('test').deleteOne({ _id: new ObjectId(documentId) });

      // 삭제된 문서가 없는 경우
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "삭제할 문서를 찾지 못했습니다." });
      }

      console.log(result);
      res.status(200).json({ message: '삭제 완료' });
    } catch (error) {
      console.error('에러가 발생했습니다:', error);
      return res.status(500).json({ message: "서버에서 에러가 발생했습니다", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 메소드입니다" });
  }
}

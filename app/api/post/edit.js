import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const textInfo = { title: req.body.title, content: req.body.content };
    
    try {
      // 제목과 내용의 유효성을 검사
      if (!textInfo.title || textInfo.title.trim() === "") {
        return res.status(400).json("제목을 입력해주세요");
      }
      if (!textInfo.content || textInfo.content.trim() === "") {
        return res.status(400).json("내용을 입력해주세요");
      }

      const db = await connectDB()
      const result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: textInfo });
        // $inc : updateOne과 상호작용하는 연산자, 선택한 필드의 값이 정수형일 경우 $inc 를 통해 증가시킬수 있는데 조회수 기능을 추가할때 사용해보자
      
      // 업데이트된 문서가 없을 경우
      if (result.modifiedCount === 0) {
        return res.status(404).json("업데이트할 문서를 찾지 못했습니다.");
      }

      // 업데이트 후 리스트 페이지로 리디렉션
      console.log(result);
      res.redirect(302, "/list");
    } catch (error) {
      console.error('에러가 발생했습니다:', error);
      return res.status(500).json({ message: "서버에서 에러가 발생했습니다", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 메소드입니다" });
  }
}

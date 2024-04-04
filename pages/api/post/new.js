import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      // 더 명확한 조건 검사
      if (req.body.title !== null && req.body.title.trim() !== "") {
        const db = (await connectDB).db("my_mongo_db");
        const result = await db.collection("test").insertOne(req.body);
        console.log(`${result}와 같이 입력이 되었음`); 
        return res.status(200).redirect('/list');
        // return res.status(200).json("저장완료");
      } else {
        return res.status(400).json("제목을 입력해주세요"); 
      }
    } catch (error) {
      console.error('에러가 발생했습니다:', error); 
      return res.status(500).json({ message: "서버에서 에러가 발생했습니다", error: error.message }); // 클라이언트에 에러 정보 전달
    }
  } else {
    return res.status(405).json({ message: "허용되지 않은 메소드입니다" }); // POST가 아닌 요청 처리
  }
}

// 강의 원문은 아래와 같음
// if문에 AND 연산자를 추가하여 더 엄격한 검사를 진행하게 하였음
// null 혹은 undefined 인 경우에 걸러내는 로직

// import { connectDB } from "@/util/database"

// export default async function handler(요청, 응답) {
//   if (요청.method == 'POST'){
//     if (요청.body.title == '') {
//       return 응답.status(500).json('제목써라')
//     }
//     try {
//       let db = (await connectDB).db('forum')
//       let result = db.collection('post').insertOne(요청.body)
//       응답.redirect(302, '/list')
//     } catch (error) {
//       DB에러시 실행할코드~~
//     }

//   }
// }

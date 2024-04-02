import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("test").findOne({ 
    _id : new ObjectId(props.params.id)})
  
    console.log(props.params.id)
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}


// 기존에 해당 도큐먼트의 고유식별자인 id를 조회하기 위해서 ObjectId 함수를 사용하였으나
// 해당 함수는 14 버전에서 deprecated 되어 다
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

// props에서 id 값을 반환받은 뒤, 그 id를 가진 도큐먼트를 조회

export default async function Edit(props) {
  console.log(props);
  const db = (await connectDB).db("my_mongo_db");
  const result = await db
    .collection("test")
    .findOne({ _id: new ObjectId(props.params.id) });

  // await db
  //   .collection("test")
  //   .updateOne({ _id: props.params.id }, { $set: { title: ㅎ, content: ㅋ } });

  console.log(result);
  return (
    <div className="write">
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <input name="_id" defaultValue={result._id.toString()} className="_id" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

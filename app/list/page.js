import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("test").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, index) => (
        <div className="list-item" key={index}>
          <Link href={"/detail/" + result[index]._id}>
            <h4>{item.title}</h4>
            <p>1월 1일</p>
          </Link>
          <Link href={'/edit/' + result[i]._id} className="list-btn">✏️</Link>
          <DetailLink></DetailLink>
        </div>
      ))}
    </div>
  );
}

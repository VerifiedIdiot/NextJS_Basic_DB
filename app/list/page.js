
import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("test").find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result}></ListItem>
    </div>
  );
}

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function MyPage() {
  try {
    const loginSession = await getServerSession(authOptions);
    console.log(loginSession);
    if (loginSession) {
      const db = (await connectDB).db("my_mongo_db");
      const result = await db
        .collection("users")
        .findOne({ _id: new ObjectId(loginSession.user._id) });
        console.log(result);
    }
  } catch (error) {
    // 에러 처리
    console.error("Error fetching post details:", error);
    return <div>서버 오류가 발생했습니다.</div>;
  }
}

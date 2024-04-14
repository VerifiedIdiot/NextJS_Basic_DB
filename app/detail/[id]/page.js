import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Detail(props) {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  // console.log(props.params.id)

  const loginSession = await getServerSession(authOptions);
  let sessionData = loginSession; // 기본 세션 데이터로 초기화

  if (!loginSession || !loginSession.user._id) {
    // OAuth를 통해 로그인한 사용자 정보 조회
    const OAuthAccounts = (await connectDB).db("test");
    const OAuthResult = await OAuthAccounts.collection("users").findOne({
      email: loginSession.user.email,
    });

    if (OAuthResult) {
      // OAuthResult가 존재하는 경우, OAuthResult를 사용
      sessionData = {
        ...loginSession,
        user: {
          ...loginSession.user,
          _id: OAuthResult._id.toString(), // MongoDB ObjectId를 문자열로 변환
          name: OAuthResult.name || loginSession.user.name,
          email: OAuthResult.email,
        },
      };
    } else {
      console.log("OAuth 사용자 정보 없음");
    }
  }
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment parentId={result._id.toString()} loginSession={sessionData} />
    </div>
  );
}

// 기존에 해당 도큐먼트의 고유식별자인 id를 조회하기 위해서 ObjectId 함수를 사용하였으나 Next 13 버전과 달리 14 버전은 deprecated되어 time기반의 createFromTime()를 사용하라 권장함
// 알아본 결과 해당 경고는 확인이 되지않아 여전히 ObjectId를 사용하기로 하였음
// 문자열 기반의 텍스트 정보가 pk로서 시간정보로서 pk인 상황보다 유일성 보장과 색인, 그리고 확장에 더 좋은데 왜 이런 경고가 나왔는지는 추후에 확인할 예정 - 2024/04/02 정벼리

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Detail(props) {
  try {
    // ID 유효성 검사
    if (!ObjectId.isValid(props.params.id)) {
      return (
        <div>
          올바른 형식의 요청값이 아닙니다. 24글자의 16진수를 입력해주세요.
        </div>
      );
    }

    // 데이터베이스 연결 및 문서 조회
    const db = (await connectDB).db("my_mongo_db");
    const result = await db.collection("post").findOne({
      _id: new ObjectId(props.params.id),
    });

    // 문서가 데이터베이스에 없는 경우
    if (result == null) {
      return notFound();
    } else {
      // 로그인 세션 가져오기
      const loginSession = await getServerSession(authOptions);
      let sessionData = loginSession;

      // 로그인 세션 확인 및 OAuth 사용자 정보 처리
      if (!loginSession || !loginSession.user._id) {
        const OAuthAccounts = (await connectDB).db("my_mongo_db");
        const OAuthResult = await OAuthAccounts.collection("users").findOne({
          email: loginSession.user.email,
        });

        if (OAuthResult) {
          sessionData = {
            ...loginSession,
            user: {
              _id: OAuthResult._id.toString(),
              name: OAuthResult.name || loginSession.user.name,
              email: OAuthResult.email,
            },
          };
        }
      }

      // 성공적으로 문서를 찾은 경우, 상세 페이지 렌더링
      return (
        <div>
          <h4>상세페이지</h4>
          <h4>{result.title}</h4>
          <p>{result.content}</p>
          <Comment
            parentId={result._id.toString()}
            loginSession={sessionData}
          />
        </div>
      );
    }
  } catch (error) {
    // 에러 처리
    console.error("Error fetching post details:", error);
    return <div>서버 오류가 발생했습니다.</div>;
  }
}

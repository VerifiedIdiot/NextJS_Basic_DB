import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  const loginSession = await getServerSession(authOptions);
  if (loginSession) {
    return (
      <div className="p-20">
        <h4>글작성</h4>
        <form action="/api/post/new" method="POST">
          {/* <input type="hidden" name="email" value={loginSession?.user?.email || ''} /> */}
          <input name="title" placeholder="글 제목을 적어주세요"></input>
          <input name="content" placeholder="글 내용을 적어주세요"></input>
          <button type="submit">버튼</button>
        </form>
      </div>
    );
  } else {
    return <div>로그인하세요</div>;
  }
}

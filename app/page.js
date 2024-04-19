import { connectDB } from "@/util/database";

export const revalidate = 60;

export default async function Home() {
  // testFirestore 함수를 호출하고 결과를 콘솔에 출력

  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("post").find().toArray();

  // console.log(result);
  // // 캐싱된 정보를 사용
  // await fetch('/URL', {cache : 'force-cache'})
  // // 캐싱된 정보를 사용하지않음, 실시간 데이터가 중요할때
  // await fetch('/URL', {cache : 'no-store'})
  // // 캐싱된 정보를 사용하지만 60초에 한번씩 GET 요청으로 초기화후 불러옴
  // await fetch('/URL', {next : {revalidate : 60}})

  return (
    <>
      <div>안녕하세요</div>
      {/* <div>
        <h1>Firestore CRUD 테스트</h1>
        <form action="/api/firebaseDB/new" method="post">
          <input name="valueInput" placeholder="값을 입력하세요" />
          <button type="submit">전송</button>
        </form>
      </div> */}
    </>
  );
}

// 캐싱기능은 server component 안에서만 사용이 가능하다.

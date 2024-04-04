
import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./ListItem";
// static으로 렌더링되는 페이지를 dynamic하게 바꾸고 싶을때 사용
export const dynamic = 'force-dynamic'

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("test").find().toArray();
  console.log(result)
  return (
    <div className="list-bg">
      <ListItem result={result}></ListItem>
    </div>
  );
}


// static한 렌더링과 dynamic한 렌더링의 차이는 유저가 접속을 하였을때 미리 준비된 html을 보여주냐, 아니면 유저가 접근한 그 시점에 페이지를 그리느냐의 차이


// 페이지 안에 별 기능이 없어서 매번 html 페이지를 새로 만들 필요가 없으니까 그냥 그대로 보내는 것임
// 장점은 매우 빠르게 페이지 전송이 가능합  (유저가 100명 들어와도 페이지를 새로 만들지 않음)


// - fetch('/URL', { cache: 'no-store' }) 로 데이터 가져오는 문법 
// - useSearchParams(), cookies(), headers() 
// - [dynamic route]
// 이런걸 사용한다면 dynamic rendering 으로 페이지를 보여줌
// yarn build로 html 페이지를 만들어놨지만 유저가 페이지 접속시 html에 변동사항이 들어가야하기 때문에 
// 유저가 페이지에 들어갈 때마다 html 페이지를 서버에서 다시 그려준다는 소리

// 그러면 dynamic 렌더링의 단점을 극복하기 위해서는 자주 렌더링이 되는 페이지를 캐싱(caching)하여 자원소모를 줄이자
// useMemo, useCallback 처럼 자주변경되는 상태 혹은 자주 사용하는 함수 등을 사용할때 자원관리하듯이 !
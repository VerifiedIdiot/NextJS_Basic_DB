"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  console.log(result);
  return (
    <div>
      {result.map((item, index) => (
        <div className="list-item" key={index}>
          <Link href={"/detail/" + result[index]._id}>
            <h4>{item.title}</h4>
            <p>1월 1일</p>
          </Link>
          <Link href={"/edit/" + result[index]._id} className="list-btn">
            ✏️
          </Link>
          <span
            onClick={(e) => {
              //   fetch("/api/post/delete", {
              //     method: "DELETE",
              //     body: result[index]._id,
              //   })
              //     .then((response) => response.json())
              //     .then((result) => {
              //       console.log(`result : ${result[index]._id}`);
              //       e.target.parentElemnet.style.opacity = 0;
              //       setTimeout(() => {
              //         e.target.parentElemnet.style.display = 'none';
              //       },1000)
              //     })
              //     .catch((error) => {
              //       console.log(error);
              //     });
              //   fetch("api/post");
            }}>
            🗑️
          </span>
        </div>
      ))}
    </div>
  );
}

// Ajax의 비동기 api 송수신은 화면의 새로고침을 유발하지 않는다 (중요). 이로인해 오랜기간 사용자의 경험을 위해 사용이 되어왔다
// Ajax의 경우 Axios에 비교하여 자원 소모를 덜 하는 저수준 방식이지만 코드가 길어지고 Axios에 비교해서 유용한 기능이 적기에 왠만하면 Axios를 사용하자
// Axios의 단점이라고 한다면 비교적 고수준이기 때문에 자원소모가 더 들어가고 번들의 크기도 늘어나지만 보안과 에러처리등 유용한 기능들을 제공해주니
// 기본적으로 개발을 할때는 Axios를 사용할 수 있는 상황에서는 가급적 Axios를 사용하자
// 하지만 레거시 코드들의 경우 Ajax를 통해 구현이 된 경우도 존재하기에 알고는 있자

// 서버로 데이터 전송시 query string 혹은 URL parameter를 사용할 수 있는데, 이 경우 민감한 정보를 송수신하는데는 사용하지 말도록 한다.

"use client";

import Link from "next/link";

export default function ListItem({ result }) {
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
            onClick={() => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[index]._id,
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log(`result : ${result[index]._id}`);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}>
            🗑️
          </span>
        </div>
      ))}
    </div>
  );
}


// Ajax의 경우 Axios에 비교하여 자원 소모를 덜 하는 저수준 방식이지만 코드가 길어지고 Axios에 비교해서 유용한 기능이 적기에 왠만하면 Axios를 사용하자
// Axios의 단점이라고 한다면 비교적 고수준이기 때문에 자원소모가 더 들어가고 번들의 크기도 늘어나지만 보안과 에러처리등 유용한 기능들을 제공해주니
// 기본적으로 개발을 할때는 Axios를 사용할 수 있는 상황에서는 가급적 Axios를 사용하자
// 하지만 레거시 코드들의 경우 Ajax를 통해 구현이 된 경우도 존재하기에 알고는 있자
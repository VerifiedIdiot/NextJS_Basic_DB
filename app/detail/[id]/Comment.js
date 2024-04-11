"use client";
import { useEffect, useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetch(`/api/comment/list?parent_id=${props.parentId}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, [props.parentId]);

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>댓글목록</div>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <p key={index}>
              내용 : {item.content}{" "}
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                작성자 : {item.author}
              </span>
            </p>
          );
        })
      ) : (
        <p>댓글이없음</p>
      )}
       {props.loginSession ? (
        <>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={() => {
              console.log(comment);
              fetch("/api/comment/new", {
                method: "POST",
                body: JSON.stringify({
                  comment: comment,
                  parentId: props.parentId,
                }),
              })
                .then((r) => r.json())
                .then((newComment) => {
                  console.log(newComment);
                  setData([...data, newComment]);
                  setComment("");
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}>
            댓글전송
          </button>
          <div>좋아요 갯수 : {likeCount}<button onClick={() => {
            fetch("/api/like", {
              method: "POST",
              body: JSON.stringify({
                postId: props.parentId,
                userId: "currentUser", 
              }),
            })
              .then((r) => r.json())
              .then((response) => {
                if (response.success) {
                  setLikeCount(likeCount + 1);
                } else {
                  alert("이미 좋아요를 누르셨습니다.");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}> +</button></div>
        </>
      ) : null}
    </div>
  );
}

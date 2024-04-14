"use client";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  console.log(props.loginSession);

  useLayoutEffect(() => {
    fetch(`/api/comment/list?parent_id=${props.parentId}`)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });

    
    fetch(`/api/comment/like?postId=${props.parentId}`)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
        setLikeCount(result.likeCount);
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
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
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
          <div>
            좋아요 갯수 : {likeCount}
            <button
              onClick={() => {
                fetch("/api/comment/newLike", {
                  method: "POST",
                  body: JSON.stringify({
                    postId: props.parentId,
                    userId: props.loginSession.user._id
                  }),
                })
                  .then((r) => r.json())
                  .then((response) => {
                    if (response.success) {
                      setLikeCount(prevCount => prevCount + 1);
                    } else {
                      alert(response.error);
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}>
              {" "}
              +
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default async function Edit() {
    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="어쩌구" method="POST">
          <input name="title" />
          <input name="content" />
          <button type="submit">전송</button>
        </form>
      </div>
    )
  } 
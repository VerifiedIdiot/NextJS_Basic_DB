export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="이름" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비번" />
        <input name="image" type="hidden" value="none" />
        <button type="submit">id/pw 가입요청</button>
      </form>
    </div>
  );
}

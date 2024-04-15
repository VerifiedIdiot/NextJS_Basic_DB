import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase 앱 초기화는 이미 완료된 상태라고 가정
const auth = getAuth();

export default function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 성공
      const user = userCredential.user;
      console.log("Logged in as:", user.uid);
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
}

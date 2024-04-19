// Firebase 설정 파일을 가져옵니다.
import { firebaseClient } from './firebaseConfig';
// Firebase Storage 라이브러리를 가져옵니다.
import { getStorage } from 'firebase/storage';

// Firebase Storage 인스턴스를 초기화합니다.
const fireStorage = getStorage(firebaseClient);
export default fireStorage;


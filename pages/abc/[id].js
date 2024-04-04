export default function handler(req, res) {
    // 상태 코드에 따라 다른 메시지와 HTTP 상태 코드를 반환하는 간단한 예시입니다.

    // GET 요청이 성공적으로 작동하였을 때
    if (req.method === 'GET') {
        console.log('GET 요청 성공');
        return res.status(200).json({ message: 'GET 요청 완료' });
    }
}
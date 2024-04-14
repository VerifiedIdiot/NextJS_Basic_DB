export default function handler(req, res) {
    // 상태 코드에 따라 다른 메시지와 HTTP 상태 코드를 반환하는 간단한 예시입니다.

    // GET 요청이 성공적으로 작동하였을 때
    if (req.method === 'GET') {
        console.log('GET 요청 성공');
        return res.status(200).json({ message: 'GET 요청 완료' });
    }
    // POST 요청이 성공적으로 작동하였을 때
    if (req.method === 'POST' && !req.body.data) {
        console.log('POST 요청 성공');
        return res.status(200).json({ message: 'POST 요청 완료' });
    }

    // 요청 데이터가 잘못되었을 때 (예: 필수 입력 데이터 누락)
    if (req.method === 'POST' && !req.body.data) {
        console.log('POST 요청 데이터 오류');
        return res.status(400).json({ error: '데이터가 필요합니다' });
    }

    // 요청된 리소스를 찾을 수 없을 때
    if (req.method === 'GET' && req.query.id === 'unknown') {
        console.log('리소스를 찾을 수 없음');
        return res.status(404).json({ error: '리소스를 찾을 수 없습니다' });
    }

    // DELETE 요청 처리
    if (req.method === 'DELETE') {
        if (req.body.id) {
            console.log('DELETE 요청 성공');
            return res.status(200).json({ message: `ID ${req.body.id}의 리소스 삭제 완료` });
        } else {
            console.log('DELETE 요청 데이터 오류');
            return res.status(400).json({ error: 'DELETE 요청에 필요한 ID가 누락되었습니다' });
        }
    }

    // PUT 요청 처리
    if (req.method === 'PUT') {
        if (req.body.data) {
            console.log('PUT 요청 성공');
            return res.status(200).json({ message: 'PUT 요청 완료', data: req.body.data });
        } else {
            console.log('PUT 요청 데이터 오류');
            return res.status(400).json({ error: 'PUT 요청에 필요한 데이터가 누락되었습니다' });
        }
    }



    // 서버 내부 오류가 발생했을 때
    console.log('서버 오류');
    return res.status(500).json({ error: '서버 내부 오류가 발생했습니다' });
}


// 아래의 코드가 가장 간단하게 http 응답을 처리하는 방식이나 추후에 각 요청상태에 따라서 알림/경고 페이지를 보여주는게 보편적이기 때문에 고도화 하였음

// export default function handler(요청, 응답) {
//     console.log(123)
//   }
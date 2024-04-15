import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // 이름, 이메일, 비밀번호 빈 값 검사
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        // 비밀번호 길이 검사
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 데이터베이스 연결 및 유저 데이터 삽입
        const db = (await connectDB).db('my_mongo_db');
        const user = await db.collection('users').findOne({ email });

        // 이메일 중복 검사
        if (user) {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        // 회원가입 데이터베이스에 삽입
        await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            role: 'normal',
        });

        // 성공 응답
        res.status(200).json({ message: 'Registration successful' });
    } else {
        // POST 메소드가 아닌 경우 에러 처리
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

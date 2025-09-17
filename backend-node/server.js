const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, Book } = require('./models');
const apiRoutes = require('./routes');

const app = express();

// 미들웨어 설정
// app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 본문 파싱

// 정적 파일 서빙 (React/Vue 빌드 결과물)
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

// API 라우트 등록
app.use('/api', apiRoutes);

// SPA를 위한 Catch-all 라우트 (API 라우트 다음에 위치해야 함)
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 데이터베이스 초기화 및 샘플 데이터 생성
const initializeDatabase = async () => {
    try {
        // 테이블 생성 (force: true는 기존 테이블을 삭제하고 다시 만듦 - 개발용)
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');

        // 샘플 데이터가 없으면 생성
        const count = await Book.count();
        if (count === 0) {
            const sampleBooks = Array.from({ length: 23 }, (_, i) => ({
                title: `Book ${i + 1}`,
                author: `Author ${i + 1}`,
                quantity: (i % 5) + 1,
            }));
            await Book.bulkCreate(sampleBooks);
            console.log('Sample books have been created.');
        }
    } catch (error) {
        console.error('Unable to initialize the database:', error);
    }
};

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await initializeDatabase();
});
const express = require('express');
const { Op } = require('sequelize');
const rateLimit = require('express-rate-limit');
const { Book } = require('./models');

const router = express.Router();

// 📚 목록 조회 (GET /api/books)
const getBooksLimiter = rateLimit({
    windowMs: 60 * 1000, // 1분
    max: 30, // 30회 요청
    message: 'Too many requests, please try again later.',
});

router.get('/books', getBooksLimiter, async (req, res) => {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page, 10) || 1;
        const per_page = parseInt(req.query.per_page, 10) || 10;
        const offset = (page - 1) * per_page;

        const whereClause = search ? {
            [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } }, // iLike for case-insensitive search
                { author: { [Op.iLike]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await Book.findAndCountAll({
            where: whereClause,
            limit: per_page,
            offset: offset,
            order: [['id', 'ASC']] // 정렬 순서 보장
        });

        res.json({
            books: rows,
            total: count,
            page: page,
            pages: Math.ceil(count / per_page)
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 📖 단일 책 조회 (GET /api/books/:bookId)
router.get('/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ➕ 책 추가 (POST /api/books)
router.post('/books', async (req, res) => {
    try {
        const { title, author, quantity } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required.' });
        }
        const newBook = await Book.create({ title, author, quantity });
        res.status(201).json({ message: 'Book added successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔄 책 수정 (PUT /api/books/:bookId)
router.put('/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        await book.update(req.body); // 요청 본문에 있는 필드만 업데이트
        res.json({ message: 'Book updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 🗑️ 책 삭제 (DELETE /api/books/:bookId)
router.delete('/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({ error: '해당 책이 없습니다' }); // 원본 메시지 유지
        }
        await book.destroy();
        res.json({ message: '삭제 성공' }); // 원본 메시지 유지
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
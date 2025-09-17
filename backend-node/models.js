const { Sequelize, DataTypes } = require('sequelize');

// 데이터베이스 연결 설정
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3', // Flask와 동일한 DB 파일 사용
    logging: false // 콘솔에 SQL 쿼리 로그 끄기
});

// Book 모델 정의
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    // Sequelize는 기본적으로 테이블 이름을 복수형(Books)으로 만들지만,
    // Flask 예제와 동일하게 단수형 'Book'을 사용하려면 아래 옵션 추가
    freezeTableName: true, 
    timestamps: false // createdAt, updatedAt 컬럼 자동 생성 방지
});

module.exports = { sequelize, Book };
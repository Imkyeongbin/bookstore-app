from flask import Flask
from flask_cors import CORS
from models import db, Book
from routes import api_bp

app = Flask(__name__)
CORS(app)

# SQLite DB 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DB와 라우트 등록
db.init_app(app)
app.register_blueprint(api_bp, url_prefix='/api')

@app.before_first_request
def create_tables():
    db.create_all()

    # 책 테이블에 데이터가 없을 경우만 더미 데이터 추가
    if Book.query.first() is None:
        sample_books = [
            Book(title=f"Book {i+1}", author=f"Author {i+1}", quantity=(i % 5) + 1)
            for i in range(23)
        ]
        db.session.add_all(sample_books)
        db.session.commit()



if __name__ == "__main__":
    app.run(debug=True)

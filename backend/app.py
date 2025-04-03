import os
from flask import Flask, render_template
from flask_cors import CORS
from models import db, Book
from routes import api_bp, cache, limiter  # cache도 import
from dotenv import load_dotenv  # ✅ 추가

load_dotenv()  # ✅ .env 로드

app = Flask(__name__, static_folder="dist/assets", template_folder="dist")
# ✅ 여기에 정확히 프론트 주소만 허용
# CORS(app, origins=["https://bookstore-app-fe.onrender.com"])
# frontend_origin = os.environ.get("FRONTEND_ORIGIN", "").strip()  # 👈 줄바꿈 제거
# CORS(app, origins=[frontend_origin])
CORS(app)
# ✅ 기본 라우트 추가 (Render 헬스 체크용 등)

# ✅ 이 라우트는 정적 파일 요청 이후에 매칭되게 해야 함
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return render_template("index.html")


# ✅ 캐시 설정 추가
app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # 기본 캐시 시간 (초)

# ✅ 캐시 초기화
cache.init_app(app)

# Limiter 초기화
limiter.init_app(app)

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

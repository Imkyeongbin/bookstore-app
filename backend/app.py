import os
from flask import Flask, render_template
from flask_cors import CORS
from models import db, Book
from routes import api_bp, limiter  # ✅ cache 제거
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="dist/assets", template_folder="dist")

# CORS 설정 (원래 특정 도메인만 허용하는 게 더 좋음)
CORS(app)

# ✅ 기본 라우트
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return render_template("index.html")

# Limiter 초기화
limiter.init_app(app)

# SQLite 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DB & API 라우트 등록
db.init_app(app)
app.register_blueprint(api_bp, url_prefix='/api')

@app.before_first_request
def create_tables():
    db.create_all()

    if Book.query.first() is None:
        sample_books = [
            Book(title=f"Book {i+1}", author=f"Author {i+1}", quantity=(i % 5) + 1)
            for i in range(23)
        ]
        db.session.add_all(sample_books)
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)

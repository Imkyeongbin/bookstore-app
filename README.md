## 📚 Bookstore App
책 목록을 관리하고 검색, 등록, 수정, 삭제할 수 있는 간단한 웹 애플리케이션입니다.
Vue 3 + TypeScript 프론트엔드와 Flask 백엔드와 SQLite 데이터베이스 혹은 JAVA 백엔드와 H2 데이터베이스로 구성되어 있습니다.

### 🔧 기술 스택
Frontend

Vue 3 + Vite

TypeScript

Axios

Vue Router

Backend

Flask

Flask-SQLAlchemy

Flask-Limiter

Flask-CORS

### 📦 프로젝트 구조

bookstore-app/

├── frontend/           # Vue + Vite 프론트엔드

├── backend/            # Flask 백엔드

│   ├── app.py

│   ├── models.py

│   ├── routes.py

│   ├── db.sqlite3

│   └── ...
├── backend-java/src/main
        │  │          └─dev
        │  │              └─kyeongbin
        │  │                  └─bookstore
        │  │                      └─backend
        │  │                          ├─controller
        │  │                          ├─dto
        │  │                          ├─model
        │  │                          ├─repository
        │  │                          ├─service
        │  │                          └─util

## 🚀 설치 및 실행

### 📁 1. 레포 클론

git clone https://github.com/yourname/bookstore-app.git
cd bookstore-app
### 🧱 2. 백엔드 실행 (Flask)(Python 3.8버전을 권장합니다.)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

#### 환경 변수 필요시 .env 파일 생성
export FLASK_APP=app.py
export FLASK_ENV=development

#### 실행 (개발용)
python app.py

#### 또는 배포용 Gunicorn 실행
gunicorn app:app --bind 0.0.0.0:8080
기본 SQLite 데이터베이스는 앱 최초 실행 시 자동 생성되며 더미 데이터도 함께 삽입됩니다.

### 🌐 3. 프론트엔드 실행 (Vue + Vite) (Node 16 버전을 권장합니다. )

cd frontend
npm install

#### .env 파일 작성 (예:)
echo "VITE_API_URL=http://localhost:8080" > .env

#### 개발 서버 실행
npm run dev
접속: http://localhost:5173

###🏗️ 빌드 및 배포
####📦 프론트엔드 빌드

cd frontend
npm run build
dist/ 폴더를 Flask backend/dist/ 경로로 복사

Flask에서 static 파일을 제공하도록 설정되어 있어야 함:

이후
`python app.py`

혹은

`gunicorn app:app --bind 0.0.0.0:8080` 

명령으로 플라스크 백엔드를 실행시켜 확인하도록 합니다.
### 4. 백엔드 테스트
/backend에서

`pytest`


### ✏️ 주요 기능
책 목록 조회 (페이지네이션 + 검색)

책 상세 보기

책 등록 / 수정 / 삭제

프론트엔드 + 백엔드 완전 분리 가능 (Render 등으로 배포 가능)

### ⚠️ 참고 사항
프론트와 백이 다른 도메인에 있을 경우 CORS 설정 필수

.env 파일은 Git에 올리지 않도록 .gitignore 설정 필요

API 호출 주소는 .env에서 VITE_API_URL로 정의

### 📄 라이선스
MIT License
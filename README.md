# 📚 Bookstore App
책 목록을 관리하고 검색, 등록, 수정, 삭제할 수 있는 간단한 웹 애플리케이션입니다.
Vue 3 + TypeScript 프론트엔드와 Java/Spring Boot 백엔드, H2 데이터베이스로 구성되어 있습니다.

***
# 🔧 기술 스택 (Tech Stack)

##  Frontend

| 기술 | 설명 |
| :--- | :--- |
| **Vue 3 + Vite** | 반응형 사용자 인터페이스(UI) 구축을 위한 프레임워크 및 빌드 도구 |
| **TypeScript** | 정적 타입을 지원하여 코드 안정성을 높이는 JavaScript의 상위 집합 언어 |
| **Axios** | 브라우저와 Node.js를 위한 Promise 기반의 HTTP 클라이언트 |
| **Vue Router** | Vue.js를 위한 공식 라우팅 라이브러리 |

## Backend

| 기술 | 설명 |
| :--- | :--- |
| **Java 21** | 애플리케이션 개발에 사용된 주력 프로그래밍 언어 |
| **Spring Boot** | 애플리케이션의 기반이 되는 핵심 프레임워크 |
| **Spring Data JPA** | 데이터베이스 작업을 위한 ORM 기술 |
| **H2 Database** | 파일 기반의 경량 데이터베이스 |
| **Spring Web (MVC)** | REST API 엔드포인트 구축 및 웹 기능 제공 |
| **Bucket4j** | API 요청 횟수 제한(Rate Limiting) 라이브러리 |
| **Lombok** | 반복적인 자바 코드를 줄여주는 유틸리티 |
| **Embedded Tomcat**| 내장형 웹 애플리케이션 서버 (별도 설치 없이 실행 가능) |

***
### 📦 프로젝트 구조
```
bookstore-app/
├── frontend/             # Vue + Vite 프론트엔드
└── backend-java/         # Java + Spring Boot 백엔드
├── build.gradle
└── src/main/
├── java/
│   └── dev/kyeongbin/bookstore/backend/
│       ├── controller/
│       ├── model/
│       ├── repository/
│       ├── service/
│       └── ...
└── resources/
├── application.yml
└── static/
```

***
## 🚀 설치 및 실행

### 1. 레포지토리 클론

git clone [https://github.com/imkyeongbin/bookstore-app.git](https://github.com/imkyeongbin/bookstore-app.git)
cd bookstore-app
2. 백엔드 실행 (Java + Spring Boot)
요구사항: JDK 21 이상 설치 필요

```
cd backend-java
```
개발용 서버 실행
아래 명령어로 Spring Boot 개발 서버를 실행합니다.


# Windows
```
gradlew bootRun
```
# macOS / Linux
```
./gradlew bootRun
```
서버는 기본적으로 8080번 포트에서 실행되며, H2 데이터베이스 파일(db.mv.db)과 초기 데이터는 앱 최초 실행 시 자동으로 생성됩니다.

H2 콘솔 접속: http://localhost:8080/h2-console

3. 프론트엔드 실행 (Vue + Vite)
요구사항: Node.js 16 이상 설치 필요


```
cd frontend
npm install
```

API 서버 주소 설정
.env 파일을 생성하여 Vue 앱이 호출할 백엔드 API 주소를 지정합니다.



# .env 파일 생성
echo "VITE_API_BASE_URL=http://localhost:8080" > .env
Vue 코드 내에서 VITE_API_BASE_URL 환경 변수를 사용하여 API를 호출해야 합니다. (예: axios.get(${import.meta.env.VITE_API_BASE_URL}/api/books))

개발 서버 실행

```
npm run dev
```

프론트엔드 접속: http://localhost:5173 (또는 터미널에 표시된 다른 포트)

🏗️ 빌드 및 배포 (단일 파일)
프론트엔드와 백엔드를 하나의 실행 가능한 .jar 파일로 묶어 배포하는 방법입니다.

1. 프론트엔드 빌드
frontend 디렉토리에서 빌드 명령을 실행하면 dist 폴더가 생성됩니다.


```
cd frontend
npm run build
```

2. 빌드 결과물 백엔드로 복사
frontend/dist/ 폴더를 backend-java/src/main/resources/static/ 폴더로 복사합니다.

3. 백엔드 빌드
backend-java 디렉토리에서 실행 가능한 .jar 파일을 빌드합니다.



```
cd backend-java
gradlew build
```

4. 배포 및 실행
build/libs/ 폴더에 생성된 .jar 파일을 서버로 옮긴 후 아래 명령어로 실행합니다.


```
java -jar build/libs/bookstore-backend-0.0.1-SNAPSHOT.jar
```

이제 http://[서버 IP]:8080으로 접속하면 프론트엔드와 백엔드가 모두 동작하는 것을 확인할 수 있습니다.

✏️ 주요 기능
책 목록 조회 (페이지네이션 + 검색)

책 상세 보기

책 등록 / 수정 / 삭제

프론트엔드 + 백엔드 통합 배포 가능

⚠️ 참고 사항
개발 중에는 CORS 문제가 발생하지 않도록 백엔드에 관련 설정을 추가해야 할 수 있습니다.

.env 파일과 db.mv.db 파일은 Git에 올리지 않도록 .gitignore에 추가하는 것을 권장합니다.
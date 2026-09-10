# 📈 CONSENSUS - 가톨릭대학교 금융학회 공식 웹플랫폼

> **"One Consensus, Own Consensus"**  
> 가톨릭대학교 금융학회 CONSENSUS의 공식 웹사이트로, 학회 소개, 리서치 리포트 발간, 신입 학회원 모집 및 조직 정보를 제공하는 통합 플랫폼입니다.

---

## 🛠 Tech Stack

### Frontend
- **Framework / Library**: React (Vite), JavaScript (ES6+)
- **Styling**: Vanilla CSS, Pretendard Design System
- **Interactive UI**: Three.js, Vanta.js (3D & Visual Effects)
- **HTTP Client**: Axios

### Backend
- **Framework**: Java 17, Spring Boot 3.x
- **Security**: Spring Security
- **Database / ORM**: MySQL, Spring Data JPA
- **Notification**: Discord Webhook Integration

---

## ✨ Key Features

1. **학회 소개 (About & Members)**
   - 학회 비전, 기업리서치(Valuation) 및 매크로 컨센서스 트랙 커리큘럼 소개
   - 5기 임원진 조직도 및 부서별(기업리서치부, 매크로컨센서스부, 투자심의위원회) 주요 역할 안내

2. **프로젝트 리포트 관리 (Project Reports)**
   - 기업 분석, 매크로 하우스뷰 및 투자운용결과보고서 조회
   - 카테고리별 / 정렬 기준별(최신순, 조회수순, 수상작순) 필터링
   - PDF / DOCX 리포트 다운로드 및 조회수 집계
   - **운영진 전용 모달**: 비밀키 인증 기반 리포트 업로드 및 삭제 기능

3. **신입 학회원 모집 (Join Us)**
   - 리크루팅 타임라인 및 자주 묻는 질문(FAQ) 아코디언 제공
   - 공식 5기 입회 신청서 양식 다운로드

4. **보안 및 시스템 안정성 (Security & Safety)**
   - **API 인가 제어**: CUD(`POST`, `PUT`, `DELETE`) 요청에 대한 운영진 전용 Header(`X-Executive-Key`) 인증 필터 적용
   - **업로드 파일 검증**: 확장자 화이트리스트 검증(PDF, DOCX, PPTX 등) 및 50MB 용량 제한, Directory Traversal 방어
   - **CORS 설정**: 허용된 도메인(Local / Vercel 배포 영역) 기반 출처 보안 강화
   - **환경변수 분리**: DB 접속 정보 및 운영진 암호, Webhook URL 등 환경변수(`application.yml`) 분리 관리

---

## 🚀 Environment Variables Setup

백엔드 실행 시 필요한 환경변수 설정입니다.

```env
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQL_DATABASE=consensus
MYSQLUSER=root
MYSQLPASSWORD=your_password
EXECUTIVE_SECRET_KEY=your_executive_secret_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

---

## 💻 Local Development Setup

### Backend (Spring Boot)
```bash
./gradlew bootRun
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
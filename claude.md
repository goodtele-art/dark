# 다크 테트라드(Dark Tetrad) 검사 웹앱

## 프로젝트 개요

상담자를 위한 교육용 다크 테트라드 성격 검사 웹 애플리케이션입니다. 사용자가 타당화한 한국어판 검사지를 사용하여, 검사 실시부터 점수 계산, 시각화, AI 기반 해석까지 제공하는 통합 서비스입니다.

### 핵심 특징

- **모바일 우선 설계**: 강의장 환경에서 참가자들이 스마트폰으로 실시
- **이중 T점수 시스템**: 규준 데이터 + 실시자 누적 데이터 기반 비교
- **두 가지 해석 방식**: AI 맞춤 해석 vs 일반 해석
- **실시간 데이터 수집**: 강의 중 참가자 데이터를 수집하여 심리검사 교육 자료로 활용

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (반응형 그래프)
- **State Management**: React Hooks + Session Storage

### Backend
- **API Routes**: Next.js API Routes
- **Database**: Vercel Postgres (예정)
- **AI**: Claude API (Anthropic) - 맞춤 해석용
- **Security**: bcrypt (암호 해싱)

### Deployment
- **Platform**: Vercel
- **Validation**: Zod

## 검사 구성

### 문항 구성 (총 23문항)
- **Mach (마키아벨리즘)**: 6문항
- **Narc (나르시시즘)**: 6문항
- **Psyc (사이코패시)**: 6문항
- **Sadi (사디즘)**: 5문항

### 응답 방식
- **척도**: 5점 리커트 척도 (1: 전혀 아니다 ~ 5: 매우 그렇다)
- **표시 방식**: 한 페이지에 6개, 6개, 6개, 5개씩 표시 (총 4페이지)
- **질문 순서**: 각 영역에서 번갈아가면서 출제 (영역 표시 없음)
  - 순서: Mach1 → Narc1 → Psyc1 → Sadi1 → Mach2 → Narc2 → ...

## 프로젝트 구조

```
DARK_TETRAD/
├── app/                           # Next.js App Router
│   ├── page.tsx                   # 랜딩: 검사 시작 / 재조회
│   ├── test/
│   │   ├── page.tsx              # 인구통계 정보 입력
│   │   └── questions/page.tsx    # 23문항 검사 (4페이지)
│   ├── information/page.tsx       # 추가 정보 입력 + 해석 방식 선택
│   ├── result/[id]/page.tsx      # 결과 표시
│   ├── retrieve/page.tsx          # 재조회 (예정)
│   └── api/                       # API Routes (예정)
│       ├── test/submit/route.ts   # 검사 결과 저장
│       ├── test/retrieve/route.ts # 결과 조회
│       └── interpret/route.ts     # Claude API 호출
├── components/                    # React 컴포넌트
│   ├── ScoreChart.tsx            # Recharts 그래프 (4개 척도)
│   └── InterpretationSection.tsx # 척도별 해석 표시
├── lib/                          # 핵심 로직
│   ├── types.ts                  # TypeScript 타입 정의
│   ├── questions.ts              # 23개 문항 데이터
│   ├── scoring.ts                # T점수, 백분위 계산
│   ├── interpretations.ts        # 척도별 기본 해석
│   ├── generalInterpretations.ts # 일반 해석 (나이/성별/T점수 기반)
│   ├── db.ts                     # DB 연결 (예정)
│   └── claude.ts                 # Claude API 통합 (예정)
├── utils/                        # 유틸리티
│   ├── validation.ts             # Zod 스키마 (예정)
│   └── password.ts               # bcrypt 해싱 (예정)
├── public/
│   └── norm-data.csv             # 규준 데이터 (사용자 제공)
└── scripts/
    └── init-db.sql               # DB 초기화 스크립트 (예정)
```

## 주요 기능

### 1. 검사 플로우

#### 1.1 랜딩 페이지 (/)
- "검사 시작하기" 버튼
- "이전 결과 조회하기" 버튼

#### 1.2 인구통계 정보 입력 (/test)
- 성별 선택 (남성/여성)
- 나이 입력
- 암호 설정 (결과 재조회용)
- 모바일 최적화된 큰 터치 영역

#### 1.3 검사 진행 (/test/questions)
- **4페이지 구성**:
  - 페이지 1: 문항 1-6
  - 페이지 2: 문항 7-12
  - 페이지 3: 문항 13-18
  - 페이지 4: 문항 19-23
- 각 문항은 1-5 버튼으로 가로 배치
- 응답한 문항은 체크 표시
- 진행률 표시 (응답 완료 개수 / 전체 문항)
- 현재 페이지 모든 문항 응답 필수
- 세션 스토리지에 자동 저장 (페이지 새로고침 대비)

#### 1.4 추가 정보 입력 (/information)
- **안내 문구** (파란색 박스, 맨 위 배치)
- **입력 필드** (선택사항):
  - 성격 특성
  - 성장 과정
  - 스트레스 요인
  - 기타 정보
- **두 가지 해석 방식 선택**:
  - 🤖 **내 정보로 해석하기** (보라색 버튼)
    - 입력한 정보를 Claude API에 전달
    - AI 기반 맞춤 해석 생성
  - 📊 **일반적인 해석하기** (파란색 버튼)
    - API 호출 없음
    - 나이/성별/T점수에 따른 사전 정의된 해석 제공

#### 1.5 결과 표시 (/result/[id])
- **원점수 요약**: 4개 척도별 점수 (Mach, Narc, Psyc, Sadi)
- **T점수 그래프** (Recharts):
  - 규준 기반 T점수 (파란색)
  - 누적 데이터 기반 T점수 (주황색)
  - 기준선: T=40 (낮음), T=50 (평균), T=60 (높음)
- **척도별 해석**:
  - T점수, 백분위
  - 기본 해석 (T점수 구간별)
  - 상담자 주의사항
- **AI 맞춤 해석** (선택 시):
  - Claude API 기반 종합 해석
  - 개인 정보와 검사 결과 통합 분석
- **주의사항** (노란색 박스)
- **액션 버튼**:
  - 처음으로 돌아가기
  - 결과 인쇄하기

### 2. T점수 계산 로직

#### 2.1 원점수 계산
```typescript
rawScores = {
  mach: sum(dtmc1 ~ dtmc6),  // 최대 30점
  narc: sum(dtnc1 ~ dtnc6),  // 최대 30점
  psyc: sum(dtps1,2,3,5,6,7), // 최대 30점
  sadi: sum(dtsd1,2,3,5,6)    // 최대 25점
}
```

#### 2.2 규준 기반 T점수
```typescript
// norm-data.csv에서 평균(M), 표준편차(SD) 계산
T = 50 + 10 * (X - M) / SD
```

#### 2.3 누적 데이터 기반 T점수
```typescript
// test_results 테이블에서 실시자 데이터 통계 계산
// 동일 공식 적용
// 데이터 부족 시 (N < 30) 규준 데이터 사용
```

#### 2.4 백분위 계산
```typescript
percentile = (해당 점수 이하 인원 / 전체 인원) * 100
```

### 3. 해석 시스템

#### 3.1 일반 해석 (generalInterpretations.ts)
- **T점수 5단계 구간**:
  - T < 30: 매우 낮음
  - 30 ≤ T < 40: 낮음
  - 40 ≤ T ≤ 60: 평균
  - 60 < T ≤ 70: 높음
  - T > 70: 매우 높음
- **맥락적 해석**:
  - 기본 해석
  - 성별 맥락 (남성/여성)
  - 연령대 맥락 (청소년/청년/중년/노년)
- **각 척도별 세부 해석**:
  - 마키아벨리즘: 전략적 사고와 조작 경향
  - 나르시시즘: 자기 과대평가와 인정 욕구
  - 사이코패시: 충동성과 규칙 위반
  - 사디즘: 타인의 고통에서 느끼는 즐거움

#### 3.2 AI 맞춤 해석 (예정)
- Claude API 활용
- 프롬프트 구성:
  - 검사 결과 (4개 척도 T점수, 백분위)
  - 내담자 정보 (나이, 성별, 성격, 성장과정, 스트레스)
- 출력:
  - 종합적 성격 특성
  - 내담자 정보와 검사 결과의 연관성
  - 상담 시 주의점 및 접근 방향
  - 강점과 발전 가능한 영역

## 데이터베이스 설계 (예정)

### test_results 테이블
```sql
CREATE TABLE test_results (
  id SERIAL PRIMARY KEY,
  password_hash VARCHAR(255) NOT NULL,
  gender SMALLINT NOT NULL,  -- 1: 남성, 2: 여성
  age INTEGER NOT NULL,
  age_group VARCHAR(20),     -- youth, young_adult, middle_age, senior

  -- 23개 문항 응답 (1-5)
  dtmc1 SMALLINT, dtmc2 SMALLINT, ..., dtsd6 SMALLINT,

  -- 원점수
  mach_raw_score INTEGER,
  narc_raw_score INTEGER,
  psyc_raw_score INTEGER,
  sadi_raw_score INTEGER,

  -- 규준 기반 T점수
  mach_t_norm DECIMAL(5,2),
  narc_t_norm DECIMAL(5,2),
  psyc_t_norm DECIMAL(5,2),
  sadi_t_norm DECIMAL(5,2),

  -- 누적 기반 T점수
  mach_t_cumulative DECIMAL(5,2),
  narc_t_cumulative DECIMAL(5,2),
  psyc_t_cumulative DECIMAL(5,2),
  sadi_t_cumulative DECIMAL(5,2),

  -- 백분위
  mach_percentile INTEGER,
  narc_percentile INTEGER,
  psyc_percentile INTEGER,
  sadi_percentile INTEGER,

  -- 추가 정보 (AI 해석용)
  personality_description TEXT,
  growth_background TEXT,
  stress_factors TEXT,
  other_info TEXT,

  -- 해석
  interpretation_type VARCHAR(20),  -- 'ai' or 'general'
  ai_interpretation TEXT,

  -- 메타데이터
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### norm_data 테이블
```sql
CREATE TABLE norm_data (
  id SERIAL PRIMARY KEY,
  gender SMALLINT,
  age INTEGER,
  age_group VARCHAR(20),

  -- 23개 문항 응답
  dtmc1 SMALLINT, dtmc2 SMALLINT, ..., dtsd6 SMALLINT,

  -- 원점수
  mach_raw_score INTEGER,
  narc_raw_score INTEGER,
  psyc_raw_score INTEGER,
  sadi_raw_score INTEGER
);
```

## 구현 상태

### ✅ 완료된 기능
- [x] Next.js 프로젝트 초기화
- [x] TypeScript 타입 정의 (lib/types.ts)
- [x] 23개 검사 문항 작성 및 순서 섞기 (lib/questions.ts)
- [x] 랜딩 페이지 (app/page.tsx)
- [x] 인구통계 정보 입력 (app/test/page.tsx)
- [x] 검사 문항 페이지 - 4페이지 구성 (app/test/questions/page.tsx)
- [x] 추가 정보 입력 + 해석 방식 선택 (app/information/page.tsx)
- [x] 결과 페이지 (app/result/[id]/page.tsx)
- [x] T점수 계산 로직 (lib/scoring.ts)
- [x] 기본 해석 (lib/interpretations.ts)
- [x] 일반 해석 시스템 (lib/generalInterpretations.ts)
- [x] ScoreChart 컴포넌트 (Recharts)
- [x] InterpretationSection 컴포넌트
- [x] 규준 데이터 파일 복사 (public/norm-data.csv)
- [x] 세션 스토리지 기반 데이터 관리
- [x] **세션 스토리지 초기화** - 검사 시작 시 이전 데이터 자동 삭제
- [x] **다크 테마 전체 적용** - 모든 페이지 및 컴포넌트에 우아한 다크 디자인 구현
- [x] **랜딩 페이지 subtitle 변경** - "건양대학교 대학원 세미나를 위해"

### 🚧 진행 중 / 예정
- [ ] Vercel Postgres 연동
- [ ] 데이터베이스 초기화 스크립트
- [ ] API Routes 구현
  - [ ] POST /api/test/submit
  - [ ] POST /api/test/retrieve
  - [ ] POST /api/interpret (Claude API)
- [ ] Claude API 통합 (lib/claude.ts)
- [ ] bcrypt 암호 해싱 (utils/password.ts)
- [ ] Zod 입력 검증 (utils/validation.ts)
- [ ] 결과 재조회 페이지 (app/retrieve/page.tsx)
- [ ] Vercel 배포
- [ ] PWA 기능 (선택사항)
- [ ] 관리자 대시보드 (선택사항)

## 모바일 최적화

### UI/UX 가이드라인
- **터치 영역**: 최소 44x44px
- **폰트 크기**: 본문 16px 이상, 제목 20-24px
- **줄 간격**: 1.5-1.6 (가독성)
- **레이아웃**: 단일 컬럼, 카드 기반 디자인
- **폼 입력**: 적절한 inputmode 설정
- **시각적 피드백**: 로딩, 에러, 성공 상태 명확히 표시

### 성능 목표
- **First Contentful Paint**: < 2초 (3G 환경)
- **Time to Interactive**: < 5초
- **번들 크기 최적화**: 트리 쉐이킹, 코드 분할

## 환경 변수

```bash
# .env.local
POSTGRES_URL="postgres://..."
ANTHROPIC_API_KEY="sk-ant-..."
NEXT_PUBLIC_APP_URL="https://dark-tetrad.vercel.app"
```

## 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 주요 파일 설명

### 1. lib/questions.ts
- 23개 검사 문항 정의
- 각 영역에서 번갈아가면서 출제되도록 순서 섞기
- 5점 리커트 척도 옵션 정의

### 2. lib/scoring.ts
- `calculateRawScores()`: 원점수 계산
- `calculateNormStatistics()`: 규준 데이터 통계 계산
- `calculateNormTScores()`: 규준 기반 T점수
- `calculateNormPercentiles()`: 규준 기반 백분위
- `calculateCumulativeTScores()`: 누적 데이터 기반 T점수
- `calculateCumulativePercentiles()`: 누적 데이터 기반 백분위

### 3. lib/interpretations.ts
- T점수 구간별 기본 해석
- 척도별 상담자 주의사항
- 해석 수준 판단 로직

### 4. lib/generalInterpretations.ts
- T점수 5단계 구간 정의
- 나이/성별 조합에 따른 맥락적 해석
- 각 척도별 세부 해석 (Mach, Narc, Psyc, Sadi)

### 5. components/ScoreChart.tsx
- Recharts 기반 바 차트
- 4개 척도 표시
- 규준 vs 누적 T점수 비교
- 기준선 표시 (T=40, 50, 60)

### 6. app/test/questions/page.tsx
- 4페이지 구성 (6, 6, 6, 5문항)
- 진행률 표시
- 세션 스토리지 자동 저장
- 페이지별 응답 완료 확인

### 7. app/information/page.tsx
- 추가 정보 입력 폼
- 두 가지 해석 방식 선택
- interpretationType 세션 저장

## 검증 계획

### 개발 중 검증
1. **T점수 계산 검증**: 샘플 데이터로 수동 계산 vs 코드 결과 비교
2. **DB 연결 확인**: Vercel Postgres 쿼리 테스트
3. **Claude API 테스트**: 프롬프트 품질 확인

### 배포 후 검증
1. **전체 플로우 테스트**: 검사 시작 → 결과 확인
2. **점수 정확성**: 규준 T점수와 누적 T점수 비교
3. **모바일 렌더링**: 실제 스마트폰 테스트 (iOS, Android)
4. **AI 해석 품질**: 다양한 점수 프로필로 테스트
5. **성능**: 3G 환경에서 로딩 시간 측정

## 보안 고려사항

- bcrypt 암호 해싱 (10 rounds)
- SQL Injection 방지 (파라미터화된 쿼리)
- 환경변수로 API 키 관리
- Rate limiting (API 남용 방지)
- 개인 식별 정보 최소화

## 라이선스

교육용 목적으로 제작되었습니다.

## 참고사항

- 본 검사는 상담 전문가를 위한 교육용 도구입니다.
- 검사 결과는 참고 자료로만 활용해야 합니다.
- 임상적 판단이 필요한 경우 반드시 전문가와 상담이 필요합니다.

---

## 📝 세션 인계 노트 (Session Handoff Notes)

### 최근 완료된 작업 (2026-02-10)

#### 1. 세션 스토리지 초기화 기능 구현
- **파일**: `app/test/page.tsx`
- **변경 내용**: 컴포넌트 마운트 시 useEffect를 통해 이전 검사 데이터 모두 삭제
- **삭제 항목**:
  - `testData` - 인구통계 정보
  - `testResponses` - 문항 응답
  - `additionalInfo` - 추가 정보
  - `interpretationType` - 해석 방식
- **목적**: 새로운 검사 시작 시 이전 검사의 브라우저 캐시가 남아있지 않도록 방지

```typescript
useEffect(() => {
  sessionStorage.removeItem("testData");
  sessionStorage.removeItem("testResponses");
  sessionStorage.removeItem("additionalInfo");
  sessionStorage.removeItem("interpretationType");
}, []);
```

#### 2. 전체 애플리케이션 다크 테마 재설계
사용자가 제공한 색상 팔레트(다크 그레이, 브라운, 베이지 톤)를 기반으로 모든 페이지와 컴포넌트를 우아한 다크 테마로 전면 재설계했습니다.

**업데이트된 파일 (총 7개)**:

##### 페이지 (5개)
1. **app/page.tsx** - 랜딩 페이지
   - 서브타이틀 변경: "건양대학교 대학원 세미나를 위해"
   - "Professional Assessment Tool" 배지 추가
   - 배경: `bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900`
   - 장식 요소: 앰버 색상의 블러 효과 원형 배경
   - 그라디언트 텍스트: `from-amber-200 via-amber-100 to-stone-200`
   - 카드: `from-stone-800/80 to-neutral-800/80` + `border-amber-500/20`

2. **app/test/page.tsx** - 검사 시작/인구통계 입력
   - 동일한 다크 배경 및 장식 요소
   - 폼 입력: `border-stone-600 bg-stone-900/50 text-stone-200`
   - 선택된 버튼: `border-amber-500 bg-amber-500/20 text-amber-200`
   - 제출 버튼: `bg-gradient-to-r from-amber-600 to-amber-500`

3. **app/test/questions/page.tsx** - 검사 문항
   - 고정 진행률 바: `bg-gradient-to-r from-stone-900/95 to-neutral-900/95`
   - 진행 바: `bg-gradient-to-r from-amber-600 to-amber-400`
   - 문항 번호: `bg-gradient-to-br from-amber-500 to-amber-600`
   - 선택된 응답: `border-amber-500 bg-gradient-to-br from-amber-600 to-amber-500`

4. **app/information/page.tsx** - 추가 정보 입력
   - AI 해석 버튼: `bg-gradient-to-r from-purple-600 to-purple-500` (보라색)
   - 일반 해석 버튼: `border-amber-500 bg-stone-900/50` (앰버 테두리)
   - 텍스트 영역: `border-stone-600 bg-stone-900/50 focus:border-amber-500`

5. **app/result/[id]/page.tsx** - 결과 페이지
   - "Assessment Result" 배지
   - 원점수 카드: `from-stone-900/50 to-neutral-900/50`
   - AI 해석 섹션: `from-purple-900/40 to-indigo-900/40`
   - 경고 섹션: `from-amber-900/30 to-amber-800/30`

##### 컴포넌트 (2개)
6. **components/ScoreChart.tsx** - 그래프
   - 차트 배경: 다크 톤으로 변경
   - 그리드: `stroke="#44403c"`
   - 축: `fill="#d6d3d1"`, `stroke="#57534e"`
   - 툴팁: `backgroundColor: "#292524"`
   - 바: 규준(`#f59e0b`), 누적(`#d97706`)
   - 기준선: 파란색(낮음), 초록색(평균), 빨간색(높음)

7. **components/InterpretationSection.tsx** - 척도별 해석
   - `getDarkLevelColor()` 함수로 레벨별 색상 배지
   - T점수 카드: `from-amber-900/30 to-amber-800/30`
   - 백분위 카드: `from-purple-900/30 to-purple-800/30`
   - 해석 섹션: `bg-stone-900/50 border-stone-700`

**디자인 특징**:
- **일관된 색상 팔레트**:
  - 베이스: slate-900, neutral-900, stone-900
  - 액센트: amber-500, amber-600 (주황/금색)
  - 보조: purple, green, blue, red (상태별)
- **그라디언트 효과**: 배경, 텍스트, 버튼에 부드러운 그라디언트 적용
- **투명도 활용**: `/80`, `/50`, `/30` 등으로 레이어드 효과
- **백드롭 블러**: `backdrop-blur-sm`로 깊이감 표현
- **장식 요소**: 블러 처리된 원형 배경, 그라디언트 바, 아이콘
- **시각적 피드백**: hover, active 상태의 부드러운 전환

### 현재 상태

#### 작동 중인 기능
✅ 프론트엔드 UI/UX 완전히 구현됨 (다크 테마)
✅ 23문항 검사 플로우 완료
✅ 세션 스토리지 기반 데이터 관리
✅ T점수 계산 로직 (규준 데이터 CSV 기반)
✅ 일반 해석 시스템 (5단계 T점수 구간)
✅ Recharts 그래프 시각화
✅ 모바일 반응형 디자인

#### 미구현 기능 (백엔드)
❌ 데이터베이스 연동 (Vercel Postgres)
❌ API Routes
❌ Claude API 통합 (AI 맞춤 해석)
❌ 암호 해싱 (bcrypt)
❌ 결과 재조회 기능

#### 현재 제한사항
⚠️ 모든 데이터는 세션 스토리지에만 저장 (브라우저 닫으면 사라짐)
⚠️ 결과 페이지 ID는 하드코딩 (`/result/1`)
⚠️ AI 해석은 표시되지 않음 (Claude API 미연동)
⚠️ 누적 T점수는 규준 T점수와 동일 (실제 누적 데이터 없음)

### 다음 단계 우선순위

#### Phase 1: 백엔드 인프라 (가장 시급)
1. **Vercel Postgres 설정**
   - Vercel 프로젝트 생성
   - Postgres 데이터베이스 연결
   - `lib/db.ts` 구현
   - 환경변수 설정 (`POSTGRES_URL`)

2. **데이터베이스 초기화**
   - `scripts/init-db.sql` 작성
   - `test_results` 테이블 생성
   - `norm_data` 테이블 생성
   - `public/norm-data.csv` 임포트

#### Phase 2: API Routes 구현
1. **POST /api/test/submit**
   - 검사 결과 수신
   - 원점수 계산
   - T점수/백분위 계산 (규준 + 누적)
   - 암호 해싱 (bcrypt)
   - DB 저장
   - 결과 ID 반환

2. **POST /api/test/retrieve**
   - ID + 암호 수신
   - 암호 검증
   - 저장된 결과 반환

3. **POST /api/interpret** (선택사항)
   - Claude API 호출
   - AI 맞춤 해석 생성
   - 결과에 저장

#### Phase 3: 프론트엔드 통합
1. **app/information/page.tsx 수정**
   - `handleAiInterpretation`: API 호출로 변경
   - `handleGeneralInterpretation`: API 호출로 변경
   - 로딩 상태 처리
   - 에러 처리

2. **app/result/[id]/page.tsx 수정**
   - 세션 스토리지 → API 조회로 변경
   - 동적 ID 처리
   - 로딩/에러 상태

3. **app/retrieve/page.tsx 생성**
   - ID + 암호 입력 폼
   - API 호출
   - 결과 페이지로 리다이렉트

#### Phase 4: Claude API 통합 (AI 해석)
1. **lib/claude.ts 구현**
   - Anthropic SDK 설치
   - API 키 설정 (`ANTHROPIC_API_KEY`)
   - 프롬프트 엔지니어링
   - 응답 파싱

2. **프롬프트 템플릿**
   - 검사 결과 (4개 척도 T점수, 백분위)
   - 내담자 정보 (나이, 성별, 추가 정보)
   - 상담자 관점의 해석 요청
   - 500-700자 제한

#### Phase 5: 보안 및 검증
1. **utils/password.ts 구현**
   - bcrypt 해싱
   - 암호 검증

2. **utils/validation.ts 구현**
   - Zod 스키마 정의
   - API 입력 검증

3. **보안 검토**
   - SQL Injection 방지
   - Rate limiting
   - 환경변수 보안

#### Phase 6: 배포 및 테스트
1. **Vercel 배포**
   - 환경변수 설정
   - 데이터베이스 마이그레이션
   - 프로덕션 빌드

2. **전체 테스트**
   - 검사 플로우 테스트
   - 모바일 디바이스 테스트
   - T점수 계산 정확성 검증
   - AI 해석 품질 확인

### 주요 코드 참조

#### 세션 스토리지 키
- `testData`: `{ gender: "1" | "2", age: string, password: string }`
- `testResponses`: `{ dtmc1: number, dtmc2: number, ..., dtsd6: number }`
- `additionalInfo`: `{ personality: string, growthBackground: string, stressFactors: string, otherInfo: string }`
- `interpretationType`: `"ai" | "general"`

#### T점수 계산 (lib/scoring.ts)
```typescript
// 규준 기반 T점수
T = 50 + 10 * (X - M) / SD

// M, SD는 norm-data.csv에서 계산
// calculateNormStatistics() 참조
```

#### 다크 테마 색상 팔레트
```css
/* 배경 */
bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900

/* 카드 */
bg-gradient-to-br from-stone-800/80 to-neutral-800/80
border border-amber-500/20

/* 텍스트 */
text-stone-300  /* 본문 */
text-amber-300  /* 레이블 */
bg-gradient-to-r from-amber-200 to-stone-200  /* 제목 */

/* 버튼 */
bg-gradient-to-r from-amber-600 to-amber-500  /* 주 액션 */
border-amber-500 bg-stone-900/50  /* 보조 액션 */

/* 입력 */
border-stone-600 bg-stone-900/50 text-stone-200
focus:border-amber-500
```

### 주의사항

1. **CSV 파일 인코딩**: `public/norm-data.csv`는 UTF-8 인코딩 필요
2. **T점수 계산**: 표준편차가 0이면 에러 처리 필요
3. **모바일 테스트**: 실제 디바이스에서 터치 영역 확인
4. **API 타임아웃**: Claude API 응답 시간 고려 (5-10초)
5. **에러 처리**: 모든 API 호출에 try-catch 및 사용자 친화적 에러 메시지
6. **세션 만료**: 장시간 방치 시 세션 스토리지 데이터 유지 여부 확인

### 테스트 데이터

개발 중 테스트를 위한 샘플 응답:
```typescript
// 모든 문항에 3 (보통)으로 응답
const testResponses = {
  dtmc1: 3, dtmc2: 3, dtmc3: 3, dtmc4: 3, dtmc5: 3, dtmc6: 3,
  dtnc1: 3, dtnc2: 3, dtnc3: 3, dtnc4: 3, dtnc5: 3, dtnc6: 3,
  dtps1: 3, dtps2: 3, dtps3: 3, dtps5: 3, dtps6: 3, dtps7: 3,
  dtsd1: 3, dtsd2: 3, dtsd3: 3, dtsd5: 3, dtsd6: 3
};
// 예상 원점수: Mach=18, Narc=18, Psyc=18, Sadi=15
// 예상 T점수: ~50 (평균)
```

### 문제 해결 가이드

#### 문제: 그래프가 표시되지 않음
- Recharts가 서버 사이드 렌더링에서 문제 발생 가능
- `"use client"` 지시어 확인
- 동적 임포트 고려

#### 문제: 세션 스토리지 데이터 손실
- 브라우저 개인정보 보호 모드 확인
- 로컬 스토리지로 변경 고려 (검사 중단 대비)

#### 문제: T점수가 비정상적으로 높거나 낮음
- norm-data.csv 데이터 확인
- 평균/표준편차 계산 로직 검증
- 원점수 계산이 올바른지 확인

#### 문제: 모바일에서 버튼 클릭이 어려움
- 터치 영역 44x44px 이상 확인
- CSS `padding` 증가
- 버튼 간 `gap` 확보

### 연락처 및 리소스

- **Next.js 공식 문서**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/en-US/
- **Anthropic API**: https://docs.anthropic.com/
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres

---

**마지막 업데이트**: 2026-02-10
**다음 세션 시작점**: Phase 1 - Vercel Postgres 설정 및 데이터베이스 초기화
**현재 개발 서버**: `http://localhost:3002` (npm run dev)

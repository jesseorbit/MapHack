# PRD: 정치인 포트폴리오 트래커 (가칭: 의원주식)

> 앱인토스 미니앱 | "오늘 가장 돈 번 정치인은 누구?"

---

## 1. 데이터 수급 전략

### 1-1. 한국 국회의원 데이터

| 소스 | 형태 | 주기 | 비고 |
|------|------|------|------|
| **공직윤리시스템 (peti.go.kr)** | 웹 공개 (PDF/HTML) | 정기 연1회(3월) + 수시 월1회 | 공식 1차 소스 |
| **뉴스타파 재산공개 DB (jaesan.newstapa.org)** | 구조화된 웹 데이터 | 연1회 업데이트 | 파싱 용이, 종목별 검색 가능 |
| **대한민국 전자관보 (gwanbo.go.kr)** | 관보 PDF | 수시 | 가장 빠른 공식 공개 채널 |

**수집 방식:**
```
[전자관보 PDF] → OCR/파싱 → 정규화 → DB 적재
[뉴스타파 DB] → 크롤링(연 1회 벌크) → 보조 데이터
[peti.go.kr] → 수시공개 모니터링 → 변동 감지 알림
```

**한계점 & 대응:**
- 한국은 실시간 거래 공시 의무 없음 (미국 STOCK Act와 다름)
- 연 1회 정기 + 월 1회 수시 → **"재산 변동 뉴스" 형태로 제공**
- 보유 종목 + 수량 변화 추적 가능, 매매 타이밍은 불명확

### 1-2. 미국 의회 데이터

| API | 무료 티어 | 커버리지 | 지연 |
|-----|-----------|----------|------|
| **Lambda Finance** | 100 req/월 | 상·하원 양원 | 수시간 내 |
| **Finnhub** | 60 calls/분 | 상·하원 | 1일 |
| **FMP (Financial Modeling Prep)** | 250 req/일 | Senate + House | 당일 |
| **Quiver Quantitative** | 웹 스크래핑 | 양원 | 당일 |

**추천 조합:**
```
Primary:  Lambda Finance /api/congressional/recent (정규화된 데이터, 무료)
Fallback: Finnhub congressional-trading endpoint
Bulk:     FMP senate-trading + house-disclosure (히스토리 백필)
```

**미국 데이터 장점:** STOCK Act에 의해 45일 내 공시 의무 → 준실시간 추적 가능

### 1-3. 데이터 파이프라인 아키텍처

```
┌─────────────────────────────────────────────────┐
│              Scheduler (Cron)                     │
│  - US: 매 6시간 Lambda/Finnhub 폴링             │
│  - KR: 매일 1회 전자관보 신규 공개 체크          │
└──────────────┬──────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────┐
│           ETL Worker (Supabase Edge Function)    │
│  - API 호출 / 크롤링                            │
│  - 종목 티커 정규화 (KR: KRX코드, US: ticker)   │
│  - 수익률 계산 (현재가 vs 공시 시점 가격)        │
└──────────────┬──────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────┐
│              Supabase PostgreSQL                  │
│  Tables:                                         │
│  - politicians (id, name, party, country, photo) │
│  - holdings (politician_id, ticker, shares, amt) │
│  - trades (politician_id, ticker, type, date)    │
│  - daily_pnl (politician_id, date, gain, rank)   │
└──────────────┬──────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────┐
│         미니앱 API (Supabase REST / RPC)         │
└─────────────────────────────────────────────────┘
```

---

## 2. 유저 플로우

```
[토스 앱 진입] → [미니앱 홈: 오늘의 랭킹]
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
     [일간 수익 TOP]  [인기 종목]  [국가 필터]
            │                       (KR / US)
            ▼
   [정치인 프로필 탭]
     - 보유 종목 리스트
     - 최근 매매 내역 (US)
     - 총 자산 변동 그래프
     - "이 포폴 따라하기" 버튼 → 종목 리스트 복사
            │
            ▼
   [종목 상세]
     - 누가 이 종목 보유 중?
     - 매수/매도 타임라인
     - 현재가 + 수익률
```

### 핵심 화면 (5개)

| # | 화면 | 설명 |
|---|------|------|
| 1 | **홈 (랭킹)** | 오늘 수익률 TOP 10 정치인 카드 리스트 |
| 2 | **정치인 프로필** | 보유 종목, PnL 그래프, 최근 거래 |
| 3 | **종목 허브** | 정치인들이 가장 많이 산/판 종목 |
| 4 | **알림 설정** | 특정 정치인 거래 시 푸시 (US만 가능) |
| 5 | **국가 전환** | KR 탭 / US 탭 토글 |

---

## 3. 앱인토스 최적화

### 기술 스택
```
Frontend: Next.js (앱인토스 권장) + TDS (Toss Design System)
Hosting:  <appName>.apps.tossmini.com
Backend:  Supabase (PostgreSQL + Edge Functions + Auth)
```

### 앱인토스 제약 준수
- **웹 기반 SPA** — 네이티브 기능 제한적, 웹뷰 최적화 필수
- **토스 로그인 연동** — `@anthropic-ai/sdk` 아님, 토스 SDK로 유저 식별
- **퍼포먼스** — FCP < 1.5s, 이미지 lazy load, ISR 활용
- **미니앱 가이드라인** 준수 (금융정보 제공 시 면책 문구 필수)

### 앱인토스 SDK 활용
```typescript
// 토스 미니앱 SDK
import { bridge } from '@anthropic-ai/sdk' // 아님!
import { TossMiniApp } from '@tosspayments/apps-in-toss-sdk'

// 공유 기능
TossMiniApp.share({ title: "펠로시 포폴 +23% 수익중", url: "..." })

// 토스 증권 딥링크 (종목 바로가기)
TossMiniApp.openExternal({ url: "supertoss://securities/stock/NVDA" })
```

---

## 4. 디자인 (토스 디자인 시스템)

### 컴포넌트 매핑

| 화면 요소 | TDS 컴포넌트 |
|-----------|--------------|
| 정치인 랭킹 카드 | `ListItem` + `Badge` + `Avatar` |
| 수익률 표시 | `Text` (color: semantic-positive/negative) |
| 국가 필터 탭 | `SegmentedControl` (KR \| US) |
| 종목 리스트 | `ListItem` with `trailing` price |
| PnL 차트 | 커스텀 (lightweight-charts or recharts) |
| CTA 버튼 | `Button` variant="primary" |
| 바텀 네비게이션 | `BottomNavigation` |

### 디자인 원칙
- **토스 톤앤매너**: 깔끔, 여백 충분, 숫자 강조
- **컬러**: 수익 `#00C853` / 손실 `#FF1744` / 배경 `#FFFFFF`
- **타이포**: 큰 숫자(수익률)는 Bold 24px, 보조 정보 Regular 14px

---

## 5. 핵심 기능: "오늘의 머니 랭킹"

### 로직
```sql
-- daily_pnl 계산 (매일 장 마감 후)
SELECT
  p.name,
  p.party,
  p.country,
  SUM(h.shares * (stock.close_today - stock.close_yesterday)) as daily_gain,
  SUM(h.shares * stock.close_today) as total_portfolio_value,
  daily_gain / total_portfolio_value * 100 as daily_return_pct
FROM holdings h
JOIN politicians p ON h.politician_id = p.id
JOIN stock_prices stock ON h.ticker = stock.ticker
GROUP BY p.id
ORDER BY daily_gain DESC
LIMIT 10;
```

### 표시 형식
```
┌─────────────────────────────────────┐
│  🏆 오늘의 수익왕                     │
│                                     │
│  1. 낸시 펠로시        +$2.3M  +4.2%│
│     NVDA, AAPL, GOOGL              │
│                                     │
│  2. 김OO 의원          +₩890만 +2.1%│
│     삼성전자, SK하이닉스             │
│                                     │
│  3. 댄 크렌쇼          +$1.1M  +3.8%│
│     MSFT, TSLA                      │
│                                     │
│  ─────────────────────────────────  │
│  📊 오늘 정치인들이 가장 많이 산 종목  │
│  NVDA · TSLA · 삼성전자              │
└─────────────────────────────────────┘
```

---

## 6. MVP 스코프 & 로드맵

### Phase 1 (MVP - 2주)
- [ ] US 의원 거래 데이터 연동 (Lambda Finance API)
- [ ] 일간 수익 랭킹 화면
- [ ] 정치인 프로필 + 보유 종목
- [ ] 앱인토스 배포

### Phase 2 (4주)
- [ ] 한국 국회의원 데이터 (뉴스타파 DB 기반)
- [ ] KR/US 탭 전환
- [ ] 종목 허브 (정치인 매매 몰리는 종목)
- [ ] 토스 증권 딥링크 연동

### Phase 3 (6주)
- [ ] 푸시 알림 (새 거래 공시 시)
- [ ] "따라하기 포폴" 기능
- [ ] 소셜 공유 카드 생성
- [ ] 구독 모델 (프리미엄 알림)

---

## 7. 리스크 & 면책

| 리스크 | 대응 |
|--------|------|
| 한국 데이터 실시간성 부족 | US 중심으로 시작, KR은 "연간 포폴 공개" 형태 |
| 법적 이슈 (투자 조언 오해) | "정보 제공 목적, 투자 권유 아님" 면책 문구 상시 노출 |
| API 무료 티어 한계 | 캐싱 적극 활용, 일 1회 벌크 업데이트 후 캐시 서빙 |
| 크롤링 차단 | 전자관보 PDF 기반 → 공공 데이터라 차단 리스크 낮음 |

---

## 8. 경쟁 우위

- **한국 유일**: 국내에 국회의원 포폴 트래커 앱 없음
- **KR + US 통합**: 양국 정치인 비교 가능
- **토스 생태계**: 2,900만 유저 접근, 토스 증권 딥링크로 즉시 매매 연결
- **바이럴**: "펠로시 수익률 인증" → 토스 내 공유 → 자연 성장

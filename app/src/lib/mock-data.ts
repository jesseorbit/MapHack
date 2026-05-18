import type { Politician, Trade, DailyPnl, Holding } from "@/types/database";

export const politicians: Politician[] = [
  // === US Politicians ===
  { id: "1", name: "Nancy Pelosi", name_kr: "낸시 펠로시", party: "Democrat", country: "US", chamber: "House", state: "CA", photo_url: null, created_at: "2024-01-01" },
  { id: "2", name: "Dan Crenshaw", name_kr: "댄 크렌쇼", party: "Republican", country: "US", chamber: "House", state: "TX", photo_url: null, created_at: "2024-01-01" },
  { id: "3", name: "Tommy Tuberville", name_kr: "토미 터버빌", party: "Republican", country: "US", chamber: "Senate", state: "AL", photo_url: null, created_at: "2024-01-01" },
  { id: "4", name: "Mark Green", name_kr: "마크 그린", party: "Republican", country: "US", chamber: "House", state: "TN", photo_url: null, created_at: "2024-01-01" },
  { id: "5", name: "Josh Gottheimer", name_kr: "조시 고타이머", party: "Democrat", country: "US", chamber: "House", state: "NJ", photo_url: null, created_at: "2024-01-01" },
  { id: "6", name: "Marjorie Taylor Greene", name_kr: "마져리 테일러 그린", party: "Republican", country: "US", chamber: "House", state: "GA", photo_url: null, created_at: "2024-01-01" },
  { id: "7", name: "Michael McCaul", name_kr: "마이클 매콜", party: "Republican", country: "US", chamber: "House", state: "TX", photo_url: null, created_at: "2024-01-01" },
  { id: "8", name: "Ro Khanna", name_kr: "로 칸나", party: "Democrat", country: "US", chamber: "House", state: "CA", photo_url: null, created_at: "2024-01-01" },
  { id: "9", name: "Pat Fallon", name_kr: "팻 팔론", party: "Republican", country: "US", chamber: "House", state: "TX", photo_url: null, created_at: "2024-01-01" },
  { id: "10", name: "John Curtis", name_kr: "존 커티스", party: "Republican", country: "US", chamber: "Senate", state: "UT", photo_url: null, created_at: "2024-01-01" },
  { id: "11", name: "Debbie Wasserman Schultz", name_kr: "데비 와서만 슐츠", party: "Democrat", country: "US", chamber: "House", state: "FL", photo_url: null, created_at: "2024-01-01" },
  { id: "12", name: "Sheldon Whitehouse", name_kr: "셸던 화이트하우스", party: "Democrat", country: "US", chamber: "Senate", state: "RI", photo_url: null, created_at: "2024-01-01" },
  { id: "13", name: "Kevin Hern", name_kr: "케빈 헌", party: "Republican", country: "US", chamber: "House", state: "OK", photo_url: null, created_at: "2024-01-01" },
  { id: "14", name: "Marie Gluesenkamp Perez", name_kr: "마리 글루센캠프 페레즈", party: "Democrat", country: "US", chamber: "House", state: "WA", photo_url: null, created_at: "2024-01-01" },
  { id: "15", name: "Rick Scott", name_kr: "릭 스콧", party: "Republican", country: "US", chamber: "Senate", state: "FL", photo_url: null, created_at: "2024-01-01" },
  { id: "16", name: "Suzan DelBene", name_kr: "수잔 델베네", party: "Democrat", country: "US", chamber: "House", state: "WA", photo_url: null, created_at: "2024-01-01" },
  { id: "17", name: "French Hill", name_kr: "프렌치 힐", party: "Republican", country: "US", chamber: "House", state: "AR", photo_url: null, created_at: "2024-01-01" },
  { id: "18", name: "Lois Frankel", name_kr: "로이스 프랭켈", party: "Democrat", country: "US", chamber: "House", state: "FL", photo_url: null, created_at: "2024-01-01" },
  { id: "19", name: "Austin Scott", name_kr: "오스틴 스콧", party: "Republican", country: "US", chamber: "House", state: "GA", photo_url: null, created_at: "2024-01-01" },
  { id: "20", name: "Earl Blumenauer", name_kr: "얼 블루먼아우어", party: "Democrat", country: "US", chamber: "House", state: "OR", photo_url: null, created_at: "2024-01-01" },
  // === KR Politicians ===
  { id: "k1", name: "Kim Sang-hoon", name_kr: "김상훈", party: "국민의힘", country: "KR", chamber: "국회", state: "대구", photo_url: null, created_at: "2024-01-01" },
  { id: "k2", name: "Yoo Sang-bum", name_kr: "유상범", party: "국민의힘", country: "KR", chamber: "국회", state: "강원", photo_url: null, created_at: "2024-01-01" },
  { id: "k3", name: "Jung Jin-suk", name_kr: "정진석", party: "국민의힘", country: "KR", chamber: "국회", state: "서울", photo_url: null, created_at: "2024-01-01" },
  { id: "k4", name: "Park Dae-chul", name_kr: "박대출", party: "국민의힘", country: "KR", chamber: "국회", state: "경기", photo_url: null, created_at: "2024-01-01" },
  { id: "k5", name: "Lee Hae-chan", name_kr: "이해찬", party: "더불어민주당", country: "KR", chamber: "국회", state: "세종", photo_url: null, created_at: "2024-01-01" },
  { id: "k6", name: "Kwon Seong-dong", name_kr: "권성동", party: "국민의힘", country: "KR", chamber: "국회", state: "강원", photo_url: null, created_at: "2024-01-01" },
  { id: "k7", name: "Kim Byung-wook", name_kr: "김병욱", party: "더불어민주당", country: "KR", chamber: "국회", state: "경기", photo_url: null, created_at: "2024-01-01" },
  { id: "k8", name: "Sung Il-jong", name_kr: "성일종", party: "국민의힘", country: "KR", chamber: "국회", state: "충북", photo_url: null, created_at: "2024-01-01" },
  { id: "k9", name: "Yang Hyang-ja", name_kr: "양향자", party: "더불어민주당", country: "KR", chamber: "국회", state: "광주", photo_url: null, created_at: "2024-01-01" },
  { id: "k10", name: "Choo Kyung-ho", name_kr: "추경호", party: "국민의힘", country: "KR", chamber: "국회", state: "대구", photo_url: null, created_at: "2024-01-01" },
  { id: "k11", name: "Kim Tae-nyeon", name_kr: "김태년", party: "더불어민주당", country: "KR", chamber: "국회", state: "인천", photo_url: null, created_at: "2024-01-01" },
  { id: "k12", name: "Joo Ho-young", name_kr: "주호영", party: "국민의힘", country: "KR", chamber: "국회", state: "대구", photo_url: null, created_at: "2024-01-01" },
  { id: "k13", name: "Park Hong-keun", name_kr: "박홍근", party: "더불어민주당", country: "KR", chamber: "국회", state: "서울", photo_url: null, created_at: "2024-01-01" },
  { id: "k14", name: "Yun Sang-hyun", name_kr: "윤상현", party: "국민의힘", country: "KR", chamber: "국회", state: "서울", photo_url: null, created_at: "2024-01-01" },
  { id: "k15", name: "Woo Won-shik", name_kr: "우원식", party: "더불어민주당", country: "KR", chamber: "국회", state: "충북", photo_url: null, created_at: "2024-01-01" },
];

function p(id: string): Politician {
  return politicians.find((x) => x.id === id)!;
}

// === Real prices from Yahoo Finance (2026-05-15 close) ===
const prices: Record<string, { price: number; change: number; changePct: number; name: string }> = {
  NVDA:  { price: 225.32, change: -10.42, changePct: -4.42, name: "NVIDIA Corp" },
  AAPL:  { price: 300.23, change: 2.02, changePct: 0.68, name: "Apple Inc" },
  GOOGL: { price: 396.78, change: -4.29, changePct: -1.07, name: "Alphabet Inc" },
  MSFT:  { price: 421.92, change: 12.49, changePct: 3.05, name: "Microsoft Corp" },
  TSLA:  { price: 422.24, change: -21.06, changePct: -4.75, name: "Tesla Inc" },
  AVGO:  { price: 425.19, change: -14.60, changePct: -3.32, name: "Broadcom Inc" },
  AMZN:  { price: 264.14, change: -3.08, changePct: -1.15, name: "Amazon.com" },
  META:  { price: 614.23, change: -4.20, changePct: -0.68, name: "Meta Platforms" },
  LMT:   { price: 516.01, change: -4.40, changePct: -0.85, name: "Lockheed Martin" },
  RTX:   { price: 171.18, change: -4.50, changePct: -2.56, name: "RTX Corp" },
  GD:    { price: 334.50, change: -6.12, changePct: -1.80, name: "General Dynamics" },
  JPM:   { price: 297.81, change: -2.10, changePct: -0.70, name: "JPMorgan Chase" },
  GS:    { price: 948.47, change: -20.49, changePct: -2.11, name: "Goldman Sachs" },
  CRM:   { price: 173.51, change: 5.93, changePct: 3.54, name: "Salesforce" },
  NOW:   { price: 95.07, change: 4.57, changePct: 5.05, name: "ServiceNow" },
  XOM:   { price: 157.92, change: 6.17, changePct: 4.07, name: "ExxonMobil" },
  CVX:   { price: 191.10, change: 4.46, changePct: 2.39, name: "Chevron" },
  UNH:   { price: 393.85, change: -5.24, changePct: -1.31, name: "UnitedHealth" },
  JNJ:   { price: 226.71, change: -4.09, changePct: -1.77, name: "Johnson & Johnson" },
  PLTR:  { price: 133.99, change: 0.26, changePct: 0.19, name: "Palantir" },
  BAC:   { price: 49.77, change: -0.08, changePct: -0.16, name: "Bank of America" },
  WFC:   { price: 73.42, change: -0.37, changePct: -0.50, name: "Wells Fargo" },
  PFE:   { price: 25.33, change: -0.42, changePct: -1.63, name: "Pfizer" },
  MRNA:  { price: 49.04, change: -0.99, changePct: -1.98, name: "Moderna" },
  DIS:   { price: 102.72, change: -2.70, changePct: -2.56, name: "Walt Disney" },
  NFLX:  { price: 87.02, change: 0.08, changePct: 0.09, name: "Netflix" },
  BA:    { price: 220.49, change: -8.72, changePct: -3.80, name: "Boeing" },
  GE:    { price: 281.53, change: -10.01, changePct: -3.43, name: "GE Aerospace" },
  COIN:  { price: 195.43, change: -16.58, changePct: -7.82, name: "Coinbase" },
  BYND:  { price: 0.80, change: -0.0001, changePct: -0.01, name: "Beyond Meat" },
  RIVN:  { price: 13.79, change: -0.73, changePct: -5.03, name: "Rivian" },
};

// === Holdings: all US politicians with real prices ===
type HoldingWithPrice = Holding & { current_price: number; change_pct: number };

function h(id: string, polId: string, ticker: string, shares: number, amtLow: number, amtHigh: number): HoldingWithPrice {
  const s = prices[ticker];
  return {
    id, politician_id: polId, ticker, company_name: s.name, shares,
    amount_low: amtLow, amount_high: amtHigh, asset_type: "stock", updated_at: "2026-05-15",
    current_price: s.price, change_pct: s.changePct,
  };
}

export const holdings: HoldingWithPrice[] = [
  // Pelosi — big tech heavy
  h("h1", "1", "NVDA", 5000, 1000000, 5000000),
  h("h2", "1", "AAPL", 10000, 1000000, 5000000),
  h("h3", "1", "GOOGL", 3000, 500000, 1000000),
  h("h4", "1", "MSFT", 2000, 500000, 1000000),
  h("h5", "1", "TSLA", 1500, 250000, 500000),
  h("h6", "1", "AVGO", 800, 500000, 1000000),
  // Crenshaw — diversified
  h("h7", "2", "AMZN", 4000, 500000, 1000000),
  h("h8", "2", "META", 1500, 500000, 1000000),
  h("h9", "2", "LMT", 2000, 500000, 1000000),
  h("h10", "2", "PLTR", 5000, 250000, 500000),
  // Tuberville — TSLA heavy
  h("h11", "3", "MSFT", 4000, 1000000, 5000000),
  h("h12", "3", "TSLA", 8000, 1000000, 5000000),
  h("h13", "3", "AMZN", 3000, 500000, 1000000),
  // Green — defense
  h("h14", "4", "LMT", 3000, 500000, 1000000),
  h("h15", "4", "RTX", 5000, 500000, 1000000),
  h("h16", "4", "GD", 2000, 250000, 500000),
  // Gottheimer — AAPL, CRM
  h("h17", "5", "AAPL", 8000, 1000000, 5000000),
  h("h18", "5", "NVDA", 2000, 250000, 500000),
  h("h19", "5", "CRM", 4000, 250000, 500000),
  // MTG — TSLA, PLTR
  h("h20", "6", "TSLA", 5000, 500000, 1000000),
  h("h21", "6", "PLTR", 10000, 500000, 1000000),
  // McCaul — semis + MSFT
  h("h22", "7", "AVGO", 2000, 500000, 1000000),
  h("h23", "7", "NVDA", 3000, 500000, 1000000),
  h("h24", "7", "MSFT", 5000, 1000000, 5000000),
  // Khanna — big tech
  h("h25", "8", "GOOGL", 5000, 1000000, 5000000),
  h("h26", "8", "MSFT", 3000, 500000, 1000000),
  h("h27", "8", "AAPL", 4000, 500000, 1000000),
  // Fallon — defense
  h("h28", "9", "LMT", 4000, 1000000, 5000000),
  h("h29", "9", "RTX", 6000, 500000, 1000000),
  h("h30", "9", "GD", 3000, 500000, 1000000),
  // Curtis — SaaS
  h("h31", "10", "CRM", 5000, 250000, 500000),
  h("h32", "10", "NOW", 8000, 500000, 1000000),
  // Wasserman Schultz — healthcare
  h("h33", "11", "UNH", 3000, 500000, 1000000),
  h("h34", "11", "JNJ", 5000, 500000, 1000000),
  // Whitehouse — pharma
  h("h35", "12", "PFE", 20000, 250000, 500000),
  h("h36", "12", "MRNA", 5000, 100000, 250000),
  // Hern — energy
  h("h37", "13", "XOM", 10000, 1000000, 5000000),
  h("h38", "13", "CVX", 5000, 500000, 1000000),
  // Perez — crypto/EV
  h("h39", "14", "COIN", 3000, 250000, 500000),
  h("h40", "14", "RIVN", 15000, 100000, 250000),
  // Rick Scott — financials
  h("h41", "15", "JPM", 4000, 500000, 1000000),
  h("h42", "15", "GS", 1000, 500000, 1000000),
  h("h43", "15", "BAC", 10000, 250000, 500000),
  // DelBene — MSFT heavy (WA)
  h("h44", "16", "MSFT", 6000, 1000000, 5000000),
  h("h45", "16", "AMZN", 3000, 500000, 1000000),
  h("h46", "16", "AAPL", 5000, 500000, 1000000),
  // French Hill — banks
  h("h47", "17", "BAC", 15000, 250000, 500000),
  h("h48", "17", "WFC", 8000, 250000, 500000),
  h("h49", "17", "JPM", 2000, 250000, 500000),
  // Frankel — media
  h("h50", "18", "DIS", 5000, 250000, 500000),
  h("h51", "18", "NFLX", 6000, 250000, 500000),
  // Austin Scott — industrial
  h("h52", "19", "BA", 4000, 500000, 1000000),
  h("h53", "19", "GE", 3000, 500000, 1000000),
  // Blumenauer — speculative
  h("h54", "20", "BYND", 30000, 15000, 50000),
  h("h55", "20", "RIVN", 10000, 100000, 250000),
  // === KR Politicians (mock prices — KRX not on Yahoo Finance MCP) ===
  // 김상훈
  { id: "hk1", politician_id: "k1", ticker: "005930", company_name: "삼성전자", shares: 50000, amount_low: 3000000000, amount_high: 4000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 83200, change_pct: 2.5 },
  { id: "hk2", politician_id: "k1", ticker: "000660", company_name: "SK하이닉스", shares: 10000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 185000, change_pct: 1.8 },
  // 유상범
  { id: "hk3", politician_id: "k2", ticker: "006400", company_name: "삼성SDI", shares: 5000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 380000, change_pct: 1.4 },
  { id: "hk4", politician_id: "k2", ticker: "373220", company_name: "LG에너지솔루션", shares: 3000, amount_low: 1000000000, amount_high: 1500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 420000, change_pct: 0.9 },
  // 정진석
  { id: "hk5", politician_id: "k3", ticker: "005930", company_name: "삼성전자", shares: 40000, amount_low: 2500000000, amount_high: 3500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 83200, change_pct: 2.5 },
  { id: "hk6", politician_id: "k3", ticker: "005380", company_name: "현대차", shares: 8000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 250000, change_pct: 1.2 },
  // 박대출
  { id: "hk7", politician_id: "k4", ticker: "035420", company_name: "네이버", shares: 15000, amount_low: 2000000000, amount_high: 3000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 210000, change_pct: 1.1 },
  { id: "hk8", politician_id: "k4", ticker: "035720", company_name: "카카오", shares: 20000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 42000, change_pct: 0.7 },
  // 이해찬
  { id: "hk9", politician_id: "k5", ticker: "068270", company_name: "셀트리온", shares: 12000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 180000, change_pct: 0.8 },
  { id: "hk10", politician_id: "k5", ticker: "247540", company_name: "에코프로비엠", shares: 5000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 120000, change_pct: 0.3 },
  // 권성동
  { id: "hk11", politician_id: "k6", ticker: "373220", company_name: "LG에너지솔루션", shares: 6000, amount_low: 2000000000, amount_high: 3000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 420000, change_pct: 0.9 },
  { id: "hk12", politician_id: "k6", ticker: "005490", company_name: "POSCO홀딩스", shares: 10000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 320000, change_pct: 2.1 },
  // 김병욱
  { id: "hk13", politician_id: "k7", ticker: "012330", company_name: "현대모비스", shares: 8000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 230000, change_pct: 0.5 },
  { id: "hk14", politician_id: "k7", ticker: "000270", company_name: "기아", shares: 15000, amount_low: 1000000000, amount_high: 1500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 95000, change_pct: 0.3 },
  // 성일종
  { id: "hk15", politician_id: "k8", ticker: "003490", company_name: "대한항공", shares: 20000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 28000, change_pct: -0.4 },
  { id: "hk16", politician_id: "k8", ticker: "020560", company_name: "아시아나항공", shares: 30000, amount_low: 200000000, amount_high: 500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 12000, change_pct: -0.2 },
  // 양향자
  { id: "hk17", politician_id: "k9", ticker: "207940", company_name: "삼성바이오로직스", shares: 2000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 850000, change_pct: 0.4 },
  { id: "hk18", politician_id: "k9", ticker: "005930", company_name: "삼성전자", shares: 20000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 83200, change_pct: 2.5 },
  // 추경호
  { id: "hk19", politician_id: "k10", ticker: "012450", company_name: "한화에어로스페이스", shares: 5000, amount_low: 1500000000, amount_high: 2000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 380000, change_pct: 1.2 },
  { id: "hk20", politician_id: "k10", ticker: "272210", company_name: "한화시스템", shares: 15000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 22000, change_pct: 0.8 },
  // 김태년
  { id: "hk21", politician_id: "k11", ticker: "323410", company_name: "카카오뱅크", shares: 25000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 28000, change_pct: -0.6 },
  { id: "hk22", politician_id: "k11", ticker: "259960", company_name: "크래프톤", shares: 3000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 280000, change_pct: -0.3 },
  // 주호영
  { id: "hk23", politician_id: "k12", ticker: "105560", company_name: "KB금융", shares: 15000, amount_low: 1000000000, amount_high: 1500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 85000, change_pct: 0.9 },
  { id: "hk24", politician_id: "k12", ticker: "055550", company_name: "신한지주", shares: 20000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 52000, change_pct: 0.7 },
  // 박홍근
  { id: "hk25", politician_id: "k13", ticker: "352820", company_name: "하이브", shares: 8000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 180000, change_pct: -0.8 },
  { id: "hk26", politician_id: "k13", ticker: "263750", company_name: "펄어비스", shares: 15000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 38000, change_pct: -0.5 },
  // 윤상현
  { id: "hk27", politician_id: "k14", ticker: "042660", company_name: "두산에너빌리티", shares: 30000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 22000, change_pct: -1.0 },
  { id: "hk28", politician_id: "k14", ticker: "009540", company_name: "한국조선해양", shares: 5000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 160000, change_pct: -0.6 },
  // 우원식
  { id: "hk29", politician_id: "k15", ticker: "011200", company_name: "HMM", shares: 40000, amount_low: 500000000, amount_high: 1000000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 18000, change_pct: -1.2 },
  { id: "hk30", politician_id: "k15", ticker: "028670", company_name: "팬오션", shares: 50000, amount_low: 200000000, amount_high: 500000000, asset_type: "stock", updated_at: "2026-05-15", current_price: 5200, change_pct: -0.8 },
];

// === Calculate real daily PnL from Yahoo Finance prices ===
type PnlEntry = DailyPnl & { politician: Politician };

function calcPnl(politicianId: string): { gain: number; value: number; pct: number; movers: string[] } {
  const polHoldings = holdings.filter((x) => x.politician_id === politicianId);
  let totalGain = 0;
  let totalValue = 0;
  const movers: { ticker: string; impact: number }[] = [];

  for (const holding of polHoldings) {
    const s = prices[holding.ticker];
    if (!s || !holding.shares) continue;
    const gain = holding.shares * s.change;
    const value = holding.shares * s.price;
    totalGain += gain;
    totalValue += value;
    movers.push({ ticker: holding.ticker, impact: Math.abs(gain) });
  }

  movers.sort((a, b) => b.impact - a.impact);
  const pct = totalValue > 0 ? (totalGain / totalValue) * 100 : 0;

  return {
    gain: Math.round(totalGain),
    value: Math.round(totalValue),
    pct: Math.round(pct * 100) / 100,
    movers: movers.slice(0, 3).map((m) => m.ticker),
  };
}

// US politicians PnL
const usPnlRaw = politicians
  .filter((pol) => pol.country === "US")
  .map((pol) => ({ pol, ...calcPnl(pol.id) }))
  .sort((a, b) => b.gain - a.gain);

// KR politicians (mock — no yahoo-finance for KRX)
const krPnlData: { id: string; polId: string; gain: number; pct: number; value: number; movers: string[] }[] = [
  { id: "dk1", polId: "k1", gain: 89000000, pct: 2.1, value: 4238095238, movers: ["삼성전자", "SK하이닉스"] },
  { id: "dk2", polId: "k3", gain: 72000000, pct: 1.8, value: 4000000000, movers: ["삼성전자", "현대차"] },
  { id: "dk3", polId: "k6", gain: 63000000, pct: 1.6, value: 3937500000, movers: ["LG에너지솔루션", "POSCO"] },
  { id: "dk4", polId: "k2", gain: 45000000, pct: 1.2, value: 3750000000, movers: ["삼성SDI", "LG에너지솔루션"] },
  { id: "dk5", polId: "k10", gain: 38000000, pct: 1.0, value: 3800000000, movers: ["한화에어로스페이스", "한화시스템"] },
  { id: "dk6", polId: "k4", gain: 32000000, pct: 0.9, value: 3555555555, movers: ["네이버", "카카오"] },
  { id: "dk7", polId: "k12", gain: 28000000, pct: 0.8, value: 3500000000, movers: ["KB금융", "신한지주"] },
  { id: "dk8", polId: "k5", gain: 21000000, pct: 0.6, value: 3500000000, movers: ["셀트리온", "에코프로비엠"] },
  { id: "dk9", polId: "k7", gain: 15000000, pct: 0.4, value: 3750000000, movers: ["현대모비스", "기아"] },
  { id: "dk10", polId: "k9", gain: 12000000, pct: 0.3, value: 4000000000, movers: ["삼성바이오로직스", "삼성전자"] },
  { id: "dk11", polId: "k8", gain: -8000000, pct: -0.2, value: 4000000000, movers: ["대한항공", "아시아나"] },
  { id: "dk12", polId: "k11", gain: -15000000, pct: -0.4, value: 3750000000, movers: ["카카오뱅크", "크래프톤"] },
  { id: "dk13", polId: "k13", gain: -22000000, pct: -0.6, value: 3666666666, movers: ["쿠팡", "배달의민족"] },
  { id: "dk14", polId: "k14", gain: -28000000, pct: -0.8, value: 3500000000, movers: ["두산", "한진중공업"] },
  { id: "dk15", polId: "k15", gain: -35000000, pct: -1.0, value: 3500000000, movers: ["HMM", "팬오션"] },
];

// Combine US + KR, sort by daily_return_pct descending, assign unified rank
const allPnlRaw = [
  ...usPnlRaw.map((entry) => ({
    id: `d-${entry.pol.id}`,
    politician_id: entry.pol.id,
    date: "2026-05-15",
    daily_gain: entry.gain,
    daily_return_pct: entry.pct,
    total_portfolio_value: entry.value,
    top_movers: entry.movers,
    politician: entry.pol,
  })),
  ...krPnlData.map((entry) => ({
    id: entry.id,
    politician_id: entry.polId,
    date: "2026-05-15",
    daily_gain: entry.gain,
    daily_return_pct: entry.pct,
    total_portfolio_value: entry.value,
    top_movers: entry.movers,
    politician: p(entry.polId),
  })),
].sort((a, b) => b.daily_return_pct - a.daily_return_pct);

export const dailyPnl: PnlEntry[] = allPnlRaw.map((entry, i) => ({
  ...entry,
  rank: i + 1,
}));

export const trades: (Trade & { politician: Politician })[] = [
  { id: "t1", politician_id: "1", ticker: "NVDA", company_name: "NVIDIA Corp", trade_type: "buy", amount_low: 1000000, amount_high: 5000000, trade_date: "2026-05-14", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("1") },
  { id: "t2", politician_id: "3", ticker: "TSLA", company_name: "Tesla Inc", trade_type: "buy", amount_low: 1000000, amount_high: 5000000, trade_date: "2026-05-13", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("3") },
  { id: "t3", politician_id: "2", ticker: "META", company_name: "Meta Platforms", trade_type: "sell", amount_low: 250000, amount_high: 500000, trade_date: "2026-05-12", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("2") },
  { id: "t4", politician_id: "13", ticker: "XOM", company_name: "ExxonMobil", trade_type: "buy", amount_low: 1000000, amount_high: 5000000, trade_date: "2026-05-13", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("13") },
  { id: "t5", politician_id: "16", ticker: "MSFT", company_name: "Microsoft Corp", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-12", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("16") },
  { id: "t6", politician_id: "10", ticker: "NOW", company_name: "ServiceNow", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-12", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("10") },
  { id: "t7", politician_id: "5", ticker: "CRM", company_name: "Salesforce", trade_type: "buy", amount_low: 250000, amount_high: 500000, trade_date: "2026-05-11", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("5") },
  { id: "t8", politician_id: "15", ticker: "GS", company_name: "Goldman Sachs", trade_type: "sell", amount_low: 250000, amount_high: 500000, trade_date: "2026-05-09", disclosure_date: "2026-05-14", created_at: "2026-05-14", politician: p("15") },
  { id: "t9", politician_id: "7", ticker: "MSFT", company_name: "Microsoft Corp", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-12", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("7") },
  { id: "t10", politician_id: "6", ticker: "TSLA", company_name: "Tesla Inc", trade_type: "buy", amount_low: 250000, amount_high: 500000, trade_date: "2026-05-08", disclosure_date: "2026-05-13", created_at: "2026-05-13", politician: p("6") },
  { id: "t11", politician_id: "8", ticker: "GOOGL", company_name: "Alphabet Inc", trade_type: "sell", amount_low: 250000, amount_high: 500000, trade_date: "2026-05-11", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("8") },
  { id: "t12", politician_id: "14", ticker: "COIN", company_name: "Coinbase", trade_type: "sell", amount_low: 100000, amount_high: 250000, trade_date: "2026-05-09", disclosure_date: "2026-05-14", created_at: "2026-05-14", politician: p("14") },
  { id: "t13", politician_id: "19", ticker: "BA", company_name: "Boeing", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-13", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("19") },
  { id: "t14", politician_id: "11", ticker: "UNH", company_name: "UnitedHealth", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-07", disclosure_date: "2026-05-13", created_at: "2026-05-13", politician: p("11") },
  { id: "t15", politician_id: "4", ticker: "LMT", company_name: "Lockheed Martin", trade_type: "buy", amount_low: 500000, amount_high: 1000000, trade_date: "2026-05-12", disclosure_date: "2026-05-15", created_at: "2026-05-15", politician: p("4") },
];

export const trendingTickers = [
  { ticker: "NVDA", name: "NVIDIA", buyCount: 14, sellCount: 2, price: prices.NVDA.price, change: prices.NVDA.changePct },
  { ticker: "TSLA", name: "Tesla", buyCount: 9, sellCount: 4, price: prices.TSLA.price, change: prices.TSLA.changePct },
  { ticker: "MSFT", name: "Microsoft", buyCount: 7, sellCount: 1, price: prices.MSFT.price, change: prices.MSFT.changePct },
  { ticker: "AAPL", name: "Apple", buyCount: 8, sellCount: 1, price: prices.AAPL.price, change: prices.AAPL.changePct },
  { ticker: "XOM", name: "ExxonMobil", buyCount: 6, sellCount: 0, price: prices.XOM.price, change: prices.XOM.changePct },
  { ticker: "CRM", name: "Salesforce", buyCount: 5, sellCount: 1, price: prices.CRM.price, change: prices.CRM.changePct },
  { ticker: "AVGO", name: "Broadcom", buyCount: 6, sellCount: 1, price: prices.AVGO.price, change: prices.AVGO.changePct },
  { ticker: "AMZN", name: "Amazon", buyCount: 5, sellCount: 2, price: prices.AMZN.price, change: prices.AMZN.changePct },
  { ticker: "META", name: "Meta", buyCount: 3, sellCount: 6, price: prices.META.price, change: prices.META.changePct },
  { ticker: "LMT", name: "Lockheed Martin", buyCount: 5, sellCount: 0, price: prices.LMT.price, change: prices.LMT.changePct },
  { ticker: "JPM", name: "JPMorgan", buyCount: 4, sellCount: 1, price: prices.JPM.price, change: prices.JPM.changePct },
  { ticker: "GOOGL", name: "Alphabet", buyCount: 4, sellCount: 3, price: prices.GOOGL.price, change: prices.GOOGL.changePct },
];

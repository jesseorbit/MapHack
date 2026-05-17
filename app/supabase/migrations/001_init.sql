-- 정치인 기본 정보
CREATE TABLE politicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_kr TEXT,
  party TEXT NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('US', 'KR')),
  chamber TEXT,
  state TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 보유 종목
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id UUID REFERENCES politicians(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  company_name TEXT NOT NULL,
  shares INTEGER,
  amount_low BIGINT NOT NULL DEFAULT 0,
  amount_high BIGINT NOT NULL DEFAULT 0,
  asset_type TEXT DEFAULT 'stock',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 매매 기록
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id UUID REFERENCES politicians(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  company_name TEXT NOT NULL,
  trade_type TEXT NOT NULL CHECK (trade_type IN ('buy', 'sell')),
  amount_low BIGINT NOT NULL DEFAULT 0,
  amount_high BIGINT NOT NULL DEFAULT 0,
  trade_date DATE NOT NULL,
  disclosure_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 일별 수익 랭킹 (미리 계산)
CREATE TABLE daily_pnl (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id UUID REFERENCES politicians(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  daily_gain BIGINT NOT NULL DEFAULT 0,
  daily_return_pct NUMERIC(8,4) NOT NULL DEFAULT 0,
  total_portfolio_value BIGINT NOT NULL DEFAULT 0,
  top_movers TEXT[] DEFAULT '{}',
  rank INTEGER NOT NULL DEFAULT 0,
  UNIQUE (politician_id, date)
);

-- 인덱스
CREATE INDEX idx_trades_politician ON trades(politician_id);
CREATE INDEX idx_trades_ticker ON trades(ticker);
CREATE INDEX idx_trades_disclosure_date ON trades(disclosure_date DESC);
CREATE INDEX idx_daily_pnl_date_rank ON daily_pnl(date DESC, rank ASC);
CREATE INDEX idx_holdings_politician ON holdings(politician_id);
CREATE INDEX idx_politicians_country ON politicians(country);

-- RLS
ALTER TABLE politicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_pnl ENABLE ROW LEVEL SECURITY;

-- 읽기 전용 공개
CREATE POLICY "Public read" ON politicians FOR SELECT USING (true);
CREATE POLICY "Public read" ON holdings FOR SELECT USING (true);
CREATE POLICY "Public read" ON trades FOR SELECT USING (true);
CREATE POLICY "Public read" ON daily_pnl FOR SELECT USING (true);

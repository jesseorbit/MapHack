import type { Politician, Trade, DailyPnl, Holding } from "@/types/database";
import krData from "./kr-politicians-data.json";
import usTradesData from "./us-trades-data.json";

// === KR Politicians generated from 뉴스타파 재산공개 DB (2025 공시) ===
const krPoliticians: Politician[] = krData.map((mp, i) => ({
  id: `k${i + 1}`,
  name: mp.name,
  name_kr: mp.name,
  party: "국회",
  country: "KR" as const,
  chamber: "국회",
  state: "",
  photo_url: null,
  created_at: "2025-03-27",
}));

// === US Politicians — auto-generated from Capitol Trades ===
const usPoliticians: Politician[] = usTradesData.politicians.map((p, i) => ({
  id: `us${i + 1}`,
  name: p.name,
  name_kr: null,
  party: p.party === "D" ? "Democrat" : "Republican",
  country: "US" as const,
  chamber: p.chamber,
  state: "",
  photo_url: null,
  created_at: "2026-01-01",
}));

export const politicians: Politician[] = [
  ...usPoliticians,
  // === KR Politicians — auto-generated from 뉴스타파 DB ===
  ...krPoliticians,
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

// === US Holdings — derived from Capitol Trades buy transactions ===
const usHoldingsFromTrades: HoldingWithPrice[] = (() => {
  const polTickers: Record<string, Record<string, { asset: string; amt: number }>> = {};
  for (const t of usTradesData.trades) {
    if (!t.ticker || t.type !== "buy") continue;
    const pol = usPoliticians.find((p) => p.name === t.politician);
    if (!pol) continue;
    const key = pol.id;
    if (!polTickers[key]) polTickers[key] = {};
    if (!polTickers[key][t.ticker]) polTickers[key][t.ticker] = { asset: t.asset, amt: 0 };
    // Estimate position from amount range
    const midAmounts: Record<string, number> = {
      "1K-15K": 8000, "15K-50K": 32500, "50K-100K": 75000,
      "100K-250K": 175000, "250K-500K": 375000, "500K-1M": 750000, "1M-5M": 3000000,
    };
    polTickers[key][t.ticker].amt += midAmounts[t.amount] || 8000;
  }
  const result: HoldingWithPrice[] = [];
  let idx = 0;
  for (const [polId, tickers] of Object.entries(polTickers)) {
    for (const [ticker, data] of Object.entries(tickers)) {
      const p = prices[ticker];
      const shares = p ? Math.round(data.amt / p.price) : 0;
      result.push({
        id: `hu${idx++}`,
        politician_id: polId,
        ticker,
        company_name: data.asset,
        shares: shares || null,
        amount_low: Math.round(data.amt * 0.7),
        amount_high: Math.round(data.amt * 1.3),
        asset_type: "stock",
        updated_at: "2026-05-15",
        current_price: p?.price || 0,
        change_pct: p?.changePct || 0,
      });
    }
  }
  return result;
})();

export const holdings: HoldingWithPrice[] = [
  ...usHoldingsFromTrades,
  // === KR — 뉴스타파 재산공개 DB (163명, 877종목, 2025 공시) ===
  ...krData.flatMap((mp, i) =>
    mp.stocks.map((stock, j) => ({
      id: `hk${i * 100 + j}`,
      politician_id: `k${i + 1}`,
      ticker: "",
      company_name: stock.company_name,
      shares: stock.shares,
      amount_low: 0,
      amount_high: mp["total_\uB9CC\uC6D0"] * 10000,
      asset_type: "stock" as const,
      updated_at: "2025-03-27",
      current_price: (stock as { price?: number }).price ?? 0,
      change_pct: 0,
    }))
  ),
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

// === Trades — auto-generated from Capitol Trades (real data) ===
function parseAmount(amt: string): { low: number; high: number } {
  const map: Record<string, { low: number; high: number }> = {
    "1K-15K": { low: 1000, high: 15000 },
    "15K-50K": { low: 15000, high: 50000 },
    "50K-100K": { low: 50000, high: 100000 },
    "100K-250K": { low: 100000, high: 250000 },
    "250K-500K": { low: 250000, high: 500000 },
    "500K-1M": { low: 500000, high: 1000000 },
    "1M-5M": { low: 1000000, high: 5000000 },
  };
  return map[amt] || { low: 0, high: 0 };
}

export const trades: (Trade & { politician: Politician })[] = usTradesData.trades
  .filter((t) => t.ticker)
  .map((t, i) => {
    const pol = politicians.find((p) => p.name === t.politician);
    const amt = parseAmount(t.amount);
    return {
      id: `t${i + 1}`,
      politician_id: pol?.id || "",
      ticker: t.ticker,
      company_name: t.asset,
      trade_type: (t.type === "sell" ? "sell" : "buy") as "buy" | "sell",
      amount_low: amt.low,
      amount_high: amt.high,
      trade_date: t.trade_date,
      disclosure_date: t.disclosure_date,
      created_at: t.disclosure_date,
      politician: pol || politicians[0],
    };
  });

// === Trending tickers — computed from real trades ===
const tickerStats: Record<string, { ticker: string; name: string; buys: number; sells: number }> = {};
for (const t of trades) {
  if (!t.ticker) continue;
  if (!tickerStats[t.ticker]) tickerStats[t.ticker] = { ticker: t.ticker, name: t.company_name, buys: 0, sells: 0 };
  if (t.trade_type === "buy") tickerStats[t.ticker].buys++;
  else tickerStats[t.ticker].sells++;
}

export const trendingTickers = Object.values(tickerStats)
  .sort((a, b) => (b.buys + b.sells) - (a.buys + a.sells))
  .slice(0, 15)
  .map((s) => {
    const p = prices[s.ticker];
    return {
      ticker: s.ticker,
      name: s.name,
      buyCount: s.buys,
      sellCount: s.sells,
      price: p?.price || 0,
      change: p?.changePct || 0,
    };
  });

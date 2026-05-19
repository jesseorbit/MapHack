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
  // Additional US tickers from Senate trades
  CLF:   { price: 10.66, change: 0.35, changePct: 3.39, name: "Cleveland-Cliffs" },
  T:     { price: 24.43, change: 0.40, changePct: 1.66, name: "AT&T" },
  PYPL:  { price: 44.39, change: -0.03, changePct: -0.06, name: "PayPal" },
  DD:    { price: 48.64, change: -0.67, changePct: -1.36, name: "DuPont" },
  PG:    { price: 142.39, change: 0.82, changePct: 0.58, name: "Procter & Gamble" },
  BAX:   { price: 17.79, change: 0.49, changePct: 2.83, name: "Baxter" },
  CZR:   { price: 27.62, change: -0.18, changePct: -0.65, name: "Caesars" },
};

// KR stock daily changes — auto-fetched from Yahoo Finance (62 stocks)
import krPricesJson from "./kr-prices.json";
const krDailyChanges: Record<string, { price: number; changePct: number }> = krPricesJson as Record<string, { price: number; changePct: number }>;

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
    // Amount: numeric (from SQL dump) or string range (from Capitol Trades)
    const amt = typeof t.amount === "number" ? t.amount : 8000;
    polTickers[key][t.ticker].amt += amt;
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
      amount_high: ((mp as unknown as Record<string, number>)["total_\uCC9C\uC6D0"] ?? 0) * 1000,
      asset_type: "stock" as const,
      updated_at: "2025-03-27",
      current_price: krDailyChanges[stock.company_name]?.price || (stock as { price?: number }).price || 0,
      change_pct: krDailyChanges[stock.company_name]?.changePct || 0,
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
    if (!holding.shares || !holding.current_price) continue;
    const value = holding.shares * holding.current_price;
    const gain = value * (holding.change_pct / 100);
    totalGain += gain;
    totalValue += value;
    movers.push({ ticker: holding.ticker || holding.company_name, impact: Math.abs(gain) });
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

// All politicians PnL — calculated from actual holdings
const USD_TO_KRW = 1500;

const allPnlEntries = politicians
  .map((pol) => {
    const pnl = calcPnl(pol.id);
    // Normalize to KRW for unified ranking
    const valueInKRW = pol.country === "US" ? pnl.value * USD_TO_KRW : pnl.value;
    return { pol, ...pnl, valueInKRW };
  })
  .filter((entry) => entry.value > 0);

// Unified ranking by portfolio value (normalized to KRW)
const merged = allPnlEntries.sort((a, b) => b.valueInKRW - a.valueInKRW);

export const dailyPnl: PnlEntry[] = merged.map((entry, i) => ({
  id: `d-${entry.pol.id}`,
  politician_id: entry.pol.id,
  date: "2026-05-15",
  daily_gain: entry.gain,
  daily_return_pct: entry.pct,
  total_portfolio_value: entry.value,
  top_movers: entry.movers,
  politician: entry.pol,
  rank: i + 1,
}));

// === Trades — from Senate stock trading SQL dump (22,541 trades) ===
export const trades: (Trade & { politician: Politician })[] = usTradesData.trades
  .filter((t) => t.ticker && t.ticker !== "N/A" && t.ticker !== "--")
  .slice(0, 500) // Recent 500 trades for performance
  .map((t, i) => {
    const pol = politicians.find((p) => p.name === t.politician);
    const amt = typeof t.amount === "number" ? t.amount : 8000;
    return {
      id: `t${i + 1}`,
      politician_id: pol?.id || "",
      ticker: t.ticker,
      company_name: t.asset || t.ticker,
      trade_type: (t.type === "sell" ? "sell" : "buy") as "buy" | "sell",
      amount_low: amt,
      amount_high: Math.round(amt * 1.5),
      trade_date: t.trade_date,
      disclosure_date: t.disclosure_date || t.trade_date,
      created_at: t.disclosure_date || t.trade_date,
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

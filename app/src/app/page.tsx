"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { RankingCard } from "@/components/RankingCard";
import { CountryTab } from "@/components/CountryTab";
import { dailyPnl, trades } from "@/lib/mock-data";
import { getRelativeTime } from "@/lib/utils";
import { TickerLogo } from "@/components/TickerLogo";

type SortMode = "daily" | "portfolio";

export default function HomePage() {
  const [country, setCountry] = useState<"ALL" | "US" | "KR">("ALL");
  const [sortMode, setSortMode] = useState<SortMode>("daily");

  const USD_KRW = 1500;

  const filtered = dailyPnl.filter(
    (item) => country === "ALL" || item.politician.country === country
  );

  const sorted = [...filtered]
    .filter((item) => {
      // 오늘 수익 모드: 변동 없는 의원 숨김
      if (sortMode === "daily") return item.daily_gain !== 0;
      return true;
    })
    .sort((a, b) => {
      if (sortMode === "daily") {
        return b.daily_gain - a.daily_gain;
      }
      // 포트폴리오: USD×1500 환산하여 비교
      const aVal = a.politician.country === "US" ? a.total_portfolio_value * USD_KRW : a.total_portfolio_value;
      const bVal = b.politician.country === "US" ? b.total_portfolio_value * USD_KRW : b.total_portfolio_value;
      return bVal - aVal;
    });

  return (
    <div className="flex flex-col min-h-screen pb-14">
      {/* Header */}
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
            {"의원주식"}
          </h1>
          <p className="text-[13px] text-gray-400 mt-0.5 tracking-tight">
            {"오늘 가장 돈 번 정치인은?"}
          </p>
        </div>
        <div className="pb-2.5">
          <CountryTab selected={country} onChange={setCountry} />
        </div>
      </header>

      {/* Ranking List */}
      <main className="flex-1">
        <section>
          <div className="px-5 pt-3 pb-2 flex items-end justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-gray-700 tracking-tight">
                {sortMode === "daily" ? "오늘의 수익 랭킹" : "포트폴리오 규모 랭킹"}
              </h2>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {"US 실시간 · KR 2025 공시 기준"}
              </p>
            </div>
            {/* Sort Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setSortMode("daily")}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                  sortMode === "daily"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400"
                }`}
              >
                {"오늘 수익"}
              </button>
              <button
                onClick={() => setSortMode("portfolio")}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                  sortMode === "portfolio"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400"
                }`}
              >
                {"포트폴리오"}
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {sorted.map((pnl, i) => (
              <RankingCard key={pnl.id} pnl={pnl} rank={i + 1} sortMode={sortMode} />
            ))}
          </div>
        </section>

        {/* Section: 최근 거래 */}
        <section className="mt-4">
          <div className="px-5 pb-1.5">
            <h2 className="text-[15px] font-bold text-gray-700 tracking-tight">
              {"최근 공시된 거래"}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {trades.slice(0, 8).map((trade) => (
              <div
                key={trade.id}
                className="flex items-center gap-2.5 px-5 py-3 bg-white"
              >
                <div className="relative">
                  <TickerLogo ticker={trade.ticker} size={28} />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[7px] font-bold border border-white ${
                    trade.trade_type === "buy" ? "bg-positive" : "bg-negative"
                  }`}>
                    {trade.trade_type === "buy" ? "B" : "S"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-semibold text-gray-900">
                      {trade.ticker}
                    </span>
                    <span className="text-[12px] text-gray-400">
                      {trade.company_name}
                    </span>
                  </div>
                  <span className="text-[12px] text-gray-500">
                    {trade.politician.name_kr || trade.politician.name} · {getRelativeTime(trade.disclosure_date)}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[13px] font-semibold ${
                      trade.trade_type === "buy"
                        ? "text-positive"
                        : "text-negative"
                    }`}
                  >
                    {trade.trade_type === "buy" ? "매수" : "매도"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Disclaimer */}
      <div className="px-5 py-3 mt-3">
        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          {"본 서비스는 공공 데이터 기반 정보 제공 목적이며, 투자 권유나 조언이 아닙니다."}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { RankingCard } from "@/components/RankingCard";
import { CountryTab } from "@/components/CountryTab";
import { dailyPnl, trades } from "@/lib/mock-data";
import { getRelativeTime } from "@/lib/utils";
import { TickerLogo } from "@/components/TickerLogo";

export default function HomePage() {
  const [country, setCountry] = useState<"ALL" | "US" | "KR">("ALL");

  const filtered = dailyPnl.filter(
    (item) => country === "ALL" || item.politician.country === country
  );

  return (
    <div className="flex flex-col min-h-screen pb-14">
      {/* Header */}
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2">
          <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
            {"\uC758\uC6D0\uC8FC\uC2DD"}
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5 tracking-tight">
            {"\uC624\uB298 \uAC00\uC7A5 \uB3C8 \uBC88 \uC815\uCE58\uC778\uC740?"}
          </p>
        </div>
        <div className="pb-2.5">
          <CountryTab selected={country} onChange={setCountry} />
        </div>
      </header>

      {/* Ranking List */}
      <main className="flex-1">
        <section>
          <div className="px-5 pt-3 pb-1.5">
            <h2 className="text-[13px] font-bold text-gray-700 tracking-tight">
              {"\uC624\uB298\uC758 \uC218\uC775 TOP"}
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {"2026.05.15 기준 · Yahoo Finance 실시간"}
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((pnl, i) => (
              <RankingCard key={pnl.id} pnl={pnl} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Section: 최근 거래 */}
        <section className="mt-4">
          <div className="px-5 pb-1.5">
            <h2 className="text-[13px] font-bold text-gray-700 tracking-tight">
              {"\uCD5C\uADFC \uACF5\uC2DC\uB41C \uAC70\uB798"}
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
                    <span className="text-[12px] font-semibold text-gray-900">
                      {trade.ticker}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {trade.company_name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {trade.politician.name_kr} · {getRelativeTime(trade.disclosure_date)}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[11px] font-semibold ${
                      trade.trade_type === "buy"
                        ? "text-positive"
                        : "text-negative"
                    }`}
                  >
                    {trade.trade_type === "buy" ? "\uB9E4\uC218" : "\uB9E4\uB3C4"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Disclaimer */}
      <div className="px-5 py-3 mt-3">
        <p className="text-[9px] text-gray-400 text-center leading-relaxed">
          {"\uBCF8 \uC11C\uBE44\uC2A4\uB294 \uACF5\uACF5 \uB370\uC774\uD130 \uAE30\uBC18 \uC815\uBCF4 \uC81C\uACF5 \uBAA9\uC801\uC774\uBA70, \uD22C\uC790 \uAD8C\uC720\uB098 \uC870\uC5B8\uC774 \uC544\uB2D9\uB2C8\uB2E4."}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

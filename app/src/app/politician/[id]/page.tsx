"use client";

import { use } from "react";
import Link from "next/link";
import { politicians, holdings, trades, dailyPnl } from "@/lib/mock-data";
import { formatMoney, formatPct, getPartyColor, getRelativeTime } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { TickerLogo } from "@/components/TickerLogo";

export default function PoliticianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const politician = politicians.find((p) => p.id === id);

  if (!politician) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[12px] text-gray-500">{"\uC815\uCE58\uC778\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}</p>
      </div>
    );
  }

  const pnl = dailyPnl.find((p) => p.politician_id === id);
  const politicianHoldings = holdings.filter((h) => h.politician_id === id);
  const politicianTrades = trades.filter((t) => t.politician_id === id);

  return (
    <div className="flex flex-col min-h-screen pb-14 bg-white">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex items-center h-11 px-4">
          <Link href="/" className="p-2 -ml-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <span className="ml-1.5 text-[14px] font-semibold">
            {politician.name_kr || politician.name}
          </span>
        </div>
      </header>

      {/* Profile */}
      <section className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-13 h-13 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-[20px] font-bold text-gray-400">
              {(politician.name_kr || politician.name).charAt(0)}
            </span>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: getPartyColor(politician.party) }}
            />
          </div>
          <div>
            <h1 className="text-[17px] font-bold text-gray-900">
              {politician.name_kr || politician.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-gray-500">{politician.party}</span>
              <span className="text-[11px] text-gray-300">|</span>
              <span className="text-[11px] text-gray-500">
                {politician.country === "US"
                  ? `${politician.chamber} \xB7 ${politician.state}`
                  : `${politician.chamber} \xB7 ${politician.state}`}
              </span>
            </div>
          </div>
        </div>

        {pnl && (
          <div className="mt-4 p-3.5 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-gray-500">{"\uC624\uB298 \uC218\uC775"}</p>
                <p className={`text-[20px] font-bold mt-0.5 ${pnl.daily_gain >= 0 ? "text-positive" : "text-negative"}`}>
                  {pnl.daily_gain >= 0 ? "+" : ""}{formatMoney(pnl.daily_gain, politician.country)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">{"\uC218\uC775\uB960"}</p>
                <p className={`text-[15px] font-bold ${pnl.daily_return_pct >= 0 ? "text-positive" : "text-negative"}`}>
                  {formatPct(pnl.daily_return_pct)}
                </p>
              </div>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-gray-200">
              <p className="text-[10px] text-gray-400">
                {"\uCD94\uC815 \uD3EC\uD2B8\uD3F4\uB9AC\uC624: "}{formatMoney(pnl.total_portfolio_value, politician.country)}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Holdings */}
      {politicianHoldings.length > 0 && (
        <section className="mt-1">
          <div className="px-5 pb-1.5">
            <h2 className="text-[13px] font-bold text-gray-700">{"\uBCF4\uC720 \uC885\uBAA9"}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {politicianHoldings.map((holding) => (
              <div key={holding.id} className="flex items-center gap-2.5 px-5 py-3">
                <TickerLogo ticker={holding.ticker} size={32} />
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-semibold text-gray-900 block truncate">
                    {politician.country === "KR" ? holding.company_name : holding.ticker}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {politician.country === "KR" ? holding.ticker : holding.company_name}
                  </span>
                </div>
                <div className="text-right">
                  {holding.current_price && (
                    <span className="text-[12px] font-semibold text-gray-900 block">
                      {politician.country === "KR"
                        ? `${holding.current_price.toLocaleString()}원`
                        : `$${holding.current_price.toLocaleString()}`}
                    </span>
                  )}
                  {holding.change_pct !== undefined && (
                    <span className={`text-[10px] font-medium ${holding.change_pct >= 0 ? "text-positive" : "text-negative"}`}>
                      {formatPct(holding.change_pct)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trades */}
      {politicianTrades.length > 0 && (
        <section className="mt-4">
          <div className="px-5 pb-1.5">
            <h2 className="text-[13px] font-bold text-gray-700">{"\uCD5C\uADFC \uAC70\uB798"}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {politicianTrades.map((trade) => (
              <div key={trade.id} className="flex items-center gap-2.5 px-5 py-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold ${
                  trade.trade_type === "buy" ? "bg-positive" : "bg-negative"
                }`}>
                  {trade.trade_type === "buy" ? "B" : "S"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-semibold text-gray-900">
                      {trade.ticker}
                    </span>
                    <span className={`text-[10px] font-medium ${
                      trade.trade_type === "buy" ? "text-positive" : "text-negative"
                    }`}>
                      {trade.trade_type === "buy" ? "\uB9E4\uC218" : "\uB9E4\uB3C4"}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {trade.trade_date} &middot; {"\uACF5\uC2DC "}{getRelativeTime(trade.disclosure_date)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500">
                    ${(trade.amount_low / 1000).toFixed(0)}K~${(trade.amount_high / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}

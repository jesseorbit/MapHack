"use client";

import { trades } from "@/lib/mock-data";
import { getRelativeTime } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";

export default function TradesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-14">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2.5">
          <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
            {"\uCD5C\uADFC \uAC70\uB798"}
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {"STOCK Act \uACF5\uC2DC \uAE30\uBC18 \uC2E4\uC2DC\uAC04 \uC5C5\uB370\uC774\uD2B8"}
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="divide-y divide-gray-50">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center gap-2.5 px-5 py-3 bg-white"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                  trade.trade_type === "buy" ? "bg-positive" : "bg-negative"
                }`}
              >
                {trade.trade_type === "buy" ? "BUY" : "SELL"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-gray-900">
                    {trade.ticker}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {trade.company_name}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-gray-600">
                    {trade.politician.name_kr}
                  </span>
                  <span className="text-[10px] text-gray-300">&middot;</span>
                  <span className="text-[10px] text-gray-400">
                    {trade.politician.party}
                  </span>
                  <span className="text-[10px] text-gray-300">&middot;</span>
                  <span className="text-[10px] text-gray-400">
                    {getRelativeTime(trade.disclosure_date)}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] font-medium text-gray-800">
                  ${(trade.amount_low / 1000).toFixed(0)}K
                </p>
                <p className="text-[9px] text-gray-400">
                  ~${(trade.amount_high / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

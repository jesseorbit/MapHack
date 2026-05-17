"use client";

import { trendingTickers } from "@/lib/mock-data";
import { formatPct } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { TickerLogo } from "@/components/TickerLogo";

export default function StocksPage() {
  return (
    <div className="flex flex-col min-h-screen pb-14">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2.5">
          <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
            {"\uC778\uAE30 \uC885\uBAA9"}
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {"\uC815\uCE58\uC778\uB4E4\uC774 \uAC00\uC7A5 \uB9CE\uC774 \uAC70\uB798\uD558\uB294 \uC885\uBAA9"}
          </p>
        </div>
      </header>

      <main className="flex-1 bg-white">
        {/* Table Header */}
        <div className="flex items-center px-5 py-2 border-b border-gray-100">
          <span className="flex-1 text-[10px] font-medium text-gray-400">{"\uC885\uBAA9"}</span>
          <span className="w-14 text-center text-[10px] font-medium text-gray-400">{"\uB9E4\uC218"}</span>
          <span className="w-14 text-center text-[10px] font-medium text-gray-400">{"\uB9E4\uB3C4"}</span>
          <span className="w-[72px] text-right text-[10px] font-medium text-gray-400">{"\uD604\uC7AC\uAC00"}</span>
        </div>

        <div className="divide-y divide-gray-50">
          {trendingTickers.map((stock) => (
            <div key={stock.ticker} className="flex items-center px-5 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TickerLogo ticker={stock.ticker} size={32} />
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">{stock.ticker}</p>
                    <p className="text-[10px] text-gray-400">{stock.name}</p>
                  </div>
                </div>
              </div>

              <div className="w-14 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-[10px] font-bold text-positive">
                  {stock.buyCount}
                </span>
              </div>

              <div className="w-14 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-[10px] font-bold text-negative">
                  {stock.sellCount}
                </span>
              </div>

              <div className="w-[72px] text-right">
                <p className="text-[11px] font-semibold text-gray-900">
                  ${stock.price.toLocaleString()}
                </p>
                <p className={`text-[10px] font-medium ${stock.change >= 0 ? "text-positive" : "text-negative"}`}>
                  {formatPct(stock.change)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 mt-4 mb-6 p-3.5 bg-blue-50 rounded-xl">
          <p className="text-[11px] font-semibold text-toss-blue">
            {"NVDA\uAC00 \uC774\uBC88 \uC8FC \uAC00\uC7A5 \uC778\uAE30!"}
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5">
            {"14\uBA85\uC758 \uC758\uC6D0\uC774 \uB9E4\uC218, 2\uBA85\uB9CC \uB9E4\uB3C4\uD588\uC5B4\uC694. \uC9C0\uB09C 30\uC77C\uAC04 +23.4% \uC218\uC775\uB960\uC744 \uAE30\uB85D \uC911\uC785\uB2C8\uB2E4."}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

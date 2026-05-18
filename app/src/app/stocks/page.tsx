"use client";

import Link from "next/link";
import { trendingTickers } from "@/lib/mock-data";
import { formatPct } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { TickerLogo } from "@/components/TickerLogo";

export default function StocksPage() {
  return (
    <div className="flex flex-col min-h-screen pb-14">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2.5">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
            {"인기 종목"}
          </h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            {"정치인들이 가장 많이 거래하는 종목"}
          </p>
        </div>
      </header>

      <main className="flex-1 bg-white">
        {/* Table Header */}
        <div className="flex items-center px-5 py-2.5 border-b border-gray-100">
          <span className="flex-1 text-[12px] font-medium text-gray-400">{"종목"}</span>
          <span className="w-14 text-center text-[12px] font-medium text-gray-400">{"매수"}</span>
          <span className="w-14 text-center text-[12px] font-medium text-gray-400">{"매도"}</span>
          <span className="w-[80px] text-right text-[12px] font-medium text-gray-400">{"현재가"}</span>
        </div>

        <div className="divide-y divide-gray-50">
          {trendingTickers.map((stock) => (
            <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="flex items-center px-5 py-3.5 active:bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <TickerLogo ticker={stock.ticker} size={36} />
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{stock.ticker}</p>
                    <p className="text-[12px] text-gray-400">{stock.name}</p>
                  </div>
                </div>
              </div>

              <div className="w-14 text-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-50 text-[12px] font-bold text-positive">
                  {stock.buyCount}
                </span>
              </div>

              <div className="w-14 text-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-[12px] font-bold text-negative">
                  {stock.sellCount}
                </span>
              </div>

              <div className="w-[80px] text-right">
                <p className="text-[13px] font-semibold text-gray-900">
                  ${stock.price.toLocaleString()}
                </p>
                <p className={`text-[12px] font-medium ${stock.change >= 0 ? "text-positive" : "text-negative"}`}>
                  {formatPct(stock.change)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-5 mt-4 mb-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-[13px] font-semibold text-toss-blue">
            {"NVDA가 이번 주 가장 인기!"}
          </p>
          <p className="text-[12px] text-gray-600 mt-0.5">
            {"14명의 의원이 매수, 2명만 매도했어요. 지난 30일간 +23.4% 수익률을 기록 중입니다."}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

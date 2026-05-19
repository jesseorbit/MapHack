"use client";

import Link from "next/link";
import { trades } from "@/lib/mock-data";
import { formatMoney, getRelativeTime, getPartyColor } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { TickerLogo } from "@/components/TickerLogo";

export default function TradesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-14">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-5 pt-3.5 pb-2.5">
          <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
            {"최근 거래"}
          </h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            {"STOCK Act 공시 기반"}
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="divide-y divide-gray-50">
          {trades.slice(0, 100).map((trade) => {
            const pol = trade.politician;
            const isUS = pol.country === "US";
            const amount = (trade.amount_low + trade.amount_high) / 2;
            return (
              <Link key={trade.id} href={`/politician/${pol.id}`} className="block">
                <div className="flex items-center gap-3 px-5 py-3.5 bg-white active:bg-gray-50">
                  {/* Politician avatar */}
                  <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-[15px] font-semibold text-gray-500">
                      {(pol.name_kr || pol.name).charAt(0)}
                    </span>
                    <div
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[1.5px] border-white"
                      style={{ backgroundColor: getPartyColor(pol.party) }}
                    />
                  </div>

                  {/* Trade info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-semibold text-gray-900 truncate">
                        {pol.name_kr || pol.name}
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        trade.trade_type === "buy"
                          ? "bg-green-50 text-positive"
                          : "bg-red-50 text-negative"
                      }`}>
                        {trade.trade_type === "buy" ? "매수" : "매도"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <TickerLogo ticker={trade.ticker} size={16} />
                      <span className="text-[13px] font-medium text-gray-700">
                        {trade.ticker}
                      </span>
                      <span className="text-[12px] text-gray-400 truncate">
                        {trade.company_name}
                      </span>
                    </div>
                  </div>

                  {/* Amount + Date */}
                  <div className="text-right shrink-0">
                    <span className={`text-[14px] font-bold ${
                      trade.trade_type === "buy" ? "text-positive" : "text-negative"
                    }`}>
                      {formatMoney(amount, isUS ? "US" : "KR")}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {getRelativeTime(trade.disclosure_date)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

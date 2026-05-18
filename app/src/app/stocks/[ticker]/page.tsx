"use client";

import { use } from "react";
import Link from "next/link";
import { politicians, holdings, trades } from "@/lib/mock-data";
import { formatPct, getPartyColor, getRelativeTime } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { TickerLogo } from "@/components/TickerLogo";

export default function StockDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const decodedTicker = decodeURIComponent(ticker);

  // Find all politicians holding this stock
  const stockHoldings = holdings
    .filter((h) => h.ticker === decodedTicker || h.company_name === decodedTicker)
    .map((h) => {
      const pol = politicians.find((p) => p.id === h.politician_id);
      return { ...h, politician: pol };
    })
    .filter((h) => h.politician)
    .sort((a, b) => (b.shares ?? 0) - (a.shares ?? 0));

  // Find trades for this stock
  const stockTrades = trades
    .filter((t) => t.ticker === decodedTicker || t.company_name === decodedTicker)
    .sort((a, b) => new Date(b.trade_date).getTime() - new Date(a.trade_date).getTime());

  const displayName = stockHoldings[0]?.company_name || decodedTicker;

  return (
    <div className="flex flex-col min-h-screen pb-14 bg-white">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex items-center h-12 px-4">
          <Link href="/stocks" className="p-2 -ml-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div className="ml-2 flex items-center gap-2">
            <TickerLogo ticker={decodedTicker} size={28} />
            <span className="text-[16px] font-semibold">{displayName}</span>
          </div>
        </div>
      </header>

      {/* Holders */}
      <section className="mt-2">
        <div className="px-5 pb-2">
          <h2 className="text-[15px] font-bold text-gray-700">
            {"보유 중인 정치인"} <span className="text-toss-blue">{stockHoldings.length}명</span>
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {stockHoldings.map((h) => (
            <Link key={h.id} href={`/politician/${h.politician!.id}`} className="block">
              <div className="flex items-center gap-3 px-5 py-3.5 active:bg-gray-50">
                <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-[15px] font-semibold text-gray-500">
                    {(h.politician!.name_kr || h.politician!.name).charAt(0)}
                  </span>
                  <div
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[1.5px] border-white"
                    style={{ backgroundColor: getPartyColor(h.politician!.party) }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[14px] font-semibold text-gray-900 block truncate">
                    {h.politician!.name_kr || h.politician!.name}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {h.politician!.country === "US"
                      ? `${h.politician!.party} · ${h.politician!.state}`
                      : h.politician!.chamber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-semibold text-gray-900">
                    {h.shares?.toLocaleString()}주
                  </span>
                  {h.current_price > 0 && h.shares && (
                    <span className="text-[12px] text-gray-400 block">
                      ${(h.shares * h.current_price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {stockHoldings.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-[14px] text-gray-400">{"보유한 정치인이 없습니다"}</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Trades */}
      {stockTrades.length > 0 && (
        <section className="mt-4">
          <div className="px-5 pb-2">
            <h2 className="text-[15px] font-bold text-gray-700">{"최근 거래"}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {stockTrades.map((trade) => (
              <Link key={trade.id} href={`/politician/${trade.politician.id}`} className="block">
                <div className="flex items-center gap-3 px-5 py-3.5 active:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                    trade.trade_type === "buy" ? "bg-positive" : "bg-negative"
                  }`}>
                    {trade.trade_type === "buy" ? "B" : "S"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-semibold text-gray-900 block">
                      {trade.politician.name_kr || trade.politician.name}
                    </span>
                    <span className="text-[12px] text-gray-400">
                      {trade.trade_date} · {"공시 "}{getRelativeTime(trade.disclosure_date)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[13px] font-semibold ${
                      trade.trade_type === "buy" ? "text-positive" : "text-negative"
                    }`}>
                      {trade.trade_type === "buy" ? "매수" : "매도"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}

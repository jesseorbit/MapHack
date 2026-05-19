"use client";

import Link from "next/link";
import type { Politician, DailyPnl } from "@/types/database";
import { formatMoney, formatPct, getPartyColor } from "@/lib/utils";

type Props = {
  pnl: DailyPnl & { politician: Politician };
  rank: number;
};

export function RankingCard({ pnl, rank }: Props) {
  const { politician } = pnl;
  const isPositive = pnl.daily_gain >= 0;

  return (
    <Link href={`/politician/${politician.id}`} className="block">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white active:bg-gray-50 transition-colors">
        {/* Rank */}
        <div className="w-6 text-center">
          <span className={`text-[14px] font-bold ${rank <= 3 ? "text-toss-blue" : "text-gray-300"}`}>
            {rank}
          </span>
        </div>

        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-[16px] font-semibold text-gray-500">
            {(politician.name_kr || politician.name).charAt(0)}
          </span>
          <div
            className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[1.5px] border-white"
            style={{ backgroundColor: getPartyColor(politician.party) }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold text-gray-900 truncate">
              {politician.name_kr || politician.name}
            </span>
            <span className="text-[12px] text-gray-400 shrink-0">
              {politician.country === "US" ? politician.state : politician.chamber}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            {pnl.top_movers.slice(0, 3).map((ticker) => (
              <span
                key={ticker}
                className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-[1px] rounded"
              >
                {ticker}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Value + Daily Change */}
        <div className="text-right shrink-0">
          <div className="text-[14px] font-semibold text-gray-900">
            {formatMoney(pnl.total_portfolio_value, politician.country)}
          </div>
          {pnl.daily_gain !== 0 && (
            <div className={`text-[11px] font-medium ${isPositive ? "text-positive" : "text-negative"}`}>
              {formatPct(pnl.daily_return_pct)} · {isPositive ? "+" : ""}{formatMoney(pnl.daily_gain, politician.country)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

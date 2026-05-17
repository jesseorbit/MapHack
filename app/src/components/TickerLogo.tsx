"use client";

import { useState } from "react";
import { getTickerLogoUrl } from "@/lib/utils";

type Props = {
  ticker: string;
  size?: number;
  className?: string;
};

export function TickerLogo({ ticker, size = 32, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const logoUrl = getTickerLogoUrl(ticker);

  if (!logoUrl || failed) {
    return (
      <div
        className={`rounded-lg bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[9px] font-bold text-gray-400">
          {ticker.slice(0, 4)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={logoUrl}
        alt={ticker}
        width={size - 6}
        height={size - 6}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

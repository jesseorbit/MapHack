export function formatMoney(amount: number, country: "US" | "KR"): string {
  if (country === "US") {
    if (Math.abs(amount) >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `$${(amount / 1_000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }
  // KR (원화)
  if (Math.abs(amount) >= 100_000_000) {
    return `${(amount / 100_000_000).toFixed(1)}억`;
  }
  if (Math.abs(amount) >= 10_000) {
    return `${(amount / 10_000).toFixed(0)}만`;
  }
  return `${amount.toFixed(0)}원`;
}

export function formatPct(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}

export function getPartyColor(party: string): string {
  const colors: Record<string, string> = {
    Democrat: "#3B82F6",
    Republican: "#EF4444",
    "국민의힘": "#E61E2B",
    "더불어민주당": "#004EA2",
  };
  return colors[party] || "#6B7280";
}

const tickerDomains: Record<string, string> = {
  NVDA: "nvidia.com", AAPL: "apple.com", GOOGL: "abc.xyz", MSFT: "microsoft.com",
  TSLA: "tesla.com", AVGO: "broadcom.com", AMZN: "amazon.com", META: "meta.com",
  LMT: "lockheedmartin.com", RTX: "rtx.com", GD: "gd.com", JPM: "jpmorganchase.com",
  GS: "goldmansachs.com", CRM: "salesforce.com", NOW: "servicenow.com",
  XOM: "exxonmobil.com", CVX: "chevron.com", UNH: "unitedhealthgroup.com",
  JNJ: "jnj.com", PLTR: "palantir.com", BAC: "bankofamerica.com",
  WFC: "wellsfargo.com", PFE: "pfizer.com", MRNA: "modernatx.com",
  DIS: "disney.com", NFLX: "netflix.com", BA: "boeing.com", GE: "geaerospace.com",
  COIN: "coinbase.com", BYND: "beyondmeat.com", RIVN: "rivian.com",
};

export function getTickerLogoUrl(ticker: string): string | null {
  const domain = tickerDomains[ticker];
  if (!domain) return null;
  return `https://logo.clearbit.com/${domain}`;
}

export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  return `${Math.floor(diffDays / 30)}개월 전`;
}

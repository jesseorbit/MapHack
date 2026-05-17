// Supabase Edge Function: 미국 의회 거래 데이터 수집
// Lambda Finance API → trades 테이블 적재
// 스케줄: 매 6시간 (Supabase cron 또는 외부 트리거)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LAMBDA_API_BASE = "https://api.lambdafin.com";
const LAMBDA_API_KEY = Deno.env.get("LAMBDA_FINANCE_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface CongressTrade {
  politician: string;
  party: string;
  state: string;
  chamber: string;
  ticker: string;
  company: string;
  transaction_type: string; // "Purchase" | "Sale"
  amount_low: number;
  amount_high: number;
  trade_date: string;
  filing_date: string;
}

Deno.serve(async (req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Lambda Finance API에서 최근 거래 가져오기
    const res = await fetch(`${LAMBDA_API_BASE}/api/congressional/recent`, {
      headers: {
        Authorization: `Bearer ${LAMBDA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Lambda API error: ${res.status}`);
    }

    const data: CongressTrade[] = await res.json();

    for (const trade of data) {
      // 1) 정치인 upsert
      const { data: politician } = await supabase
        .from("politicians")
        .upsert(
          {
            name: trade.politician,
            party: trade.party,
            country: "US",
            chamber: trade.chamber,
            state: trade.state,
          },
          { onConflict: "name,country" }
        )
        .select("id")
        .single();

      if (!politician) continue;

      // 2) 거래 insert (중복 방지: ticker + trade_date + politician_id)
      await supabase.from("trades").upsert(
        {
          politician_id: politician.id,
          ticker: trade.ticker,
          company_name: trade.company,
          trade_type: trade.transaction_type === "Purchase" ? "buy" : "sell",
          amount_low: trade.amount_low,
          amount_high: trade.amount_high,
          trade_date: trade.trade_date,
          disclosure_date: trade.filing_date,
        },
        { onConflict: "politician_id,ticker,trade_date" }
      );
    }

    return new Response(
      JSON.stringify({ success: true, processed: data.length }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

export type Database = {
  public: {
    Tables: {
      politicians: {
        Row: {
          id: string;
          name: string;
          name_kr: string | null;
          party: string;
          country: "US" | "KR";
          chamber: string | null;
          state: string | null;
          photo_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["politicians"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["politicians"]["Insert"]>;
      };
      holdings: {
        Row: {
          id: string;
          politician_id: string;
          ticker: string;
          company_name: string;
          shares: number | null;
          amount_low: number;
          amount_high: number;
          asset_type: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["holdings"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["holdings"]["Insert"]>;
      };
      trades: {
        Row: {
          id: string;
          politician_id: string;
          ticker: string;
          company_name: string;
          trade_type: "buy" | "sell";
          amount_low: number;
          amount_high: number;
          trade_date: string;
          disclosure_date: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["trades"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["trades"]["Insert"]>;
      };
      daily_pnl: {
        Row: {
          id: string;
          politician_id: string;
          date: string;
          daily_gain: number;
          daily_return_pct: number;
          total_portfolio_value: number;
          top_movers: string[];
          rank: number;
        };
        Insert: Omit<Database["public"]["Tables"]["daily_pnl"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["daily_pnl"]["Insert"]>;
      };
    };
  };
};

export type Politician = Database["public"]["Tables"]["politicians"]["Row"];
export type Holding = Database["public"]["Tables"]["holdings"]["Row"];
export type Trade = Database["public"]["Tables"]["trades"]["Row"];
export type DailyPnl = Database["public"]["Tables"]["daily_pnl"]["Row"];

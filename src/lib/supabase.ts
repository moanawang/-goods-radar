import { createClient } from "@supabase/supabase-js";
import type { StallRow } from "@/lib/data";

type Database = {
  public: {
    Tables: {
      stalls: {
        Row: StallRow;
        Insert: Omit<StallRow, "created_at"> & { created_at?: string };
        Update: Partial<Omit<StallRow, "id" | "created_at">>;
      };
    };
  };
};

function readSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("[supabase] env check", {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    anonKeyLength: supabaseAnonKey?.length ?? 0,
    anonKeyLooksLikeJwt: supabaseAnonKey
      ? supabaseAnonKey.split(".").length === 3
      : false,
    urlHost: supabaseUrl ? new URL(supabaseUrl).host : null,
  });

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function getSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = readSupabaseEnv();

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )
    : null;

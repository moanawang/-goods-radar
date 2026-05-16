import { NextResponse } from "next/server";
import { mapStallRow } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  console.log("[api/stalls] GET all stalls");
  console.log("[api/stalls] env NEXT_PUBLIC_SUPABASE_URL", {
    value: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("stalls")
      .select("*")
      .order("stall_number", { ascending: true });

    console.log("[api/stalls] raw Supabase response", {
      data,
      error,
    });

    if (error) {
      console.log("[api/stalls] supabase error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rawData = data ?? [];
    const mappedData = rawData.map(mapStallRow);

    console.log("[api/stalls] mapStallRow compare", {
      rawCount: rawData.length,
      mappedCount: mappedData.length,
      rawData,
      mappedData,
    });

    return NextResponse.json({ data: rawData });
  } catch (error) {
    console.log("[api/stalls] unexpected error", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "获取摊位失败" },
      { status: 500 },
    );
  }
}

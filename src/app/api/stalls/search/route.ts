import { NextRequest, NextResponse } from "next/server";
import { mapStallRow } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  console.log("查询参数:", q);

  try {
    const supabase = getSupabaseClient();
    const { data, error } = q
  ? await supabase.from("stalls").select("*").contains("ip_list", [q])
  : await supabase.from("stalls").select("*");
    console.log("查询结果:", data, error);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: (data ?? []).map(mapStallRow) });
  } catch (error) {
    console.log("查询结果:", null, error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "搜索摊位失败" },
      { status: 500 },
    );
  }
}

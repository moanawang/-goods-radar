import { NextRequest, NextResponse } from "next/server";
import { mapStallRow } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    console.log("[api/stalls/[id]] request", { id });

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("stalls")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("[api/stalls/[id]] supabase error", {
        id,
        error,
      });

      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json({ error: error.message }, { status });
    }

    const result = mapStallRow(data);
    console.log("[api/stalls/[id]] result", {
      id,
      data: result,
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.log("[api/stalls/[id]] unexpected error", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "获取摊位详情失败" },
      { status: 500 },
    );
  }
}

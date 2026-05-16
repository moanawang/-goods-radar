"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/search-box";
import { StallCard } from "@/components/stall-card";
import { searchStallsByIp } from "@/lib/api-client";
import type { Stall } from "@/lib/data";

export function SearchClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.trim() ?? "";
  const [results, setResults] = useState<Stall[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadStalls() {
      setIsLoading(true);
      setError(null);

      console.log("[search page] load stalls", {
        keyword,
        api: `/api/stalls/search${keyword ? `?q=${keyword}` : ""}`,
      });

      try {
        const data = await searchStallsByIp(keyword);
        if (isCurrent) {
          console.log("[search page] loaded stalls", {
            keyword,
            count: data.length,
            data,
          });
          setResults(data);
        }
      } catch (requestError) {
        if (isCurrent) {
          console.log("[search page] load error", requestError);
          setError(
            requestError instanceof Error
              ? requestError.message
              : "搜索摊位失败",
          );
          setResults([]);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadStalls();

    return () => {
      isCurrent = false;
    };
  }, [keyword]);

  return (
    <main className="min-h-screen bg-white px-5 py-6 text-slate-950">
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#4CAF50]">搜索摊位</p>
          <h1 className="text-2xl font-bold">
            {keyword ? `“${keyword}”相关摊位` : "全部摊位"}
          </h1>
          <p className="text-sm text-slate-500">
            {isLoading
              ? "正在连接摊位数据库..."
              : `共找到 ${results.length} 个可能售卖相关谷子的摊位。`}
          </p>
        </div>

        <SearchBox defaultValue={keyword} />

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-emerald-50"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-red-700">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((stall) => <StallCard key={stall.id} stall={stall} />)
            ) : (
              <div className="rounded-xl bg-emerald-50 p-5 text-center text-sm text-slate-600">
                暂时没有找到匹配摊位，可以试试搜索“jump系”“运动番”或“国乙”。
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

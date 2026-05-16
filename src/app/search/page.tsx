import { Suspense } from "react";
import { SearchClient } from "@/app/search/search-client";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <main className="min-h-screen bg-white px-5 py-6 text-slate-950">
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#4CAF50]">搜索摊位</p>
          <h1 className="text-2xl font-bold">正在加载</h1>
          <p className="text-sm text-slate-500">正在准备搜索页面...</p>
        </div>
        <div className="h-12 rounded-full bg-emerald-50" />
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-32 rounded-xl bg-emerald-50" />
          ))}
        </div>
      </section>
    </main>
  );
}

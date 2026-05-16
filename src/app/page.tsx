import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { popularIps } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-5 py-8 text-slate-950">
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#4CAF50]">Goods Radar</p>
          <h1 className="text-3xl font-bold tracking-tight">谷子雷达</h1>
          <p className="text-sm leading-6 text-slate-500">
            输入想找的 IP，帮助快速定位市集里相关的摊位。
          </p>
        </div>

        <SearchBox placeholder="输入IP搜索" />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">热门 IP</h2>
            <Link href="/search" className="text-sm font-semibold text-[#4CAF50]">
              全部摊位
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {popularIps.map((ip) => (
              <Link
                key={ip}
                href={`/search?q=${encodeURIComponent(ip)}`}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#2e7d32] shadow-sm transition hover:border-[#4CAF50] hover:bg-white"
              >
                {ip}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#4CAF50] p-5 text-white shadow-[0_12px_28px_rgba(76,175,80,0.25)]">
          <p className="text-sm font-semibold opacity-90">今日逛展小助手</p>
          <p className="mt-2 text-2xl font-bold">先搜 IP，再冲摊位</p>
          <p className="mt-2 text-sm leading-6 opacity-90">
            摊位详情里可以看到摊主昵称、分类标签和简介，适合边走边查。
          </p>
        </div>
      </section>
    </main>
  );
}

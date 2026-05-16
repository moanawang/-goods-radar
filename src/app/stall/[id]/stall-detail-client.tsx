"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IpTags } from "@/components/ip-tags";
import { fetchStallById } from "@/lib/api-client";
import type { Stall } from "@/lib/data";

type StallDetailClientProps = {
  id: string;
};

export function StallDetailClient({ id }: StallDetailClientProps) {
  const [stall, setStall] = useState<Stall | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadStall() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchStallById(id);
        if (isCurrent) {
          setStall(data);
        }
      } catch (requestError) {
        if (isCurrent) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "获取摊位详情失败",
          );
          setStall(null);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadStall();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-slate-950">
        <div className="h-64 w-full animate-pulse bg-emerald-50" />
        <section className="space-y-5 px-5 py-6">
          <div className="h-8 w-28 rounded bg-emerald-50" />
          <div className="h-5 w-40 rounded bg-emerald-50" />
          <div className="h-24 rounded-xl bg-emerald-50" />
        </section>
      </main>
    );
  }

  if (error || !stall) {
    return (
      <main className="min-h-screen bg-white px-5 py-8 text-slate-950">
        <Link
          href="/search"
          className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#4CAF50]"
        >
          返回搜索
        </Link>
        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-red-700">
          {error ?? "没有找到这个摊位"}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="relative h-64 w-full overflow-hidden bg-emerald-50">
        <Image
          src={stall.imageUrl || "/poster.png"}
          alt={`${stall.stallNumber} ${stall.ownerName} 摊位照片`}
          fill
          priority
          className="object-cover"
          sizes="390px"
        />
        <Link
          href="/search"
          className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-[#4CAF50] shadow-sm"
        >
          返回
        </Link>
      </div>

      <section className="space-y-6 px-5 py-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#4CAF50]">摊位号</p>
          <h1 className="text-3xl font-bold">{stall.stallNumber}</h1>
          <p className="text-base font-semibold text-slate-700">
            {stall.ownerName}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900">在售 IP 标签</h2>
          <IpTags ips={stall.ipList} />
        </div>

        <div className="rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
          <h2 className="mb-2 text-sm font-bold text-slate-900">摊位简介</h2>
          <p className="text-sm leading-7 text-slate-600">{stall.description}</p>
        </div>
      </section>
    </main>
  );
}

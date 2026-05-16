import Link from "next/link";
import { IpTags } from "@/components/ip-tags";
import type { Stall } from "@/lib/data";

type StallCardProps = {
  stall: Stall;
};

export function StallCard({ stall }: StallCardProps) {
  return (
    <Link
      href={`/stall/${stall.id}`}
      className="block rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#4CAF50]">摊位号</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">
            {stall.stallNumber}
          </h2>
        </div>
        <div className="rounded-full bg-[#4CAF50] px-3 py-1 text-xs font-semibold text-white">
          查看
        </div>
      </div>
      <p className="mb-3 text-sm font-semibold text-slate-700">
        {stall.ownerName}
      </p>
      <IpTags ips={stall.ipList} />
    </Link>
  );
}

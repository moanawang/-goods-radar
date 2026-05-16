import Image from "next/image";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="px-5 py-6">
        <p className="text-sm font-semibold text-[#4CAF50]">市集地图</p>
        <h1 className="mt-2 text-2xl font-bold">摊位分布</h1>
        <p className="mt-2 text-sm text-slate-500">按区域和摊位号快速规划路线。</p>
      </section>

      <div className="w-full overflow-hidden bg-emerald-50">
        <Image
          src="/market-map.png"
          alt="动漫周边市集地图"
          width={780}
          height={1180}
          priority
          className="h-auto w-full"
          sizes="390px"
        />
      </div>
    </main>
  );
}

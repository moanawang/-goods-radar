export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-5 py-8 text-slate-950">
      <section className="space-y-5">
        <div className="h-6 w-24 animate-pulse rounded bg-emerald-50" />
        <div className="h-10 w-44 animate-pulse rounded bg-emerald-50" />
        <div className="h-12 animate-pulse rounded-full bg-emerald-50" />
        <div className="h-32 animate-pulse rounded-xl bg-emerald-50" />
      </section>
    </main>
  );
}

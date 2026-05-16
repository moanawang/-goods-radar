"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="min-h-screen bg-white px-5 py-8 text-slate-950">
      <section className="rounded-xl border border-red-100 bg-red-50 p-5">
        <h1 className="text-lg font-bold text-red-700">页面加载失败</h1>
        <p className="mt-2 text-sm leading-6 text-red-600">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-full bg-[#4CAF50] px-4 py-2 text-sm font-semibold text-white"
        >
          重试
        </button>
      </section>
    </main>
  );
}

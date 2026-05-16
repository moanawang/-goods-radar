"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBoxProps = {
  defaultValue?: string;
  placeholder?: string;
};

export function SearchBox({
  defaultValue = "",
  placeholder = "输入想找的 IP 或分类",
}: SearchBoxProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-12 items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 shadow-sm"
    >
      <span className="text-lg text-[#4CAF50]">⌕</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-full bg-[#4CAF50] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#43a047]"
      >
        搜索
      </button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页", icon: "⌂" },
  { href: "/search", label: "搜索", icon: "⌕" },
  { href: "/map", label: "地图", icon: "◇" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[390px] border-t border-emerald-100 bg-white/95 px-5 py-2 backdrop-blur">
      <div className="grid grid-cols-3 gap-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-14 flex-col items-center justify-center rounded-xl text-xs font-semibold transition ${
                isActive
                  ? "bg-[#4CAF50] text-white"
                  : "text-slate-500 hover:bg-emerald-50 hover:text-[#4CAF50]"
              }`}
            >
              <span className="text-lg leading-5">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    id: "audit",
    label: "AUDIT",
    href: "/quiz",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    id: "results",
    label: "RESULTS",
    href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "hub",
    label: "HUB",
    href: "/dont-wanna-gym",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "PROFILE",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        borderTop: "1px solid rgba(208,255,0,0.1)",
      }}
    >
      {/* Kinetic top accent */}
      <div className="kinetic-bar" />

      <div className="grid grid-cols-4 h-[60px]">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-150 active:scale-95 relative ${
                isActive
                  ? "text-void"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
              style={
                isActive
                  ? {
                      background: "rgba(208,255,0,0.12)",
                    }
                  : {}
              }
            >
              {/* Active indicator bar */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px]"
                  style={{ background: "var(--volt)" }}
                />
              )}

              {/* Icon */}
              <span
                className={`transition-colors duration-150 ${
                  isActive ? "text-volt" : ""
                }`}
              >
                {tab.icon}
              </span>

              {/* Label */}
              <span
                className={`font-mono text-[8px] tracking-widest font-bold transition-colors duration-150 ${
                  isActive ? "text-volt" : ""
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for iPhone notch */}
      <div className="h-safe-area-inset-bottom" style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}

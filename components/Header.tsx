"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";

export default function Header({
  contextLink,
  contextLabel,
}: {
  contextLink: string;
  contextLabel: string;
}) {
  const { user, logOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-surface shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Kinetic top accent bar */}
      <div className="kinetic-bar" />

      <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Brand wordmark — italic Volt */}
        <Link
          href="/"
          className="font-display font-black italic text-2xl text-volt tracking-tight hover:text-white transition-colors duration-200 leading-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          GYMORNOT
        </Link>

        {/* Right — nav actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Context link — subtle mono */}
          <Link
            href={contextLink}
            className="hidden sm:inline font-mono text-[10px] text-ink-dim hover:text-volt transition-colors tracking-widest uppercase whitespace-nowrap"
          >
            {contextLabel}
          </Link>

          <span className="hidden sm:inline font-mono text-[10px] text-zinc-800 select-none">·</span>

          {/* Auth state */}
          {user ? (
            <>
              <span className="font-mono text-[10px] text-zinc-600 max-w-[100px] sm:max-w-[160px] truncate uppercase select-none hidden sm:inline">
                {user.email}
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-zinc-800 select-none">·</span>
              <button
                onClick={logOut}
                className="font-mono text-[10px] text-zinc-500 hover:text-solar-red transition-colors tracking-widest uppercase whitespace-nowrap"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="font-mono text-[10px] text-zinc-500 hover:text-volt transition-colors tracking-widest uppercase whitespace-nowrap"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA — "ESCAPE NOW" */}
          <Link
            href={contextLink}
            className="ml-1 font-display font-black text-xs tracking-wider uppercase bg-volt text-void px-4 py-2 rounded-none hover:bg-white active:scale-95 transition-all duration-150 whitespace-nowrap soft-depth"
          >
            ESCAPE NOW
          </Link>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}

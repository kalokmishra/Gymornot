"use client";

import React, { useState } from "react";
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

  return (
    <header className="border-b border-hairline bg-void sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-display font-black text-2xl text-brand-lime tracking-tight hover:opacity-80 transition-opacity">
          GymOrNot<span className="text-brand-red">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={contextLink}
            className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider whitespace-nowrap"
          >
            {contextLabel}
          </Link>
          
          <span className="font-mono text-xs text-zinc-700 select-none">·</span>

          {user ? (
            <>
              <span className="font-mono text-[10px] text-zinc-500 max-w-[120px] sm:max-w-none truncate uppercase select-none">
                {user.email}
              </span>
              <span className="font-mono text-xs text-zinc-700 select-none">·</span>
              <button
                onClick={logOut}
                className="font-mono text-xs text-zinc-400 hover:text-brand-red transition-colors tracking-wider whitespace-nowrap"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="font-mono text-xs text-zinc-400 hover:text-brand-lime transition-colors tracking-wider whitespace-nowrap"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}

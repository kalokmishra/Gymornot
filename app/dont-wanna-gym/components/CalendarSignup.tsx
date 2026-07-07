"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthProvider";

export default function CalendarSignup() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("gymornot_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    window.localStorage.setItem("gymornot_email", email);
    setIsSubmitted(true);
  };

  const showDownloadDirectly = !!user?.email;

  return (
    <div className="border-2 border-zinc-800 bg-zinc-950 rounded-none relative overflow-hidden">
      {/* Corner badge */}
      <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-zinc-700 bg-void text-brand-red flex items-center justify-center font-display font-black text-2xl pointer-events-none">
        !
      </div>

      <div className="px-6 sm:px-12 py-10 max-w-2xl">
        <p className="font-mono text-[10px] text-brand-lime uppercase tracking-widest mb-4">
          FREE DOWNLOAD // NO MEMBERSHIP REQUIRED
        </p>
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-ink leading-tight mb-4">
          Get the "Bare Minimum" Calendar
        </h2>
        <p className="font-mono text-sm text-zinc-500 leading-relaxed border-b border-dashed border-zinc-700 pb-6 mb-8">
          A zero-stress, printable 30-day sheet. Put it on your fridge. Cross off a day just for doing 5 minutes of moving. No memberships required.
        </p>

        {showDownloadDirectly ? (
          <div className="border border-dashed border-brand-lime/30 bg-brand-lime/5 p-6 rounded-none">
            <p className="font-mono text-sm text-brand-lime font-bold uppercase tracking-widest mb-2">
              LOGGED IN: {user.email} // ACCESS GRANTED
            </p>
            <p className="font-mono text-xs text-zinc-500 mb-6">
              Click below to download your printable tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.pdf"
              download
              className="inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 hover:bg-white transition-colors rounded-none"
            >
              📥 DOWNLOAD PDF
            </a>
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 border border-zinc-700 overflow-hidden">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR_EMAIL@HERE.COM"
              className="flex-1 bg-void px-5 py-4 font-mono text-sm text-ink placeholder:text-zinc-700 focus:outline-none focus:bg-zinc-900 rounded-none"
            />
            <button
              type="submit"
              className="bg-brand-lime text-void font-display font-black uppercase whitespace-nowrap px-6 py-4 text-xs hover:bg-white transition-colors rounded-none"
            >
              GET PDF →
            </button>
          </form>
        ) : (
          <div className="border border-dashed border-brand-lime/30 bg-brand-lime/5 p-6 rounded-none">
            <p className="font-mono text-sm text-brand-lime font-bold uppercase tracking-widest mb-2">
              ✓ CALENDAR READY
            </p>
            <p className="font-mono text-xs text-zinc-500 mb-6">
              Click below to download your printable tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.pdf"
              download
              className="inline-block font-display font-black text-xs uppercase bg-brand-lime text-void px-6 py-3 hover:bg-white transition-colors rounded-none"
            >
              📥 DOWNLOAD PDF
            </a>
          </div>
        )}

        <p className="font-mono text-[10px] text-zinc-700 mt-4">
          * We hate spam as much as we hate 5 AM alarm clocks.
        </p>
      </div>
    </div>
  );
}

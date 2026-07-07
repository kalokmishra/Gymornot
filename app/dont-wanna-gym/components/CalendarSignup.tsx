"use client";

import React, { useState, useEffect } from "react";

export default function CalendarSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Populate email from localStorage if available
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

  return (
    <div className="border border-hairline bg-surface p-8 text-center relative font-body rounded-3xl overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-hairline bg-surface-raised text-brand-red flex items-center justify-center font-display font-black text-2xl pointer-events-none rounded-bl-3xl">
        !
      </div>
      
      <div className="mx-auto max-w-lg">
        <span className="text-xs uppercase font-bold text-brand-lime tracking-widest inline-block mb-4 bg-brand-lime/10 px-3 py-1 rounded-full">
          Free Download
        </span>
        <h2 className="text-3xl font-display font-black uppercase text-ink sm:text-4xl">
          Get the "Bare Minimum" Calendar
        </h2>
        <p className="mt-4 text-sm font-bold text-ink-dim border-b border-hairline border-dashed pb-6 uppercase">
          A zero-stress, printable 30-day sheet. Put it on your fridge. Cross off a day just for doing 5 minutes of moving. No memberships required.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR_EMAIL@HERE.COM"
              className="w-full max-w-xs border border-hairline bg-void px-5 py-3 text-sm font-bold text-ink placeholder:text-ink-dim rounded-xl focus:outline-none focus:border-brand-lime"
            />
            <button
              type="submit"
              className="bg-brand-lime text-void font-display font-black uppercase whitespace-nowrap px-6 py-3 text-sm rounded-full hover:bg-ink transition-all"
            >
              Get PDF &rarr;
            </button>
          </form>
        ) : (
          <div className="mt-8 p-6 border border-brand-lime bg-brand-lime/5 rounded-2xl">
            <p className="text-lg font-display font-black uppercase text-brand-lime">✓ Calendar Ready!</p>
            <p className="mt-2 text-sm font-bold text-ink-dim uppercase">
              Click below to download your printable tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 bg-brand-lime text-void font-display font-black uppercase px-6 py-3 text-xs rounded-full hover:bg-ink transition-all"
            >
              📥 Download PDF
            </a>
          </div>
        )}

        <p className="mt-6 text-xs font-bold text-ink-dim italic">
          We hate spam as much as we hate 5 AM alarm clocks.
        </p>
      </div>
    </div>
  );
}

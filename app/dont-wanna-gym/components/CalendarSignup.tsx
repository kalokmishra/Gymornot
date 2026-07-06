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
    <div className="panel-card rounded-[2rem] p-8 border border-white/10 bg-[#0b1320] shadow-xl text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gym-green/5 rounded-bl-full pointer-events-none" />
      
      <div className="mx-auto max-w-lg">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gym-green">
          Email Retention Hook
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Get the "Bare Minimum" Calendar
        </h2>
        <p className="mt-3 text-sm text-ink-dim leading-6">
          A zero-stress, printable 30-day sheet. Put it on your fridge. Cross off a day just for doing 5 minutes of moving, walking, or breathing aggressively. No memberships required.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to download"
              className="w-full max-w-xs rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-ink placeholder-ink-dim outline-none transition focus:border-gym-green/50 focus:bg-white/10"
            />
            <button
              type="submit"
              className="cta-primary whitespace-nowrap px-6 py-3 text-sm"
            >
              Get My Calendar PDF
            </button>
          </form>
        ) : (
          <div className="mt-8 p-6 rounded-2xl border border-gym-green/20 bg-gym-green/5 animate-fade-in">
            <p className="text-sm font-semibold text-gym-green">✓ Your calendar is ready!</p>
            <p className="mt-1 text-xs text-ink-dim">
              We've saved your details. Click below to download your printable 30-day tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.md"
              download
              className="mt-4 inline-flex items-center gap-2 cta-primary px-6 py-2 text-xs"
            >
              📥 Download Calendar (.md)
            </a>
          </div>
        )}

        <p className="mt-4 text-[0.7rem] text-ink-dim/40">
          We hate spam as much as we hate 5 AM alarm clocks. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

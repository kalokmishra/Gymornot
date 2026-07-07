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
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#111] p-8 text-center relative font-mono transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#111]">
      <div className="absolute top-0 right-0 w-16 h-16 bg-black text-white flex items-center justify-center font-black text-2xl pointer-events-none">
        !
      </div>
      
      <div className="mx-auto max-w-lg">
        <span className="text-xs uppercase font-black bg-black text-white px-2 py-1 inline-block mb-4">
          Free Download
        </span>
        <h2 className="text-3xl font-black uppercase text-black sm:text-4xl">
          Get the "Bare Minimum" Calendar
        </h2>
        <p className="mt-4 text-sm font-bold text-black border-b-4 border-black border-dashed pb-4">
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
              className="w-full max-w-xs border-4 border-black rounded-none bg-gray-100 px-5 py-3 text-sm font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]"
            />
            <button
              type="submit"
              className="bg-gym-green border-4 border-black shadow-[4px_4px_0px_#111] font-black uppercase whitespace-nowrap px-6 py-3 text-sm hover:bg-green-400 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              Get PDF &rarr;
            </button>
          </form>
        ) : (
          <div className="mt-8 p-6 border-4 border-black bg-green-200">
            <p className="text-lg font-black uppercase text-black">✓ Calendar Ready!</p>
            <p className="mt-2 text-sm font-bold text-black">
              Click below to download your printable tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 bg-white border-4 border-black shadow-[4px_4px_0px_#111] font-black uppercase px-6 py-3 text-xs hover:bg-gray-100 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              📥 Download PDF
            </a>
          </div>
        )}

        <p className="mt-6 text-xs font-bold text-black italic">
          We hate spam as much as we hate 5 AM alarm clocks.
        </p>
      </div>
    </div>
  );
}

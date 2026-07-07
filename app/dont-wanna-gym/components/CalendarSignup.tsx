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
    <div className="bg-black border-4 border-white shadow-[8px_8px_0px_#fff] p-8 text-center relative font-mono transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#fff]">
      <div className="absolute top-0 right-0 w-16 h-16 bg-white text-black flex items-center justify-center font-black text-2xl pointer-events-none">
        !
      </div>
      
      <div className="mx-auto max-w-lg">
        <span className="text-xs uppercase font-black bg-white text-black px-2 py-1 inline-block mb-4">
          Free Download
        </span>
        <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
          Get the "Bare Minimum" Calendar
        </h2>
        <p className="mt-4 text-sm font-bold text-gray-300 border-b-4 border-white border-dashed pb-4">
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
              className="w-full max-w-xs border-4 border-white rounded-none bg-[#222] px-5 py-3 text-sm font-bold text-white placeholder:text-gray-500 focus:outline-none focus:bg-[#333] focus:shadow-[inset_4px_4px_0px_rgba(255,255,255,0.1)]"
            />
            <button
              type="submit"
              className="bg-gym-green text-black border-4 border-white shadow-[4px_4px_0px_#fff] font-black uppercase whitespace-nowrap px-6 py-3 text-sm hover:bg-green-400 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              Get PDF &rarr;
            </button>
          </form>
        ) : (
          <div className="mt-8 p-6 border-4 border-white bg-green-900">
            <p className="text-lg font-black uppercase text-white">✓ Calendar Ready!</p>
            <p className="mt-2 text-sm font-bold text-gray-200">
              Click below to download your printable tracker.
            </p>
            <a
              href="/downloads/Anti-Gym-Bare-Minimum-Calendar.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 bg-white text-black border-4 border-white shadow-[4px_4px_0px_#fff] font-black uppercase px-6 py-3 text-xs hover:bg-gray-200 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              📥 Download PDF
            </a>
          </div>
        )}

        <p className="mt-6 text-xs font-bold text-gray-400 italic">
          We hate spam as much as we hate 5 AM alarm clocks.
        </p>
      </div>
    </div>
  );
}

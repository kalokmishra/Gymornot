"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { signIn } from "next-auth/react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    user,
    logInLocal,
    signUpLocal,
    resetPinLocal,
    resetTargetEmail,
    clearResetTarget,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "signup" | "forgot" | "reset">("signin");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Automatically open modal in "reset" mode if a Google-verified target is found
  useEffect(() => {
    if (resetTargetEmail) {
      setTab("reset");
    }
  }, [resetTargetEmail]);

  if (!isOpen && !resetTargetEmail) return null;

  const handleClose = () => {
    setError("");
    setSuccess("");
    setEmail("");
    setPin("");
    setNewPin("");
    if (resetTargetEmail) {
      clearResetTarget();
    }
    onClose();
  };

  const handleLocalSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pin.length !== 4 || isNaN(Number(pin))) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    const res = await logInLocal(email, pin);
    if (res.success) {
      setSuccess("Logged in successfully.");
      setTimeout(() => {
        handleClose();
      }, 800);
    } else {
      setError(res.error || "Failed to sign in.");
    }
  };

  const handleLocalSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pin.length !== 4 || isNaN(Number(pin))) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    const res = await signUpLocal(email, pin);
    if (res.success) {
      setSuccess("Account created successfully.");
      setTimeout(() => {
        handleClose();
      }, 800);
    } else {
      setError(res.error || "Failed to sign up.");
    }
  };

  const handleForgotPIN = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Verify if account exists locally before triggering Google reset
    const accountsStr = window.localStorage.getItem("gymornot_local_accounts");
    const accounts = accountsStr ? JSON.parse(accountsStr) : {};
    if (!accounts[email.trim().toLowerCase()]) {
      setError("This email address is not registered locally. Sign up first.");
      return;
    }

    // Set target email to verify in localStorage, then initiate Google verification
    window.localStorage.setItem("gymornot_reset_pin_target", email.trim().toLowerCase());
    signIn("google");
  };

  const handleResetPIN = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPin.length !== 4 || isNaN(Number(newPin))) {
      setError("New PIN must be exactly 4 digits.");
      return;
    }

    if (resetTargetEmail) {
      resetPinLocal(resetTargetEmail, newPin);
      setSuccess("PIN reset successful. Logged in.");
      setTimeout(() => {
        handleClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-void/85 backdrop-blur-sm p-4">
      {/* Modal Card */}
      <div className="w-full max-w-sm border-2 border-zinc-800 bg-void p-6 rounded-none relative">
        
        {/* Close Button */}
        {!resetTargetEmail && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 font-mono text-sm text-zinc-500 hover:text-ink transition-colors"
          >
            ✕
          </button>
        )}

        {/* Tab Headers */}
        {tab !== "forgot" && tab !== "reset" && (
          <div className="flex border-b border-zinc-800 mb-6">
            <button
              onClick={() => { setTab("signin"); setError(""); }}
              className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider ${
                tab === "signin" ? "border-b-2 border-brand-lime text-ink font-bold" : "text-zinc-500 hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("signup"); setError(""); }}
              className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider ${
                tab === "signup" ? "border-b-2 border-brand-lime text-ink font-bold" : "text-zinc-500 hover:text-ink"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Notification alerts */}
        {error && (
          <div className="mb-4 border border-brand-red/30 bg-brand-red/5 p-3 font-mono text-xs text-brand-red">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 border border-brand-lime/30 bg-brand-lime/5 p-3 font-mono text-xs text-brand-lime">
            {success}
          </div>
        )}

        {/* SIGN IN VIEW */}
        {tab === "signin" && (
          <form onSubmit={handleLocalSignIn} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOU@EMAIL.COM"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  4-DIGIT PIN
                </label>
                <button
                  type="button"
                  onClick={() => { setTab("forgot"); setError(""); }}
                  className="font-mono text-[9px] text-brand-red hover:underline tracking-widest uppercase"
                >
                  Forgot PIN?
                </button>
              </div>
              <input
                type="password"
                required
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink tracking-widest focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-lime text-void font-display font-black text-xs uppercase w-full py-3 rounded-none hover:bg-white transition-colors"
            >
              CONFIRM SIGN IN →
            </button>
            <div className="border-t border-zinc-800 pt-4 text-center">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="font-mono text-[10px] text-zinc-500 hover:text-brand-lime transition-colors uppercase tracking-wider"
              >
                Or sign in with Google →
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP VIEW */}
        {tab === "signup" && (
          <form onSubmit={handleLocalSignUp} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOU@EMAIL.COM"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                CREATE 4-DIGIT PIN
              </label>
              <input
                type="password"
                required
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink tracking-widest focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-lime text-void font-display font-black text-xs uppercase w-full py-3 rounded-none hover:bg-white transition-colors"
            >
              CREATE ACCOUNT →
            </button>
            <div className="border-t border-zinc-800 pt-4 text-center">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="font-mono text-[10px] text-zinc-500 hover:text-brand-lime transition-colors uppercase tracking-wider"
              >
                Or sign up with Google →
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PIN VIEW */}
        {tab === "forgot" && (
          <form onSubmit={handleForgotPIN} className="space-y-5">
            <div>
              <p className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-3">
                // FORGOTTEN CREDENTIALS REPORT //
              </p>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed mb-4">
                WE DO NOT STORE PASSWORDS ON A SERVER. TO SECURELY RESET YOUR PIN, YOU MUST LOG IN VIA GOOGLE AUTHENTICATION TO PROVE YOU OWN THIS EMAIL.
              </p>
              <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                EMAIL TO VERIFY
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOU@EMAIL.COM"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-red text-white font-display font-black text-xs uppercase w-full py-3 rounded-none hover:bg-red-700 transition-colors"
            >
              VERIFY WITH GOOGLE →
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => { setTab("signin"); setError(""); }}
                className="font-mono text-[9px] text-zinc-500 hover:text-ink transition-colors uppercase tracking-widest"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* RESET PIN VIEW */}
        {tab === "reset" && (
          <form onSubmit={handleResetPIN} className="space-y-5">
            <div>
              <p className="font-mono text-[10px] text-brand-lime uppercase tracking-widest mb-3">
                // GOOGLE VERIFICATION SUCCESSFUL //
              </p>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed mb-4">
                OWNERSHIP CONFIRMED FOR <span className="text-brand-lime">{resetTargetEmail}</span>. SET A NEW 4-DIGIT PIN FOR YOUR LOCAL LOGINS:
              </p>
              <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                NEW 4-DIGIT PIN
              </label>
              <input
                type="password"
                required
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="••••"
                className="bg-zinc-950 border border-zinc-700 w-full px-3 py-2 font-mono text-sm text-ink tracking-widest focus:outline-none focus:border-zinc-400 rounded-none placeholder:text-zinc-700"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-lime text-void font-display font-black text-xs uppercase w-full py-3 rounded-none hover:bg-white transition-colors"
            >
              RESET PIN & LOG IN →
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

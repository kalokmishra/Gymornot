"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession, signOut as nextAuthSignOut } from "next-auth/react";

interface AuthUser {
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logInLocal: (email: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  signUpLocal: (email: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  logOut: () => void;
  resetPinLocal: (email: string, newPin: string) => void;
  triggerResetMode: (email: string) => void;
  resetTargetEmail: string | null;
  clearResetTarget: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function InnerAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetTargetEmail, setResetTargetEmail] = useState<string | null>(null);

  // Load local auth state on mount
  useEffect(() => {
    const storedUser = window.localStorage.getItem("gymornot_current_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        window.localStorage.removeItem("gymornot_current_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Sync next-auth session to state and handle Google-verified PIN reset
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const googleEmail = session.user.email.toLowerCase();
      const resetTarget = window.localStorage.getItem("gymornot_reset_pin_target");

      if (resetTarget && resetTarget.toLowerCase() === googleEmail) {
        // Verification success: activate reset mode
        setResetTargetEmail(resetTarget);
        window.localStorage.removeItem("gymornot_reset_pin_target");
      } else {
        const authUser = { email: googleEmail };
        setUser(authUser);
        window.localStorage.setItem("gymornot_current_user", JSON.stringify(authUser));
        window.localStorage.setItem("gymornot_email", googleEmail);
      }
    } else if (status === "unauthenticated" && !window.localStorage.getItem("gymornot_current_user")) {
      setUser(null);
    }
  }, [session, status]);

  // Client-side local accounts database
  const getLocalAccounts = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const accounts = window.localStorage.getItem("gymornot_local_accounts");
    return accounts ? JSON.parse(accounts) : {};
  };

  const saveLocalAccounts = (accounts: Record<string, string>) => {
    window.localStorage.setItem("gymornot_local_accounts", JSON.stringify(accounts));
  };

  const logInLocal = async (email: string, pin: string): Promise<{ success: boolean; error?: string }> => {
    const accounts = getLocalAccounts();
    const cleanEmail = email.trim().toLowerCase();
    
    if (!accounts[cleanEmail]) {
      return { success: false, error: "Account not found. Please sign up." };
    }
    if (accounts[cleanEmail] !== pin) {
      return { success: false, error: "Incorrect 4-digit PIN." };
    }

    const authUser = { email: cleanEmail };
    setUser(authUser);
    window.localStorage.setItem("gymornot_current_user", JSON.stringify(authUser));
    window.localStorage.setItem("gymornot_email", cleanEmail);
    return { success: true };
  };

  const signUpLocal = async (email: string, pin: string): Promise<{ success: boolean; error?: string }> => {
    const accounts = getLocalAccounts();
    const cleanEmail = email.trim().toLowerCase();

    if (accounts[cleanEmail]) {
      return { success: false, error: "Email is already registered. Please sign in." };
    }

    // Register account locally
    accounts[cleanEmail] = pin;
    saveLocalAccounts(accounts);

    const authUser = { email: cleanEmail };
    setUser(authUser);
    window.localStorage.setItem("gymornot_current_user", JSON.stringify(authUser));
    window.localStorage.setItem("gymornot_email", cleanEmail);
    return { success: true };
  };

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem("gymornot_current_user");
    window.localStorage.removeItem("gymornot_email");
    if (status === "authenticated") {
      nextAuthSignOut({ redirect: false });
    }
  };

  const triggerResetMode = (email: string) => {
    setResetTargetEmail(email.trim().toLowerCase());
  };

  const clearResetTarget = () => {
    setResetTargetEmail(null);
  };

  const resetPinLocal = (email: string, newPin: string) => {
    const accounts = getLocalAccounts();
    const cleanEmail = email.trim().toLowerCase();
    accounts[cleanEmail] = newPin;
    saveLocalAccounts(accounts);
    
    // Log them in immediately after reset
    const authUser = { email: cleanEmail };
    setUser(authUser);
    window.localStorage.setItem("gymornot_current_user", JSON.stringify(authUser));
    window.localStorage.setItem("gymornot_email", cleanEmail);
    clearResetTarget();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading || status === "loading",
        logInLocal,
        signUpLocal,
        logOut,
        resetPinLocal,
        triggerResetMode,
        resetTargetEmail,
        clearResetTarget,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

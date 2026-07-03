"use client";
import { useEffect, useState } from "react";

export default function AuthCallback() {
  const [status, setStatus] = useState("Checking session...");

  useEffect(() => {
    (async () => {
      setStatus("Verifying... (you may be prompted to sign in)");
      const res = await fetch("/api/admin/whoami");
      const data = await res.json();
      if (res.ok && data.isAdmin) {
        // set admin_session cookie via backend (not required if middleware checks session cookie),
        // but we'll just redirect to /admin which will now be accessible because middleware allows auth-callback.
        window.location.href = "/admin";
      } else {
        setStatus(data.error || "Not authorized");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Auth callback</h1>
      <p>{status}</p>
      <p>If you're not authorized, sign in with a different account.</p>
    </div>
  );
}

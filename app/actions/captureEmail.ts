"use server";

/**
 * captureEmail — Next.js Server Action
 *
 * Sends a captured email address to the configured webhook endpoint.
 * Requires the EMAIL_CAPTURE_WEBHOOK_URL environment variable to be set.
 *
 * This is intentionally lightweight and serverless — no database packages
 * or third-party SDKs. All data is sent as a plain JSON POST.
 *
 * Usage:
 *   import { captureEmail } from "@/app/actions/captureEmail";
 *   await captureEmail("user@example.com");
 */

export async function captureEmail(email: string): Promise<void> {
  const webhookUrl = process.env.EMAIL_CAPTURE_WEBHOOK_URL;

  // If no webhook is configured, silently skip — don't block the user flow
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info("[captureEmail] EMAIL_CAPTURE_WEBHOOK_URL not set — skipping webhook call.");
    }
    return;
  }

  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[captureEmail] Invalid email format — skipping webhook call.");
    }
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: trimmed,
        source: "gymornot",
        captured_at: new Date().toISOString(),
      }),
    });

    if (!res.ok && process.env.NODE_ENV === "development") {
      console.warn(`[captureEmail] Webhook returned ${res.status}.`);
    }
  } catch (err) {
    // Never throw — email capture is a non-critical side effect
    if (process.env.NODE_ENV === "development") {
      console.error("[captureEmail] Webhook call failed:", err);
    }
  }
}

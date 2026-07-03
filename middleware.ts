import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin UI and admin API
  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isLoginPath = [
    "/admin/login",
    "/admin/login/",
    "/admin/auth-callback",
    "/admin/auth-callback/",
  ].includes(pathname);

  const isAllowedApi = ["/api/admin/login", "/api/admin/logout"].some((p) => pathname === p || pathname === p + "/");

  if (!isAdminPath) return NextResponse.next();

  if (isLoginPath || isAllowedApi) return NextResponse.next();

  // Try NextAuth token first
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const adminUsers = (process.env.ADMIN_USERS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const userEmail = (token?.email || "").toLowerCase();
    const isAdmin = !!token && adminUsers.length > 0 && adminUsers.includes(userEmail);
    if (isAdmin) return NextResponse.next();
  } catch (e) {
    // ignore token parse errors and fall back to cookie
    console.error("Middleware token check error:", e);
  }

  // Fallback: simple cookie-based admin_session (for legacy password flow)
  const cookie = req.cookies.get("admin_session")?.value;
  const authorized = cookie === "1";

  if (!authorized) {
    if (pathname.startsWith("/api/admin")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

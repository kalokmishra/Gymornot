import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body?.password ?? "");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    // set simple cookie session
    const maxAge = 60 * 60 * 8; // 8 hours
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.headers.set("Set-Cookie", `admin_session=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

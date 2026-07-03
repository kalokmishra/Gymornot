import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const adminUsers = (process.env.ADMIN_USERS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const isAdmin = !!session && adminUsers.length > 0 && adminUsers.includes((session.user?.email || "").toLowerCase());

    return NextResponse.json({ ok: true, session: session ?? null, isAdmin });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

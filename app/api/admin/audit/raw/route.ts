import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const auditPath = path.join(process.cwd(), "logs", "upload-audit.jsonl");
    const raw = await fs.readFile(auditPath, "utf8");
    return new Response(raw, {
      status: 200,
      headers: { 'Content-Type': 'text/plain', 'Content-Disposition': 'attachment; filename="upload-audit.jsonl"' },
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const auditPath = path.join(process.cwd(), "logs", "upload-audit.jsonl");
    const raw = await fs.readFile(auditPath, "utf8");
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const entries = lines.map((l) => {
      try { return JSON.parse(l); } catch { return { raw: l }; }
    });
    return NextResponse.json({ ok: true, entries });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

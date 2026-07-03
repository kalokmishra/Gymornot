import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

async function csvParse(input: string) {
  const rows: string[][] = [];
  let i = 0;
  const len = input.length;
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;

  while (i < len) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(cur);
        cur = "";
      } else if (ch === '\r') {
      } else if (ch === '\n') {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      } else {
        cur += ch;
      }
    }
    i += 1;
  }
  if (cur !== "" || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows: string[][]) {
  const [header, ...data] = rows;
  if (!header) return [];
  return data.map((r) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < header.length; i++) {
      const key = (header[i] || "").trim();
      obj[key] = (r[i] || "").trim();
    }
    return obj;
  });
}

function buildQuestions(objs: Record<string, string>[]) {
  return objs.map((o) => {
    const options: { label: string; score: number }[] = [];
    for (let i = 1; i <= 4; i++) {
      const label = o[`option${i}_label`];
      const score = o[`option${i}_score`];
      if (label) options.push({ label, score: Number(score || 0) });
    }
    return {
      id: o.id || undefined,
      eyebrow: o.eyebrow || "",
      prompt: o.prompt || "",
      options,
    };
  });
}

export async function POST() {
  try {
    const id = process.env.SHEET_ID;
    const gid = process.env.SHEET_GID || '0';
    if (!id) return NextResponse.json({ ok: false, error: 'SHEET_ID not configured' }, { status: 400 });

    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
    const res = await fetch(csvUrl);
    if (!res.ok) return NextResponse.json({ ok: false, error: `Failed to fetch sheet: ${res.status}` }, { status: 502 });
    const text = await res.text();
    const rows = await csvParse(text);
    const objs = rowsToObjects(rows);
    const questions = buildQuestions(objs);

    if (questions.length === 0) return NextResponse.json({ ok: false, error: 'No questions parsed' }, { status: 400 });

    const out = path.join(process.cwd(), 'lib', 'questions.json');
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, JSON.stringify(questions, null, 2), 'utf8');

    // Audit
    try {
      const session = await getServerSession(authOptions as any);
      const userEmail = session?.user?.email ?? null;
      const userName = session?.user?.name ?? null;
      const ip = 'system';
      const auditDir = path.join(process.cwd(), 'logs');
      await fs.mkdir(auditDir, { recursive: true });
      const auditPath = path.join(auditDir, 'upload-audit.jsonl');
      const entry = {
        timestamp: new Date().toISOString(),
        userEmail,
        userName,
        ip,
        source: `auto-sync:${id}:${gid}`,
        questionCount: questions.length,
      };
      await fs.appendFile(auditPath, JSON.stringify(entry) + '\n', 'utf8');
    } catch (auditErr) {
      console.error('Audit log error:', auditErr);
    }

    return NextResponse.json({ ok: true, wrote: questions.length });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

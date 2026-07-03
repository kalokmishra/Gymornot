import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as unknown as File | null;
    if (!file) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    const text = await file.text();
    const rows = await csvParse(text);
    const objs = rowsToObjects(rows);

    const questions = objs.map((o) => {
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

    return NextResponse.json({ ok: true, questions });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

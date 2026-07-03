#!/usr/bin/env node
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

function usage() {
  console.log(`Usage:
  node scripts/import_from_google_sheet.mjs --url="CSV_URL" [--out=lib/questions.json]
Or provide spreadsheet id and gid:
  node scripts/import_from_google_sheet.mjs --id=SPREADSHEET_ID --gid=SHEET_GID [--out=lib/questions.json]

Expected CSV columns (header): id,eyebrow,prompt,option1_label,option1_score,option2_label,option2_score,option3_label,option3_score,option4_label,option4_score
`);
}

function parseArgs(argv) {
  const args = {};
  for (const a of argv.slice(2)) {
    const [k, v] = a.split("=");
    if (!v) continue;
    args[k.replace(/^--/, "")] = v.replace(/^"|"$/g, "");
  }
  return args;
}

function csvParse(input) {
  const rows = [];
  let i = 0;
  const len = input.length;
  let cur = "";
  let row = [];
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
        // ignore
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
  // last
  if (cur !== "" || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  const [header, ...data] = rows;
  if (!header) return [];
  return data.map((r) => {
    const obj = {};
    for (let i = 0; i < header.length; i++) {
      const key = (header[i] || "").trim();
      obj[key] = (r[i] || "").trim();
    }
    return obj;
  });
}

function buildQuestions(objs) {
  return objs.map((o) => {
    const options = [];
    for (let i = 1; i <= 8; i += 2) {
      const label = o[`option${(i + 1) / 2}_label`];
      const score = o[`option${(i + 1) / 2}_score`];
      if (label) {
        options.push({ label: label, score: Number(score || 0) });
      }
    }
    return {
      id: o.id || undefined,
      eyebrow: o.eyebrow || "",
      prompt: o.prompt || "",
      options,
    };
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const out = args.out || path.join(process.cwd(), "lib", "questions.json");

  let csvUrl = args.url;
  if (!csvUrl && args.id && args.gid) {
    csvUrl = `https://docs.google.com/spreadsheets/d/${args.id}/export?format=csv&gid=${args.gid}`;
  }

  if (!csvUrl) {
    usage();
    process.exit(1);
  }

  console.log(`Fetching CSV from ${csvUrl}`);
  const res = await fetch(csvUrl);
  if (!res.ok) {
    console.error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
    process.exit(2);
  }
  const text = await res.text();
  const rows = csvParse(text);
  const objs = rowsToObjects(rows);
  const questions = buildQuestions(objs);

  // Validate minimal
  if (questions.length === 0) {
    console.error("No questions parsed from CSV.");
    process.exit(3);
  }

  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(questions, null, 2), "utf8");
  console.log(`Wrote ${questions.length} questions to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(99);
});

#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

async function csvFetch(sheetId, gid='0') {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
  return await res.text();
}

function csvParse(text) {
  const rows = [];
  let cur=''; let row=[]; let inQ=false; for (let i=0;i<text.length;i++){const ch=text[i]; if(inQ){ if(ch==='"'){ if(text[i+1]==='"'){cur+='"'; i++;} else inQ=false;} else cur+=ch;} else { if(ch==='"'){inQ=true;} else if(ch===','){row.push(cur); cur='';} else if(ch==='\n'){row.push(cur); rows.push(row); row=[]; cur='';} else if(ch!=='\r') cur+=ch; }} if(cur!==''||row.length>0){row.push(cur); rows.push(row);} return rows;
}

function rowsToObjects(rows){ const [h,...d]=rows; if(!h) return []; return d.map(r=>{ const o={}; for(let i=0;i<h.length;i++){ o[(h[i]||'').trim()] = (r[i]||'').trim(); } return o; }); }

function buildQuestions(objs){ return objs.map(o=>{ const options=[]; for(let i=1;i<=4;i++){ const label=o[`option${i}_label`]; const score=o[`option${i}_score`]; if(label) options.push({label, score: Number(score||0)}); } return { id: o.id||undefined, eyebrow: o.eyebrow||'', prompt: o.prompt||'', options }; }); }

async function main(){
  const sheetId = process.env.SHEET_ID || process.argv[2];
  const gid = process.env.SHEET_GID || process.argv[3] || '0';
  if(!sheetId){ console.error('Provide SHEET_ID env or first arg'); process.exit(2);} 
  const txt = await csvFetch(sheetId,gid);
  const rows = csvParse(txt);
  const objs = rowsToObjects(rows);
  const questions = buildQuestions(objs);
  if(questions.length===0){ console.error('No questions parsed'); process.exit(3);} 
  const out = path.join(process.cwd(),'lib','questions.json'); await fs.mkdir(path.dirname(out), {recursive:true}); await fs.writeFile(out, JSON.stringify(questions,null,2),'utf8');
  console.log(`Wrote ${questions.length} questions to ${out}`);
}

main().catch(e=>{ console.error(e); process.exit(99); });

"use client";
import { useEffect, useState } from "react";

export default function AdminConsole() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);

  useEffect(() => {
    fetch("/api/quiz-data")
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions || []))
      .catch(() => setQuestions([]));
  }, []);

  async function handlePreview(e: any) {
    e.preventDefault();
    setMsg(null);
    setPreview(null);
    const input = document.getElementById("file") as HTMLInputElement | null;
    if (!input || !input.files || input.files.length === 0) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", input.files[0]);
    const res = await fetch("/api/admin/preview", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok && data.ok) {
      setPreview(data.questions || []);
    } else {
      setMsg(`Error: ${data.error || 'preview failed'}`);
    }
  }

  async function confirmUpload() {
    setMsg(null);
    const input = document.getElementById("file") as HTMLInputElement | null;
    if (!input || !input.files || input.files.length === 0) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", input.files[0]);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok && data.ok) {
      setMsg(`Imported ${data.wrote} questions`);
      setPreview(null);
      // refresh
      const d = await fetch("/api/quiz-data");
      const j = await d.json();
      setQuestions(j.questions || []);
    } else {
      setMsg(`Error: ${data.error || 'upload failed'}`);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, Arial' }}>
      <h1 style={{ marginBottom: 8 }}>Admin Console</h1>
      <section style={{ marginBottom: 16, padding: 12, border: '1px dashed #e5e7eb', borderRadius: 8, maxWidth: 760 }}>
        <h3 style={{ marginTop: 0 }}>Quick checklist for interns</h3>
        <ol style={{ paddingLeft: 18 }}>
          <li>Edit the shared Google Sheet (use required headers).</li>
          <li>Preview the sheet using the "Import from Google Sheet" panel.</li>
          <li>Validate IDs, prompts, and option scores in the preview.</li>
          <li>Click "Import sheet" to write into `lib/questions.json`.</li>
          <li>Run a quick smoke test of the quiz UI or commit `lib/questions.json` to a branch.</li>
        </ol>
        <div style={{ marginTop: 8 }}>
          <a href="/docs/INTERN_QUESTIONNAIRE_WORKFLOW.md" style={{ marginRight: 12 }}>Open full workflow doc</a>
          <a href="/admin/audit">View recent uploads</a>
        </div>
      </section>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="/api/auth/signin/github?callbackUrl=/admin/auth-callback" style={{ color: '#0366d6' }}>Sign in with GitHub</a>
        <button onClick={logout} style={{ padding: '6px 10px', background: '#e5e7eb', border: '1px solid #d1d5db', borderRadius: 6 }}>Sign out</button>
      </div>

      <section style={{ marginTop: 8, border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, maxWidth: 760 }}>
        <h2 style={{ marginTop: 0 }}>Import CSV</h2>
        <form onSubmit={handlePreview} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input id="file" type="file" accept=".csv,text/csv" />
          <button type="submit" style={{ padding: '6px 10px', background: '#0366d6', color: 'white', borderRadius: 6 }}>Preview</button>
        </form>
        {msg && <div style={{ marginTop: 8, color: 'crimson' }}>{msg}</div>}

        {preview && (
          <div style={{ marginTop: 12 }}>
            <h3 style={{ marginBottom: 8 }}>Preview ({preview.length})</h3>
            <div style={{ maxHeight: 300, overflow: 'auto', border: '1px solid #f3f4f6', padding: 8, borderRadius: 6 }}>
              {preview.map((q: any, i: number) => (
                <div key={i} style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ fontWeight: 600 }}>{q.eyebrow}</div>
                  <div style={{ marginTop: 4 }}>{q.prompt}</div>
                  {Array.isArray(q.options) && q.options.length > 0 && (
                    <ul style={{ marginTop: 8 }}>
                      {q.options.map((opt: any, oi: number) => (
                        <li key={oi}>{opt.label} <span style={{ color: '#6b7280' }}>({opt.score})</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button onClick={confirmUpload} style={{ padding: '6px 10px', background: '#10b981', color: 'white', borderRadius: 6 }}>Confirm upload</button>
              <button onClick={() => setPreview(null)} style={{ marginLeft: 8, padding: '6px 10px', background: '#efefef', borderRadius: 6 }}>Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section style={{ marginTop: 16, border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, maxWidth: 760 }}>
        <h2 style={{ marginTop: 0 }}>Import from Google Sheet</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input id="sheetId" placeholder="Spreadsheet ID" style={{ flex: 1 }} />
          <input id="sheetGid" placeholder="GID (default 0)" style={{ width: 120 }} />
          <button onClick={async (e) => {
            e.preventDefault();
            setMsg(null);
            setPreview(null);
            const idEl = document.getElementById('sheetId') as HTMLInputElement | null;
            const gidEl = document.getElementById('sheetGid') as HTMLInputElement | null;
            const id = idEl?.value?.trim();
            const gid = gidEl?.value?.trim() || '0';
            if (!id) { setMsg('Provide spreadsheet ID'); return; }
            const res = await fetch('/api/admin/import-sheet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, gid, confirm: false }) });
            const data = await res.json();
            if (res.ok && data.ok) {
              setPreview(data.questions || []);
            } else {
              setMsg(data.error || 'Failed to fetch sheet');
            }
          }} style={{ padding: '6px 10px', background: '#0366d6', color: 'white', borderRadius: 6 }}>Preview sheet</button>
          <button onClick={async (e) => {
            e.preventDefault();
            setMsg(null);
            const idEl = document.getElementById('sheetId') as HTMLInputElement | null;
            const gidEl = document.getElementById('sheetGid') as HTMLInputElement | null;
            const id = idEl?.value?.trim();
            const gid = gidEl?.value?.trim() || '0';
            if (!id) { setMsg('Provide spreadsheet ID'); return; }
            const res = await fetch('/api/admin/import-sheet', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, gid, confirm: true }) });
            const data = await res.json();
            if (res.ok && data.ok) {
              setMsg(`Imported ${data.wrote} questions from sheet`);
              const d = await fetch('/api/quiz-data');
              const j = await d.json();
              setQuestions(j.questions || []);
            } else {
              setMsg(data.error || 'Import failed');
            }
          }} style={{ padding: '6px 10px', background: '#10b981', color: 'white', borderRadius: 6 }}>Import sheet</button>
        </div>
      </section>

      <section style={{ marginTop: 24, maxWidth: 760 }}>
        <h2 style={{ marginTop: 0 }}>Questions</h2>
        <ul>
          {questions.map((q) => (
            <li key={q.id} style={{ marginBottom: 8 }}><strong>{q.eyebrow}</strong>: {q.prompt}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

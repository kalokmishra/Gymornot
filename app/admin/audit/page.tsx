"use client";
import { useEffect, useState } from "react";

export default function AuditPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/audit');
      const data = await res.json();
      if (res.ok && data.ok) setEntries(data.entries || []);
      else setError(data.error || 'Failed to load');
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Upload Audit</h1>
      <div style={{ marginBottom: 12 }}>
        <a href="/api/admin/audit/raw">Download raw log</a>
      </div>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <div style={{ maxHeight: 600, overflow: 'auto', border: '1px solid #eee', padding: 8 }}>
        {entries.map((e, i) => (
          <div key={i} style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>
            <div><strong>{e.timestamp}</strong> — {e.userEmail || 'anonymous'}</div>
            <div style={{ color: '#555' }}>{e.source || e.filename || ''} — {e.questionCount} questions</div>
            {e.ip && <div style={{ color: '#666', fontSize: 12 }}>{e.ip}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

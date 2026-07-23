import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  formType: 'reservation' | 'catering' | 'contact';
  payload: Record<string, unknown>;
  status: 'new' | 'read' | 'archived';
  createdAt: string;
}

const TYPE_LABELS: Record<Submission['formType'], string> = {
  reservation: 'Reservation',
  catering: 'Catering',
  contact: 'Contact',
};

const STATUS_STYLES: Record<Submission['status'], string> = {
  new: 'bg-brand-gold/15 text-brand-gold',
  read: 'bg-gray-100 text-gray-600',
  archived: 'bg-gray-50 text-gray-400',
};

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [filter, setFilter] = useState<'all' | Submission['formType']>('all');
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed to load submissions');
      setSubmissions(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: Submission['status']) => {
    setSubmissions((prev) => prev?.map((s) => (s.id === id ? { ...s, status } : s)) ?? prev);
    await fetch(`/api/admin/submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  const remove = async (id: number) => {
    setSubmissions((prev) => prev?.filter((s) => s.id !== id) ?? prev);
    await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
  };

  const filtered = submissions?.filter((s) => filter === 'all' || s.formType === filter) ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif font-bold text-2xl text-brand-espresso">Form Submissions</h1>
        <a
          href="/api/admin/submissions/export.csv"
          className="inline-flex items-center gap-2 bg-brand-forest text-brand-cream text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-espresso transition-colors"
        >
          Download CSV
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'reservation', 'catering', 'contact'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === type ? 'bg-brand-forest text-brand-cream' : 'bg-white border border-gray-200 text-brand-espresso/70'
            }`}
          >
            {type === 'all' ? 'All' : TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!submissions && !error && <p className="text-brand-espresso/60 text-sm">Loading…</p>}
      {submissions && filtered.length === 0 && (
        <p className="text-brand-espresso/60 text-sm">No submissions yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-lg border border-gray-100 shadow-2xs p-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {TYPE_LABELS[s.formType]}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[s.status]}`}>
                  {s.status}
                </span>
              </div>
              <span className="text-xs text-brand-espresso/50">
                {new Date(s.createdAt).toLocaleString()}
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {Object.entries(s.payload).map(([key, value]) => (
                <div key={key} className="flex gap-1.5">
                  <dt className="font-semibold text-brand-espresso/60 capitalize shrink-0">{key}:</dt>
                  <dd className="text-brand-espresso break-words">{String(value ?? '—')}</dd>
                </div>
              ))}
            </dl>

            <div className="flex gap-2 pt-1 border-t border-gray-50">
              {s.status !== 'read' && (
                <button
                  onClick={() => updateStatus(s.id, 'read')}
                  className="text-xs font-semibold text-brand-espresso/70 hover:text-brand-espresso cursor-pointer"
                >
                  Mark read
                </button>
              )}
              {s.status !== 'archived' && (
                <button
                  onClick={() => updateStatus(s.id, 'archived')}
                  className="text-xs font-semibold text-brand-espresso/70 hover:text-brand-espresso cursor-pointer"
                >
                  Archive
                </button>
              )}
              <button
                onClick={() => remove(s.id)}
                className="text-xs font-semibold text-red-500/80 hover:text-red-600 cursor-pointer ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

interface ReviewRow {
  id: number;
  name: string;
  stars: number;
  emoji: string;
  quote: string;
  createdAt: string;
}

export function AdminReviews() {
  const [reviews, setReviews] = useState<ReviewRow[] | null>(null);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch('/api/admin/reviews');
    setReviews(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const fetchNew = async () => {
    setFetching(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/reviews/fetch', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Fetch failed');
      setResult(`Checked ${data.fetched} review(s) from Google — added ${data.added} new.`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif font-bold text-2xl text-brand-espresso">Reviews</h1>
        <button
          onClick={fetchNew}
          disabled={fetching}
          className="inline-flex items-center gap-2 bg-brand-forest text-brand-cream text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-espresso transition-colors disabled:opacity-50 cursor-pointer"
        >
          {fetching ? 'Fetching…' : 'Fetch New Reviews'}
        </button>
      </div>

      {result && <p className="text-sm text-brand-espresso/70 bg-brand-gold/10 rounded-lg px-3 py-2">{result}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!reviews && <p className="text-brand-espresso/60 text-sm">Loading…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reviews?.map((r) => (
          <div key={r.id} className="bg-white rounded-lg border border-gray-100 shadow-2xs p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-brand-espresso">{r.name}</span>
              <span className="text-brand-gold text-sm">{'★'.repeat(r.stars)}</span>
            </div>
            <p className="text-sm text-brand-espresso/75 leading-relaxed">{r.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

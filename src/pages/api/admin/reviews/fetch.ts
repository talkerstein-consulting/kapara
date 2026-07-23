import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db/client';
import { reviews } from '../../../../db/schema';

export const prerender = false;

interface PlacesReview {
  name: string; // e.g. "places/PLACE_ID/reviews/REVIEW_ID" — stable per-review id
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: { displayName?: string };
}

export const POST: APIRoute = async () => {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({ error: 'GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not configured' }),
      { status: 500 },
    );
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews',
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return new Response(JSON.stringify({ error: 'Places API request failed', details: text }), {
      status: 502,
    });
  }

  const data = (await res.json()) as { reviews?: PlacesReview[] };
  const fetched = data.reviews ?? [];

  let added = 0;
  for (const r of fetched) {
    const existing = await db.select({ id: reviews.id }).from(reviews).where(eq(reviews.googleReviewId, r.name));
    if (existing.length > 0) continue;

    await db.insert(reviews).values({
      googleReviewId: r.name,
      name: r.authorAttribution?.displayName ?? 'Google User',
      stars: Math.round(r.rating ?? 5),
      emoji: '',
      quote: r.text?.text ?? r.originalText?.text ?? '',
    });
    added++;
  }

  return new Response(JSON.stringify({ fetched: fetched.length, added }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

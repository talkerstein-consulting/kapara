import type { APIRoute } from 'astro';
import { desc } from 'drizzle-orm';
import { db } from '../../db/client';
import { reviews } from '../../db/schema';

export const prerender = false;

export const GET: APIRoute = async () => {
  const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));

  const data = rows.map((r) => ({
    name: r.name,
    stars: r.stars,
    emoji: r.emoji,
    quote: r.quote,
  }));

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

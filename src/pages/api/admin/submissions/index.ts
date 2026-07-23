import type { APIRoute } from 'astro';
import { desc } from 'drizzle-orm';
import { db } from '../../../../db/client';
import { formSubmissions } from '../../../../db/schema';

export const prerender = false;

export const GET: APIRoute = async () => {
  const rows = await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));

  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

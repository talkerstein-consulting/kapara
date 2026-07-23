import type { APIRoute } from 'astro';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db/client';
import { menuItems } from '../../../../db/schema';

export const prerender = false;

const categorySchema = z.enum(['starters', 'schnitzels', 'grill', 'more', 'sides']);

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  desc: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  category: categorySchema.optional(),
  image: z.string().min(1).optional(),
  dietary: z.array(z.string()).optional(),
});

export const PATCH: APIRoute = async ({ params, request }) => {
  const id = params.id!;
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid item', details: parsed.error.flatten() }), {
      status: 400,
    });
  }

  const { price, ...rest } = parsed.data;
  await db
    .update(menuItems)
    .set({ ...rest, ...(price !== undefined ? { price: price.toFixed(2) } : {}) })
    .where(eq(menuItems.id, id));

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id!;
  await db.delete(menuItems).where(eq(menuItems.id, id));

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

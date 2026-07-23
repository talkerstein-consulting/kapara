import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../../db/client';
import { menuItems } from '../../../../db/schema';

export const prerender = false;

const categorySchema = z.enum(['starters', 'schnitzels', 'grill', 'more', 'sides']);

const createSchema = z.object({
  name: z.string().min(1),
  desc: z.string().min(1),
  price: z.number().nonnegative(),
  category: categorySchema,
  image: z.string().min(1),
  dietary: z.array(z.string()).default([]),
});

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'item'
  );
}

export const GET: APIRoute = async () => {
  const rows = await db.select().from(menuItems);
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid item', details: parsed.error.flatten() }), {
      status: 400,
    });
  }

  const base = slugify(parsed.data.name);
  let id = base;
  let suffix = 1;

  // Ensure a unique primary key without requiring the caller to supply one.
  const clashes = await db.select({ id: menuItems.id }).from(menuItems);
  const existingIds = new Set(clashes.map((c) => c.id));
  while (existingIds.has(id)) {
    id = `${base}-${suffix++}`;
  }

  await db.insert(menuItems).values({
    id,
    name: parsed.data.name,
    desc: parsed.data.desc,
    price: parsed.data.price.toFixed(2),
    category: parsed.data.category,
    image: parsed.data.image,
    dietary: parsed.data.dietary,
  });

  return new Response(JSON.stringify({ id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

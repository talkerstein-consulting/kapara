import type { APIRoute } from 'astro';
import { db } from '../../db/client';
import { menuItems } from '../../db/schema';

export const prerender = false;

export const GET: APIRoute = async () => {
  const rows = await db.select().from(menuItems);

  const data = rows.map((r) => ({
    id: r.id,
    name: r.name,
    desc: r.desc,
    price: Number(r.price),
    category: r.category,
    image: r.image,
    dietary: r.dietary,
  }));

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

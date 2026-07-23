import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db/client';
import { formSubmissions } from '../../db/schema';

export const prerender = false;

const bodySchema = z.object({
  formType: z.enum(['reservation', 'catering', 'contact']),
  payload: z.record(z.string(), z.unknown()),
});

export const POST: APIRoute = async ({ request }) => {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid submission', details: parsed.error.flatten() }), {
      status: 400,
    });
  }

  await db.insert(formSubmissions).values({
    formType: parsed.data.formType,
    payload: parsed.data.payload,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db/client';
import { formSubmissions } from '../../db/schema';
import { sendNotificationEmail } from '../../lib/mail';

export const prerender = false;

const bodySchema = z.object({
  formType: z.enum(['reservation', 'catering', 'contact']),
  payload: z.record(z.string(), z.unknown()),
});

const FORM_LABELS: Record<z.infer<typeof bodySchema>['formType'], string> = {
  reservation: 'Reservation',
  catering: 'Catering Inquiry',
  contact: 'Contact Message',
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderNotificationHtml(formType: string, payload: Record<string, unknown>): string {
  const rows = Object.entries(payload)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;text-transform:capitalize;">${escapeHtml(key)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <h2 style="font-family:sans-serif;">New ${escapeHtml(formType)} submission</h2>
    <table style="font-family:sans-serif;font-size:14px;">${rows}</table>
  `;
}

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

  await sendNotificationEmail({
    subject: `New ${FORM_LABELS[parsed.data.formType]} — Kapara`,
    html: renderNotificationHtml(FORM_LABELS[parsed.data.formType], parsed.data.payload),
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

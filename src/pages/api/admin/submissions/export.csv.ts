import type { APIRoute } from 'astro';
import { desc } from 'drizzle-orm';
import { db } from '../../../../db/client';
import { formSubmissions } from '../../../../db/schema';

export const prerender = false;

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const GET: APIRoute = async () => {
  const rows = await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));

  // Payload fields vary by form type, so union every key seen across all
  // rows into the header rather than hard-coding one form's shape.
  const payloadKeys = new Set<string>();
  for (const row of rows) {
    Object.keys(row.payload ?? {}).forEach((k) => payloadKeys.add(k));
  }
  const payloadKeyList = Array.from(payloadKeys);

  const header = ['id', 'form_type', 'status', 'created_at', ...payloadKeyList];
  const lines = [header.map(csvEscape).join(',')];

  for (const row of rows) {
    const payload = (row.payload ?? {}) as Record<string, unknown>;
    const line = [
      row.id,
      row.formType,
      row.status,
      row.createdAt.toISOString(),
      ...payloadKeyList.map((k) => payload[k]),
    ];
    lines.push(line.map(csvEscape).join(','));
  }

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="kapara-submissions.csv"',
    },
  });
};

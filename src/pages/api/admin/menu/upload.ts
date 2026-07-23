import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const ALLOWED_EXT: Record<string, string> = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'menu');

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');

  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
  }

  const ext = ALLOWED_EXT[file.type];
  if (!ext) {
    return new Response(JSON.stringify({ error: 'Unsupported file type. Use webp, jpeg, or png.' }), {
      status: 400,
    });
  }

  const safeBase = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'upload';
  const filename = `${safeBase}-${Date.now()}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return new Response(JSON.stringify({ path: `/menu/${filename}` }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

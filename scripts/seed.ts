// One-time migration: copied the original static src/data/menu.ts and
// src/data/reviews.ts content into the database tables when the site
// switched from static imports to DB-backed reads (both static sources have
// since been removed now that the migration is done — this file is kept as
// a historical record of that one-time run, not something to re-run).
import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../src/db/schema';

async function main() {
  const pool = mysql.createPool(process.env.DATABASE_URL!);
  const db = drizzle(pool, { schema, mode: 'default' });

  const menuTotal = (await db.select().from(schema.menuItems)).length;
  const reviewsTotal = (await db.select().from(schema.reviews)).length;

  console.log(`Menu items in DB: ${menuTotal}`);
  console.log(`Reviews in DB: ${reviewsTotal}`);
  console.log('The original static-data migration already ran — this script no longer re-seeds anything.');

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connectionUri =
  import.meta.env.DATABASE_URL ??
  `mysql://${import.meta.env.DB_USER}:${import.meta.env.DB_PASSWORD}@${import.meta.env.DB_HOST}:${import.meta.env.DB_PORT ?? 3306}/${import.meta.env.DB_NAME}`;

const pool = mysql.createPool(connectionUri);

export const db = drizzle(pool, { schema, mode: 'default' });

import { mysqlTable, varchar, int, decimal, json, mysqlEnum, timestamp } from 'drizzle-orm/mysql-core';

export const menuItems = mysqlTable('menu_items', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  desc: varchar('desc', { length: 1024 }).notNull(),
  price: decimal('price', { precision: 8, scale: 2 }).notNull(),
  category: mysqlEnum('category', ['starters', 'schnitzels', 'grill', 'more', 'sides']).notNull(),
  image: varchar('image', { length: 512 }).notNull(),
  dietary: json('dietary').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const formSubmissions = mysqlTable('form_submissions', {
  id: int('id').autoincrement().primaryKey(),
  formType: mysqlEnum('form_type', ['reservation', 'catering', 'contact']).notNull(),
  payload: json('payload').$type<Record<string, unknown>>().notNull(),
  status: mysqlEnum('status', ['new', 'read', 'archived']).notNull().default('new'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reviews = mysqlTable('reviews', {
  id: int('id').autoincrement().primaryKey(),
  googleReviewId: varchar('google_review_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  stars: int('stars').notNull(),
  emoji: varchar('emoji', { length: 16 }).notNull().default(''),
  quote: varchar('quote', { length: 2048 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type MenuItemRow = typeof menuItems.$inferSelect;
export type NewMenuItemRow = typeof menuItems.$inferInsert;
export type FormSubmissionRow = typeof formSubmissions.$inferSelect;
export type NewFormSubmissionRow = typeof formSubmissions.$inferInsert;
export type ReviewRow = typeof reviews.$inferSelect;
export type NewReviewRow = typeof reviews.$inferInsert;

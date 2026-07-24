/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL?: string;
  readonly DB_HOST?: string;
  readonly DB_USER?: string;
  readonly DB_PASSWORD?: string;
  readonly DB_NAME?: string;
  readonly DB_PORT?: string;
  readonly GOOGLE_CLIENT_ID?: string;
  readonly GOOGLE_CLIENT_SECRET?: string;
  readonly AUTH_SECRET?: string;
  readonly AUTH_TRUST_HOST?: string;
  readonly ADMIN_EMAILS?: string;
  readonly GOOGLE_PLACES_API_KEY?: string;
  readonly GOOGLE_PLACE_ID?: string;
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASSWORD?: string;
  readonly MAIL_FROM?: string;
  readonly MAIL_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

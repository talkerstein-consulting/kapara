import nodemailer from 'nodemailer';

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT ?? 465);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

interface SendNotificationArgs {
  subject: string;
  html: string;
}

/**
 * Best-effort notification email — failures are logged, never thrown, so a
 * form submission still succeeds (and is still saved to the DB) even if
 * mail sending is misconfigured or the SMTP server is briefly unreachable.
 */
export async function sendNotificationEmail({ subject, html }: SendNotificationArgs): Promise<void> {
  const transport = getTransporter();
  if (!transport) {
    console.warn('sendNotificationEmail: SMTP not configured, skipping email');
    return;
  }

  const from = import.meta.env.MAIL_FROM ?? import.meta.env.SMTP_USER;
  const to = import.meta.env.MAIL_TO ?? import.meta.env.SMTP_USER;

  try {
    await transport.sendMail({ from, to, subject, html });
  } catch (err) {
    console.error('sendNotificationEmail failed:', err);
  }
}

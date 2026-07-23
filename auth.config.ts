import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

function getAllowedEmails(): string[] {
  return (import.meta.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export default defineConfig({
  trustHost: true,
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowed = getAllowedEmails();
      const email = user.email?.toLowerCase();
      if (!email || allowed.length === 0 || !allowed.includes(email)) {
        return false;
      }
      return true;
    },
  },
});

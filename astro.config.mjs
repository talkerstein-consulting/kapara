import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), auth()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: true,
  },
  security: {
    // Hosting (Hostinger's CDN/reverse proxy) forwards requests to this app
    // internally without the public Host header — without an explicit
    // allowlist here, Astro ignores X-Forwarded-Host entirely and falls back
    // to "localhost" for all URL construction (breaking Auth.js's origin
    // checks). See https://docs.astro.build/en/reference/configuration-reference/#securityallloweddomains
    allowedDomains: [
      { hostname: 'floralwhite-goldfinch-131665.hostingersite.com', protocol: 'https' },
      { hostname: '**.kapara.ca', protocol: 'https' },
      { hostname: 'kapara.ca', protocol: 'https' },
    ],
  },
});

// Entry point for Hostinger's Node.js app hosting (its auto-detection/build
// pipeline expects a root-level server.js). Boots the real Astro standalone
// server produced by `npm run build` (@astrojs/node, mode: 'standalone').

// Some hosts resolve "localhost" to the IPv6 loopback (::1) first, which the
// MySQL user's grant doesn't cover (only localhost/127.0.0.1 are granted by
// default). Force IPv4 first so DATABASE_URL host "localhost" actually
// connects the way it's expected to, without depending on being able to
// change DATABASE_URL to a literal IP.
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import './dist/server/entry.mjs';

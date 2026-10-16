// Where the website and its API live. For local development, point this at
// your `pnpm dev` server by setting EXPO_PUBLIC_SITE_URL in mobile/.env.local,
// e.g. EXPO_PUBLIC_SITE_URL=http://192.168.1.20:3000 (your computer's LAN IP;
// "localhost" means the phone itself).
export const SITE_URL = (
  process.env.EXPO_PUBLIC_SITE_URL || 'https://constant-care.vercel.app'
).replace(/\/$/, '');

/**
 * Supabase config for signup page.
 * Preferred: npm run build:signup-config (reads EXPO_PUBLIC_* or SUPABASE_* from .env / CI).
 * Fallback: copy to config.js and set values manually. config.js is gitignored — never commit real keys.
 */
window.__SUPABASE_CONFIG__ = {
  url: "https://your-project.supabase.co",
  anonKey: "your-anon-key",
};

const serverOnlyKeys = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "OPENAI_API_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET"
] as const;

export function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Variable d'environnement manquante: ${name}`);
  }
  return value.trim();
}

export function getSupabaseUrl() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value || value.trim().length === 0) {
    throw new Error("Variable d'environnement manquante: NEXT_PUBLIC_SUPABASE_URL");
  }
  return normalizeSupabaseUrl(value);
}

export function getSupabaseAnonKey() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!value || value.trim().length === 0) {
    throw new Error("Variable d'environnement manquante: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return value.trim();
}

export function normalizeSupabaseUrl(value: string) {
  const trimmed = value.trim();

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(
      "Configuration Supabase invalide: NEXT_PUBLIC_SUPABASE_URL doit ressembler à https://your-project.supabase.co."
    );
  }

  if (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".supabase.co")) {
    throw new Error(
      "Configuration Supabase invalide: NEXT_PUBLIC_SUPABASE_URL doit être l'URL projet Supabase https://your-project.supabase.co. N'utilisez pas NEXT_PUBLIC_APP_URL, /dashboard ou app.supabase.com."
    );
  }

  // Supabase Auth needs the project origin. If a REST URL was pasted, keep the app working by stripping the path.
  return parsed.origin;
}

export function assertNoServerSecretInPublicEnv() {
  const exposed = serverOnlyKeys.filter((key) => key.startsWith("NEXT_PUBLIC_"));
  if (exposed.length > 0) {
    throw new Error(`Clé serveur exposée côté client: ${exposed.join(", ")}`);
  }
}

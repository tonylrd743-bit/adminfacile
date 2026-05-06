import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = sanitizeNextPath(requestUrl.searchParams.get("next"));
  const error = requestUrl.searchParams.get("error") ?? requestUrl.searchParams.get("error_description");

  if (error) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("message", "Le lien de connexion Supabase est invalide ou expiré.");
    return NextResponse.redirect(loginUrl);
  }

  if (!code && (!tokenHash || !type)) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("message", "Connexion incomplète. Merci de vous reconnecter.");
    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createClient();
  const { error: exchangeError } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({
        token_hash: tokenHash!,
        type: type!
      });

  if (exchangeError) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("message", "Impossible de valider la session. Merci de vous reconnecter.");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

function sanitizeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }
  return value;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { createClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setMessageType("error");

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();

    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch (error) {
      logAuthError(error);
      setLoading(false);
      setMessage(getConfigurationMessage(error));
      return;
    }

    try {
      const response =
        mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: getAuthCallbackUrl(),
                data: {
                  first_name: firstName,
                  last_name: lastName
                }
              }
            })
          : await supabase.auth.signInWithPassword({ email, password });

      setLoading(false);

      if (response.error) {
        logAuthError(response.error);
        setMessage(toFrenchSupabaseMessage(response.error.message));
        return;
      }

      if (mode === "signup" && !response.data.session) {
        setMessageType("success");
        setMessage("Compte créé. Confirmez votre email, puis vous serez redirigé vers le dashboard.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      logAuthError(error);
      setLoading(false);
      setMessage(toFrenchSupabaseMessage(error instanceof Error ? error.message : "Load failed"));
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {mode === "signup" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Prénom
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" name="firstName" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Nom
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" name="lastName" required />
          </label>
        </div>
      ) : null}
      <label className="space-y-2 text-sm font-medium text-slate-700">
        Email
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" name="email" required type="email" />
      </label>
      <label className="space-y-2 text-sm font-medium text-slate-700">
        Mot de passe
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </label>
      {message ? (
        <p
          className={
            messageType === "success"
              ? "rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-800"
              : "rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700"
          }
        >
          {message}
        </p>
      ) : null}
      <Button className="w-full" disabled={loading} type="submit">
        {loading ? "Veuillez patienter..." : mode === "signup" ? "Créer mon compte" : "Me connecter"}
      </Button>
    </form>
  );
}

function getAuthCallbackUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || window.location.origin;
  const callbackUrl = new URL("/auth/callback", appUrl);
  callbackUrl.searchParams.set("next", "/dashboard");
  return callbackUrl.toString();
}

function getConfigurationMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("NEXT_PUBLIC_SUPABASE_URL")) {
    return "URL Supabase manquante côté production. Vérifiez NEXT_PUBLIC_SUPABASE_URL dans Vercel.";
  }
  if (message.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY")) {
    return "Clé anon Supabase manquante côté production. Vérifiez NEXT_PUBLIC_SUPABASE_ANON_KEY dans Vercel.";
  }
  if (message.includes("Supabase")) {
    return "Configuration Supabase manquante côté production.";
  }
  return "Configuration Supabase invalide. Vérifiez les variables Vercel.";
}

function toFrenchSupabaseMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("load failed") || normalized.includes("failed to fetch") || normalized.includes("fetch")) {
    return "Erreur réseau Supabase : impossible de contacter le service d'authentification. Vérifiez NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY et les URLs autorisées dans Supabase Auth.";
  }
  if (normalized.includes("invalid login credentials")) {
    return "Email ou mot de passe incorrect.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Votre email n'est pas encore confirmé. Ouvrez le lien reçu par email avant de vous connecter.";
  }
  if (normalized.includes("user already registered") || normalized.includes("already registered")) {
    return "Un compte existe déjà avec cet email. Connectez-vous ou réinitialisez votre mot de passe.";
  }
  if (normalized.includes("password")) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (normalized.includes("invalid") || normalized.includes("unauthorized")) {
    return "La configuration Supabase semble invalide. Vérifiez l'URL du projet et la clé publishable.";
  }

  return message || "Une erreur est survenue pendant l'authentification.";
}

function logAuthError(error: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.error("[AdminFacile Auth]", error);
  }
}

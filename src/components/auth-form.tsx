"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { createClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const authCallbackUrl = `${window.location.origin}/auth/callback?next=/dashboard`;

    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch (error) {
      setLoading(false);
      setMessage(error instanceof Error ? error.message : "Configuration Supabase invalide.");
      return;
    }

    const response =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: authCallbackUrl,
              data: {
                first_name: firstName,
                last_name: lastName
              }
            }
          })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (response.error) {
      setMessage(response.error.message);
      return;
    }

    if (mode === "signup" && !response.data.session) {
      setMessage("Compte créé. Confirmez votre email, puis vous serez redirigé vers le dashboard.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
            message.startsWith("Compte créé")
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

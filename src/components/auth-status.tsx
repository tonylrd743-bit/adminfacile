"use client";

import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!email) {
    return (
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <Link className="hidden text-sm font-semibold text-slate-700 hover:text-slate-950 sm:inline" href="/login">
          Connexion
        </Link>
        <Link
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          href="/signup"
        >
          Essayer
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      <Link
        href="/dashboard/account"
        className="hidden min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:flex"
      >
        <UserRound className="h-4 w-4" />
        Mon compte
      </Link>
      <button
        aria-label="Se deconnecter"
        className="min-h-11 min-w-11 rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 hover:bg-slate-50"
        onClick={signOut}
        type="button"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}

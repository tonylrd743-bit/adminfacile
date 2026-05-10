import { getPublicSupabaseDebugInfo } from "@/lib/env";

export default function DebugEnvPage() {
  const info = getPublicSupabaseDebugInfo();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-74px)] max-w-2xl flex-col justify-center px-4 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-600">Diagnostic public</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Configuration Supabase</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Cette page affiche uniquement la présence des variables publiques nécessaires à l'authentification. Aucune clé
          secrète ni clé anon n'est affichée.
        </p>

        <dl className="mt-6 divide-y divide-slate-200 rounded-3xl border border-slate-200">
          <DebugRow label="NEXT_PUBLIC_SUPABASE_URL existe" value={info.hasSupabaseUrl ? "oui" : "non"} />
          <DebugRow label="NEXT_PUBLIC_SUPABASE_ANON_KEY existe" value={info.hasSupabaseAnonKey ? "oui" : "non"} />
          <DebugRow label="Domaine Supabase détecté" value={info.detectedSupabaseDomain ?? "non détecté"} />
        </dl>
      </section>
    </main>
  );
}

function DebugRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <dt className="font-medium text-slate-700">{label}</dt>
      <dd className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

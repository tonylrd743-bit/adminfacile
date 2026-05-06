import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Mon compte</h1>
      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-sm font-semibold text-slate-500">Email</dt>
          <dd className="mt-1 text-slate-950">{user?.email}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-500">Identifiant</dt>
          <dd className="mt-1 break-all text-slate-950">{user?.id}</dd>
        </div>
      </dl>
      <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-500">
        Pour supprimer vos donnees, contactez l'administrateur du service MVP. Une gestion autonome pourra etre ajoutee
        dans une prochaine version.
      </p>
    </div>
  );
}

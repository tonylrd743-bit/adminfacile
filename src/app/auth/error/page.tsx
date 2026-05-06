import { ButtonLink } from "@/components/button";

export default function AuthErrorPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-74px)] max-w-xl flex-col justify-center px-4 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-600">Authentification</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Lien invalide ou expiré</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Le lien Supabase utilisé ne permet pas d'ouvrir une session. Vous pouvez demander un nouveau lien ou vous
          connecter avec votre email et mot de passe.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/login">Retour à la connexion</ButtonLink>
        </div>
      </section>
    </main>
  );
}

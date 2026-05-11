import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-74px)] max-w-xl flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Commencer gratuitement</h1>
        <p className="mt-3 text-slate-600">Créez votre espace privé pour préparer votre première démarche.</p>
        <div className="mt-6">
          <AuthForm mode="signup" />
        </div>
        <p className="mt-5 text-sm text-slate-600">
          Déjà inscrit ?{" "}
          <Link className="font-semibold text-blue-600" href="/login">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}

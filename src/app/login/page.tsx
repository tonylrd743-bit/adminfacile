import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-74px)] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Connexion</h1>
        <p className="mt-3 text-slate-600">Accedez a votre espace AdminFacile.</p>
        {message ? <p className="mt-5 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p> : null}
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
        <p className="mt-5 text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <Link className="font-semibold text-blue-600" href="/signup">
            Creer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}

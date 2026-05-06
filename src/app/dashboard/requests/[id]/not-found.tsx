import { ButtonLink } from "@/components/button";

export default function RequestNotFoundPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase text-blue-600">Dossier introuvable</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Ce dossier n'est pas disponible</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
        Il a peut-être été supprimé, ou il n'appartient pas à votre compte. Vos dossiers accessibles restent listés dans
        le dashboard.
      </p>
      <div className="mt-6 flex justify-center">
        <ButtonLink href="/dashboard">Revenir au dashboard</ButtonLink>
      </div>
    </div>
  );
}

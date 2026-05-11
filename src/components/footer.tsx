import Link from "next/link";
import { DisclaimerBox } from "@/components/disclaimer-box";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-lg font-semibold text-slate-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
              AF
            </span>
            AdminFacile
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Un assistant professionnel pour préparer vos démarches administratives, vos courriers et vos documents business avec plus de clarté.
          </p>
          <p className="mt-3 text-sm text-slate-500">Contact : contact@adminfacile.fr</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Produit</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/demarches">Démarches</Link>
            <Link href="/pricing">Tarifs</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Espace utilisateur</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/dashboard/new">Nouvelle démarche</Link>
            <Link href="/dashboard/prompts">Prompts pré-écrits</Link>
            <Link href="/dashboard/pro">Outils Pro</Link>
            <Link href="/dashboard/documents">Mes documents</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Légal</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/conditions-utilisation">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <DisclaimerBox compact />
      </div>
    </footer>
  );
}

import { Building2, FileText, ImageIcon, MapPin, Percent, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const profileFields = [
  "Nom",
  "Prénom",
  "Nom de l'entreprise",
  "Métier ou activité",
  "Spécialité",
  "Logo",
  "SIRET",
  "TVA applicable ou non",
  "Taux horaire",
  "Zone d'intervention",
  "Frais de déplacement",
  "Style de document"
];

const automationTargets = ["devis", "factures", "emails clients", "simulateurs", "PDF", "réponses IA"];

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-600">Compte</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Profil utilisateur et entreprise</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Cette page prépare la personnalisation professionnelle d'AdminFacile. Les informations de profil permettront d'adapter automatiquement les documents et réponses générées.
        </p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm font-semibold text-slate-500">Email</dt>
            <dd className="mt-1 break-all text-slate-950">{user?.email}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm font-semibold text-slate-500">Identifiant</dt>
            <dd className="mt-1 break-all text-slate-950">{user?.id}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Informations professionnelles à personnaliser</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Le socle est prévu pour tous les profils : particulier, auto-entrepreneur, artisan, consultant, société, service, commerce ou activité digitale.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {profileFields.map((field) => (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700" key={field}>
                {field}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Personnalisation automatique</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Une fois persisté, ce profil pourra alimenter les documents commerciaux, mentions TVA, tarifs, signatures et formulations IA.
          </p>
          <div className="mt-5 grid gap-3">
            {automationTargets.map((target) => (
              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-semibold text-slate-700" key={target}>
                <FileText className="h-4 w-4 text-blue-600" />
                {target}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ProfileSignal icon={UserRound} title="Identité" text="Nom, prénom, entreprise et signature professionnelle." />
        <ProfileSignal icon={Percent} title="Fiscalité" text="SIRET, TVA, micro-entreprise et mentions obligatoires." />
        <ProfileSignal icon={MapPin} title="Tarification" text="Taux horaire, zone, déplacement et unités de facturation." />
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ImageIcon className="mt-1 h-5 w-5 text-blue-600" />
          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            Pour supprimer vos données, contactez l'administrateur du service. Une gestion autonome du profil, du logo et des préférences documentaires pourra être ajoutée dans une prochaine version.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProfileSignal({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-blue-600" />
      <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

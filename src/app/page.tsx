import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  FolderLock,
  LockKeyhole,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeading } from "@/components/section-heading";
import { StepCard } from "@/components/step-card";

const features = [
  {
    icon: ClipboardList,
    title: "Dossiers mieux préparés",
    text: "L'assistant transforme vos réponses en checklist, étapes et documents à rassembler."
  },
  {
    icon: FileText,
    title: "Lettre prête à copier",
    text: "Vous obtenez une base de courrier claire, structurée et adaptée à votre situation."
  },
  {
    icon: FolderLock,
    title: "Documents au même endroit",
    text: "Le coffre-fort vous aide à centraliser vos justificatifs pendant la préparation."
  }
];

const faqs = [
  {
    q: "AdminFacile remplace-t-il un organisme officiel ?",
    a: "Non. AdminFacile est un service privé d'assistance administrative, indépendant des administrations."
  },
  {
    q: "Est-ce un conseil juridique ?",
    a: "Non. Les réponses servent à préparer une démarche et doivent être vérifiées auprès des sources officielles."
  },
  {
    q: "Quelles démarches sont disponibles ?",
    a: "Le MVP couvre CAF, RSA et prime d'activité, avec une architecture prévue pour ajouter d'autres démarches."
  },
  {
    q: "Mes clés API sont-elles exposées ?",
    a: "Non. Les appels OpenAI, Stripe et Supabase sensibles passent par des routes et helpers côté serveur."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Assistant administratif IA pour particuliers en France
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Simplifiez vos démarches administratives en quelques minutes
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
              AdminFacile vous aide à préparer vos dossiers CAF, RSA, prime d’activité et courriers administratifs
              grâce à un assistant intelligent simple et sécurisé.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup">
                Commencer gratuitement <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/demarches" variant="outline">
                Voir les démarches
              </ButtonLink>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 text-sm font-medium text-slate-600 sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Sans jargon
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                PDF exportable
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Données protégées
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-blue-950/15">
            <div className="rounded-[1.5rem] bg-white p-5">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-blue-600">Aperçu dossier</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-950">Prime d'activité</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Checklist, lettre et étapes en un seul espace.</p>
                </div>
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "Situation résumée clairement",
                  "Documents classés par priorité",
                  "Lettre administrative prête à copier",
                  "Avertissement légal visible"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-blue-600 p-5 text-white">
                <p className="text-sm text-blue-100">Prochaine étape</p>
                <p className="mt-1 text-lg font-semibold">Vérifier les justificatifs disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Avantages"
          text="Un parcours guidé pour préparer vos dossiers sans vous perdre dans les formulaires officiels."
          title="Une aide claire pour les démarches du quotidien"
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard icon={feature.icon} key={feature.title} text={feature.text} title={feature.title} />
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Comment ça marche"
          text="Le produit reste volontairement simple : vous répondez, l'assistant structure, vous téléchargez."
          title="Trois étapes pour avancer"
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          <StepCard step="1" text="Sélectionnez CAF, RSA ou prime d'activité." title="Choisissez la démarche" />
          <StepCard step="2" text="Décrivez votre situation avec des champs simples et guidés." title="Ajoutez vos informations" />
          <StepCard step="3" text="Relisez le résumé, la checklist, la lettre et exportez en PDF." title="Récupérez votre dossier" />
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-300">Sécurité</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Un MVP pensé pour protéger les accès et clarifier les limites
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              Les informations sensibles restent côté serveur. Les pages privées vérifient la session et le disclaimer
              est visible avant toute génération.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { Icon: LockKeyhole, label: "Authentification Supabase" },
              { Icon: ShieldCheck, label: "RLS recommandé" },
              { Icon: FolderLock, label: "Bucket documents privé" },
              { Icon: Sparkles, label: "Prompt IA prudent" }
            ].map(({ Icon, label }) => (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5" key={label}>
                <Icon className="h-6 w-6 text-blue-300" />
                <p className="mt-4 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Prix</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Commencez gratuitement</h2>
            <p className="mt-3 max-w-2xl leading-8 text-slate-600">
              Puis passez au dossier complet ou au premium lorsque vous avez besoin de générer plus de documents.
            </p>
          </div>
          <ButtonLink href="/pricing">Voir les tarifs</ButtonLink>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" text="Les réponses essentielles avant de créer votre premier dossier." title="Questions fréquentes" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <div className="p-6" key={faq.q}>
              <h3 className="font-semibold text-slate-950">{faq.q}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
        <DisclaimerBox className="mx-auto mt-8 max-w-3xl" compact />
      </section>
    </main>
  );
}

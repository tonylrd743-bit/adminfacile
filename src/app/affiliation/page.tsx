import { ArrowRight, CheckCircle2, Mail, Users } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DisclaimerBox } from "@/components/disclaimer-box";

const points = [
  "Partagez AdminFacile auprès de proches, clients, collègues ou professionnels de votre réseau.",
  "Les avantages sont étudiés selon l'activité réelle des utilisateurs invités.",
  "Jusqu'à 1 mois offert peut être accordé après validation manuelle.",
  "Aucun remboursement automatique n'est promis : l'offre est soumise à validation."
];

export default function AffiliationPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Programme ambassadeur</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Faites découvrir AdminFacile et obtenez jusqu'à 1 mois offert
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Partagez AdminFacile, faites tester l'application autour de vous et obtenez jusqu'à 1 mois offert selon l'activité réelle des utilisateurs invités. L'offre est soumise à validation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="mailto:contactadminfacile@gmail.com?subject=Demande%20programme%20ambassadeur">
              Demander à participer
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="mailto:contactadminfacile@gmail.com" variant="outline">
              Contacter AdminFacile
              <Mail className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Fonctionnement</h2>
          <div className="mt-5 grid gap-3">
            {points.map((point) => (
              <div className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200" key={point}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                {point}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-900">
            Contact : contactadminfacile@gmail.com
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <DisclaimerBox />
      </section>
    </main>
  );
}

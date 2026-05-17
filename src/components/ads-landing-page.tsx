import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import type { LandingPageConfig } from "@/lib/landing-pages";

const disclaimer =
  "AdminFacile est un outil indépendant d'aide administrative et business. Il ne remplace pas un organisme officiel, un expert-comptable ou un conseiller juridique.";

export function AdsLandingPage({ page }: { page: LandingPageConfig }) {
  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {page.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{page.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href="/signup" tracking="try-free" trackingPage={page.slug}>
              {page.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink href="/pricing" tracking="landing-cta" trackingPage={page.slug} variant="outline">
              {page.secondaryCta}
            </TrackedLink>
          </div>
          <TrackedLink className="mt-3 w-full sm:w-fit" href="/dashboard/new" tracking="landing-cta" trackingPage={`${page.slug}:document`} variant="secondary">
            {page.documentCta}
          </TrackedLink>
        </div>

        <Mockup page={page} />
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {page.benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" key={benefit.title}>
                <Icon className="h-5 w-5 text-blue-600" />
                <h2 className="mt-4 text-lg font-semibold text-slate-950">{benefit.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-blue-600">FAQ</p>
          <div className="mt-6 divide-y divide-slate-200">
            {page.faq.map((item) => (
              <div className="py-5 first:pt-0 last:pb-0" key={item.question}>
                <h2 className="font-semibold text-slate-950">{item.question}</h2>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          {disclaimer}
        </p>
      </section>
    </main>
  );
}

function Mockup({ page }: { page: LandingPageConfig }) {
  return (
    <div className="min-w-0 rounded-[2rem] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-blue-950/15">
      <div className="rounded-[1.5rem] bg-white p-5">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-sm font-semibold text-blue-600">AdminFacile</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">{page.mockupTitle}</h2>
          </div>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">Premium</span>
        </div>
        <div className="mt-5 space-y-3">
          {page.mockupRows.map(([label, value]) => (
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100" key={label}>
              <span className="text-sm font-semibold text-slate-600">{label}</span>
              <span className="break-words text-right text-sm font-bold text-slate-950">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          <div className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <span>Rendu clair, exportable et adapté au profil utilisateur.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

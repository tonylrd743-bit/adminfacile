import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 leading-8 text-slate-700 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-600">Cadre légal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5">{children}</div>
      </article>
    </main>
  );
}

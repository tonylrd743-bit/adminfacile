import { ChantierSimulator } from "@/components/chantier-simulator";

export default function ChantierSimulatorPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-200">Nouveau · Outils Pro</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Simulateur de prestation IA</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              Estimez une mission, une intervention, un projet client ou un service selon votre métier et les prix pratiqués en France.
            </p>
          </div>
          <span className="w-fit rounded-full bg-blue-600 px-4 py-2 text-sm font-bold">Nouveau</span>
        </div>
      </section>

      <ChantierSimulator />
    </div>
  );
}

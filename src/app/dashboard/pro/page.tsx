import { ProDemoTools } from "@/components/pro-demo-tools";

export default function DashboardProPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-200">Mode demo Professionnel</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Outils Pro</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          Testez les futurs outils professionnels d'AdminFacile avant leur activation complete.
        </p>
      </section>

      <ProDemoTools />
    </div>
  );
}

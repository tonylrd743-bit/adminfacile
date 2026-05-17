import { ProDemoTools } from "@/components/pro-demo-tools";
import { ButtonLink } from "@/components/button";
import { CheckoutButton } from "@/components/checkout-button";
import { getProAccessDateLabel } from "@/lib/pro-access";
import { createClient } from "@/lib/supabase/server";

export default async function ProDemoPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const initialDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-blue-700">Démo limitée</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Aperçu des outils Professionnel</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-700">
          Cette page permet de tester un aperçu limité. À partir du {getProAccessDateLabel()}, l'espace Pro complet sera réservé aux utilisateurs Professionnel.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-64">
            <CheckoutButton label="Passer Professionnel" plan="pro" />
          </div>
          <ButtonLink href="/pricing" variant="outline">
            Voir les offres
          </ButtonLink>
        </div>
      </section>

      <ProDemoTools initialDate={initialDate} profile={profile} />
    </div>
  );
}

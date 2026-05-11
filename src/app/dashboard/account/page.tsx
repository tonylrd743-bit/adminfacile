import { revalidatePath } from "next/cache";
import { Building2, ImageIcon, MapPin, Percent, Save, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/button";
import { numberOrNull, stringOrNull } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

const documentStyles = [
  { value: "sobre", label: "Sobre et institutionnel" },
  { value: "premium", label: "Premium cabinet administratif" },
  { value: "commercial", label: "Commercial clair" },
  { value: "minimal", label: "Minimal et direct" }
];

export default async function AccountPage({ searchParams }: { searchParams?: Promise<{ saved?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  async function updateProfile(formData: FormData) {
    "use server";

    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email ?? String(formData.get("email") ?? ""),
      first_name: stringOrNull(formData.get("first_name")),
      last_name: stringOrNull(formData.get("last_name")),
      company_name: stringOrNull(formData.get("company_name")),
      profession: stringOrNull(formData.get("profession")),
      activity: stringOrNull(formData.get("activity")),
      specialty: stringOrNull(formData.get("specialty")),
      siret: stringOrNull(formData.get("siret")),
      vat_applicable: formData.get("vat_applicable") === "on",
      hourly_rate: numberOrNull(formData.get("hourly_rate")),
      service_area: stringOrNull(formData.get("service_area")),
      travel_fee: numberOrNull(formData.get("travel_fee")),
      professional_email: stringOrNull(formData.get("professional_email")) ?? user.email ?? null,
      phone: stringOrNull(formData.get("phone")),
      logo_url: stringOrNull(formData.get("logo_url")),
      document_style: String(formData.get("document_style") ?? "sobre"),
      updated_at: new Date().toISOString()
    });

    revalidatePath("/dashboard/account");
    revalidatePath("/dashboard");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-600">Compte</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Profil professionnel</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Ces informations personnalisent les devis, factures, emails, PDF, simulateurs, relances, prompts et réponses IA.
        </p>
        {params?.saved ? (
          <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">Profil enregistré.</p>
        ) : null}
      </section>

      <form action={updateProfile} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Identité et activité</h2>
                <p className="mt-2 leading-7 text-slate-600">Renseignez votre contexte réel pour obtenir des documents cohérents avec votre métier.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field defaultValue={profile?.first_name} label="Prénom" name="first_name" />
              <Field defaultValue={profile?.last_name} label="Nom" name="last_name" />
              <Field defaultValue={profile?.company_name} label="Nom entreprise" name="company_name" />
              <Field defaultValue={profile?.profession} label="Métier" name="profession" placeholder="Plaquiste, consultant, nettoyage..." />
              <Field defaultValue={profile?.activity} label="Activité" name="activity" placeholder="Bâtiment, conseil, services..." />
              <Field defaultValue={profile?.specialty} label="Spécialité" name="specialty" placeholder="Rénovation, stratégie, bureaux..." />
              <Field defaultValue={profile?.siret} label="SIRET" name="siret" />
              <Field defaultValue={profile?.professional_email ?? user?.email} label="Email professionnel" name="professional_email" type="email" />
              <Field defaultValue={profile?.phone} label="Téléphone" name="phone" />
              <Field defaultValue={profile?.logo_url} label="Logo entreprise" name="logo_url" placeholder="URL du logo" />
            </div>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-xl font-semibold text-slate-950">Paramètres commerciaux</h2>
            <div className="mt-5 grid gap-4">
              <label className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-slate-800">
                <input className="h-4 w-4 accent-blue-600" defaultChecked={profile?.vat_applicable ?? false} name="vat_applicable" type="checkbox" />
                TVA applicable
              </label>
              <Field defaultValue={profile?.hourly_rate?.toString()} label="Taux horaire HT" name="hourly_rate" type="number" />
              <Field defaultValue={profile?.service_area} label="Zone d'intervention" name="service_area" placeholder="Paris, Île-de-France, à distance..." />
              <Field defaultValue={profile?.travel_fee?.toString()} label="Frais de déplacement" name="travel_fee" type="number" />
              <label className="block space-y-2 text-sm font-semibold text-slate-800">
                Style de document préféré
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  defaultValue={profile?.document_style ?? "sobre"}
                  name="document_style"
                >
                  {documentStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        </div>

        <Button className="mt-6 w-full sm:w-auto" type="submit">
          <Save className="h-4 w-4" />
          Enregistrer le profil
        </Button>
      </form>

      <section className="grid gap-4 md:grid-cols-3">
        <ProfileSignal icon={UserRound} title="Identité" text="Signature, coordonnées, entreprise et style de document." />
        <ProfileSignal icon={Percent} title="Fiscalité" text="SIRET, TVA, micro-entreprise et mentions adaptées." />
        <ProfileSignal icon={MapPin} title="Tarification" text="Taux horaire, déplacement, zone et unité de facturation." />
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ImageIcon className="mt-1 h-5 w-5 text-blue-600" />
          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            Pour supprimer vos données, contactez AdminFacile. Le profil est réservé à la personnalisation de votre espace, de vos documents et des générations IA.
          </p>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-800">
      {label}
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
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

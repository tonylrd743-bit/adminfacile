import { legalDisclaimer } from "@/components/disclaimer-box";
import { LegalPage } from "@/components/legal-page";

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <p>
        AdminFacile est édité dans le cadre d'un MVP SaaS privé destiné aux particuliers en France. Les informations
        d'éditeur devront être complétées avant tout lancement public.
      </p>
      <p>
        Hébergement applicatif : Vercel Inc. Authentification, base de données et stockage : Supabase. Paiements :
        Stripe. Génération IA : OpenAI.
      </p>
      <p>{legalDisclaimer}</p>
    </LegalPage>
  );
}

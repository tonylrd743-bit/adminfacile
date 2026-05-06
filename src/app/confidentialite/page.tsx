import { legalDisclaimer } from "@/components/disclaimer-box";
import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        AdminFacile collecte les informations saisies dans les formulaires afin de préparer les dossiers administratifs
        demandés par l'utilisateur.
      </p>
      <p>
        Les données sont stockées dans Supabase. Les documents uploadés doivent être conservés dans un bucket privé et
        accessibles uniquement par l'utilisateur authentifié.
      </p>
      <p>
        Les prompts envoyés à OpenAI contiennent les informations nécessaires à la génération du dossier. Ne saisissez pas
        d'informations inutiles ou excessives.
      </p>
      <p>{legalDisclaimer}</p>
    </LegalPage>
  );
}

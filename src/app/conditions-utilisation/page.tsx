import { legalDisclaimer } from "@/components/disclaimer-box";
import { LegalPage } from "@/components/legal-page";

export default function ConditionsUtilisationPage() {
  return (
    <LegalPage title="Conditions d'utilisation">
      <p>
        AdminFacile permet de préparer des dossiers administratifs, des checklists, des lettres et des emails pré-remplis
        à partir des informations saisies par l'utilisateur.
      </p>
      <p>
        L'utilisateur reste responsable de relire, corriger et vérifier toutes les informations avant transmission à un
        organisme, une administration, un employeur, une banque ou tout autre destinataire.
      </p>
      <p>
        AdminFacile ne garantit pas l'acceptation d'un dossier, l'obtention d'une aide, une décision favorable ou un délai
        de traitement par un organisme tiers.
      </p>
      <p>
        Les paiements, lorsqu'ils sont activés, sont traités par Stripe. AdminFacile ne collecte pas directement les données
        de carte bancaire.
      </p>
      <p>{legalDisclaimer}</p>
    </LegalPage>
  );
}

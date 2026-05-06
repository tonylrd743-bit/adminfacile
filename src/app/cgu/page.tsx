import { legalDisclaimer } from "@/components/disclaimer-box";
import { LegalPage } from "@/components/legal-page";

export default function TermsPage() {
  return (
    <LegalPage title="Conditions générales d'utilisation">
      <p>
        L'utilisateur reste responsable de la vérification des informations générées et des pièces transmises aux
        organismes officiels.
      </p>
      <p>
        AdminFacile fournit une aide à la préparation administrative, sans garantie d'acceptation d'un dossier par un
        organisme public.
      </p>
      <p>
        Les paiements sont traités par Stripe. AdminFacile ne collecte pas directement les données de carte bancaire.
      </p>
      <p>{legalDisclaimer}</p>
    </LegalPage>
  );
}

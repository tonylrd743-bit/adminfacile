import { legalDisclaimer } from "@/components/disclaimer-box";
import { LegalPage } from "@/components/legal-page";

export default function ConditionsUtilisationPage() {
  return (
    <LegalPage title="Conditions d'utilisation">
      <p>
        AdminFacile permet de preparer des dossiers administratifs, des checklists, des lettres et des emails pre-remplis
        a partir des informations saisies par l'utilisateur.
      </p>
      <p>
        L'utilisateur reste responsable de relire, corriger et verifier toutes les informations avant transmission a un
        organisme, une administration, un employeur, une banque ou tout autre destinataire.
      </p>
      <p>
        AdminFacile ne garantit pas l'acceptation d'un dossier, l'obtention d'une aide, une decision favorable ou un delai
        de traitement par un organisme tiers.
      </p>
      <p>
        Les paiements, lorsqu'ils sont actives, sont traites par Stripe. AdminFacile ne collecte pas directement les donnees
        de carte bancaire.
      </p>
      <p>{legalDisclaimer}</p>
    </LegalPage>
  );
}

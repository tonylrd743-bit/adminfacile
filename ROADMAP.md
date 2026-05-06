# AdminFacile Roadmap

## Etapes du projet

1. Initialiser un projet Next.js, React, TypeScript et TailwindCSS.
2. Ajouter la structure applicative, le design global et les composants UI.
3. Configurer Supabase pour l'authentification, les tables et le coffre-fort.
4. Creer les pages publiques : accueil, prix, pages legales.
5. Creer les routes privees : dashboard, nouvelle demarche, resultat, documents, compte.
6. Connecter OpenAI cote serveur pour generer les dossiers administratifs.
7. Ajouter l'export PDF cote client sans exposer de cle API.
8. Preparer Stripe Checkout pour paiement unique, abonnement et webhook.
9. Documenter l'installation, les variables d'environnement et les tests de lancement.

## Fonctionnalites MVP

- Page d'accueil premium, lisible et responsive.
- Authentification Supabase : inscription, connexion, deconnexion.
- Dashboard utilisateur avec liste des demarches.
- Formulaire CAF / RSA / Prime d'activite avec consentement obligatoire.
- Generation IA : resume, checklist, lettre, etapes, documents et avertissement.
- Page resultat avec export PDF.
- Coffre-fort documents : upload, liste et telechargement.
- Pricing : gratuit, dossier complet, premium mensuel.
- Routes API Stripe : checkout paiement unique, checkout abonnement, webhook.
- Pages legales avec disclaimer clair.

## Fonctionnalites futures

- France Travail.
- ANTS carte grise.
- Impots.
- URSSAF.
- Logement.
- Retraite.
- Sante.
- Assistant courrier administratif generaliste.
- Lecture OCR de documents.
- Rappels automatiques.
- Coffre-fort avance avec classement intelligent.
- Application mobile.

## Risques legaux

- Confusion possible avec un organisme officiel : afficher le disclaimer sur les pages clefs.
- Risque de conseil juridique implicite : les prompts et l'interface doivent rester prudents.
- Donnees personnelles sensibles : proteger les routes, limiter l'exposition client et configurer les politiques RLS.
- Documents utilisateurs : utiliser un bucket Supabase prive et des URLs signees si possible.
- Paiement : laisser Stripe gerer la collecte des cartes via Checkout.

## Points a tester

- Inscription, connexion et deconnexion.
- Protection des pages `/dashboard/*` sans session.
- Creation d'une demarche avec consentement obligatoire.
- Generation IA avec `OPENAI_API_KEY` valide.
- Persistance Supabase dans `requests`.
- Export PDF depuis la page resultat.
- Upload et telechargement de documents.
- Checkout Stripe en mode paiement et abonnement.
- Reception du webhook Stripe avec signature valide.
- Responsive mobile pour accueil, dashboard, formulaire et resultat.
- Verification qu'aucune cle serveur n'est prefixed `NEXT_PUBLIC_`.

# Plan Google Ads AdminFacile

## A) Budget de départ

Budget initial : **2 €/jour**.

## B) Stratégie

Commencer uniquement par **Google Search**.

Ne pas lancer Display ni Performance Max au début. L'objectif est de tester les intentions fortes, mesurer les inscriptions et identifier les mots-clés réellement utiles avant d'augmenter le budget.

Message de conformité à conserver partout :

> AdminFacile est un outil indépendant d'aide administrative et business. Il ne remplace pas un organisme officiel, un expert-comptable ou un conseiller juridique.

## C) Campagne 1 : Devis & Factures

Landing page : `/lp/devis-factures`

### Mots-clés

- logiciel devis facture
- faire un devis en ligne
- générateur devis
- facture auto entrepreneur
- application devis facture

### Titres Google Ads

- Créez vos devis rapidement
- Devis & factures simplifiés
- Outil simple pour indépendants
- AdminFacile pour pros
- Gagnez du temps chaque jour
- Devis professionnels en ligne

### Descriptions

- Créez devis, factures et emails professionnels avec AdminFacile. Simple, rapide et pensé pour les indépendants.
- Un assistant IA pour simplifier vos documents, relances et démarches business. Essayez gratuitement.

## D) Campagne 2 : Simulateur Prestation IA

Landing page : `/lp/simulateur-prestation`

### Mots-clés

- simulateur devis artisan
- estimation prestation
- calcul prix prestation
- estimer un chantier
- simulateur tarif service

### Titres Google Ads

- Estimez vos prestations
- Simulateur IA pour pros
- Calculez vos prix plus vite
- Prix cohérents et clairs
- Estimation pro en ligne

### Descriptions

- Décrivez votre prestation et obtenez une estimation claire avec explication professionnelle.
- AdminFacile aide les pros à estimer, expliquer et transformer leurs prestations en devis.

## E) Campagne 3 : Assistant administratif indépendant

Landing page : `/lp/assistant-administratif`

### Mots-clés

- aide administrative en ligne
- assistant administratif ia
- générateur courrier administratif
- outil administratif indépendant
- simplifier administratif

### Titres Google Ads

- Simplifiez vos démarches
- Assistant administratif IA
- Courriers prêts à envoyer
- Documents clairs et pros
- AdminFacile vous accompagne

### Descriptions

- Préparez courriers, emails, PDF et démarches avec un outil indépendant d'aide administrative.
- Une interface simple pour gagner du temps sur vos documents et demandes.

## Mots-clés négatifs

- officiel
- caf officiel
- france travail officiel
- urssaf officiel
- impots officiel
- connexion caf
- mon compte caf
- recrutement
- emploi
- formation gratuite
- arnaque
- numéro téléphone
- service public connexion

## Suivi conversions

Variables à ajouter dans Vercel :

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_CONVERSION_SIGNUP`
- `NEXT_PUBLIC_GOOGLE_CONVERSION_CHECKOUT`
- `NEXT_PUBLIC_GOOGLE_CONVERSION_PURCHASE`

Conversions à suivre :

- Clic "Essayer gratuitement"
- Inscription réussie
- Début checkout Stripe
- Achat Premium
- Achat Pro
- Clic contact/email

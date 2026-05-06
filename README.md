# AdminFacile

AdminFacile est un MVP SaaS Next.js destiné aux particuliers en France. Il aide à préparer des dossiers et courriers administratifs avec une assistance IA prudente, structurée et exportable en PDF.

AdminFacile est un service privé d'assistance administrative. AdminFacile n'est pas affilié à la CAF, France Travail, l'administration fiscale, l'ANTS ou tout autre organisme public. Les informations générées sont fournies à titre d'aide à la préparation administrative et ne constituent pas un conseil juridique.

## Stack

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Supabase Auth et Postgres
- OpenAI API côté serveur
- Stripe Checkout optionnel
- jsPDF pour l'export PDF

## Installation locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Variables d'environnement

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_COMPLETE=
STRIPE_PRICE_PREMIUM=
```

Supabase est obligatoire pour l'auth et le dashboard. OpenAI est obligatoire uniquement pour générer un dossier. Stripe est optionnel : si les clés ou Price IDs sont vides ou dummy, `/pricing` affiche un paiement bientôt disponible sans bloquer l'app.

## Sécurité

- `OPENAI_API_KEY` reste serveur uniquement.
- `SUPABASE_SERVICE_ROLE_KEY` reste serveur uniquement.
- Seules les variables `NEXT_PUBLIC_*` sont disponibles côté navigateur.
- Les routes `/dashboard/*` sont protégées par le layout serveur.
- L'API `/api/requests/generate` vérifie l'utilisateur Supabase avant OpenAI.
- Stripe reste désactivé proprement tant que les clés ne sont pas configurées.
- `.env.local` ne doit jamais être commité. Le fichier est couvert par `.gitignore`.

## Supabase

1. Créer un projet Supabase.
2. Renseigner `NEXT_PUBLIC_SUPABASE_URL` avec l'URL projet racine, par exemple `https://abcxyz.supabase.co`.
3. Renseigner `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Renseigner `SUPABASE_SERVICE_ROLE_KEY` côté serveur seulement.
5. Exécuter `supabase/schema.sql` dans Supabase SQL Editor.
6. Si vous aviez déjà une ancienne table `requests`, exécuter aussi la migration :

```sql
alter table public.requests
  drop constraint if exists requests_request_type_check;

alter table public.requests
  add constraint requests_request_type_check check (
    request_type in (
      'CAF',
      'RSA',
      'Prime d''activite',
      'caf',
      'rsa',
      'prime-activite',
      'chomage',
      'aide-logement',
      'logement-social',
      'securite-sociale',
      'retraite',
      'impots',
      'ants',
      'urssaf',
      'resiliation',
      'contestation',
      'lettre-proprietaire',
      'aide-financiere'
    )
  ) not valid;
```

## Supabase Redirect URLs

En local :

```txt
http://localhost:3000/auth/callback
```

En production Vercel :

```txt
https://votre-domaine.vercel.app/auth/callback
```

Mettre aussi la Site URL Supabase sur l'URL de production quand le déploiement est validé.

## OpenAI

1. Créer une clé API OpenAI.
2. Ajouter `OPENAI_API_KEY` dans `.env.local` et dans Vercel.
3. Garder `OPENAI_MODEL=gpt-4.1-mini` ou utiliser un modèle compatible Responses API.
4. Tester depuis `/dashboard/new`.

Messages gérés :
- clé absente
- quota dépassé
- service indisponible
- timeout
- réponse invalide

## Stripe plus tard

Le MVP fonctionne sans Stripe. Pour activer les paiements :

1. Créer un Price paiement unique à 4,99 EUR.
2. Créer un Price abonnement à 9,99 EUR/mois.
3. Renseigner `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_COMPLETE`, `STRIPE_PRICE_PREMIUM`.
4. Configurer le webhook `/api/stripe/webhook`.
5. Renseigner `STRIPE_WEBHOOK_SECRET`.

## Préparer GitHub

Créer un repo GitHub vide, puis exécuter depuis la racine du projet :

```bash
git init
git add .
git commit -m "AdminFacile MVP"
git branch -M main
git remote add origin URL_DU_REPO
git push -u origin main
```

Avant `git add .`, vérifier que `.env.local` n'apparaît pas dans les fichiers suivis. Ne jamais commiter de vraie clé API.

## Déploiement Vercel

1. Importer le repo GitHub dans Vercel.
2. Choisir `Framework Preset: Next.js`.
3. Vérifier les réglages :
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: laisser vide
   - Node.js: `>=20.9.0` ou Node 22 LTS
4. Ajouter toutes les variables d'environnement dans Project Settings.
5. Définir `NEXT_PUBLIC_APP_URL=https://nom-du-projet.vercel.app`.
6. Dans Supabase Auth, définir :
   - Site URL: `https://nom-du-projet.vercel.app`
   - Redirect URL: `https://nom-du-projet.vercel.app/auth/callback`
7. Exécuter `supabase/schema.sql` dans le projet Supabase cible.
8. Redéployer Vercel après modification des variables d'environnement.
9. Tester signup, login, dashboard, génération IA, résultat, PDF, historique et pricing.

## Routes à vérifier en production

- `/signup` : inscription.
- `/login` : connexion.
- `/auth/callback` : retour Supabase après email.
- `/dashboard` : protégé, redirige vers `/login` sans session.
- `/dashboard/new` : formulaire nouvelle démarche.
- `/dashboard/requests/[id]` : page résultat protégée.
- `/pricing` : doit fonctionner même si Stripe n'est pas configuré ou dummy.

## Checklist MVP

1. `npm run typecheck`
2. `npm run lint`
3. `npm run dev`
4. Créer un compte depuis `/signup`.
5. Confirmer l'email si activé.
6. Se connecter.
7. Créer une démarche depuis `/dashboard/new`.
8. Générer le dossier.
9. Vérifier résumé, checklist, lettre, documents, étapes et avertissement.
10. Télécharger le PDF.
11. Revenir au dashboard et vérifier l'historique.
12. Ouvrir `/dashboard/documents` et vérifier que le coffre-fort ne bloque pas le MVP.

## Erreurs fréquentes

- `Invalid path specified in request URL` : `NEXT_PUBLIC_SUPABASE_URL` doit être l'URL projet Supabase racine, sans `/rest/v1`.
- `OpenAI n'est pas configuré` : ajouter `OPENAI_API_KEY`.
- `OpenAI quota atteint` : vérifier quota et facturation OpenAI.
- `requests_request_type_check` : exécuter la migration SQL des types de démarches.
- `Paiement bientôt disponible` : normal tant que Stripe n'est pas configuré.
- `spawn EPERM` ou `Accès refusé` sur Windows : problème local de lancement Turbopack/Node, pas une erreur TypeScript. Tester depuis un terminal Windows standard ou Vercel.

import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { getOpenAI } from "@/lib/openai";
import { getUserOrNull } from "@/lib/supabase/server";

export const runtime = "nodejs";

const requestSchema = z.object({
  description: z.string().trim().min(10),
  dimensions: z.string().trim().min(1),
  travelDistance: z.string().trim().optional().default(""),
  services: z.array(z.string()).min(1),
  images: z.array(z.string().startsWith("data:image/")).max(4).optional().default([])
});

const resultSchema = z.object({
  title: z.string(),
  estimation: z.string(),
  priceMin: z.number(),
  priceMax: z.number(),
  estimatedTime: z.string(),
  profitability: z.string(),
  difficulty: z.enum(["Faible", "Moyenne", "Élevée", "Complexe"]),
  summary: z.string(),
  whyThisPrice: z.array(z.string()),
  marketPosition: z.string(),
  professionalAdvice: z.array(z.string()),
  recapRows: z.array(z.object({ label: z.string(), detail: z.string(), amount: z.string() })),
  badges: z.array(z.string()),
  emailSubject: z.string(),
  emailBody: z.string(),
  quoteService: z.string(),
  quoteDetails: z.string()
});

const systemPrompt = `Tu es un estimateur chantier professionnel pour artisans en France.
Tu raisonnes comme un artisan expérimenté, un gestionnaire chantier et un comptable bâtiment.
Tu dois produire une estimation rentable, réaliste, cohérente avec les prix pratiqués en France.

Règles impératives :
- ne jamais casser les prix du marché
- ne jamais donner de prix absurdes ou trop vagues
- tenir compte du temps, volume, hauteur, accès, difficulté, matériel, déchets, déplacement, produits et main d'œuvre
- pour une haie très haute, dense ou large, intégrer temps de coupe, manutention, broyage ou évacuation
- pour un nettoyage karcher, intégrer surface, préparation, produits éventuels, accès à l'eau et temps de finition
- afficher une fourchette basse/haute et un prix conseillé crédible
- style attendu : "Pour cette prestation, un tarif cohérent en France se situe entre 1300€ et 1800€ selon l'accès au chantier, l'évacuation des déchets et le temps de travail. Un prix conseillé serait d'environ 1500€ TTC."
- si des photos sont fournies, analyser prudemment ce qui est visible : végétation, volume, accès, état général, difficulté
- rappeler que l'estimation reste indicative et basée sur les informations fournies
- répondre uniquement en JSON conforme au schéma demandé`;

export async function POST(request: Request) {
  const user = await getUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI n'est pas configuré. Ajoutez OPENAI_API_KEY côté serveur." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Description, dimensions et prestations sont obligatoires." }, { status: 400 });
  }

  const inputText = buildPrompt(parsed.data);
  const content = [
    { type: "input_text" as const, text: inputText },
    ...parsed.data.images.map((image) => ({ type: "input_image" as const, image_url: image, detail: "auto" as const }))
  ];

  try {
    const response = await getOpenAI().responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content }
      ],
      text: {
        format: zodTextFormat(resultSchema, "chantier_estimate")
      }
    });

    const result = resultSchema.safeParse(JSON.parse(response.output_text));
    if (!result.success) {
      return NextResponse.json({ error: "L'analyse a été générée, mais son format est invalide. Réessayez." }, { status: 502 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : undefined;
    if (status === 429) {
      return NextResponse.json({ error: "Quota OpenAI atteint ou temporairement limité. Réessayez plus tard." }, { status: 429 });
    }
    if (status && status >= 500) {
      return NextResponse.json({ error: "OpenAI est temporairement indisponible. Réessayez dans quelques minutes." }, { status: 503 });
    }
    return NextResponse.json({ error: "Impossible d'analyser le chantier pour le moment." }, { status: 502 });
  }
}

function buildPrompt(data: z.infer<typeof requestSchema>) {
  return `Analyse ce chantier et produis une estimation professionnelle.

Description utilisateur :
${data.description}

Dimensions :
${data.dimensions}

Distance déplacement :
${data.travelDistance || "Non précisée"}

Prestations demandées :
${data.services.join(", ")}

Images fournies : ${data.images.length}

Structure attendue :
1. estimation globale TTC sous forme "entre X€ et Y€ TTC"
2. explication professionnelle du prix
3. positionnement marché France
4. conseils professionnels
5. tableau récapitulatif
6. temps chantier estimé
7. estimation rentabilité
8. email client prêt à envoyer
9. données utiles pour transformer en devis`;
}

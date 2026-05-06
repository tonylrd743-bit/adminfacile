import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRequiredEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  let stripe: Stripe;
  let webhookSecret: string;
  try {
    stripe = getStripe();
    webhookSecret = getRequiredEnv("STRIPE_WEBHOOK_SECRET");
  } catch {
    return NextResponse.json({ error: "Stripe n'est pas encore configuré." }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature Stripe manquante." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Signature Stripe invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "invoice.payment_succeeded":
    case "customer.subscription.deleted":
      // MVP: ajouter ici la mise a jour d'un champ plan/status lorsque la table billing sera ajoutee.
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

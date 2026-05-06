import Stripe from "stripe";
import { getRequiredEnv } from "@/lib/env";

let stripeClient: Stripe | null = null;

export function isStripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      !isDummyValue(process.env.STRIPE_SECRET_KEY) &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
      !isDummyValue(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  );
}

export function getStripe() {
  if (!isStripeConfigured()) {
    throw new Error("Paiement bientôt disponible. Stripe n'est pas encore configuré.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2026-02-25.clover",
      typescript: true
    });
  }
  return stripeClient;
}

function isDummyValue(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized.length === 0 || normalized === "dummy" || normalized.includes("your-") || normalized.includes("test_key");
}

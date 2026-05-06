import { getStripe, isStripeConfigured } from "@/lib/stripe";

export function isStripePlanConfigured(plan: "complete" | "premium") {
  const priceId = getStripePriceId(plan);
  return isStripeConfigured() && Boolean(priceId && !isDummyValue(priceId));
}

export async function createCheckoutSession({
  userId,
  email,
  plan
}: {
  userId: string;
  email?: string;
  plan: "complete" | "premium";
}) {
  const isSubscription = plan === "premium";
  const priceId = getStripePriceId(plan);

  if (!priceId || isDummyValue(priceId)) {
    throw new Error("Paiement bientôt disponible. Cette offre Stripe n'est pas encore configurée.");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return getStripe().checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      user_id: userId,
      plan
    },
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`
  });
}

function getStripePriceId(plan: "complete" | "premium") {
  return plan === "premium" ? process.env.STRIPE_PRICE_PREMIUM : process.env.STRIPE_PRICE_COMPLETE;
}

function isDummyValue(value: string) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.length === 0 ||
    normalized === "dummy" ||
    normalized.includes("your-") ||
    normalized.includes("price_xxx") ||
    normalized.includes("test_price")
  );
}

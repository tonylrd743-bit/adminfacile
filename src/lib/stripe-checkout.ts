import { getStripe, isStripeConfigured } from "@/lib/stripe";

export type StripePlan = "complete" | "premium" | "pro";

export function isStripePlanConfigured(plan: StripePlan) {
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
  plan: StripePlan;
}) {
  const isSubscription = plan === "premium" || plan === "pro";
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
    subscription_data: isSubscription
      ? {
          metadata: {
            user_id: userId,
            plan
          }
        }
      : undefined,
    success_url: `${appUrl}/dashboard?checkout=success&plan=${plan}`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`
  });
}

function getStripePriceId(plan: StripePlan) {
  if (plan === "pro") return process.env.STRIPE_PRICE_PRO;
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

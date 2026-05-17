import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRequiredEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

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
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    case "invoice.payment_succeeded":
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  const plan = normalizePlan(session.metadata?.plan);
  if (!userId || !plan) return;

  await updateProfileSubscription({
    userId,
    status: plan,
    customerId: getStripeId(session.customer),
    subscriptionId: getStripeId(session.subscription)
  });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = getInvoiceSubscriptionId(invoice);
  if (!subscriptionId) return;

  const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata?.user_id;
  const plan = normalizePlan(subscription.metadata?.plan);
  if (!userId || !plan) return;

  await updateProfileSubscription({
    userId,
    status: plan,
    customerId: getStripeId(subscription.customer),
    subscriptionId: subscription.id
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id;
  if (!userId) return;

  await updateProfileSubscription({
    userId,
    status: "canceled",
    customerId: getStripeId(subscription.customer),
    subscriptionId: subscription.id
  });
}

async function updateProfileSubscription({
  userId,
  status,
  customerId,
  subscriptionId
}: {
  userId: string;
  status: "premium" | "pro" | "canceled";
  customerId: string | null;
  subscriptionId: string | null;
}) {
  await getSupabaseAdmin()
    .from("profiles")
    .update({
      subscription_status: status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_updated_at: new Date().toISOString()
    })
    .eq("id", userId);
}

function normalizePlan(plan: string | undefined) {
  if (plan === "premium" || plan === "pro") return plan;
  return null;
}

function getStripeId(value: string | { id: string } | null) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
  const parent = invoice.parent;
  if (parent?.type !== "subscription_details") return null;
  const subscription = parent.subscription_details?.subscription ?? null;
  return typeof subscription === "string" ? subscription : subscription?.id ?? null;
}

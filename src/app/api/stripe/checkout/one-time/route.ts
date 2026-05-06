import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe-checkout";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  let session;
  try {
    session = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      plan: "complete"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Paiement bientôt disponible." },
      { status: 503 }
    );
  }

  return NextResponse.json({ url: session.url });
}

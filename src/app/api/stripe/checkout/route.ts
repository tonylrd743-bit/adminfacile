import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe-checkout";
import { createClient } from "@/lib/supabase/server";

const checkoutSchema = z.object({
  plan: z.enum(["complete", "premium"])
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Offre invalide." }, { status: 400 });
  }

  let session;
  try {
    session = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      plan: parsed.data.plan
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Paiement bientôt disponible." },
      { status: 503 }
    );
  }

  return NextResponse.json({ url: session.url });
}

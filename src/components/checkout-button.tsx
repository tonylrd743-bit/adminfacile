"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/button";

export function CheckoutButton({
  plan,
  label,
  disabled = false
}: {
  plan: "complete" | "premium";
  label: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(disabled ? "Paiement bientôt disponible" : null);

  async function checkout() {
    if (disabled) {
      setMessage("Paiement bientôt disponible");
      return;
    }

    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan })
    });
    const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
      return;
    }
    setMessage(data.error ?? "Checkout indisponible.");
  }

  return (
    <div className="space-y-2">
      <Button className="w-full" disabled={loading || disabled} onClick={checkout} type="button">
        {disabled ? <Lock className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
        {loading ? "Redirection..." : label}
      </Button>
      {message ? <p className="text-center text-sm font-medium text-slate-500">{message}</p> : null}
    </div>
  );
}

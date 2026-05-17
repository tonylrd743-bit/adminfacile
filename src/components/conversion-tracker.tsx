"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/tracking";

const planValues: Record<string, number> = {
  premium: 9.99,
  complete: 29.99,
  pro: 29.99
};

export function ConversionTracker({ checkout, plan }: { checkout?: string; plan?: string }) {
  useEffect(() => {
    if (checkout !== "success") return;
    const normalizedPlan = plan || "premium";
    trackPurchase(normalizedPlan, planValues[normalizedPlan] ?? 0);
  }, [checkout, plan]);

  return null;
}

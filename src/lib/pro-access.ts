import type { ProfessionalProfile } from "@/lib/profile";

const defaultProPaidAccessDate = "2026-05-20T00:00:00+02:00";

export const PRO_PAID_ACCESS_DATE = process.env.PRO_PAID_ACCESS_DATE || defaultProPaidAccessDate;

export function isProPaidAccessActive(now = new Date()) {
  return now.getTime() >= new Date(PRO_PAID_ACCESS_DATE).getTime();
}

export function hasProAccess(profile: Pick<ProfessionalProfile, "subscription_status"> | null | undefined, now = new Date()) {
  if (!isProPaidAccessActive(now)) return true;
  return profile?.subscription_status === "pro";
}

export function getProAccessDateLabel() {
  return "mercredi 20 mai 2026";
}

import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { PrivateShell } from "@/components/private-shell";
import { getUserOrNull } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUserOrNull();
  if (!user) redirect("/login");
  return <PrivateShell>{children}</PrivateShell>;
}

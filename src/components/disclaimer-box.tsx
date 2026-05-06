import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const legalDisclaimer =
  "AdminFacile est un service privé d’assistance administrative. AdminFacile n’est pas affilié à la CAF, France Travail, l’administration fiscale, l’ANTS ou tout autre organisme public. Les informations générées sont fournies à titre d’aide à la préparation administrative et ne constituent pas un conseil juridique.";

export function DisclaimerBox({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("rounded-3xl border border-blue-100 bg-blue-50 p-5 text-slate-700", className)}>
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
        <div>
          <p className="font-semibold text-slate-950">Information importante</p>
          <p className={cn("mt-2 leading-7", compact ? "text-sm" : "text-base")}>{legalDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}

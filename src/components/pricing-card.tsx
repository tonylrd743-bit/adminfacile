import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function PricingCard({
  name,
  price,
  description,
  features,
  action,
  featured = false
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  action: ReactNode;
  featured?: boolean;
}) {
  return (
    <section
      className={
        featured
          ? "flex rounded-3xl border border-blue-200 bg-slate-950 p-6 text-white shadow-xl shadow-blue-950/10"
          : "flex rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      }
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">{name}</h2>
          {featured ? <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold">Populaire</span> : null}
        </div>
        <p className={featured ? "mt-3 text-slate-300" : "mt-3 text-slate-600"}>{description}</p>
        <p className="mt-6 text-4xl font-semibold tracking-tight">{price}</p>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((feature) => (
            <li className={featured ? "flex gap-3 text-slate-100" : "flex gap-3 text-slate-700"} key={feature}>
              <Check className={featured ? "mt-0.5 h-5 w-5 shrink-0 text-blue-300" : "mt-0.5 h-5 w-5 shrink-0 text-blue-600"} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-8">{action}</div>
      </div>
    </section>
  );
}

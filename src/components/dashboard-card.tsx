import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function DashboardCard({
  href,
  icon: Icon,
  title,
  text,
  tone = "light"
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <Link
      className={
        dark
          ? "rounded-3xl bg-slate-950 p-6 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-900"
          : "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      }
      href={href}
    >
      <div className={dark ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10" : "flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"}>
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-semibold">{title}</h2>
      <p className={dark ? "mt-2 leading-7 text-slate-300" : "mt-2 leading-7 text-slate-600"}>{text}</p>
    </Link>
  );
}

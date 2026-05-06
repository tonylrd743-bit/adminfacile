import Link from "next/link";
import { FilePlus2, FolderLock, LayoutDashboard, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "Nouvelle démarche", icon: FilePlus2 },
  { href: "/dashboard/documents", label: "Mes documents", icon: FolderLock },
  { href: "/dashboard/account", label: "Mon compte", icon: UserRound }
];

export function PrivateShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <nav className="grid gap-1">
          {nav.map((item) => (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              )}
              href={item.href}
              key={item.href}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section>{children}</section>
    </main>
  );
}

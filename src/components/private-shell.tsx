import Link from "next/link";
import { FilePlus2, FolderLock, LayoutDashboard, LibraryBig, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "Nouvelle démarche", icon: FilePlus2 },
  { href: "/dashboard/prompts", label: "Prompts pré-écrits", icon: LibraryBig },
  { href: "/dashboard/documents", label: "Mes documents", icon: FolderLock },
  { href: "/dashboard/account", label: "Mon compte", icon: UserRound }
];

export function PrivateShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-3 py-5 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
          {nav.map((item) => (
            <Link
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
      <section className="min-w-0">{children}</section>
    </main>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthStatus } from "@/components/auth-status";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/demarches", label: "Démarches" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/30">
            AF
          </span>
          <span>AdminFacile</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {links.map((link) => (
            <Link className="transition hover:text-slate-950" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <AuthStatus />
        </div>

        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="grid gap-2">
            {links.map((link) => (
              <Link
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <AuthStatus />
          </div>
        </div>
      ) : null}
    </header>
  );
}

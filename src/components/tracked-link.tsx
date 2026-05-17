"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackClickTryFree, trackContactClick, trackLandingCta } from "@/lib/tracking";

const variants = {
  primary: "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700",
  secondary: "bg-slate-950 text-white hover:bg-slate-800",
  outline: "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
};

type Variant = keyof typeof variants;
type TrackingKind = "try-free" | "landing-cta" | "contact";

export function TrackedLink({
  children,
  className,
  variant = "primary",
  tracking,
  trackingPage,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tracking?: TrackingKind;
  trackingPage?: string;
}) {
  function onClick() {
    if (tracking === "try-free") trackClickTryFree();
    if (tracking === "landing-cta") trackLandingCta(trackingPage ?? String(props.href));
    if (tracking === "contact") trackContactClick(trackingPage ?? String(props.href));
  }

  return (
    <Link
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
        variants[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}

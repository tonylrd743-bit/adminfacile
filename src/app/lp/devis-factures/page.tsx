import type { Metadata } from "next";
import { AdsLandingPage } from "@/components/ads-landing-page";
import { landingPages } from "@/lib/landing-pages";

const page = landingPages["devis-factures"];

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: "/lp/devis-factures" },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: "/lp/devis-factures",
    type: "website"
  }
};

export default function DevisFacturesLandingPage() {
  return <AdsLandingPage page={page} />;
}

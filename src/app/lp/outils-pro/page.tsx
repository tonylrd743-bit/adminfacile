import type { Metadata } from "next";
import { AdsLandingPage } from "@/components/ads-landing-page";
import { landingPages } from "@/lib/landing-pages";

const page = landingPages["outils-pro"];

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: "/lp/outils-pro" },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: "/lp/outils-pro",
    type: "website"
  }
};

export default function OutilsProLandingPage() {
  return <AdsLandingPage page={page} />;
}

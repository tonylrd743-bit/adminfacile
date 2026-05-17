import type { Metadata } from "next";
import { AdsLandingPage } from "@/components/ads-landing-page";
import { landingPages } from "@/lib/landing-pages";

const page = landingPages["simulateur-prestation"];

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: "/lp/simulateur-prestation" },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: "/lp/simulateur-prestation",
    type: "website"
  }
};

export default function SimulateurPrestationLandingPage() {
  return <AdsLandingPage page={page} />;
}

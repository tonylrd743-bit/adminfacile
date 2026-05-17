import type { Metadata } from "next";
import { AdsLandingPage } from "@/components/ads-landing-page";
import { landingPages } from "@/lib/landing-pages";

const page = landingPages["assistant-administratif"];

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  alternates: { canonical: "/lp/assistant-administratif" },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: "/lp/assistant-administratif",
    type: "website"
  }
};

export default function AssistantAdministratifLandingPage() {
  return <AdsLandingPage page={page} />;
}

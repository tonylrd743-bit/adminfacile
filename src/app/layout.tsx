import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/footer";
import { GoogleTracking } from "@/components/google-tracking";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "AdminFacile - Assistant administratif IA",
  description:
    "AdminFacile aide les particuliers et entrepreneurs en France à préparer des démarches administratives, courriers, PDF et emails professionnels."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">
        <GoogleTracking />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

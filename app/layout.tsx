import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Analytics from "./google/GoogleAnalytics";

import Navigation from "./components/navigation";
import FooterWrapper from "./components/footer/FooterWrapper";
import PageAnimations from "./components/animations/PageAnimations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "Hondenkunde.nl — het beste voor jouw hond",
    template: "%s | Hondenkunde.nl",
  },
  description: "Hondenkunde.nl — blogs, producttests en reistips voor hondenliefhebbers. Door Arti getest en aanbevolen.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Hondenkunde.nl",
    images: [{ url: "/images/arti1.webp", width: 1200, height: 630, alt: "Hondenkunde.nl" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/arti1.webp"],
  },
  verification: {
    google: "LJtZ-8tLNg4Jid4EW-KzeKgxhEmDbsK0f2GALS-W-rw",
  },
  other: {
    "tradetracker-site-verification":
      "24861470fe314b03153d0d0f7963127d1e31fccd",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Suspense>
          <Analytics />
        </Suspense>
        <PageAnimations />
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <FooterWrapper />
      </body>
    </html>
  );
}

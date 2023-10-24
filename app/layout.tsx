import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Analytics from "./google/GoogleAnalytics";

import Navigation from "./components/navigation";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: "Hondenkunde",
  description: "Hondenkunde, het beste voor jouw hond!",
  verification: {
    google:
      "google-site-verification=LJtZ-8tLNg4Jid4EW-KzeKgxhEmDbsK0f2GALS-W-rw",
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
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <Analytics />
        </Suspense>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

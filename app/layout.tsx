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

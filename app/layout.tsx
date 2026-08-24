import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import PageLoader from "./components/PageLoader";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://genivere.com";
const siteDescription =
  "Portfolio of Genivere, a junior software engineer turning complex problems into elegant, user-friendly solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Genivere | Software Engineer",
    template: "%s | Genivere",
  },
  description: siteDescription,
  keywords: [
    "Genivere",
    "software engineer",
    "junior software engineer",
    "web developer",
    "portfolio",
    "computer science",
  ],
  authors: [{ name: "Genivere" }],
  creator: "Genivere",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Genivere",
    title: "Genivere | Software Engineer",
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genivere | Software Engineer",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080510",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body>
        <PageLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

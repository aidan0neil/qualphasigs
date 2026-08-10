import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.organization} – Theta Tau`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  keywords: [
    "Alpha Sigma Phi",
    "Theta Tau",
    "Quinnipiac University",
    "fraternity",
    "Greek life",
    "brotherhood",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-white text-navy-900 antialiased">{children}</body>
    </html>
  );
}

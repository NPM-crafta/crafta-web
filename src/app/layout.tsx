import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { craftaAccounts, craftaKeywords } from "../lib/site-data";
import SplashCursor from "../components/SplashCursor";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const baseUrl = "https://crafta.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Crafta | Modular Backend Ecosystem",
    template: "%s | Crafta",
  },
  description:
    "Crafta ecosystem website for backend modules including crafta core and @dax-crafta/auth. Explore packages, docs, and developer resources.",
  keywords: craftaKeywords,
  openGraph: {
    title: "Crafta Ecosystem",
    description:
      "Build backend products faster with modular Crafta packages and production-ready docs.",
    url: baseUrl,
    siteName: "Crafta",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "wNY-7XNIVGCXrq8RVnBV36yCa50PGvwLlI5rneDsbzI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SplashCursor
          SPLAT_RADIUS={0.16}
          SPLAT_FORCE={5400}
          DENSITY_DISSIPATION={3.8}
          VELOCITY_DISSIPATION={2.1}
          COLOR_UPDATE_SPEED={8}
          BACK_COLOR={{ r: 0.03, g: 0.09, b: 0.16 }}
          TRANSPARENT
        />
        <header className="site-header">
          <div className="shell nav-shell">
            <Link href="/" className="brand-pill">
              <Image src="/logo.png" alt="Crafta logo" width={28} height={28} className="brand-logo" priority />
              <span>Crafta</span>
            </Link>
            <nav className="nav-links" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/docs">Docs</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/showcase">Showcase</Link>
              <Link href="/ecosystem">Ecosystem</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="site-footer">
          <div className="shell footer-shell">
            <div>
              <p className="footer-brand-line">
                <Image src="/logo.png" alt="Crafta logo" width={18} height={18} className="footer-logo" />
                <span>Crafta ecosystem for real-world backend teams.</span>
              </p>
              <p className="footer-muted">Build less boilerplate. Ship more product.</p>
            </div>
            <div className="footer-links">
              <a href={craftaAccounts.githubOrg} target="_blank" rel="noreferrer">GitHub Org</a>
              <a href={craftaAccounts.npmCore} target="_blank" rel="noreferrer">npm: crafta</a>
              <a href={craftaAccounts.npmAuth} target="_blank" rel="noreferrer">npm: crafta-auth</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

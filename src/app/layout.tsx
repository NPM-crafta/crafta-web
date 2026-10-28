import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sora, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { craftaAccounts, craftaKeywords } from "../lib/site-data";
import SplashCursor from "../components/SplashCursor";
import { SearchModal } from "../components/SearchModal";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    default: "@dax-crafta/auth | Enterprise Node.js Authentication Library",
    template: "%s | Crafta",
  },
  description:
    "Production-grade, security-first authentication library for Node.js, Express, and Crafta. Features JWT rotation, RBAC, 2FA, password policy, audit logging, and 19 machine-readable error codes.",
  keywords: craftaKeywords,
  openGraph: {
    title: "@dax-crafta/auth - Enterprise Authentication for Node.js",
    description:
      "Security-first Node.js authentication module with JWT rotation, 2FA, RBAC, session management, and standardized AUTH_* error codes.",
    url: baseUrl,
    siteName: "Crafta Framework & Auth",
    type: "website",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Crafta Auth Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "@dax-crafta/auth Documentation",
    description:
      "Enterprise authentication for Node.js with JWT rotation, 2FA, RBAC, and standardized error codes.",
    images: [`${baseUrl}/logo.png`],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "@dax-crafta/auth",
  "codeRepository": "https://github.com/daxp472/crafta",
  "programmingLanguage": ["JavaScript", "TypeScript"],
  "runtimePlatform": "Node.js",
  "author": {
    "@type": "Person",
    "name": "Dax Patel"
  },
  "description": "Enterprise security authentication library for Node.js featuring JWT token rotation, RBAC, 2FA TOTP, session management, and standardized AUTH_* error codes."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", sora.variable, spaceGrotesk.variable, "font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
            <div className="flex items-center gap-2">
              <SearchModal />
            </div>
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

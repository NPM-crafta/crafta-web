import type { Metadata } from "next";
import Link from "next/link";
import { craftaPackages } from "../../lib/site-data";
import { AUTH_ERROR_CODES, API_REFERENCE_ITEMS, AUTH_FLOW_DIAGRAMS } from "../../lib/auth-docs-data";

const majorSections = [
  { id: "overview", label: "Overview" },
  { id: "packages", label: "Packages" },
  { id: "how-to-navigate", label: "How to Navigate" },
  { id: "doc-principles", label: "Doc Principles" },
] as const;

const subTopics = [
  { id: "crafta-core", label: "crafta" },
  { id: "crafta-auth", label: "@dax-crafta/auth" },
  { id: "crafta-chat", label: "@dax-crafta/chat" },
] as const;

export const metadata: Metadata = {
  title: "Docs - Crafta Ecosystem Documentation Portal",
  description:
    "Comprehensive documentation for Crafta ecosystem packages. Start with @dax-crafta/auth quickstart, JWT rotation diagrams, API reference, and AUTH_* error code guide.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Crafta Documentation Portal | Modular Backend Docs",
    description:
      "Developer documentation, quickstarts, interactive diagrams, and API reference for Crafta ecosystem packages.",
    url: "https://crafta.dev/docs",
    siteName: "Crafta",
    type: "website",
  },
};

export default function DocsPage() {
  return (
    <div className="docs-wrap shell">
      <aside className="left-sidebar">
        <h2>Docs Home</h2>
        <nav aria-label="Major sections">
          {majorSections.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <article className="docs-content">
        <section id="overview">
          <h1>Crafta Documentation Portal</h1>
          <p>
            This docs experience is designed for multiple Crafta packages. Use
            the package index below to jump into focused docs with a left
            feature sidebar and a right in-page subtopic navigator.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            <Link href="/docs/crafta-auth#quick-start" className="doc-package-card group">
              <span className="text-xs font-mono text-[#15e6bb] mb-1 block">Quickstart</span>
              <h3>Install & Configure</h3>
              <p>Express, MongoDB, JWT secrets, and feature flags in 5 minutes.</p>
            </Link>
            <Link href="/docs/crafta-auth#security-flows" className="doc-package-card group">
              <span className="text-xs font-mono text-[#15e6bb] mb-1 block">Flow Diagrams</span>
              <h3>Visual Architecture</h3>
              <p>Interactive diagrams for JWT rotation, 2FA TOTP, sessions, and magic links.</p>
            </Link>
            <Link href="/docs/crafta-auth#api-reference" className="doc-package-card group">
              <span className="text-xs font-mono text-[#15e6bb] mb-1 block">API Reference</span>
              <h3>All Exports</h3>
              <p>Browse {API_REFERENCE_ITEMS.length} API symbols and {AUTH_ERROR_CODES.length} AUTH_* error codes.</p>
            </Link>
          </div>
        </section>

        <section id="packages">
          <h2>Package Docs</h2>
          <div className="doc-package-grid">
            {craftaPackages.map((pkg) => (
              <article id={pkg.slug} key={pkg.slug} className="doc-package-card">
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <Link href={`/packages/${pkg.slug}`} className="feature-link">
                  Open package docs
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="how-to-navigate">
          <h2>How to Navigate</h2>
          <p>
            Left sidebar gives major package context. Right sidebar gives the
            exact sections inside each package so developers can jump quickly.
          </p>
        </section>

        <section id="doc-principles">
          <h2>Doc Principles</h2>
          <p>
            Every package page is practical-first: what it does, how to install,
            which features matter, and production gotchas.
          </p>
        </section>
      </article>

      <aside className="right-sidebar">
        <h3>On this page</h3>
        <nav aria-label="Sub topics">
          {subTopics.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <h3 className="mt-6">Auth Topics</h3>
        <nav aria-label="Auth subtopics">
          <a href="/docs/crafta-auth#quick-start">Quickstart Guide</a>
          <a href="/docs/crafta-auth#security-flows">Security Flows</a>
          <a href="/docs/crafta-auth#api-reference">API Reference</a>
          <a href="/docs/crafta/auth#error-reference">Error Reference</a>
          <a href="/docs/crafta-auth#production-checklist">Security Best Practices</a>
        </nav>
      </aside>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { craftaPackages } from "../../lib/site-data";

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
  title: "Docs",
  description:
    "Centralized documentation for the entire Crafta ecosystem with package-level navigation.",
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
        </section>

        <section id="packages">
          <h2>Package Docs</h2>
          <div className="doc-package-grid">
            {craftaPackages.map((pkg) => (
              <article id={pkg.slug} key={pkg.slug} className="doc-package-card">
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <Link href={`/packages/${pkg.slug}`} className="feature-link">Open package docs</Link>
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
      </aside>
    </div>
  );
}

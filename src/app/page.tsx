import type { Metadata } from "next";
import Link from "next/link";
import { craftaAccounts, craftaPackages } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Crafta official website for modular backend packages, docs, and production-ready development resources.",
};

const marquee = [
  "Crafta Core",
  "Crafta Auth",
  "RBAC + 2FA",
  "Config-first DX",
  "Production Security",
  "Multi-package Docs",
];

export default function HomePage() {
  const featured = craftaPackages.slice(0, 3);

  return (
    <div className="hero-page">
      <section className="shell hero reveal-up">
        <div className="hero-badge">Crafta Ecosystem</div>
        <h1>
          One ecosystem.
          <br />
          Multiple backend superpowers.
        </h1>
        <p>
          Crafta helps developers launch production-ready backend systems with
          modular packages like crafta core and @dax-crafta/auth, while keeping
          full customization in your own codebase.
        </p>

        <div className="hero-cta">
          <Link href="/packages" className="btn-primary">Explore Packages</Link>
          <Link href="/docs" className="btn-secondary">Read Docs</Link>
          <Link href="/guides" className="btn-secondary">Guides</Link>
          <Link href="/showcase" className="btn-secondary">Showcase</Link>
        </div>

        <div className="marquee-wrap" aria-label="Crafta capabilities">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, idx) => (
              <span key={`${item}-${idx}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="shell features-grid">
        {featured.map((pkg, idx) => (
          <article key={pkg.slug} className={`feature-card reveal-up-delay-${Math.min(idx + 1, 3)}`}>
            <h2>{pkg.name}</h2>
            <p>{pkg.description}</p>
            <Link href={`/docs/${pkg.slug}`} className="feature-link">Open {pkg.name} docs</Link>
          </article>
        ))}
      </section>

      <section className="shell showcase reveal-up">
        <div>
          <h3>Official Crafta Accounts</h3>
          <p>
            Follow releases, package updates, and ecosystem progress from the
            official Crafta organization profiles.
          </p>
        </div>
        <div className="pill-row">
          <a href={craftaAccounts.githubOrg} target="_blank" rel="noreferrer">GitHub Organization</a>
          <a href={craftaAccounts.npmCore} target="_blank" rel="noreferrer">npm crafta</a>
          <a href={craftaAccounts.npmAuth} target="_blank" rel="noreferrer">npm @dax-crafta/auth</a>
          <a href={craftaAccounts.x} target="_blank" rel="noreferrer">X / Updates</a>
        </div>
      </section>
    </div>
  );
}

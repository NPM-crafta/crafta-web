import type { Metadata } from "next";
import Link from "next/link";
import { craftaPackages } from "../../lib/site-data";
import BorderGlow from "../../components/BorderGlow";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Explore all Crafta packages, their capabilities, status, and direct links to package documentation.",
};

export default function PackagesPage() {
  return (
    <div className="shell page-space">
      <section className="page-intro reveal-up">
        <h1>Crafta Packages</h1>
        <p>
          Crafta is designed as an ecosystem. Each package is focused,
          composable, and production-minded.
        </p>
      </section>

      <section className="package-grid">
        {craftaPackages.map((pkg, idx) => (
          <BorderGlow
            key={pkg.slug}
            className={`package-glow-wrap reveal-up-delay-${Math.min(idx + 1, 3)}`}
            edgeSensitivity={26}
            glowColor="186 92 80"
            backgroundColor="#091226"
            borderRadius={18}
            glowRadius={28}
            glowIntensity={0.9}
            coneSpread={24}
            animated={false}
            colors={["#2bd7ff", "#14e7ba", "#64f8d6"]}
          >
            <article className="package-card package-card-borderless">
              <div className="package-head">
                <h2>{pkg.name}</h2>
                <span className={`status-pill status-${pkg.status}`}>{pkg.status}</span>
              </div>
              <p>{pkg.description}</p>
              <ul>
                {pkg.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="package-actions">
                <Link href={`/packages/${pkg.slug}`} className="btn-secondary">Docs</Link>
                <span className="npm-pill">{pkg.npm}</span>
              </div>
            </article>
          </BorderGlow>
        ))}
      </section>
    </div>
  );
}

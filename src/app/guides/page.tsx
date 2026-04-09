import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides for integrating Crafta packages in real products with security and deployment best practices.",
};

const guideCards = [
  {
    title: "From Zero to Auth in 30 Minutes",
    points: [
      "Set up crafta and @dax-crafta/auth",
      "Enable required routes and feature flags",
      "Validate login, refresh, and reset flows",
    ],
  },
  {
    title: "Production Hardening Guide",
    points: [
      "Secrets, env isolation, and rotation policy",
      "Rate limiting and threat monitoring",
      "Audit and incident response checklist",
    ],
  },
  {
    title: "Scaling Multi-package Architecture",
    points: [
      "Separate package configuration by domain",
      "Unify logging and metrics across modules",
      "Plan migrations with backward compatibility",
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="shell page-space">
      <section className="page-intro reveal-up">
        <h1>Implementation Guides</h1>
        <p>
          Deep practical paths to use Crafta in serious backend products. These
          guides focus on shipping quality, not just quick demos.
        </p>
      </section>

      <section className="package-grid">
        {guideCards.map((card, idx) => (
          <article key={card.title} className={`package-card reveal-up-delay-${Math.min(idx + 1, 3)}`}>
            <h2>{card.title}</h2>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

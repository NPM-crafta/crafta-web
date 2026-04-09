import type { Metadata } from "next";
import { craftaAccounts } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Official Crafta ecosystem links, package hubs, and community touchpoints for developers and teams.",
};

export default function EcosystemPage() {
  return (
    <div className="shell page-space">
      <section className="page-intro reveal-up">
        <h1>Crafta Ecosystem</h1>
        <p>
          Official channels to follow releases, track package updates, and
          connect with the Crafta organization.
        </p>
      </section>

      <section className="account-grid">
        <a className="account-card reveal-up-delay-1" href={craftaAccounts.githubOrg} target="_blank" rel="noreferrer">
          <h2>GitHub Organization</h2>
          <p>Browse repositories, package sources, and release activity.</p>
          <span>{craftaAccounts.githubOrg}</span>
        </a>

        <a className="account-card reveal-up-delay-2" href={craftaAccounts.npmCore} target="_blank" rel="noreferrer">
          <h2>npm: crafta</h2>
          <p>Core package for the modular Crafta backend toolkit.</p>
          <span>{craftaAccounts.npmCore}</span>
        </a>

        <a className="account-card reveal-up-delay-3" href={craftaAccounts.npmAuth} target="_blank" rel="noreferrer">
          <h2>npm: @dax-crafta/auth</h2>
          <p>Authentication module with secure defaults and full customization.</p>
          <span>{craftaAccounts.npmAuth}</span>
        </a>

        <a className="account-card reveal-up-delay-1" href={craftaAccounts.x} target="_blank" rel="noreferrer">
          <h2>X Updates</h2>
          <p>Follow upcoming package updates, announcements, and roadmap notes.</p>
          <span>{craftaAccounts.x}</span>
        </a>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { craftaAccounts } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Crafta for package support, implementation help, and ecosystem collaboration.",
};

export default function ContactPage() {
  return (
    <div className="shell contact-page">
      <section className="contact-intro reveal-up">
        <h1>Contact Us</h1>
        <p>
          Building with Crafta packages and need architecture guidance,
          integration help, migration support, or partnership collaboration?
        </p>
      </section>

      <section className="contact-grid">
        <form className="contact-form reveal-up-delay-1">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Work Email
            <input type="email" placeholder="you@company.com" />
          </label>
          <label>
            Company
            <input type="text" placeholder="Company name" />
          </label>
          <label>
            Message
            <textarea rows={5} placeholder="Tell us what you are building" />
          </label>
          <button type="button" className="btn-primary">
            Send Message
          </button>
        </form>

        <aside className="contact-details reveal-up-delay-2">
          <h2>Basic Details</h2>
          <ul>
            <li>Platform: Crafta ecosystem</li>
            <li>Primary stack: Node.js, Crafta, MongoDB</li>
            <li>Support Window: Mon to Fri</li>
            <li>Response Target: within 24 hours</li>
          </ul>
          <div className="pill-row">
            <a href={craftaAccounts.githubOrg} target="_blank" rel="noreferrer">GitHub Org</a>
            <a href={craftaAccounts.npmCore} target="_blank" rel="noreferrer">npm crafta</a>
            <a href={craftaAccounts.npmAuth} target="_blank" rel="noreferrer">npm crafta-auth</a>
            <a href={craftaAccounts.email}>Email</a>
          </div>
          <p>
            Tip: include your current auth config and route shape so we can help
            faster with exact recommendations.
          </p>
        </aside>
      </section>
    </div>
  );
}

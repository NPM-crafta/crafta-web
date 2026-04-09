import type { Metadata } from "next";
import ScrollStack, { ScrollStackItem } from "../../components/ScrollStack";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Crafta use-case showcase for startups, SaaS teams, and enterprise backend platforms.",
};

const useCases = [
  {
    name: "SaaS Admin Platform",
    details:
      "Use crafta core for app structure and crafta-auth for secure tenant-aware user sessions.",
  },
  {
    name: "Internal Operations Suite",
    details:
      "Role permissions and audit trails make operational tools safer and easier to govern.",
  },
  {
    name: "Fast MVP Backend",
    details:
      "Ship with defaults first, then progressively enable advanced flags and providers.",
  },
  {
    name: "API Product with Team Access",
    details:
      "Support owner/admin/editor patterns with configurable RBAC and ownership guards.",
  },
];

export default function ShowcasePage() {
  return (
    <div className="shell page-space">
      <section className="page-intro reveal-up">
        <h1>Crafta Showcase</h1>
        <p>
          Real product patterns where Crafta packages reduce dev time while
          keeping architecture clean and secure.
        </p>
      </section>

      <section className="account-grid">
        {useCases.map((item, idx) => (
          <article key={item.name} className={`account-card reveal-up-delay-${Math.min(idx + 1, 3)}`}>
            <h2>{item.name}</h2>
            <p>{item.details}</p>
          </article>
        ))}
      </section>

      <section className="stack-section reveal-up" style={{ marginTop: "1rem" }}>
        <h3>Stacked Delivery Flow</h3>
        <p className="stack-intro">From setup to launch, each layer snaps into place.</p>
        <div className="stack-shell showcase-stack-shell">
          <ScrollStack itemDistance={72} itemScale={0.03} itemStackDistance={18} stackPosition="22%" scaleEndPosition="10%" baseScale={0.88}>
            <ScrollStackItem itemClassName="stack-card-theme">
              <h2>1. Install Fast</h2>
              <p>Bootstrap core packages quickly and keep your own architecture in control.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="stack-card-theme">
              <h2>2. Compose Auth</h2>
              <p>Layer secure authentication and role controls with minimal boilerplate.</p>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="stack-card-theme">
              <h2>3. Ship Confidently</h2>
              <p>Move to production with predictable config, docs, and maintainable modules.</p>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>
    </div>
  );
}

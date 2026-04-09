import Link from "next/link";
import type { CraftaPackage } from "../lib/site-data";

type Props = {
  data: CraftaPackage;
  packageList: CraftaPackage[];
  routeBase: "docs" | "packages";
};

export function PackageDocsLayout({ data, packageList, routeBase }: Props) {
  return (
    <div className="docs-wrap shell">
      <aside className="left-sidebar">
        <h2>{routeBase === "packages" ? "Package Docs" : "Packages"}</h2>
        <nav aria-label="Package list">
          {packageList.map((item) => (
            <Link
              key={item.slug}
              href={`/${routeBase}/${item.slug}`}
              className={item.slug === data.slug ? "active-nav" : ""}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="left-divider" />
        <nav aria-label="Section list">
          {data.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <article className="docs-content">
        <section id="intro">
          <div className="doc-hero">
            <div>
              <h1>{data.name}</h1>
              <p>{data.description}</p>
            </div>
            <div className="doc-meta-grid">
              <span className="status-pill status-stable">{data.status}</span>
              <span className="npm-pill">{data.npm}</span>
              <span className="npm-pill">{data.category}</span>
            </div>
          </div>
        </section>

        {data.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
            <ul className="doc-list">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {section.code ? (
              <div className="doc-code-wrap">
                {section.codeTitle ? <h3>{section.codeTitle}</h3> : null}
                <pre>
                  <code>{section.code}</code>
                </pre>
              </div>
            ) : null}
          </section>
        ))}

        <section id="next-steps">
          <div className="doc-callout">
            <h3>Next Steps</h3>
            <p>
              Continue with implementation in your app, then validate flows using
              staging-first checks before production rollout.
            </p>
          </div>
        </section>
      </article>

      <aside className="right-sidebar">
        <h3>On this page</h3>
        <nav aria-label="Package sub topics">
          {data.subtopics.map((topic) => (
            <a key={topic.id} href={`#${topic.id}`}>
              {topic.label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}

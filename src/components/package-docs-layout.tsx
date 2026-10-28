'use client';

import Link from "next/link";
import type { CraftaPackage } from "../lib/site-data";
import { FlowDiagram } from "./FlowDiagram";
import { ErrorReferenceTable } from "./ErrorReferenceTable";
import { ApiReferenceViewer } from "./ApiReferenceViewer";
import { ConfigBuilder } from "./ConfigBuilder";
import { SecurityBestPractices } from "./SecurityBestPractices";
import { QUICKSTART_STEPS } from "../lib/auth-docs-data";
import { CodeBlock } from "./CodeBlock";
import { SearchModal } from "./SearchModal";

type Props = {
  data: CraftaPackage;
  packageList: CraftaPackage[];
  routeBase: "docs" | "packages";
};

export function PackageDocsLayout({ data, packageList, routeBase }: Props) {
  const isAuthPackage = data.slug === "crafta-auth";

  return (
    <div className="docs-wrap shell">
      <aside className="left-sidebar">
        <div className="flex items-center justify-between mb-3">
          <h2 className="m-0 text-sm font-bold uppercase tracking-wider text-[#819bc5]">
            {routeBase === "packages" ? "Package Catalog" : "Ecosystem Docs"}
          </h2>
        </div>
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

        <h3 className="text-xs font-mono uppercase tracking-wider text-[#637d9c] mb-2">On This Page</h3>
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
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#13e7bb]/10 text-[#13e7bb] border border-[#13e7bb]/30">
                  {data.category}
                </span>
                <SearchModal />
              </div>
              <h1>{data.name}</h1>
              <p className="text-lg text-[#b2c8e8]">{data.description}</p>
            </div>
            <div className="doc-meta-grid">
              <span className="status-pill status-stable">{data.status}</span>
              <span className="npm-pill">npm i {data.npm}</span>
            </div>
          </div>
        </section>

        {/* Structured Sections */}
        {data.sections.map((section) => (
          <section key={section.id} id={section.id} className="pt-4">
            <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">{section.title}</h2>
            <p className="text-[#a4bbde] text-base leading-relaxed">{section.summary}</p>

            <ul className="doc-list my-3 space-y-1">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {section.code ? (
              <div className="doc-code-wrap my-4">
                {section.codeTitle ? <h3 className="text-sm font-mono text-[#7896c4]">{section.codeTitle}</h3> : null}
                <CodeBlock code={section.code} language="javascript" filename="example.js" />
              </div>
            ) : null}

            {/* Special Interactive Views for Auth Package */}
            {isAuthPackage && section.id === "quick-start" && (
              <div className="my-8 space-y-6 border-t border-[#1a2c4d] pt-6">
                <h3 className="text-xl font-bold text-[#15e6bb] font-mono">Step-by-Step Installation & Integration</h3>
                {QUICKSTART_STEPS.map((qs) => (
                  <div key={qs.step} className="bg-[#070e20] border border-[#1b2b4a] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#15e6bb] text-[#051412] font-bold text-xs flex items-center justify-center font-mono">
                        {qs.step}
                      </span>
                      <h4 className="text-base font-bold text-[#f0f6ff]">{qs.title}</h4>
                    </div>
                    <p className="text-xs text-[#9eb6dd] mb-3">{qs.description}</p>
                    <CodeBlock code={qs.code} language={qs.language} filename={qs.title} showLineNumbers />
                  </div>
                ))}
              </div>
            )}

            {isAuthPackage && section.id === "configuration" && <ConfigBuilder />}

            {isAuthPackage && section.id === "security-flows" && <FlowDiagram />}

            {isAuthPackage && section.id === "api-reference" && (
              <div className="space-y-8">
                <ApiReferenceViewer />
                <ErrorReferenceTable />
              </div>
            )}

            {isAuthPackage && section.id === "production-checklist" && <SecurityBestPractices />}
          </section>
        ))}

        <section id="next-steps" className="pt-6">
          <div className="doc-callout bg-gradient-to-r from-[#0d1e3d] to-[#071329] border border-[#233a69] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#15e6bb]">Production Readiness</h3>
            <p className="text-sm text-[#c0d3f2] leading-relaxed mt-2">
              Before shipping to production, ensure your MongoDB URL, high-entropy JWT Secret, and optional SMTP settings are configured via environment variables.
            </p>
          </div>
        </section>
      </article>

      <aside className="right-sidebar">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#637d9c]">Quick Links</h3>
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

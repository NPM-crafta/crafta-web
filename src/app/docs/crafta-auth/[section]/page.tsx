import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs-layout";
import { AUTH_DOC_SECTIONS } from "@/lib/doc-sections";
import { craftaPackages } from "@/lib/site-data";
import {
  QUICKSTART_STEPS,
  API_REFERENCE_ITEMS,
  AUTH_ERROR_CODES,
  AUTH_FLOW_DIAGRAMS,
  SECURITY_BEST_PRACTICES,
} from "@/lib/auth-docs-data";
import { CodeBlock } from "@/components/CodeBlock";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ErrorReferenceTable } from "@/components/ErrorReferenceTable";
import { ApiReferenceViewer } from "@/components/ApiReferenceViewer";
import { ConfigBuilder } from "@/components/ConfigBuilder";
import { SecurityBestPractices } from "@/components/SecurityBestPractices";

type PageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return AUTH_DOC_SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { section } = await params;
  const sec = AUTH_DOC_SECTIONS.find((s) => s.id === section);
  if (!sec) return { title: "Not Found" };
  return {
    title: `${sec.title} | @dax-crafta/auth Docs`,
    description: `${sec.title} documentation for @dax-crafta/auth — ${sec.icon}`,
  };
}

function SectionContent({ section }: { section: string }) {
  const pkg = craftaPackages.find((p) => p.slug === "crafta-auth");
  if (!pkg) return null;
  const sec = pkg.sections.find((s) => s.id === section);
  if (!sec) return null;

  switch (section) {
    case "quick-start":
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">⚡ Quick Start</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          {QUICKSTART_STEPS.map((qs) => (
            <div key={qs.step} className="doc-card">
              <div className="doc-card-header">
                <span className="doc-step-num">{qs.step}</span>
                <h3>{qs.title}</h3>
              </div>
              <p className="doc-card-desc">{qs.description}</p>
              <CodeBlock code={qs.code} language={qs.language} filename={qs.title} showLineNumbers />
            </div>
          ))}
        </div>
      );

    case "configuration":
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">⚙️ Configuration</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          <ConfigBuilder />
        </div>
      );

    case "security-flows":
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">🔐 Security Flows</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          <FlowDiagram />
        </div>
      );

    case "api-reference":
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">📚 API Reference</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          <ApiReferenceViewer />
          <h2 className="doc-section-title">Error Reference</h2>
          <ErrorReferenceTable />
        </div>
      );

    case "production-checklist":
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">✅ Production Checklist</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          <SecurityBestPractices />
        </div>
      );

    default:
      return (
        <div>
          <div className="doc-hero">
            <span className="doc-badge">{sec.title}</span>
            <h1 className="doc-title">{sec.title}</h1>
            <p className="doc-subtitle">{sec.summary}</p>
          </div>
          <ul className="doc-list">
            {sec.bullets.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {sec.code && (
            <CodeBlock code={sec.code} language="javascript" filename="example.js" />
          )}
        </div>
      );
  }
}

export default async function AuthSectionPage({ params }: PageProps) {
  const { section } = await params;
  const valid = AUTH_DOC_SECTIONS.find((s) => s.id === section);
  if (!valid) notFound();

  return (
    <DocsLayout currentSection={section}>
      <SectionContent section={section} />
    </DocsLayout>
  );
}
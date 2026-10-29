'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { craftaAccounts } from "../lib/site-data";
import { SearchModal } from "./SearchModal";
import { cn } from "@/lib/utils";
import { AUTH_DOC_SECTIONS, DOC_PACKAGES } from "../lib/doc-sections";

type DocsLayoutProps = {
  children: React.ReactNode;
  currentSection?: string;
};

export function DocsLayout({ children, currentSection }: DocsLayoutProps) {
  const pathname = usePathname() || "";

  return (
    <div className="docs-layout">
      {/* Top Bar */}
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <Link href="/" className="docs-brand">
            <span className="docs-brand-icon">◈</span>
            <span>Crafta</span>
          </Link>
          <nav className="docs-topnav" aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/docs" className="active">Docs</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/ecosystem">Ecosystem</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="docs-topbar-right">
            <SearchModal />
          </div>
        </div>
      </header>

      <div className="docs-body">
        {/* Left Sidebar */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-section">
            <h3 className="docs-sidebar-title">Package</h3>
            <nav aria-label="Package list">
              {DOC_PACKAGES.map((pkg) => (
                <Link
                  key={pkg.slug}
                  href={pkg.href}
                  className={cn(
                    "docs-package-link",
                    pathname.includes(pkg.slug) && "active"
                  )}
                >
                  <span className="docs-package-name">{pkg.name}</span>
                  <span className="docs-package-status">stable</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="docs-sidebar-divider" />

          <div className="docs-sidebar-section">
            <h3 className="docs-sidebar-title">Documentation</h3>
            <nav aria-label="Doc sections">
              {AUTH_DOC_SECTIONS.map((section) => {
                const href = `/docs/crafta-auth/${section.id}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={section.id}
                    href={href}
                    className={cn("docs-section-link", isActive && "active")}
                  >
                    <span className="docs-section-icon">{section.icon}</span>
                    <span>{section.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="docs-sidebar-divider" />

          <div className="docs-sidebar-section">
            <h3 className="docs-sidebar-title">Resources</h3>
            <nav aria-label="Resources">
              <a href={craftaAccounts.npmAuth} target="_blank" rel="noopener noreferrer">npm package</a>
              <a href={craftaAccounts.githubOrg} target="_blank" rel="noopener noreferrer">GitHub Org</a>
              <a href="https://crafta.dev/docs/crafta-auth#error-reference">Error Reference</a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="docs-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export function DocsFooter() {
  return (
    <footer className="docs-footer">
      <div className="docs-footer-inner">
        <p>© 2026 Crafta. Built with ❤️ for developers.</p>
        <div className="docs-footer-links">
          <a href={craftaAccounts.githubOrg} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={craftaAccounts.npmAuth} target="_blank" rel="noopener noreferrer">npm</a>
          <a href="mailto:npm.crafta@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
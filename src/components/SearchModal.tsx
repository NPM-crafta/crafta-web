'use client';

import { useState, useEffect } from 'react';
import { Search, X, BookOpen, AlertTriangle, Code2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { AUTH_ERROR_CODES, API_REFERENCE_ITEMS, AUTH_FLOW_DIAGRAMS } from '../lib/auth-docs-data';

interface SearchResult {
  id: string;
  type: 'Guide' | 'Error' | 'API' | 'Diagram';
  title: string;
  subtitle: string;
  url: string;
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const allItems: SearchResult[] = [
    { id: 'quickstart', type: 'Guide', title: 'Quickstart Guide', subtitle: 'Minimal setup with Express, MongoDB, and Env vars', url: '/docs/crafta-auth#quick-start' },
    { id: 'config-builder', type: 'Guide', title: 'Interactive Config Generator', subtitle: 'Visually toggle features and copy production code', url: '/docs/crafta-auth#configuration' },
    { id: 'security-guide', type: 'Guide', title: 'Security Best Practices', subtitle: 'OWASP mitigation, JWT secrets, CSRF, and 2FA', url: '/docs/crafta-auth#production-checklist' },
    ...AUTH_ERROR_CODES.map((err) => ({
      id: err.code,
      type: 'Error' as const,
      title: `${err.code} (${err.status})`,
      subtitle: err.summary,
      url: '/docs/crafta-auth#error-reference'
    })),
    ...API_REFERENCE_ITEMS.map((item) => ({
      id: item.name,
      type: 'API' as const,
      title: item.name,
      subtitle: item.summary,
      url: '/docs/crafta-auth#api-reference'
    })),
    ...AUTH_FLOW_DIAGRAMS.map((flow) => ({
      id: flow.id,
      type: 'Diagram' as const,
      title: flow.title,
      subtitle: flow.subtitle,
      url: '/docs/crafta-auth#security-flows'
    }))
  ];

  const results = query.trim()
    ? allItems.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          i.type.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 8);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Guide':
        return <BookOpen className="w-4 h-4 text-[#15e6bb]" />;
      case 'Error':
        return <AlertTriangle className="w-4 h-4 text-[#ff7888]" />;
      case 'API':
        return <Code2 className="w-4 h-4 text-[#70d8ff]" />;
      case 'Diagram':
        return <Sparkles className="w-4 h-4 text-[#e284ff]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#15e6bb]" />;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d162d] border border-[#24375b] text-xs text-[#9eb6df] hover:border-[#15e6bb] hover:text-[#ffffff] transition-all"
        title="Search Documentation (Cmd+K)"
      >
        <Search className="w-3.5 h-3.5 text-[#15e6bb]" />
        <span className="hidden sm:inline">Search docs & errors...</span>
        <kbd className="font-mono text-[10px] bg-[#142345] px-1.5 py-0.5 rounded text-[#7e9bcf] border border-[#263e69]">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
          <div
            className="w-full max-w-2xl bg-[#081023] border border-[#233861] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1c2c4d]">
              <Search className="w-5 h-5 text-[#15e6bb]" />
              <input
                type="text"
                autoFocus
                placeholder="Search API reference, AUTH_* codes, diagrams, quickstarts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#f0f6ff] placeholder-[#5f7da8] focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-[#132244] text-[#6d88b7] hover:text-[#ffffff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#152442]">
              {results.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#7896c4]">
                  No documentation results matching &quot;{query}&quot;
                </div>
              ) : (
                results.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#0f1d3c] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0e1933] border border-[#1b2b4d] group-hover:border-[#15e6bb]">
                        {getTypeIcon(res.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#eef5ff] group-hover:text-[#15e6bb]">
                            {res.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#132244] text-[#86a3d0]">
                            {res.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#7e9ac7] line-clamp-1">{res.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#4a6796] group-hover:text-[#15e6bb] transition-transform group-hover:translate-x-1" />
                  </a>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#060b18] border-t border-[#182845] flex items-center justify-between text-[11px] text-[#5e7ba8] font-mono">
              <span>Press ESC or click outside to close</span>
              <span>19 AUTH_* codes • 7 API Endpoints</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

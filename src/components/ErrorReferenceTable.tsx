'use client';

import { useState } from 'react';
import { AUTH_ERROR_CODES, ErrorCodeInfo } from '../lib/auth-docs-data';
import { Search, AlertTriangle, ChevronDown, ChevronUp, Copy, Check, ShieldAlert, Filter } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function ErrorReferenceTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCode, setExpandedCode] = useState<string | null>('AUTH_UNAUTHORIZED');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['All', 'Authentication', 'Authorization', 'Validation', 'Security & Rate Limit', 'Server & Integration'];

  const filteredErrors = AUTH_ERROR_CODES.filter((err) => {
    const matchesSearch =
      err.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.status.toString().includes(searchTerm);

    const matchesCategory = selectedCategory === 'All' || err.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusBadgeClass = (status: number) => {
    if (status >= 500) return 'bg-[#3b1219] text-[#ff7888] border-[#751d29]';
    if (status === 429) return 'bg-[#3b2b12] text-[#ffc46d] border-[#75531d]';
    if (status === 403 || status === 401) return 'bg-[#311b3b] text-[#e384ff] border-[#662a7d]';
    return 'bg-[#122b3b] text-[#70d8ff] border-[#1d5275]';
  };

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="my-8 border border-[#213459] rounded-2xl bg-gradient-to-b from-[#091126] to-[#050a17] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2c4d] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#ff7888]/10 text-[#ff7888] border border-[#ff7888]/30 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Machine-Readable Machine Contracts
          </div>
          <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">Standardized Error Code Reference</h2>
          <p className="text-sm text-[#9ab0d3] mt-1">
            All 19 machine-readable <code className="font-mono text-[#15e6bb] bg-[#0c1833] px-1.5 py-0.5 rounded">AUTH_*</code> error codes with HTTP status codes, triggers, and JSON payloads.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#5e7ba8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code or status (e.g. 401, AUTH_LOCKED)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d1730] border border-[#22365c] rounded-xl pl-10 pr-4 py-2 text-xs text-[#e1ecff] placeholder-[#5e7ba8] focus:outline-none focus:border-[#15e6bb] transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-[#627ca6] font-mono flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#15e6bb] text-[#051412] font-bold'
                  : 'bg-[#0b1429] text-[#93a9ce] border border-[#1b2b4a] hover:bg-[#132142]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Error List */}
      <div className="space-y-3">
        {filteredErrors.length === 0 ? (
          <div className="text-center py-12 bg-[#0a1124] rounded-xl border border-[#1c2c4d] text-[#7d99c5]">
            <AlertTriangle className="w-8 h-8 text-[#ffc46d] mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold">No error codes match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[#15e6bb] underline hover:text-[#52fcd7]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredErrors.map((err: ErrorCodeInfo) => {
            const isExpanded = expandedCode === err.code;

            return (
              <div
                key={err.code}
                className={`border rounded-xl transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-[#15e6bb]/60 bg-[#0c162e] shadow-lg'
                    : 'border-[#1b2c4c] bg-[#070e20] hover:border-[#2b4473]'
                }`}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => setExpandedCode(isExpanded ? null : err.code)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer gap-3 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getStatusBadgeClass(
                        err.status
                      )}`}
                    >
                      {err.status}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#15e6bb] tracking-tight">
                      {err.code}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-1">
                    <span className="text-xs text-[#a2b9de] truncate max-w-[360px] hidden md:inline">
                      {err.summary}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#121f3b] text-[#86a1cd] border border-[#1c2d4e]">
                      {err.category}
                    </span>
                    <button className="text-[#6885b3] hover:text-[#15e6bb]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-[#1a2b4b] bg-[#081023] space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-[#6e8ab8] uppercase tracking-wider mb-1">
                        Detailed Description
                      </h4>
                      <p className="text-sm text-[#d4e2f8] leading-relaxed">{err.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0b1428] p-3.5 rounded-lg border border-[#1c2d4e]">
                        <h4 className="text-xs font-mono text-[#ffc46d] font-semibold mb-1 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Trigger Condition
                        </h4>
                        <p className="text-xs text-[#b0c6e8] leading-relaxed">{err.trigger}</p>
                      </div>

                      <div className="bg-[#0b1428] p-3.5 rounded-lg border border-[#1c2d4e]">
                        <h4 className="text-xs font-mono text-[#15e6bb] font-semibold mb-1">
                          Recommended Resolution
                        </h4>
                        <p className="text-xs text-[#b0c6e8] leading-relaxed">{err.solution}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-mono text-[#6e8ab8] uppercase tracking-wider">
                          Sample API Response JSON Payload
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(err.jsonExample, err.code);
                          }}
                          className="flex items-center gap-1 text-[11px] text-[#8ea8d6] hover:text-[#15e6bb]"
                        >
                          {copiedCode === err.code ? (
                            <>
                              <Check className="w-3 h-3 text-[#15e6bb]" />
                              <span className="text-[#15e6bb]">Copied JSON</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy JSON</span>
                            </>
                          )}
                        </button>
                      </div>
                      <CodeBlock code={err.jsonExample} language="json" filename={`Response (${err.status} ${err.code})`} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

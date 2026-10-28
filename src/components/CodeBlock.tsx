'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'javascript', filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback copy
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative group rounded-xl border border-[#1e2d4a] bg-[#070d1e] overflow-hidden my-4 shadow-xl">
      {filename || language ? (
        <div className="flex items-center justify-between px-4 py-2 bg-[#0b1429] border-b border-[#1c2b47] text-xs font-mono text-[#8aa3ce]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15e6bb]/80 inline-block"></span>
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[#9eb6de] hover:text-[#15e6bb] hover:bg-[#121f3b] transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#15e6bb]" />
                <span className="text-[#15e6bb] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      ) : null}

      <div className="relative p-4 overflow-x-auto text-sm font-mono leading-relaxed text-[#e1ecff]">
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0e1830] border border-[#203152] text-[#9eb6de] hover:text-[#15e6bb] opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-[#15e6bb]" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
        <pre className="m-0 p-0 bg-transparent">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell text-right pr-4 select-none text-[#3b527a] text-xs">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

export interface TabItem {
  id: string;
  label: string;
  code: string;
  language?: string;
  filename?: string;
}

interface TabbedCodeBlockProps {
  tabs: TabItem[];
}

export function TabbedCodeBlock({ tabs }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  if (!tabs.length) return null;

  return (
    <div className="rounded-xl border border-[#1e2d4a] bg-[#070d1e] overflow-hidden my-4 shadow-xl">
      <div className="flex items-center gap-1 px-3 pt-2 bg-[#0b1429] border-b border-[#1c2b47] overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-mono rounded-t-lg transition-all border-t-2 ${
                isActive
                  ? 'bg-[#070d1e] text-[#15e6bb] border-[#15e6bb] font-semibold'
                  : 'text-[#8aa3ce] border-transparent hover:text-[#d3e3fd] hover:bg-[#0e1933]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <CodeBlock
        code={currentTab.code}
        language={currentTab.language || 'javascript'}
        filename={currentTab.filename}
      />
    </div>
  );
}

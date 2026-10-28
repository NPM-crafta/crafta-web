'use client';

import { useState } from 'react';
import { API_REFERENCE_ITEMS, ApiItemInfo } from '../lib/auth-docs-data';
import { Search, Code2, Layers, Cpu, Wrench } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function ApiReferenceViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKind, setSelectedKind] = useState<string>('All');
  const [selectedItemName, setSelectedItemName] = useState<string>('auth(config?: AuthConfig)');

  const kinds = ['All', 'function', 'class', 'interface'];

  const filteredItems = API_REFERENCE_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.signature.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKind = selectedKind === 'All' || item.kind === selectedKind;

    return matchesSearch && matchesKind;
  });

  const selectedItem: ApiItemInfo =
    API_REFERENCE_ITEMS.find((item) => item.name === selectedItemName) || API_REFERENCE_ITEMS[0];

  const getKindBadge = (kind: string) => {
    switch (kind) {
      case 'function':
        return 'bg-[#102e38] text-[#78f3ff] border-[#1c6478]';
      case 'class':
        return 'bg-[#2b1736] text-[#e78dff] border-[#692d82]';
      case 'interface':
        return 'bg-[#0e3024] text-[#86ffd8] border-[#197558]';
      default:
        return 'bg-[#16243b] text-[#9bb7e3] border-[#253f69]';
    }
  };

  return (
    <div className="my-8 border border-[#213459] rounded-2xl bg-gradient-to-b from-[#091126] to-[#050a17] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2c4d] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#70d8ff]/10 text-[#70d8ff] border border-[#70d8ff]/30 mb-2">
            <Code2 className="w-3.5 h-3.5" /> Full Type Safety (`src/index.d.ts`)
          </div>
          <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">API Reference</h2>
          <p className="text-sm text-[#9ab0d3] mt-1">
            Complete export list, services, class factories, and type definitions for <code className="font-mono text-[#15e6bb] bg-[#0c1833] px-1.5 py-0.5 rounded">@dax-crafta/auth</code>.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#5e7ba8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter API symbols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d1730] border border-[#22365c] rounded-xl pl-10 pr-4 py-2 text-xs text-[#e1ecff] placeholder-[#5e7ba8] focus:outline-none focus:border-[#15e6bb] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Panel */}
        <div className="lg:col-span-4 space-y-3 border-r border-[#1a2b4a] pr-0 lg:pr-4">
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1">
            {kinds.map((k) => (
              <button
                key={k}
                onClick={() => setSelectedKind(k)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize ${
                  selectedKind === k
                    ? 'bg-[#15e6bb] text-[#051412] font-bold'
                    : 'bg-[#091226] text-[#869fc7] border border-[#1b2b48]'
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = item.name === selectedItemName;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedItemName(item.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#122345] to-[#0e1c3a] border-[#15e6bb] text-[#ffffff] shadow-md'
                      : 'bg-[#070e20] border-[#192b4a] text-[#9db5db] hover:border-[#2b4473]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold truncate text-[#15e6bb]">
                      {item.name.split('(')[0]}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getKindBadge(item.kind)}`}>
                      {item.kind}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d99c4] line-clamp-1">{item.summary}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-8 bg-[#081023] border border-[#1b2b4a] rounded-xl p-5 space-y-4">
          {selectedItem && (
            <>
              <div className="flex items-center justify-between border-b border-[#182846] pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getKindBadge(selectedItem.kind)}`}>
                    {selectedItem.kind}
                  </span>
                  <h3 className="text-xl font-bold font-mono text-[#f0f6ff]">{selectedItem.name}</h3>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#6885b5] uppercase tracking-wider mb-1">TypeScript Signature</h4>
                <div className="bg-[#050a17] p-3 rounded-lg border border-[#1c2e50] font-mono text-xs text-[#8ee7ff] overflow-x-auto">
                  {selectedItem.signature}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#6885b5] uppercase tracking-wider mb-1">Summary & Overview</h4>
                <p className="text-sm text-[#cadbf5] leading-relaxed">{selectedItem.summary}</p>
              </div>

              {selectedItem.parameters && selectedItem.parameters.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-[#6885b5] uppercase tracking-wider mb-2">
                    Parameters / Interface Methods
                  </h4>
                  <div className="border border-[#1a2c4d] rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0c162e] text-[#86a1cd] font-mono border-b border-[#1a2c4d]">
                        <tr>
                          <th className="p-2.5">Parameter</th>
                          <th className="p-2.5">Type</th>
                          <th className="p-2.5">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#182846] text-[#c0d3f2]">
                        {selectedItem.parameters.map((p) => (
                          <tr key={p.name} className="hover:bg-[#0d1936]">
                            <td className="p-2.5 font-mono text-[#15e6bb]">
                              {p.name}
                              {p.optional && <span className="text-[10px] text-[#6380ad] ml-1">(optional)</span>}
                            </td>
                            <td className="p-2.5 font-mono text-[#83d4ff]">{p.type}</td>
                            <td className="p-2.5">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedItem.returns && (
                <div>
                  <h4 className="text-xs font-mono text-[#6885b5] uppercase tracking-wider mb-1">Return Value</h4>
                  <p className="text-xs font-mono text-[#7ef9dc] bg-[#0c1833] p-2 rounded border border-[#1b3157]">
                    {selectedItem.returns}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono text-[#6885b5] uppercase tracking-wider mb-1">Usage Code Example</h4>
                <CodeBlock code={selectedItem.example} language="typescript" filename="example.ts" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { SECURITY_BEST_PRACTICES } from '../lib/auth-docs-data';
import { ShieldCheck, Lock, KeyRound, UserCheck, Eye, Activity } from 'lucide-react';

export function SecurityBestPractices() {
  const getIconForIndex = (idx: number) => {
    const icons = [ShieldCheck, Lock, KeyRound, UserCheck, Eye, Activity];
    return icons[idx % icons.length];
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Critical':
        return 'bg-[#3b1219] text-[#ff7888] border-[#751d29]';
      case 'High Impact':
        return 'bg-[#3b2b12] text-[#ffc46d] border-[#75531d]';
      case 'Recommended':
        return 'bg-[#102e38] text-[#78f3ff] border-[#1c6478]';
      case 'Compliance':
        return 'bg-[#2b1736] text-[#e384ff] border-[#662a7d]';
      case 'Enterprise':
        return 'bg-[#0f3027] text-[#87ffd7] border-[#19755b]';
      default:
        return 'bg-[#152238] text-[#c5d8f6] border-[#29406b]';
    }
  };

  return (
    <div className="my-8 border border-[#213459] rounded-2xl bg-gradient-to-b from-[#091126] to-[#050a17] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2c4d] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15e6bb]/10 text-[#15e6bb] border border-[#15e6bb]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> OWASP Hardening Checklist
          </div>
          <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">Security Best Practices</h2>
          <p className="text-sm text-[#9ab0d3] mt-1">
            Production-grade security configuration, secret management, and compliance checklist for <code className="font-mono text-[#15e6bb] bg-[#0c1833] px-1.5 py-0.5 rounded">@dax-crafta/auth</code>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECURITY_BEST_PRACTICES.map((item, idx) => {
          const Icon = getIconForIndex(idx);
          return (
            <article
              key={item.title}
              className="bg-[#081023] border border-[#1b2b4a] rounded-xl p-5 hover:border-[#2b4473] transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#0e1933] border border-[#1b2b4d]">
                    <Icon className="w-4 h-4 text-[#15e6bb]" />
                  </div>
                  <h3 className="text-base font-bold text-[#f0f6ff] tracking-tight">{item.title}</h3>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getBadgeColor(item.badge)}`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-[#a1b7d8] leading-relaxed mb-3">{item.description}</p>
              <ul className="space-y-1.5">
                {item.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-xs text-[#c4d6f5]">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#15e6bb] flex-shrink-0"></span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
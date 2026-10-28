'use client';

import { useState } from 'react';
import { AUTH_FLOW_DIAGRAMS, AuthFlowDiagram } from '../lib/auth-docs-data';
import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck, RefreshCw, Mail, Lock, Sparkles } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function FlowDiagram() {
  const [selectedFlowId, setSelectedFlowId] = useState<string>('jwt-rotation');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeFlow: AuthFlowDiagram =
    AUTH_FLOW_DIAGRAMS.find((f) => f.id === selectedFlowId) || AUTH_FLOW_DIAGRAMS[0];

  const getIconForFlow = (id: string) => {
    switch (id) {
      case 'jwt-rotation':
        return <RefreshCw className="w-4 h-4 text-[#15e6bb]" />;
      case 'two-factor':
        return <ShieldCheck className="w-4 h-4 text-[#2b7eff]" />;
      case 'session-management':
        return <KeyRound className="w-4 h-4 text-[#ffc46d]" />;
      case 'passwordless':
        return <Mail className="w-4 h-4 text-[#e284ff]" />;
      default:
        return <Lock className="w-4 h-4 text-[#15e6bb]" />;
    }
  };

  const getActorBadge = (actor: string) => {
    switch (actor) {
      case 'Client':
        return 'bg-[#0f2e3d] text-[#70f3ff] border-[#1b5d7a]';
      case 'Auth Server':
        return 'bg-[#0f3027] text-[#87ffd7] border-[#19755b]';
      case 'Database':
        return 'bg-[#2a2110] text-[#ffe199] border-[#6b5120]';
      case 'SMTP / Provider':
        return 'bg-[#2b1736] text-[#f2a8ff] border-[#652d80]';
      default:
        return 'bg-[#152238] text-[#c5d8f6] border-[#29406b]';
    }
  };

  return (
    <div className="my-8 border border-[#213459] rounded-2xl bg-gradient-to-b from-[#091126] to-[#050a17] p-6 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2c4d] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#13e7bb]/10 text-[#13e7bb] border border-[#13e7bb]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Security Architecture Diagram
          </div>
          <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">{activeFlow.title}</h2>
          <p className="text-sm text-[#9ab0d3] mt-1">{activeFlow.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {AUTH_FLOW_DIAGRAMS.map((flow) => {
            const isSelected = flow.id === selectedFlowId;
            return (
              <button
                key={flow.id}
                onClick={() => {
                  setSelectedFlowId(flow.id);
                  setActiveStepIndex(0);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#15e6bb] text-[#051412] font-bold shadow-lg shadow-[#15e6bb]/20 scale-105'
                    : 'bg-[#0d1730] text-[#9eb5db] hover:bg-[#152549] border border-[#22365c]'
                }`}
              >
                {getIconForFlow(flow.id)}
                <span>{flow.title.split(' ')[0]} {flow.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-[#c4d6f5] mt-4 mb-6 leading-relaxed bg-[#0b142b] p-3.5 rounded-xl border border-[#1d2d4d]">
        {activeFlow.description}
      </p>

      {/* Visual Workflow Steps Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {activeFlow.steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl text-left border transition-all relative ${
                isActive
                  ? 'bg-gradient-to-br from-[#122447] to-[#0e1d3b] border-[#15e6bb] ring-1 ring-[#15e6bb]/50 shadow-md'
                  : isPassed
                  ? 'bg-[#091326] border-[#1e3458] text-[#91aacf]'
                  : 'bg-[#070c1a] border-[#16233b] text-[#5e77a1] hover:border-[#22375d]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#15e6bb]' : 'text-[#647fa9]'}`}>
                  Step 0{step.step}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[#15e6bb]" />}
              </div>
              <div className={`text-xs font-semibold line-clamp-2 ${isActive ? 'text-[#f0f6ff]' : 'text-[#8da5cb]'}`}>
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Card */}
      {activeFlow.steps[activeStepIndex] && (
        <div className="bg-[#0b142a] border border-[#20345b] rounded-xl p-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#15e6bb]/20 text-[#15e6bb] font-bold text-sm font-mono border border-[#15e6bb]/40">
                {activeFlow.steps[activeStepIndex].step}
              </span>
              <h3 className="text-lg font-bold text-[#eff5ff]">
                {activeFlow.steps[activeStepIndex].title}
              </h3>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getActorBadge(
                activeFlow.steps[activeStepIndex].actor
              )}`}
            >
              Actor: {activeFlow.steps[activeStepIndex].actor}
            </span>
          </div>

          <p className="text-sm text-[#b9ceee] leading-relaxed mb-4">
            {activeFlow.steps[activeStepIndex].description}
          </p>

          {activeFlow.steps[activeStepIndex].codeSnippet && (
            <div className="mt-2">
              <span className="text-xs font-mono text-[#7e9bc9] mb-1 block">Implementation Context:</span>
              <CodeBlock code={activeFlow.steps[activeStepIndex].codeSnippet!} language="javascript" />
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1a2c4e]">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#24375a] text-[#a1b8dd] hover:bg-[#121f3a] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              ← Previous Step
            </button>
            <span className="text-xs text-[#6e87b0] font-mono">
              Step {activeStepIndex + 1} of {activeFlow.steps.length}
            </span>
            <button
              disabled={activeStepIndex === activeFlow.steps.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(activeFlow.steps.length - 1, prev + 1))}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#15e6bb] text-[#051412] font-bold hover:bg-[#1cf3c8] disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

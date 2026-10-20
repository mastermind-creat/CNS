import React, { useState } from 'react';
import { LABS } from '../data/labs';
import { Lab } from '../types';
import { 
  Wrench, CheckSquare, Square, ChevronDown, ChevronUp, Copy, Check, 
  Clock, ShieldAlert, Award, Terminal, CheckCircle2, Search
} from 'lucide-react';

export const PracticalsSection: React.FC = () => {
  const [completedLabs, setCompletedLabs] = useState<Record<string, boolean>>({});
  const [expandedLabId, setExpandedLabId] = useState<string>('lab-1');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const toggleLabComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedLabs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  const filteredLabs = LABS.filter(lab => {
    const matchesDiff = difficultyFilter === 'all' || lab.difficulty === difficultyFilter;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const completedCount = Object.values(completedLabs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / LABS.length) * 100);

  return (
    <section id="labs" className="py-20 border-t border-slate-800 bg-[#070b14] relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Hands-On Engineering Practicals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
              Step-by-Step Laboratory Workstations
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              From physical wire crimping to VLAN tagging, router configuration, and firewall ACLs. Complete all 9 labs to earn your unit badge.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">LAB PROGRESS TRACKER</span>
              <span className="text-orange-400 font-bold">{completedCount} / {LABS.length} Done ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {progressPercent === 100 && (
              <span className="text-[11px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All 9 Unit Practicals Certified!
              </span>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 max-w-full">
            {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer capitalize ${
                  difficultyFilter === diff
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'all' ? 'All Difficulties' : diff}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search labs by keyword..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Labs List Accordion */}
        <div className="space-y-4">
          {filteredLabs.map((lab) => {
            const isCompleted = !!completedLabs[lab.id];
            const isExpanded = expandedLabId === lab.id;

            return (
              <div
                key={lab.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-orange-500/50 bg-slate-900/90 shadow-xl shadow-orange-500/5'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                {/* Lab Card Header Bar */}
                <div
                  onClick={() => setExpandedLabId(isExpanded ? '' : lab.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox button */}
                    <button
                      onClick={(e) => toggleLabComplete(lab.id, e)}
                      className="mt-0.5 text-slate-400 hover:text-orange-400 transition cursor-pointer shrink-0"
                      title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                    >
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm sm:text-base font-bold text-white">
                          {lab.title}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          lab.difficulty === 'Beginner'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : lab.difficulty === 'Intermediate'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                        }`}>
                          {lab.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{lab.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {lab.estimatedMinutes} mins
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                    {/* Objectives & Equipment Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <span className="text-xs font-mono font-bold text-orange-400 block mb-2">
                          LEARNING OBJECTIVES
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {lab.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-orange-400 shrink-0">•</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <span className="text-xs font-mono font-bold text-orange-400 block mb-2">
                          REQUIRED HARDWARE & EQUIPMENT
                        </span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {lab.equipment.map((eq, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-slate-500 shrink-0">▸</span>
                              <span>{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-Step Procedure */}
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        PROCEDURAL STEPS & CLI COMMANDS
                      </span>

                      <div className="space-y-4">
                        {lab.steps.map((step) => (
                          <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                              <span className="text-xs font-mono font-bold text-orange-400">
                                STEP {step.stepNumber}: {step.title.toUpperCase()}
                              </span>
                              {step.commandLang && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                  {step.commandLang.toUpperCase()}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">{step.instruction}</p>

                            {/* CLI Code Block if present */}
                            {step.commands && step.commands.length > 0 && (
                              <div className="rounded-lg bg-black border border-slate-800 p-3 relative group">
                                <button
                                  onClick={() => handleCopy(step.commands!.join('\n'), `${lab.id}-${step.stepNumber}`)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer text-xs flex items-center gap-1 font-mono"
                                  title="Copy Commands"
                                >
                                  {copiedSnippet === `${lab.id}-${step.stepNumber}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-emerald-400 text-[10px]">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span className="text-[10px]">Copy</span>
                                    </>
                                  )}
                                </button>
                                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto pr-16 leading-relaxed">
                                  {step.commands.map((cmd, cIdx) => (
                                    <div key={cIdx}>{cmd}</div>
                                  ))}
                                </pre>
                              </div>
                            )}

                            {/* Expected Output */}
                            {step.expectedOutput && (
                              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
                                <span className="text-[10px] font-bold text-slate-300 block mb-1">EXPECTED OUTPUT:</span>
                                <pre className="text-[11px] text-slate-400 whitespace-pre-wrap">{step.expectedOutput}</pre>
                              </div>
                            )}

                            {/* Tip if present */}
                            {step.tip && (
                              <div className="text-[11px] text-amber-300/90 bg-amber-950/20 border border-amber-900/40 p-2.5 rounded-lg flex items-center gap-2">
                                <span className="font-bold shrink-0">Tip:</span>
                                <span>{step.tip}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verification Checklist */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
                      <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">
                        PASS VERIFICATION CRITERIA
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                        {lab.verificationCriteria.map((crit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer completion toggle button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={(e) => toggleLabComplete(lab.id, e)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium font-mono transition cursor-pointer flex items-center gap-2 ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500/30'
                        }`}
                      >
                        {isCompleted ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                        <span>{isCompleted ? 'Lab Marked Complete' : 'Mark Lab as Complete'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

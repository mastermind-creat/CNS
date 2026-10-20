import React, { useState } from 'react';
import { UNIT_OVERVIEW, WeekSchedule } from '../data/unitOverview';
import { 
  GraduationCap, CheckCircle2, Wrench, Calendar, ChevronDown, ChevronUp, 
  Terminal, Shield, Award, BookOpen 
} from 'lucide-react';

export const UnitOverview: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  return (
    <section id="overview" className="py-20 border-t border-slate-800 bg-[#080d18] relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Unit Curriculum & Syllabus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            {UNIT_OVERVIEW.unitTitle} ({UNIT_OVERVIEW.unitCode})
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {UNIT_OVERVIEW.summary}
          </p>
        </div>

        {/* 2-Column: Learning Outcomes & Tools Needed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left: Learning Outcomes & Prerequisites */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                CORE LEARNING OUTCOMES
              </span>
              <div className="space-y-2.5">
                {UNIT_OVERVIEW.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-mono font-bold text-slate-400 uppercase block">
                PREREQUISITES & ENTRY REQUIREMENTS:
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                {UNIT_OVERVIEW.prerequisites.map((pre, idx) => (
                  <li key={idx}>{pre}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Required Hardware & Software Deck */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                  REQUIRED TOOLS & LAB GEAR
                </span>
                <Wrench className="w-4 h-4 text-orange-400" />
              </div>

              {UNIT_OVERVIEW.requiredTools.map((cat) => (
                <div key={cat.category} className="space-y-3">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase block">
                    {cat.category}
                  </span>
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">{item.name}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            item.required
                              ? 'bg-orange-500/10 text-orange-300 border border-orange-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {item.required ? 'Mandatory' : 'Recommended'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Roadmap Timeline */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                10-Week Course Progression
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-1">Weekly Roadmap Timeline</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              10 Weeks · 48 Contact Hours · Capstone Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIT_OVERVIEW.weeklyRoadmap.map((item) => {
              const isExpanded = expandedWeek === item.week;
              return (
                <div
                  key={item.week}
                  onClick={() => setExpandedWeek(isExpanded ? null : item.week)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isExpanded
                      ? 'border-cyan-500/50 bg-slate-900/90 shadow-lg'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        Week {item.week < 10 ? `0${item.week}` : item.week}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.topicRef}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.focus}</p>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Milestone: {item.milestone}</span>
                      </div>
                      {item.labRef && (
                        <div className="flex items-center gap-2 text-orange-400 font-mono">
                          <Wrench className="w-3.5 h-3.5 shrink-0" />
                          <span>Associated Lab: {item.labRef}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

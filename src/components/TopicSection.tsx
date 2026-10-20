import React, { useState } from 'react';
import { TopicData } from '../types';
import { OsiTcpDiagram } from './diagrams/OsiTcpDiagram';
import { CablePinoutVisualizer } from './diagrams/CablePinoutVisualizer';
import { SubnetVisualizerDiagram } from './diagrams/SubnetVisualizerDiagram';
import { VlanSwitchDiagram } from './diagrams/VlanSwitchDiagram';
import { RoutingPacketSimulator } from './diagrams/RoutingPacketSimulator';
import { WirelessSpectrumDiagram } from './diagrams/WirelessSpectrumDiagram';
import { DnsDhcpJourneyDiagram } from './diagrams/DnsDhcpJourneyDiagram';
import { TroubleshootingFlowDiagram } from './diagrams/TroubleshootingFlowDiagram';
import { Lightbulb, AlertTriangle, BookOpen, RotateCw, ArrowUpRight, HelpCircle } from 'lucide-react';

interface TopicSectionProps {
  topic: TopicData;
  onJumpToLab?: (labId: string) => void;
  onJumpToQuiz?: (topicId: string) => void;
}

export const TopicSection: React.FC<TopicSectionProps> = ({ topic, onJumpToLab, onJumpToQuiz }) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderDiagram = () => {
    switch (topic.id) {
      case 'fundamentals':
        return <OsiTcpDiagram />;
      case 'cabling':
        return <CablePinoutVisualizer />;
      case 'subnetting':
        return <SubnetVisualizerDiagram />;
      case 'switching':
        return <VlanSwitchDiagram />;
      case 'routing':
        return <RoutingPacketSimulator />;
      case 'wireless':
        return <WirelessSpectrumDiagram />;
      case 'services':
        return <DnsDhcpJourneyDiagram />;
      case 'security':
        return <TroubleshootingFlowDiagram />;
      default:
        return null;
    }
  };

  return (
    <section
      id={`topic-${topic.id}`}
      className="py-20 border-t border-slate-800/80 relative scroll-mt-24 overflow-hidden w-full max-w-full"
    >
      {/* Background ambient neon glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[300px] blur-[140px] pointer-events-none opacity-10 rounded-full"
        style={{ backgroundColor: topic.colorHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-2.5 py-1 rounded text-xs font-mono font-bold"
              style={{ backgroundColor: `${topic.colorHex}20`, color: topic.colorHex, border: `1px solid ${topic.colorHex}40` }}
            >
              TOPIC {topic.number}
            </span>
            <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
              {topic.colorName} Module
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            {topic.title}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {topic.overview}
          </p>

          {/* Simple Everyday Analogy Box */}
          <div
            className="mt-6 p-4 sm:p-5 rounded-2xl border text-slate-200 backdrop-blur"
            style={{
              backgroundColor: `${topic.colorHex}08`,
              borderColor: `${topic.colorHex}30`
            }}
          >
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold" style={{ color: topic.colorHex }}>
              <BookOpen className="w-4 h-4" />
              <span>{topic.analogyTitle.toUpperCase()}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {topic.analogyStory}
            </p>
          </div>
        </div>

        {/* Embedded Interactive Diagram */}
        <div className="mb-14">
          {renderDiagram()}
        </div>

        {/* Key Terms Flip-Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase" style={{ color: topic.colorHex }}>
                Conceptual Mastery
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">Key Terms & Mental Models</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Click cards to flip for analogies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topic.keyTerms.map((term, idx) => {
              const isFlipped = !!flippedCards[idx];
              return (
                <div
                  key={term.term}
                  onClick={() => toggleCard(idx)}
                  className="h-56 cursor-pointer perspective-1000 select-none group"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 preserve-3d rounded-xl border ${
                      isFlipped ? 'rotate-y-180' : ''
                    } ${
                      isFlipped
                        ? 'border-slate-700 bg-slate-900'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 p-4 backface-hidden flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold"
                            style={{ backgroundColor: `${topic.colorHex}20`, color: topic.colorHex }}
                          >
                            0{idx + 1}
                          </span>
                          <RotateCw className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">{term.term}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                          {term.definition}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>Click to see analogy</span>
                        <span style={{ color: topic.colorHex }}>Flip ↷</span>
                      </div>
                    </div>

                    {/* Back of Card (Analogy) */}
                    <div className="absolute inset-0 p-4 backface-hidden rotate-y-180 flex flex-col justify-between bg-slate-950/95 rounded-xl border border-slate-700">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase block mb-1" style={{ color: topic.colorHex }}>
                          Mental Model Analogy:
                        </span>
                        <h5 className="text-xs font-bold text-slate-200 mb-2">{term.term}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{term.analogy}"
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>Click to return</span>
                        <span style={{ color: topic.colorHex }}>Back ↶</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Tip & Common Mistake Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Tip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Pro Engineering Tip
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {topic.quickTip}
              </p>
            </div>
          </div>

          {/* Common Mistake */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Common Student Mistake
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {topic.commonMistake}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

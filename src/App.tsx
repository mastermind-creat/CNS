/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StickyScrollTracker } from './components/StickyScrollTracker';
import { Hero } from './components/Hero';
import { UnitOverview } from './components/UnitOverview';
import { TopicSection } from './components/TopicSection';
import { InteractiveTools } from './components/InteractiveTools';
import { PracticalsSection } from './components/PracticalsSection';
import { QuizZone } from './components/QuizZone';
import { GlossaryCheatSheetModal } from './components/GlossaryCheatSheetModal';
import { Footer } from './components/Footer';
import { TOPICS } from './data/topics';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'cheat' | 'glossary'>('cheat');

  const openCheatSheet = () => {
    setModalTab('cheat');
    setModalOpen(true);
  };

  const openGlossary = () => {
    setModalTab('glossary');
    setModalOpen(true);
  };

  const handleJumpToLab = (labId: string) => {
    const el = document.getElementById('labs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJumpToQuiz = (topicId: string) => {
    const el = document.getElementById('quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Navbar onOpenCheatSheet={openCheatSheet} onOpenGlossary={openGlossary} />

      {/* Sticky Progress & Active Topic Indicator */}
      <StickyScrollTracker />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Unit Overview & Syllabus */}
        <UnitOverview />

        {/* 3. Topic Modules (8 Color-Coded Sections) */}
        <div id="topics" className="relative scroll-mt-24">
          <div className="pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
              Curriculum Core
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              The 8 Color-Coded Technical Modules
            </h2>
            <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto">
              Every topic features clear conceptual analogies, interactive diagrams, flashcard mental models, and real-world troubleshooting tips.
            </p>
          </div>

          {TOPICS.map((topic) => (
            <TopicSection
              key={topic.id}
              topic={topic}
              onJumpToLab={handleJumpToLab}
              onJumpToQuiz={handleJumpToQuiz}
            />
          ))}
        </div>

        {/* 4. Interactive Tools (Subnet Calculator, Binary Converter, OSI Deck) */}
        <InteractiveTools />

        {/* 5. Practicals & Step-by-Step Labs */}
        <PracticalsSection />

        {/* 6. Certification Quiz Zone (42 Questions) */}
        <QuizZone />
      </main>

      {/* Modal / Reference Drawer */}
      <GlossaryCheatSheetModal
        isOpen={modalOpen}
        initialTab={modalTab}
        onClose={() => setModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenCheatSheet={openCheatSheet} onOpenGlossary={openGlossary} />
    </div>
  );
}

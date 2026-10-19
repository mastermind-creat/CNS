import React, { useState } from 'react';
import { Menu, X, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCheatSheet: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheatSheet, onOpenGlossary }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          className="text-lg font-bold font-display tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition"
        >
          NetSetup <span className="text-cyan-400">Academy</span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-300">
          <a href="#overview" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Curriculum
          </a>
          <a href="#topics" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Modules
          </a>
          <a href="#tools" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Workbench
          </a>
          <a href="#labs" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Practicals
          </a>
          <a href="#quiz" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Quiz Zone
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCheatSheet}
            className="px-4 py-2 text-xs font-mono font-bold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-400/20 cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cheat Sheet</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenCheatSheet}
            className="px-2.5 py-1 text-xs font-mono font-bold text-black bg-cyan-400 rounded hover:bg-cyan-300 transition cursor-pointer"
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-800 bg-[#070b14] space-y-2 text-xs font-mono">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-cyan-400"
          >
            Curriculum
          </a>
          <a
            href="#topics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-cyan-400"
          >
            Modules
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-cyan-400"
          >
            Workbench
          </a>
          <a
            href="#labs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-cyan-400"
          >
            Practicals
          </a>
          <a
            href="#quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-cyan-400"
          >
            Quiz Zone
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGlossary();
            }}
            className="w-full text-left py-2 text-slate-400 hover:text-white"
          >
            Open Glossary
          </button>
        </div>
      )}
    </header>
  );
};

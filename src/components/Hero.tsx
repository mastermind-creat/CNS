import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Terminal, Cpu, Network, Shield, ChevronRight, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  // Typing effect phrases
  const phrases = [
    'Master Network Setup from Cables to Clouds',
    'Crimp Cat6 Wires & Verify T568B Pinouts',
    'Calculate Subnet Masks & VLSM in Seconds',
    'Configure Cisco VLANs, 802.1Q Trunks & Routers',
    'Isolate Multi-Layer Faults with CLI Diagnostics'
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = phrases[phraseIdx];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFull.substring(0, displayText.length + 1));
        if (displayText.length === currentFull.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFull.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Floating Animated Network Nodes & Glowing Pulses in SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-40" viewBox="0 0 1440 900" fill="none">
          {/* Circuit / Network Lines */}
          <path
            d="M 100 200 L 400 200 L 600 450 L 900 450 L 1200 250 L 1400 250"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 50 650 L 350 650 L 550 480 L 850 480 L 1100 700 L 1400 700"
            stroke="url(#lineGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 720 100 L 720 800"
            stroke="url(#lineGrad3)"
            strokeWidth="1"
            strokeDasharray="8 8"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF007F" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF66" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FACC15" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Glowing Animated Packet Circle Pulses */}
          <circle cx="400" cy="200" r="4" fill="#00E5FF">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="450" r="5" fill="#A855F7">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="450" r="4" fill="#FF007F">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="480" r="4" fill="#00FF66">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Floating Hardware Emblems (Subtle Parallax / Decorative) */}
      <div className="hidden lg:block absolute left-12 top-1/3 -translate-y-1/2 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur shadow-2xl text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="font-bold">Catalyst 2960-24TT</span>
        </div>
        <span className="text-[11px] text-slate-400">24x 10/100 + 2x 1000BASE-T</span>
      </div>

      <div className="hidden lg:block absolute right-12 top-1/3 -translate-y-1/2 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur shadow-2xl text-xs font-mono text-pink-400">
        <div className="flex items-center gap-2 mb-1">
          <Network className="w-4 h-4 text-pink-400" />
          <span className="font-bold">Cisco 1941 ISR</span>
        </div>
        <span className="text-[11px] text-slate-400">Inter-VLAN 802.1Q ROAS</span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Kicker tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Computer Network Setup Unit (NET-201)</span>
        </div>

        {/* Brand Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-white tracking-tight leading-tight">
          NetSetup <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Academy</span>
        </h1>

        {/* Dynamic Typing Subtitle */}
        <div className="mt-5 min-h-[44px] flex items-center justify-center">
          <p className="text-lg sm:text-2xl font-mono text-slate-300">
            {displayText}
            <span className="inline-block w-2.5 h-6 bg-cyan-400 ml-1 translate-y-0.5 animate-pulse" />
          </p>
        </div>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
          The all-in-one interactive guide for aspiring network engineers. Master the physical wire, subnetting arithmetic, Cisco IOS commands, core services, and forensic diagnostics with hands-on simulations.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#topics"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-mono text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start Learning Topics</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#labs"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore 9 Labs</span>
          </a>

          <a
            href="#quiz"
            className="px-6 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/40 font-semibold font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Take Certification Quiz</span>
          </a>
        </div>

        {/* Unit Stats KPI Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 block tabular-nums">08</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Core Modules</span>
          </div>

          <div className="p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-400 block tabular-nums">09</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Hands-on Labs</span>
          </div>

          <div className="p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 block tabular-nums">42</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Quiz Questions</span>
          </div>

          <div className="p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-pink-400 block tabular-nums">100%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Practical CLI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

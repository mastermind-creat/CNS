import React, { useState, useEffect } from 'react';
import { TOPICS } from '../data/topics';
import { TopicData } from '../types';

export const StickyScrollTracker: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTopicId, setActiveTopicId] = useState<string>('fundamentals');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Check which topic section is currently in view
      const scrollPos = window.scrollY + 200;
      for (let i = TOPICS.length - 1; i >= 0; i--) {
        const element = document.getElementById(`topic-${TOPICS[i].id}`);
        if (element && element.offsetTop <= scrollPos) {
          setActiveTopicId(TOPICS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTopic = TOPICS.find(t => t.id === activeTopicId) || TOPICS[0];

  return (
    <div className="sticky top-16 z-40 bg-[#070b14]/95 backdrop-blur border-b border-slate-800/80 shadow-md">
      {/* 2px Animated Packet Progress Bar */}
      <div className="w-full h-1 bg-slate-900 relative overflow-hidden">
        <div
          className="h-full transition-all duration-150 ease-out relative"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: activeTopic.colorHex,
            boxShadow: `0 0 10px ${activeTopic.colorHex}`
          }}
        >
          {/* Animated Packet Blip */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full -mr-1"
            style={{
              backgroundColor: activeTopic.colorHex,
              boxShadow: `0 0 8px 2px ${activeTopic.colorHex}`
            }}
          />
        </div>
      </div>

      {/* Color Legend & Topic Breadcrumb Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 text-xs font-mono">
        {/* Active Section Indicator */}
        <div className="flex items-center gap-2 truncate">
          <span className="text-slate-400 hidden sm:inline">Active Module:</span>
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: activeTopic.colorHex, boxShadow: `0 0 6px ${activeTopic.colorHex}` }}
            />
            <span className="font-bold text-white truncate">
              {activeTopic.number}. {activeTopic.title}
            </span>
          </div>
        </div>

        {/* Color Legend Palette Badges */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 mr-1">Legend:</span>
          {TOPICS.map((t) => {
            const isActive = t.id === activeTopicId;
            return (
              <a
                key={t.id}
                href={`#topic-${t.id}`}
                title={`${t.number}. ${t.title} (${t.colorName})`}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
                  isActive ? 'bg-slate-800 ring-1 ring-slate-700' : 'hover:bg-slate-900'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.colorHex }}
                />
                <span className={`text-[10px] ${isActive ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {t.number}
                </span>
              </a>
            );
          })}
        </div>

        {/* Scroll percentage */}
        <div className="text-slate-400 shrink-0 tabular-nums">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
};

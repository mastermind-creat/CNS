import React from 'react';
import { BookOpen, ExternalLink, Github, Terminal, Shield, Award } from 'lucide-react';

interface FooterProps {
  onOpenCheatSheet: () => void;
  onOpenGlossary: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheatSheet, onOpenGlossary }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#05080f] py-12 text-xs font-mono text-slate-400 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Unit Info */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-bold font-display text-white block">
              NetSetup <span className="text-cyan-400">Academy</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Computer Network Setup & Systems Administration (NET-201). Built for vocational technicians, university undergraduates, and Cisco CCNA / CompTIA Network+ aspirants.
            </p>
            <div className="text-[11px] text-slate-500">
              Instructor: <strong>Prof. Marcus Chen, CCIE #49210</strong>
              <div className="text-slate-400">Department of Computer Systems & Networks</div>
            </div>
          </div>

          {/* Col 2: Course Modules */}
          <div>
            <span className="text-xs font-bold text-slate-200 block mb-3 uppercase tracking-wider">
              Topic Modules
            </span>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#topic-fundamentals" className="hover:text-cyan-400 transition">01. Network Fundamentals (Blue)</a></li>
              <li><a href="#topic-cabling" className="hover:text-orange-400 transition">02. Cabling & Hardware (Orange)</a></li>
              <li><a href="#topic-subnetting" className="hover:text-emerald-400 transition">03. IP Addressing & Subnetting (Green)</a></li>
              <li><a href="#topic-switching" className="hover:text-purple-400 transition">04. Switching & VLANs (Purple)</a></li>
              <li><a href="#topic-routing" className="hover:text-pink-400 transition">05. Routing & Gateways (Pink)</a></li>
              <li><a href="#topic-wireless" className="hover:text-teal-400 transition">06. Wireless WLAN (Cyan)</a></li>
              <li><a href="#topic-services" className="hover:text-yellow-400 transition">07. DHCP / DNS / NAT (Yellow)</a></li>
              <li><a href="#topic-security" className="hover:text-rose-400 transition">08. Security & Diagnostics (Red)</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Utilities */}
          <div>
            <span className="text-xs font-bold text-slate-200 block mb-3 uppercase tracking-wider">
              Interactive Resources
            </span>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#tools" className="hover:text-cyan-400 transition">Subnet Calculator</a></li>
              <li><a href="#tools" className="hover:text-cyan-400 transition">8-Bit Octet Binary Visualizer</a></li>
              <li><a href="#tools" className="hover:text-cyan-400 transition">OSI Layer Mnemonic Deck</a></li>
              <li><button onClick={onOpenCheatSheet} className="hover:text-cyan-400 transition cursor-pointer text-left">Port & Subnet Cheat Sheet</button></li>
              <li><button onClick={onOpenGlossary} className="hover:text-cyan-400 transition cursor-pointer text-left">Searchable 40+ Term Glossary</button></li>
              <li><a href="#labs" className="hover:text-cyan-400 transition">9 Step-by-Step CLI Practicals</a></li>
              <li><a href="#quiz" className="hover:text-cyan-400 transition">42-Question Certification Quiz</a></li>
            </ul>
          </div>

          {/* Col 4: External Tools & Standards */}
          <div>
            <span className="text-xs font-bold text-slate-200 block mb-3 uppercase tracking-wider">
              Recommended Software
            </span>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5">
                <span>Cisco Packet Tracer v8.2+</span>
                <span className="text-[10px] text-slate-500">(NetAcad)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Wireshark Network Analyzer</span>
                <span className="text-[10px] text-slate-500">(GPL)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>PuTTY Serial Console</span>
                <span className="text-[10px] text-slate-500">(SSH/Telnet)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>EIA/TIA-568-C Standards</span>
                <span className="text-[10px] text-slate-500">(ANSI)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>RFC 1918 Private Addressing</span>
                <span className="text-[10px] text-slate-500">(IETF)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NetSetup Academy · Educational Computer Networking Laboratory Unit.
          </div>
          <div className="flex items-center gap-4">
            <span>Accessible WCAG AA Compliant</span>
            <span>·</span>
            <span>Zero LocalStorage Dependency</span>
            <span>·</span>
            <span>Single-Page Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

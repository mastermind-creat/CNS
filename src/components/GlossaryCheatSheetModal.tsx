import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/glossary';
import { COMMON_PORTS, SUBNET_TABLE, CLI_COMMANDS } from '../data/cheatSheet';
import { TopicId } from '../types';
import { 
  X, Search, BookOpen, Hash, Terminal, Layers, Copy, Check, Filter 
} from 'lucide-react';

interface GlossaryCheatSheetModalProps {
  isOpen: boolean;
  initialTab?: 'cheat' | 'glossary';
  onClose: () => void;
}

export const GlossaryCheatSheetModal: React.FC<GlossaryCheatSheetModalProps> = ({
  isOpen,
  initialTab = 'cheat',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'cheat' | 'glossary'>(initialTab);
  const [cheatSubTab, setCheatSubTab] = useState<'ports' | 'subnets' | 'cli'>('ports');
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<'all' | TopicId>('all');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredGlossary = GLOSSARY_ITEMS.filter(item => {
    const matchesCat = glossaryCategory === 'all' || item.category === glossaryCategory;
    const q = glossarySearch.toLowerCase();
    const matchesQuery = item.term.toLowerCase().includes(q) ||
                         (item.acronymFor && item.acronymFor.toLowerCase().includes(q)) ||
                         item.definition.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl h-[85vh] bg-[#090e1a] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-6">
            <h3 className="text-lg font-bold font-display text-white whitespace-nowrap">
              Engineering Reference Desk
            </h3>

            {/* Segmented Top Toggle */}
            <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('cheat')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'cheat'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Cheat Sheet</span>
              </button>
              <button
                onClick={() => setActiveTab('glossary')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'glossary'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Glossary ({GLOSSARY_ITEMS.length})</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* CHEAT SHEET TAB */}
          {activeTab === 'cheat' && (
            <div className="space-y-6">
              {/* Sub tabs: Ports / Subnets / CLI */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setCheatSubTab('ports')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition cursor-pointer ${
                    cheatSubTab === 'ports'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Common Ports (TCP/UDP)
                </button>
                <button
                  onClick={() => setCheatSubTab('subnets')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition cursor-pointer ${
                    cheatSubTab === 'subnets'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Subnet Mask Table (/24 to /32)
                </button>
                <button
                  onClick={() => setCheatSubTab('cli')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition cursor-pointer ${
                    cheatSubTab === 'cli'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Essential CLI Commands
                </button>
              </div>

              {/* Ports Subtab */}
              {cheatSubTab === 'ports' && (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Port</th>
                        <th className="p-3">Transport</th>
                        <th className="p-3">Protocol / Service</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Secure Alternative</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {COMMON_PORTS.map((p) => (
                        <tr key={p.port} className="hover:bg-slate-900/50">
                          <td className="p-3 text-cyan-400 font-bold">{p.port}</td>
                          <td className="p-3 text-slate-400">{p.protocol}</td>
                          <td className="p-3 font-semibold text-white">{p.service}</td>
                          <td className="p-3 text-slate-300">{p.description}</td>
                          <td className="p-3 text-emerald-400">{p.secureAlternative || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subnets Subtab */}
              {cheatSubTab === 'subnets' && (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">CIDR</th>
                        <th className="p-3">Subnet Mask</th>
                        <th className="p-3">Wildcard Mask</th>
                        <th className="p-3">Total Addresses</th>
                        <th className="p-3">Usable Hosts</th>
                        <th className="p-3">Typical Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {SUBNET_TABLE.map((s) => (
                        <tr key={s.cidr} className="hover:bg-slate-900/50">
                          <td className="p-3 text-emerald-400 font-bold">{s.cidr}</td>
                          <td className="p-3 text-white font-semibold">{s.mask}</td>
                          <td className="p-3 text-cyan-400">{s.wildcard}</td>
                          <td className="p-3 text-slate-400">{s.totalHosts}</td>
                          <td className="p-3 text-emerald-400 font-bold">{s.usableHosts}</td>
                          <td className="p-3 text-slate-300">{s.typicalUsage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CLI Commands Subtab */}
              {cheatSubTab === 'cli' && (
                <div className="space-y-3">
                  {CLI_COMMANDS.map((cmd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                            {cmd.platform}
                          </span>
                          <span className="text-xs text-slate-300">{cmd.purpose}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(cmd.example, `cmd-${idx}`)}
                          className="text-xs font-mono text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCmd === `cmd-${idx}` ? (
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
                      </div>
                      <div className="p-2.5 rounded bg-black border border-slate-800 font-mono text-xs text-emerald-400">
                        <code>{cmd.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GLOSSARY TAB */}
          {activeTab === 'glossary' && (
            <div className="space-y-6">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search 40+ terms, acronyms, or concepts..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <select
                  value={glossaryCategory}
                  onChange={(e) => setGlossaryCategory(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Modules</option>
                  <option value="fundamentals">Fundamentals</option>
                  <option value="cabling">Cabling & Hardware</option>
                  <option value="subnetting">IP & Subnetting</option>
                  <option value="switching">Switching & VLANs</option>
                  <option value="routing">Routing</option>
                  <option value="wireless">Wireless</option>
                  <option value="services">DHCP / DNS / NAT</option>
                  <option value="security">Security & Troubleshooting</option>
                </select>
              </div>

              {/* Glossary Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredGlossary.map((item) => (
                  <div
                    key={item.term}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-white font-mono">{item.term}</h4>
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 capitalize">
                          {item.category}
                        </span>
                      </div>
                      {item.acronymFor && (
                        <span className="text-xs text-cyan-400 font-mono block mb-2">
                          {item.acronymFor}
                        </span>
                      )}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>

                    {item.analogy && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                        Analogy: "{item.analogy}"
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredGlossary.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  No terminology matched "{glossarySearch}". Try another keyword.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

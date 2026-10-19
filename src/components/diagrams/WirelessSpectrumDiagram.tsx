import React, { useState } from 'react';
import { Wifi, Radio, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

export const WirelessSpectrumDiagram: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<number>(6);
  const [viewMode, setViewMode] = useState<'spectrum' | 'bands' | 'security'>('spectrum');

  const isNonOverlapping = selectedChannel === 1 || selectedChannel === 6 || selectedChannel === 11;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Wifi className="w-4 h-4" />
            <span>Interactive RF Analyzer</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">2.4 GHz Channel Interference & Wi-Fi Bands</h4>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('spectrum')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              viewMode === 'spectrum'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2.4 GHz Channels
          </button>
          <button
            onClick={() => setViewMode('bands')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              viewMode === 'bands'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Frequency Bands
          </button>
          <button
            onClick={() => setViewMode('security')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              viewMode === 'security'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WPA2 vs WPA3
          </button>
        </div>
      </div>

      {viewMode === 'spectrum' && (
        <div className="mt-6 space-y-6">
          {/* Channel Selector Bar */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>Select an Access Point Channel:</span>
              <span className="font-mono text-cyan-400">
                Channel {selectedChannel} ({2412 + (selectedChannel - 1) * 5} MHz)
              </span>
            </div>

            <div className="grid grid-cols-11 gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ch) => {
                const isNonOverlap = ch === 1 || ch === 6 || ch === 11;
                const isSelected = selectedChannel === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`py-2 px-1 rounded border text-center transition cursor-pointer ${
                      isSelected
                        ? isNonOverlap
                          ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-md ring-1 ring-cyan-400 font-bold'
                          : 'border-amber-500 bg-amber-950/40 text-amber-300 shadow-md ring-1 ring-amber-500 font-bold'
                        : isNonOverlap
                        ? 'border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-500/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-mono block">Ch {ch}</span>
                    <span className="text-[9px] block opacity-70">
                      {isNonOverlap ? 'Clean' : 'Overlap'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SVG Spectral Overlap Visualization */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>RF FREQUENCY DENSITY CURVES (2400 MHz → 2483.5 MHz)</span>
              <span>20 MHz CHANNEL WIDTH</span>
            </div>

            <svg viewBox="0 0 600 140" className="w-full h-36">
              {/* Spectral baseline */}
              <line x1="20" y1="120" x2="580" y2="120" stroke="#334155" strokeWidth="2" />

              {/* Channel 1 Curve */}
              <path
                d="M 30 120 Q 80 20 130 120"
                fill={selectedChannel === 1 ? 'rgba(6, 182, 212, 0.35)' : 'rgba(6, 182, 212, 0.12)'}
                stroke={selectedChannel === 1 ? '#06b6d4' : '#0891b2'}
                strokeWidth={selectedChannel === 1 ? '3' : '1.5'}
              />
              <text x="80" y="115" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">CH 1</text>

              {/* Channel 6 Curve */}
              <path
                d="M 230 120 Q 280 20 330 120"
                fill={selectedChannel === 6 ? 'rgba(6, 182, 212, 0.35)' : 'rgba(6, 182, 212, 0.12)'}
                stroke={selectedChannel === 6 ? '#06b6d4' : '#0891b2'}
                strokeWidth={selectedChannel === 6 ? '3' : '1.5'}
              />
              <text x="280" y="115" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">CH 6</text>

              {/* Channel 11 Curve */}
              <path
                d="M 430 120 Q 480 20 530 120"
                fill={selectedChannel === 11 ? 'rgba(6, 182, 212, 0.35)' : 'rgba(6, 182, 212, 0.12)'}
                stroke={selectedChannel === 11 ? '#06b6d4' : '#0891b2'}
                strokeWidth={selectedChannel === 11 ? '3' : '1.5'}
              />
              <text x="480" y="115" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">CH 11</text>

              {/* If an overlapping channel is selected, show its collision curve */}
              {!isNonOverlapping && (
                <path
                  d={`M ${30 + (selectedChannel - 1) * 40} 120 Q ${80 + (selectedChannel - 1) * 40} 25 ${130 + (selectedChannel - 1) * 40} 120`}
                  fill="rgba(245, 158, 11, 0.35)"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
              )}
            </svg>
          </div>

          {/* Diagnosis Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isNonOverlapping
                ? 'bg-cyan-950/30 border-cyan-800/60 text-cyan-200'
                : 'bg-amber-950/30 border-amber-800/60 text-amber-200'
            }`}
          >
            {isNonOverlapping ? (
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <span className="font-bold block text-sm mb-1">
                {isNonOverlapping
                  ? `Channel ${selectedChannel} is an Industry Recommended Clean Channel!`
                  : `Warning: Channel ${selectedChannel} causes Adjacent Channel Collisions!`}
              </span>
              <p className="text-slate-300 leading-relaxed">
                {isNonOverlapping
                  ? `Channels 1, 6, and 11 have 25 MHz separation with ZERO co-channel interference. Multiple Access Points can broadcast simultaneously without colliding in airspace.`
                  : `Channel ${selectedChannel} overlaps with neighboring networks on Channel 1 and Channel 6. Because Wi-Fi radios cannot detect collisions while transmitting (CSMA/CA), this causes high packet retry rates and slashes throughput.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'bands' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-cyan-400 font-mono">2.4 GHz Band</span>
              <span className="text-xs text-slate-400">Long Range</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Travels further and penetrates drywall and solid objects with ease. However, only 3 non-overlapping channels (1, 6, 11) exist, making it congested by microwave ovens and Bluetooth devices.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div>Channels: 1 to 11 (20MHz)</div>
              <div>Max Throughput: ~450-600 Mbps</div>
              <div>Range: Up to 50 meters indoors</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-sky-400 font-mono">5 GHz Band</span>
              <span className="text-xs text-slate-400">High Speed</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides 24+ non-overlapping channels and channel bonding (40/80/160 MHz) for gigabit speeds. Shorter physical range and attenuated rapidly by concrete and brick walls.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div>Channels: 36, 40, 44, 48, DFS...</div>
              <div>Max Throughput: ~1.3 Gbps to 4.8 Gbps</div>
              <div>Range: ~15 to 30 meters indoors</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-emerald-400 font-mono">6 GHz Band (Wi-Fi 6E/7)</span>
              <span className="text-xs text-slate-400">Ultra Low Latency</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Massive 1200 MHz of pristine, clean spectrum free from legacy 802.11b/g devices. Supports up to seven 160MHz channels and 320MHz ultra-wide channels in Wi-Fi 7.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div>Channels: Up to 59 new channels</div>
              <div>Max Throughput: Up to 9.6+ Gbps</div>
              <div>Zero legacy backward compatibility</div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'security' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 block pb-1 border-b border-slate-800">
              WPA2-PERSONAL (LEGACY STANDARD)
            </span>
            <ul className="text-xs text-slate-300 space-y-2 pt-1">
              <li>• Uses AES-CCMP encryption with a 4-Way Handshake.</li>
              <li>• <strong>Vulnerability:</strong> Attackers can capture the 4-way handshake broadcast packets over the air and perform offline dictionary attacks to crack weak passwords without alerting the network.</li>
              <li>• Vulnerable to KRACK (Key Reinstallation Attacks) if unpatched.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 block pb-1 border-b border-slate-800">
              WPA3-PERSONAL (MODERN STANDARD)
            </span>
            <ul className="text-xs text-slate-300 space-y-2 pt-1">
              <li>• Uses <strong>Simultaneous Authentication of Equals (SAE)</strong> based on Dragonfly handshake protocol.</li>
              <li>• <strong>Defense:</strong> Forward secrecy prevents decryption of past sessions even if the password is compromised later.</li>
              <li>• Resists offline dictionary attacks: attackers only get 1 live guess per connection attempt, eliminating brute-force scripts.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Cable, Check, ArrowRightLeft, Info } from 'lucide-react';

interface WirePin {
  pin: number;
  colorName: string;
  code: string;
  hex: string;
  stripeHex?: string;
  pair: number;
  signal: string;
}

const T568B_WIRES: WirePin[] = [
  { pin: 1, colorName: 'White / Orange', code: 'W-O', hex: '#FFFFFF', stripeHex: '#FF8A00', pair: 2, signal: 'Tx+ (Transmit)' },
  { pin: 2, colorName: 'Orange', code: 'ORG', hex: '#FF8A00', pair: 2, signal: 'Tx- (Transmit)' },
  { pin: 3, colorName: 'White / Green', code: 'W-G', hex: '#FFFFFF', stripeHex: '#10B981', pair: 3, signal: 'Rx+ (Receive)' },
  { pin: 4, colorName: 'Blue', code: 'BLU', hex: '#3B82F6', pair: 1, signal: 'Unused / PoE' },
  { pin: 5, colorName: 'White / Blue', code: 'W-BLU', hex: '#FFFFFF', stripeHex: '#3B82F6', pair: 1, signal: 'Unused / PoE' },
  { pin: 6, colorName: 'Green', code: 'GRN', hex: '#10B981', pair: 3, signal: 'Rx- (Receive)' },
  { pin: 7, colorName: 'White / Brown', code: 'W-BRN', hex: '#FFFFFF', stripeHex: '#92400E', pair: 4, signal: 'Unused / PoE' },
  { pin: 8, colorName: 'Brown', code: 'BRN', hex: '#92400E', pair: 4, signal: 'Unused / PoE' },
];

const T568A_WIRES: WirePin[] = [
  { pin: 1, colorName: 'White / Green', code: 'W-G', hex: '#FFFFFF', stripeHex: '#10B981', pair: 3, signal: 'Rx+ (Receive)' },
  { pin: 2, colorName: 'Green', code: 'GRN', hex: '#10B981', pair: 3, signal: 'Rx- (Receive)' },
  { pin: 3, colorName: 'White / Orange', code: 'W-O', hex: '#FFFFFF', stripeHex: '#FF8A00', pair: 2, signal: 'Tx+ (Transmit)' },
  { pin: 4, colorName: 'Blue', code: 'BLU', hex: '#3B82F6', pair: 1, signal: 'Unused / PoE' },
  { pin: 5, colorName: 'White / Blue', code: 'W-BLU', hex: '#FFFFFF', stripeHex: '#3B82F6', pair: 1, signal: 'Unused / PoE' },
  { pin: 6, colorName: 'Orange', code: 'ORG', hex: '#FF8A00', pair: 2, signal: 'Tx- (Transmit)' },
  { pin: 7, colorName: 'White / Brown', code: 'W-BRN', hex: '#FFFFFF', stripeHex: '#92400E', pair: 4, signal: 'Unused / PoE' },
  { pin: 8, colorName: 'Brown', code: 'BRN', hex: '#92400E', pair: 4, signal: 'Unused / PoE' },
];

export const CablePinoutVisualizer: React.FC = () => {
  const [cableType, setCableType] = useState<'straight' | 'crossover' | 'standards'>('straight');
  const [activePin, setActivePin] = useState<number | null>(null);

  const endA = cableType === 'crossover' ? T568A_WIRES : T568B_WIRES;
  const endB = T568B_WIRES;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-wider uppercase">
            <Cable className="w-4 h-4" />
            <span>Interactive Cable Inspector</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">RJ-45 Pinouts: T568A vs. T568B Standards</h4>
        </div>

        {/* Cable Type Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 self-start sm:self-auto max-w-full">
          <button
            onClick={() => setCableType('straight')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              cableType === 'straight'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Straight (B-to-B)
          </button>
          <button
            onClick={() => setCableType('crossover')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              cableType === 'crossover'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Crossover (A-to-B)
          </button>
          <button
            onClick={() => setCableType('standards')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              cableType === 'standards'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Compare Standards
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
        {/* Connector End A */}
        <div className="md:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
            <span className="text-xs font-mono font-bold text-orange-400">
              CONNECTOR END 1 ({cableType === 'crossover' ? 'T568A Standard' : 'T568B Standard'})
            </span>
            <span className="text-[11px] font-mono text-slate-400">Pins 1 → 8</span>
          </div>

          <div className="space-y-1.5">
            {endA.map((wire) => {
              const isSelected = activePin === wire.pin;
              return (
                <div
                  key={wire.pin}
                  onMouseEnter={() => setActivePin(wire.pin)}
                  onMouseLeave={() => setActivePin(null)}
                  className={`flex items-center justify-between p-2 rounded-md transition border cursor-pointer ${
                    isSelected ? 'bg-orange-950/40 border-orange-500/50' : 'bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center text-xs font-mono font-bold text-slate-400">
                      {wire.pin}
                    </span>
                    {/* Wire Stripe Graphic */}
                    <div
                      className="w-10 h-3 rounded-full border border-slate-700 relative overflow-hidden"
                      style={{ backgroundColor: wire.hex }}
                    >
                      {wire.stripeHex && (
                        <div
                          className="absolute inset-0 w-full h-full"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, ${wire.stripeHex}, ${wire.stripeHex} 4px, transparent 4px, transparent 8px)`
                          }}
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-200">{wire.colorName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{wire.signal}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Connection Indicator */}
        <div className="md:col-span-2 flex flex-col items-center justify-center py-2 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
            {cableType === 'straight' && 'Straight Map'}
            {cableType === 'crossover' && '1/2 ↔ 3/6 Swap'}
            {cableType === 'standards' && 'Comparison'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1">
            {cableType === 'straight' && 'Pin 1 connects to Pin 1'}
            {cableType === 'crossover' && 'Pins 1&2 cross to 3&6'}
            {cableType === 'standards' && 'Green/Orange swap'}
          </span>
        </div>

        {/* Connector End B */}
        <div className="md:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
            <span className="text-xs font-mono font-bold text-orange-400">
              CONNECTOR END 2 ({cableType === 'standards' ? 'T568A Standard' : 'T568B Standard'})
            </span>
            <span className="text-[11px] font-mono text-slate-400">Pins 1 → 8</span>
          </div>

          <div className="space-y-1.5">
            {(cableType === 'standards' ? T568A_WIRES : endB).map((wire) => {
              const isSelected = activePin === wire.pin;
              return (
                <div
                  key={wire.pin}
                  onMouseEnter={() => setActivePin(wire.pin)}
                  onMouseLeave={() => setActivePin(null)}
                  className={`flex items-center justify-between p-2 rounded-md transition border cursor-pointer ${
                    isSelected ? 'bg-orange-950/40 border-orange-500/50' : 'bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center text-xs font-mono font-bold text-slate-400">
                      {wire.pin}
                    </span>
                    <div
                      className="w-10 h-3 rounded-full border border-slate-700 relative overflow-hidden"
                      style={{ backgroundColor: wire.hex }}
                    >
                      {wire.stripeHex && (
                        <div
                          className="absolute inset-0 w-full h-full"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, ${wire.stripeHex}, ${wire.stripeHex} 4px, transparent 4px, transparent 8px)`
                          }}
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-200">{wire.colorName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{wire.signal}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Usage Guide Cards */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-xs font-semibold text-orange-400 block mb-1">Straight-Through (B to B)</span>
          <p className="text-xs text-slate-300">
            Connects <strong>unlike devices</strong>: PC to Switch, Switch to Router, Server to Switch.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-xs font-semibold text-orange-400 block mb-1">Crossover (A to B)</span>
          <p className="text-xs text-slate-300">
            Connects <strong>like devices</strong>: Switch to Switch, Router to Router, PC to PC (legacy/non-Auto-MDIX).
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-xs font-semibold text-orange-400 block mb-1">Auto-MDIX Feature</span>
          <p className="text-xs text-slate-300">
            Modern gigabit switchports automatically detect transmit/receive pins and auto-swap internally.
          </p>
        </div>
      </div>
    </div>
  );
};

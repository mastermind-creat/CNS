import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Send, ShieldAlert, Check, RefreshCw } from 'lucide-react';

interface SwitchPort {
  id: number;
  label: string;
  vlan: number;
  vlanName: string;
  type: 'access' | 'trunk';
  connectedDevice: string;
  colorHex: string;
}

const SWITCH_PORTS: SwitchPort[] = [
  { id: 1, label: 'Fa0/1', vlan: 10, vlanName: 'Sales', type: 'access', connectedDevice: 'PC-Sales-1', colorHex: '#38BDF8' },
  { id: 2, label: 'Fa0/2', vlan: 10, vlanName: 'Sales', type: 'access', connectedDevice: 'PC-Sales-2', colorHex: '#38BDF8' },
  { id: 3, label: 'Fa0/3', vlan: 10, vlanName: 'Sales', type: 'access', connectedDevice: 'Printer-Sales', colorHex: '#38BDF8' },
  { id: 4, label: 'Fa0/4', vlan: 20, vlanName: 'Engineering', type: 'access', connectedDevice: 'Dev-Workstation-1', colorHex: '#C084FC' },
  { id: 5, label: 'Fa0/5', vlan: 20, vlanName: 'Engineering', type: 'access', connectedDevice: 'Dev-Workstation-2', colorHex: '#C084FC' },
  { id: 6, label: 'Fa0/6', vlan: 20, vlanName: 'Engineering', type: 'access', connectedDevice: 'Build-Server', colorHex: '#C084FC' },
  { id: 7, label: 'Fa0/7', vlan: 999, vlanName: 'Parking Lot', type: 'access', connectedDevice: 'Unused (Shutdown)', colorHex: '#64748B' },
  { id: 8, label: 'Gi0/1', vlan: 0, vlanName: '802.1Q Trunk', type: 'trunk', connectedDevice: 'Router (ROAS Uplink)', colorHex: '#F43F5E' },
];

export const VlanSwitchDiagram: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<'idle' | 'sales' | 'eng'>('idle');
  const [logMessage, setLogMessage] = useState<string>('Select an action to simulate Ethernet frame switching.');

  const runSimulation = (source: 'sales' | 'eng') => {
    setActiveSimulation(source);
    if (source === 'sales') {
      setLogMessage('Frame originated at Port Fa0/1 (VLAN 10 Sales). Switch floods ONLY to Fa0/2, Fa0/3, and 802.1Q Trunk Gi0/1 with VID=10. Ports in VLAN 20 are isolated!');
    } else {
      setLogMessage('Frame originated at Port Fa0/4 (VLAN 20 Engineering). Switch floods ONLY to Fa0/5, Fa0/6, and 802.1Q Trunk Gi0/1 with VID=20. VLAN 10 never sees this traffic.');
    }
  };

  const resetSimulation = () => {
    setActiveSimulation('idle');
    setLogMessage('Simulation reset. Select a source port to simulate frame delivery.');
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold tracking-wider uppercase">
            <Cpu className="w-4 h-4" />
            <span>Interactive Layer 2 Switch Engine</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">Cisco Catalyst 2960: VLAN Isolation & 802.1Q Trunking</h4>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => runSimulation('sales')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 transition cursor-pointer"
          >
            Broadcast from VLAN 10 (Sales)
          </button>
          <button
            onClick={() => runSimulation('eng')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition cursor-pointer"
          >
            Broadcast from VLAN 20 (Eng)
          </button>
          <button
            onClick={resetSimulation}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Switch Chassis Visualizer */}
      <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="text-xs font-mono font-bold text-slate-300">CISCO CATALYST 2960-24TT</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
            <span className="text-sky-400">● VLAN 10 (Sales)</span>
            <span className="text-purple-400">● VLAN 20 (Engineering)</span>
            <span className="text-rose-400">● 802.1Q Trunk</span>
          </div>
        </div>

        {/* Ports Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">
          {SWITCH_PORTS.map((port) => {
            const isSource =
              (activeSimulation === 'sales' && port.id === 1) ||
              (activeSimulation === 'eng' && port.id === 4);

            const isReceiving =
              (activeSimulation === 'sales' && (port.vlan === 10 && port.id !== 1 || port.type === 'trunk')) ||
              (activeSimulation === 'eng' && (port.vlan === 20 && port.id !== 4 || port.type === 'trunk'));

            const isBlocked =
              (activeSimulation === 'sales' && port.vlan === 20) ||
              (activeSimulation === 'eng' && port.vlan === 10) ||
              (port.vlan === 999);

            return (
              <div
                key={port.id}
                className={`p-3 rounded-lg border transition-all duration-300 relative flex flex-col justify-between ${
                  isSource
                    ? 'border-yellow-400 bg-yellow-950/40 shadow-md shadow-yellow-500/20 ring-1 ring-yellow-400'
                    : isReceiving
                    ? 'border-emerald-400 bg-emerald-950/30 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/50'
                    : isBlocked
                    ? 'border-slate-800/60 bg-slate-900/30 opacity-40'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-300">{port.label}</span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: port.colorHex }}
                  />
                </div>

                {/* RJ-45 Jack Visual representation */}
                <div className="w-full h-8 bg-black/60 rounded border border-slate-700 flex items-center justify-center my-1">
                  <div className="w-5 h-4 border-b-2 border-slate-500 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-1 bg-amber-500/80 rounded-t-xs" />
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono leading-tight">
                  <span className="text-slate-200 block font-semibold truncate">{port.connectedDevice}</span>
                  <span className="text-slate-400 block truncate">
                    {port.type === 'trunk' ? 'Trunk (Tag 802.1Q)' : `VLAN ${port.vlan}`}
                  </span>
                </div>

                {/* Status indicator badge */}
                <div className="mt-2 pt-1 border-t border-slate-800 flex justify-between items-center text-[9px] font-mono">
                  {isSource && <span className="text-yellow-400 font-bold uppercase">TX SOURCE</span>}
                  {isReceiving && <span className="text-emerald-400 font-bold uppercase">RX FORWARD</span>}
                  {isBlocked && <span className="text-slate-500 uppercase">ISOLATED</span>}
                  {!isSource && !isReceiving && !isBlocked && <span className="text-slate-500 uppercase">IDLE</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Packet Log */}
      <div className="mt-4 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
        <Send className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div className="text-xs font-mono text-slate-300">
          <span className="text-purple-400 font-bold block mb-0.5">SWITCH FORWARDING LOG:</span>
          {logMessage}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Network, Grid, Hash, HelpCircle } from 'lucide-react';

interface SubnetSlice {
  index: number;
  network: string;
  firstUsable: string;
  lastUsable: string;
  broadcast: string;
}

export const SubnetVisualizerDiagram: React.FC = () => {
  const [cidr, setCidr] = useState<number>(26);
  const [selectedSubnetIdx, setSelectedSubnetIdx] = useState<number>(0);

  // Math for 192.168.10.0 base
  const hostBits = 32 - cidr;
  const totalAddresses = Math.pow(2, hostBits);
  const usableHosts = totalAddresses >= 2 ? totalAddresses - 2 : 0;
  const numSubnets = Math.pow(2, cidr - 24);
  const blockSize = totalAddresses;

  // Mask in last octet
  let lastOctetMask = 0;
  for (let i = 0; i < cidr - 24; i++) {
    lastOctetMask += Math.pow(2, 7 - i);
  }
  const subnetMask = `255.255.255.${lastOctetMask}`;

  // Generate slice list (up to 8 for preview)
  const subnets: SubnetSlice[] = [];
  const maxDisplay = Math.min(numSubnets, 16);
  for (let i = 0; i < maxDisplay; i++) {
    const netStart = i * blockSize;
    const netEnd = netStart + blockSize - 1;
    subnets.push({
      index: i,
      network: `192.168.10.${netStart}`,
      firstUsable: `192.168.10.${netStart + 1}`,
      lastUsable: `192.168.10.${netEnd - 1}`,
      broadcast: `192.168.10.${netEnd}`
    });
  }

  const activeSubnet = subnets[Math.min(selectedSubnetIdx, subnets.length - 1)] || subnets[0];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Network className="w-4 h-4" />
            <span>Interactive Visual Slicer</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">Subnet Slicer: Base Network 192.168.10.0/24</h4>
        </div>

        {/* CIDR Selector */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto max-w-full">
          <span className="text-xs text-slate-400 font-mono">CIDR Prefix:</span>
          <div className="flex flex-wrap items-center bg-slate-950 rounded-lg p-1 border border-slate-800 max-w-full">
            {[24, 25, 26, 27, 28, 29].map((prefix) => (
              <button
                key={prefix}
                onClick={() => {
                  setCidr(prefix);
                  setSelectedSubnetIdx(0);
                }}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded transition cursor-pointer ${
                  cidr === prefix
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                /{prefix}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Math Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">SUBNET MASK</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block">{subnetMask}</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">BLOCK SIZE (MAGIC #)</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block">+{blockSize} IPs / Subnet</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">USABLE HOSTS (2^{hostBits} - 2)</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block">{usableHosts} hosts</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">TOTAL SUBNETS</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block">{numSubnets} subnet{numSubnets > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Visual Subnet Blocks Grid */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Click any block below to inspect its address range:</span>
          <span className="font-mono">Showing {subnets.length} of {numSubnets} subnets</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {subnets.map((sub) => {
            const isSelected = selectedSubnetIdx === sub.index;
            return (
              <button
                key={sub.index}
                onClick={() => setSelectedSubnetIdx(sub.index)}
                className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-400/80 bg-emerald-950/40 shadow-sm shadow-emerald-500/20 ring-1 ring-emerald-400/40'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Subnet #{sub.index + 1}</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">/{cidr}</span>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-mono font-bold text-slate-200 block truncate">
                    {sub.network}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {usableHosts} hosts
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspector Card for Selected Subnet */}
      <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              SUBNET #{activeSubnet.index + 1} DETAILED BREAKDOWN
            </span>
            <span className="text-xs text-slate-400">({activeSubnet.network}/{cidr})</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Mask: {subnetMask}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3 text-xs font-mono">
          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">NETWORK ADDRESS (ID)</span>
            <span className="text-emerald-400 font-bold text-sm mt-0.5 block">{activeSubnet.network}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Unassignable (Wire ID)</span>
          </div>

          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">FIRST USABLE HOST</span>
            <span className="text-slate-200 font-bold text-sm mt-0.5 block">{activeSubnet.firstUsable}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Typically Default Gateway</span>
          </div>

          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">LAST USABLE HOST</span>
            <span className="text-slate-200 font-bold text-sm mt-0.5 block">{activeSubnet.lastUsable}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Highest client assignable</span>
          </div>

          <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">BROADCAST ADDRESS</span>
            <span className="text-amber-400 font-bold text-sm mt-0.5 block">{activeSubnet.broadcast}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">All hosts listening</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Route, Play, RotateCcw, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HopStep {
  step: number;
  locationName: string;
  action: string;
  srcIp: string;
  dstIp: string;
  srcMac: string;
  dstMac: string;
  ttl: number;
  explanation: string;
}

const HOP_STEPS: HopStep[] = [
  {
    step: 0,
    locationName: 'Host A (192.168.1.10)',
    action: 'Preparing Packet',
    srcIp: '192.168.1.10',
    dstIp: '10.0.0.50',
    srcMac: 'AA:11:22:33:44:55',
    dstMac: 'GW:00:11:22:33:44',
    ttl: 64,
    explanation: 'Host A applies subnet mask (255.255.255.0). Destination 10.0.0.50 is NOT local! Host A encapsulates the packet in a frame addressed to its Default Gateway MAC.'
  },
  {
    step: 1,
    locationName: 'Access Switch SW1',
    action: 'Layer 2 Forwarding',
    srcIp: '192.168.1.10',
    dstIp: '10.0.0.50',
    srcMac: 'AA:11:22:33:44:55',
    dstMac: 'GW:00:11:22:33:44',
    ttl: 64,
    explanation: 'Switch SW1 inspects Destination MAC (GW:00:11:22:33:44), checks its CAM table, and forwards the frame out port Gi0/1 directly to Router R1 without modifying IP or MAC headers.'
  },
  {
    step: 2,
    locationName: 'Default Gateway Router R1',
    action: 'Layer 3 Routing Table Lookup & TTL Decrement',
    srcIp: '192.168.1.10',
    dstIp: '10.0.0.50',
    srcMac: 'R1:OUT:00:11:22:33',
    dstMac: 'R2:IN:00:99:88:77',
    ttl: 63,
    explanation: 'Router R1 strips L2 frame. Inspects L3 IP header. Decrements TTL from 64 to 63. Looks up 10.0.0.50 in routing table -> matched next-hop 172.16.0.2 (R2). Re-encapsulates with new L2 MACs!'
  },
  {
    step: 3,
    locationName: 'Core ISP Router R2',
    action: 'WAN Forwarding to Destination Subnet',
    srcIp: '192.168.1.10',
    dstIp: '10.0.0.50',
    srcMac: 'R2:OUT:11:22:33:44',
    dstMac: 'SRV:00:55:66:77:88',
    ttl: 62,
    explanation: 'Router R2 decrements TTL to 62. Subnet 10.0.0.0/24 is directly connected to interface Gi0/2. R2 ARP-resolves the server MAC and sends the frame to Server B.'
  },
  {
    step: 4,
    locationName: 'Target Web Server B (10.0.0.50)',
    action: 'Packet Arrived & TCP SYN Received',
    srcIp: '192.168.1.10',
    dstIp: '10.0.0.50',
    srcMac: 'R2:OUT:11:22:33:44',
    dstMac: 'SRV:00:55:66:77:88',
    ttl: 62,
    explanation: 'Server B decapsulates the packet up to Layer 4 (TCP port 443 HTTPS). Server prepares a TCP SYN-ACK reply packet destined back to Host A!'
  }
];

export const RoutingPacketSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const current = HOP_STEPS[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev < HOP_STEPS.length - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold tracking-wider uppercase">
            <Route className="w-4 h-4" />
            <span>Interactive Hop Simulator</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">End-to-End Packet Hop & TTL Forwarding</h4>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleNext}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-pink-500/15 text-pink-300 border border-pink-500/40 hover:bg-pink-500/25 transition cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{currentStepIndex === HOP_STEPS.length - 1 ? 'Start Over' : 'Next Hop Step'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer"
            title="Reset to Host A"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Network Hop Path Topology Visualizer */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10 text-center">
          {[
            { name: 'Host A', ip: '192.168.1.10', icon: '💻' },
            { name: 'Switch SW1', ip: 'Layer 2 CAM', icon: '🔀' },
            { name: 'Router R1', ip: '192.168.1.1', icon: '🌐' },
            { name: 'ISP Router R2', ip: '172.16.0.2', icon: '⚡' },
            { name: 'Server B', ip: '10.0.0.50', icon: '🖥️' }
          ].map((node, idx) => {
            const isCurrent = currentStepIndex === idx;
            const isPassed = currentStepIndex > idx;
            return (
              <div
                key={node.name}
                className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-300 flex flex-col items-center justify-between ${
                  isCurrent
                    ? 'border-pink-400 bg-pink-950/40 shadow-lg shadow-pink-500/25 ring-1 ring-pink-400'
                    : isPassed
                    ? 'border-emerald-500/60 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-900/50 opacity-60'
                }`}
              >
                <span className="text-xl sm:text-2xl mb-1">{node.icon}</span>
                <span className="text-xs font-bold text-slate-200 block truncate w-full">{node.name}</span>
                <span className="text-[10px] font-mono text-slate-400 block truncate w-full">{node.ip}</span>
                <div className="mt-2 text-[9px] font-mono">
                  {isCurrent && <span className="text-pink-400 font-bold uppercase">PACKET HERE</span>}
                  {isPassed && <span className="text-emerald-400 font-bold uppercase">FORWARDED</span>}
                  {!isCurrent && !isPassed && <span className="text-slate-500 uppercase">PENDING</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Header Inspection Telemetry */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Step Explanation */}
        <div className="md:col-span-7 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-pink-400">
                STEP {current.step + 1} OF 5: {current.locationName}
              </span>
              <span className="text-xs font-mono text-slate-400">{current.action}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{current.explanation}</p>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-pink-950/30 border border-pink-900/40 text-xs text-slate-300">
            <span className="font-semibold text-pink-300">Routing Golden Rule:</span> IP addresses stay the same from end-to-end; MAC addresses change at EVERY router hop!
          </div>
        </div>

        {/* Live Packet Header Fields */}
        <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block pb-1 border-b border-slate-800">
            CURRENT PACKET HEADER TELEMETRY
          </span>

          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">L3 Source IP:</span>
            <span className="text-emerald-400 font-bold">{current.srcIp}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">L3 Destination IP:</span>
            <span className="text-emerald-400 font-bold">{current.dstIp}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Time-to-Live (TTL):</span>
            <span className="text-pink-400 font-bold">{current.ttl} hops remaining</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">L2 Frame Src MAC:</span>
            <span className="text-slate-200 text-[11px]">{current.srcMac}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">L2 Frame Dst MAC:</span>
            <span className="text-slate-200 text-[11px]">{current.dstMac}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

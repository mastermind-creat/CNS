import React, { useState } from 'react';
import { Server, Globe, ArrowRight, Play, RotateCcw, Database } from 'lucide-react';

export const DnsDhcpJourneyDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dhcp' | 'dns' | 'nat'>('dhcp');
  const [doraStep, setDoraStep] = useState<number>(0);
  const [dnsStep, setDnsStep] = useState<number>(0);

  const DORA_STEPS = [
    {
      step: 'Discover',
      sender: 'Client Workstation',
      receiver: 'Broadcast (255.255.255.255)',
      ports: 'Src UDP 68 → Dst UDP 67',
      desc: 'Client boots up with no IP (0.0.0.0). Broadcasts "Is there a DHCP server on this LAN? I need an IP address!"',
      color: '#FACC15'
    },
    {
      step: 'Offer',
      sender: 'DHCP Server (192.168.1.1)',
      receiver: 'Client (MAC: AA:BB:CC...)',
      ports: 'Src UDP 67 → Dst UDP 68',
      desc: 'Server reserves 192.168.1.50 from its pool and replies: "I offer you 192.168.1.50 with mask 255.255.255.0, Gateway 192.168.1.1, and DNS 192.168.1.5 for 24 hours."',
      color: '#38BDF8'
    },
    {
      step: 'Request',
      sender: 'Client Workstation',
      receiver: 'Broadcast (255.255.255.255)',
      ports: 'Src UDP 68 → Dst UDP 67',
      desc: 'Client broadcasts acceptance: "I accept the offer from Server 192.168.1.1 for IP 192.168.1.50!" Broadcast informs any other DHCP servers to release their reserved offers.',
      color: '#C084FC'
    },
    {
      step: 'Acknowledge (ACK)',
      sender: 'DHCP Server (192.168.1.1)',
      receiver: 'Client Workstation',
      ports: 'Src UDP 67 → Dst UDP 68',
      desc: 'Server finalizes binding: "Lease confirmed! IP 192.168.1.50 is legally yours for the next 24 hours. Start transmitting!"',
      color: '#34D399'
    }
  ];

  const DNS_STEPS = [
    {
      step: '1. Local Cache & Recursive Resolver Query',
      action: 'Browser checks internal cache; if missing, asks Recursive Resolver (8.8.8.8 / 1.1.1.1) for "www.example.com".'
    },
    {
      step: '2. Root Name Server (.) Referral',
      action: 'Recursive resolver queries Root DNS server. Root responds: "I do not know example.com, but here is the IP for the .com TLD server."'
    },
    {
      step: '3. Top-Level Domain (TLD .com) Referral',
      action: 'Resolver queries .com TLD server. TLD responds: "Here are the authoritative name servers (ns1.example.com) for example.com."'
    },
    {
      step: '4. Authoritative Name Server Answer',
      action: 'Resolver queries ns1.example.com for the "A Record". Authoritative server returns exact IP: 93.184.216.34.'
    },
    {
      step: '5. Browser Receives IP & Caches Answer',
      action: 'Resolver caches the record and hands 93.184.216.34 to browser, which initiates the TCP 3-way handshake over port 443!'
    }
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-semibold tracking-wider uppercase">
            <Server className="w-4 h-4" />
            <span>Interactive Infrastructure Services</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">DHCP DORA Exchange, DNS Hierarchy & NAT/PAT</h4>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('dhcp')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              activeTab === 'dhcp'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DHCP DORA Flow
          </button>
          <button
            onClick={() => setActiveTab('dns')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              activeTab === 'dns'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DNS Resolution Tree
          </button>
          <button
            onClick={() => setActiveTab('nat')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              activeTab === 'nat'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NAT / PAT Table
          </button>
        </div>
      </div>

      {/* DHCP DORA Mode */}
      {activeTab === 'dhcp' && (
        <div className="mt-6 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Step through the 4-way DHCP negotiation:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setDoraStep((prev) => (prev < 3 ? prev + 1 : 0))}
                className="px-3 py-1 rounded text-xs font-mono font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/30 transition cursor-pointer flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                <span>Next DORA Step</span>
              </button>
              <button
                onClick={() => setDoraStep(0)}
                className="p-1 rounded text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* DORA 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DORA_STEPS.map((step, idx) => {
              const isCurrent = doraStep === idx;
              const isPast = doraStep > idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setDoraStep(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border-yellow-400 bg-yellow-950/40 shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-400'
                      : isPast
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-slate-800 bg-slate-950/40 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-yellow-400 uppercase">
                        {step.step[0]} - {step.step}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Step {idx + 1}/4</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mb-2">
                      <div>From: {step.sender}</div>
                      <div>To: {step.receiver}</div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-400">
                    {step.ports}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DNS Hierarchy Mode */}
      {activeTab === 'dns' && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Resolving domain: <strong className="text-slate-200">www.example.com</strong></span>
            <button
              onClick={() => setDnsStep((prev) => (prev < 4 ? prev + 1 : 0))}
              className="px-3 py-1 rounded text-xs font-mono font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/30 transition cursor-pointer"
            >
              Step Forward ({dnsStep + 1}/5)
            </button>
          </div>

          <div className="space-y-2">
            {DNS_STEPS.map((step, idx) => {
              const isActive = dnsStep === idx;
              const isDone = dnsStep > idx;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition ${
                    isActive
                      ? 'border-yellow-400 bg-yellow-950/40 shadow-sm'
                      : isDone
                      ? 'border-emerald-600/50 bg-emerald-950/20'
                      : 'border-slate-800 bg-slate-950/40 opacity-50'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-yellow-300 block mb-1">
                    {step.step}
                  </span>
                  <p className="text-xs text-slate-300">{step.action}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* NAT / PAT Table Mode */}
      {activeTab === 'nat' && (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Port Address Translation (PAT / NAT Overload):</strong> Hundreds of internal hosts share a single public IP address by assigning unique Layer 4 source port numbers.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Protocol</th>
                  <th className="p-3">Inside Local (LAN Host)</th>
                  <th className="p-3">Inside Global (Public PAT IP)</th>
                  <th className="p-3">Outside Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 text-cyan-400">TCP</td>
                  <td className="p-3 font-semibold text-white">192.168.1.15 : 51204</td>
                  <td className="p-3 text-yellow-400 font-bold">203.0.113.1 : 51204</td>
                  <td className="p-3">142.250.190.46 : 443 (Google)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 text-cyan-400">TCP</td>
                  <td className="p-3 font-semibold text-white">192.168.1.16 : 51204</td>
                  <td className="p-3 text-yellow-400 font-bold">203.0.113.1 : 51205 (Port Shift)</td>
                  <td className="p-3">104.244.42.1 : 443 (Twitter)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 text-purple-400">UDP</td>
                  <td className="p-3 font-semibold text-white">192.168.1.20 : 61992</td>
                  <td className="p-3 text-yellow-400 font-bold">203.0.113.1 : 61992</td>
                  <td className="p-3">1.1.1.1 : 53 (Cloudflare DNS)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

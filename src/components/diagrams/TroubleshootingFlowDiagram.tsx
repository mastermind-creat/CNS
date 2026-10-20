import React, { useState } from 'react';
import { Terminal, Shield, CheckCircle2, AlertOctagon, CornerDownRight, Copy, Check } from 'lucide-react';

interface DiagnosticLayer {
  layer: string;
  name: string;
  symptom: string;
  command: string;
  whatToLookFor: string;
  fix: string;
  color: string;
}

const DIAGNOSTIC_STEPS: DiagnosticLayer[] = [
  {
    layer: 'Layer 1',
    name: 'Physical Link Inspection',
    symptom: 'No link LED light on NIC or switchport; "Network Cable Unplugged" error.',
    command: 'ethtool eth0 (Linux) or check RJ-45 LED status',
    whatToLookFor: 'Link detected: yes/no, Speed 1000Mb/s vs 100Mb/s, Duplex: Full vs Half.',
    fix: 'Re-seat cable, test cable with continuity tester, re-crimp RJ-45, or swap switchport.',
    color: '#EF4444'
  },
  {
    layer: 'Layer 2',
    name: 'Data Link & ARP Resolution',
    symptom: 'Link light is green, but host cannot ping any device on the same local subnet.',
    command: 'arp -a',
    whatToLookFor: 'Does the Default Gateway IP appear with a valid MAC address or is it missing?',
    fix: 'Check switchport VLAN assignment (`show vlan brief`), verify STP state (`show spanning-tree`), resolve duplicate MAC/IP conflicts.',
    color: '#F97316'
  },
  {
    layer: 'Layer 3',
    name: 'IP Addressing & Gateway Routing',
    symptom: 'Host has IP starting with 169.254.x.x (APIPA) or can ping local gateway but cannot reach Internet.',
    command: 'ipconfig /all  &&  ping 192.168.1.1  &&  tracert -d 8.8.8.8',
    whatToLookFor: 'Verify IP, Subnet Mask, and Default Gateway are on the SAME subnet. Check which hop fails in tracert.',
    fix: 'Renew DHCP lease (`ipconfig /renew`), correct subnet mask mismatch, check router routing table (`show ip route`).',
    color: '#EAB308'
  },
  {
    layer: 'Layer 4',
    name: 'Transport Ports & Firewalls',
    symptom: 'Ping to remote server IP succeeds, but web page or SSH fails to connect.',
    command: 'netstat -ano  &&  Test-NetConnection -ComputerName 8.8.8.8 -Port 53',
    whatToLookFor: 'Listening vs Established sockets. TCP connection timeout vs Connection Refused (RST).',
    fix: 'Check host software firewall (Windows Defender), verify router ACL rules (`show ip access-lists`), ensure service daemon is running.',
    color: '#A855F7'
  },
  {
    layer: 'Layer 7',
    name: 'Application & DNS Resolution',
    symptom: 'Can ping 8.8.8.8 directly, but browser displays "DNS_PROBE_FINISHED_NXDOMAIN" for websites.',
    command: 'nslookup www.google.com  &&  ipconfig /flushdns',
    whatToLookFor: 'Does the DNS server IP answer? Does it return a valid A record or Server Failure?',
    fix: 'Flush local DNS cache, update DNS server IP in adapter settings to 1.1.1.1 / 8.8.8.8, check corporate DNS forwarders.',
    color: '#06B6D4'
  }
];

export const TroubleshootingFlowDiagram: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const active = DIAGNOSTIC_STEPS[selectedStep];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold tracking-wider uppercase">
            <Terminal className="w-4 h-4" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">Bottom-Up OSI Troubleshooting Methodology</h4>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
          Rule: Never diagnose L7 before verifying L1!
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Layer Steps List */}
        <div className="lg:col-span-5 space-y-2">
          {DIAGNOSTIC_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={step.layer}
                onClick={() => setSelectedStep(idx)}
                className={`w-full text-left p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-rose-400/80 bg-rose-950/40 shadow-sm shadow-rose-500/20 ring-1 ring-rose-400/40'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded flex items-center justify-center font-mono font-bold text-xs"
                    style={{ backgroundColor: `${step.color}25`, color: step.color }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-300 block">{step.layer}: {step.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">{step.symptom}</span>
                  </div>
                </div>
                <CornerDownRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}
        </div>

        {/* Diagnostic Inspector Card */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-rose-400">
                {active.layer} DIAGNOSIS: {active.name.toUpperCase()}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">{active.symptom}</p>
            </div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded font-bold"
              style={{ backgroundColor: `${active.color}20`, color: active.color }}
            >
              Step {selectedStep + 1}
            </span>
          </div>

          {/* Styled Command Box with Copy Button */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span>PRIMARY COMMAND TO EXECUTE:</span>
              <button
                onClick={() => handleCopy(active.command)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-black border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between overflow-x-auto max-w-full">
              <code className="whitespace-nowrap sm:whitespace-normal">$ {active.command}</code>
            </div>
          </div>

          {/* Forensic Check Points */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Forensic Output Analysis:</span>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">{active.whatToLookFor}</p>
          </div>

          {/* Recommended Resolution */}
          <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 space-y-1">
            <span className="text-xs font-bold text-emerald-300 block flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Corrective Action Plan:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{active.fix}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

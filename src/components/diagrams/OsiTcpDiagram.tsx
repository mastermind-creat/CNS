import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Shield, Cpu, ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';

interface LayerInfo {
  number: number;
  name: string;
  tcpLayer: string;
  pdu: string;
  protocols: string[];
  hardware: string;
  summary: string;
  analogy: string;
  color: string;
}

const LAYERS: LayerInfo[] = [
  {
    number: 7,
    name: 'Application',
    tcpLayer: 'Application',
    pdu: 'Data / Messages',
    protocols: ['HTTP/HTTPS', 'DNS', 'DHCP', 'SSH', 'FTP', 'SMTP'],
    hardware: 'Workstations, Web/Mail Servers',
    summary: 'Direct interface with user software; generates request payloads and formats responses.',
    analogy: 'Writing the actual letter text inside the envelope.',
    color: '#00E5FF'
  },
  {
    number: 6,
    name: 'Presentation',
    tcpLayer: 'Application',
    pdu: 'Formatted Data',
    protocols: ['TLS/SSL', 'JPEG', 'JSON', 'ASCII', 'MIME'],
    hardware: 'OS Crypto Subsystems, Compilers',
    summary: 'Data syntax translation, compression, and TLS/SSL cryptographic encryption.',
    analogy: 'Translating the letter into English and encrypting secret phrases.',
    color: '#38BDF8'
  },
  {
    number: 5,
    name: 'Session',
    tcpLayer: 'Application',
    pdu: 'Session Data',
    protocols: ['NetBIOS', 'RPC', 'Sockets', 'PPTP'],
    hardware: 'Operating System Session Manager',
    summary: 'Establishes, maintains, synchronizes, and terminates dialogues between applications.',
    analogy: 'Saying hello on the phone and confirming both parties can hear each other.',
    color: '#818CF8'
  },
  {
    number: 4,
    name: 'Transport',
    tcpLayer: 'Transport',
    pdu: 'Segments (TCP) / Datagrams (UDP)',
    protocols: ['TCP (Port 80/443)', 'UDP (Port 53/67)'],
    hardware: 'Stateful Firewalls, Load Balancers',
    summary: 'End-to-end transport, port-to-port multiplexing, flow control, and TCP 3-way handshake.',
    analogy: 'Tracking number stamped on certified parcel box with signature verification.',
    color: '#C084FC'
  },
  {
    number: 3,
    name: 'Network',
    tcpLayer: 'Internet',
    pdu: 'Packets (Datagrams)',
    protocols: ['IPv4', 'IPv6', 'ICMP', 'OSPF', 'BGP'],
    hardware: 'Routers, Layer 3 Switches',
    summary: 'Logical IP addressing, subnet masking, and hop-by-hop packet routing across internetworks.',
    analogy: 'Street address, city, state, and zip code written on the package label.',
    color: '#34D399'
  },
  {
    number: 2,
    name: 'Data Link',
    tcpLayer: 'Network Access',
    pdu: 'Frames',
    protocols: ['Ethernet (802.3)', 'Wi-Fi (802.11)', 'ARP', '802.1Q'],
    hardware: 'Ethernet Switches, Wireless APs, NICs',
    summary: 'Physical MAC addressing, frame framing, error checking (CRC/FCS), and local hop delivery.',
    analogy: 'Local delivery truck driver and specific delivery van route identifier.',
    color: '#FB923C'
  },
  {
    number: 1,
    name: 'Physical',
    tcpLayer: 'Network Access',
    pdu: 'Bits (1s and 0s)',
    protocols: ['1000BASE-T', 'EIA/TIA-568', 'V.92', 'RJ-45'],
    hardware: 'Cat6 Cables, Fiber Optics, Patch Panels, Hubs',
    summary: 'Transmission of raw unstructured bit streams over physical copper, light, or radio waves.',
    analogy: 'The physical asphalt highway pavement and tires moving the vehicle.',
    color: '#F43F5E'
  }
];

export const OsiTcpDiagram: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(3);
  const [encapsulationStep, setEncapsulationStep] = useState<number>(0);
  const [isEncapsulating, setIsEncapsulating] = useState<boolean>(false);

  const active = LAYERS.find(l => l.number === selectedLayer) || LAYERS[3];

  const triggerEncapsulation = () => {
    setIsEncapsulating(true);
    setEncapsulationStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      if (step > 5) {
        clearInterval(interval);
        setTimeout(() => setIsEncapsulating(false), 800);
      } else {
        setEncapsulationStep(step);
      }
    }, 600);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Layers className="w-4 h-4" />
            <span>Interactive Architecture Visualizer</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">OSI 7-Layer vs. TCP/IP 4-Layer Model</h4>
        </div>
        <button
          onClick={triggerEncapsulation}
          disabled={isEncapsulating}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 disabled:opacity-50 transition cursor-pointer self-start sm:self-auto"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>{isEncapsulating ? `Encapsulating Layer ${7 - encapsulationStep}...` : 'Simulate Encapsulation'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Side: Interactive Layer Stack */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-mono text-slate-400 mb-2 flex justify-between px-1">
            <span>OSI 7-LAYER STACK</span>
            <span>TCP/IP MAPPING</span>
          </div>

          {LAYERS.map((layer) => {
            const isSelected = layer.number === selectedLayer;
            const isHighlighted = isEncapsulating && (
              (encapsulationStep === 1 && layer.number >= 5) ||
              (encapsulationStep === 2 && layer.number === 4) ||
              (encapsulationStep === 3 && layer.number === 3) ||
              (encapsulationStep === 4 && layer.number === 2) ||
              (encapsulationStep === 5 && layer.number === 1)
            );

            return (
              <button
                key={layer.number}
                onClick={() => setSelectedLayer(layer.number)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400/80 bg-cyan-950/40 shadow-sm shadow-cyan-500/20'
                    : isHighlighted
                    ? 'border-emerald-400/80 bg-emerald-950/30 ring-1 ring-emerald-400/40'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0"
                    style={{ backgroundColor: `${layer.color}25`, color: layer.color }}
                  >
                    L{layer.number}
                  </span>
                  <div className="truncate">
                    <span className="text-sm font-semibold text-slate-200 block truncate">{layer.name}</span>
                    <span className="text-xs text-slate-400 font-mono block truncate">{layer.pdu}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                    {layer.tcpLayer}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Dive Layer Inspector */}
        <div className="lg:col-span-7 bg-slate-950/60 rounded-xl border border-slate-800 p-5 min-h-[360px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shadow-inner"
                    style={{ backgroundColor: `${active.color}25`, color: active.color, border: `1px solid ${active.color}50` }}
                  >
                    L{active.number}
                  </span>
                  <div>
                    <h5 className="text-base font-bold text-white">{active.name} Layer</h5>
                    <span className="text-xs text-slate-400 font-mono">PDU: {active.pdu}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  TCP/IP: {active.tcpLayer}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 leading-relaxed">{active.summary}</p>
              </div>

              {/* Analogy Callout */}
              <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs">
                <span className="font-semibold text-cyan-300 block mb-1">Postal Analogy</span>
                <span className="text-slate-300 leading-relaxed">{active.analogy}</span>
              </div>

              {/* Protocols & Hardware Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">Key Protocols</span>
                  <div className="flex flex-wrap gap-1.5">
                    {active.protocols.map((proto) => (
                      <span key={proto} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700/60">
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">Typical Hardware / Devices</span>
                  <p className="text-xs text-slate-300 font-mono">{active.hardware}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Encapsulation Header Visualizer */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 block mb-2">ENCAPSULATION HEADER PACKING:</span>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              <span className={`px-2 py-1 rounded border transition-colors ${selectedLayer <= 2 ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                [L2 MAC Header]
              </span>
              <span className={`px-2 py-1 rounded border transition-colors ${selectedLayer <= 3 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                [L3 IP Header]
              </span>
              <span className={`px-2 py-1 rounded border transition-colors ${selectedLayer <= 4 ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                [L4 TCP Port Header]
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                Payload Data (L7-L5)
              </span>
              <span className={`px-2 py-1 rounded border transition-colors ${selectedLayer <= 2 ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                [FCS Trailer]
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

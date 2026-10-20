import React, { useState } from 'react';
import { Calculator, Binary, Layers, Check, Copy, Sparkles, RefreshCw } from 'lucide-react';

export const InteractiveTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'subnet' | 'binary' | 'osi'>('subnet');

  // Subnet Calculator State
  const [ipInput, setIpInput] = useState<string>('192.168.1.135');
  const [cidrInput, setCidrInput] = useState<number>(26);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Binary Converter State
  const [bits, setBits] = useState<number[]>([1, 1, 0, 0, 0, 0, 0, 0]); // default 192

  // OSI Mnemonic State
  const [mnemonicType, setMnemonicType] = useState<'bottomUp' | 'topDown'>('bottomUp');

  // Binary conversions
  const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];
  const decimalValue = bits.reduce((acc, bit, idx) => acc + bit * bitWeights[idx], 0);

  const toggleBit = (index: number) => {
    const updated = [...bits];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setBits(updated);
  };

  const setFromDecimal = (dec: number) => {
    const val = Math.max(0, Math.min(255, dec));
    const newBits = [];
    for (let i = 0; i < 8; i++) {
      newBits.push((val & bitWeights[i]) ? 1 : 0);
    }
    setBits(newBits);
  };

  // Subnet Calculation logic
  const parseIp = (ipStr: string) => {
    const parts = ipStr.trim().split('.').map(Number);
    if (parts.length === 4 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255)) {
      return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    }
    return null;
  };

  const formatIp = (intVal: number) => {
    return [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ].join('.');
  };

  const formatBinary = (intVal: number) => {
    const octets = [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ];
    return octets.map(o => o.toString(2).padStart(8, '0')).join('.');
  };

  const ipInt = parseIp(ipInput) ?? 0;
  const maskInt = cidrInput === 0 ? 0 : (~0 << (32 - cidrInput));
  const wildcardInt = ~maskInt;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const hostBits = 32 - cidrInput;
  const totalAddresses = cidrInput >= 31 ? Math.pow(2, hostBits) : Math.pow(2, hostBits);
  const usableHosts = cidrInput === 32 ? 1 : cidrInput === 31 ? 2 : Math.max(0, Math.pow(2, hostBits) - 2);

  const firstUsableInt = cidrInput >= 31 ? networkInt : (networkInt + 1) >>> 0;
  const lastUsableInt = cidrInput >= 31 ? broadcastInt : (broadcastInt - 1) >>> 0;

  // Class & Private scope check
  const firstOctet = (ipInt >>> 24) & 255;
  let ipClass = 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
  else if (firstOctet >= 240) ipClass = 'Class E (Experimental)';

  let isPrivate = false;
  if (firstOctet === 10) isPrivate = true;
  else if (firstOctet === 172 && ((ipInt >>> 16) & 255) >= 16 && ((ipInt >>> 16) & 255) <= 31) isPrivate = true;
  else if (firstOctet === 192 && ((ipInt >>> 16) & 255) === 168) isPrivate = true;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <section id="tools" className="py-16 border-t border-slate-800 bg-[#090e1a]/90 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Essential Engineer Toolset</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Interactive Network Utility Workbench
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Real-time subnet calculator, 8-bit octet binary visualizer, and OSI model reference deck for instant lab calculations.
          </p>

          {/* Tool Segmented Tabs */}
          <div className="mt-6 flex flex-wrap sm:inline-flex justify-center p-1 rounded-xl bg-slate-950 border border-slate-800 shadow-lg max-w-full gap-1">
            <button
              onClick={() => setActiveTool('subnet')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-2 ${
                activeTool === 'subnet'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Subnet Calculator</span>
            </button>
            <button
              onClick={() => setActiveTool('binary')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-2 ${
                activeTool === 'binary'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Binary className="w-4 h-4" />
              <span>Binary ↔ Decimal</span>
            </button>
            <button
              onClick={() => setActiveTool('osi')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-2 ${
                activeTool === 'osi'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>OSI Explorer</span>
            </button>
          </div>
        </div>

        {/* TOOL 1: SUBNET CALCULATOR */}
        {activeTool === 'subnet' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs Column */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 block mb-2">
                    HOST IP ADDRESS
                  </label>
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="e.g. 192.168.1.135"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      CIDR PREFIX: /{cidrInput}
                    </label>
                    <span className="text-xs font-mono text-emerald-400">
                      Mask: {formatIp(maskInt)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="30"
                    value={cidrInput}
                    onChange={(e) => setCidrInput(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>/8 (Class A)</span>
                    <span>/16 (Class B)</span>
                    <span>/24 (Class C)</span>
                    <span>/30 (WAN)</span>
                  </div>
                </div>

                {/* Preset shortcuts */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">COMMON PRESETS:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { ip: '192.168.1.10', cidr: 24, label: 'SOHO /24' },
                      { ip: '172.16.50.15', cidr: 26, label: 'Dept /26' },
                      { ip: '10.0.0.95', cidr: 27, label: 'Office /27' },
                      { ip: '192.168.10.1', cidr: 28, label: 'Lab /28' },
                      { ip: '10.255.0.1', cidr: 30, label: 'WAN Link /30' },
                    ].map((pre) => (
                      <button
                        key={pre.label}
                        onClick={() => {
                          setIpInput(pre.ip);
                          setCidrInput(pre.cidr);
                        }}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 transition cursor-pointer"
                      >
                        {pre.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope & Class Badge */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">Class:</span>
                    <span className="text-slate-200 font-bold">{ipClass}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">Scope:</span>
                    <span className={`font-bold ${isPrivate ? 'text-emerald-400' : 'text-sky-400'}`}>
                      {isPrivate ? 'RFC 1918 Private LAN' : 'Public Routable WAN'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Outputs Column */}
              <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800 p-5 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-slate-400">
                  <span className="font-bold">CALCULATED SUBNET TELEMETRY</span>
                  <span>{usableHosts.toLocaleString()} Usable Hosts</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Network ID */}
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">NETWORK ADDRESS (ID)</span>
                      <span className="text-sm font-bold text-emerald-400">{formatIp(networkInt)}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatIp(networkInt), 'net')}
                      className="text-slate-400 hover:text-white transition p-1"
                      title="Copy"
                    >
                      {copiedField === 'net' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Broadcast */}
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">BROADCAST ADDRESS</span>
                      <span className="text-sm font-bold text-amber-400">{formatIp(broadcastInt)}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatIp(broadcastInt), 'bcast')}
                      className="text-slate-400 hover:text-white transition p-1"
                      title="Copy"
                    >
                      {copiedField === 'bcast' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* First Usable */}
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">FIRST USABLE HOST</span>
                      <span className="text-sm font-bold text-slate-200">{formatIp(firstUsableInt)}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatIp(firstUsableInt), 'first')}
                      className="text-slate-400 hover:text-white transition p-1"
                      title="Copy"
                    >
                      {copiedField === 'first' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Last Usable */}
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">LAST USABLE HOST</span>
                      <span className="text-sm font-bold text-slate-200">{formatIp(lastUsableInt)}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatIp(lastUsableInt), 'last')}
                      className="text-slate-400 hover:text-white transition p-1"
                      title="Copy"
                    >
                      {copiedField === 'last' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Subnet Mask & Wildcard */}
                <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subnet Mask:</span>
                    <span className="text-emerald-400 font-bold">{formatIp(maskInt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Wildcard Mask (ACLs):</span>
                    <span className="text-cyan-400 font-bold">{formatIp(wildcardInt)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Binary Mask:</span>
                    <span className="text-slate-300 font-mono">{formatBinary(maskInt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: BINARY OCTET VISUALIZER */}
        {activeTool === 'binary' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur shadow-2xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                  8-Bit IPv4 Octet Converter
                </span>
                <h3 className="text-xl font-bold text-white">Click any bit to toggle between 0 and 1</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each IPv4 address consists of 4 octets. Every octet is an 8-bit byte from 0 to 255.
                </p>
              </div>

              {/* Bit Switches */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                {bitWeights.map((weight, idx) => {
                  const bit = bits[idx];
                  return (
                    <button
                      key={weight}
                      onClick={() => toggleBit(idx)}
                      className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        bit === 1
                          ? 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/50'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-mono text-slate-400 block mb-1">
                        2^{7 - idx}
                      </span>
                      <span className={`text-2xl sm:text-3xl font-mono font-bold my-1 ${bit === 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {bit}
                      </span>
                      <span className={`text-xs font-mono font-semibold ${bit === 1 ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {weight}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Total Calculation Display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-300">
                  <span className="text-slate-400 block mb-1">EXPANDED FORMULA:</span>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {bitWeights.map((w, idx) => (
                      <span key={w} className={bits[idx] === 1 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                        ({bits[idx]} × {w}) {idx < 7 ? '+ ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-slate-400 block">DECIMAL VALUE:</span>
                  <span className="text-3xl font-mono font-bold text-emerald-400">{decimalValue}</span>
                </div>
              </div>

              {/* Quick Preset Subnet Mask Buttons */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400 block mb-2">COMMON NETWORKING OCTETS:</span>
                <div className="flex flex-wrap gap-2">
                  {[255, 254, 252, 248, 240, 224, 192, 128, 0].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFromDecimal(num)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition cursor-pointer ${
                        decimalValue === num
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: OSI MNEMONIC & PROTOCOL QUICK DECK */}
        {activeTool === 'osi' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  Quick Memory Aid
                </span>
                <h3 className="text-xl font-bold text-white">OSI 7-Layer Mnemonics & Hardware Guide</h3>
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => setMnemonicType('bottomUp')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
                    mnemonicType === 'bottomUp'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bottom-Up (L1 → L7)
                </button>
                <button
                  onClick={() => setMnemonicType('topDown')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
                    mnemonicType === 'topDown'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Top-Down (L7 → L1)
                </button>
              </div>
            </div>

            {/* Mnemonic Banner */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-center">
              <span className="text-xs font-mono text-cyan-400 uppercase block mb-1">
                {mnemonicType === 'bottomUp' ? 'Bottom-Up Acronym (Layer 1 to Layer 7)' : 'Top-Down Acronym (Layer 7 to Layer 1)'}
              </span>
              <p className="text-lg font-bold text-white font-display">
                {mnemonicType === 'bottomUp'
                  ? '"Please Do Not Throw Sausage Pizza Away"'
                  : '"All People Seem To Need Data Processing"'}
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { layer: 'L7 Application', pdu: 'Data', protocols: 'HTTP, DNS, DHCP, SSH', device: 'Client, Server' },
                { layer: 'L6 Presentation', pdu: 'Data', protocols: 'TLS/SSL, JSON, JPEG', device: 'OS Subsystems' },
                { layer: 'L5 Session', pdu: 'Data', protocols: 'RPC, Sockets, NetBIOS', device: 'OS Session API' },
                { layer: 'L4 Transport', pdu: 'Segments', protocols: 'TCP, UDP (Ports)', device: 'Firewall, Load Balancer' },
                { layer: 'L3 Network', pdu: 'Packets', protocols: 'IPv4, IPv6, ICMP', device: 'Router, L3 Switch' },
                { layer: 'L2 Data Link', pdu: 'Frames', protocols: 'Ethernet, 802.1Q, ARP', device: 'Switch, AP, NIC' },
                { layer: 'L1 Physical', pdu: 'Bits', protocols: '1000BASE-T, T568A/B', device: 'Cat6, Fiber, Hub' },
              ].map((row) => (
                <div key={row.layer} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 block">{row.layer}</span>
                  <div className="text-slate-300">PDU: {row.pdu}</div>
                  <div className="text-slate-400 truncate">Protocols: {row.protocols}</div>
                  <div className="text-slate-400 truncate">Hardware: {row.device}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export interface WeekSchedule {
  week: number;
  title: string;
  topicRef: string;
  focus: string;
  milestone: string;
  labRef?: string;
}

export interface UnitOverviewData {
  unitCode: string;
  unitTitle: string;
  level: string;
  estimatedHours: number;
  summary: string;
  learningOutcomes: string[];
  prerequisites: string[];
  requiredTools: {
    category: string;
    items: {
      name: string;
      type: 'Software' | 'Hardware' | 'Simulator';
      description: string;
      required: boolean;
    }[];
  }[];
  weeklyRoadmap: WeekSchedule[];
}

export const UNIT_OVERVIEW: UnitOverviewData = {
  unitCode: 'NET-201',
  unitTitle: 'Computer Network Setup & Systems Administration',
  level: 'Undergraduate / Vocational Technical',
  estimatedHours: 48,
  summary: 'A comprehensive, hands-on journey from physical cable crimping and network standards to Layer 2 switching, subnets, enterprise routing, core services (DHCP/DNS/NAT), and layered forensic troubleshooting. Designed for students seeking Cisco CCNA, CompTIA Network+, and real-world system administrator skills.',
  learningOutcomes: [
    'Terminate, crimp, and certify EIA/TIA T568A and T568B straight-through and crossover UTP cables.',
    'Design, segment, and calculate VLSM IPv4 address plans for departmental enterprise networks.',
    'Configure managed Cisco Catalyst switches with VLANs, 802.1Q trunking, and port security.',
    'Implement inter-VLAN routing using Router-on-a-Stick and configure static routes with default gateways.',
    'Deploy and troubleshoot enterprise wireless access points (WPA2/WPA3) and non-overlapping channel plans.',
    'Configure core infrastructure services including DHCP address pools, DNS forwarders, and NAT/PAT.',
    'Apply standard/extended Access Control Lists (ACLs) to filter unauthorized traffic.',
    'Diagnose and isolate multi-layer network failures using ping, tracert, nslookup, netstat, and Wireshark.'
  ],
  prerequisites: [
    'Basic computer literacy and comfort with terminal/command line interfaces.',
    'Understanding of basic binary arithmetic (powers of 2: 1, 2, 4, 8, 16, 32, 64, 128).',
    'No prior networking hardware experience required — this unit starts from the physical wire!'
  ],
  requiredTools: [
    {
      category: 'Software & Simulators',
      items: [
        {
          name: 'Cisco Packet Tracer (v8.2+)',
          type: 'Simulator',
          description: 'Official free network simulation software from Cisco Networking Academy for simulating routers, switches, and PCs.',
          required: true
        },
        {
          name: 'GNS3 or EVE-NG',
          type: 'Simulator',
          description: 'Advanced virtual network simulator running actual Cisco IOS images and virtual appliances (optional for capstones).',
          required: false
        },
        {
          name: 'Wireshark Packet Analyzer',
          type: 'Software',
          description: 'Industry-standard open source packet capture tool for inspecting frame headers, TCP flags, and ARP requests.',
          required: true
        },
        {
          name: 'Terminal Emulator (PuTTY / Tera Term)',
          type: 'Software',
          description: 'Serial console emulator for connecting to real physical switch/router console ports via RJ45-to-USB rollover cables.',
          required: true
        }
      ]
    },
    {
      category: 'Physical Lab Hardware',
      items: [
        {
          name: 'Cat5e / Cat6 Bulk Cable Spool',
          type: 'Hardware',
          description: 'Unshielded Twisted Pair (UTP) solid or stranded 24 AWG copper cable for hands-on terminating.',
          required: true
        },
        {
          name: 'RJ-45 8P8C Modular Connectors & Boots',
          type: 'Hardware',
          description: 'Pass-through or standard 8-pin clear plastic connectors and protective rubber snagless strain-relief boots.',
          required: true
        },
        {
          name: 'RJ-45 Ratcheting Crimper & Wire Stripper',
          type: 'Hardware',
          description: 'Precision ratcheting tool for pressing gold pins into copper wires and trimming excess wire leads.',
          required: true
        },
        {
          name: 'Handheld RJ-45 Continuity Cable Tester',
          type: 'Hardware',
          description: 'Battery-powered LED sequencer checking pin 1-8 continuity and detecting open, short, or crossed pairs.',
          required: true
        },
        {
          name: 'Cisco Catalyst 2960 / 3560 Switch & 1941/2901 Router',
          type: 'Hardware',
          description: 'Physical lab rack hardware or virtualized equivalents inside Packet Tracer for configuring live networks.',
          required: true
        }
      ]
    }
  ],
  weeklyRoadmap: [
    {
      week: 1,
      title: 'Foundations of Networking',
      topicRef: 'Network Fundamentals',
      focus: 'OSI 7-Layer vs TCP/IP 4-Layer models, PDUs, encapsulation, and packet flow.',
      milestone: 'Can explain the life of a packet from browser click to server response.',
      labRef: 'Lab 2: Building a Small LAN'
    },
    {
      week: 2,
      title: 'Physical Layer & Cable Fabrication',
      topicRef: 'Cabling & Hardware',
      focus: 'UTP Cat6 characteristics, T568A/B standards, fiber optic links, and termination tools.',
      milestone: 'Successfully crimp a Cat6 cable and pass an 8-LED continuity test.',
      labRef: 'Lab 1: Crimping UTP Cables'
    },
    {
      week: 3,
      title: 'IP Addressing & Binary Mechanics',
      topicRef: 'IP Addressing & Subnetting',
      focus: 'IPv4 32-bit architecture, binary octet conversions, RFC 1918 private IP blocks.',
      milestone: 'Rapid mental conversion of binary octets (11000000 = 192).',
      labRef: 'Lab 3: Static IP Configuration'
    },
    {
      week: 4,
      title: 'Subnetting & VLSM Architecture',
      topicRef: 'IP Addressing & Subnetting',
      focus: 'CIDR prefixes, custom subnet masks (/25 to /30), network & broadcast IDs.',
      milestone: 'Design a 4-department address plan without wasting host address space.',
      labRef: 'Lab 4: Subnetting a Network'
    },
    {
      week: 5,
      title: 'Layer 2 Switching & VLAN Isolation',
      topicRef: 'Switching & VLANs',
      focus: 'Collision/broadcast domains, CAM tables, 802.1Q tags, access and trunk ports.',
      milestone: 'Isolate HR and Student traffic onto separate VLANs on a managed switch.',
      labRef: 'Lab 5: VLANs & Trunking'
    },
    {
      week: 6,
      title: 'Inter-VLAN Routing & Default Gateways',
      topicRef: 'Routing',
      focus: 'Router-on-a-stick, sub-interfaces, static routes, gateway of last resort.',
      milestone: 'Successfully ping across different VLANs through a router sub-interface.',
      labRef: 'Lab 7: Router Setup'
    },
    {
      week: 7,
      title: 'Wireless LAN Architecture',
      topicRef: 'Wireless',
      focus: '802.11ax/ac, 2.4/5/6GHz spectrums, non-overlapping channel planning, WPA2/WPA3.',
      milestone: 'Deploy an enterprise AP with secure SSID and verified channel spacing.',
      labRef: 'Lab 7: AP Configuration'
    },
    {
      week: 8,
      title: 'Core Infrastructure: DHCP & DNS',
      topicRef: 'Network Services',
      focus: 'DHCP DORA 4-way exchange, lease scopes, DNS forwarders and resource records.',
      milestone: 'Set up automated client addressing and local domain name resolution.',
      labRef: 'Lab 6: DHCP & DNS Setup'
    },
    {
      week: 9,
      title: 'Perimeter Defense: NAT & ACLs',
      topicRef: 'Security & Troubleshooting',
      focus: 'Port Address Translation (PAT/Overload), Standard and Extended Cisco ACLs.',
      milestone: 'Write an ACL blocking ICMP and Telnet while permitting HTTPS.',
      labRef: 'Lab 8: Firewall & ACL Setup'
    },
    {
      week: 10,
      title: 'Forensic Troubleshooting & Capstone Exam',
      topicRef: 'Security & Troubleshooting',
      focus: 'Bottom-up methodology, ping/tracert analysis, netstat, Wireshark packet captures.',
      milestone: 'Troubleshoot and fix 3 deliberate network faults in under 30 minutes.',
      labRef: 'Lab 9: Troubleshooting Toolkit'
    }
  ]
};

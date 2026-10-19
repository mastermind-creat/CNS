import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Network Fundamentals (Topic 1)
  {
    id: 1,
    topicId: 'fundamentals',
    question: 'Which layer of the OSI model is responsible for end-to-end flow control, error recovery, and segmentation?',
    options: ['Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport', 'Layer 5 - Session'],
    correctIndex: 2,
    explanation: 'Layer 4 (Transport layer), using protocols like TCP, handles segmentation of data streams, acknowledgments, retransmissions, and flow control.'
  },
  {
    id: 2,
    topicId: 'fundamentals',
    question: 'What is the Protocol Data Unit (PDU) at Layer 3 of the OSI model called?',
    options: ['Frame', 'Packet (Datagram)', 'Segment', 'Bits'],
    correctIndex: 1,
    explanation: 'At Layer 3 (Network), data is encapsulated into Packets (or Datagrams). Layer 2 uses Frames, Layer 4 uses Segments, and Layer 1 transmits raw Bits.'
  },
  {
    id: 3,
    topicId: 'fundamentals',
    question: 'Which sequence of flags represents the classic TCP three-way handshake used to establish a reliable connection?',
    options: ['SYN -> ACK -> SYN-ACK', 'SYN -> SYN-ACK -> ACK', 'FIN -> ACK -> FIN-ACK', 'RST -> SYN -> ACK'],
    correctIndex: 1,
    explanation: 'The TCP handshake begins with the client sending a SYN (Synchronize), the server responding with SYN-ACK, and the client acknowledging with an ACK.'
  },
  {
    id: 4,
    topicId: 'fundamentals',
    question: 'In the TCP/IP stack, which layer corresponds directly to the combination of OSI Layers 5, 6, and 7?',
    options: ['Internet Layer', 'Transport Layer', 'Application Layer', 'Network Access Layer'],
    correctIndex: 2,
    explanation: 'The TCP/IP Application layer encompasses the Session, Presentation, and Application layers of the OSI model.'
  },
  {
    id: 5,
    topicId: 'fundamentals',
    question: 'Why does live video streaming or VoIP voice calling typically rely on UDP rather than TCP?',
    options: [
      'UDP encrypts video packets automatically',
      'UDP guarantees 100% error-free delivery',
      'UDP has lower overhead and avoids delayed retransmissions that cause jitter',
      'UDP can only operate over fiber optic cables'
    ],
    correctIndex: 2,
    explanation: 'UDP does not wait for acknowledgments or retransmit lost packets, making it far better suited for real-time traffic where timeliness matters more than perfection.'
  },

  // Cabling & Hardware (Topic 2)
  {
    id: 6,
    topicId: 'cabling',
    question: 'What is the color of Pin 1 in the standard EIA/TIA T568B wiring scheme?',
    options: ['White-Green', 'White-Orange', 'Solid Blue', 'Solid Orange'],
    correctIndex: 1,
    explanation: 'In T568B, Pin 1 is White-Orange, followed by Pin 2 Orange. (In T568A, Pin 1 is White-Green).'
  },
  {
    id: 7,
    topicId: 'cabling',
    question: 'Why are copper wire pairs in Category 6 UTP cables twisted around each other?',
    options: [
      'To make the cable stronger and less likely to break when pulled',
      'To cancel out electromagnetic interference and near-end crosstalk (NEXT)',
      'To increase electrical resistance and slow down packet collisions',
      'To differentiate send lines from receive lines visually'
    ],
    correctIndex: 1,
    explanation: 'Twisting the pair causes external electromagnetic noise to affect both wires equally; differential signaling subtracts the noise out at the receiver.'
  },
  {
    id: 8,
    topicId: 'cabling',
    question: 'When connecting a PC directly to another PC without a switch (and without Auto-MDIX), what cable is required?',
    options: ['Straight-through cable', 'Crossover cable', 'Rollover console cable', 'Single-mode optical fiber'],
    correctIndex: 1,
    explanation: 'A crossover cable (T568A on one end, T568B on the other) crosses pins 1/2 (Tx) with pins 3/6 (Rx) so the transmit pins on one device connect to receive pins on the other.'
  },
  {
    id: 9,
    topicId: 'cabling',
    question: 'What is the maximum certified channel length for Cat6 Ethernet running 1 Gbps over twisted pair copper?',
    options: ['50 meters (164 feet)', '100 meters (328 feet)', '250 meters (820 feet)', '500 meters (1640 feet)'],
    correctIndex: 1,
    explanation: 'The maximum standard channel distance for twisted pair copper Ethernet (Cat5e/6/6a at standard speeds) is 100 meters (90m horizontal + 10m patch).'
  },
  {
    id: 10,
    topicId: 'cabling',
    question: 'What type of fiber optic cable has a very small core (~9 microns) and is designed for long-distance carrier backbones?',
    options: ['Multi-mode Fiber (MMF)', 'Single-mode Fiber (SMF)', 'Cat6a Shielded (STP)', 'Coaxial RG-6'],
    correctIndex: 1,
    explanation: 'Single-mode fiber uses a narrow core and laser light to transmit signals tens of kilometers without modal dispersion.'
  },

  // IP Addressing & Subnetting (Topic 3)
  {
    id: 11,
    topicId: 'subnetting',
    question: 'How many usable host IP addresses are available in a /26 IPv4 subnet?',
    options: ['30', '62', '64', '126'],
    correctIndex: 1,
    explanation: 'A /26 has 32 - 26 = 6 host bits. 2^6 = 64 total addresses. Minus 2 (network ID & broadcast) gives 62 usable host addresses.'
  },
  {
    id: 12,
    topicId: 'subnetting',
    question: 'What is the dotted decimal subnet mask corresponding to a /28 CIDR prefix?',
    options: ['255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248'],
    correctIndex: 2,
    explanation: 'A /28 mask has 28 ones: 8 + 8 + 8 + 4. The last octet has 4 ones (128 + 64 + 32 + 16 = 240). Thus, 255.255.255.240.'
  },
  {
    id: 13,
    topicId: 'subnetting',
    question: 'For the host IP 192.168.1.135 with subnet mask 255.255.255.192 (/26), what is the Network ID?',
    options: ['192.168.1.0', '192.168.1.64', '192.168.1.128', '192.168.1.192'],
    correctIndex: 2,
    explanation: 'The block size is 256 - 192 = 64. Subnets are .0, .64, .128, .192. Since 135 falls between 128 and 191, the Network ID is 192.168.1.128.'
  },
  {
    id: 14,
    topicId: 'subnetting',
    question: 'Which of the following is a private IPv4 address as defined by RFC 1918?',
    options: ['172.33.10.5', '192.169.1.1', '10.250.1.99', '11.0.0.1'],
    correctIndex: 2,
    explanation: '10.0.0.0/8 is reserved for private networks. (172.16.0.0 to 172.31.255.255 is private, so 172.33.x is public).'
  },
  {
    id: 15,
    topicId: 'subnetting',
    question: 'What is the broadcast address for the subnet 10.0.0.32/29?',
    options: ['10.0.0.39', '10.0.0.40', '10.0.0.31', '10.0.0.63'],
    correctIndex: 0,
    explanation: 'A /29 mask has a block size of 2^(32-29) = 2^3 = 8. Subnet range: 10.0.0.32 to 10.0.0.39. Broadcast is the highest address: 10.0.0.39.'
  },
  {
    id: 16,
    topicId: 'subnetting',
    question: 'Convert the 8-bit binary number 11010010 into its decimal equivalent:',
    options: ['202', '210', '198', '218'],
    correctIndex: 1,
    explanation: '128 + 64 + 0 + 16 + 0 + 0 + 2 + 0 = 210.'
  },

  // Switching & VLANs (Topic 4)
  {
    id: 17,
    topicId: 'switching',
    question: 'How does an Ethernet switch learn MAC addresses to populate its Content Addressable Memory (CAM) table?',
    options: [
      'By inspecting the Destination MAC address of incoming frames',
      'By inspecting the Source MAC address of incoming frames',
      'By periodically broadcasting ICMP requests to all connected ports',
      'By asking the default gateway router via DHCP'
    ],
    correctIndex: 1,
    explanation: 'A switch examines the Source MAC address of every arriving frame and binds that MAC address to the physical port on which it arrived.'
  },
  {
    id: 18,
    topicId: 'switching',
    question: 'What action does a switch take when receiving a unicast frame with an unknown destination MAC address?',
    options: [
      'It drops the frame silently',
      'It sends an ICMP destination unreachable message back',
      'It floods the frame out all ports in the same VLAN except the ingress port',
      'It forwards the frame only to the default gateway'
    ],
    correctIndex: 2,
    explanation: 'Unknown unicast flooding: the switch floods the frame across all ports in that VLAN (except the port it arrived on) to find the destination.'
  },
  {
    id: 19,
    topicId: 'switching',
    question: 'Which standard protocol defines the 4-byte header tag added to Ethernet frames across switch trunk links?',
    options: ['IEEE 802.11ac', 'IEEE 802.1Q', 'IEEE 802.3u', 'IEEE 802.1X'],
    correctIndex: 1,
    explanation: 'IEEE 802.1Q is the industry standard for VLAN tagging across trunk links.'
  },
  {
    id: 20,
    topicId: 'switching',
    question: 'What is the purpose of the Spanning Tree Protocol (STP, 802.1D)?',
    options: [
      'To speed up routing between subnets',
      'To prevent Layer 2 switching loops and broadcast storms on redundant links',
      'To assign IP addresses dynamically to client ports',
      'To encrypt trunk traffic across switches'
    ],
    correctIndex: 1,
    explanation: 'STP places redundant switch links into a blocking state to avoid infinite loops and broadcast storms, unblocking them if an active link fails.'
  },
  {
    id: 21,
    topicId: 'switching',
    question: 'On a Cisco switch, which command places an interface into access mode for VLAN 30?',
    options: [
      'switchport trunk allowed vlan 30',
      'switchport mode access followed by switchport access vlan 30',
      'vlan 30 interface enable',
      'encapsulation dot1q 30'
    ],
    correctIndex: 1,
    explanation: 'First configure `switchport mode access`, then assign the specific VLAN with `switchport access vlan 30`.'
  },

  // Routing (Topic 5)
  {
    id: 22,
    topicId: 'routing',
    question: 'When a router forwards an IPv4 packet across a hop, which field in the IPv4 header is decremented by 1?',
    options: ['Protocol', 'Total Length', 'Time to Live (TTL)', 'Checksum'],
    correctIndex: 2,
    explanation: 'The TTL field is decremented by 1 at each router hop. If it reaches 0, the packet is discarded and an ICMP Time Exceeded is returned to prevent loops.'
  },
  {
    id: 23,
    topicId: 'routing',
    question: 'What Cisco IOS command configures a default static route pointing to next-hop IP 192.168.1.254?',
    options: [
      'ip default-gateway 192.168.1.254',
      'ip route 0.0.0.0 0.0.0.0 192.168.1.254',
      'ip forward 255.255.255.255 192.168.1.254',
      'router rip 192.168.1.254'
    ],
    correctIndex: 1,
    explanation: '`ip route 0.0.0.0 0.0.0.0 <next-hop>` sets the Gateway of Last Resort (default route) on a Cisco router.'
  },
  {
    id: 24,
    topicId: 'routing',
    question: 'In "Router-on-a-Stick" inter-VLAN routing, what allows multiple VLANs to traverse a single physical router port?',
    options: [
      'Multiple MAC addresses on the switchport',
      'Logical sub-interfaces with 802.1Q encapsulation',
      'Port aggregation LACP',
      'NAT Overload'
    ],
    correctIndex: 1,
    explanation: 'Sub-interfaces (like g0/0.10 and g0/0.20) are logical divisions of one physical port, each tagged with `encapsulation dot1Q <vlan-id>`.'
  },
  {
    id: 25,
    topicId: 'routing',
    question: 'How does a router decide which route to use when multiple entries match a packet destination in the routing table?',
    options: [
      'Random selection to balance load',
      'Shortest prefix match (least specific)',
      'Longest prefix match (most specific / highest mask)',
      'The route configured earliest in time'
    ],
    correctIndex: 2,
    explanation: 'Routers always prioritize the Longest Prefix Match (e.g. /28 is chosen over /24 because it is more specific).'
  },
  {
    id: 26,
    topicId: 'routing',
    question: 'What is the role of ARP (Address Resolution Protocol) when a PC wants to send a packet to a host on a DIFFERENT subnet?',
    options: [
      'The PC sends an ARP request for the destination host IP',
      'The PC sends an ARP request for its Default Gateway MAC address',
      'The PC asks DNS for the MAC address',
      'ARP is not used across different subnets'
    ],
    correctIndex: 1,
    explanation: 'Because the destination is remote, the PC must encapsulate the packet in a Layer 2 frame destined for its Default Gateway’s MAC address.'
  },

  // Wireless (Topic 6)
  {
    id: 27,
    topicId: 'wireless',
    question: 'Which three channels in the 2.4 GHz spectrum are completely non-overlapping in North America?',
    options: ['1, 2, and 3', '1, 6, and 11', '6, 8, and 12', '2, 7, and 11'],
    correctIndex: 1,
    explanation: 'Channels 1, 6, and 11 are spaced 25 MHz apart, preventing adjacent-channel interference in the 2.4 GHz band.'
  },
  {
    id: 28,
    topicId: 'wireless',
    question: 'Why does Wi-Fi use CSMA/CA (Collision Avoidance) instead of Ethernet CSMA/CD (Collision Detection)?',
    options: [
      'Radio antennas cannot transmit and listen at the same time on the same channel',
      'Collision detection is forbidden by FCC regulations',
      'Wireless signals do not suffer from collisions',
      'Ethernet does not support full duplex'
    ],
    correctIndex: 0,
    explanation: 'RF transmission power drowns out incoming signals at the antenna, making simultaneous collision detection impossible; devices must avoid collisions by listening first and waiting random backoffs.'
  },
  {
    id: 29,
    topicId: 'wireless',
    question: 'What major security improvement does WPA3 introduce over WPA2-Personal?',
    options: [
      'Elimination of passwords entirely',
      'Simultaneous Authentication of Equals (SAE) protecting against offline dictionary attacks',
      'Faster Wi-Fi speeds by removing encryption overhead',
      'Limiting access to Apple devices only'
    ],
    correctIndex: 1,
    explanation: 'WPA3 replaces the vulnerable 4-way PSK handshake with SAE (Dragonfly protocol), preventing attackers from capturing handshakes and cracking passwords offline.'
  },
  {
    id: 30,
    topicId: 'wireless',
    question: 'What is the term for the unique 48-bit hardware MAC address of a wireless radio transmitting an SSID?',
    options: ['ESSID', 'BSSID', 'VLAN ID', 'WLAN ID'],
    correctIndex: 1,
    explanation: 'The BSSID (Basic Service Set Identifier) is the physical MAC address of the AP radio interface.'
  },
  {
    id: 31,
    topicId: 'wireless',
    question: 'Compared to 2.4 GHz, what is a primary characteristic of the 5 GHz Wi-Fi frequency band?',
    options: [
      'Greater distance and superior wall penetration',
      'Higher throughput and more non-overlapping channels, but shorter physical range',
      'Only supports up to 54 Mbps max speed',
      'Interferes heavily with microwave ovens'
    ],
    correctIndex: 1,
    explanation: 'Higher frequencies (5 GHz) attenuate faster through solid materials (shorter range) but provide wider bandwidth channels and far less congestion.'
  },

  // Network Services (Topic 7)
  {
    id: 32,
    topicId: 'services',
    question: 'What is the correct 4-step sequence of messages exchanged during a standard DHCP IPv4 lease negotiation?',
    options: [
      'Request, Offer, Discover, Acknowledge',
      'Discover, Offer, Request, Acknowledge (DORA)',
      'Solicit, Advertise, Request, Reply',
      'Connect, Negotiate, Lease, Confirm'
    ],
    correctIndex: 1,
    explanation: 'The classic DHCP handshake is D-O-R-A: Discover (client broadcast), Offer (server reply), Request (client selection), Acknowledge (server confirmation).'
  },
  {
    id: 33,
    topicId: 'services',
    question: 'Which DNS resource record type maps a domain name directly to an IPv6 address?',
    options: ['A Record', 'AAAA Record', 'CNAME Record', 'PTR Record'],
    correctIndex: 1,
    explanation: 'An A record maps to a 32-bit IPv4 address; a quadruple-A (AAAA) record maps to a 128-bit IPv6 address.'
  },
  {
    id: 34,
    topicId: 'services',
    question: 'How does Port Address Translation (PAT / NAT Overload) allow hundreds of internal LAN devices to share one public IP?',
    options: [
      'By assigning each device a different public subnet',
      'By mapping internal IP addresses to unique Layer 4 source port numbers on the public IP',
      'By rotating the public IP every 5 seconds',
      'By converting IPv4 packets to IPv6'
    ],
    correctIndex: 1,
    explanation: 'PAT tracks connections using unique source port numbers (e.g. 192.168.1.10:52412 -> 203.0.113.1:52412).'
  },
  {
    id: 35,
    topicId: 'services',
    question: 'What standard UDP port numbers are utilized by DHCP clients and servers?',
    options: ['Ports 20 and 21', 'Ports 53 and 54', 'Ports 67 (Server) and 68 (Client)', 'Ports 80 and 443'],
    correctIndex: 2,
    explanation: 'DHCP servers listen on UDP port 67, and DHCP clients listen on UDP port 68.'
  },
  {
    id: 36,
    topicId: 'services',
    question: 'What does a computer assign itself if it fails to receive a response from a DHCP server on the local subnet?',
    options: [
      'A loopback address (127.0.0.1)',
      'An APIPA address in the range 169.254.0.1 to 169.254.255.254',
      'The IP address 0.0.0.0',
      'The IP address of the Default Gateway'
    ],
    correctIndex: 1,
    explanation: 'Automatic Private IP Addressing (APIPA) assigns an address in the 169.254.0.0/16 range when no DHCP server answers.'
  },

  // Security & Troubleshooting (Topic 8)
  {
    id: 37,
    topicId: 'security',
    question: 'What invisible rule is automatically placed at the end of every Cisco Access Control List (ACL)?',
    options: [
      'Permit any any',
      'Implicit deny any (drops all unmatched traffic)',
      'Log all packets to syslog',
      'Forward to default gateway'
    ],
    correctIndex: 1,
    explanation: 'Every ACL ends with an invisible implicit deny. If a packet does not match any configured permit statement, it is discarded.'
  },
  {
    id: 38,
    topicId: 'security',
    question: 'What is the diagnostic difference between a Cisco Standard ACL and an Extended ACL?',
    options: [
      'Standard ACLs filter only on source IP; Extended ACLs filter on source, destination, protocol, and port',
      'Standard ACLs filter on port 80; Extended ACLs filter on port 443',
      'Standard ACLs are applied to routers; Extended ACLs are applied only to switches',
      'Standard ACLs are encrypted; Extended ACLs are plain text'
    ],
    correctIndex: 0,
    explanation: 'Standard ACLs (numbered 1-99) only evaluate Source IP. Extended ACLs (numbered 100-199) evaluate Source IP, Destination IP, Layer 4 Protocol (TCP/UDP/ICMP), and Port numbers.'
  },
  {
    id: 39,
    topicId: 'security',
    question: 'When troubleshooting bottom-up, what should an engineer verify FIRST when a user cannot open a website?',
    options: [
      'Check the website SSL certificate expiration date',
      'Verify physical cable connection, link lights, and NIC driver status',
      'Flush the DNS client cache with `ipconfig /flushdns`',
      'Reboot the core router'
    ],
    correctIndex: 1,
    explanation: 'Bottom-up methodology starts at Layer 1 (Physical). Always confirm the cable is plugged in and has link lights before checking software layers.'
  },
  {
    id: 40,
    topicId: 'security',
    question: 'What command-line utility displays all active TCP connections, listening ports, and corresponding process IDs (PIDs) on Windows?',
    options: ['ping -a', 'tracert', 'netstat -ano', 'nslookup -type=all'],
    correctIndex: 2,
    explanation: '`netstat -ano` lists active connections (-a), numerical addresses (-n), and owning Process IDs (-o).'
  },
  {
    id: 41,
    topicId: 'security',
    question: 'A user can ping 8.8.8.8 successfully but receives "Server Not Found" when browsing to `www.cisco.com`. What is the root cause?',
    options: [
      'Physical Ethernet cable is unplugged',
      'Default Gateway router has crashed',
      'DNS resolution is failing or DNS server IP is misconfigured',
      'Subnet mask is set to 255.255.255.255'
    ],
    correctIndex: 2,
    explanation: 'Because IP routing to 8.8.8.8 works, Layers 1-3 are healthy. Inability to reach domain names indicates Layer 7 DNS failure.'
  },
  {
    id: 42,
    topicId: 'security',
    question: 'In Wireshark, what does a continuous flood of ARP Requests asking "Who has 192.168.1.1? Tell 192.168.1.50" with no replies indicate?',
    options: [
      'Normal TCP three-way handshake',
      'The destination device (192.168.1.1) is offline, disconnected, or on a different physical segment',
      'The DNS server is busy',
      'The MTU size has been exceeded'
    ],
    correctIndex: 1,
    explanation: 'ARP requests broadcast at Layer 2 to discover the MAC address of an IP. Repeated unacknowledged requests mean the target IP is unreachable or offline.'
  }
];

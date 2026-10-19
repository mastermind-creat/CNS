import { TopicData } from '../types';

export const TOPICS: TopicData[] = [
  {
    id: 'fundamentals',
    number: '01',
    title: 'Network Fundamentals',
    colorName: 'Electric Blue',
    colorHex: '#00E5FF',
    colorClass: 'text-[#00E5FF]',
    shortDesc: 'OSI 7-Layer Model, TCP/IP Stack, topologies, and how packets travel.',
    overview: 'Before configuring hardware, you must understand how data transforms from application text into electrical pulses or light waves. The OSI and TCP/IP models provide the mental map for every networking protocol.',
    analogyTitle: 'The Global Postal Service Analogy',
    analogyStory: 'Think of sending a letter internationally: Layer 7 (Application) is your letter text. Layer 6 (Presentation) translates it to English. Layer 5 (Session) starts the conversation. Layer 4 (Transport) puts it in a tracked envelope (TCP) with sequence numbers. Layer 3 (Network) writes the destination street address (IP). Layer 2 (Data Link) places it in the delivery van route (MAC address). Layer 1 (Physical) is the asphalt road and truck wheels moving the physical envelope.',
    keyTerms: [
      {
        term: 'OSI Model',
        definition: 'Open Systems Interconnection 7-layer reference framework: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
        analogy: 'A 7-story office building where every department has one specific job before handing work down the chute.'
      },
      {
        term: 'TCP/IP Model',
        definition: 'The 4-layer practical architecture used across the real Internet: Network Access, Internet, Transport, and Application.',
        analogy: 'The streamlined commercial shipping express version of the formal 7-layer postal theory.'
      },
      {
        term: 'Encapsulation & Decapsulation',
        definition: 'Adding protocol headers as data moves down the stack (Data -> Segment -> Packet -> Frame -> Bits) and stripping them on arrival.',
        analogy: 'Nesting Russian Matryoshka dolls when packaging, and peeling each layer off upon opening.'
      },
      {
        term: 'TCP vs. UDP',
        definition: 'TCP is connection-oriented, reliable with 3-way handshake (SYN, SYN-ACK, ACK); UDP is connectionless, fast, and best-effort with no guarantees.',
        analogy: 'TCP is certified mail requiring a signed receipt. UDP is tossing flyers out of an airplane.'
      }
    ],
    quickTip: 'Remember the OSI layers from bottom-to-top with: "Please Do Not Throw Sausage Pizza Away" (Physical, Data Link, Network, Transport, Session, Presentation, Application)!',
    commonMistake: 'Confusing Bandwidth with Latency. Bandwidth is the width of the highway (how many lanes of cars can fit); latency is the speed limit (how long it takes one car to reach the exit).',
    labRefId: 'lab-2'
  },
  {
    id: 'cabling',
    number: '02',
    title: 'Cabling & Hardware',
    colorName: 'Orange',
    colorHex: '#FF8A00',
    colorClass: 'text-[#FF8A00]',
    shortDesc: 'Twisted pair UTP, T568A/B standards, fiber optics, switches, routers, and patch panels.',
    overview: 'Physical layer reliability accounts for over 70% of network downtime. Learn how Cat5e/Cat6 copper twisted pairs cancel electromagnetic interference and how to terminate RJ-45 jacks correctly.',
    analogyTitle: 'Plumbing & Pipes of the Digital Highway',
    analogyStory: 'If software is the water in a city, cabling is the copper and PVC plumbing. UTP cables twist copper pairs together so electrical noise hitting one wire cancels out on the opposing twin wire (differential signaling). Use the wrong color pinout sequence or pinch the bend radius, and your digital water pressure drops to zero.',
    keyTerms: [
      {
        term: 'T568A vs T568B',
        definition: 'Standard color-coding wiring schemes for RJ-45 8P8C connectors. T568B is the dominant standard in commercial North American and global LANs.',
        analogy: 'Standardized electrical wiring codes: white-orange/orange vs white-green/green at pins 1-2.'
      },
      {
        term: 'Straight-Through vs Crossover',
        definition: 'Straight-through has identical pinouts (B to B) for connecting unlike devices (PC to Switch). Crossover has A on one end and B on the other for connecting like devices (Switch to Switch, PC to PC).',
        analogy: 'Two phones talking: one mouth must talk into an ear, not a mouth into another mouth.'
      },
      {
        term: 'Cat5e vs Cat6 vs Fiber',
        definition: 'Cat5e supports up to 1 Gbps at 100MHz; Cat6 handles 10 Gbps up to 55m at 250MHz; Single-mode / Multi-mode Fiber uses light pulses for long distances without EMI.',
        analogy: 'Bicycle trail (Cat5e) vs paved 4-lane highway (Cat6) vs high-speed maglev train tube (Fiber).'
      },
      {
        term: 'Patch Panel & Keystones',
        definition: 'A passive structural board mounted in a server rack that consolidates incoming horizontal wall runs with punch-down 110 blocks.',
        analogy: 'The master electrical circuit breaker box inside your basement.'
      }
    ],
    quickTip: 'Always maintain wire twists right up to within 1/2 inch (12.7 mm) of the RJ-45 plug contacts. Untwisting too much wire before crimping introduces Near-End Crosstalk (NEXT) that drops Gigabit links to 100Mbps.',
    commonMistake: 'Stripping off too much outer jacket so the cable strain relief tab inside the RJ-45 clamp pinches bare wires instead of the tough PVC sheath. A tug will tear the copper out.',
    labRefId: 'lab-1'
  },
  {
    id: 'subnetting',
    number: '03',
    title: 'IP Addressing & Subnetting',
    colorName: 'Neon Green',
    colorHex: '#00FF66',
    colorClass: 'text-[#00FF66]',
    shortDesc: 'IPv4 32-bit math, CIDR prefixes, subnet masks, binary conversions, and VLSM slicing.',
    overview: 'IP addresses uniquely identify hosts on internetworks. Master the 8-bit octet binary powers of 2 (128, 64, 32, 16, 8, 4, 2, 1) and calculate network, broadcast, and host addresses effortlessly in your head.',
    analogyTitle: 'Neighborhoods, Streets, and House Numbers',
    analogyStory: 'In an address like "192.168.1.45/24", the subnet mask /24 acts like the boundary sign that says: "The first 24 bits (192.168.1) define the town and street neighborhood; only the final 8 bits (.45) represent individual front door numbers." The lowest number (.0) is the street name sign, and the highest (.255) is the neighborhood community megaphone.',
    keyTerms: [
      {
        term: 'IPv4 Address Structure',
        definition: '32-bit logical address formatted as 4 decimal octets (0-255) separated by dots, split into Network portion and Host portion by the subnet mask.',
        analogy: 'Area code + Local exchange number on traditional landline phones.'
      },
      {
        term: 'CIDR Notation (/24, /28)',
        definition: 'Classless Inter-Domain Routing: a slash followed by the count of contiguous leading "1" bits in the subnet mask (e.g. /24 = 255.255.255.0).',
        analogy: 'A shorthand ruler marking where the boundary line falls between public street and private lot.'
      },
      {
        term: 'Usable Hosts Formula (2^n - 2)',
        definition: 'Formula to calculate assignable client addresses, where n is the number of host bits remaining (0s in mask). Minus 2 reserves Network ID and Broadcast ID.',
        analogy: 'A hotel floor with 256 rooms where Room 0 is the Lobby desk and Room 255 is the Public Alarm Speaker.'
      },
      {
        term: 'Private IP Ranges (RFC 1918)',
        definition: '10.0.0.0/8 (Class A), 172.16.0.0/12 (Class B), 192.168.0.0/16 (Class C) reserved for LANs and not routable on the public Internet.',
        analogy: 'Intercom extensions inside an office building that cannot be dialed directly from outside.'
      }
    ],
    quickTip: 'To find the block size (magic number), subtract the non-255 octet in your subnet mask from 256! For example, 255.255.255.240 -> 256 - 240 = 16. Your subnets increment in steps of 16 (0, 16, 32, 48...).',
    commonMistake: 'Forgetting to subtract 2 when calculating usable hosts. A /30 network has 4 total IP addresses, but ONLY 2 usable hosts (the first is Network ID, the last is Broadcast ID).',
    labRefId: 'lab-4'
  },
  {
    id: 'switching',
    number: '04',
    title: 'Switching & VLANs',
    colorName: 'Purple',
    colorHex: '#C084FC',
    colorClass: 'text-[#C084FC]',
    shortDesc: 'Layer 2 Ethernet switching, MAC address tables, collision vs broadcast domains, 802.1Q VLAN trunks.',
    overview: 'Switches build high-speed local networks by inspecting Layer 2 Ethernet headers. By separating traffic into Virtual LANs (VLANs), you isolate broadcast storms, enforce department security, and optimize throughput.',
    analogyTitle: 'The Smart Receptionist & Private Office Suites',
    analogyStory: 'A hub is a loud room where anyone who talks is heard by everyone (1 collision domain). A switch is a smart receptionist who memorizes which employee sits at which desk (MAC Table). When a letter arrives for Alice, the receptionist walks it directly to Alice’s desk. VLANs are soundproof drywall dividers turning one large floor into separate private departments.',
    keyTerms: [
      {
        term: 'MAC Address Table (CAM)',
        definition: 'Hardware table mapping device Layer 2 MAC addresses to specific physical switchports, built dynamically by reading the Source MAC of incoming frames.',
        analogy: 'The building directory matching worker name badges to cubicle numbers.'
      },
      {
        term: 'Broadcast vs Collision Domain',
        definition: 'Each switchport is its own isolated collision domain. All switchports in the same VLAN share a single broadcast domain.',
        analogy: 'Collision domain: your personal phone line. Broadcast domain: the building emergency intercom speakers.'
      },
      {
        term: 'Access Port vs Trunk Port',
        definition: 'Access ports carry untagged traffic for a single VLAN (PCs, printers). Trunk ports carry multiple VLANs between switches using IEEE 802.1Q tags.',
        analogy: 'Access port is an office hallway door. Trunk port is an express subway tunnel carrying trains with color-coded baggage tags.'
      },
      {
        term: 'IEEE 802.1Q Tagging',
        definition: 'A 4-byte header inserted into the Ethernet frame containing a 12-bit VLAN ID (VID) from 1 to 4094, stripped before egressing access ports.',
        analogy: 'A colored sticker placed on a package that is inspected by customs and peeled off before delivery.'
      }
    ],
    quickTip: 'Never leave unused switchports enabled in default VLAN 1. Place unused ports in a dedicated "parking lot" shutdown VLAN (e.g. VLAN 999) with `shutdown` to prevent unauthorized physical LAN tapping.',
    commonMistake: 'Mismatched native VLANs across a trunk link. If Switch A has native VLAN 1 and Switch B has native VLAN 99, untagged traffic will leak between different VLANs (Native VLAN Mismatch error).',
    labRefId: 'lab-5'
  },
  {
    id: 'routing',
    number: '05',
    title: 'Routing & Gateway Forwarding',
    colorName: 'Hot Pink',
    colorHex: '#FF007F',
    colorClass: 'text-[#FF007F]',
    shortDesc: 'Layer 3 packet forwarding, routing tables, default gateways, static routes, and inter-VLAN routing.',
    overview: 'Routers connect disparate networks together. While switches forward frames inside a LAN using MAC addresses, routers forward packets across global networks using IP addresses and routing algorithms.',
    analogyTitle: 'Air Traffic Control & Airport Flight Paths',
    analogyStory: 'If a switch is an internal elevator inside a building, a router is an international airport gateway. If a passenger wants to travel outside their hometown (their local subnet), they must take the highway to the Default Gateway. The router inspects the ticket destination (Destination IP), checks its master schedule (Routing Table), decrements the Time to Live (TTL), and forwards the packet onto the next hop runway.',
    keyTerms: [
      {
        term: 'Default Gateway',
        definition: 'The router IP address on the local subnet to which a host sends all packets destined for remote subnets outside its broadcast domain.',
        analogy: 'The only exit ramp leading out of your gated residential community onto the interstate.'
      },
      {
        term: 'Routing Table Lookup',
        definition: 'The database used by a router to determine where to forward packets, prioritized by the Longest Prefix Match (most specific subnet mask first).',
        analogy: 'A GPS map choosing the most specific street direction before falling back to a general highway route.'
      },
      {
        term: 'Static Route vs Dynamic (OSPF/RIP)',
        definition: 'Static routes are manually configured by engineers (`ip route 0.0.0.0 0.0.0.0 next-hop`); dynamic protocols automatically discover neighbors and adapt to link failures.',
        analogy: 'Fixed train tracks laid by hand vs real-time Google Maps recalculating around traffic accidents.'
      },
      {
        term: 'Router-on-a-Stick',
        definition: 'A router configuration using a single physical interface partitioned into logical sub-interfaces (e.g. g0/0.10, g0/0.20) with 802.1Q encapsulation to route between VLANs.',
        analogy: 'A multi-story hotel with one central spiral staircase connecting all different floors.'
      }
    ],
    quickTip: 'The default route `0.0.0.0/0` (known as the "quad-zero route" or Gateway of Last Resort) matches all traffic not specifically listed in the routing table. It is essential for routing Internet-bound client traffic.',
    commonMistake: 'Configuring a host with a Default Gateway address that belongs to a different subnet than the host itself. The host will fail to resolve the gateway’s MAC via ARP and will refuse to communicate off-link.',
    labRefId: 'lab-7'
  },
  {
    id: 'wireless',
    number: '06',
    title: 'Wireless Networking (WLAN)',
    colorName: 'Cyan',
    colorHex: '#06B6D4',
    colorClass: 'text-[#06B6D4]',
    shortDesc: '802.11 standards, 2.4GHz vs 5GHz vs 6GHz bands, channel overlap, WPA2/WPA3 security, and SSIDs.',
    overview: 'Wireless replaces copper cables with radio frequency (RF) electromagnetic waves. Understand why CSMA/CA is required instead of CSMA/CD, how antennas radiate energy, and how to avoid channel interference.',
    analogyTitle: 'Walkie-Talkies in a Crowded Auditorium',
    analogyStory: 'Wi-Fi is inherently half-duplex, like a single shared walkie-talkie channel. Only one device can transmit RF signals at any microsecond; all other devices must listen. If two talk at once, RF waves collide into static. Because Wi-Fi cannot detect collisions while transmitting (unlike Ethernet cables), it uses CSMA/CA (Collision Avoidance): "Listen before talk, send Request-to-Send, wait for Clear-to-Send."',
    keyTerms: [
      {
        term: '2.4 GHz vs 5 GHz vs 6 GHz',
        definition: '2.4 GHz offers long range and wall penetration but only 3 non-overlapping channels (1, 6, 11); 5 GHz & 6 GHz offer wider channels (80/160MHz) and gigabit speeds with shorter range.',
        analogy: 'Deep bass notes carrying through concrete walls vs crisp high treble notes stopped by a closed door.'
      },
      {
        term: 'SSID & BSSID',
        definition: 'SSID (Service Set Identifier) is the human-readable Wi-Fi network name; BSSID (Basic Service Set ID) is the unique 48-bit MAC address of the radio AP broadcasting it.',
        analogy: 'Store brand name ("Starbucks Free Wi-Fi") vs the exact physical cash register location.'
      },
      {
        term: 'WPA2-PSK vs WPA3-SAE',
        definition: 'WPA2 uses AES-CCMP with a 4-way handshake vulnerable to offline dictionary attacks; WPA3 uses Simultaneous Authentication of Equals (SAE) resistant to password guessing.',
        analogy: 'A standard combination padlock vs a cryptographic handshake proving knowledge without exposing the secret.'
      },
      {
        term: 'CSMA/CA',
        definition: 'Carrier Sense Multiple Access with Collision Avoidance: the media access control mechanism used in 802.11 to arbitrate shared wireless airspace.',
        analogy: 'Politely raising your hand and waiting for the teacher to acknowledge you before speaking in class.'
      }
    ],
    quickTip: 'In the 2.4 GHz band, ONLY use channels 1, 6, or 11. Choosing channel 3 or 4 causes adjacent-channel interference with BOTH channel 1 and channel 6, degrading network performance for everyone nearby.',
    commonMistake: 'Placing wireless access points inside metal utility closets, behind thick fish tanks, or right beside microwave ovens. Water and dense metal absorb 2.4GHz RF signals almost entirely.',
    labRefId: 'lab-7'
  },
  {
    id: 'services',
    number: '07',
    title: 'Network Services (DHCP, DNS, NAT)',
    colorName: 'Yellow',
    colorHex: '#FACC15',
    colorClass: 'text-[#FACC15]',
    shortDesc: 'Automated IP assignment (DORA), domain name resolution hierarchy, and Network Address Translation.',
    overview: 'Modern networks rely on core infrastructure services to function seamlessly without manual human intervention. DHCP gives clients their identity; DNS translates names to numbers; NAT conserves IPv4 addresses.',
    analogyTitle: 'Hotel Reception, Yellow Pages, and Office PBX',
    analogyStory: 'When you check into a hotel (connect to Wi-Fi), the front desk gives you a room key and Wi-Fi password (DHCP DORA lease). When you want to order takeout, you look up "Joe’s Pizza" in the phone book to find the 10-digit number (DNS). When you make an outside phone call, the hotel PBX switchboard displays the hotel’s single main business phone number on caller ID (NAT overload/PAT).',
    keyTerms: [
      {
        term: 'DHCP DORA Process',
        definition: 'The 4-step handshake: Discover (client broadcast), Offer (server unicast/broadcast), Request (client broadcast acceptance), Acknowledge (server confirmation).',
        analogy: '"Anyone got an IP?" -> "I have 192.168.1.50" -> "I will take that one!" -> "Confirmed, it is yours for 24 hours."'
      },
      {
        term: 'DNS Hierarchy (Root, TLD, Auth)',
        definition: 'Hierarchical distributed database: Root DNS servers (.) point to Top-Level Domains (.com, .org), which point to Authoritative Name Servers holding specific A/AAAA records.',
        analogy: 'Country library index -> State section -> City archives -> Exact drawer holding the birth certificate.'
      },
      {
        term: 'NAT / PAT (Port Address Translation)',
        definition: 'Translates hundreds of private RFC 1918 internal IP addresses to a single public routable IP address using unique Layer 4 source port numbers.',
        analogy: 'An apartment mailroom where all tenants share the building street address, distinguished by unit numbers.'
      },
      {
        term: 'DNS Record Types (A, AAAA, CNAME, MX)',
        definition: 'A record maps to IPv4; AAAA maps to IPv6; CNAME is an alias canonical name; MX specifies email exchange servers.',
        analogy: 'Contact card holding mobile number, home number, nickname, and PO Box mailing address.'
      }
    ],
    quickTip: 'Always configure at least two DNS servers in your DHCP options scope (e.g. Primary 192.168.1.1 and Secondary 1.1.1.1 or 8.8.8.8) so user web browsing does not halt if the local DNS cache server restarts.',
    commonMistake: 'Rogue DHCP servers on the LAN. If a student plugs a home consumer Wi-Fi router into an enterprise school switchport via its LAN port, it starts giving out unauthorized 192.168.0.x leases and breaks all local network traffic.',
    labRefId: 'lab-6'
  },
  {
    id: 'security',
    number: '08',
    title: 'Security & Troubleshooting',
    colorName: 'Red',
    colorHex: '#EF4444',
    colorClass: 'text-[#EF4444]',
    shortDesc: 'Layered diagnostic methodology, ping, tracert, nslookup, netstat, firewalls, and Access Control Lists.',
    overview: 'Network engineering is 20% setup and 80% diagnostics. Master the bottom-up OSI troubleshooting approach and use command-line forensic tools to pinpoint whether an outage is physical, routing, or service-related.',
    analogyTitle: 'The ER Doctor & Detective Toolkit',
    analogyStory: 'When a patient enters the emergency room, doctors check vital signs bottom-up: Airway, Breathing, Circulation (Layer 1, 2, 3). You never diagnose a brain tumor (Layer 7 web app) before verifying the patient has a pulse (cable link light!). Your stethoscope is `ping`, your X-ray scanner is `tracert`, and your laboratory blood test is `Wireshark`.',
    keyTerms: [
      {
        term: 'Ping (ICMP Echo Request/Reply)',
        definition: 'Sends ICMP Type 8 Echo Request to test Layer 3 IP reachability and measure round-trip time (RTT). Replies with ICMP Type 0 Echo Reply.',
        analogy: 'Calling out "Marco!" in a swimming pool and listening for the echo "Polo!"'
      },
      {
        term: 'Traceroute (tracert / traceroute)',
        definition: 'Discovers the router-by-router path to a destination by sending packets with incrementing TTL values (1, 2, 3...), inducing ICMP Time Exceeded messages at each hop.',
        analogy: 'Dropping breadcrumbs at every highway toll booth to see where the traffic jam is located.'
      },
      {
        term: 'Access Control Lists (ACLs)',
        definition: 'Sequential permit/deny rules applied to router interfaces that filter packets based on source/destination IP, protocol, and port numbers. Ends with an implicit deny all.',
        analogy: 'A nightclub bouncer holding a strict VIP guest list; if your name is not on it, entry is denied.'
      },
      {
        term: 'Netstat & Nslookup',
        definition: '`netstat -ano` displays active TCP/UDP sockets and listening ports; `nslookup` queries DNS servers directly to test domain resolution and record retrieval.',
        analogy: 'Checking which doors in your building are unlocked, and calling directory assistance directly.'
      }
    ],
    quickTip: 'Always troubleshoot systematically bottom-up: 1. Check physical link lights and cables; 2. Check IP configuration (`ipconfig /all`); 3. Ping local loopback (127.0.0.1); 4. Ping Default Gateway; 5. Ping remote IP (8.8.8.8); 6. Ping domain name (google.com).',
    commonMistake: 'Forgetting the "Implicit Deny Any" at the end of every Cisco Access Control List. If you write an ACL with only permit statements, anything not explicitly permitted is instantly dropped!',
    labRefId: 'lab-9'
  }
];

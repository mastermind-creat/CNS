import { GlossaryItem } from '../types';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'ACL',
    acronymFor: 'Access Control List',
    category: 'security',
    definition: 'A sequential table of permit and deny conditions applied to router/switch interfaces to filter packets based on addresses or protocols.',
    analogy: 'A nightclub bouncer checking names against a VIP list.'
  },
  {
    term: 'APIPA',
    acronymFor: 'Automatic Private IP Addressing',
    category: 'services',
    definition: 'An IPv4 self-assigned address in the 169.254.0.0/16 range when a host fails to receive an answer from a DHCP server.',
    analogy: 'Putting a temporary "Hello My Name Is" sticker on your shirt when the registration booth is empty.'
  },
  {
    term: 'ARP',
    acronymFor: 'Address Resolution Protocol',
    category: 'fundamentals',
    definition: 'Layer 2/3 protocol that maps a known IPv4 logical address to a physical Layer 2 MAC address on the local network segment.',
    analogy: 'Yelling into a crowded room: "Who here is John Doe? Tell me your shoe size!"'
  },
  {
    term: 'BGP',
    acronymFor: 'Border Gateway Protocol',
    category: 'routing',
    definition: 'The exterior gateway routing protocol (EGP) that connects Autonomous Systems (AS) and routes traffic across the global Internet backbone.',
    analogy: 'The international diplomacy treaty routing shipping vessels between independent sovereign nations.'
  },
  {
    term: 'BSSID',
    acronymFor: 'Basic Service Set Identifier',
    category: 'wireless',
    definition: 'The unique 48-bit physical MAC address of a wireless radio transceiver on an Access Point.',
    analogy: 'The specific barcode stamped on a particular radio tower.'
  },
  {
    term: 'CAM Table',
    acronymFor: 'Content Addressable Memory Table',
    category: 'switching',
    definition: 'High-speed hardware memory on an Ethernet switch that stores MAC address-to-port bindings.',
    analogy: 'A switchboard operator’s Rolodex matching client names to desk extensions.'
  },
  {
    term: 'CIDR',
    acronymFor: 'Classless Inter-Domain Routing',
    category: 'subnetting',
    definition: 'Method of allocating IP addresses and IP routing using slash notation (e.g. /24) rather than rigid Class A, B, or C boundaries.',
    analogy: 'Ordering pizza by the exact number of custom slices rather than being forced to buy an entire 8-slice pie.'
  },
  {
    term: 'CSMA/CD & CSMA/CA',
    acronymFor: 'Carrier Sense Multiple Access with Collision Detection / Avoidance',
    category: 'fundamentals',
    definition: 'Media access arbitration protocols. CSMA/CD is used on half-duplex copper Ethernet; CSMA/CA is used in wireless 802.11 networks.',
    analogy: 'Interrupting politely when you hear someone else speak vs raising your hand and waiting for a nod.'
  },
  {
    term: 'Default Gateway',
    category: 'routing',
    definition: 'The router IP address on a local subnet that forwards packets destined for networks outside the local broadcast domain.',
    analogy: 'The only exit turnstile leading out of a subway station into the city street.'
  },
  {
    term: 'DHCP',
    acronymFor: 'Dynamic Host Configuration Protocol',
    category: 'services',
    definition: 'Client-server network protocol that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to hosts.',
    analogy: 'A hotel concierge handing you a room key card and Wi-Fi password slip upon check-in.'
  },
  {
    term: 'DNS',
    acronymFor: 'Domain Name System',
    category: 'services',
    definition: 'Distributed hierarchical database system that translates human-friendly domain names (e.g., example.com) into IP addresses (93.184.216.34).',
    analogy: 'The smartphone Contacts app converting your friend’s name into their 10-digit phone number.'
  },
  {
    term: 'DORA',
    acronymFor: 'Discover, Offer, Request, Acknowledge',
    category: 'services',
    definition: 'The four-packet conversation exchanged between a client and a DHCP server to lease an IP address.',
    analogy: '"Anyone hiring?" -> "I have an opening!" -> "I accept!" -> "You start tomorrow."'
  },
  {
    term: 'Encapsulation',
    category: 'fundamentals',
    definition: 'The process of wrapping data with protocol headers and trailers as it moves down the OSI reference model from Application to Physical.',
    analogy: 'Putting a note in an envelope, placing that envelope in a courier pouch, and loading that pouch into a cargo shipping container.'
  },
  {
    term: 'Ethernet',
    category: 'cabling',
    definition: 'The ubiquitous family of wired computer networking technologies defined by the IEEE 802.3 working group standards.',
    analogy: 'The standardized gauge of modern railway tracks worldwide.'
  },
  {
    term: 'ICMP',
    acronymFor: 'Internet Control Message Protocol',
    category: 'security',
    definition: 'Network layer protocol used by network devices to send error messages and operational information (powers ping and traceroute).',
    analogy: 'A car dashboard warning light alerting you that coolant is low or tire pressure has dropped.'
  },
  {
    term: 'IP Address',
    acronymFor: 'Internet Protocol Address',
    category: 'subnetting',
    definition: 'A logical numerical label (32-bit in IPv4, 128-bit in IPv6) assigned to every device participating in a computer network.',
    analogy: 'A street address identifying the exact building in a worldwide postal network.'
  },
  {
    term: 'Latency',
    category: 'fundamentals',
    definition: 'The time delay experienced by a data packet traveling from its source endpoint to its destination endpoint, measured in milliseconds.',
    analogy: 'The travel time of an aircraft from takeoff runway to touchdown runway.'
  },
  {
    term: 'MAC Address',
    acronymFor: 'Media Access Control Address',
    category: 'fundamentals',
    definition: 'A unique 48-bit hardware identifier burned into the Network Interface Card (NIC) during manufacturing.',
    analogy: 'The permanent metal Vehicle Identification Number (VIN) stamped on a car engine block.'
  },
  {
    term: 'MTU',
    acronymFor: 'Maximum Transmission Unit',
    category: 'fundamentals',
    definition: 'The largest size packet or frame, in bytes, that a network interface can transmit without requiring fragmentation (standard Ethernet is 1500 bytes).',
    analogy: 'The clearance height limit for trucks entering a highway tunnel.'
  },
  {
    term: 'NAT / PAT',
    acronymFor: 'Network Address Translation / Port Address Translation',
    category: 'services',
    definition: 'A router process that maps private non-routable IP addresses to one or more public IP addresses using unique port numbers.',
    analogy: 'A company switchboard receptionist directing outside callers to different desktop extensions.'
  },
  {
    term: 'OSI Model',
    acronymFor: 'Open Systems Interconnection Model',
    category: 'fundamentals',
    definition: 'A 7-layer theoretical conceptual model developed by ISO to standardize telecommunication and computer network communication functions.',
    analogy: 'A standardized recipe book separating preparation, baking, frosting, packaging, and delivery.'
  },
  {
    term: 'Packet',
    category: 'fundamentals',
    definition: 'A formatted unit of data carried by a packet-switched network at Layer 3 (Network layer), containing header and payload.',
    analogy: 'An envelope containing a letter with to/from addresses written on the front.'
  },
  {
    term: 'Ping',
    category: 'security',
    definition: 'A computer network administration utility used to test the reachability of a host on an IP network and measure round-trip time.',
    analogy: 'A submarine acoustic sonar pulse bouncing back from an obstacle.'
  },
  {
    term: 'RJ-45 (8P8C)',
    category: 'cabling',
    definition: 'An 8-position, 8-contact modular connector commonly used for terminating twisted pair Ethernet cables.',
    analogy: 'The standardized electrical plug fitted on home appliances.'
  },
  {
    term: 'Router',
    category: 'routing',
    definition: 'A Layer 3 networking device that forwards data packets between disparate computer networks using logical IP routing tables.',
    analogy: 'An international airport hub directing passengers to connecting regional flights.'
  },
  {
    term: 'Routing Table',
    category: 'routing',
    definition: 'An electronic data table stored inside a router or networked computer that lists the routes to particular network destinations.',
    analogy: 'A bus schedule and roadmap posted inside a central transit terminal.'
  },
  {
    term: 'SSID',
    acronymFor: 'Service Set Identifier',
    category: 'wireless',
    definition: 'The human-friendly text identifier (up to 32 characters) that names a wireless local area network (WLAN).',
    analogy: 'The neon store sign hanging outside a retail shop.'
  },
  {
    term: 'Subnet Mask',
    category: 'subnetting',
    definition: 'A 32-bit number that masks an IP address to divide it into network and host portions.',
    analogy: 'A template stencil placed over a drawing that only reveals the street name while covering the house number.'
  },
  {
    term: 'Switch',
    category: 'switching',
    definition: 'A Layer 2 networking device that connects devices together on a single local computer network by using packet switching to receive and forward data.',
    analogy: 'A smart railroad switch track directing train cars to their designated sidings.'
  },
  {
    term: 'T568A / T568B',
    category: 'cabling',
    definition: 'The two wiring color code standards defined by TIA/EIA-568 for terminating 8-conductor 100-ohm balanced twisted pair cables.',
    analogy: 'Standard color-coded electrical wiring diagrams for building plugs.'
  },
  {
    term: 'TCP',
    acronymFor: 'Transmission Control Protocol',
    category: 'fundamentals',
    definition: 'A core transport layer protocol that provides reliable, ordered, and error-checked delivery of a stream of bytes between applications.',
    analogy: 'Registered certified postal delivery with tracking and return receipt signature.'
  },
  {
    term: 'Traceroute / Tracert',
    category: 'security',
    definition: 'A network diagnostic tool for displaying the route (path) and measuring transit delays of packets across an IP network.',
    analogy: 'Clocking your car travel time at each toll gate along a tollway journey.'
  },
  {
    term: 'Trunk Port',
    category: 'switching',
    definition: 'A switchport configured to carry traffic for multiple VLANs across a single physical link using 802.1Q tags.',
    analogy: 'An express cargo ship carrying freight containers stamped with diverse company logos.'
  },
  {
    term: 'UDP',
    acronymFor: 'User Datagram Protocol',
    category: 'fundamentals',
    definition: 'A lightweight, connectionless transport protocol with minimum protocol mechanisms, prioritizing low latency over reliability.',
    analogy: 'Throwing live radio broadcasts into the airwaves without checking if anyone is tuned in.'
  },
  {
    term: 'VLAN',
    acronymFor: 'Virtual Local Area Network',
    category: 'switching',
    definition: 'A broadcast domain partitioned and isolated in a computer network at the data link layer (OSI Layer 2).',
    analogy: 'Soundproof privacy cubicle partitions on a shared office floor.'
  },
  {
    term: 'VLSM',
    acronymFor: 'Variable Length Subnet Masking',
    category: 'subnetting',
    definition: 'A subnetting technique where a network is sliced into subnets of different sizes to match exact host requirements without wasting addresses.',
    analogy: 'Cutting a cake into custom slices based on each guest’s appetite.'
  },
  {
    term: 'Wi-Fi (802.11)',
    category: 'wireless',
    definition: 'A family of wireless network protocols based on the IEEE 802.11 family of standards for local area networking of devices and Internet access.',
    analogy: 'Two-way radio communication across invisible electromagnetic waves.'
  },
  {
    term: 'WPA3',
    acronymFor: 'Wi-Fi Protected Access 3',
    category: 'wireless',
    definition: 'The modern wireless security standard that introduces Simultaneous Authentication of Equals (SAE) to protect against dictionary attacks.',
    analogy: 'A biometric cryptographic vault lock replacing a simple mechanical combination padlock.'
  }
];

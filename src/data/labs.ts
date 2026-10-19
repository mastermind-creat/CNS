import { Lab } from '../types';

export const LABS: Lab[] = [
  {
    id: 'lab-1',
    topicId: 'cabling',
    title: 'Lab 1: Crimping UTP Straight-Through & Crossover Cables',
    subtitle: 'Physical Layer cable termination, T568A/B pinout standards, and continuity testing',
    estimatedMinutes: 45,
    difficulty: 'Beginner',
    objectives: [
      'Strip outer PVC cable jacket without nicking internal copper conductors.',
      'Untwist, arrange, and flatten wires in precise T568B sequence.',
      'Crimp RJ-45 modular 8P8C connector using ratcheting crimp tool.',
      'Verify continuity, pin sequence, and detect crossed/open pairs with cable tester.'
    ],
    equipment: [
      'Cat6 UTP bulk copper cable (approx. 2 meters)',
      'RJ-45 8P8C modular connectors (x4) and snagless boots',
      'Cable jacket stripper and flush cutters',
      'Ratcheting RJ-45 crimper',
      'Battery-powered RJ-45 LED continuity tester'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Strip Outer Cable Jacket',
        instruction: 'Slide a rubber snagless boot onto the cable first. Using a wire stripper, rotate the blade gently 1.5 inches (38mm) from the cable end. Carefully flex the jacket until it snaps and slides off. Ensure none of the 8 thin colored insulation jackets are scored or nicked.',
        tip: 'If you see bare copper exposed anywhere before crimping, cut the end off and re-strip.'
      },
      {
        stepNumber: 2,
        title: 'Untwist and Align Wires in T568B Order',
        instruction: 'Untwist the 4 wire pairs down to the jacket. Fan them out from left to right in exact T568B order: 1: White-Orange, 2: Orange, 3: White-Green, 4: Blue, 5: White-Blue, 6: Green, 7: White-Brown, 8: Brown. Flatten the wires firmly between your thumb and forefinger.',
        tip: 'Notice that Green splits around Blue! Pin 3 is White-Green, Pin 4 is Blue, Pin 5 is White-Blue, Pin 6 is Green.'
      },
      {
        stepNumber: 3,
        title: 'Trim and Insert into RJ-45 Connector',
        instruction: 'Hold the flattened wires tightly. Use flush cutters to trim the wire ends in a clean, perpendicular straight line, leaving approximately 0.5 inches (12.7mm) exposed. Push the wires firmly into the RJ-45 connector (copper pins facing UP towards you). Verify all 8 wires reach the very front end under the gold contacts.',
        expectedOutput: 'All 8 copper wire tips are visible through the transparent front edge of the RJ-45 connector, and the outer cable jacket extends 6mm into the connector past the strain relief clamp.'
      },
      {
        stepNumber: 4,
        title: 'Crimp Connector and Test Continuity',
        instruction: 'Insert connector into the 8P ratcheting crimp tool. Squeeze firmly until the ratchet mechanism releases. Slide the protective boot over the latch. Repeat on the other end using T568B for a straight-through cable (or T568A for crossover). Plug both ends into the LED cable tester and turn it ON.',
        expectedOutput: 'Tester LEDs 1 through 8 light up sequentially in numerical order (1-1, 2-2, 3-3, 4-4, 5-5, 6-6, 7-7, 8-8) on both Master and Remote units without skips or flashes.'
      }
    ],
    verificationCriteria: [
      'Outer jacket is clamped inside the strain relief tab.',
      'No bare copper wires exposed outside the connector body.',
      'LED tester sequences 1 through 8 with zero open or short circuits.'
    ]
  },
  {
    id: 'lab-2',
    topicId: 'fundamentals',
    title: 'Lab 2: Building a Small LAN with a Switch in Packet Tracer',
    subtitle: 'Connecting PCs to a Cisco Catalyst switch and observing ARP table creation',
    estimatedMinutes: 30,
    difficulty: 'Beginner',
    objectives: [
      'Deploy Cisco Catalyst 2960 switch and 3 client PC endpoints in Packet Tracer.',
      'Connect devices using copper straight-through cables to FastEthernet ports.',
      'Configure IP addresses on same subnet and verify link state transitions (Amber to Green STP).',
      'Capture and observe ARP requests and ICMP Echo frames in Simulation Mode.'
    ],
    equipment: [
      'Cisco Packet Tracer 8.0+',
      '1x Cisco Catalyst 2960-24TT Switch',
      '3x Generic Desktop PCs (PC0, PC1, PC2)',
      'Copper Straight-Through patch cables'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Place Hardware and Cabling',
        instruction: 'In Packet Tracer, drag one 2960 switch into the workspace. Place three PCs. Select Copper Straight-Through cable: Connect PC0 FastEthernet0 to Switch Fa0/1; PC1 to Fa0/2; PC2 to Fa0/3. Observe switchport LEDs turn Amber (STP Listening/Learning) then Green (Forwarding) after ~30 seconds.',
        tip: 'Press the "Fast Forward Time" button (Alt+D) to bypass the 30-second Spanning Tree delay.'
      },
      {
        stepNumber: 2,
        title: 'Assign Static IP Configurations',
        instruction: 'Click PC0 > Desktop > IP Configuration. Set IP: 192.168.10.1, Subnet Mask: 255.255.255.0. On PC1 set IP: 192.168.10.2, Mask: 255.255.255.0. On PC2 set IP: 192.168.10.3, Mask: 255.255.255.0.',
        commands: [
          '# PC0: 192.168.10.1 / 255.255.255.0',
          '# PC1: 192.168.10.2 / 255.255.255.0',
          '# PC2: 192.168.10.3 / 255.255.255.0'
        ],
        commandLang: 'cmd'
      },
      {
        stepNumber: 3,
        title: 'Inspect Switch MAC Address Table via CLI',
        instruction: 'Click the Switch > CLI tab. Press ENTER to get into user EXEC mode, type `enable` to enter privileged EXEC, and run `show mac address-table`. Notice it may initially be empty until traffic passes.',
        commands: [
          'Switch> enable',
          'Switch# show mac address-table'
        ],
        commandLang: 'cisco',
        expectedOutput: 'Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----'
      },
      {
        stepNumber: 4,
        title: 'Generate Traffic & Inspect CAM Population',
        instruction: 'Open PC0 Command Prompt and run `ping 192.168.10.2`. Now re-run `show mac address-table` on the switch CLI. Notice how the switch learned the MAC addresses of PC0 on Fa0/1 and PC1 on Fa0/2!',
        commands: [
          'ping 192.168.10.2',
          'arp -a'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Pinging 192.168.10.2 with 32 bytes of data:\nReply from 192.168.10.2: bytes=32 time=1ms TTL=128\nReply from 192.168.10.2: bytes=32 time<1ms TTL=128\nPing statistics: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)'
      }
    ],
    verificationCriteria: [
      'All 3 PCs show green link lights on switchports.',
      'Ping between PC0, PC1, and PC2 achieves 100% success.',
      '`show mac address-table` reveals dynamic entries for Fa0/1 and Fa0/2.'
    ]
  },
  {
    id: 'lab-3',
    topicId: 'fundamentals',
    title: 'Lab 3: Configuring Static IPs and Testing with ping & ipconfig',
    subtitle: 'Host IP configuration, loopback testing, subnet validation, and ICMP diagnostics',
    estimatedMinutes: 30,
    difficulty: 'Beginner',
    objectives: [
      'Configure static IPv4 addresses, subnet masks, and default gateways on client workstations.',
      'Verify local TCP/IP stack integrity with loopback ping (127.0.0.1).',
      'Examine network adapter parameters using `ipconfig /all`.',
      'Demonstrate the effect of mismatched subnet masks and bad default gateways.'
    ],
    equipment: [
      '2x Windows or Linux Workstations (or Packet Tracer PCs)',
      '1x Ethernet Switch',
      '2x Cat6 Patch Cables'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check TCP/IP Protocol Stack Integrity',
        instruction: 'Before checking external links, verify that your operating system’s internal networking stack and virtual network driver are working properly by pinging the loopback IP.',
        commands: [
          'ping 127.0.0.1'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\nPackets: Sent = 4, Received = 4, Lost = 0 (0% loss)'
      },
      {
        stepNumber: 2,
        title: 'Retrieve Comprehensive Adapter Information',
        instruction: 'Execute `ipconfig /all` to list all network interface cards, MAC addresses, IPv4/IPv6 addresses, subnet masks, and DHCP lease statuses.',
        commands: [
          'ipconfig /all'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Ethernet adapter Ethernet0:\n   Physical Address. . . . . . . . . : 00-1B-44-11-3A-B7\n   IPv4 Address. . . . . . . . . . . : 192.168.1.10\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1'
      },
      {
        stepNumber: 3,
        title: 'Test Peer-to-Peer Reachability & Flush ARP',
        instruction: 'Ping peer computer at 192.168.1.20. Inspect the Address Resolution Protocol (ARP) cache table to verify IP-to-MAC address mapping.',
        commands: [
          'ping 192.168.1.20',
          'arp -a'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Interface: 192.168.1.10 --- 0x3\n  Internet Address      Physical Address      Type\n  192.168.1.20          00-50-79-66-68-01     dynamic'
      }
    ],
    verificationCriteria: [
      'Loopback ping returns 0% packet loss.',
      '`ipconfig /all` accurately reflects configured static parameters.',
      'ARP cache populates with the MAC address of the destination device.'
    ]
  },
  {
    id: 'lab-4',
    topicId: 'subnetting',
    title: 'Lab 4: Subnetting a Network & Assigning Addresses (VLSM)',
    subtitle: 'Dividing 192.168.50.0/24 into 4 departmental subnets using Variable Length Subnet Masking',
    estimatedMinutes: 45,
    difficulty: 'Intermediate',
    objectives: [
      'Analyze departmental host requirements (Sales: 50 hosts, Support: 25 hosts, IT: 10 hosts, WAN link: 2 hosts).',
      'Calculate optimal CIDR prefixes (/26, /27, /28, /30) to eliminate wasted address space.',
      'Document Network ID, First Usable, Last Usable, and Broadcast ID for each subnet.',
      'Implement and test the address plan in a simulated multi-subnet topology.'
    ],
    equipment: [
      'Subnet design worksheet / calculator',
      'Packet Tracer topology with 1 Router, 3 Switches, and 6 PCs'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Calculate VLSM Blocks by Descending Host Count',
        instruction: 'Always order requirements from largest to smallest: 1) Sales: 50 hosts -> Needs 2^6-2=62 hosts -> /26 (mask 255.255.255.192); 2) Support: 25 hosts -> Needs 2^5-2=30 hosts -> /27 (mask 255.255.255.224); 3) IT: 10 hosts -> Needs 2^4-2=14 hosts -> /28 (mask 255.255.255.240); 4) WAN Point-to-Point: 2 hosts -> /30 (mask 255.255.255.252).',
        tip: 'Starting with the largest subnet avoids overlapping blocks and fragmentation.'
      },
      {
        stepNumber: 2,
        title: 'Allocate Subnet Ranges',
        instruction: 'Document the exact allocated ranges:\n- Subnet A (Sales): 192.168.50.0/26 (Hosts: .1 to .62, Broadcast: .63)\n- Subnet B (Support): 192.168.50.64/27 (Hosts: .65 to .94, Broadcast: .95)\n- Subnet C (IT): 192.168.50.96/28 (Hosts: .97 to .110, Broadcast: .111)\n- Subnet D (WAN): 192.168.50.112/30 (Hosts: .113 to .114, Broadcast: .115)',
        commands: [
          '# Sales Gateway: 192.168.50.1 /26 (255.255.255.192)',
          '# Support Gateway: 192.168.50.65 /27 (255.255.255.224)',
          '# IT Gateway: 192.168.50.97 /28 (255.255.255.240)'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 3,
        title: 'Configure Router Interfaces',
        instruction: 'Assign the first usable host in each subnet as the Default Gateway on the router interfaces.',
        commands: [
          'Router# configure terminal',
          'Router(config)# interface GigabitEthernet0/0/0',
          'Router(config-if)# ip address 192.168.50.1 255.255.255.192',
          'Router(config-if)# no shutdown',
          'Router(config-if)# interface GigabitEthernet0/0/1',
          'Router(config-if)# ip address 192.168.50.65 255.255.255.224',
          'Router(config-if)# no shutdown'
        ],
        commandLang: 'cisco'
      }
    ],
    verificationCriteria: [
      'No overlapping subnet addresses.',
      'Router interfaces show `up/up` state with `show ip interface brief`.',
      'PCs in Sales can ping their gateway (.1) and route packets to Support hosts.'
    ]
  },
  {
    id: 'lab-5',
    topicId: 'switching',
    title: 'Lab 5: Creating VLANs & Inter-VLAN Routing (Router-on-a-Stick)',
    subtitle: 'VLAN database, 802.1Q trunking, native VLAN, and sub-interface routing',
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    objectives: [
      'Create VLAN 10 (Faculty) and VLAN 20 (Students) on a Cisco 2960 switch.',
      'Assign access switchports and verify VLAN membership isolation.',
      'Configure IEEE 802.1Q trunk link carrying tags to a Cisco 1941 router.',
      'Create sub-interfaces (g0/0.10, g0/0.20) for inter-VLAN routing.'
    ],
    equipment: [
      '1x Cisco 2960 Switch',
      '1x Cisco 1941 Router',
      '4x PCs (2 per VLAN)',
      'Cat6 Straight-Through cables'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create VLANs and Name Database',
        instruction: 'Enter global configuration on Switch and define VLAN 10 and VLAN 20.',
        commands: [
          'Switch# configure terminal',
          'Switch(config)# vlan 10',
          'Switch(config-vlan)# name Faculty',
          'Switch(config-vlan)# vlan 20',
          'Switch(config-vlan)# name Students',
          'Switch(config-vlan)# exit'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 2,
        title: 'Assign Access Ports to VLANs',
        instruction: 'Assign FastEthernet 0/1-0/5 to VLAN 10, and Fa0/6-0/10 to VLAN 20.',
        commands: [
          'Switch(config)# interface range FastEthernet 0/1 - 5',
          'Switch(config-if-range)# switchport mode access',
          'Switch(config-if-range)# switchport access vlan 10',
          'Switch(config-if-range)# interface range FastEthernet 0/6 - 10',
          'Switch(config-if-range)# switchport mode access',
          'Switch(config-if-range)# switchport access vlan 20'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 3,
        title: 'Configure 802.1Q Trunk Port to Router',
        instruction: 'Set GigabitEthernet 0/1 as a trunk link to multiplex VLAN 10 and 20 frames across a single physical cable.',
        commands: [
          'Switch(config)# interface GigabitEthernet 0/1',
          'Switch(config-if)# switchport mode trunk',
          'Switch(config-if)# switchport trunk allowed vlan 10,20',
          'Switch(config-if)# exit',
          'Switch# show interfaces trunk'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 4,
        title: 'Configure Router Sub-Interfaces (ROAS)',
        instruction: 'On Router, bring up physical interface g0/0 with no IP. Create sub-interfaces with 802.1Q encapsulation.',
        commands: [
          'Router# configure terminal',
          'Router(config)# interface GigabitEthernet0/0',
          'Router(config-if)# no ip address',
          'Router(config-if)# no shutdown',
          'Router(config-if)# interface GigabitEthernet0/0.10',
          'Router(config-subif)# encapsulation dot1Q 10',
          'Router(config-subif)# ip address 192.168.10.1 255.255.255.0',
          'Router(config-subif)# interface GigabitEthernet0/0.20',
          'Router(config-subif)# encapsulation dot1Q 20',
          'Router(config-subif)# ip address 192.168.20.1 255.255.255.0'
        ],
        commandLang: 'cisco'
      }
    ],
    verificationCriteria: [
      '`show vlan brief` shows ports correctly assigned to Faculty and Students.',
      '`show interfaces trunk` displays g0/1 in trunking state with VLANs 10, 20 allowed.',
      'PC in VLAN 10 (192.168.10.10) pings PC in VLAN 20 (192.168.20.10) through router.'
    ]
  },
  {
    id: 'lab-6',
    topicId: 'services',
    title: 'Lab 6: Configuring DHCP & DNS Services on Cisco IOS & Server',
    subtitle: 'Automated IP lease provisioning, excluded addresses, and DNS hostname resolution',
    estimatedMinutes: 40,
    difficulty: 'Intermediate',
    objectives: [
      'Configure Cisco IOS DHCP server pool with network, default gateway, and DNS options.',
      'Exclude static infrastructure addresses (gateways, printers, servers) from dynamic leases.',
      'Configure dedicated DNS server with A records for local intranet servers.',
      'Verify client DHCP auto-negotiation and perform DNS lookups using `nslookup`.'
    ],
    equipment: [
      '1x Cisco Router',
      '1x Cisco Switch',
      '1x Generic Server (configured as Web + DNS)',
      '3x Client Workstations'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Exclude Static Management IPs on Router',
        instruction: 'Reserve the first 10 addresses for routers and servers so DHCP never hands them out to client PCs.',
        commands: [
          'Router# configure terminal',
          'Router(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 2,
        title: 'Define DHCP Scope and Parameters',
        instruction: 'Create DHCP pool named LAN_USERS and specify network block, default router, and DNS server options.',
        commands: [
          'Router(config)# ip dhcp pool LAN_USERS',
          'Router(dhcp-config)# network 192.168.1.0 255.255.255.0',
          'Router(dhcp-config)# default-router 192.168.1.1',
          'Router(dhcp-config)# dns-server 192.168.1.5',
          'Router(dhcp-config)# domain-name academy.local',
          'Router(dhcp-config)# lease 7'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 3,
        title: 'Configure DNS Server A Records',
        instruction: 'On DNS Server (192.168.1.5), enable DNS Service. Add an A Record: Name `portal.academy.local` pointing to IP `192.168.1.5`. Add an alias CNAME `www.academy.local` pointing to `portal.academy.local`.',
        expectedOutput: 'DNS Service: ON. Records table shows portal.academy.local -> 192.168.1.5.'
      },
      {
        stepNumber: 4,
        title: 'Test Client DHCP Lease & DNS Query',
        instruction: 'On Client PC, switch IP configuration from Static to DHCP. Verify IP assigned is 192.168.1.11. Open Command Prompt and test DNS resolution.',
        commands: [
          'ipconfig /renew',
          'nslookup portal.academy.local'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Server:  UnKnown\nAddress:  192.168.1.5\n\nName:    portal.academy.local\nAddress:  192.168.1.5'
      }
    ],
    verificationCriteria: [
      '`show ip dhcp binding` on router displays client hardware MAC and leased IP.',
      'Client PC receives valid IP above .10, default gateway .1, and DNS server .5.',
      'Web browser can load `http://portal.academy.local` successfully.'
    ]
  },
  {
    id: 'lab-7',
    topicId: 'routing',
    title: 'Lab 7: Setting Up a Router (Static Routes) & Wireless AP with WPA2',
    subtitle: 'Next-hop static routing, default route 0.0.0.0/0, and securing a Wi-Fi Access Point',
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    objectives: [
      'Interconnect two routers across a serial/gigabit WAN link (10.0.0.0/30).',
      'Configure static routes and the Gateway of Last Resort (`ip route 0.0.0.0 0.0.0.0`).',
      'Deploy an 802.11ac Wireless Access Point connected to an edge switchport.',
      'Configure WPA2-PSK (AES) security encryption, SSID broadcasting, and client association.'
    ],
    equipment: [
      '2x Cisco Routers (HQ and Branch)',
      '1x Cisco Switch',
      '1x Wireless Access Point (WAP-300N or Home Gateway)',
      '1x Laptop with Wi-Fi NIC'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Configure WAN Interface Between Routers',
        instruction: 'Configure point-to-point IP addresses on the WAN serial/gigabit link between Router HQ (10.0.0.1/30) and Router Branch (10.0.0.2/30).',
        commands: [
          'HQ(config)# interface GigabitEthernet0/0/0',
          'HQ(config-if)# ip address 10.0.0.1 255.255.255.252',
          'HQ(config-if)# no shutdown'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 2,
        title: 'Configure Static Route and Default Route',
        instruction: 'On HQ router, add a static route to the Branch LAN (192.168.20.0/24). On Branch router, configure a default route pointing back to HQ as the next-hop.',
        commands: [
          '# On HQ Router:',
          'HQ(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2',
          '',
          '# On Branch Router:',
          'Branch(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.1'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 3,
        title: 'Configure Wireless AP SSID & WPA2-PSK',
        instruction: 'Access the Access Point Port 1 configuration. Set SSID to `CyberLab-Secure`. Set Channel to `6` (2.437 GHz). Under Security, select `WPA2-PSK`, Encryption `AES`, and set Passphrase to `CyberNet2026!`.',
        expectedOutput: 'AP radio broadcasting SSID: CyberLab-Secure, Channel 6, Encryption: WPA2 Personal AES.'
      },
      {
        stepNumber: 4,
        title: 'Associate Laptop and Verify End-to-End Routing',
        instruction: 'On Laptop, open PC Wireless app, click Connect, select `CyberLab-Secure`, and enter `CyberNet2026!`. Once associated, ping the HQ remote LAN across the WAN link.',
        commands: [
          'ping 192.168.10.1'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Reply from 192.168.10.1: bytes=32 time=4ms TTL=126\nPackets: Sent = 4, Received = 4, Lost = 0 (0% loss)'
      }
    ],
    verificationCriteria: [
      '`show ip route` shows `S` (Static) and `S*` (Candidate Default) routes.',
      'Wireless laptop associates with green wave animation in Packet Tracer.',
      'End-to-end ping succeeds with TTL decrement indicating routed hops.'
    ]
  },
  {
    id: 'lab-8',
    topicId: 'security',
    title: 'Lab 8: Basic Firewall & Access Control List (ACL) Setup',
    subtitle: 'Standard vs Extended ACLs, port filtering, directionality (in/out), and implicit deny',
    estimatedMinutes: 45,
    difficulty: 'Advanced',
    objectives: [
      'Understand numbered (1-99, 100-199) and named Access Control Lists.',
      'Create an Extended ACL blocking insecure Telnet (port 23) and ICMP while permitting Web traffic (port 80/443).',
      'Apply ACL to router interface with correct directionality (`ip access-group IN/OUT`).',
      'Verify ACL hit counters using `show ip access-lists`.'
    ],
    equipment: [
      '1x Cisco Router (Gateway)',
      '1x Cisco Switch',
      '1x Web & Telnet Server',
      '2x Workstations'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create Extended ACL on Router',
        instruction: 'Create an extended named ACL `FILTER_INBOUND` to control traffic entering from the public or untrusted network.',
        commands: [
          'Router# configure terminal',
          'Router(config)# ip access-list extended FILTER_INBOUND',
          'Router(config-ext-nacl)# remark Permit HTTP and HTTPS to Web Server',
          'Router(config-ext-nacl)# permit tcp any host 192.168.1.100 eq 80',
          'Router(config-ext-nacl)# permit tcp any host 192.168.1.100 eq 443',
          'Router(config-ext-nacl)# remark Explicitly Deny Insecure Telnet',
          'Router(config-ext-nacl)# deny tcp any host 192.168.1.100 eq 23',
          'Router(config-ext-nacl)# remark Permit established TCP return traffic',
          'Router(config-ext-nacl)# permit tcp any any established',
          'Router(config-ext-nacl)# remark Permit ICMP Echo-Reply only',
          'Router(config-ext-nacl)# permit icmp any any echo-reply'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 2,
        title: 'Apply ACL to Ingress Interface',
        instruction: 'Apply the access list to the WAN interface facing inbound traffic using `ip access-group`.',
        commands: [
          'Router(config)# interface GigabitEthernet0/0/0',
          'Router(config-if)# ip access-group FILTER_INBOUND in',
          'Router(config-if)# exit'
        ],
        commandLang: 'cisco'
      },
      {
        stepNumber: 3,
        title: 'Test Permit and Deny Statements',
        instruction: 'From an external client, attempt to connect via Web Browser (port 80) - connection should succeed. Now attempt to connect via Telnet - connection should be refused.',
        commands: [
          'telnet 192.168.1.100',
          '# Result: Connecting To 192.168.1.100...Could not open connection to the host, on port 23'
        ],
        commandLang: 'cmd'
      },
      {
        stepNumber: 4,
        title: 'Inspect ACL Hit Counters',
        instruction: 'Check the router access list statistics to verify packet match counts.',
        commands: [
          'Router# show ip access-lists FILTER_INBOUND'
        ],
        commandLang: 'cisco',
        expectedOutput: 'Extended IP access list FILTER_INBOUND\n    10 permit tcp any host 192.168.1.100 eq www (42 matches)\n    20 permit tcp any host 192.168.1.100 eq 443\n    30 deny tcp any host 192.168.1.100 eq telnet (3 matches)\n    40 permit tcp any any established (118 matches)'
      }
    ],
    verificationCriteria: [
      'Web browser can open server page on port 80.',
      'Telnet client receives immediate timeout/rejection.',
      '`show ip access-lists` demonstrates matching packet counters.'
    ]
  },
  {
    id: 'lab-9',
    topicId: 'security',
    title: 'Lab 9: Multi-Layer Troubleshooting Toolkit (ping, tracert, nslookup, netstat)',
    subtitle: 'Systematic bottom-up diagnostic methodology for isolating physical, network, and transport faults',
    estimatedMinutes: 45,
    difficulty: 'Advanced',
    objectives: [
      'Execute bottom-up troubleshooting methodology across Layers 1 through 7.',
      'Use `ping -t` and packet size parameters to measure MTU and packet loss.',
      'Analyze `tracert` hop latencies and isolate upstream link degradation.',
      'Inspect active transport sockets with `netstat -ano` and test DNS resolution with `nslookup`.'
    ],
    equipment: [
      'Windows/Linux Workstation with Command Prompt / PowerShell',
      'Wireshark packet capture software',
      'Network topology with 1 simulated broken link or DNS misconfiguration'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Physical & Logical Local Check',
        instruction: 'Verify physical link light on the Ethernet port. Check IP, subnet mask, and default gateway configuration.',
        commands: [
          'ipconfig /all'
        ],
        commandLang: 'cmd',
        tip: 'If the IP starts with 169.254.x.x (APIPA), your device failed to reach the DHCP server at Layer 2/3!'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Isolate Gateway vs WAN Connectivity',
        instruction: 'Ping your local Default Gateway first. If that succeeds, ping a reliable public IP (8.8.8.8) to distinguish local LAN issues from upstream ISP failure.',
        commands: [
          '# Ping Default Gateway:',
          'ping 192.168.1.1',
          '# Ping Public WAN DNS:',
          'ping 8.8.8.8'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64\nReply from 8.8.8.8: bytes=32 time=14ms TTL=117'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Trace Router Hops to Isolate Drop Point',
        instruction: 'Run `tracert` (or `traceroute` on Linux/macOS) to pinpoint the exact router hop where packet forwarding fails.',
        commands: [
          'tracert -d 8.8.8.8'
        ],
        commandLang: 'cmd',
        expectedOutput: '  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2     8 ms     7 ms     8 ms  10.240.0.1\n  3    12 ms    11 ms    11 ms  142.250.224.1\n  4    14 ms    13 ms    14 ms  8.8.8.8'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Check Active Ports and DNS Query',
        instruction: 'If IP reachability works but web pages will not load, check DNS resolution and active listening sockets.',
        commands: [
          'nslookup www.google.com',
          'netstat -ano | findstr ESTABLISHED'
        ],
        commandLang: 'cmd',
        expectedOutput: 'Non-authoritative answer:\nName:    www.google.com\nAddresses:  142.250.190.36'
      }
    ],
    verificationCriteria: [
      'Can articulate which layer failed based on command output.',
      'Identifies whether failure is NIC/Cable (L1), ARP/VLAN (L2), Gateway/Routing (L3), or DNS (L7).',
      'Successfully captures ICMP Echo Request/Reply in Wireshark.'
    ]
  }
];

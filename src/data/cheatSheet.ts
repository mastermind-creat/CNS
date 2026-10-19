import { CommandEntry, PortEntry, SubnetEntry } from '../types';

export const COMMON_PORTS: PortEntry[] = [
  { port: 20, protocol: 'TCP', service: 'FTP Data', description: 'File Transfer Protocol data stream channel', secureAlternative: 'SFTP (22)' },
  { port: 21, protocol: 'TCP', service: 'FTP Control', description: 'File Transfer Protocol command channel', secureAlternative: 'SFTP / FTPS' },
  { port: 22, protocol: 'TCP', service: 'SSH / SFTP', description: 'Secure Shell encrypted remote console & secure file transfer' },
  { port: 23, protocol: 'TCP', service: 'Telnet', description: 'Unencrypted cleartext remote terminal emulation (INSECURE)', secureAlternative: 'SSH (22)' },
  { port: 25, protocol: 'TCP', service: 'SMTP', description: 'Simple Mail Transfer Protocol for relaying email between MTAs', secureAlternative: 'SMTPS (465/587)' },
  { port: 53, protocol: 'TCP/UDP', service: 'DNS', description: 'Domain Name System (UDP for queries <512 bytes; TCP for zone transfers)', secureAlternative: 'DoH / DoT (853)' },
  { port: 67, protocol: 'UDP', service: 'DHCP Server', description: 'Dynamic Host Configuration Protocol server listener (BOOTPS)' },
  { port: 68, protocol: 'UDP', service: 'DHCP Client', description: 'Dynamic Host Configuration Protocol client listener (BOOTPC)' },
  { port: 69, protocol: 'UDP', service: 'TFTP', description: 'Trivial File Transfer Protocol used for router firmware/config backup' },
  { port: 80, protocol: 'TCP', service: 'HTTP', description: 'Hypertext Transfer Protocol for web pages (cleartext)', secureAlternative: 'HTTPS (443)' },
  { port: 110, protocol: 'TCP', service: 'POP3', description: 'Post Office Protocol v3 for retrieving email from mailboxes', secureAlternative: 'POP3S (995)' },
  { port: 123, protocol: 'UDP', service: 'NTP', description: 'Network Time Protocol for clock synchronization across routers and servers' },
  { port: 143, protocol: 'TCP', service: 'IMAP', description: 'Internet Message Access Protocol for email sync with server folders', secureAlternative: 'IMAPS (993)' },
  { port: 161, protocol: 'UDP', service: 'SNMP', description: 'Simple Network Management Protocol queries and polling', secureAlternative: 'SNMPv3' },
  { port: 443, protocol: 'TCP', service: 'HTTPS', description: 'Hypertext Transfer Protocol Secure over TLS/SSL encryption' },
  { port: 445, protocol: 'TCP', service: 'SMB', description: 'Server Message Block for Windows network file sharing and printers' },
  { port: 3389, protocol: 'TCP/UDP', service: 'RDP', description: 'Microsoft Remote Desktop Protocol for graphical desktop management' }
];

export const SUBNET_TABLE: SubnetEntry[] = [
  { cidr: '/24', mask: '255.255.255.0', wildcard: '0.0.0.255', totalHosts: 256, usableHosts: 254, typicalUsage: 'Standard Small Office / Home LAN (Class C equivalent)' },
  { cidr: '/25', mask: '255.255.255.128', wildcard: '0.0.0.127', totalHosts: 128, usableHosts: 126, typicalUsage: 'Medium department / building wing' },
  { cidr: '/26', mask: '255.255.255.192', wildcard: '0.0.0.63', totalHosts: 64, usableHosts: 62, typicalUsage: 'Large team or classroom segment' },
  { cidr: '/27', mask: '255.255.255.224', wildcard: '0.0.0.31', totalHosts: 32, usableHosts: 30, typicalUsage: 'Standard department (Sales, Accounting, HR)' },
  { cidr: '/28', mask: '255.255.255.240', wildcard: '0.0.0.15', totalHosts: 16, usableHosts: 14, typicalUsage: 'Server farm DMZ or small branch staff' },
  { cidr: '/29', mask: '255.255.255.248', wildcard: '0.0.0.7', totalHosts: 8, usableHosts: 6, typicalUsage: 'Public ISP static IP block or firewall cluster' },
  { cidr: '/30', mask: '255.255.255.252', wildcard: '0.0.0.3', totalHosts: 4, usableHosts: 2, typicalUsage: 'Point-to-Point WAN router-to-router link (historical standard)' },
  { cidr: '/31', mask: '255.255.255.254', wildcard: '0.0.0.1', totalHosts: 2, usableHosts: 2, typicalUsage: 'RFC 3021 modern point-to-point links (no broadcast)' },
  { cidr: '/32', mask: '255.255.255.255', wildcard: '0.0.0.0', totalHosts: 1, usableHosts: 1, typicalUsage: 'Single host route or router loopback interface' }
];

export const CLI_COMMANDS: CommandEntry[] = [
  {
    command: 'ipconfig /all',
    platform: 'Windows',
    purpose: 'Displays all adapter IP addresses, MAC addresses, DHCP lease times, and DNS servers.',
    example: 'ipconfig /all'
  },
  {
    command: 'ipconfig /release && ipconfig /renew',
    platform: 'Windows',
    purpose: 'Releases current DHCP lease and negotiates a new lease from the DHCP server.',
    example: 'ipconfig /renew'
  },
  {
    command: 'ipconfig /flushdns',
    platform: 'Windows',
    purpose: 'Purges the local DNS resolver cache to clear stale IP mappings.',
    example: 'ipconfig /flushdns'
  },
  {
    command: 'ping -t -l 1000 <ip>',
    platform: 'Windows',
    purpose: 'Sends continuous ICMP echo requests with a custom 1000-byte payload to test MTU & stability.',
    example: 'ping -t 192.168.1.1'
  },
  {
    command: 'tracert -d <ip>',
    platform: 'Windows',
    purpose: 'Traces router hops to a destination without resolving DNS (faster output).',
    example: 'tracert -d 8.8.8.8'
  },
  {
    command: 'netstat -ano',
    platform: 'Windows',
    purpose: 'Lists all active TCP/UDP connections, listening ports, and owning Process IDs.',
    example: 'netstat -ano | findstr :80'
  },
  {
    command: 'arp -a',
    platform: 'Cross-platform',
    purpose: 'Displays the local ARP cache table mapping IP addresses to physical MAC addresses.',
    example: 'arp -a'
  },
  {
    command: 'nslookup <domain> [dns-server]',
    platform: 'Cross-platform',
    purpose: 'Queries a specific DNS server directly to test name resolution.',
    example: 'nslookup google.com 1.1.1.1'
  },
  {
    command: 'show ip interface brief',
    platform: 'Cisco IOS',
    purpose: 'Displays concise summary of all router/switch interfaces, IP assignments, and status/protocol state.',
    example: 'Router# show ip interface brief'
  },
  {
    command: 'show ip route',
    platform: 'Cisco IOS',
    purpose: 'Displays the active Layer 3 routing table including connected (C), static (S), and dynamic routes.',
    example: 'Router# show ip route'
  },
  {
    command: 'show mac address-table',
    platform: 'Cisco IOS',
    purpose: 'Displays the switch CAM table with learned MAC addresses and associated ports.',
    example: 'Switch# show mac address-table'
  },
  {
    command: 'show interfaces trunk',
    platform: 'Cisco IOS',
    purpose: 'Displays active 802.1Q trunk ports, encapsulation, native VLAN, and allowed VLANs.',
    example: 'Switch# show interfaces trunk'
  },
  {
    command: 'show vlan brief',
    platform: 'Cisco IOS',
    purpose: 'Lists all configured VLANs and their assigned access switchports.',
    example: 'Switch# show vlan brief'
  },
  {
    command: 'ip route <network> <mask> <next-hop>',
    platform: 'Cisco IOS',
    purpose: 'Configures a static route in Cisco IOS global configuration mode.',
    example: 'Router(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.1'
  }
];

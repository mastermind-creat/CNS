export type TopicId = 
  | 'fundamentals'
  | 'cabling'
  | 'subnetting'
  | 'switching'
  | 'routing'
  | 'wireless'
  | 'services'
  | 'security';

export interface TopicColorConfig {
  name: string;
  hex: string;
  glow: string;
  border: string;
  bgSubtle: string;
  text: string;
  badgeBg: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
  analogy: string;
}

export interface TopicData {
  id: TopicId;
  number: string;
  title: string;
  colorName: string;
  colorHex: string;
  colorClass: string;
  shortDesc: string;
  overview: string;
  analogyTitle: string;
  analogyStory: string;
  keyTerms: KeyTerm[];
  quickTip: string;
  commonMistake: string;
  labRefId?: string;
}

export interface LabStep {
  stepNumber: number;
  title: string;
  instruction: string;
  commands?: string[];
  commandLang?: 'cisco' | 'cmd' | 'bash';
  tip?: string;
  expectedOutput?: string;
}

export interface Lab {
  id: string;
  topicId: TopicId;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  equipment: string[];
  steps: LabStep[];
  verificationCriteria: string[];
}

export interface QuizQuestion {
  id: number;
  topicId: TopicId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryItem {
  term: string;
  category: TopicId;
  acronymFor?: string;
  definition: string;
  analogy?: string;
}

export interface PortEntry {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  description: string;
  secureAlternative?: string;
}

export interface SubnetEntry {
  cidr: string;
  mask: string;
  wildcard: string;
  totalHosts: number;
  usableHosts: number;
  typicalUsage: string;
}

export interface CommandEntry {
  command: string;
  platform: 'Windows' | 'Cisco IOS' | 'Linux' | 'Cross-platform';
  purpose: string;
  example: string;
}

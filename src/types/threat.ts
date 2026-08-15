export type SupportedLanguage = 
  | 'Bengali'
  | 'Hindi'
  | 'Tamil'
  | 'Telugu'
  | 'Marathi'
  | 'Gujarati'
  | 'Kannada'
  | 'Malayalam'
  | 'Punjabi'
  | 'Odia'
  | 'English'
  | 'Code-Mixed (Hinglish)'
  | 'Code-Mixed (Benglish)';

export type ThreatCategory = 
  | 'Banking Phishing'
  | 'KYC Verification Scam'
  | 'UPI Refund Fraud'
  | 'Job / WFH Scam'
  | 'Electricity Bill Fraud'
  | 'Delivery / Courier Phishing'
  | 'Government Grant Scam'
  | 'Social Media Impersonation'
  | 'Legitimate / Safe';

export type SeverityLevel = 'Safe' | 'Low' | 'Moderate' | 'Elevated' | 'Critical';

export interface ThreatSignal {
  id: string;
  name: string;
  category: 'Linguistic' | 'Brand' | 'URL' | 'Psychological' | 'Financial';
  score: number; // 0-100
  weight: 'High' | 'Critical' | 'Medium' | 'Low';
  description: string;
  matchedSnippet?: string;
}

export interface ExplainablePoint {
  title: string;
  technicalReason: string;
  regionalContext: string;
  severity: 'Critical' | 'Elevated' | 'Moderate' | 'Low' | 'Info';
  category: string;
}

export interface RegionalAdvice {
  language: string;
  nativeScript: string;
  warningTitle: string;
  adviceText: string;
  actionChecklist: string[];
  helpline: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  originalMessage: string;
  detectedLanguage: SupportedLanguage;
  languageScript: string;
  languageConfidence: number; // e.g. 98.4%
  isCodeMixed: boolean;
  codeMixedRatio?: { primary: string; secondary: string; ratio: string };
  riskScore: number; // 0-100
  classification: SeverityLevel;
  category: ThreatCategory;
  targetBrand?: string;
  claimedEntity?: string;
  extractedUrls: string[];
  signals: ThreatSignal[];
  explainablePoints: ExplainablePoint[];
  regionalAdvice: Record<string, RegionalAdvice>;
  modelConfidence: number;
  tokensAnalyzed: number;
  inferenceTimeMs: number;
  socActionRecommended: 'BLOCK_AND_ALERT' | 'FLAG_FOR_REVIEW' | 'ALLOW_AND_MONITOR';
}

export interface DomainSegment {
  type: 'protocol' | 'subdomain' | 'brand-spoof' | 'domain' | 'tld' | 'path';
  value: string;
  isSuspicious: boolean;
  reason?: string;
}

export interface URLAnalysisResult {
  id: string;
  url: string;
  domain: string;
  protocol: string;
  isHttps: boolean;
  sslValid: boolean;
  sslIssuer?: string;
  domainAgeDays: number;
  redirectHops: number;
  claimedBrand: string;
  actualHost: string;
  isDomainMismatch: boolean;
  homoglyphDetected: boolean;
  homoglyphDetails?: string;
  tldRiskLevel: 'High' | 'Moderate' | 'Low';
  riskScore: number;
  classification: SeverityLevel;
  structuralBreakdown: DomainSegment[];
  threatSignals: { name: string; score: number; detail: string }[];
  heuristicTriggers: string[];
}

export interface ThreatHistoryItem {
  id: string;
  timestamp: string;
  timeAgo: string;
  messagePreview: string;
  language: SupportedLanguage;
  category: ThreatCategory;
  riskScore: number;
  classification: SeverityLevel;
  status: 'Blocked' | 'Flagged' | 'Monitored' | 'Resolved';
  targetBrand?: string;
  detectedVector: string;
  channel: 'SMS' | 'WhatsApp' | 'Telegram' | 'Email';
}

export interface LanguageStat {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  status: 'Full Support' | 'Beta' | 'Expanding';
  messagesAnalyzed: number;
  threatsDetected: number;
  threatRate: number; // percentage
  topVector: string;
  sampleThreat: string;
}

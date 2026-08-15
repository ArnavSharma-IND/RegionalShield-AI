import { SupportedLanguage, ThreatCategory, SeverityLevel } from '../types/threat';

export interface DemoScenario {
  id: string;
  title: string;
  badge: string;
  language: SupportedLanguage;
  nativeLanguageLabel: string;
  category: ThreatCategory;
  expectedRiskScore: number;
  expectedClassification: SeverityLevel;
  channel: 'SMS' | 'WhatsApp' | 'Telegram' | 'Email';
  sender: string;
  messageText: string;
  shortDescription: string;
  keySignals: string[];
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'bengali-sbi-kyc',
    title: 'Bengali SBI KYC Suspension Scam',
    badge: 'Critical Threat · Bengali',
    language: 'Bengali',
    nativeLanguageLabel: 'বাংলা',
    category: 'KYC Verification Scam',
    expectedRiskScore: 94,
    expectedClassification: 'Critical',
    channel: 'SMS',
    sender: 'VM-SBIINB',
    messageText: 'আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে। আজ রাত ১২টার মধ্যে আপডেট না করলে অ্যাকাউন্ট ব্লক হয়ে যাবে। অবিলম্বে ভেরিফাই করুন: https://sbi-kyc-update-portal.xyz',
    shortDescription: 'Classic urgent banking phishing in Bengali claiming SBI KYC expiration with time-pressure deadline.',
    keySignals: [
      'State Bank of India Brand Impersonation',
      'Urgency Pressure (আজ রাত ১২টার মধ্যে - Midnight Deadline)',
      'Threat of Account Freeze (অ্যাকাউন্ট ব্লক হয়ে যাবে)',
      'Suspicious Domain Anomaly (.xyz TLD mimicking SBI)'
    ]
  },
  {
    id: 'hindi-upi-refund',
    title: 'Hindi UPI Cash Refund Fraud',
    badge: 'Critical Threat · Hindi',
    language: 'Hindi',
    nativeLanguageLabel: 'हिन्दी',
    category: 'UPI Refund Fraud',
    expectedRiskScore: 88,
    expectedClassification: 'Critical',
    channel: 'WhatsApp',
    sender: '+91 98312 88472',
    messageText: 'प्रिय ग्राहक, आपका ₹4,999 का UPI कैशबैक रिफंड लंबित है। अपने PhonePe/GPay वॉलेट में ट्रांसफर करने के लिए तुरंत 6 डिजिट का UPI PIN दर्ज करें: https://phonepe-reward-claim.online',
    shortDescription: 'Hindi social engineering scam attempting to solicit UPI PIN under the guise of an instant cashback refund.',
    keySignals: [
      'UPI Reversal Vector (Reversing Receive vs Send mechanics)',
      'PhonePe / GPay Brand Spoofing',
      'Credential Extraction (UPI PIN solicitation)',
      'High-risk unverified domain (.online)'
    ]
  },
  {
    id: 'hinglish-power-bill',
    title: 'Hinglish Electricity Disconnect Alert',
    badge: 'Elevated Threat · Code-Mixed',
    language: 'Code-Mixed (Hinglish)',
    nativeLanguageLabel: 'Hinglish (Hindi + English)',
    category: 'Electricity Bill Fraud',
    expectedRiskScore: 82,
    expectedClassification: 'Elevated',
    channel: 'SMS',
    sender: 'DZ-BIJLI',
    messageText: 'Alert! Aapka electricity bill unpaid hai. Aaj raat 9:30 PM power connection cut ho jayega. Turant officer Rajesh Sharma ko call karein ya bill pay karein: https://wb-bijlibill-pay.site',
    shortDescription: 'Code-mixed Hinglish utility scam threatening power disconnection with fake officer contact.',
    keySignals: [
      'Code-Mixed Dialect Parsing (Hindi grammar in Latin script)',
      'Panic Inducement (Power cutoff in hours)',
      'Rogue Electricity Board Impersonation',
      'Suspicious Gateway Link (.site TLD)'
    ]
  },
  {
    id: 'tamil-courier-scam',
    title: 'Tamil India Post Courier Scam',
    badge: 'Elevated Threat · Tamil',
    language: 'Tamil',
    nativeLanguageLabel: 'தமிழ்',
    category: 'Delivery / Courier Phishing',
    expectedRiskScore: 79,
    expectedClassification: 'Elevated',
    channel: 'SMS',
    sender: 'IM-POSTIN',
    messageText: 'உங்கள் இந்தியா போஸ்ட் பார்சல் தவறான முகவரி காரணமாக நிறுத்தப்பட்டுள்ளது. 24 மணி நேரத்திற்குள் முகவரியை புதுப்பிக்கவும்: https://indiapost-parcel-tracking.cc',
    shortDescription: 'Tamil delivery phishing scam claiming failed parcel delivery due to incorrect address.',
    keySignals: [
      'India Post National Carrier Impersonation',
      'Delivery Address Update Trap',
      '24-Hour Expiration Urgency (24 மணி நேரத்திற்குள்)',
      'Offshore TLD (.cc registrar anomaly)'
    ]
  },
  {
    id: 'telugu-wfh-scam',
    title: 'Telugu Telegram Job & Crypto Trap',
    badge: 'Elevated Threat · Telugu',
    language: 'Telugu',
    nativeLanguageLabel: 'తెలుగు',
    category: 'Job / WFH Scam',
    expectedRiskScore: 76,
    expectedClassification: 'Elevated',
    channel: 'WhatsApp',
    sender: '+91 87123 44910',
    messageText: 'వర్క్ ఫ్రమ్ హోమ్ పార్ట్ టైమ్ జాబ్ అవకాశం! యూట్యూబ్ వీడియోలను లైక్ చేయడం ద్వారా రోజుకు ₹2,500 నుండి ₹6,000 వరకు సంపాదించండి. ఇప్పుడే చేరండి: https://telegram-quick-earn.top',
    shortDescription: 'Telugu fraudulent part-time job offer promising daily payouts for liking videos.',
    keySignals: [
      'Unrealistic Earning Promise (₹2500-₹6000/day)',
      'Task Scam Pattern (YouTube video likes)',
      'Telegram Funneling vector',
      'High-Risk TLD (.top)'
    ]
  },
  {
    id: 'safe-sbi-otp',
    title: 'Legitimate SBI NetBanking OTP (Safe Control)',
    badge: 'Safe Control · English',
    language: 'English',
    nativeLanguageLabel: 'English',
    category: 'Legitimate / Safe',
    expectedRiskScore: 6,
    expectedClassification: 'Safe',
    channel: 'SMS',
    sender: 'SBI-INB-SEC',
    messageText: '849201 is your OTP for SBI Online Banking login on 15-Aug-2026. Valid for 3 mins. Never share your OTP or password with anyone. SBI never calls to ask for OTP.',
    shortDescription: 'Official standard bank security OTP with explicit anti-phishing warnings and no external links.',
    keySignals: [
      'Standard 6-digit one-time authorization token',
      'Strict Zero-Trust Disclaimer ("Never share OTP")',
      'Absence of links, shortened URLs, or redirection',
      'Standard short validity period (3 mins)'
    ]
  }
];

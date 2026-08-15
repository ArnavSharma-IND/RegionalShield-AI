import { ThreatHistoryItem, LanguageStat } from '../types/threat';

export const MOCK_THREAT_HISTORY: ThreatHistoryItem[] = [
  {
    id: 'TH-2026-8821',
    timestamp: '2026-08-15T17:45:00Z',
    timeAgo: '2 min ago',
    messagePreview: 'আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে। আজ রাত ১২টার মধ্যে...',
    language: 'Bengali',
    category: 'KYC Verification Scam',
    riskScore: 94,
    classification: 'Critical',
    status: 'Blocked',
    targetBrand: 'SBI',
    detectedVector: 'Brand Impersonation + Urgency Panic',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8819',
    timestamp: '2026-08-15T17:39:00Z',
    timeAgo: '8 min ago',
    messagePreview: 'प्रिय ग्राहक, आपका ₹4,999 का UPI कैशबैक रिफंड लंबित है...',
    language: 'Hindi',
    category: 'UPI Refund Fraud',
    riskScore: 88,
    classification: 'Critical',
    status: 'Blocked',
    targetBrand: 'PhonePe / UPI',
    detectedVector: 'Reverse UPI PIN Trap',
    channel: 'WhatsApp'
  },
  {
    id: 'TH-2026-8815',
    timestamp: '2026-08-15T17:33:00Z',
    timeAgo: '14 min ago',
    messagePreview: 'Alert! Aapka electricity bill unpaid hai. Aaj raat 9:30 PM power connection...',
    language: 'Code-Mixed (Hinglish)',
    category: 'Electricity Bill Fraud',
    riskScore: 82,
    classification: 'Elevated',
    status: 'Flagged',
    targetBrand: 'WBSEDCL / Power Utility',
    detectedVector: 'Code-Mixed Utility Disconnect Panic',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8809',
    timestamp: '2026-08-15T17:18:00Z',
    timeAgo: '29 min ago',
    messagePreview: 'உங்கள் இந்தியா போஸ்ட் பார்சல் தவறான முகவரி காரணமாக நிறுத்தப்பட்டுள்ளது...',
    language: 'Tamil',
    category: 'Delivery / Courier Phishing',
    riskScore: 79,
    classification: 'Elevated',
    status: 'Flagged',
    targetBrand: 'India Post',
    detectedVector: 'Parcel Address Spoof Link',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8802',
    timestamp: '2026-08-15T16:55:00Z',
    timeAgo: '52 min ago',
    messagePreview: 'వర్క్ ఫ్రమ్ హోమ్ పార్ట్ టైమ్ జాబ్ అవకాశం! రోజుకు ₹2,500 నుండి ₹6,000...',
    language: 'Telugu',
    category: 'Job / WFH Scam',
    riskScore: 76,
    classification: 'Elevated',
    status: 'Flagged',
    targetBrand: 'Telegram Job Ring',
    detectedVector: 'Task Scam / Prepaid Crypto Trap',
    channel: 'WhatsApp'
  },
  {
    id: 'TH-2026-8796',
    timestamp: '2026-08-15T16:30:00Z',
    timeAgo: '1.2 hrs ago',
    messagePreview: '849201 is your OTP for SBI Online Banking login. Valid for 3 mins...',
    language: 'English',
    category: 'Legitimate / Safe',
    riskScore: 6,
    classification: 'Safe',
    status: 'Resolved',
    targetBrand: 'SBI Official',
    detectedVector: 'Standard Compliance Authorization',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8790',
    timestamp: '2026-08-15T15:50:00Z',
    timeAgo: '1.9 hrs ago',
    messagePreview: 'પ્રધાનમંત્રી આવાસ યોજના હેઠળ ₹2,50,000 ની સહાય મંજૂર થઈ છે...',
    language: 'Gujarati',
    category: 'Government Grant Scam',
    riskScore: 91,
    classification: 'Critical',
    status: 'Blocked',
    targetBrand: 'PM Awas Yojana',
    detectedVector: 'Government Grant Advance Fee Fraud',
    channel: 'WhatsApp'
  },
  {
    id: 'TH-2026-8782',
    timestamp: '2026-08-15T14:40:00Z',
    timeAgo: '3.0 hrs ago',
    messagePreview: 'तुमचे HDFC बँक खाते तात्पुरते ब्लॉक केले आहे. पॅन कार्ड अपडेट करा...',
    language: 'Marathi',
    category: 'Banking Phishing',
    riskScore: 89,
    classification: 'Critical',
    status: 'Blocked',
    targetBrand: 'HDFC Bank',
    detectedVector: 'PAN Card Linking Trap',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8775',
    timestamp: '2026-08-15T13:15:00Z',
    timeAgo: '4.5 hrs ago',
    messagePreview: 'તમારું ઇલેક્ટ્રિસિટી બિલ બાકી છે, આજે રાત્રે લાઈટ કનેક્શન કાપી નાખવામાં આવશે...',
    language: 'Gujarati',
    category: 'Electricity Bill Fraud',
    riskScore: 84,
    classification: 'Elevated',
    status: 'Flagged',
    targetBrand: 'GUVNL Utility',
    detectedVector: 'Utility Disconnect Vector',
    channel: 'SMS'
  },
  {
    id: 'TH-2026-8768',
    timestamp: '2026-08-15T11:20:00Z',
    timeAgo: '6.4 hrs ago',
    messagePreview: 'ਪੰਜਾਬ ਨੈਸ਼ਨਲ ਬੈਂਕ ਖਾਤਾ ਬਲਾਕ ਹੋ ਗਿਆ ਹੈ। ਤੁਰੰਤ ਕੇਵਾਈਸੀ ਅਪਡੇਟ ਕਰੋ...',
    language: 'Punjabi',
    category: 'KYC Verification Scam',
    riskScore: 92,
    classification: 'Critical',
    status: 'Blocked',
    targetBrand: 'PNB',
    detectedVector: 'Regional Dialect PNB Phish',
    channel: 'SMS'
  }
];

export const MOCK_LANGUAGE_STATS: LanguageStat[] = [
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali Script (বাংলা লিপি)',
    status: 'Full Support',
    messagesAnalyzed: 2840,
    threatsDetected: 642,
    threatRate: 22.6,
    topVector: 'SBI KYC Expiration & WBSEDCL Bill Scams',
    sampleThreat: 'আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে...'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari (देवनागरी)',
    status: 'Full Support',
    messagesAnalyzed: 4120,
    threatsDetected: 890,
    threatRate: 21.6,
    topVector: 'UPI Cashback Reversal & Aadhaar PAN Traps',
    sampleThreat: 'प्रिय ग्राहक, आपका ₹4,999 का UPI कैशबैक...'
  },
  {
    code: 'en',
    name: 'English (Indian Digital Context)',
    nativeName: 'English',
    script: 'Latin Alphabet',
    status: 'Full Support',
    messagesAnalyzed: 3150,
    threatsDetected: 410,
    threatRate: 13.0,
    topVector: 'Job Offers, Income Tax Refund & Crypto Phish',
    sampleThreat: 'Your Tax Refund of ₹18,450 is approved...'
  },
  {
    code: 'code-mixed',
    name: 'Code-Mixed (Hinglish / Benglish)',
    nativeName: 'Hinglish / Benglish',
    script: 'Latin + Indic Lexemes',
    status: 'Full Support',
    messagesAnalyzed: 1420,
    threatsDetected: 312,
    threatRate: 21.9,
    topVector: 'Electricity Bill Disconnect & SIM Expiration',
    sampleThreat: 'Aapka electricity bill unpaid hai. Raat 9:30...'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil (தமிழ் எழுத்துக்கள்)',
    status: 'Full Support',
    messagesAnalyzed: 950,
    threatsDetected: 198,
    threatRate: 20.8,
    topVector: 'India Post Delivery & Canara Bank KYC',
    sampleThreat: 'உங்கள் இந்தியா போஸ்ட் பார்சல் தவறான...'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu (తెలుగు లిపి)',
    status: 'Full Support',
    messagesAnalyzed: 890,
    threatsDetected: 174,
    threatRate: 19.5,
    topVector: 'Telegram Part-time Work & APGVB Bank KYC',
    sampleThreat: 'వర్క్ ఫ్రమ్ హోమ్ పార్ట్ టైమ్ జాబ్...'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari (मराठी)',
    status: 'Beta',
    messagesAnalyzed: 640,
    threatsDetected: 122,
    threatRate: 19.1,
    topVector: 'MSEDCL Bill Scam & Bank Account Freeze',
    sampleThreat: 'तुमचे बँक खाते तात्पुरते ब्लॉक केले आहे...'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati (ગુજરાતી)',
    status: 'Beta',
    messagesAnalyzed: 510,
    threatsDetected: 98,
    threatRate: 19.2,
    topVector: 'PM Awas Yojana & Stock Trading Traps',
    sampleThreat: 'પ્રધાનમંત્રી આવાસ યોજના હેઠળ ₹2,50,000...'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi (ਗੁਰਮੁਖੀ)',
    status: 'Expanding',
    messagesAnalyzed: 340,
    threatsDetected: 64,
    threatRate: 18.8,
    topVector: 'PNB KYC Alert & Visa Work Scam',
    sampleThreat: 'ਪੰਜਾਬ ਨੈਸ਼ਨਲ ਬੈਂਕ ਖਾਤਾ ਬਲਾਕ ਹੋ ਗਿਆ...'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia (ଓଡ଼ିଆ)',
    status: 'Expanding',
    messagesAnalyzed: 280,
    threatsDetected: 48,
    threatRate: 17.1,
    topVector: 'Mo Seva Kendra Impersonation & UPI Traps',
    sampleThreat: 'ଆପଣଙ୍କ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବ୍ଲକ ହୋଇଯାଇଛି...'
  }
];

export const MOCK_CHART_DATA = {
  '24H': [
    { time: '00:00', threats: 12, safe: 48, critical: 4 },
    { time: '03:00', threats: 8, safe: 32, critical: 2 },
    { time: '06:00', threats: 14, safe: 55, critical: 5 },
    { time: '09:00', threats: 38, safe: 140, critical: 16 },
    { time: '12:00', threats: 62, safe: 210, critical: 28 },
    { time: '15:00', threats: 54, safe: 190, critical: 24 },
    { time: '18:00', threats: 71, safe: 245, critical: 35 },
    { time: '21:00', threats: 48, safe: 180, critical: 20 },
  ],
  '7D': [
    { time: 'Mon', threats: 280, safe: 1120, critical: 110 },
    { time: 'Tue', threats: 310, safe: 1250, critical: 135 },
    { time: 'Wed', threats: 395, safe: 1480, critical: 175 },
    { time: 'Thu', threats: 340, safe: 1310, critical: 145 },
    { time: 'Fri', threats: 430, safe: 1620, critical: 195 },
    { time: 'Sat', threats: 490, safe: 1810, critical: 220 },
    { time: 'Sun', threats: 410, safe: 1540, critical: 180 },
  ],
  '30D': [
    { time: 'Week 1', threats: 2100, safe: 8400, critical: 920 },
    { time: 'Week 2', threats: 2450, safe: 9600, critical: 1080 },
    { time: 'Week 3', threats: 2890, safe: 11200, critical: 1290 },
    { time: 'Week 4', threats: 3120, safe: 12400, critical: 1410 },
  ]
};

export const CATEGORY_BREAKDOWN = [
  { name: 'Banking Phishing', value: 38, color: '#EF4444' },
  { name: 'KYC Verification', value: 24, color: '#F97316' },
  { name: 'UPI Refund Scams', value: 16, color: '#F59E0B' },
  { name: 'Electricity / Utility', value: 10, color: '#3B82F6' },
  { name: 'Job & WFH Scams', value: 7, color: '#8B5CF6' },
  { name: 'Delivery / Courier', value: 5, color: '#06B6D4' }
];

export const REGIONAL_VECTOR_DATA = [
  { state: 'West Bengal', primaryLanguage: 'Bengali', volume: 'High', threatIndex: 92, vector: 'SBI KYC + WBSEDCL Electric Disconnect' },
  { state: 'Uttar Pradesh & Bihar', primaryLanguage: 'Hindi', volume: 'Very High', threatIndex: 94, vector: 'UPI Reversal PIN + Ration/Scheme Scams' },
  { state: 'Maharashtra', primaryLanguage: 'Marathi / Hindi', volume: 'High', threatIndex: 88, vector: 'MSEDCL Bill + Credit Card Limit Increase' },
  { state: 'Tamil Nadu', primaryLanguage: 'Tamil', volume: 'Medium', threatIndex: 81, vector: 'India Post Delivery + Telecom SIM Expiry' },
  { state: 'Andhra Pradesh & Telangana', primaryLanguage: 'Telugu', volume: 'Medium', threatIndex: 79, vector: 'Telegram Task Scams + Fake Loan Apps' },
  { state: 'Gujarat', primaryLanguage: 'Gujarati', volume: 'Medium', threatIndex: 83, vector: 'Demat / IPO Share Allotment Phishing' },
  { state: 'Punjab', primaryLanguage: 'Punjabi', volume: 'Moderate', threatIndex: 76, vector: 'Visa Sponsorship + PNB NetBanking KYC' }
];

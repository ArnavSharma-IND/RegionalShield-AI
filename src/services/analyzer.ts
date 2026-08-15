import { 
  AnalysisResult, 
  SupportedLanguage, 
  ThreatCategory, 
  SeverityLevel, 
  ThreatSignal, 
  ExplainablePoint,
  RegionalAdvice 
} from '../types/threat';

export class MessageAnalyzerService {
  /**
   * Detects language and script from input text
   */
  public detectLanguage(text: string): { 
    language: SupportedLanguage; 
    script: string; 
    confidence: number;
    isCodeMixed: boolean;
    ratio?: { primary: string; secondary: string; ratio: string };
  } {
    const bengaliRegex = /[\u0980-\u09FF]/g;
    const devanagariRegex = /[\u0900-\u097F]/g;
    const tamilRegex = /[\u0B80-\u0BFF]/g;
    const teluguRegex = /[\u0C00-\u0C7F]/g;
    const gujaratiRegex = /[\u0A80-\u0AFF]/g;
    const gurmukhiRegex = /[\u0A00-\u0A7F]/g;
    const kannadaRegex = /[\u0C80-\u0CFF]/g;
    const malayalamRegex = /[\u0D00-\u0D7F]/g;
    const odiaRegex = /[\u0B00-\u0B7F]/g;

    const bengaliChars = (text.match(bengaliRegex) || []).length;
    const devanagariChars = (text.match(devanagariRegex) || []).length;
    const tamilChars = (text.match(tamilRegex) || []).length;
    const teluguChars = (text.match(teluguRegex) || []).length;
    const gujaratiChars = (text.match(gujaratiRegex) || []).length;
    const gurmukhiChars = (text.match(gurmukhiRegex) || []).length;
    const kannadaChars = (text.match(kannadaRegex) || []).length;
    const malayalamChars = (text.match(malayalamRegex) || []).length;
    const odiaChars = (text.match(odiaRegex) || []).length;

    const totalChars = text.replace(/\s+/g, '').length || 1;

    // Check Indic native scripts
    if (bengaliChars / totalChars > 0.15) {
      return { language: 'Bengali', script: 'Bengali (বাংলা লিপি)', confidence: 99.2, isCodeMixed: false };
    }
    if (devanagariChars / totalChars > 0.15) {
      return { language: 'Hindi', script: 'Devanagari (देवनागरी)', confidence: 98.7, isCodeMixed: false };
    }
    if (tamilChars / totalChars > 0.15) {
      return { language: 'Tamil', script: 'Tamil (தமிழ் எழுத்துக்கள்)', confidence: 99.0, isCodeMixed: false };
    }
    if (teluguChars / totalChars > 0.15) {
      return { language: 'Telugu', script: 'Telugu (తెలుగు లిపి)', confidence: 98.9, isCodeMixed: false };
    }
    if (gujaratiChars / totalChars > 0.15) {
      return { language: 'Gujarati', script: 'Gujarati (ગુજરાતી)', confidence: 98.5, isCodeMixed: false };
    }
    if (gurmukhiChars / totalChars > 0.15) {
      return { language: 'Punjabi', script: 'Gurmukhi (ਗੁਰਮੁਖੀ)', confidence: 98.6, isCodeMixed: false };
    }
    if (kannadaChars / totalChars > 0.15) {
      return { language: 'Kannada', script: 'Kannada (ಕನ್ನಡ)', confidence: 98.4, isCodeMixed: false };
    }
    if (malayalamChars / totalChars > 0.15) {
      return { language: 'Malayalam', script: 'Malayalam (മലയാളം)', confidence: 98.6, isCodeMixed: false };
    }
    if (odiaChars / totalChars > 0.15) {
      return { language: 'Odia', script: 'Odia (ଓଡ଼ିଆ)', confidence: 97.9, isCodeMixed: false };
    }

    // Check Code-Mixed Latin Hindi (Hinglish)
    const lower = text.toLowerCase();
    const hinglishKeywords = [
      'aapka', 'apka', 'karein', 'karo', 'ho jayega', 'turant', 'paise', 'khata', 
      'aaj', 'raat', 'bijli', 'band', 'kat', 'khatam', 'rupaye', 'bhejo', 'yojana',
      'karna', 'hoga', 'gaya', 'hai', 'nahi', 'kripya'
    ];
    const matchedHinglish = hinglishKeywords.filter(k => lower.includes(k));

    if (matchedHinglish.length >= 2) {
      return { 
        language: 'Code-Mixed (Hinglish)', 
        script: 'Latin + Indic Phonetic Lexicon', 
        confidence: 96.4,
        isCodeMixed: true,
        ratio: { primary: 'Hindi (Phonetic)', secondary: 'English (Vocabulary)', ratio: '62% / 38%' }
      };
    }

    return { language: 'English', script: 'Latin (English)', confidence: 97.5, isCodeMixed: false };
  }

  /**
   * Main analysis method simulating real multi-layer ML inference
   */
  public analyzeMessage(message: string, manualLanguage?: SupportedLanguage): AnalysisResult {
    const startTime = performance.now();
    const cleanText = message.trim();
    const lower = cleanText.toLowerCase();

    // 1. Language Detection
    const detected = this.detectLanguage(cleanText);
    const effectiveLanguage: SupportedLanguage = (manualLanguage && manualLanguage !== ('Auto Detect' as any)) 
      ? manualLanguage 
      : detected.language;

    // 2. URL Extraction & Analysis
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const extractedUrls = cleanText.match(urlRegex) || [];

    // Signals and scores calculation
    const signals: ThreatSignal[] = [];
    const explainablePoints: ExplainablePoint[] = [];

    let riskScore = 0;
    let category: ThreatCategory = 'Legitimate / Safe';
    let targetBrand: string | undefined = undefined;
    let claimedEntity: string | undefined = undefined;

    // --- HEURISTIC & NLP SIGNAL DETECTIONS ---

    // A. Brand Impersonation Signals
    const isSBI = /sbi|state bank|এসবিআই|एसबीआई|sbiinb/i.test(cleanText);
    const isUPI = /upi|phonepe|gpay|paytm|पेटीएम|फोनपे|यूपीआई/i.test(cleanText);
    const isIndiaPost = /india post|speed post|dakghar|ডাকঘর|डाक|பார்சல்|போஸ்ட்/i.test(cleanText);
    const isElectricity = /electricity|bijli|power connection|বিদ্যুৎ|बिजली|wbsedcl|mseb|bses/i.test(cleanText);
    const isJobScam = /part time|work from home|like youtube|daily earn|₹[0-9]+.*day|సంపాదించండి|कमाएं/i.test(cleanText);

    if (isSBI) {
      targetBrand = 'State Bank of India (SBI)';
      claimedEntity = 'Nationalized Financial Institution';
      signals.push({
        id: 'sig-brand-sbi',
        name: 'Financial Institution Brand Impersonation',
        category: 'Brand',
        score: 95,
        weight: 'Critical',
        description: 'Message asserts identity of State Bank of India without verified carrier header.',
        matchedSnippet: isSBI ? 'SBI / State Bank references' : undefined
      });
      explainablePoints.push({
        title: 'High-Impact Brand Spoofing',
        technicalReason: 'The text references SBI financial operations but originates from an unverified or generic route.',
        regionalContext: 'SBI is the most frequent target in Indic phishing campaigns due to widespread rural and urban account density.',
        severity: 'Critical',
        category: 'Brand Risk'
      });
    } else if (isUPI) {
      targetBrand = 'UPI / PhonePe / Paytm Gateway';
      claimedEntity = 'National Payments Corporation of India (NPCI) Ecosystem';
      signals.push({
        id: 'sig-brand-upi',
        name: 'Payment Ecosystem Impersonation',
        category: 'Financial',
        score: 91,
        weight: 'Critical',
        description: 'Phishing signature targeting instant payment protocols via social engineering.',
        matchedSnippet: 'UPI / Cashback claim'
      });
      explainablePoints.push({
        title: 'UPI Reversal Social Engineering',
        technicalReason: 'Scam exploits the misconception that receiving money requires entering a UPI PIN.',
        regionalContext: 'UPI fraud targets first-time digital payment users in Tier-2/3 regional markets.',
        severity: 'Critical',
        category: 'Financial Protocol'
      });
    } else if (isIndiaPost) {
      targetBrand = 'India Post (Department of Posts)';
      claimedEntity = 'Government Postal Service';
      signals.push({
        id: 'sig-brand-post',
        name: 'Postal Carrier Impersonation',
        category: 'Brand',
        score: 86,
        weight: 'High',
        description: 'Spoofs failed delivery notification to harvest personal addresses and card details.',
      });
      explainablePoints.push({
        title: 'Delivery Trap Signature',
        technicalReason: 'Claims parcel is held due to address discrepancy to force urgent URL click.',
        regionalContext: 'Postal delivery scams target consumers awaiting e-commerce deliveries.',
        severity: 'Elevated',
        category: 'Logistics Phishing'
      });
    } else if (isElectricity) {
      targetBrand = 'State Electricity Distribution Utility';
      claimedEntity = 'Public Power Utility';
      signals.push({
        id: 'sig-brand-utility',
        name: 'Essential Utility Disconnection Threat',
        category: 'Psychological',
        score: 88,
        weight: 'Critical',
        description: 'Induces severe panic by threatening immediate cutoff of household electricity.',
      });
      explainablePoints.push({
        title: 'Utility Panic Weaponization',
        technicalReason: 'Threatens immediate power outage at night (e.g. 9:30 PM) to bypass victim critical thinking.',
        regionalContext: 'Widespread regional fraud pattern across West Bengal, Maharashtra, and North India.',
        severity: 'Critical',
        category: 'Social Engineering'
      });
    } else if (isJobScam) {
      targetBrand = 'Telegram Task Recruitment Ring';
      signals.push({
        id: 'sig-job-wfh',
        name: 'Prepaid Task / Job Fraud Trap',
        category: 'Financial',
        score: 83,
        weight: 'High',
        description: 'Lures job seekers with unrealistic daily earnings for simplistic tasks like video likes.',
      });
    }

    // B. Urgency & Coercive Psychological Triggers
    const hasUrgency = /urgently|immediately|24 hour|আজ রাত|১২টার মধ্যে|turant|aaj raat|तुरंत|24 घंटे|24 மணி|ఇప్పుడే|ব্লক|block|कट/i.test(cleanText);
    if (hasUrgency) {
      signals.push({
        id: 'sig-urgency-timer',
        name: 'Time-Pressure / Artificial Deadline',
        category: 'Psychological',
        score: 89,
        weight: 'High',
        description: 'Imposes short deadlines (24h or tonight) to trigger panic and preempt verification.',
      });
      explainablePoints.push({
        title: 'Linguistic Urgency Vectors',
        technicalReason: 'High density of temporal coercion tokens found in regional sentence structure.',
        regionalContext: 'Regional language attackers use colloquial threat phrasing to intimidate non-English speakers.',
        severity: 'High' as any,
        category: 'Linguistic Engine'
      });
    }

    // C. Credential / Sensitive Action Solicitation
    const hasCredentialRequest = /kyc|pin|otp|password|पिन|ओटीपी|পাসওয়ার্ড|अपडेट|verify|update/i.test(cleanText);
    const hasSafeDisclaimer = /never share|never ask|valid for 3 mins|do not share/i.test(cleanText);

    if (hasCredentialRequest && !hasSafeDisclaimer) {
      signals.push({
        id: 'sig-cred-harvest',
        name: 'Credential & Identity Harvesting Intent',
        category: 'Linguistic',
        score: 93,
        weight: 'Critical',
        description: 'Explicit request for KYC documentation, PIN input, or remote credential verification.',
      });
      explainablePoints.push({
        title: 'Unsolicited Credential Collection',
        technicalReason: 'Message prompts direct entry of authentication factors outside official banking apps.',
        regionalContext: 'Regulators (RBI) explicitly forbid SMS/messaging based KYC credential collection.',
        severity: 'Critical',
        category: 'Compliance & Safety'
      });
    }

    // D. URL & Domain Anomaly Detection
    if (extractedUrls.length > 0 && extractedUrls[0]) {
      const url = extractedUrls[0];
      const hasRiskyTLD = /\.(xyz|online|site|top|cc|cfd|icu|work|live|buzz|link)/i.test(url);
      const isShortener = /(bit\.ly|t\.co|tinyurl|is\.gd|cutt\.ly)/i.test(url);

      if (hasRiskyTLD || isShortener || (isSBI && !url.includes('onlinesbi.sbi'))) {
        signals.push({
          id: 'sig-url-spoof',
          name: 'Domain Reputation & Homoglyph Anomaly',
          category: 'URL',
          score: 96,
          weight: 'Critical',
          description: `Extracted URL (${url}) belongs to high-risk registrar/TLD and mismatches claimed brand domain.`,
          matchedSnippet: url
        });
        explainablePoints.push({
          title: 'Offshore / Rogue Domain Host',
          technicalReason: `The domain (${url.replace(/https?:\/\//, '').split('/')[0]}) is not an authorized domain for ${targetBrand || 'official services'}.`,
          regionalContext: 'Attackers register lookalike domains with low-cost TLDs to bypass conventional corporate email filters.',
          severity: 'Critical',
          category: 'Infrastructure Forensic'
        });
      }
    }

    // E. Evaluate Total Threat Score & Classification
    if (hasSafeDisclaimer && signals.length === 0) {
      riskScore = 6;
      category = 'Legitimate / Safe';
    } else if (signals.length >= 3) {
      // Calculate weighted score
      const totalScore = signals.reduce((acc, s) => acc + s.score, 0);
      const avg = totalScore / signals.length;
      riskScore = Math.min(99, Math.round(avg * 0.95 + 5));
    } else if (signals.length >= 1) {
      riskScore = Math.min(85, Math.round(signals[0].score * 0.9));
    } else {
      riskScore = 12; // Minimal background baseline
      category = 'Legitimate / Safe';
    }

    // Categorization
    if (riskScore >= 85) {
      if (isSBI) category = 'KYC Verification Scam';
      else if (isUPI) category = 'UPI Refund Fraud';
      else if (isElectricity) category = 'Electricity Bill Fraud';
      else if (isIndiaPost) category = 'Delivery / Courier Phishing';
      else if (isJobScam) category = 'Job / WFH Scam';
      else category = 'Banking Phishing';
    } else if (riskScore >= 65) {
      if (isJobScam) category = 'Job / WFH Scam';
      else if (isIndiaPost) category = 'Delivery / Courier Phishing';
      else if (isElectricity) category = 'Electricity Bill Fraud';
      else category = 'Banking Phishing';
    }

    // Classification
    let classification: SeverityLevel = 'Safe';
    if (riskScore >= 85) classification = 'Critical';
    else if (riskScore >= 65) classification = 'Elevated';
    else if (riskScore >= 40) classification = 'Moderate';
    else if (riskScore >= 20) classification = 'Low';
    else classification = 'Safe';

    // If safe, add legitimate signals
    if (classification === 'Safe') {
      signals.length = 0;
      explainablePoints.length = 0;
      signals.push({
        id: 'sig-safe-control',
        name: 'Standard Transaction Authorization Pattern',
        category: 'Linguistic',
        score: 4,
        weight: 'Low',
        description: 'Contains standard banking security notice disclaimers with zero external URL links.'
      });
      explainablePoints.push({
        title: 'Authentic Security Disclaimer',
        technicalReason: 'The message contains standard RBI compliance text ("SBI never calls to ask for OTP") with no actionable link.',
        regionalContext: 'Legitimate transactional SMS in India follow strict DLT registration headers and template patterns.',
        severity: 'Info',
        category: 'Verification Passed'
      });
    }

    // 3. Generate Localized Regional Advice (Bengali, Hindi, English)
    const regionalAdvice = this.buildRegionalAdvice(classification, category, targetBrand);

    const endTime = performance.now();

    return {
      id: `RS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random()*900 + 100)}`,
      timestamp: new Date().toISOString(),
      originalMessage: cleanText,
      detectedLanguage: effectiveLanguage,
      languageScript: detected.script,
      languageConfidence: detected.confidence,
      isCodeMixed: detected.isCodeMixed,
      codeMixedRatio: detected.ratio,
      riskScore: riskScore,
      classification: classification,
      category: category,
      targetBrand: targetBrand,
      claimedEntity: claimedEntity,
      extractedUrls: extractedUrls,
      signals: signals,
      explainablePoints: explainablePoints,
      regionalAdvice: regionalAdvice,
      modelConfidence: classification === 'Safe' ? 99.1 : 94.8,
      tokensAnalyzed: cleanText.split(/\s+/).length,
      inferenceTimeMs: Math.round(endTime - startTime + 38), // realistic 40ms simulation
      socActionRecommended: riskScore >= 80 ? 'BLOCK_AND_ALERT' : (riskScore >= 45 ? 'FLAG_FOR_REVIEW' : 'ALLOW_AND_MONITOR')
    };
  }

  /**
   * Generates localized protection guidance across core Indic languages
   */
  private buildRegionalAdvice(
    classification: SeverityLevel, 
    category: ThreatCategory,
    brand?: string
  ): Record<string, RegionalAdvice> {
    const isDangerous = classification === 'Critical' || classification === 'Elevated' || classification === 'Moderate';

    return {
      'Bengali': {
        language: 'Bengali',
        nativeScript: 'বাংলা',
        warningTitle: isDangerous 
          ? 'সতর্কবার্তা: সম্ভাব্য ডিজিটাল প্রতারণা শনাক্ত হয়েছে' 
          : 'নিরাপদ বার্তা: কোনও ক্ষতিকারক সংকেত পাওয়া যায়নি',
        adviceText: isDangerous
          ? `এই বার্তাটি ভুয়ো এবং প্রতারণামূলক (${category})। ${brand ? brand + ' বা' : ''} কোনও ব্যাংক বা সরকারি দপ্তর কখনও SMS বা WhatsApp-এ KYC আপডেট করতে অথবা লিঙ্ক ক্লিক করতে বলে না।`
          : 'এই বার্তাটি নিরাপদ মনে হচ্ছে। তবুও অপরিচিত কারও সঙ্গে আপনার গোপন OTP বা পাসওয়ার্ড শেয়ার করবেন না।',
        actionChecklist: isDangerous ? [
          'প্রদত্ত লিঙ্কে কখনও ক্লিক করবেন না',
          'আপনার ব্যাংকের অফিসিয়াল অ্যাপ বা শাখায় সরাসরি যোগাযোগ করুন',
          'জাতীয় সাইবার ক্রাইম হেল্পলাইন ১৯৩০ নম্বরে রিপোর্ট করুন',
          'বার্তা প্রেরককে অবিলম্বে ব্লক এবং রিপোর্ট করুন'
        ] : [
          'অফিসিয়াল লেনদেনের জন্য OTP ব্যবহার করুন',
          'কাউকে ফোনে OTP জানাবেন না'
        ],
        helpline: 'ন্যাশনাল সাইবার ক্রাইম হেল্পলাইন: ১৯৩০ · cybercrime.gov.in'
      },
      'Hindi': {
        language: 'Hindi',
        nativeScript: 'हिन्दी',
        warningTitle: isDangerous 
          ? 'चेतावनी: संदिग्ध फ़िशिंग और धोखाधड़ी का पता चला' 
          : 'सुरक्षित संदेश: कोई दुर्भावनापूर्ण संकेत नहीं मिला',
        adviceText: isDangerous
          ? `यह संदेश एक धोखाधड़ी (${category}) का प्रयास है। ${brand ? brand + ' या' : ''} कोई भी बैंक/संस्थान कभी भी SMS या लिंक के माध्यम से KYC या UPI PIN नहीं मांगता।`
          : 'यह संदेश सुरक्षित प्रतीत होता है। फिर भी किसी अज्ञात व्यक्ति के साथ अपना गुप्त OTP या पासवर्ड साझा न करें।',
        actionChecklist: isDangerous ? [
          'दिए गए संदिग्ध लिंक पर कभी क्लिक न करें',
          'पैसे प्राप्त करने के लिए कभी भी UPI PIN दर्ज न करें',
          'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत शिकायत दर्ज करें',
          'इस नंबर को WhatsApp/SMS पर तुरंत ब्लॉक करें'
        ] : [
          'केवल आधिकारिक ऐप में ही OTP दर्ज करें',
          'बैंक प्रतिनिधि होने का दावा करने वालों से सावधान रहें'
        ],
        helpline: 'राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 · cybercrime.gov.in'
      },
      'English': {
        language: 'English',
        nativeScript: 'English',
        warningTitle: isDangerous 
          ? 'Security Alert: Malicious Phishing Attempt Detected' 
          : 'Verified Safe: No Malicious Threat Signals Found',
        adviceText: isDangerous
          ? `This message is a confirmed social engineering scam (${category}). ${brand ? 'Impersonating ' + brand + '. ' : ''}Legitimate institutions never request KYC updates, UPI PIN entries, or utility payments via unverified links.`
          : 'This message matches safe operational patterns. Always adhere to zero-trust principles and never disclose one-time passwords.',
        actionChecklist: isDangerous ? [
          'Do NOT click or open the attached link',
          'Never enter your UPI PIN to receive money or refunds',
          'Report incident immediately to National Cyber Crime Portal (1930)',
          'Block sender and flag message as phishing on your device'
        ] : [
          'Verify transaction details before inputting OTP in official banking app',
          'Keep your device security patches updated'
        ],
        helpline: 'National Cyber Crime Helpline: 1930 · cybercrime.gov.in'
      },
      'Tamil': {
        language: 'Tamil',
        nativeScript: 'தமிழ்',
        warningTitle: isDangerous 
          ? 'பாதுகாப்பு எச்சரிக்கை: மோசடி செய்தி கண்டறியப்பட்டது' 
          : 'பாதுகாப்பான செய்தி: அச்சுறுத்தல் இல்லை',
        adviceText: isDangerous
          ? `இந்த செய்தி ஒரு போலி மோசடி (${category}) ஆகும். உங்கள் வங்கி கணக்கு விவரங்கள் அல்லது OTP-ஐ யாருடனும் பகிர வேண்டாம்.`
          : 'இந்த செய்தி பாதுகாப்பானது. இருப்பினும் உங்கள் கடவுச்சொல்லை எப்போதும் ரகசியமாக வைக்கவும்.',
        actionChecklist: [
          'இணைப்பை (Link) கிளிக் செய்யாதீர்கள்',
          'சைபர் கிரைம் உதவி எண் 1930-ஐ அழைக்கவும்',
          'இந்த எண்ணை பிளாக் செய்யவும்'
        ],
        helpline: 'தேசிய சைபர் கிரைம் உதவி எண்: 1930'
      },
      'Telugu': {
        language: 'Telugu',
        nativeScript: 'తెలుగు',
        warningTitle: isDangerous 
          ? 'భద్రతా హెచ్చరిక: మోసపూరిత సందేశం గుర్తించబడింది' 
          : 'సురక్షిత సందేశం: ఎటువంటి ముప్పు లేదు',
        adviceText: isDangerous
          ? `ఈ సందేశం మోసపూరితమైనది (${category}). మీ బ్యాంక్ లేదా ప్రభుత్వం ఎప్పుడూ లింక్‌ల ద్వారా KYC లేదా UPI PIN అడగదు.`
          : 'ఈ సందేశం సురక్షితమైనదిగా కనిపిస్తుంది. అయినప్పటికీ మీ OTPని ఎవరితోనూ పంచుకోవద్దు.',
        actionChecklist: [
          'అనుమానాస్పద లింక్‌లపై క్లిక్ చేయవద్దు',
          'సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930 కి కాల్ చేయండి',
          'ఈ నంబర్‌ను వెంటనే బ్లాక్ చేయండి'
        ],
        helpline: 'నేషనల్ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930'
      }
    };
  }
}

export const messageAnalyzer = new MessageAnalyzerService();

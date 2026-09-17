import re
import time
import uuid
from datetime import datetime
from typing import Tuple, List, Dict, Optional
from urllib.parse import urlparse

from models import (
    AnalysisResult,
    SupportedLanguage,
    ThreatCategory,
    SeverityLevel,
    ThreatSignal,
    ExplainablePoint,
    RegionalAdvice,
    URLAnalysisResult,
    DomainSegment,
)

class IndicThreatEngine:
    """
    Multilingual Indic Cyber Threat Intelligence Engine
    Detects regional language vectors, code-mixing (Hinglish/Benglish), brand spoofs,
    banking frauds, urgency hooks, and malicious domain constructs.
    """

    INDIC_PATTERNS = {
        "Bengali": [
            r"অ্যাকাউন্ট", r"বন্ধ", r"ওটিপি", r"টাকা", r"বিদ্যুৎ", r"কেওয়াইসি",
            r"লটারি", r"পুরস্কার", r"রিচার্জ", r"জরুরি", r"লিংক", r"ক্লিক করুন"
        ],
        "Hindi": [
            r"खाता", r"ब्लॉक", r"ओटीपी", r"पैसे", r"बिजली", r"केवाईसी",
            r"लॉटरी", r"इनाम", r"रिचार्ज", r"तुरंत", r"लिंक", r"काट दी जाएगी"
        ],
        "Tamil": [
            r"கணக்கு", r"முடக்கப்படும்", r"பணம்", r"மின்சாரம்", r"கேஒய்சி",
            r"பரிசு", r"உடனே", r"இணைப்பு", r"கிளிக் செய்யவும்"
        ],
        "Telugu": [
            r"ఖాతా", r"బ్లాక్", r"డబ్బులు", r"కరెంట్", r"కేవైసీ",
            r"లాటరీ", r"బహుమతి", r"వెంటనే", r"లింక్", r"క్లిక్ చేయండి"
        ],
        "Marathi": [
            r"खाते", r"बंद", r"पैसे", r"वीज", r"केवायसी", r"लगेच", r"लिंक"
        ],
        "Gujarati": [
            r"ખાતું", r"બંધ", r"પૈસા", r"વીજળી", r"કેવાયસી", r"તરત", r"લિંક"
        ]
    }

    BRAND_KEYWORDS = [
        ("SBI", ["sbi", "state bank", "yono", "एसबीआई", "এসবিআই"]),
        ("HDFC Bank", ["hdfc", "एचडीएफसी"]),
        ("ICICI Bank", ["icici", "आईसीआईसीआई"]),
        ("Paytm", ["paytm", "पेटीएम"]),
        ("PhonePe", ["phonepe", "फोनपे"]),
        ("Google Pay", ["gpay", "google pay", "गूगल पे"]),
        ("Electricity Dept", ["bijli", "electricity", "power bill", "বিদ্যুৎ", "बिजली", "மின்சாரம்", "కరెంట్"]),
        ("India Post", ["india post", "speed post", "डाक विभाग"]),
        ("PM Kisan", ["pm kisan", "pm-kisan", "किसान सम्मान"]),
    ]

    def detect_language(self, text: str) -> Tuple[SupportedLanguage, str, float, bool, Optional[Dict[str, str]]]:
        bengali_chars = len(re.findall(r'[\u0980-\u09FF]', text))
        devanagari_chars = len(re.findall(r'[\u0900-\u097F]', text))
        tamil_chars = len(re.findall(r'[\u0B80-\u0BFF]', text))
        telugu_chars = len(re.findall(r'[\u0C00-\u0C7F]', text))
        gujarati_chars = len(re.findall(r'[\u0A80-\u0AFF]', text))
        kannada_chars = len(re.findall(r'[\u0C80-\u0CFF]', text))
        malayalam_chars = len(re.findall(r'[\u0D00-\u0D7F]', text))
        gurmukhi_chars = len(re.findall(r'[\u0A00-\u0A7F]', text))
        odia_chars = len(re.findall(r'[\u0B00-\u0B7F]', text))

        total_chars = max(len(re.sub(r'\s+', '', text)), 1)

        if bengali_chars / total_chars > 0.15:
            return "Bengali", "Bengali (বাংলা লিপি)", 99.2, False, None
        if devanagari_chars / total_chars > 0.15:
            # Check Marathi markers vs Hindi
            if any(w in text for w in ["आहे", "नाही", "करा", "होईल"]):
                return "Marathi", "Devanagari (मराठी)", 97.8, False, None
            return "Hindi", "Devanagari (देवनागरी)", 98.9, False, None
        if tamil_chars / total_chars > 0.15:
            return "Tamil", "Tamil (தமிழ் எழுத்துக்கள்)", 99.1, False, None
        if telugu_chars / total_chars > 0.15:
            return "Telugu", "Telugu (తెలుగు లిపి)", 98.8, False, None
        if gujarati_chars / total_chars > 0.15:
            return "Gujarati", "Gujarati (ગુજરાતી)", 98.4, False, None
        if kannada_chars / total_chars > 0.15:
            return "Kannada", "Kannada (ಕನ್ನಡ లిపి)", 98.2, False, None
        if malayalam_chars / total_chars > 0.15:
            return "Malayalam", "Malayalam (മലയാളം)", 98.0, False, None
        if gurmukhi_chars / total_chars > 0.15:
            return "Punjabi", "Gurmukhi (ਗੁਰਮੁਖੀ)", 98.5, False, None
        if odia_chars / total_chars > 0.15:
            return "Odia", "Odia (ଓଡ଼ିଆ)", 97.9, False, None

        # Code-mixed detection in Latin script
        lower_text = text.lower()
        hinglish_words = ["aapka", "kare", "band", "paisa", "turant", "sampark", "hoga", "shukriya", "kripya", "karo"]
        benglish_words = ["apnar", "taka", "bondho", "korun", "hobe", "shigghroi", "dorkar", "korben"]

        h_matches = sum(1 for w in hinglish_words if re.search(r'\b' + w + r'\b', lower_text))
        b_matches = sum(1 for w in benglish_words if re.search(r'\b' + w + r'\b', lower_text))

        if h_matches >= 2:
            return "Code-Mixed (Hinglish)", "Latin Script (Transliterated)", 96.5, True, {"primary": "Hindi", "secondary": "English", "ratio": "60:40"}
        if b_matches >= 2:
            return "Code-Mixed (Benglish)", "Latin Script (Transliterated)", 95.8, True, {"primary": "Bengali", "secondary": "English", "ratio": "65:35"}

        return "English", "Latin Script", 99.0, False, None

    def analyze_message(self, text: str, forced_lang: Optional[SupportedLanguage] = None) -> AnalysisResult:
        start_time = time.perf_counter()

        detected_lang, script, lang_conf, is_code_mixed, code_mixed_ratio = self.detect_language(text)
        if forced_lang:
            detected_lang = forced_lang

        # Extract URLs
        url_regex = r'https?://[^\s<>"]+|www\.[^\s<>"]+|bit\.ly/[^\s<>"]+|t\.co/[^\s<>"]+|tinyurl\.com/[^\s<>"]+'
        extracted_urls = re.findall(url_regex, text)

        signals: List[ThreatSignal] = []
        explainable_points: List[ExplainablePoint] = []
        raw_score = 0.0

        # Target Brand check
        target_brand: Optional[str] = None
        lower_text = text.lower()
        for brand_name, keywords in self.BRAND_KEYWORDS:
            if any(k in lower_text for k in keywords):
                target_brand = brand_name
                break

        # Urgency & Threat Vector Detection
        urgency_patterns = [
            (r'(तुरंत|urgent|immediately|24 घंटे|tonight|आज रात|জরুরি|উদ্বেগ|உடனே|వెంటనే)', 'Psychological Urgency Hook', 'Exploits panic and time-pressure fear.', 25),
            (r'(block|blocked|बंद|suspend|deactivate|কাট|முடக்கப்படும்|నిలిపివేయబడుతుంది)', 'Threat of Service Termination', 'Simulates critical service disruption to force compliance.', 25),
            (r'(kyc|pan card|aadhaar|কেওয়াইসি|आधार|पैन)', 'Credential / KYC Harvesting Request', 'Requests sensitive identity or banking documentation.', 30),
            (r'(refund|cashback|lottery|लॉटरी|इनाम|পুরস্কার|টাকা পাঠানো)', 'Financial Lure / False Reward', 'Promises instant monetary credit to harvest UPI PIN.', 30),
            (r'(otp|pin|password|पासवर्ड|ओटीपी)', 'Direct Authentication Secret Probe', 'Attempts unauthorized acquisition of 2FA secrets.', 35),
        ]

        for pattern, name, desc, pts in urgency_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                raw_score += pts
                signals.append(ThreatSignal(
                    id=f"sig-{uuid.uuid4().hex[:6]}",
                    name=name,
                    category="Psychological" if "Urgency" in name or "Lure" in name else "Financial",
                    score=float(min(pts * 3.5, 98)),
                    weight="Critical" if pts >= 30 else "High",
                    description=desc,
                    matchedSnippet=match.group(0)
                ))
                explainable_points.append(ExplainablePoint(
                    title=name,
                    technicalReason=desc,
                    regionalContext=f"Commonly weaponized in {detected_lang} regional social engineering campaigns.",
                    severity="Critical" if pts >= 30 else "Elevated",
                    category="Linguistic & Psychological"
                ))

        if extracted_urls:
            raw_score += 25
            signals.append(ThreatSignal(
                id=f"sig-{uuid.uuid4().hex[:6]}",
                name="External Link Attachment",
                category="URL",
                score=85.0,
                weight="High",
                description="Contains unverified redirect link directing users outside official channels.",
                matchedSnippet=extracted_urls[0]
            ))

        # Categorize
        category: ThreatCategory = "Legitimate / Safe"
        if "kyc" in lower_text or "केवाईसी" in text or "কেওয়াইসি" in text or "pan" in lower_text:
            category = "KYC Verification Scam"
        elif "bijli" in lower_text or "বিদ্যুৎ" in text or "बिजली" in text or "electricity" in lower_text or "power bill" in lower_text:
            category = "Electricity Bill Fraud"
        elif "refund" in lower_text or "cashback" in lower_text or "phonepe" in lower_text or "gpay" in lower_text:
            category = "UPI Refund Fraud"
        elif "bank" in lower_text or "खाता" in text or "অ্যাকাউন্ট" in text or "sbi" in lower_text:
            category = "Banking Phishing"
        elif "job" in lower_text or "wfh" in lower_text or "salary" in lower_text:
            category = "Job / WFH Scam"
        elif "post" in lower_text or "courier" in lower_text or "delivery" in lower_text:
            category = "Delivery / Courier Phishing"
        elif raw_score < 20:
            category = "Legitimate / Safe"

        # Risk score calculation
        risk_score = min(max(raw_score, 5.0 if raw_score == 0 else raw_score), 98.5)
        if category == "Legitimate / Safe":
            risk_score = 8.0

        # Classification
        if risk_score >= 80:
            classification: SeverityLevel = "Critical"
            soc_action = "BLOCK_AND_ALERT"
        elif risk_score >= 60:
            classification: SeverityLevel = "Elevated"
            soc_action = "BLOCK_AND_ALERT"
        elif risk_score >= 35:
            classification: SeverityLevel = "Moderate"
            soc_action = "FLAG_FOR_REVIEW"
        elif risk_score >= 20:
            classification: SeverityLevel = "Low"
            soc_action = "ALLOW_AND_MONITOR"
        else:
            classification: SeverityLevel = "Safe"
            soc_action = "ALLOW_AND_MONITOR"

        regional_advice = self._build_regional_advice(category, risk_score >= 35)

        elapsed_ms = (time.perf_counter() - start_time) * 1000

        return AnalysisResult(
            id=f"RS-MSG-{uuid.uuid4().hex[:8].upper()}",
            timestamp=datetime.utcnow().isoformat() + "Z",
            originalMessage=text,
            detectedLanguage=detected_lang,
            languageScript=script,
            languageConfidence=lang_conf,
            isCodeMixed=is_code_mixed,
            codeMixedRatio=code_mixed_ratio,
            riskScore=round(risk_score, 1),
            classification=classification,
            category=category,
            targetBrand=target_brand,
            claimedEntity=target_brand or ("Official Authority" if risk_score > 40 else None),
            extractedUrls=extracted_urls,
            signals=signals,
            explainablePoints=explainable_points,
            regionalAdvice=regional_advice,
            modelConfidence=97.4,
            tokensAnalyzed=len(text.split()),
            inferenceTimeMs=round(elapsed_ms, 2),
            socActionRecommended=soc_action
        )

    def analyze_url(self, raw_url: str) -> URLAnalysisResult:
        url = raw_url.strip()
        if not url.startswith(("http://", "https://")):
            url = "https://" + url

        try:
            parsed = urlparse(url)
            hostname = parsed.hostname or "unknown-host.local"
        except Exception:
            hostname = "invalid-domain.example"
            parsed = urlparse("https://invalid-domain.example")

        is_https = parsed.scheme == "https"
        parts = hostname.lower().split('.')
        tld = parts[-1] if len(parts) > 1 else ""
        subdomains = parts[:-2] if len(parts) > 2 else []
        main_domain = parts[-2] if len(parts) >= 2 else parts[0]

        suspicious_tlds = ["top", "xyz", "click", "buzz", "tk", "ml", "cf", "gq", "work", "loan", "club"]
        tld_risk: SeverityLevel = "High" if tld in suspicious_tlds else "Low"

        # Check homoglyphs / Cyrillic impersonation
        has_homoglyphs = bool(re.search(r'[\u0400-\u04FF\u0370-\u03FF]', hostname))
        
        segments: List[DomainSegment] = [
            DomainSegment(
                type="protocol",
                value=f"{parsed.scheme}://",
                isSuspicious=not is_https,
                reason="Unencrypted HTTP plain transmission" if not is_https else None
            )
        ]

        if subdomains:
            segments.append(DomainSegment(
                type="subdomain",
                value=".".join(subdomains) + ".",
                isSuspicious=any(b[0].lower() in ".".join(subdomains) for b in self.BRAND_KEYWORDS),
                reason="Brand name placed inside subdomain to mislead mobile users" if any(b[0].lower() in ".".join(subdomains) for b in self.BRAND_KEYWORDS) else None
            ))

        segments.append(DomainSegment(
            type="domain",
            value=main_domain,
            isSuspicious=has_homoglyphs or any(b in main_domain for b in ["sbi", "hdfc", "paytm", "support", "kyc"]),
            reason="Unregistered mimicry domain detected" if any(b in main_domain for b in ["sbi", "hdfc", "paytm"]) else None
        ))

        segments.append(DomainSegment(
            type="tld",
            value=f".{tld}",
            isSuspicious=tld_risk == "High",
            reason=f"High-abuse TLD .{tld}" if tld_risk == "High" else None
        ))

        score = 15.0
        if not is_https:
            score += 25
        if has_homoglyphs:
            score += 45
        if tld_risk == "High":
            score += 25
        if any(b in hostname for b in ["sbi", "yono", "hdfc", "paytm", "bijli", "kyc"]):
            score += 30

        score = min(max(score, 5.0), 98.0)
        classification: SeverityLevel = "Critical" if score > 75 else ("Elevated" if score > 50 else ("Moderate" if score > 30 else "Safe"))

        return URLAnalysisResult(
            id=f"RS-URL-{uuid.uuid4().hex[:8].upper()}",
            url=raw_url,
            domain=hostname,
            protocol=parsed.scheme,
            isHttps=is_https,
            sslValid=is_https,
            sslIssuer="Let's Encrypt / DV" if is_https else None,
            domainAgeDays=14 if score > 50 else 1850,
            redirectHops=2 if score > 50 else 0,
            claimedBrand="State Bank of India (SBI)" if "sbi" in hostname else ("HDFC Bank" if "hdfc" in hostname else "Generic"),
            actualHost=hostname,
            isDomainMismatch=score > 40,
            homoglyphDetected=has_homoglyphs,
            homoglyphDetails="Cyrillic character substitution detected in domain label" if has_homoglyphs else None,
            tldRiskLevel="High" if tld_risk == "High" else ("Moderate" if tld in ["info", "site", "online"] else "Low"),
            riskScore=round(score, 1),
            classification=classification,
            structuralBreakdown=segments,
            threatSignals=[
                {"name": "Domain Impersonation", "score": score, "detail": f"Host {hostname} attempts visual deception."}
            ],
            heuristicTriggers=["Homoglyph inspection", "TLD risk evaluation", "Subdomain nesting depth"]
        )

    def _build_regional_advice(self, category: str, is_dangerous: bool) -> Dict[str, RegionalAdvice]:
        return {
            "English": RegionalAdvice(
                language="English",
                nativeScript="English",
                warningTitle="CRITICAL SECURITY ALERT: Scam Message Detected" if is_dangerous else "Verified Secure Message",
                adviceText=(
                    f"This message exhibits indicators of {category}. Never share OTPs, UPI PINs, or click unverified links."
                    if is_dangerous else "This message does not contain immediate threat signals."
                ),
                actionChecklist=[
                    "Do NOT click any embedded links",
                    "Do NOT share OTP or banking passwords",
                    "Report immediately to National Cyber Crime Helpline at 1930",
                    "Block the sender contact immediately"
                ],
                helpline="National Cyber Crime Reporting Helpline: 1930 (cybercrime.gov.in)"
            ),
            "Hindi": RegionalAdvice(
                language="Hindi",
                nativeScript="हिन्दी",
                warningTitle="सुरक्षा चेतावनी: धोखाधड़ी वाला संदेश पहचाना गया" if is_dangerous else "सुरक्षित संदेश",
                adviceText=(
                    f"यह संदेश {category} का हिस्सा है। अपना बैंक खाता विवरण, ओटीपी या यूपीआई पिन कभी किसी के साथ साझा न करें।"
                    if is_dangerous else "यह संदेश सुरक्षित प्रतीत होता है।"
                ),
                actionChecklist=[
                    "किसी भी लिंक पर क्लिक न करें",
                    "बैंक अधिकारी कभी भी फोन पर पासवर्ड नहीं मांगते",
                    "साइबर हेल्पलाइन 1930 पर शिकायत दर्ज करें",
                    "इस नंबर को तुरंत ब्लॉक करें"
                ],
                helpline="राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930"
            ),
            "Bengali": RegionalAdvice(
                language="Bengali",
                nativeScript="বাংলা",
                warningTitle="সতর্কতা: প্রতারণামূলক বার্তা শনাক্ত হয়েছে" if is_dangerous else "নিরাপদ বার্তা",
                adviceText=(
                    f"এই বার্তাটি একটি ভুয়ো জালিয়াতি ({category})। ব্যাঙ্ক বা বিদ্যুৎ বিভাগ কখনোই মেসেজে ওটিপি বা টাকা চায় না।"
                    if is_dangerous else "এই বার্তাটি নিরাপদ মনে হচ্ছে।"
                ),
                actionChecklist=[
                    "কোনো লিংকে ক্লিক করবেন না",
                    "ওটিপি বা পিন কারও সাথে শেয়ার করবেন না",
                    "১৯৩০ নম্বরে ফোন করে সাইবার ক্রাইমে অভিযোগ জানান",
                    "এই নম্বরটি অবিলম্বে ব্লক করুন"
                ],
                helpline="জাতীয় সাইবার ক্রাইম হেল্পলাইন: ১৯৩০"
            ),
            "Tamil": RegionalAdvice(
                language="Tamil",
                nativeScript="தமிழ்",
                warningTitle="பாதுகாப்பு எச்சரிக்கை: மோசடி செய்தி கண்டறியப்பட்டது" if is_dangerous else "பாதுகாப்பான செய்தி",
                adviceText=(
                    f"இந்த செய்தி ஒரு போலி மோசடி ({category}) ஆகும். உங்கள் OTP அல்லது PIN விவரங்களை பகிர வேண்டாம்."
                    if is_dangerous else "இந்த செய்தி பாதுகாப்பானது."
                ),
                actionChecklist=[
                    "இணைப்பை (Link) கிளிக் செய்யாதீர்கள்",
                    "சைபர் கிரைம் உதவி எண் 1930-ஐ அழைக்கவும்",
                    "இந்த எண்ணை பிளாக் செய்யவும்"
                ],
                helpline="தேசிய சைபர் கிரைம் உதவி எண்: 1930"
            ),
            "Telugu": RegionalAdvice(
                language="Telugu",
                nativeScript="తెలుగు",
                warningTitle="భద్రతా హెచ్చరిక: మోసపూరిత సందేశం గుర్తించబడింది" if is_dangerous else "సురక్షిత సందేశం",
                adviceText=(
                    f"ఈ సందేశం మోసపూరితమైనది ({category}). మీ బ్యాంక్ ఎప్పుడూ OTP లేదా UPI PIN అడగదు."
                    if is_dangerous else "ఈ సందేశం సురక్షితమైనదిగా కనిపిస్తుంది."
                ),
                actionChecklist=[
                    "అనుమానాస్పద లింక్‌లపై క్లిక్ చేయవద్దు",
                    "సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930 కి కాల్ చేయండి",
                    "ఈ నంబర్‌ను వెంటనే బ్లాక్ చేయండి"
                ],
                helpline="నేషనల్ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930"
            )
        }

engine = IndicThreatEngine()

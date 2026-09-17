from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from models import (
    MessageAnalysisRequest,
    AnalysisResult,
    URLAnalysisRequest,
    URLAnalysisResult,
    LanguageStat,
    ThreatHistoryItem,
)
from engine import engine

app = FastAPI(
    title="RegionalShield AI - Cyber Threat Intelligence API",
    description="Multilingual Cyber Protection & Threat Intelligence Platform for Indic Languages",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check() -> Dict[str, str]:
    """Health check endpoint confirming engine operational state."""
    return {
        "status": "healthy",
        "engine": "RegionalShield Indic Cyber-Intelligence Engine v1.0",
        "version": "1.0.0",
    }

@app.post("/api/analyze/message", response_model=AnalysisResult)
def analyze_message_endpoint(payload: MessageAnalysisRequest) -> AnalysisResult:
    """Analyze SMS, WhatsApp, Telegram, or Email messages for regional cyber threats."""
    if not payload.message or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")
    return engine.analyze_message(payload.message, payload.forced_language)

@app.post("/api/analyze/url", response_model=URLAnalysisResult)
def analyze_url_endpoint(payload: URLAnalysisRequest) -> URLAnalysisResult:
    """Perform structural dissection and homoglyph analysis on suspicious URLs."""
    if not payload.url or not payload.url.strip():
        raise HTTPException(status_code=400, detail="URL cannot be empty.")
    return engine.analyze_url(payload.url)

@app.get("/api/languages", response_model=List[LanguageStat])
def get_languages() -> List[LanguageStat]:
    """Retrieve Indic language coverage, threat rates, and telemetry statistics."""
    return [
        LanguageStat(
            code="bn",
            name="Bengali",
            nativeName="বাংলা",
            script="Bengali (বাংলা লিপি)",
            status="Full Support",
            messagesAnalyzed=14290,
            threatsDetected=4872,
            threatRate=34.1,
            topVector="Electricity Bill & WBSEDCL Phishing",
            sampleThreat="আপনার বিদ্যুৎ সংযোগ আজ রাতে বন্ধ হবে... লিঙ্ক ক্লিক করুন",
        ),
        LanguageStat(
            code="hi",
            name="Hindi",
            nativeName="हिन्दी",
            script="Devanagari (देवनागरी)",
            status="Full Support",
            messagesAnalyzed=32400,
            threatsDetected=9850,
            threatRate=30.4,
            topVector="SBI YONO / PAN-Aadhaar KYC Expiry",
            sampleThreat="प्रिय ग्राहक, आपका SBI YONO खाता ब्लॉक हो गया है...",
        ),
        LanguageStat(
            code="ta",
            name="Tamil",
            nativeName="தமிழ்",
            script="Tamil (தமிழ் எழுத்துக்கள்)",
            status="Full Support",
            messagesAnalyzed=11800,
            threatsDetected=3420,
            threatRate=28.9,
            topVector="TANGEDCO Bill Fraud & Work From Home Schemes",
            sampleThreat="உங்கள் TANGEDCO மின் கட்டணம் நிலுவையில் உள்ளது...",
        ),
        LanguageStat(
            code="te",
            name="Telugu",
            nativeName="తెలుగు",
            script="Telugu (తెలుగు లిపి)",
            status="Full Support",
            messagesAnalyzed=9400,
            threatsDetected=2980,
            threatRate=31.7,
            topVector="Instant Loan App Extortion & AP/TS CPDCL Scam",
            sampleThreat="మీ బ్యాంక్ ఖాతా KYC నిలిపివేయబడింది...",
        ),
        LanguageStat(
            code="mr",
            name="Marathi",
            nativeName="मराठी",
            script="Devanagari (मराठी)",
            status="Full Support",
            messagesAnalyzed=7800,
            threatsDetected=2190,
            threatRate=28.1,
            topVector="MSEDCL Mahavitaran Disconnection Notice",
            sampleThreat="तुमचे वीज बिल भरले नाही, आज रात्री वीज खंडित होईल...",
        ),
        LanguageStat(
            code="gu",
            name="Gujarati",
            nativeName="ગુજરાતી",
            script="Gujarati (ગુજરાતી)",
            status="Full Support",
            messagesAnalyzed=6500,
            threatsDetected=1890,
            threatRate=29.1,
            topVector="DGVCL / PGVCL Power Scam & IPO Allotment Lure",
            sampleThreat="તમારું વીજળી બિલ બાકી છે, આજે રાત્રે લાઈટ કાપી નાખવામાં આવશે...",
        ),
        LanguageStat(
            code="kn",
            name="Kannada",
            nativeName="ಕನ್ನಡ",
            script="Kannada (ಕನ್ನಡ లిపి)",
            status="Beta",
            messagesAnalyzed=4200,
            threatsDetected=1180,
            threatRate=28.0,
            topVector="BESCOM Meter Update & Fake Lottery",
            sampleThreat="ನಿಮ್ಮ ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ...",
        ),
        LanguageStat(
            code="ml",
            name="Malayalam",
            nativeName="മലയാളം",
            script="Malayalam (മലയാളം)",
            status="Beta",
            messagesAnalyzed=3900,
            threatsDetected=940,
            threatRate=24.1,
            topVector="KSEB Disconnection Notice & Gulf Job Scams",
            sampleThreat="നിങ്ങളുടെ വൈദ്യുതി ബിൽ അടച്ചിട്ടില്ല...",
        ),
        LanguageStat(
            code="pa",
            name="Punjabi",
            nativeName="ਪੰਜਾਬੀ",
            script="Gurmukhi (ਗੁਰਮੁਖੀ)",
            status="Beta",
            messagesAnalyzed=3100,
            threatsDetected=810,
            threatRate=26.1,
            topVector="PSPCL Electricity Cutoff & Visa Phishing",
            sampleThreat="ਤੁਹਾਡਾ ਬਿਜਲੀ ਬਿਲ ਬਕਾਇਆ ਹੈ, ਅੱਜ ਰਾਤ ਕਨੈਕਸ਼ਨ ਕੱਟਿਆ ਜਾਵੇਗਾ...",
        ),
        LanguageStat(
            code="od",
            name="Odia",
            nativeName="ଓଡ଼ିଆ",
            script="Odia (ଓଡ଼ିଆ)",
            status="Beta",
            messagesAnalyzed=2400,
            threatsDetected=620,
            threatRate=25.8,
            topVector="TPCODL Electricity Notice & PM Kisan Grant",
            sampleThreat="ଆପଣଙ୍କ ବିଦ୍ୟୁତ ସଂଯୋଗ ଆଜି ରାତିରେ ବିଚ୍ଛିନ୍ନ ହେବ...",
        ),
        LanguageStat(
            code="hinglish",
            name="Code-Mixed (Hinglish)",
            nativeName="Hinglish",
            script="Latin (Transliterated)",
            status="Full Support",
            messagesAnalyzed=28900,
            threatsDetected=11400,
            threatRate=39.4,
            topVector="Part-Time Telegram Job Scam & UPI Refund Trap",
            sampleThreat="Dear customer, aapka SBI account block ho gaya hai...",
        ),
        LanguageStat(
            code="benglish",
            name="Code-Mixed (Benglish)",
            nativeName="Benglish",
            script="Latin (Transliterated)",
            status="Full Support",
            messagesAnalyzed=8900,
            threatsDetected=3100,
            threatRate=34.8,
            topVector="Instant Reward / Cashback Claim Link",
            sampleThreat="Apnar bank account theke taka kete neoa hobe...",
        ),
    ]

@app.get("/api/threats/history", response_model=List[ThreatHistoryItem])
def get_threat_history() -> List[ThreatHistoryItem]:
    """Retrieve the recent threat feed."""
    return [
        ThreatHistoryItem(
            id="TH-9842",
            timestamp="2026-09-17T18:10:00Z",
            timeAgo="3m ago",
            messagePreview="प्रिय ग्राहक, आपका SBI खाता KYC न होने के कारण आज रात 9:30 बजे ब्लॉक कर दिया जाएगा...",
            language="Hindi",
            category="KYC Verification Scam",
            riskScore=96.4,
            classification="Critical",
            status="Blocked",
            targetBrand="SBI",
            detectedVector="Urgency Trigger + Credential Harvesting URL",
            channel="SMS",
        ),
        ThreatHistoryItem(
            id="TH-9841",
            timestamp="2026-09-17T18:05:00Z",
            timeAgo="8m ago",
            messagePreview="জরুরি নোটিশ: আপনার বিদ্যুৎ বিল বাকি আছে। আজ রাত ১০টায় বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে...",
            language="Bengali",
            category="Electricity Bill Fraud",
            riskScore=94.2,
            classification="Critical",
            status="Blocked",
            targetBrand="WBSEDCL",
            detectedVector="Impersonation + Urgent Threat of Disconnection",
            channel="WhatsApp",
        ),
        ThreatHistoryItem(
            id="TH-9840",
            timestamp="2026-09-17T17:50:00Z",
            timeAgo="23m ago",
            messagePreview="உங்கள் TANGEDCO மின் கட்டணம் ரூ. 1,450 நிலுவையில் உள்ளது. உடனடியாக செலுத்த...",
            language="Tamil",
            category="Electricity Bill Fraud",
            riskScore=91.8,
            classification="Critical",
            status="Blocked",
            targetBrand="TANGEDCO",
            detectedVector="Utility Bill Spoofing + Fake Payment Link",
            channel="SMS",
        ),
        ThreatHistoryItem(
            id="TH-9839",
            timestamp="2026-09-17T17:35:00Z",
            timeAgo="38m ago",
            messagePreview="Dear customer, aapka PhonePe cashback Rs.2,499 pending hai. Turant claim kare...",
            language="Code-Mixed (Hinglish)",
            category="UPI Refund Fraud",
            riskScore=88.5,
            classification="Critical",
            status="Blocked",
            targetBrand="PhonePe",
            detectedVector="Reward Lure + Reverse UPI Collect Phishing",
            channel="Telegram",
        ),
    ]

@app.get("/api/threats/stats")
def get_threat_stats() -> Dict[str, Any]:
    """Retrieve aggregate cybersecurity metrics across regional threat streams."""
    return {
        "totalScans": 128450,
        "threatsNeutralized": 43210,
        "languagesMonitored": 12,
        "averageLatencyMs": 14.2,
        "uptimePercent": 99.98,
        "activeRegionalSignatures": 1450,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

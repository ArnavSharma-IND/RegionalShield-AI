from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field

SupportedLanguage = Literal[
    "Bengali",
    "Hindi",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Odia",
    "English",
    "Code-Mixed (Hinglish)",
    "Code-Mixed (Benglish)",
]

ThreatCategory = Literal[
    "Banking Phishing",
    "KYC Verification Scam",
    "UPI Refund Fraud",
    "Job / WFH Scam",
    "Electricity Bill Fraud",
    "Delivery / Courier Phishing",
    "Government Grant Scam",
    "Social Media Impersonation",
    "Legitimate / Safe",
]

SeverityLevel = Literal["Safe", "Low", "Moderate", "Elevated", "Critical"]

class ThreatSignal(BaseModel):
    id: str
    name: str
    category: Literal["Linguistic", "Brand", "URL", "Psychological", "Financial"]
    score: float
    weight: Literal["High", "Critical", "Medium", "Low"]
    description: str
    matchedSnippet: Optional[str] = None

class ExplainablePoint(BaseModel):
    title: str
    technicalReason: str
    regionalContext: str
    severity: Literal["Critical", "Elevated", "Moderate", "Low", "Info"]
    category: str

class RegionalAdvice(BaseModel):
    language: str
    nativeScript: str
    warningTitle: str
    adviceText: str
    actionChecklist: List[str]
    helpline: str

class MessageAnalysisRequest(BaseModel):
    message: str = Field(..., description="The message content to analyze (SMS, WhatsApp, Telegram, etc.)")
    forced_language: Optional[SupportedLanguage] = None

class AnalysisResult(BaseModel):
    id: str
    timestamp: str
    originalMessage: str
    detectedLanguage: SupportedLanguage
    languageScript: str
    languageConfidence: float
    isCodeMixed: bool
    codeMixedRatio: Optional[Dict[str, str]] = None
    riskScore: float
    classification: SeverityLevel
    category: ThreatCategory
    targetBrand: Optional[str] = None
    claimedEntity: Optional[str] = None
    extractedUrls: List[str]
    signals: List[ThreatSignal]
    explainablePoints: List[ExplainablePoint]
    regionalAdvice: Dict[str, RegionalAdvice]
    modelConfidence: float
    tokensAnalyzed: int
    inferenceTimeMs: float
    socActionRecommended: Literal["BLOCK_AND_ALERT", "FLAG_FOR_REVIEW", "ALLOW_AND_MONITOR"]

class URLAnalysisRequest(BaseModel):
    url: str

class DomainSegment(BaseModel):
    type: Literal["protocol", "subdomain", "brand-spoof", "domain", "tld", "path"]
    value: str
    isSuspicious: bool
    reason: Optional[str] = None

class URLAnalysisResult(BaseModel):
    id: str
    url: str
    domain: str
    protocol: str
    isHttps: bool
    sslValid: bool
    sslIssuer: Optional[str] = None
    domainAgeDays: int
    redirectHops: int
    claimedBrand: str
    actualHost: str
    isDomainMismatch: boolean if False else bool
    homoglyphDetected: bool
    homoglyphDetails: Optional[str] = None
    tldRiskLevel: Literal["High", "Moderate", "Low"]
    riskScore: float
    classification: SeverityLevel
    structuralBreakdown: List[DomainSegment]
    threatSignals: List[Dict[str, object]]
    heuristicTriggers: List[str]

class LanguageStat(BaseModel):
    code: str
    name: str
    nativeName: str
    script: str
    status: Literal["Full Support", "Beta", "Expanding"]
    messagesAnalyzed: int
    threatsDetected: int
    threatRate: float
    topVector: str
    sampleThreat: str

class ThreatHistoryItem(BaseModel):
    id: str
    timestamp: str
    timeAgo: str
    messagePreview: str
    language: SupportedLanguage
    category: ThreatCategory
    riskScore: float
    classification: SeverityLevel
    status: Literal["Blocked", "Flagged", "Monitored", "Resolved"]
    targetBrand: Optional[str] = None
    detectedVector: str
    channel: Literal["SMS", "WhatsApp", "Telegram", "Email"]

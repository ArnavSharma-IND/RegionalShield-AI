# RegionalShield AI

> **Cybersecurity That Speaks Your Language.**  
> *AI-Powered Regional-Language Phishing & Social Engineering Detection for India's Digital Ecosystem.*

**Omnikon Hackathon 2026** · Track: **Omni_CyberTech_1**  
**Team: The Null Pointer**
- **Arnav Sharma** (Lead Architect & Fullstack/ML Systems)
- **Sourasish Karak** (Indic NLP Linguistics & Forensic Security Research)

---

## Overview

Over 85% of India's 800+ million internet users consume digital content and conduct transactions in Indic regional languages (Bengali, Hindi, Tamil, Telugu, Marathi, Gujarati, etc.). While legacy corporate email gateways scan English syntax, phishing syndicates deliver targeted social engineering payloads via SMS, WhatsApp, and Telegram in local vernaculars and code-mixed dialects (Hinglish/Benglish).

**RegionalShield AI** is a next-generation cybersecurity platform that combines deep Indic morphological NLP, zero-trust brand spoofing heuristics, transparent Explainable AI (XAI), and dynamic vernacular victim protection.

---

## Core Capabilities

- **Indic Morphological Tokenizer**: Multicharacter conjunct parsing across 10+ Indic scripts (Bengali, Devanagari, Tamil, Telugu, Gujarati, Gurmukhi, Kannada, Malayalam, Odia).
- **Code-Mixed Dialect Parser**: Deconstructs hybrid Hinglish and Benglish syntax (*"Aapka account block ho jayega, KYC update karo"*) into semantic intent and urgency vectors.
- **Zero-Trust Brand & Domain Radar**: Cross-references institutional entities (SBI, PhonePe, Paytm, India Post, State Electricity Boards) against resolving FQDNs, registrar delegation age, and Levenshtein homoglyphs.
- **Explainable AI (XAI) Rationale**: Plain-language forensic justification for every flagged score with regional context.
- **Dynamic Vernacular Advisory**: Actionable checklists in the recipient's native language with synthetic speech readouts and direct integration with the **National Cyber Crime Helpline (1930)** (`cybercrime.gov.in`).
- **Domain Segment Dissection**: URL structural breakdown identifying lookalike subdomains and high-abuse TLDs (`.xyz`, `.online`, `.top`, `.site`).
- **Interactive Demo Testbench**: Instant presets for Bengali SBI KYC scams, Hindi UPI fraud, Hinglish utility disconnect traps, Tamil courier scams, Telugu job scams, and safe control OTP alerts.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Cinematic Dark Security Architecture `#05070A`, `#0A0E13`, `#C81B1C`, Space Grotesk, JetBrains Mono)
- **Motion & Visuals**: Framer Motion, HTML5 Canvas Network Topology & Scanlines
- **Charts & Telemetry**: Recharts
- **Icons**: Lucide React
- **Backend-Ready Interface**: Decoupled service layer (`src/services/analyzer.ts`, `src/services/urlAnalyzer.ts`) prepared for FastAPI / ML transformer integration.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ArnavSharma-IND/RegionalShield-AI.git
cd RegionalShield-AI

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Project Structure

```
RegionalShield-AI/
├── src/
│   ├── components/
│   │   ├── landing/          # Cinematic Hero, LiveThreatFlow, Problem, Workflow
│   │   ├── layout/           # AppShell, Navbar, Sidebar rail, AtmosphereBackground
│   │   ├── scanner/          # MessageScanner, ScanSequenceModal, ThreatResultView, RegionalAdviceCard, URLScanner
│   │   └── ui/               # Space Grotesk/JetBrains Mono Buttons, Badges, RiskGauge, Toasts
│   ├── data/
│   │   └── demoScenarios.ts  # Authentic Indic phishing & control presets
│   ├── pages/                # Landing, Dashboard, ThreatIntelligence, LanguageIntelligence, Analytics, History, Settings, SystemInfo
│   ├── services/             # analyzer.ts, urlAnalyzer.ts, mockData.ts
│   ├── types/                # threat.ts, filter.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Hackathon Credits

- **Event**: Omnikon 2026
- **Problem Statement**: Omni_CyberTech_1 — Regional-Language Phishing Detection
- **Team**: The Null Pointer (Arnav Sharma & Sourasish Karak)

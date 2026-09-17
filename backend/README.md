# RegionalShield AI - Threat Intelligence Backend

High-performance, explainable multilingual cyber threat detection API for Indic languages (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Code-Mixed Hinglish/Benglish).

## Features
- **Script & Dialect Recognition**: Detects Indic scripts and transliterated romanized code-mixing.
- **Regional Threat Vectors**: Flags utility bill fraud, banking KYC, lottery schemes, and UPI reverse-collect hooks.
- **Explainable Threat Attribution**: Provides actionable intelligence and victim guidance across multiple regional languages.
- **Homoglyph & URL Dissection**: Analyzes deceptive domain nesting and lookalike character spoofing.

## Quickstart

### Prerequisites
- Python 3.10+
- `pip` or `uv`

### Installation
```bash
cd backend
pip install -r requirements.txt
```

### Running Locally
```bash
uvicorn main:app --reload --port 8000
```
API Documentation will be available at: `http://localhost:8000/docs`

### API Endpoints
- `GET /health` - Service health status
- `POST /api/analyze/message` - Message threat analysis (SMS / WhatsApp / Telegram)
- `POST /api/analyze/url` - URL & Domain structure inspection
- `GET /api/languages` - Indic language intelligence telemetry
- `GET /api/threats/history` - Threat feeds and history log
- `GET /api/threats/stats` - Platform statistics

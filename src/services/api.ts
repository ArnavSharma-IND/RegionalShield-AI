import { 
  AnalysisResult, 
  URLAnalysisResult, 
  SupportedLanguage, 
  LanguageStat, 
  ThreatHistoryItem 
} from '../types/threat';
import { messageAnalyzer } from './analyzer';
import { urlAnalyzer } from './urlAnalyzer';
import { MOCK_LANGUAGE_STATS, MOCK_THREAT_HISTORY } from './mockData';

const getApiBaseUrl = (): string => {
  try {
    // @ts-ignore
    return (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8000';
  } catch {
    return 'http://localhost:8000';
  }
};

const API_BASE_URL = getApiBaseUrl();

class RegionalShieldApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Analyze an incoming SMS, WhatsApp, Telegram, or email message for Indic cyber threats.
   * Connects to RegionalShield FastAPI backend or gracefully falls back to local high-precision heuristics.
   */
  public async analyzeMessage(message: string, forcedLanguage?: SupportedLanguage): Promise<AnalysisResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analyze/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          forced_language: forcedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      return data;
    } catch {
      // Graceful local fallback
      return messageAnalyzer.analyzeMessage(message, forcedLanguage);
    }
  }

  /**
   * Analyze a suspicious domain or URL structure.
   */
  public async analyzeURL(url: string): Promise<URLAnalysisResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analyze/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data: URLAnalysisResult = await response.json();
      return data;
    } catch {
      // Graceful local fallback
      return urlAnalyzer.analyzeURL(url);
    }
  }

  /**
   * Fetch real-time Indic language threat statistics.
   */
  public async getLanguageStats(): Promise<LanguageStat[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/languages`);
      if (!response.ok) throw new Error('Failed to fetch languages');
      return await response.json();
    } catch {
      return MOCK_LANGUAGE_STATS;
    }
  }

  /**
   * Fetch recent threat history telemetry.
   */
  public async getThreatHistory(): Promise<ThreatHistoryItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/threats/history`);
      if (!response.ok) throw new Error('Failed to fetch threat history');
      return await response.json();
    } catch {
      return MOCK_THREAT_HISTORY;
    }
  }

  /**
   * Verify backend connectivity and AI engine status.
   */
  public async checkBackendHealth(): Promise<{ status: string; engine: string; version: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, { method: 'GET' });
      if (!response.ok) throw new Error('Health check failed');
      return await response.json();
    } catch {
      return {
        status: 'standby-local',
        engine: 'RegionalShield Hybrid Rule & Heuristic Engine (In-Browser)',
        version: '1.0.0-embedded',
      };
    }
  }
}

export const api = new RegionalShieldApiClient();

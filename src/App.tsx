import React, { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { ToastMessage } from './components/ui/Toast';
import { DemoScenario, DEMO_SCENARIOS } from './data/demoScenarios';
import { AnalysisResult, URLAnalysisResult, ThreatHistoryItem } from './types/threat';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MessageScanner } from './components/scanner/MessageScanner';
import { URLScanner } from './components/scanner/URLScanner';
import { ThreatIntelligencePage } from './pages/ThreatIntelligencePage';
import { LanguageIntelligencePage } from './pages/LanguageIntelligencePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { SystemInfoPage } from './pages/SystemInfoPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [scannerInitialText, setScannerInitialText] = useState<string>('');
  const [urlScannerInitialUrl, setUrlScannerInitialUrl] = useState<string>('');

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectPreset = (scenario: DemoScenario) => {
    setScannerInitialText(scenario.messageText);
    setCurrentRoute('scanner');
    addToast(
      'info',
      `Loaded Scenario: ${scenario.title}`,
      `Language detected: ${scenario.language} (${scenario.nativeLanguageLabel})`
    );
  };

  const handleNavigateToUrlScanner = (url: string) => {
    setUrlScannerInitialUrl(url);
    setCurrentRoute('url-scanner');
    addToast('info', 'Deep URL Inspection Initiated', `Analyzing host: ${url}`);
  };

  const handleScanSampleText = (text: string) => {
    setScannerInitialText(text);
    setCurrentRoute('scanner');
  };

  const handleReportThreat = (result: AnalysisResult | URLAnalysisResult) => {
    addToast(
      'success',
      'Threat Reported to National Cyber Cell (1930)',
      `Incident ID ${result.id} successfully queued for law enforcement investigation.`
    );
  };

  const handleInspectHistoryThreat = (threat: ThreatHistoryItem) => {
    setScannerInitialText(threat.messagePreview);
    setCurrentRoute('scanner');
    addToast('info', `Opened Threat ${threat.id}`, 'Ready for live re-inference.');
  };

  return (
    <AppShell
      currentRoute={currentRoute}
      onNavigate={setCurrentRoute}
      onSelectPreset={handleSelectPreset}
      toasts={toasts}
      onDismissToast={handleDismissToast}
    >
      {currentRoute === 'landing' && (
        <LandingPage onNavigate={setCurrentRoute} />
      )}

      {currentRoute === 'dashboard' && (
        <DashboardPage
          onNavigate={setCurrentRoute}
          onInspectThreat={handleInspectHistoryThreat}
        />
      )}

      {currentRoute === 'scanner' && (
        <div className="py-2">
          <MessageScanner
            key={scannerInitialText}
            initialText={scannerInitialText}
            onNavigateToUrlScanner={handleNavigateToUrlScanner}
            onReportThreat={handleReportThreat}
          />
        </div>
      )}

      {currentRoute === 'url-scanner' && (
        <div className="py-2">
          <URLScanner
            key={urlScannerInitialUrl}
            initialUrl={urlScannerInitialUrl}
            onReportThreat={handleReportThreat}
          />
        </div>
      )}

      {currentRoute === 'intelligence' && (
        <ThreatIntelligencePage onScanSample={handleScanSampleText} />
      )}

      {currentRoute === 'languages' && (
        <LanguageIntelligencePage onScanSample={handleScanSampleText} />
      )}

      {currentRoute === 'analytics' && (
        <AnalyticsPage />
      )}

      {currentRoute === 'history' && (
        <HistoryPage onScanSample={handleScanSampleText} />
      )}

      {currentRoute === 'settings' && (
        <SettingsPage onSaveToast={(msg) => addToast('success', msg)} />
      )}

      {currentRoute === 'system' && (
        <SystemInfoPage />
      )}
    </AppShell>
  );
}

export default App;

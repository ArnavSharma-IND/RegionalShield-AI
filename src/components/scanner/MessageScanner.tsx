import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Globe, 
  Zap, 
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react';
import { SupportedLanguage, AnalysisResult } from '../../types/threat';
import { DEMO_SCENARIOS, DemoScenario } from '../../data/demoScenarios';
import { messageAnalyzer } from '../../services/analyzer';
import { Button } from '../ui/Button';
import { ScanSequenceModal } from './ScanSequenceModal';
import { ThreatResultView } from './ThreatResultView';

interface MessageScannerProps {
  initialText?: string;
  onNavigateToUrlScanner?: (url: string) => void;
  onReportThreat?: (result: AnalysisResult) => void;
}

const SUPPORTED_LANG_OPTIONS: { label: string; value: SupportedLanguage | 'Auto Detect'; native: string }[] = [
  { label: 'Auto Detect (Recommended)', value: 'Auto Detect', native: 'স্বয়ংক্রিয় / स्वचालित' },
  { label: 'Bengali', value: 'Bengali', native: 'বাংলা' },
  { label: 'Hindi', value: 'Hindi', native: 'हिन्दी' },
  { label: 'English', value: 'English', native: 'English' },
  { label: 'Code-Mixed (Hinglish)', value: 'Code-Mixed (Hinglish)', native: 'Hinglish' },
  { label: 'Tamil', value: 'Tamil', native: 'தமிழ்' },
  { label: 'Telugu', value: 'Telugu', native: 'తెలుగు' },
  { label: 'Marathi', value: 'Marathi', native: 'मराठी' },
  { label: 'Gujarati', value: 'Gujarati', native: 'ગુજરાતી' },
  { label: 'Punjabi', value: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { label: 'Odia', value: 'Odia', native: 'ଓଡ଼ିଆ' },
  { label: 'Kannada', value: 'Kannada', native: 'ಕನ್ನಡ' },
  { label: 'Malayalam', value: 'Malayalam', native: 'മലയാളം' }
];

export const MessageScanner: React.FC<MessageScannerProps> = ({
  initialText = '',
  onNavigateToUrlScanner,
  onReportThreat
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | 'Auto Detect'>('Auto Detect');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const handleSelectPreset = (scenario: DemoScenario) => {
    setInputText(scenario.messageText);
    setSelectedLanguage(scenario.language);
    setActivePresetId(scenario.id);
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    const result = messageAnalyzer.analyzeMessage(
      inputText, 
      selectedLanguage === 'Auto Detect' ? undefined : selectedLanguage
    );
    setAnalysisResult(result);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setActivePresetId(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-mono">
      {analysisResult ? (
        <ThreatResultView
          result={analysisResult}
          onReset={handleReset}
          onNavigateToUrlScanner={onNavigateToUrlScanner}
          onReportThreat={onReportThreat}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-white/[0.07]">
            <div className="text-xs text-[#858D97] tracking-widest uppercase">
              PASTE / SCAN / UNDERSTAND
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
              Analyze a suspicious message.
            </h1>
            <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
              Examine vernacular SMS, WhatsApp payloads, or code-mixed dialects for social engineering coercion and spoofed domains.
            </p>
          </div>

          {/* Preset Quick-Load Ribbon */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#69727D]">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Zap className="w-3 h-3 text-[#C49A55]" />
                DEMO PRESETS · SELECT SCENARIO
              </span>
              <span className="text-[#6E8FAE]">HACKATHON LIVE TESTBENCH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {DEMO_SCENARIOS.map((preset) => {
                const isSelected = activePresetId === preset.id;

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 border text-left transition-all relative group ${
                      isSelected
                        ? 'bg-[#0D131A] border-[#C81B1C] shadow-[0_0_15px_rgba(200,27,28,0.2)]'
                        : 'bg-[#0A0E13] hover:bg-[#121820] border-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1 text-[10px]">
                      <span className="px-1.5 py-0.2 bg-white/[0.06] text-[#6E8FAE]">
                        {preset.nativeLanguageLabel}
                      </span>
                      <span className={`font-bold ${
                        preset.expectedClassification === 'Critical' ? 'text-[#EF4444]' : preset.expectedClassification === 'Safe' ? 'text-[#6F9B7A]' : 'text-[#F59E0B]'
                      }`}>
                        {preset.expectedClassification.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#F4F5F6] truncate font-sans">
                      {preset.title}
                    </div>
                    <div className="text-[10px] text-[#858D97] truncate mt-0.5">
                      {preset.shortDescription}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large Open Editor-like Input Area */}
          <div className="bg-[#0A0E13] border border-white/[0.08] p-5 md:p-8 space-y-4 relative">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06] text-xs">
              <div className="flex items-center gap-3">
                <Globe className="w-3.5 h-3.5 text-[#6E8FAE]" />
                <span className="text-[#858D97] uppercase">TARGET LANGUAGE:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as any)}
                  aria-label="Select Target Language"
                  className="bg-[#05070A] text-xs text-[#F4F5F6] px-2.5 py-1 border border-white/15 focus:outline-none focus:border-[#C81B1C] font-mono"
                >
                  {SUPPORTED_LANG_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({opt.native})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-[#69727D]">
                <span>{inputText.length} CHARS</span>
                <span>·</span>
                <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} TOKENS</span>
                {inputText && (
                  <button
                    onClick={() => {
                      setInputText('');
                      setActivePresetId(null);
                    }}
                    className="hover:text-[#EF4444] transition-colors p-1"
                    title="Clear text"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setActivePresetId(null);
              }}
              placeholder="Paste suspicious SMS, WhatsApp message, email, or regional text... e.g. আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে। অবিলম্বে ভেরিফাই করুন: https://sbi-kyc-update-portal.xyz"
              rows={6}
              className="w-full bg-transparent text-base md:text-lg text-[#F4F5F6] placeholder:text-[#4D5662] font-indic focus:outline-none transition-all resize-y leading-relaxed border-none p-0"
            />

            {/* Bottom Meta & Action Bar */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#69727D]">
                <span>LANGUAGE <strong className="text-[#F4F5F6]">{selectedLanguage.toUpperCase()}</strong></span>
                <span>·</span>
                <span>INPUT <strong className="text-[#F4F5F6]">MESSAGE</strong></span>
                <span>·</span>
                <span>MODE <strong className="text-[#C49A55]">PROTOTYPE</strong></span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleSelectPreset(DEMO_SCENARIOS[0])}
                  className="w-full sm:w-auto"
                >
                  LOAD BENGALI KYC
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleAnalyze}
                  disabled={!inputText.trim()}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  [ ANALYZE MESSAGE → ]
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sequential 6-stage scanning modal */}
      <ScanSequenceModal
        isOpen={isScanning}
        detectedLanguage={selectedLanguage === 'Auto Detect' ? 'Bengali' : selectedLanguage}
        onComplete={handleScanComplete}
      />
    </div>
  );
};

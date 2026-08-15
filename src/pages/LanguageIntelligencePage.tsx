import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Languages, 
  Sparkles, 
  ArrowRight, 
  Zap 
} from 'lucide-react';
import { MOCK_LANGUAGE_STATS } from '../services/mockData';
import { messageAnalyzer } from '../services/analyzer';
import { Button } from '../components/ui/Button';

interface LanguageIntelligencePageProps {
  onScanSample: (text: string) => void;
}

const CODE_MIXED_SAMPLES = [
  'Your account block ho jayega, KYC update karo immediately: https://sbi-kyc.xyz',
  'Alert! Aapka electricity bill unpaid hai. Aaj raat power cut ho jayega: https://bijli-pay.site',
  'Tomar bank account suspend hoye jabe, link click kore update koro: https://bank-update.online'
];

export const LanguageIntelligencePage: React.FC<LanguageIntelligencePageProps> = ({ onScanSample }) => {
  const [codeMixedInput, setCodeMixedInput] = useState(CODE_MIXED_SAMPLES[0]);
  const [analysis, setAnalysis] = useState(() => messageAnalyzer.detectLanguage(CODE_MIXED_SAMPLES[0]));
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const handleTestCodeMixed = (sampleText: string) => {
    setCodeMixedInput(sampleText);
    const res = messageAnalyzer.detectLanguage(sampleText);
    setAnalysis(res);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          VERNACULAR NLP / TRANSLITERATION
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          Language Intelligence
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Indic script tokenization, dialect embeddings, and code-mixed phonetic parsing across Indian languages.
        </p>
      </div>

      {/* Code-Mixed Interactive Dialect Sandbox */}
      <div className="bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div className="space-y-1">
            <div className="text-xs text-[#858D97] uppercase">CODE-MIXED DIALECT PARSER</div>
            <h3 className="text-lg font-bold text-[#F4F5F6] font-sans">
              Hinglish & Benglish Interactive Playground
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#69727D]">PRESETS:</span>
            {CODE_MIXED_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleTestCodeMixed(sample)}
                className="px-2.5 py-1 bg-[#05070A] hover:bg-[#121820] border border-white/10 text-[#F4F5F6] text-xs"
              >
                Sample #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-3">
          <textarea
            value={codeMixedInput}
            onChange={(e) => handleTestCodeMixed(e.target.value)}
            rows={3}
            className="w-full bg-[#05070A] border border-white/15 p-4 text-xs md:text-sm text-[#F4F5F6] focus:outline-none focus:border-[#C81B1C] font-mono leading-relaxed"
            placeholder="Type code-mixed phrase... e.g. Aapka bank account block ho jayega..."
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3 text-xs text-[#858D97]">
              <span>DETECTED: <strong className="text-[#F4F5F6]">{analysis.language}</strong></span>
              <span>·</span>
              <span>CONFIDENCE: <strong className="text-[#6F9B7A]">{analysis.confidence}%</strong></span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onScanSample(codeMixedInput)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              [ RUN FULL THREAT ANALYSIS → ]
            </Button>
          </div>
        </div>
      </div>

      {/* Typographic Language Index */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.07] text-xs text-[#858D97]">
          <span className="font-bold text-[#F4F5F6] uppercase font-sans tracking-widest">
            TYPOGRAPHIC LANGUAGE INDEX
          </span>
          <span className="text-[#69727D]">MVP: EN / HI / BN · EXTENSIBLE</span>
        </div>

        {/* Interactive Rows */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {MOCK_LANGUAGE_STATS.map((lang, idx) => {
            const isMVP = ['bn', 'hi', 'en', 'code-mixed'].includes(lang.code);

            return (
              <div
                key={lang.code}
                onMouseEnter={() => setHoveredLang(lang.code)}
                onMouseLeave={() => setHoveredLang(null)}
                className="py-5 hover:bg-[#0A0E13] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer px-3"
                onClick={() => onScanSample(lang.sampleThreat)}
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm text-[#69727D]">0{idx + 1}</span>
                  <div className="text-2xl font-bold font-indic text-[#F4F5F6] group-hover:text-[#C81B1C] transition-colors">
                    {lang.nativeName}
                  </div>
                  <div className="text-sm font-bold tracking-widest uppercase font-sans text-[#858D97] group-hover:text-white">
                    {lang.name}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-[#858D97]">
                  <div>
                    <span>INGESTED: </span>
                    <strong className="text-[#F4F5F6]">{lang.messagesAnalyzed}</strong>
                  </div>
                  <div>
                    <span>ATTACK RATE: </span>
                    <strong className="text-[#EF4444]">{lang.threatRate}%</strong>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 font-bold ${
                    isMVP ? 'bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/40' : 'bg-white/[0.04] text-[#858D97] border border-white/10'
                  }`}>
                    {isMVP ? 'MVP CORE' : 'EXTENSIBLE'}
                  </span>
                  <span className="text-[#C81B1C] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    [ TEST SAMPLE → ]
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

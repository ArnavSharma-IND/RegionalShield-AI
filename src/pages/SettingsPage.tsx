import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

interface SettingsPageProps {
  onSaveToast: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onSaveToast }) => {
  const [urgencyThreshold, setUrgencyThreshold] = useState(85);
  const [brandStrictness, setBrandStrictness] = useState(90);
  const [defaultLanguage, setDefaultLanguage] = useState('Bengali');
  const [autoDetect, setAutoDetect] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:8000/api/v1/analyze');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSaveToast('SOC Preferences & Sensitivity Thresholds Updated');
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          SOC CONFIGURATION / SENSITIVITY
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          Engine Settings
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Configure detection sensitivity thresholds, default regional advice vernacular, and FastAPI integration endpoint.
        </p>
      </div>

      <div className="space-y-6">
        {/* Sliders */}
        <div className="bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-6">
          <div className="text-xs font-bold text-[#F4F5F6] uppercase pb-2 border-b border-white/[0.06] font-sans tracking-widest">
            DETECTION SENSITIVITY THRESHOLDS
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#F4F5F6]">URGENCY & COERCION LEXICAL STRICTNESS</span>
                <span className="text-[#C81B1C] font-bold">{urgencyThreshold}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={urgencyThreshold}
                onChange={(e) => setUrgencyThreshold(Number(e.target.value))}
                aria-label="Urgency strictness"
                className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-[#C81B1C]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#F4F5F6]">BRAND IMPERSONATION STRICTNESS</span>
                <span className="text-[#C81B1C] font-bold">{brandStrictness}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={brandStrictness}
                onChange={(e) => setBrandStrictness(Number(e.target.value))}
                aria-label="Brand strictness"
                className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-[#C81B1C]"
              />
            </div>
          </div>
        </div>

        {/* Regional Preferences */}
        <div className="bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-4">
          <div className="text-xs font-bold text-[#F4F5F6] uppercase pb-2 border-b border-white/[0.06] font-sans tracking-widest">
            REGIONAL ADVICE PREFERENCES
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label htmlFor="default-advice-lang" className="text-[#858D97]">DEFAULT ADVICE VERNACULAR</label>
              <select
                id="default-advice-lang"
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
                className="w-full bg-[#05070A] border border-white/15 p-2.5 text-[#F4F5F6] focus:outline-none focus:border-[#C81B1C]"
              >
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="text-[#858D97] block">SCRIPT RECOGNITION</span>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="auto-detect-cfg"
                  checked={autoDetect}
                  onChange={(e) => setAutoDetect(e.target.checked)}
                  className="w-4 h-4 bg-[#05070A] border border-white/20 accent-[#C81B1C] cursor-pointer"
                />
                <label htmlFor="auto-detect-cfg" className="text-[#F4F5F6] text-xs cursor-pointer">
                  Auto-identify Indic Unicode script morphology
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* FastAPI Endpoint */}
        <div className="bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-4">
          <div className="text-xs font-bold text-[#F4F5F6] uppercase pb-2 border-b border-white/[0.06] font-sans tracking-widest">
            BACKEND INFERENCE ENDPOINT
          </div>

          <div className="space-y-2 text-xs">
            <label htmlFor="fastapi-url" className="text-[#858D97]">FASTAPI URL</label>
            <input
              id="fastapi-url"
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="w-full bg-[#05070A] border border-white/15 p-2.5 text-[#F4F5F6] font-mono focus:outline-none focus:border-[#C81B1C]"
            />
            <p className="text-[10px] text-[#69727D]">
              Operating in deterministic frontend inference mode for hackathon presentation.
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
          >
            {isSaved ? '[ PREFERENCES SAVED ]' : '[ SAVE SOC CONFIGURATION → ]'}
          </Button>
        </div>
      </div>
    </div>
  );
};

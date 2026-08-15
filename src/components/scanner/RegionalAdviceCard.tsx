import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Copy, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { RegionalAdvice, SeverityLevel } from '../../types/threat';
import { Button } from '../ui/Button';

interface RegionalAdviceCardProps {
  adviceMap: Record<string, RegionalAdvice>;
  detectedLanguage: string;
  classification: SeverityLevel;
  onCopyAdvice?: () => void;
  onScanAnother?: () => void;
}

export const RegionalAdviceCard: React.FC<RegionalAdviceCardProps> = ({
  adviceMap,
  detectedLanguage,
  classification,
  onCopyAdvice,
  onScanAnother
}) => {
  const availableLangs = Object.keys(adviceMap);
  const defaultLang = availableLangs.includes(detectedLanguage) ? detectedLanguage : (availableLangs[0] || 'English');
  const [activeLang, setActiveLang] = useState<string>(defaultLang);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentAdvice = adviceMap[activeLang] || adviceMap['English'] || Object.values(adviceMap)[0];
  const isDangerous = classification === 'Critical' || classification === 'Elevated' || classification === 'Moderate';

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentAdvice.adviceText);
    
    if (activeLang === 'Bengali') utterance.lang = 'bn-IN';
    else if (activeLang === 'Hindi') utterance.lang = 'hi-IN';
    else if (activeLang === 'Tamil') utterance.lang = 'ta-IN';
    else if (activeLang === 'Telugu') utterance.lang = 'te-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const textToCopy = `[RegionalShield Security Advice - ${activeLang}]\n${currentAdvice.warningTitle}\n\n${currentAdvice.adviceText}\n\nKey Actions:\n${currentAdvice.actionChecklist.map(c => `• ${c}`).join('\n')}\n\nHelpline: 1930 (cybercrime.gov.in)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    if (onCopyAdvice) onCopyAdvice();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 md:p-8 border font-mono ${
      isDangerous 
        ? 'bg-[#0A0E13] border-[#C81B1C]/50 shadow-[0_0_30px_rgba(200,27,28,0.15)]' 
        : 'bg-[#0A0E13] border-[#6F9B7A]/50 shadow-[0_0_30px_rgba(111,155,122,0.15)]'
    }`}>
      {/* Top Header & Language Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
        <div className="space-y-0.5">
          <div className="text-[10px] text-[#858D97] uppercase tracking-widest">
            REGIONAL DEFENSE DIRECTIVE
          </div>
          <div className="text-sm font-bold text-[#F4F5F6] tracking-wider uppercase font-sans">
            PROTECTION ADVICE / {activeLang.toUpperCase()}
          </div>
        </div>

        {/* Vernacular Language Switcher */}
        <div className="flex items-center gap-1 bg-[#05070A] p-1 border border-white/10">
          {availableLangs.map((lang) => {
            const nativeLabel = adviceMap[lang]?.nativeScript || lang;
            const isActive = activeLang === lang;

            return (
              <button
                key={lang}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                  setActiveLang(lang);
                }}
                className={`px-3 py-1 text-xs transition-all font-mono uppercase ${
                  isActive
                    ? 'bg-[#C81B1C] text-white font-bold'
                    : 'text-[#858D97] hover:text-[#F4F5F6] hover:bg-white/[0.04]'
                }`}
              >
                {nativeLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Advisory Content in Indic Unicode */}
      <motion.div
        key={activeLang}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6 space-y-6"
      >
        {/* Warning Title in Vernacular */}
        <div className={`text-xl sm:text-2xl font-bold font-indic tracking-tight ${
          isDangerous ? 'text-[#EF4444]' : 'text-[#6F9B7A]'
        }`}>
          {currentAdvice.warningTitle}
        </div>

        {/* Advice text */}
        <p className="text-base sm:text-lg text-[#F4F5F6] leading-relaxed font-indic bg-[#05070A] p-5 border border-white/[0.05]">
          {currentAdvice.adviceText}
        </p>

        {/* Action Directives */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-[#858D97] font-mono">
            DEFENSIVE CHECKLIST ({currentAdvice.nativeScript})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {currentAdvice.actionChecklist.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#05070A] border border-white/[0.07] flex items-center gap-3 font-indic text-[#F4F5F6]"
              >
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 ${
                  isDangerous ? 'bg-[#C81B1C]/20 text-[#EF4444]' : 'bg-[#6F9B7A]/20 text-[#6F9B7A]'
                }`}>
                  0{idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions & Helpline */}
        <div className="pt-4 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858D97]">
          <div className="flex items-center gap-2">
            <span>NATIONAL CYBER HELPLINE: <strong className="text-[#C49A55] font-mono">1930</strong></span>
            <span>·</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E8FAE] hover:underline flex items-center gap-0.5"
            >
              cybercrime.gov.in
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 border text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? 'bg-[#C81B1C] text-white border-[#C81B1C] animate-pulse'
                  : 'bg-[#0D131A] hover:bg-[#151D26] text-[#F4F5F6] border-white/15'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingAudio ? 'STOP' : `AUDIO (${currentAdvice.nativeScript})`}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-[#0D131A] hover:bg-[#151D26] text-[#F4F5F6] border border-white/15 text-xs font-mono tracking-wider uppercase flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#6F9B7A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY ADVICE'}</span>
            </button>

            {onScanAnother && (
              <Button
                variant="primary"
                size="sm"
                onClick={onScanAnother}
              >
                [ SCAN ANOTHER → ]
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

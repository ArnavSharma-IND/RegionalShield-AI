import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupportedLanguage } from '../../types/threat';

interface ScanSequenceModalProps {
  isOpen: boolean;
  detectedLanguage?: SupportedLanguage;
  onComplete: () => void;
}

interface ScanStep {
  code: string;
  label: string;
  detail: string;
}

export const ScanSequenceModal: React.FC<ScanSequenceModalProps> = ({
  isOpen,
  detectedLanguage = 'Bengali',
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: ScanStep[] = [
    {
      code: '01',
      label: 'LANGUAGE DETECTION',
      detail: `Morphological script recognition · ${detectedLanguage} syntax identified`
    },
    {
      code: '02',
      label: 'LINGUISTIC SIGNALS',
      detail: 'Extracting conjunct tokens & phonetics for code-mixing classification'
    },
    {
      code: '03',
      label: 'SOCIAL ENGINEERING',
      detail: 'Evaluating coercion velocity, panic keywords & artificial deadlines'
    },
    {
      code: '04',
      label: 'URL INTELLIGENCE',
      detail: 'Dissecting registrars, homoglyphs & disposable domain spoofing'
    },
    {
      code: '05',
      label: 'BRAND IMPERSONATION',
      detail: 'Cross-verifying entity signature against institutional authorities'
    },
    {
      code: '06',
      label: 'RISK FUSION',
      detail: 'Compiling explainable AI dossier & localized vernacular advisory'
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return prev;
        }
      });
    }, 380);

    return () => clearInterval(interval);
  }, [isOpen, onComplete, steps.length]);

  if (!isOpen) return null;

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/95 backdrop-blur-lg font-mono">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="w-full max-w-xl bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
      >
        {/* Red laser scanning sweep */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C81B1C] shadow-[0_0_15px_#C81B1C] animate-pulse" />

        {/* Top Header */}
        <div className="space-y-1 pb-4 border-b border-white/[0.07]">
          <div className="flex items-center justify-between text-[11px] text-[#858D97]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C81B1C] animate-ping" />
              <span>INFERENCE ENGINE ACTIVE</span>
            </span>
            <span className="text-[#F4F5F6] font-bold">{progressPercent}%</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-[#F4F5F6] tracking-tight uppercase font-sans">
            ANALYZING MESSAGE
          </h3>
        </div>

        {/* Thin progress line */}
        <div className="h-0.5 w-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full bg-[#C81B1C]"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Sequential 6 Stages List */}
        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div
                key={step.code}
                className={`p-3 border transition-all duration-200 flex items-start justify-between gap-4 ${
                  isCurrent
                    ? 'bg-[#0D131A] border-[#C81B1C] text-[#F4F5F6]'
                    : isCompleted
                    ? 'bg-transparent border-white/[0.04] text-[#858D97]'
                    : 'bg-transparent border-transparent text-[#69727D] opacity-40'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${isCurrent ? 'text-[#C81B1C]' : 'text-[#69727D]'}`}>
                      {step.code}
                    </span>
                    <span className="text-xs font-bold tracking-wider font-sans uppercase">
                      {step.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#858D97] pl-7">
                    {step.detail}
                  </div>
                </div>

                <div className="text-[10px] font-mono shrink-0 mt-0.5">
                  {isCompleted ? (
                    <span className="text-[#6F9B7A]">DONE</span>
                  ) : isCurrent ? (
                    <span className="text-[#C81B1C] animate-pulse">RUNNING</span>
                  ) : (
                    <span className="text-[#69727D]">QUEUED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Metadata */}
        <div className="pt-4 border-t border-white/[0.07] flex justify-between text-[10px] text-[#69727D]">
          <span>TOKEN PIPELINE: INDIC-UTF8</span>
          <span>LATENCY TARGET: &lt;45MS</span>
        </div>
      </motion.div>
    </div>
  );
};

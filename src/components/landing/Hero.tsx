import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { LiveThreatFlow } from './LiveThreatFlow';

interface HeroProps {
  onScanClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-4 md:px-8 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10 font-mono">
        {/* Top Tag */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs text-[#858D97] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-[#C81B1C]" />
            <span>OMNIKON 2026 · THE NULL POINTER</span>
          </div>

          {/* Staggered Line Clip Reveal Headline */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F5F6] font-sans"
              >
                Cybersecurity
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#858D97] font-sans"
              >
                that speaks
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#C81B1C] font-sans underline decoration-2 decoration-white/20 underline-offset-8"
              >
                your language.
              </motion.h1>
            </div>
          </div>

          {/* Subcopy & Monospace Metadata */}
          <div className="pt-2 max-w-2xl space-y-4">
            <p className="text-sm md:text-base text-[#858D97] font-sans leading-relaxed">
              AI-powered phishing detection for regional-language and code-mixed messages across India's digital ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#69727D] pt-1">
              <span>MULTILINGUAL NLP</span>
              <span>+</span>
              <span>CYBERSECURITY SIGNALS</span>
              <span>+</span>
              <span>EXPLAINABLE AI</span>
            </div>
          </div>

          {/* Sharp Rectangular CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onScanClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              [ SCAN A THREAT → ]
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onExploreClick}
            >
              [ EXPLORE INTELLIGENCE ]
            </Button>
          </div>
        </div>

        {/* Abstract Threat Intelligence Flow Visualization */}
        <div className="p-6 md:p-8 bg-[#0A0E13] border border-white/[0.08]">
          <LiveThreatFlow onTestScanner={onScanClick} />
        </div>

        {/* Hero Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-white/[0.07] pt-8">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#F4F5F6] font-sans">12,842</div>
            <div className="text-xs text-[#858D97]">Messages Analyzed</div>
            <div className="text-[10px] text-[#6E8FAE]">INGESTION PIPELINE</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#C81B1C] font-sans">2,431</div>
            <div className="text-xs text-[#858D97]">Threats Detected</div>
            <div className="text-[10px] text-[#EF4444]">18.9% ATTACK RATIO</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#F4F5F6] font-sans">10+</div>
            <div className="text-xs text-[#858D97]">Languages Supported</div>
            <div className="text-[10px] text-[#858D97]">INDIC SCRIPTS</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-[#6F9B7A] font-sans">94%</div>
            <div className="text-xs text-[#858D97]">Target Recall</div>
            <div className="text-[10px] text-[#69727D]">EVALUATION TARGET</div>
          </div>
        </div>
      </div>
    </section>
  );
};

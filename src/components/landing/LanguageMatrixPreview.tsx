import React from 'react';
import { motion } from 'framer-motion';
import { Languages, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { MOCK_LANGUAGE_STATS } from '../../services/mockData';
import { Button } from '../ui/Button';

interface LanguageMatrixPreviewProps {
  onExploreLanguages: () => void;
}

export const LanguageMatrixPreview: React.FC<LanguageMatrixPreviewProps> = ({ onExploreLanguages }) => {
  return (
    <section className="py-20 px-4 md:px-8 border-t border-white/[0.06] bg-[#0D1118]/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Languages className="w-3.5 h-3.5" />
              <span>MULTILINGUAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Protection Across India's Digital Dialects
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              From Eastern India's Bengali KYC scams to North India's Hindi UPI refunds and South India's postal traps — RegionalShield covers the complete vernacular attack surface.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onExploreLanguages}
            className="shrink-0"
          >
            Explore Language Matrix
          </Button>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_LANGUAGE_STATS.slice(0, 6).map((lang) => (
            <motion.div
              key={lang.code}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-bold text-text-primary">
                    {lang.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/15 text-blue-300 font-indic font-medium">
                    {lang.nativeName}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {lang.status}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#080A0F]/70 border border-white/[0.04] text-xs font-indic text-text-secondary truncate">
                {lang.sampleThreat}
              </div>

              <div className="flex items-center justify-between text-[11px] text-text-muted font-mono pt-1">
                <span>Top Attack Vector:</span>
                <span className="text-text-primary truncate max-w-[170px] text-right">
                  {lang.topVector.split('&')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

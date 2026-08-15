import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Copy, 
  RotateCcw, 
  Radio, 
  Building, 
  Link2, 
  Clock, 
  Key, 
  AlertTriangle,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { AnalysisResult } from '../../types/threat';
import { RiskGauge } from '../ui/RiskGauge';
import { SeverityBadge, Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { RegionalAdviceCard } from './RegionalAdviceCard';

interface ThreatResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onNavigateToUrlScanner?: (url: string) => void;
  onReportThreat?: (result: AnalysisResult) => void;
}

export const ThreatResultView: React.FC<ThreatResultViewProps> = ({
  result,
  onReset,
  onNavigateToUrlScanner,
  onReportThreat
}) => {
  const [expandedPoints, setExpandedPoints] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [copiedReport, setCopiedReport] = useState(false);

  const togglePoint = (index: number) => {
    setExpandedPoints(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyAnalysis = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 font-mono"
    >
      {/* Top Threat Alert Header */}
      <div className="space-y-4 pb-6 border-b border-white/[0.07]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono tracking-widest px-2.5 py-1 uppercase font-bold ${
              result.classification === 'Safe'
                ? 'bg-[#6F9B7A]/20 text-[#6F9B7A] border border-[#6F9B7A]/40'
                : 'bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/40'
            }`}>
              {result.classification === 'Safe' ? 'LEGITIMATE MESSAGE' : 'THREAT DETECTED'}
            </span>
            <span className="text-xs text-[#858D97]">INCIDENT {result.id}</span>
            <span className="text-xs text-[#69727D]">·</span>
            <span className="text-xs text-[#6E8FAE] uppercase">{result.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={result.riskScore >= 70 ? 'accent-red' : 'technical'}
              size="sm"
              onClick={() => onReportThreat && onReportThreat(result)}
            >
              {result.riskScore >= 70 ? '[ REPORT INCIDENT → ]' : '[ MARK REVIEWED ]'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyAnalysis}
            >
              {copiedReport ? '[ COPIED ]' : '[ COPY JSON ]'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
            >
              [ SCAN ANOTHER ]
            </Button>
          </div>
        </div>

        {/* Large Typographic Threat Score & Signal Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
          {/* Enormous Typographic Score Gauge (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <RiskGauge score={result.riskScore} classification={result.classification} />

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-[#0A0E13] border border-white/[0.07]">
                <div className="text-[10px] text-[#69727D] uppercase">LANGUAGE SCRIPT</div>
                <div className="text-sm font-bold text-[#F4F5F6] mt-0.5">{result.detectedLanguage}</div>
                <div className="text-[10px] text-[#858D97] truncate">{result.languageScript}</div>
              </div>

              <div className="p-3 bg-[#0A0E13] border border-white/[0.07]">
                <div className="text-[10px] text-[#69727D] uppercase">TARGET BRAND</div>
                <div className="text-sm font-bold text-[#F4F5F6] mt-0.5">{result.targetBrand || 'None (Generic)'}</div>
                <div className="text-[10px] text-[#858D97] truncate">{result.claimedEntity || 'Unverified'}</div>
              </div>
            </div>
          </div>

          {/* Surrounding Horizontal Signal Bars (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs text-[#858D97] uppercase tracking-widest pb-1 border-b border-white/[0.04]">
              THREAT SIGNAL BREAKDOWN
            </div>

            <div className="space-y-3">
              {result.signals.map((sig) => {
                const barColor = sig.score >= 85 ? 'bg-[#C81B1C]' : sig.score >= 60 ? 'bg-[#C49A55]' : 'bg-[#6F9B7A]';
                const textColor = sig.score >= 85 ? 'text-[#EF4444]' : sig.score >= 60 ? 'text-[#F59E0B]' : 'text-[#6F9B7A]';

                return (
                  <div key={sig.id} className="space-y-1.5 p-3 bg-[#0A0E13] border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#F4F5F6] font-sans tracking-wide uppercase">
                        {sig.name}
                      </span>
                      <span className={`font-mono font-bold ${textColor}`}>{sig.score}%</span>
                    </div>

                    <div className="h-1 w-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className={`h-full ${barColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sig.score}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>

                    <div className="text-[11px] text-[#858D97] leading-relaxed">
                      {sig.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scanned Input Message Snippet */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#69727D]">
          <span>INTERCEPTED PAYLOAD</span>
          <span className="text-[#6E8FAE]">UTF-8 UNICODE SAFE</span>
        </div>
        <div className="p-5 bg-[#0A0E13] border border-white/[0.07] text-base font-indic text-[#F4F5F6] leading-relaxed">
          {result.originalMessage}
        </div>

        {result.extractedUrls.length > 0 && (
          <div className="p-3 bg-[#0D131A] border border-white/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#C81B1C]" />
              <span className="text-[#858D97]">HYPERLINK DETECTED:</span>
              <span className="text-[#EF4444] underline font-bold break-all">{result.extractedUrls[0]}</span>
            </div>
            {onNavigateToUrlScanner && (
              <button
                onClick={() => onNavigateToUrlScanner(result.extractedUrls[0])}
                className="text-xs text-[#6E8FAE] hover:text-white flex items-center gap-1 font-bold tracking-wider uppercase"
              >
                <span>[ DEEP SCAN DOMAIN → ]</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Regional Protection Advice - CORE PRIORITY */}
      <RegionalAdviceCard
        adviceMap={result.regionalAdvice}
        detectedLanguage={result.detectedLanguage}
        classification={result.classification}
        onScanAnother={onReset}
      />

      {/* Explainable AI ("WHY THIS WAS FLAGGED") - Expandable Rows without rounded cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
          <h3 className="text-sm font-bold text-[#F4F5F6] uppercase tracking-widest font-sans">
            WHY THIS WAS FLAGGED
          </h3>
          <span className="text-xs text-[#69727D]">EXPLAINABLE AI REASONING</span>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {result.explainablePoints.map((point, index) => {
            const isExpanded = !!expandedPoints[index];

            return (
              <div key={index} className="py-4 space-y-2">
                <button
                  onClick={() => togglePoint(index)}
                  className="w-full flex items-center justify-between text-left hover:text-[#C81B1C] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#C81B1C]">0{index + 1}</span>
                    <span className="text-sm font-bold text-[#F4F5F6] group-hover:text-white font-sans uppercase">
                      {point.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#858D97] uppercase px-2 py-0.5 bg-white/[0.04]">
                      {point.category}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#858D97]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#858D97]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-8 pt-2 space-y-2 text-xs"
                    >
                      <p className="text-[#858D97] leading-relaxed">
                        {point.technicalReason}
                      </p>
                      <div className="p-3 bg-[#0A0E13] border-l-2 border-[#C81B1C] text-blue-200">
                        <div className="text-[10px] text-[#6E8FAE] uppercase font-bold mb-0.5">
                          REGIONAL CONTEXT:
                        </div>
                        <p>{point.regionalContext}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

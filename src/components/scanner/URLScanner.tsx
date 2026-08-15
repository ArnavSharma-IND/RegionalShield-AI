import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Link2, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  ArrowRight,
  Layers,
  Globe
} from 'lucide-react';
import { URLAnalysisResult } from '../../types/threat';
import { urlAnalyzer } from '../../services/urlAnalyzer';
import { RiskGauge } from '../ui/RiskGauge';
import { SeverityBadge, Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface URLScannerProps {
  initialUrl?: string;
  onReportThreat?: (urlResult: URLAnalysisResult) => void;
}

const PRESET_URLS = [
  { label: 'SBI KYC PHISH', url: 'https://sbi-kyc-update-portal.xyz/login', category: 'High Risk' },
  { label: 'PHONEPE REWARD FAKE', url: 'https://phonepe-reward-claim.online/upi-pin', category: 'High Risk' },
  { label: 'INDIA POST PARCEL', url: 'https://indiapost-parcel-tracking.cc/track', category: 'High Risk' },
  { label: 'OFFICIAL ONLINESBI (SAFE)', url: 'https://retail.onlinesbi.sbi/retail/login.htm', category: 'Verified Safe' },
];

export const URLScanner: React.FC<URLScannerProps> = ({
  initialUrl = '',
  onReportThreat
}) => {
  const [inputUrl, setInputUrl] = useState<string>(initialUrl || 'https://sbi-kyc-update-portal.xyz/verify-account');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<URLAnalysisResult | null>(null);

  useEffect(() => {
    if (initialUrl) {
      setInputUrl(initialUrl);
      handleAnalyze(initialUrl);
    }
  }, [initialUrl]);

  const handleAnalyze = (urlToAnalyze?: string) => {
    const target = (urlToAnalyze || inputUrl).trim();
    if (!target) return;

    setIsScanning(true);
    setTimeout(() => {
      const result = urlAnalyzer.analyzeURL(target);
      setAnalysisResult(result);
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          DOMAIN REPUTATION / HOMOGLYPHS
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          URL & Domain Forensics
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Deconstruct domain segments, identify typosquatting homoglyphs, and detect brand impersonation in hostnames.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#69727D] mr-2">QUICK SAMPLES:</span>
        {PRESET_URLS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputUrl(preset.url);
              handleAnalyze(preset.url);
            }}
            className="px-3 py-1.5 bg-[#0A0E13] hover:bg-[#151D26] border border-white/10 text-[#F4F5F6] transition-all flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 ${preset.category === 'Verified Safe' ? 'bg-[#6F9B7A]' : 'bg-[#C81B1C]'}`} />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-[#0A0E13] border border-white/10 p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Link2 className="w-4 h-4 text-[#C81B1C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter URL to inspect, e.g. https://sbi-kyc-update-portal.xyz"
              className="w-full bg-[#05070A] border border-white/10 pl-11 pr-4 py-3 text-xs md:text-sm text-[#F4F5F6] focus:outline-none focus:border-[#C81B1C] transition-all"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            isLoading={isScanning}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => handleAnalyze()}
            disabled={!inputUrl.trim()}
            className="w-full sm:w-auto min-w-[180px]"
          >
            [ ANALYZE URL → ]
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Overview Banner */}
          <div className="p-6 md:p-8 bg-[#0A0E13] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs px-2.5 py-1 uppercase font-bold ${
                  analysisResult.classification === 'Safe'
                    ? 'bg-[#6F9B7A]/20 text-[#6F9B7A] border border-[#6F9B7A]/40'
                    : 'bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/40'
                }`}>
                  {analysisResult.classification.toUpperCase()} RISK
                </span>
                <span className="text-xs text-[#858D97]">TLD: {analysisResult.tldRiskLevel.toUpperCase()}</span>
                {analysisResult.isDomainMismatch && (
                  <span className="text-xs text-[#EF4444] px-2 py-0.5 bg-[#C81B1C]/15 border border-[#C81B1C]/30">
                    BRAND MISMATCH DETECTED
                  </span>
                )}
              </div>

              <div className="text-xl md:text-2xl font-bold text-[#F4F5F6] break-all font-sans">
                {analysisResult.domain}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#05070A] border border-white/[0.07]">
                  <div className="text-[10px] text-[#69727D] uppercase">CLAIMED BRAND</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5">{analysisResult.claimedBrand}</div>
                </div>

                <div className="p-3 bg-[#05070A] border border-white/[0.07]">
                  <div className="text-[10px] text-[#69727D] uppercase">DOMAIN AGE</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5">{analysisResult.domainAgeDays} DAYS</div>
                  <div className="text-[10px] text-[#C49A55]">
                    {analysisResult.domainAgeDays < 30 ? 'DISPOSABLE HOST' : 'AGED DOMAIN'}
                  </div>
                </div>

                <div className="p-3 bg-[#05070A] border border-white/[0.07]">
                  <div className="text-[10px] text-[#69727D] uppercase">SSL PROTOCOL</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5 flex items-center gap-1">
                    {analysisResult.isHttps ? <Lock className="w-3 h-3 text-[#6F9B7A]" /> : <Unlock className="w-3 h-3 text-[#EF4444]" />}
                    <span>{analysisResult.protocol}</span>
                  </div>
                  <div className="text-[10px] text-[#858D97] truncate">{analysisResult.sslIssuer || 'No Valid Certificate'}</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <RiskGauge score={analysisResult.riskScore} classification={analysisResult.classification} />
            </div>
          </div>

          {/* Domain Segment Dissection */}
          <div className="p-6 bg-[#0A0E13] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs">
              <span className="text-[#858D97] uppercase">DOMAIN STRUCTURE ANATOMY</span>
              <span className="text-[#69727D]">SEGMENT CLASSIFICATION</span>
            </div>

            <div className="p-4 bg-[#05070A] border border-white/[0.07] flex flex-wrap items-center gap-2">
              {analysisResult.structuralBreakdown.map((seg, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-2 border flex flex-col items-center gap-0.5 ${
                    seg.isSuspicious
                      ? 'bg-[#C81B1C]/20 border-[#C81B1C] text-[#EF4444]'
                      : 'bg-[#0D131A] border-white/10 text-[#F4F5F6]'
                  }`}
                  title={seg.reason}
                >
                  <span className="font-bold font-mono">{seg.value}</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#858D97]">
                    {seg.type}
                  </span>
                </span>
              ))}
            </div>

            {analysisResult.isDomainMismatch && (
              <div className="p-4 bg-[#05070A] border-l-2 border-[#C81B1C] text-xs text-red-300 space-y-1">
                <div className="font-bold text-[#EF4444] uppercase">DOMAIN MISMATCH ALERT</div>
                <p className="text-[#858D97] leading-relaxed">
                  Host claims identity of <strong>{analysisResult.claimedBrand}</strong> but resolves to host{' '}
                  <code className="text-[#EF4444] bg-black/40 px-1 py-0.5">{analysisResult.actualHost}</code>.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

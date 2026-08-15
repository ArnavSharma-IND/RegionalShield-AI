import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe2, 
  MapPin, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { REGIONAL_VECTOR_DATA } from '../services/mockData';
import { Button } from '../components/ui/Button';

interface ThreatIntelligencePageProps {
  onScanSample: (text: string) => void;
}

export const ThreatIntelligencePage: React.FC<ThreatIntelligencePageProps> = ({ onScanSample }) => {
  const [selectedState, setSelectedState] = useState<string>(REGIONAL_VECTOR_DATA[0].state);

  const activeData = REGIONAL_VECTOR_DATA.find(d => d.state === selectedState) || REGIONAL_VECTOR_DATA[0];

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          NATIONAL VULNERABILITY MATRIX
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          India Threat Intelligence
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Geo-linguistic breakdown of active phishing syndicates and vernacular social engineering campaigns targeting specific Indian states.
        </p>
      </div>

      {/* State Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs text-[#858D97] uppercase pb-2 border-b border-white/[0.06] flex justify-between">
            <span>REGIONAL STATE CORRIDORS</span>
            <span className="text-[#6E8FAE]">VULNERABILITY INDEX</span>
          </div>

          <div className="space-y-2">
            {REGIONAL_VECTOR_DATA.map((region) => {
              const isSelected = region.state === selectedState;

              return (
                <div
                  key={region.state}
                  onClick={() => setSelectedState(region.state)}
                  className={`p-4 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0D131A] border-[#C81B1C] shadow-[0_0_20px_rgba(200,27,28,0.15)]'
                      : 'bg-[#0A0E13] hover:bg-[#121820] border-white/[0.07]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#F4F5F6] font-sans">{region.state}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-white/[0.06] text-[#6E8FAE]">
                        {region.primaryLanguage}
                      </span>
                    </div>
                    <div className="text-xs text-[#858D97]">
                      Campaign: <span className="text-[#F4F5F6]">{region.vector}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] text-[#69727D]">INDEX</div>
                      <div className="text-sm font-bold text-[#C81B1C]">{region.threatIndex} / 100</div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 font-bold ${
                      region.volume === 'Very High' ? 'bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/40' :
                      region.volume === 'High' ? 'bg-[#C49A55]/20 text-[#F59E0B] border border-[#C49A55]/40' :
                      'bg-white/[0.04] text-[#858D97] border border-white/10'
                    }`}>
                      {region.volume.toUpperCase()} VOL
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 col dossier */}
        <div className="bg-[#0A0E13] border border-white/10 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs text-[#858D97] uppercase tracking-widest pb-2 border-b border-white/[0.06]">
              REGIONAL DOSSIER
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#F4F5F6] font-sans">{activeData.state}</h3>
              <p className="text-xs text-[#6E8FAE] mt-0.5">Primary Language: {activeData.primaryLanguage}</p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-[#05070A] border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-[#69727D] uppercase">ACTIVE VECTOR</div>
                <div className="font-bold text-[#F4F5F6]">{activeData.vector}</div>
              </div>

              <div className="p-3 bg-[#05070A] border border-white/[0.06] space-y-1">
                <div className="text-[10px] text-[#69727D] uppercase">REGULATORY ESCALATION</div>
                <div className="text-[#6F9B7A]">
                  Dispatched mitigation rule to <strong>National Cyber Cell (1930)</strong>.
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onScanSample(
              activeData.primaryLanguage === 'Bengali'
                ? 'আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে। অবিলম্বে ভেরিফাই করুন: https://sbi-kyc-update-portal.xyz'
                : 'प्रिय ग्राहक, आपका ₹4,999 का UPI कैशबैक लंबित है। क्लेम करने के लिए पिन दर्ज करें: https://phonepe-reward-claim.online'
            )}
            className="w-full"
          >
            [ TEST {activeData.primaryLanguage.toUpperCase()} SCAM → ]
          </Button>
        </div>
      </div>
    </div>
  );
};

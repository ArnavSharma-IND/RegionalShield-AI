import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Cpu, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ThreatNode {
  id: string;
  step: string;
  title: string;
  icon: React.ReactNode;
  activeLabel: string;
  detail: string;
  meta: string;
}

export const LiveThreatFlow: React.FC<{ onTestScanner?: () => void }> = ({ onTestScanner }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const nodes: ThreatNode[] = [
    {
      id: 'msg',
      step: '01',
      title: 'MESSAGE',
      icon: <MessageSquare className="w-4 h-4 text-[#858D97]" />,
      activeLabel: 'BENGALI SMS CAPTURED',
      detail: '"আপনার SBI অ্যাকাউন্ট KYC শেষ হয়ে গেছে..."',
      meta: 'CARRIER: VM-SBIINB · SMS ROUTE'
    },
    {
      id: 'lang',
      step: '02',
      title: 'LANGUAGE',
      icon: <Globe className="w-4 h-4 text-[#6E8FAE]" />,
      activeLabel: 'BENGALI (বাংলা লিপি)',
      detail: 'CONFIDENCE 0.99 · MULTI-CHARACTER CONJUNCTS',
      meta: 'UNICODE: UTF-8 · SCRIPT MORPHOLOGY'
    },
    {
      id: 'signals',
      step: '03',
      title: 'SIGNALS',
      icon: <AlertTriangle className="w-4 h-4 text-[#C49A55]" />,
      activeLabel: 'URGENCY + IMPERSONATION',
      detail: 'BANK IMPERSONATION 0.96 · TIME PRESSURE 0.89',
      meta: 'COERCION PATTERNS DETECTED'
    },
    {
      id: 'risk',
      step: '04',
      title: 'RISK',
      icon: <Cpu className="w-4 h-4 text-[#C81B1C]" />,
      activeLabel: 'RISK SCORE 94 / 100',
      detail: 'SEVERITY: CRITICAL · DISPOSABLE .XYZ DOMAIN',
      meta: 'ZERO-TRUST HEURISTICS EVALUATED'
    },
    {
      id: 'warning',
      step: '05',
      title: 'WARNING',
      icon: <ShieldCheck className="w-4 h-4 text-[#C81B1C]" />,
      activeLabel: 'VERNACULAR DIRECTIVE',
      detail: 'বাংলা: OTP বা পিন শেয়ার করবেন না · 1930 DISPATCH',
      meta: 'NATIONAL CYBERCELL ESCALATION'
    }
  ];

  return (
    <div className="w-full space-y-6 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] text-xs text-[#858D97]">
        <span className="tracking-widest uppercase">INTERACTIVE THREAT DETECTION FLOW</span>
        <span className="text-[#6E8FAE]">HOVER NODES FOR FORENSIC TELEMETRY</span>
      </div>

      {/* 5 Stages Horizontal Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {nodes.map((node, idx) => {
          const isSelected = activeNodeIndex === idx;

          return (
            <motion.div
              key={node.id}
              onMouseEnter={() => setActiveNodeIndex(idx)}
              className={`p-4 border transition-all duration-150 cursor-pointer space-y-3 relative ${
                isSelected
                  ? 'bg-[#0D131A] border-[#C81B1C] shadow-[0_0_20px_rgba(200,27,28,0.2)]'
                  : 'bg-[#0A0E13] hover:bg-[#121820] border-white/[0.07]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#69727D]">
                <span className={`font-bold ${isSelected ? 'text-[#C81B1C]' : ''}`}>
                  {node.step}
                </span>
                <span>{node.title}</span>
              </div>

              <div className="text-xs font-bold text-[#F4F5F6] uppercase font-sans tracking-wide">
                {node.activeLabel}
              </div>

              <div className="text-[11px] text-[#858D97] leading-relaxed line-clamp-2">
                {node.detail}
              </div>

              <div className="text-[9px] text-[#69727D] pt-2 border-t border-white/[0.04] truncate">
                {node.meta}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

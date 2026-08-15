import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { SeverityLevel } from '../../types/threat';

interface RiskGaugeProps {
  score: number; // 0-100
  classification: SeverityLevel;
  size?: number;
  animate?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  classification,
  animate = true
}) => {
  const springValue = useSpring(0, { stiffness: 70, damping: 22 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animate) {
      springValue.set(score);
    } else {
      setDisplayValue(score);
    }
  }, [score, animate, springValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  const getColor = (lvl: SeverityLevel) => {
    switch (lvl) {
      case 'Critical': return { text: 'text-[#C81B1C]', line: 'bg-[#C81B1C]', label: 'CRITICAL THREAT' };
      case 'Elevated': return { text: 'text-[#C49A55]', line: 'bg-[#C49A55]', label: 'ELEVATED RISK' };
      case 'Moderate': return { text: 'text-[#C49A55]', line: 'bg-[#C49A55]', label: 'MODERATE RISK' };
      case 'Low': return { text: 'text-[#6E8FAE]', line: 'bg-[#6E8FAE]', label: 'LOW RISK' };
      case 'Safe': return { text: 'text-[#6F9B7A]', line: 'bg-[#6F9B7A]', label: 'VERIFIED SAFE' };
    }
  };

  const colors = getColor(classification);

  return (
    <div className="flex flex-col items-start select-none font-mono">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#858D97] pb-1">
        <span className={`w-1.5 h-1.5 ${colors.line}`} />
        <span>THREAT RISK EVALUATION</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter ${colors.text} font-sans`}>
          {displayValue < 10 ? `0${displayValue}` : displayValue}
        </span>
        <div className="flex flex-col">
          <span className="text-xl font-mono text-[#858D97]">/100</span>
          <span className={`text-xs font-mono tracking-widest uppercase font-bold ${colors.text}`}>
            {colors.label}
          </span>
        </div>
      </div>

      {/* Thin horizontal gauge line */}
      <div className="w-full h-1 bg-white/[0.08] mt-3 relative overflow-hidden">
        <motion.div
          className={`h-full ${colors.line}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

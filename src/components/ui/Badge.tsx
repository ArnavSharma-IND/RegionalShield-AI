import React from 'react';
import { SeverityLevel } from '../../types/threat';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'critical' | 'elevated' | 'moderate' | 'low' | 'safe' | 'accent' | 'outline' | 'code';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-mono tracking-widest uppercase',
    md: 'text-xs px-2.5 py-1 font-mono tracking-wider uppercase',
    lg: 'text-xs md:text-sm px-3 py-1.5 font-mono tracking-widest font-semibold uppercase'
  }[size];

  // Sharp, technical borders and minimal background styling
  const variantClasses = {
    default: 'bg-[#0A0E13] text-[#858D97] border border-white/10',
    critical: 'bg-[#C81B1C]/15 text-[#EF4444] border border-[#C81B1C]/40',
    elevated: 'bg-[#C49A55]/15 text-[#F59E0B] border border-[#C49A55]/40',
    moderate: 'bg-[#C49A55]/10 text-[#FBBF24] border border-[#C49A55]/30',
    low: 'bg-[#6E8FAE]/15 text-[#6E8FAE] border border-[#6E8FAE]/30',
    safe: 'bg-[#6F9B7A]/15 text-[#6F9B7A] border border-[#6F9B7A]/40',
    accent: 'bg-[#C81B1C]/15 text-[#F4F5F6] border border-[#C81B1C]/50',
    outline: 'border border-white/20 text-[#F4F5F6] bg-transparent',
    code: 'bg-[#05070A] text-[#6E8FAE] font-mono border border-[#6E8FAE]/25'
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-none ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

export const SeverityBadge: React.FC<{ level: SeverityLevel; className?: string }> = ({ level, className = '' }) => {
  const variantMap: Record<SeverityLevel, 'critical' | 'elevated' | 'moderate' | 'low' | 'safe'> = {
    Critical: 'critical',
    Elevated: 'elevated',
    Moderate: 'moderate',
    Low: 'low',
    Safe: 'safe'
  };

  const dotColors: Record<SeverityLevel, string> = {
    Critical: 'bg-[#C81B1C] shadow-[0_0_8px_rgba(200,27,28,0.9)]',
    Elevated: 'bg-[#C49A55] shadow-[0_0_8px_rgba(196,154,85,0.8)]',
    Moderate: 'bg-[#C49A55]',
    Low: 'bg-[#6E8FAE]',
    Safe: 'bg-[#6F9B7A] shadow-[0_0_8px_rgba(111,155,122,0.8)]'
  };

  return (
    <Badge variant={variantMap[level]} className={className}>
      <span className={`w-1.5 h-1.5 rounded-none ${dotColors[level]}`} />
      <span>{level.toUpperCase()} THREAT</span>
    </Badge>
  );
};

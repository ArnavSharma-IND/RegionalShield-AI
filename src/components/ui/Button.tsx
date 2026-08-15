import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'accent-red' | 'technical';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 font-mono tracking-wider gap-1.5',
    md: 'text-xs md:text-sm px-5 py-2.5 font-mono tracking-wider gap-2',
    lg: 'text-sm md:text-base px-7 py-3.5 font-mono tracking-widest font-semibold gap-3'
  }[size];

  // Sharp, rectangular, cinematic buttons inspired by the reference design
  const variantClasses = {
    primary: 'bg-[#C81B1C] hover:bg-[#E02627] text-white border border-[#C81B1C] shadow-[0_0_20px_rgba(200,27,28,0.3)] active:translate-y-0.5',
    'accent-red': 'bg-[#C81B1C] hover:bg-[#E02627] text-white border border-[#C81B1C] shadow-[0_0_25px_rgba(200,27,28,0.4)] active:translate-y-0.5',
    secondary: 'bg-[#0D131A] hover:bg-[#151D26] text-[#F4F5F6] border border-white/10 hover:border-white/20 active:translate-y-0.5',
    outline: 'bg-transparent hover:bg-white/[0.04] text-[#F4F5F6] border border-white/20 hover:border-white/40 active:translate-y-0.5',
    technical: 'bg-black/60 hover:bg-black/80 text-[#6E8FAE] hover:text-white border border-[#6E8FAE]/30 hover:border-[#6E8FAE] active:translate-y-0.5',
    danger: 'bg-[#C81B1C]/20 hover:bg-[#C81B1C]/35 text-red-300 border border-[#C81B1C]/50 active:translate-y-0.5',
    ghost: 'bg-transparent hover:bg-white/[0.05] text-[#858D97] hover:text-[#F4F5F6] active:translate-y-0.5'
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center uppercase transition-all duration-150 select-none disabled:opacity-40 disabled:cursor-not-allowed rounded-none ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

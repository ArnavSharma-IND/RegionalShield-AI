import React from 'react';
import { Shield } from 'lucide-react';

interface LandingFooterProps {
  onNavigate: (route: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/[0.07] bg-[#05070A] py-16 px-4 md:px-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#C81B1C] flex items-center justify-center text-white font-bold text-xs">
                RS
              </div>
              <span className="font-bold text-base text-[#F4F5F6] tracking-wider uppercase font-sans">
                REGIONALSHIELD AI
              </span>
            </div>
            <p className="text-xs text-[#858D97] max-w-sm leading-relaxed">
              Cybersecurity that speaks your language. Next-generation AI-powered phishing detection engineered for India's regional and code-mixed digital landscape.
            </p>
            <div className="text-[10px] text-[#69727D]">
              OMNIKON 2026 · TRACK: Omni_CyberTech_1
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#F4F5F6] uppercase tracking-widest font-sans">
              MODULES
            </div>
            <ul className="space-y-2 text-xs text-[#858D97]">
              <li>
                <button onClick={() => onNavigate('scanner')} className="hover:text-white transition-colors">
                  Message Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('url-scanner')} className="hover:text-white transition-colors">
                  URL Forensics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('intelligence')} className="hover:text-white transition-colors">
                  Threat Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('languages')} className="hover:text-white transition-colors">
                  Language Matrix
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#F4F5F6] uppercase tracking-widest font-sans">
              THE NULL POINTER
            </div>
            <ul className="space-y-1.5 text-xs text-[#858D97]">
              <li className="font-bold text-[#F4F5F6]">Arnav Sharma</li>
              <li className="font-bold text-[#F4F5F6]">Sourasish Karak</li>
              <li className="text-[11px] text-[#69727D] pt-1">
                Built from scratch for Omnikon Hackathon.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#69727D]">
          <div>
            © 2026 REGIONALSHIELD AI · THE NULL POINTER
          </div>
          <div>
            NATIONAL CYBERCRIME HELPLINE: 1930 · ZERO-TRUST ARCHITECTURE
          </div>
        </div>
      </div>
    </footer>
  );
};

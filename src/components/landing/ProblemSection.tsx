import React from 'react';
import { motion } from 'framer-motion';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8 border-t border-white/[0.07] bg-[#05070A] font-mono">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs text-[#C81B1C] uppercase tracking-widest">
            THE REGIONAL DEFENSE GAP
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
            Phishing doesn't always speak English.
          </h2>
          <p className="text-sm md:text-base text-[#858D97] font-sans leading-relaxed">
            India's digital economy has expanded to 800+ million internet users. Over 85% of mobile data consumption occurs in Indic regional languages — yet conventional corporate security gateways inspect only English syntax.
          </p>
        </div>

        {/* 3 Spatial Problem Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/[0.07] pt-8">
          <div className="space-y-3">
            <div className="text-xs text-[#C81B1C] font-bold">01 / GATEWAY BLINDNESS</div>
            <h3 className="text-lg font-bold text-[#F4F5F6] font-sans">
              Legacy Regex Evasion
            </h3>
            <p className="text-xs text-[#858D97] leading-relaxed">
              Standard filters scan for English keywords. When the phishing campaign is written in Bengali (<span className="font-indic text-white">অবিলম্বে</span>) or Hindi (<span className="font-indic text-white">तुरंत</span>), legacy engines produce zero detection signals.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-[#C49A55] font-bold">02 / SMS & WHATSAPP VECTORS</div>
            <h3 className="text-lg font-bold text-[#F4F5F6] font-sans">
              Direct Consumer Coercion
            </h3>
            <p className="text-xs text-[#858D97] leading-relaxed">
              Scammers bypass enterprise email filters completely by delivering targeted malicious payloads through SMS, WhatsApp, and Telegram directly to first-time digital payment users.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-[#6E8FAE] font-bold">03 / CODE-MIXED DIALECTS</div>
            <h3 className="text-lg font-bold text-[#F4F5F6] font-sans">
              Hybrid Hinglish Attacks
            </h3>
            <p className="text-xs text-[#858D97] leading-relaxed">
              "Aapka account block ho jayega, KYC update karo." These hybrid vernacular phrases evade English dictionary tokenizers while creating intense psychological urgency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

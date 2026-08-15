import React from 'react';

export const SystemInfoPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          HACKATHON DOSSIER / ARCHITECTURE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          About RegionalShield AI
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Technical specifications, multilingual NLP pipeline architecture, and team credentials for the Omnikon 2026 Hackathon.
        </p>
      </div>

      {/* Team Banner */}
      <div className="bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
          <div>
            <div className="text-xs text-[#C81B1C] font-bold uppercase">OMNIKON HACKATHON 2026</div>
            <h3 className="text-xl font-bold text-[#F4F5F6] font-sans mt-0.5">
              Omni_CyberTech_1 — Regional-Language Phishing Detection
            </h3>
          </div>

          <div className="text-xs px-3 py-1 bg-[#C81B1C]/15 text-[#EF4444] border border-[#C81B1C]/40 font-bold uppercase">
            THE NULL POINTER
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
          <div className="p-4 bg-[#05070A] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[#69727D] uppercase">DEVELOPER & ARCHITECT</div>
            <div className="text-base font-bold text-[#F4F5F6] font-sans">Arnav Sharma</div>
            <div className="text-[#858D97]">Core ML Architecture, Frontend Systems & UX</div>
          </div>

          <div className="p-4 bg-[#05070A] border border-white/[0.06] space-y-1">
            <div className="text-[10px] text-[#69727D] uppercase">RESEARCH & LINGUISTICS</div>
            <div className="text-base font-bold text-[#F4F5F6] font-sans">Sourasish Karak</div>
            <div className="text-[#858D97]">Indic NLP Linguistics, Forensic Dataset & Heuristics</div>
          </div>
        </div>
      </div>

      {/* Pipeline Specifications */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-[#F4F5F6] uppercase pb-2 border-b border-white/[0.07] font-sans tracking-widest">
          TECHNICAL STACK & DETECTION LAYERS
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06] text-xs">
          <div className="py-4 space-y-1">
            <div className="font-bold text-[#F4F5F6] font-sans">01 / INDIC MORPHOLOGICAL TOKENIZATION</div>
            <p className="text-[#858D97] leading-relaxed">
              Handles multicharacter conjuncts in Bengali (বাংলা), Devanagari (देवनागरी), Tamil (தமிழ்), Telugu (తెలుగు), and code-mixed Latin phonetics (Hinglish/Benglish).
            </p>
          </div>

          <div className="py-4 space-y-1">
            <div className="font-bold text-[#F4F5F6] font-sans">02 / ZERO-TRUST BRAND & HOMOGLYPH RADAR</div>
            <p className="text-[#858D97] leading-relaxed">
              Verifies claimed institutional identity against actual resolving FQDNs, registrar delegation age, and Levenshtein character substitutions.
            </p>
          </div>

          <div className="py-4 space-y-1">
            <div className="font-bold text-[#F4F5F6] font-sans">03 / EXPLAINABLE AI (XAI) REASONING</div>
            <p className="text-[#858D97] leading-relaxed">
              Deconstructs threat scores into clear, verifiable plain-language rationale for SOC analysts and end users.
            </p>
          </div>

          <div className="py-4 space-y-1">
            <div className="font-bold text-[#F4F5F6] font-sans">04 / VERNACULAR PROTECTION & 1930 DISPATCH</div>
            <p className="text-[#858D97] leading-relaxed">
              Generates protective directives in the recipient's native tongue with synthetic audio readouts and automated escalation pathways to cybercrime.gov.in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

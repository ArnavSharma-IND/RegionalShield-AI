import React from 'react';
import { motion } from 'framer-motion';

export const WorkflowSection: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'UNDERSTAND',
      subtitle: 'Indic Linguistic NLP',
      desc: 'Parses complex multi-character Unicode conjuncts, phonetic transliterations, and hybrid code-mixed dialects.'
    },
    {
      num: '02',
      title: 'ANALYZE',
      subtitle: 'Multi-Vector Heuristics',
      desc: 'Cross-verifies institutional brand headers, extracts disposable URLs, and scores panic urgency tokens.'
    },
    {
      num: '03',
      title: 'EXPLAIN',
      subtitle: 'Explainable AI Dossier',
      desc: 'Provides plain-language forensic justification for every threat score without black-box opacity.'
    },
    {
      num: '04',
      title: 'PROTECT',
      subtitle: 'Vernacular Guidance & 1930',
      desc: 'Delivers defensive advice in the recipient’s native mother tongue with synthetic audio readouts.'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 border-t border-white/[0.07] bg-[#0A0E13] font-mono">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs text-[#858D97] uppercase tracking-widest">
            INSPECTION PIPELINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
            How RegionalShield Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((st) => (
            <div key={st.num} className="p-6 bg-[#05070A] border border-white/[0.07] space-y-4">
              <div className="text-3xl font-bold text-[#C81B1C]">
                {st.num}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F4F5F6] font-sans uppercase">
                  {st.title}
                </h3>
                <div className="text-xs text-[#6E8FAE] mt-0.5">
                  {st.subtitle}
                </div>
              </div>
              <p className="text-xs text-[#858D97] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

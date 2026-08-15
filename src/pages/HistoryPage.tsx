import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ArrowRight, 
  Copy, 
  Globe, 
  Filter 
} from 'lucide-react';
import { MOCK_THREAT_HISTORY } from '../services/mockData';
import { ThreatHistoryItem } from '../types/threat';
import { Button } from '../components/ui/Button';

interface HistoryPageProps {
  onScanSample: (text: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onScanSample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedThreat, setSelectedThreat] = useState<ThreatHistoryItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const filteredThreats = useMemo(() => {
    return MOCK_THREAT_HISTORY.filter((item) => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.messagePreview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.targetBrand && item.targetBrand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLang = selectedLanguage === 'All' || item.language.includes(selectedLanguage);
      const matchesCat = selectedCategory === 'All' || item.category.includes(selectedCategory);

      return matchesSearch && matchesLang && matchesCat;
    });
  }, [searchTerm, selectedLanguage, selectedCategory]);

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          FORENSIC INCIDENT LOG
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          Threat History Registry
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Audit trail of intercepted phishing payloads, automated mitigation rules, and language classifications.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#0A0E13] border border-white/10 p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#858D97] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search threat ID, text snippet, brand (e.g. SBI, UPI)..."
              className="w-full bg-[#05070A] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-[#F4F5F6] placeholder:text-[#4D5662] focus:outline-none focus:border-[#C81B1C]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter by Language"
              className="bg-[#05070A] text-xs text-[#F4F5F6] px-3 py-2.5 border border-white/15 focus:outline-none focus:border-[#C81B1C] w-full md:w-40"
            >
              <option value="All">All Languages</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Hindi">Hindi (हिन्दी)</option>
              <option value="Code-Mixed">Code-Mixed</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
              className="bg-[#05070A] text-xs text-[#F4F5F6] px-3 py-2.5 border border-white/15 focus:outline-none focus:border-[#C81B1C] w-full md:w-44"
            >
              <option value="All">All Categories</option>
              <option value="KYC">KYC Verification</option>
              <option value="UPI">UPI Refund</option>
              <option value="Banking">Banking Phishing</option>
              <option value="Electricity">Electricity Bill</option>
              <option value="Job">Job / WFH Scam</option>
              <option value="Safe">Safe / Control</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-[#69727D] pt-1">
          <span>SHOWING {filteredThreats.length} OF {MOCK_THREAT_HISTORY.length} INCIDENTS</span>
          {(searchTerm || selectedLanguage !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('All');
                setSelectedCategory('All');
              }}
              className="text-[#C81B1C] hover:underline"
            >
              [ RESET FILTERS ]
            </button>
          )}
        </div>
      </div>

      {/* Threats Feed */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            onClick={() => setSelectedThreat(threat)}
            className="py-4 hover:bg-[#0A0E13] transition-colors cursor-pointer space-y-2 group px-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#F4F5F6]">{threat.id}</span>
                <span className="text-[#858D97]">{threat.timeAgo}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold ${
                  threat.riskScore >= 85 ? 'bg-[#C81B1C]/20 text-[#EF4444]' : 'bg-[#C49A55]/20 text-[#F59E0B]'
                }`}>
                  {threat.classification.toUpperCase()}
                </span>
                <span className="text-[#6E8FAE]">{threat.language} · {threat.category}</span>
              </div>

              <div className="font-bold text-xs">
                <span className={threat.riskScore >= 85 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}>
                  RISK {threat.riskScore}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="font-indic text-[#858D97] group-hover:text-[#F4F5F6] max-w-3xl truncate">
                {threat.messagePreview}
              </div>
              <span className="text-[#C81B1C] text-[11px] group-hover:underline self-end sm:self-auto">
                [ INSPECT INCIDENT → ]
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Forensic Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070A]/95 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full max-w-2xl bg-[#0A0E13] border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.07]">
                <div>
                  <div className="text-xs text-[#858D97]">{selectedThreat.id} · {selectedThreat.timeAgo}</div>
                  <h3 className="text-xl font-bold text-[#F4F5F6] mt-1 font-sans">
                    {selectedThreat.category}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedThreat(null)}
                  className="p-1 text-[#858D97] hover:text-[#F4F5F6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] text-[#69727D] uppercase">INTERCEPTED MESSAGE</div>
                <div className="p-4 bg-[#05070A] border border-white/[0.06] text-sm font-indic text-[#F4F5F6] leading-relaxed">
                  {selectedThreat.messagePreview}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#05070A] border border-white/[0.05]">
                  <div className="text-[10px] text-[#69727D]">LANGUAGE</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5">{selectedThreat.language}</div>
                </div>

                <div className="p-3 bg-[#05070A] border border-white/[0.05]">
                  <div className="text-[10px] text-[#69727D]">TARGET ENTITY</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5">{selectedThreat.targetBrand || 'None'}</div>
                </div>

                <div className="p-3 bg-[#05070A] border border-white/[0.05]">
                  <div className="text-[10px] text-[#69727D]">CHANNEL</div>
                  <div className="font-bold text-[#F4F5F6] mt-0.5">{selectedThreat.channel}</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.07]">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selectedThreat, null, 2));
                    setCopiedId(true);
                    setTimeout(() => setCopiedId(false), 2000);
                  }}
                >
                  {copiedId ? '[ COPIED ]' : '[ COPY JSON ]'}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const text = selectedThreat.messagePreview;
                    setSelectedThreat(null);
                    onScanSample(text);
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  [ RE-ANALYZE IN SCANNER → ]
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

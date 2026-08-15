import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { MOCK_THREAT_HISTORY, MOCK_CHART_DATA, CATEGORY_BREAKDOWN } from '../services/mockData';
import { ThreatHistoryItem } from '../types/threat';
import { Button } from '../components/ui/Button';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
  onInspectThreat: (threat: ThreatHistoryItem) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onInspectThreat
}) => {
  const [timeframe, setTimeframe] = useState<'24H' | '7D' | '30D'>('7D');
  const chartData = MOCK_CHART_DATA[timeframe];

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-mono">
      {/* Top Command Header */}
      <div className="space-y-3 pb-6 border-b border-white/[0.07]">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#858D97]">
          <div className="flex items-center gap-2">
            <span>REGIONALSHIELD AI</span>
            <span>/</span>
            <span>SECURITY COMMAND</span>
          </div>
          <div className="flex items-center gap-2 text-[#6F9B7A]">
            <span className="w-1.5 h-1.5 bg-[#6F9B7A] animate-pulse" />
            <span>SYSTEM / PROTECTION ACTIVE</span>
          </div>
        </div>

        {/* Large Typographic Threat Level Display */}
        <div className="pt-2">
          <div className="text-xs text-[#858D97] tracking-widest uppercase">
            ENVIRONMENTAL STATUS
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F5F6] font-sans">
              THREAT LEVEL <span className="text-[#C49A55]">ELEVATED</span>
            </h1>
            <div className="text-xs text-[#858D97]">
              <span>ACTIVE ATTACKS INTERCEPTED: </span>
              <strong className="text-[#C81B1C] font-bold">2,431</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Activity Large Line Chart with Surrounding Metadata */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.07]">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-bold text-[#F4F5F6] uppercase tracking-widest font-sans">THREAT ACTIVITY</span>
            <span className="text-[#69727D]">────────</span>
            <span className="text-[#858D97]">THREATS <strong className="text-[#F4F5F6]">2,431</strong></span>
            <span className="text-[#858D97]">BLOCKED <strong className="text-[#6F9B7A]">1,892</strong></span>
            <span className="text-[#858D97]">LANGUAGES <strong className="text-[#6E8FAE]">10+</strong></span>
          </div>

          <div className="flex items-center gap-1 bg-[#0A0E13] p-1 border border-white/10 text-xs">
            {(['24H', '7D', '30D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 uppercase transition-all ${
                  timeframe === tf
                    ? 'bg-[#C81B1C] text-white font-bold'
                    : 'text-[#858D97] hover:text-[#F4F5F6]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full bg-[#0A0E13] border border-white/[0.06] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="cmdThreat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C81B1C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#C81B1C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#69727D" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#69727D" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#05070A',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0px',
                  fontSize: '11px',
                  color: '#F4F5F6',
                  fontFamily: 'monospace'
                }}
              />
              <Area type="monotone" dataKey="threats" stroke="#C81B1C" strokeWidth={2} fillOpacity={1} fill="url(#cmdThreat)" name="Threats Detected" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vertical Intelligence Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-[#F4F5F6] uppercase tracking-widest font-sans">
              LIVE THREAT INTELLIGENCE FEED
            </span>
            <span className="text-[#C81B1C] animate-pulse font-bold text-[10px]">● INGESTION STREAM</span>
          </div>

          <Button
            variant="technical"
            size="sm"
            onClick={() => onNavigate('scanner')}
          >
            [ + SCAN NEW PAYLOAD ]
          </Button>
        </div>

        {/* Intelligence feed rows */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {MOCK_THREAT_HISTORY.map((threat) => (
            <div
              key={threat.id}
              onClick={() => onInspectThreat(threat)}
              className="py-4 hover:bg-white/[0.02] transition-colors cursor-pointer space-y-2 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[#858D97]">{threat.timeAgo}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${
                    threat.riskScore >= 85 ? 'bg-[#C81B1C]/20 text-[#EF4444]' : 'bg-[#C49A55]/20 text-[#F59E0B]'
                  }`}>
                    {threat.classification.toUpperCase()}
                  </span>
                  <span className="text-[#6E8FAE] uppercase">{threat.language} · {threat.category}</span>
                </div>

                <div className="text-right font-bold text-xs">
                  <span className={threat.riskScore >= 85 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}>
                    RISK {threat.riskScore}
                  </span>
                </div>
              </div>

              {/* Message snippet & tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="font-indic text-[#F4F5F6] group-hover:text-white max-w-3xl truncate">
                  {threat.messagePreview}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#69727D] shrink-0">
                  <span className="px-1.5 py-0.5 bg-white/[0.04]">{threat.detectedVector}</span>
                  <span className="text-[#C81B1C] group-hover:underline">[ INSPECT → ]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

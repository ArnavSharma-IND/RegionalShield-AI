import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { MOCK_CHART_DATA, MOCK_LANGUAGE_STATS } from '../services/mockData';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24H' | '7D' | '30D'>('7D');
  const chartData = MOCK_CHART_DATA[timeframe];

  const languageChartData = MOCK_LANGUAGE_STATS.slice(0, 6).map(l => ({
    name: l.name.split(' ')[0],
    threats: l.threatsDetected,
    rate: l.threatRate
  }));

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-mono">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-white/[0.07]">
        <div className="text-xs text-[#858D97] tracking-widest uppercase">
          SOC TELEMETRY / EVALUATION BENCHMARKS
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6] font-sans">
          SOC Analytics & Telemetry
        </h1>
        <p className="text-xs md:text-sm text-[#858D97] max-w-2xl leading-relaxed">
          Operational metrics tracking multilingual threat detection velocity, evaluation targets, and script vulnerability.
        </p>
      </div>

      {/* 4 Metric Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/[0.07] py-6">
        <div className="space-y-1">
          <div className="text-xs text-[#858D97]">TARGET RECALL</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#6E8FAE] font-sans">94.2%</div>
          <div className="text-[10px] text-[#69727D]">EVALUATION TARGET</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#858D97]">MODEL PRECISION</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#6F9B7A] font-sans">96.8%</div>
          <div className="text-[10px] text-[#69727D]">EVALUATION TARGET</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#858D97]">FALSE POSITIVE RATE</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#F4F5F6] font-sans">2.1%</div>
          <div className="text-[10px] text-[#6F9B7A]">CONTROLLED RATE</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#858D97]">INFERENCE LATENCY</div>
          <div className="text-3xl sm:text-4xl font-bold text-[#C81B1C] font-sans">38 ms</div>
          <div className="text-[10px] text-[#69727D]">AVERAGE PIPELINE TIME</div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.07] text-xs">
            <span className="font-bold text-[#F4F5F6] font-sans uppercase">THREAT VELOCITY OVER TIME</span>
            <div className="flex items-center gap-1 bg-[#0A0E13] p-1 border border-white/10 text-[10px]">
              {(['24H', '7D', '30D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 uppercase ${
                    timeframe === tf ? 'bg-[#C81B1C] text-white font-bold' : 'text-[#858D97]'
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
                  <linearGradient id="anThreatsRed" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="threats" stroke="#C81B1C" strokeWidth={2} fillOpacity={1} fill="url(#anThreatsRed)" name="Threats Detected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="pb-2 border-b border-white/[0.07] text-xs">
            <span className="font-bold text-[#F4F5F6] font-sans uppercase">THREAT VOLUME BY LANGUAGE</span>
          </div>

          <div className="h-64 w-full bg-[#0A0E13] border border-white/[0.06] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={languageChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#69727D" fontSize={10} tickLine={false} axisLine={false} />
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
                <Bar dataKey="threats" fill="#6E8FAE" radius={0} name="Threats Detected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

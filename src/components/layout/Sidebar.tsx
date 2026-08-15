import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Link2, 
  Globe2, 
  History, 
  BarChart3, 
  Languages, 
  Settings, 
  Info,
  Activity,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  code: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems: NavItem[] = [
    { id: 'landing', code: '00', label: 'OVERVIEW', icon: <Home className="w-4 h-4" /> },
    { id: 'dashboard', code: '01', label: 'COMMAND SOC', icon: <LayoutDashboard className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'scanner', code: '02', label: 'SCAN MESSAGE', icon: <ShieldAlert className="w-4 h-4" />, badge: 'CORE' },
    { id: 'url-scanner', code: '03', label: 'URL FORENSICS', icon: <Link2 className="w-4 h-4" /> },
    { id: 'intelligence', code: '04', label: 'INTELLIGENCE', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'languages', code: '05', label: 'LANGUAGES', icon: <Languages className="w-4 h-4" />, badge: '10+' },
    { id: 'analytics', code: '06', label: 'ANALYTICS', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', code: '07', label: 'THREAT LOG', icon: <History className="w-4 h-4" /> },
    { id: 'settings', code: '08', label: 'SETTINGS', icon: <Settings className="w-4 h-4" /> },
    { id: 'system', code: '09', label: 'ABOUT / SPECS', icon: <Info className="w-4 h-4" /> }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Rail */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-60 bg-[#05070A] border-r border-white/[0.07] z-50 flex flex-col justify-between font-mono transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Tag */}
        <div className="p-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 text-xs tracking-widest text-[#858D97]">
            <span className="w-1.5 h-1.5 bg-[#C81B1C]" />
            <span>REGIONALSHIELD AI</span>
          </div>
          <div className="text-[10px] text-[#69727D] mt-1 font-mono">
            CYBER DEFENSE / V2.4
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] text-[#69727D] px-5 py-2 uppercase tracking-widest">
            NAVIGATION RAIL
          </div>

          {navItems.map((item) => {
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-5 py-3 text-xs tracking-wider text-left transition-all border-l-2 ${
                  isActive
                    ? 'text-[#F4F5F6] bg-[#0D131A] border-[#C81B1C] font-semibold'
                    : 'text-[#858D97] hover:text-[#F4F5F6] hover:bg-white/[0.02] border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#69727D]">{item.code}</span>
                  <span className={isActive ? 'text-[#C81B1C]' : 'text-[#69727D]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 ${
                    item.badge === 'CORE' || item.badge === 'LIVE'
                      ? 'bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/30'
                      : 'bg-white/[0.04] text-[#6E8FAE] border border-white/10'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom System Telemetry */}
        <div className="p-4 border-t border-white/[0.07] bg-[#0A0E13] text-[11px] space-y-2">
          <div className="flex items-center justify-between text-[#858D97]">
            <span>ENGINE</span>
            <span className="text-[#6F9B7A] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#6F9B7A] animate-pulse" />
              OPERATIONAL
            </span>
          </div>
          <div className="text-[10px] text-[#69727D] flex justify-between border-t border-white/[0.04] pt-2">
            <span>LATENCY 38ms</span>
            <span>EVAL RECALL 94%</span>
          </div>
        </div>
      </aside>
    </>
  );
};

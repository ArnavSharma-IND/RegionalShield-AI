import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  ArrowRight,
  Globe,
  Radio
} from 'lucide-react';
import { DEMO_SCENARIOS, DemoScenario } from '../../data/demoScenarios';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
  onSelectPreset: (scenario: DemoScenario) => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  currentRoute,
  onNavigate
}) => {
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'PRODUCT' },
    { id: 'dashboard', label: 'COMMAND' },
    { id: 'intelligence', label: 'INTELLIGENCE' },
    { id: 'languages', label: 'LANGUAGES' },
    { id: 'analytics', label: 'ANALYTICS' },
    { id: 'system', label: 'ABOUT' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="h-16 border-b border-white/[0.07] bg-[#05070A]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between font-mono">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-6 h-6 bg-[#C81B1C] flex items-center justify-center text-white font-bold text-xs tracking-tighter">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#F4F5F6] tracking-wider uppercase font-sans">
                REGIONALSHIELD AI
              </span>
              <span className="text-[9px] px-1 bg-[#C81B1C]/20 text-[#EF4444] border border-[#C81B1C]/40 hidden sm:inline">
                PROTOTYPE
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-[#858D97]">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`transition-colors tracking-widest uppercase hover:text-[#F4F5F6] ${
                  isActive ? 'text-[#F4F5F6] font-bold border-b border-[#C81B1C] pb-0.5' : ''
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Controls: Demo Mode Presets + Sharp CTA */}
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#6F9B7A] mr-2">
          <span className="w-1.5 h-1.5 bg-[#6F9B7A] animate-pulse" />
          <span>ENGINE ACTIVE</span>
        </div>

        {/* Demo Mode Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDemoDropdown(!showDemoDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0D131A] hover:bg-[#151D26] border border-white/15 text-xs text-[#F4F5F6] tracking-wider uppercase transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-[#C49A55] fill-[#C49A55]" />
            <span>DEMO MODE</span>
            <ChevronDown className="w-3 h-3 text-[#858D97]" />
          </button>

          {showDemoDropdown && (
            <div 
              className="absolute top-full right-0 mt-2 w-80 bg-[#0A0E13] border border-white/15 shadow-2xl z-50 p-2 space-y-1 rounded-none"
              onMouseLeave={() => setShowDemoDropdown(false)}
            >
              <div className="px-3 py-1.5 text-[10px] text-[#858D97] uppercase border-b border-white/[0.07] flex justify-between">
                <span>PRESET SCENARIOS</span>
                <span className="text-[#C81B1C]">TESTBENCH</span>
              </div>
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    onSelectPreset(scenario);
                    setShowDemoDropdown(false);
                  }}
                  className="w-full p-2.5 text-left hover:bg-[#121820] transition-colors flex items-start gap-2.5 group"
                >
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] text-[#6E8FAE] font-mono shrink-0">
                    {scenario.nativeLanguageLabel}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#F4F5F6] group-hover:text-white truncate font-sans">
                      {scenario.title}
                    </div>
                    <div className="text-[10px] text-[#858D97] truncate">
                      {scenario.shortDescription}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sharp Rectangular CTA button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleNav('scanner')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="hidden sm:inline-flex"
        >
          [ SCAN A THREAT → ]
        </Button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#858D97] hover:text-[#F4F5F6]"
          aria-label="Open Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu with Red Line Rule */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-[#05070A] z-50 p-6 flex flex-col justify-between font-mono"
          >
            <div className="space-y-6">
              {/* Red line rule */}
              <div className="h-0.5 w-full bg-[#C81B1C]" />

              <div className="space-y-4">
                <div className="text-xs text-[#858D97] tracking-widest uppercase">NAVIGATION</div>
                {navLinks.map((link, idx) => (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className="block w-full text-left text-2xl font-bold text-[#F4F5F6] hover:text-[#C81B1C] transition-colors uppercase font-sans"
                  >
                    <span className="text-sm font-mono text-[#858D97] mr-3">0{idx + 1}</span>
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.07] space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleNav('scanner')}
                  className="w-full"
                >
                  [ SCAN A THREAT → ]
                </Button>
              </div>
            </div>

            <div className="text-xs text-[#858D97] pt-4 border-t border-white/[0.07] flex justify-between">
              <span>OMNIKON 2026</span>
              <span>THE NULL POINTER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

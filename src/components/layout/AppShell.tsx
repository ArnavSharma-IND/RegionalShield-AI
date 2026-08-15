import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AtmosphereBackground } from './AtmosphereBackground';
import { ToastContainer, ToastMessage } from '../ui/Toast';
import { DemoScenario } from '../../data/demoScenarios';

interface AppShellProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSelectPreset: (scenario: DemoScenario) => void;
  toasts: ToastMessage[];
  onDismissToast: (id: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onNavigate,
  onSelectPreset,
  toasts,
  onDismissToast,
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLandingPage = currentRoute === 'landing';

  return (
    <div className="min-h-screen bg-[#05070A] text-[#F4F5F6] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#C81B1C]/30 selection:text-white">
      {/* Background Atmosphere Canvas */}
      <AtmosphereBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onSelectPreset={onSelectPreset}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex relative z-10">
        {/* Left Navigation Rail (Only on SOC pages) */}
        {!isLandingPage && (
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={onNavigate}
            isMobileOpen={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Stage */}
        <main className={`flex-1 ${!isLandingPage ? 'lg:pl-60 p-4 md:p-8' : 'p-0'}`}>
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={onDismissToast} />
    </div>
  );
};

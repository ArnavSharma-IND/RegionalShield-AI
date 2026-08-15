import React from 'react';
import { Hero } from '../components/landing/Hero';
import { ProblemSection } from '../components/landing/ProblemSection';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { LanguageMatrixPreview } from '../components/landing/LanguageMatrixPreview';
import { LandingFooter } from '../components/landing/LandingFooter';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-0">
      <Hero
        onScanClick={() => onNavigate('scanner')}
        onExploreClick={() => onNavigate('intelligence')}
      />
      <ProblemSection />
      <WorkflowSection />
      <LanguageMatrixPreview onExploreLanguages={() => onNavigate('languages')} />
      <LandingFooter onNavigate={onNavigate} />
    </div>
  );
};

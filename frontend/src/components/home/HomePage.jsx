import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import HowItWorksSection from './HowItWorksSection';
import LatestScamAlerts from './LatestScamAlerts';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <LatestScamAlerts />
    </div>
  );
}


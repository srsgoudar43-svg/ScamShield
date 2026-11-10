import React from 'react';
import { ScamProvider, useScam } from './context/ScamContext';
import Navbar from './components/common/Navbar';
import DemoBanner from './components/common/DemoBanner';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import CheckNumberPage from './components/check/CheckNumberPage';
import ReportScamPage from './components/report/ReportScamPage';
import AboutPage from './components/about/AboutPage';

function AppContent() {
  const { activeTab } = useScam();

  return (
    <div className="min-h-screen flex flex-col bg-[#050814] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Demo Environment Notice */}
      <DemoBanner />

      {/* Main Cybersecurity Navigation */}
      <Navbar />

      {/* Active Page Route Rendering */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'check' && <CheckNumberPage />}
        {activeTab === 'report' && <ReportScamPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* National Cyber Crime & Helplines Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ScamProvider>
      <AppContent />
    </ScamProvider>
  );
}

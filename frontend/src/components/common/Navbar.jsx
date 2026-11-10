import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Flag, 
  Info, 
  PhoneCall, 
  Menu, 
  X, 
  RotateCcw,
  Sparkles,
  Bot
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function Navbar() {
  const { activeTab, setActiveTab, resetDemoData } = useScam();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'check', label: 'Check Number', icon: Search },
    { id: 'ai', label: 'AI Scanner', icon: Bot },
    { id: 'report', label: 'Report Scam', icon: Flag },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-slate-900 border border-cyan-400/40 glow-cyan-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm pointer-events-none"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  SCAM<span className="text-cyan-400">SHIELD</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-sans hidden sm:block">
                Citizen Cyber Fraud Defense Network
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20 glow-cyan-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            {/* National 1930 Helpline Quick Dial Pill */}
            <a
              href="tel:1930"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-500/30 hover:border-red-400/60 transition-all text-xs text-red-200 group"
              title="Official National Cyber Crime Helpline (India)"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <PhoneCall className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Helpline</div>
                <div className="font-mono font-bold text-red-200">1930</div>
              </div>
            </a>

            {/* Quick Report CTA Button */}
            <button
              onClick={() => handleNavClick('report')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:border-cyan-400 text-xs font-semibold tracking-wide transition-all glow-cyan-sm"
            >
              <Flag className="w-3.5 h-3.5" />
              Report Call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-mono font-bold"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              1930
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('report')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm tracking-wide"
            >
              <Flag className="w-4 h-4" />
              Report Suspicious Number
            </button>
            
            <button
              onClick={() => {
                resetDemoData();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Dataset
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


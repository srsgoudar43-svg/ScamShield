import React, { useState } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  AlertTriangle,
  Lock,
  PhoneForwarded,
  Sparkles
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';
import { DEMO_PRESET_NUMBERS } from '../../data/demoData';

export default function HeroSection() {
  const { checkNumber, searchError, setSearchError } = useScam();
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setSearchError('Please enter a 10-digit Indian phone number.');
      return;
    }
    checkNumber(inputVal, true);
  };

  const handlePresetClick = (presetNum) => {
    setInputVal(presetNum);
    checkNumber(presetNum, true);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Cyber Grid & Glow Orbs */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-60"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Cyber Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide mb-8 shadow-inner glow-cyan-sm">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>INDIAN CYBER FRAUD DEFENSE INITIATIVE</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-sans">TRAI & +91 Compliant</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Neutralize Phone Scams <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Before You Pick Up.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
          Instant algorithmic threat assessment for Indian citizens. Detect fake CBI police calls, 
          deceptive SBI KYC alerts, electricity cutoff threats, and Telegram task scams in seconds.
        </p>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-6">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel-cyan p-2 sm:p-2.5 rounded-2xl shadow-2xl transition-all focus-within:border-cyan-400 focus-within:shadow-cyan-500/20"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              {/* Prefix indicator */}
              <div className="flex items-center pl-3 pr-2 py-2 text-slate-300 font-mono font-semibold text-sm border-b sm:border-b-0 sm:border-r border-slate-700/80">
                <span className="text-cyan-400 mr-2 flex items-center">
                  <PhoneForwarded className="w-4 h-4" />
                </span>
                <span className="tracking-wider">+91</span>
              </div>

              {/* Input field */}
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (searchError) setSearchError('');
                }}
                placeholder="Enter 10-digit number (e.g. 98765 43210)"
                maxLength={14}
                className="flex-1 bg-transparent px-3 py-3 text-white placeholder-slate-500 font-mono text-base sm:text-lg focus:outline-none tracking-wider"
                aria-label="Phone number search input"
              />

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 glow-cyan-sm active:scale-98"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Check Number</span>
                <ArrowRight className="w-4 h-4 text-slate-950 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* Error Message */}
          {searchError && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg py-2 px-3 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Quick Demo Presets */}
        <div className="max-w-2xl mx-auto text-left sm:text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Try Demo Numbers:
            </span>
            {DEMO_PRESET_NUMBERS.map((preset) => (
              <button
                key={preset.number}
                onClick={() => handlePresetClick(preset.number)}
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-slate-300 transition-all font-mono"
              >
                <span className="text-cyan-300 group-hover:underline">{preset.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-sans font-semibold ${
                  preset.badge === 'Critical' 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : preset.badge === 'High'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : preset.badge === 'Suspicious'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {preset.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Community-Driven Threat Grid</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Zero Call Log Ingestion</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Instant Algorithmic Assessment</span>
          </div>
        </div>

      </div>
    </section>
  );
}


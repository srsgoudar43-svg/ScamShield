import React from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function DemoBanner() {
  const { showDemoNotice, setShowDemoNotice } = useScam();

  if (!showDemoNotice) return null;

  return (
    <div className="bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border-b border-cyan-500/20 px-4 py-2 text-xs md:text-sm text-slate-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase">
            Demonstration Mode
          </span>
          <span className="hidden sm:inline text-slate-300">
            All phone numbers, risk scores, and citizen reports displayed are simulated demonstration data for testing & educational awareness.
          </span>
          <span className="sm:hidden text-slate-300">
            Simulated demonstration data for testing & awareness.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="https://cybercrime.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-400 hover:text-cyan-300 underline font-medium text-xs hidden md:inline"
          >
            Official Portal: cybercrime.gov.in (Helpline 1930) &rarr;
          </a>
          <button 
            onClick={() => setShowDemoNotice(false)} 
            className="text-slate-400 hover:text-white p-1 transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}


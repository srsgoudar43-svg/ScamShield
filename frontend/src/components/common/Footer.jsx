import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  PhoneCall, 
  Lock, 
  Globe, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function Footer() {
  const { setActiveTab, resetDemoData } = useScam();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white font-mono tracking-tight">
                SCAM<span className="text-cyan-400">SHIELD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Indian citizens with proactive telephone intelligence, community scam reporting, and cyber fraud threat mitigation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero-tracking contact privacy policy</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('check'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Check Phone Number
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Report Scam Call / SMS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About ScamShield Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Indian Government Cyber Safety Helplines */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              Official Indian Helplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="tel:1930" 
                  className="flex items-center justify-between p-2 rounded-lg bg-red-950/20 border border-red-500/20 hover:border-red-500/40 text-red-300 transition-colors group"
                >
                  <span>National Cyber Crime Helpline</span>
                  <span className="font-mono font-bold text-red-400 group-hover:scale-105 transition-transform">1930</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>National Cyber Crime Reporting Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sancharsaathi.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>Sanchar Saathi (Chakshu Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://trai.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span>TRAI Do Not Disturb (DND)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Demonstration Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Demonstration Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This application is configured in demonstration mode with mock threat data. Results and risk scores are simulated for user testing and awareness.
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demonstration State
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ScamShield. Cybersecurity Demonstration Platform for Indian Citizens.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Threat Grid Simulated Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


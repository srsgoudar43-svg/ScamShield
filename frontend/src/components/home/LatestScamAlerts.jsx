import React from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function LatestScamAlerts() {
  const { alerts, setActiveTab, checkNumber } = useScam();

  const handleAlertAction = (categoryType) => {
    // Navigate to check page with preset or browse
    setActiveTab('check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-950/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-red-400 animate-pulse" />
              <span>National Threat Bulletin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Latest Scam Alerts & Modus Operandi
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Active fraud syndicates targeting Indian mobile phone subscribers this week.
            </p>
          </div>

          <button
            onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono tracking-wide underline"
          >
            <span>View Scam Awareness Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-400 animate-ping"></span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                      {alert.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {alert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {alert.title}
                </h3>

                {/* Cyber Preventive Advice Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-400 block mb-0.5">
                      Citizen Defense Rule:
                    </span>
                    <span>{alert.advice}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                <span className="text-slate-400">Threat Level: <strong className="text-red-400 uppercase font-mono">{alert.severity}</strong></span>
                <button
                  onClick={() => handleAlertAction(alert.category)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Investigate Threat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


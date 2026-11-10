import React from 'react';
import { 
  Search, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Fingerprint,
  Radio,
  Share2
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function HowItWorksSection() {
  const { setActiveTab } = useScam();

  const steps = [
    {
      step: '01',
      title: 'Query Indian Telecom Grid',
      description: 'Enter any 10-digit unknown caller number. ScamShield parses the telecom circle (e.g. Delhi, Maharashtra, Karnataka) and checks against known spam blasts.',
      icon: Search,
      tag: 'Input & Parse'
    },
    {
      step: '02',
      title: 'Algorithmic Threat Scoring',
      description: 'Our heuristic engine evaluates citizen report volume, scam severity category (Digital Arrest, SBI KYC, etc.), financial loss flags, and recency of complaints.',
      icon: Cpu,
      tag: 'Heuristics Engine'
    },
    {
      step: '03',
      title: 'Actionable Intelligence & Action',
      description: 'Review the 0-100 risk score, exact reasons behind the rating, and citizen testimonies. If fraudulent, file a 1-tap community report to protect other citizens.',
      icon: ShieldCheck,
      tag: 'Community Shield'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Cyber Defense Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How ScamShield Protects You in 3 Steps
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Designed to bridge the gap between incoming suspicious phone calls and instant, crowd-sourced scam intelligence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line behind steps (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-8 z-0"></div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="glass-panel p-8 rounded-2xl relative z-10 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-slate-700 group-hover:text-cyan-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon & Details */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all glow-cyan-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>Step {index + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-cyan-950/60 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Received a suspicious call right now?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Run an instant algorithmic check or warn fellow citizens by submitting a community alert.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => { setActiveTab('check'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20"
            >
              Check Number Now
            </button>
            <button
              onClick={() => { setActiveTab('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold tracking-wide transition-all"
            >
              Report a Scam
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


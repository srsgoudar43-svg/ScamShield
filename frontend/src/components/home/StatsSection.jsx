import React from 'react';
import { 
  Database, 
  ShieldAlert, 
  Users, 
  Cpu, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function StatsSection() {
  const { database, stats } = useScam();

  // Dynamic calculations based on current database state
  const totalReportsCount = database.reduce((acc, item) => acc + (item.reportCount || 0), 0);
  const criticalThreats = database.filter(item => item.riskScore >= 75).length;

  const statCards = [
    {
      id: 'cataloged',
      label: 'Fraudulent Numbers Indexed',
      value: `${database.length + 14810}+`,
      subtext: 'Across all 22 Indian telecom circles',
      icon: Database,
      accent: 'cyan',
      glow: 'glow-cyan-sm',
      colorText: 'text-cyan-400'
    },
    {
      id: 'prevented',
      label: 'Financial Loss Prevented',
      value: stats.fraudsPrevented,
      subtext: 'Reported through 1930 & community signals',
      icon: ShieldAlert,
      accent: 'emerald',
      glow: 'glow-emerald',
      colorText: 'text-emerald-400'
    },
    {
      id: 'reports',
      label: 'Citizen Scam Reports Processed',
      value: `${totalReportsCount + 48600}`,
      subtext: 'Peer-verified community threat submissions',
      icon: Users,
      accent: 'blue',
      glow: 'glow-blue',
      colorText: 'text-blue-400'
    },
    {
      id: 'speed',
      label: 'Threat Evaluation Speed',
      value: stats.avgScanTime,
      subtext: 'Real-time heuristic risk calculation',
      icon: Cpu,
      accent: 'purple',
      glow: 'glow-cyan-sm',
      colorText: 'text-indigo-400'
    }
  ];

  return (
    <section className="py-12 border-y border-slate-800/80 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>National Threat Grid Telemetry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Real-time Impact & Demonstration Metrics
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{criticalThreats} High-Priority Syndicates Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${stat.colorText}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Simulated Telemetry
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.subtext}
                </div>

                {/* Subtle gradient accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


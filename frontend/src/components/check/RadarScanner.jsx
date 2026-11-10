import React from 'react';
import { Shield, Radio, Activity } from 'lucide-react';

export default function RadarScanner({ number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Radar Container */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-cyan-500/30 bg-slate-950/80 flex items-center justify-center overflow-hidden glow-cyan">
        
        {/* Concentric rings */}
        <div className="absolute inset-4 rounded-full border border-cyan-500/20"></div>
        <div className="absolute inset-12 rounded-full border border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute inset-24 rounded-full border border-blue-500/30"></div>
        
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-cyan-500/20"></div>
        <div className="absolute h-full w-[1px] bg-cyan-500/20"></div>
        
        {/* Radar sweeping beam */}
        <div 
          className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.4) 0deg, rgba(0, 240, 255, 0) 60deg, transparent 360deg)'
          }}
        ></div>

        {/* Center Target Icon */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-slate-900 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/30 glow-cyan-sm">
          <Shield className="w-8 h-8 animate-pulse text-cyan-400" />
        </div>

        {/* Simulated Blips */}
        <span className="absolute top-12 right-20 w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
        <span className="absolute bottom-16 left-16 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
      </div>

      {/* Status Text */}
      <div className="mt-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Activity className="w-3.5 h-3.5 animate-spin" />
          <span>QUERYING THREAT TELEMETRY: +91 {number}</span>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Evaluating citizen reports • Carrier routing • Scam taxonomy
        </p>
      </div>
    </div>
  );
}


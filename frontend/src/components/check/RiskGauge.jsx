import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Shield } from 'lucide-react';

export default function RiskGauge({ score = 0, levelInfo }) {
  // SVG circular gauge math
  const size = 180;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  let strokeColor = '#10B981'; // emerald
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  let Icon = ShieldCheck;

  if (score >= 80) {
    strokeColor = '#EF4444'; // red
    glowColor = 'rgba(239, 68, 68, 0.5)';
    Icon = ShieldAlert;
  } else if (score >= 50) {
    strokeColor = '#F59E0B'; // amber
    glowColor = 'rgba(245, 158, 11, 0.5)';
    Icon = AlertTriangle;
  } else if (score >= 20) {
    strokeColor = '#06B6D4'; // cyan
    glowColor = 'rgba(6, 182, 212, 0.4)';
    Icon = Shield;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* SVG Circle Gauge */}
        <svg 
          className="w-full h-full transform -rotate-90 drop-shadow-md"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#1E293B"
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 10px ${glowColor})`
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Icon className="w-6 h-6 mb-1" style={{ color: strokeColor }} />
          <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
            {score}
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Risk Index / 100
          </div>
        </div>

      </div>

      {/* Risk Level Badge */}
      <div className="mt-4 text-center">
        <span 
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${levelInfo?.bgColor} ${levelInfo?.textColor} ${levelInfo?.borderColor}`}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: strokeColor }}></span>
          {levelInfo?.level}
        </span>
      </div>
    </div>
  );
}


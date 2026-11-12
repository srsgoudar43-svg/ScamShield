import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Flag, 
  Share2, 
  PhoneForwarded, 
  RotateCcw,
  Clock, 
  MapPin, 
  Radio, 
  DollarSign, 
  Sparkles,
  Info,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Smartphone
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';
import { DEMO_PRESET_NUMBERS } from '../../data/demoData';
import RiskGauge from './RiskGauge';
import RadarScanner from './RadarScanner';
import PoliceDraftModal from './PoliceDraftModal';

export default function CheckNumberPage() {
  const { 
    activeSearchNumber, 
    searchResult, 
    isScanning, 
    searchError, 
    setSearchError, 
    checkNumber, 
    setActiveTab,
    searchHistory 
  } = useScam();

  const [inputNumber, setInputNumber] = useState(activeSearchNumber || '');
  const [copied, setCopied] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // If navigated with activeSearchNumber, check it
  useEffect(() => {
    if (activeSearchNumber && !searchResult && !isScanning) {
      checkNumber(activeSearchNumber, false);
    }
  }, [activeSearchNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputNumber.trim()) {
      setSearchError('Please enter a 10-digit Indian phone number.');
      return;
    }
    checkNumber(inputNumber, false);
  };

  const handlePreset = (num) => {
    setInputNumber(num);
    checkNumber(num, false);
  };

  const handleCopy = () => {
    if (searchResult?.formattedNumber) {
      navigator.clipboard.writeText(
        `ScamShield Warning: Number ${searchResult.formattedNumber} has a Risk Score of ${searchResult.riskScore}/100 (${searchResult.riskLevel}). Category: ${searchResult.categoryName}. Check details on ScamShield India.`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-time Risk Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Check Any Indian Phone Number
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          ScamShield inspects telecom circle routing, cross-references crowd-sourced incident logs, 
          and calculates an algorithmic fraud probability score.
        </p>
      </div>

      {/* Search Bar & Presets Card */}
      <div className="max-w-3xl mx-auto glass-panel p-6 rounded-2xl">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800 focus-within:border-cyan-400 focus-within:shadow-cyan-500/20">
            <div className="flex items-center pl-3 pr-2 py-2 text-slate-300 font-mono font-semibold text-sm border-b sm:border-b-0 sm:border-r border-slate-800">
              <PhoneForwarded className="w-4 h-4 text-cyan-400 mr-2" />
              <span>+91</span>
            </div>
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => {
                setInputNumber(e.target.value);
                if (searchError) setSearchError('');
              }}
              placeholder="Enter 10-digit number (e.g. 98765 43210)"
              maxLength={14}
              className="flex-1 bg-transparent px-3 py-2.5 text-white placeholder-slate-500 font-mono text-base focus:outline-none"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shadow-cyan-500/20 active:scale-98 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{isScanning ? 'Scanning...' : 'Verify Risk'}</span>
            </button>
          </div>

          {searchError && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Quick Click Presets */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Demo Samples:
            </span>
            {DEMO_PRESET_NUMBERS.map((p) => (
              <button
                key={p.number}
                type="button"
                onClick={() => handlePreset(p.number)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${
                  inputNumber === p.number
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Scanning Radar State */}
      {isScanning && <RadarScanner number={inputNumber} />}

      {/* Threat Result Report */}
      {!isScanning && searchResult && (
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Main Intelligence Overview Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-800 space-y-6">
            
            {/* Truecaller Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0087FF] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-blue-500/40">
                  T
                </div>
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
                    <span>Truecaller Live Caller ID</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">National Telecom Circle & Crowd-Sourced Directory</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {searchResult.riskScore >= 75 ? (
                  <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>SPAM / FRAUD DETECTED</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>IDENTIFIED CALLER</span>
                  </span>
                )}
              </div>
            </div>

            {/* Main Caller Profile Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Picture with status ring & badge */}
              <div className="relative shrink-0">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-0.5 border-2 ${
                  searchResult.riskScore >= 75 
                    ? 'border-red-500 shadow-xl shadow-red-500/25 ring-2 ring-red-500/20' 
                    : 'border-cyan-400 shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-500/20'
                } bg-slate-900`}>
                  <img
                    src={searchResult.profilePic}
                    alt={searchResult.callerName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(searchResult.callerName)}&background=0087ff&color=fff&bold=true&size=200`;
                    }}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-slate-900 border border-slate-700 shadow-lg">
                  {searchResult.riskScore >= 75 ? (
                    <span className="text-red-400 text-xs">⚠️</span>
                  ) : (
                    <span className="text-blue-400 text-xs font-bold">✓</span>
                  )}
                </div>
              </div>

              {/* Caller Info & Badges */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {searchResult.callerName}
                  </h2>
                  {searchResult.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-medium self-center sm:self-auto">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      Truecaller Verified
                    </span>
                  )}
                </div>

                <div className="text-xl font-mono font-bold text-cyan-300">
                  {searchResult.formattedNumber}
                </div>

                <div className="text-xs text-slate-400">
                  {searchResult.truecallerTag} • Searched {searchResult.searchCount?.toLocaleString() || '120+'} times in community database
                </div>

                {/* Telecom Badges Grid */}
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 shadow-inner">
                    <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase">SIM Company</div>
                      <div className="font-bold text-white font-mono">{searchResult.carrier} <span className="text-cyan-400 text-[11px]">({searchResult.simType || 'Prepaid SIM'})</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 shadow-inner">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase">Location / Circle</div>
                      <div className="font-bold text-white font-mono">{searchResult.location || searchResult.circle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 shadow-inner">
                    <Radio className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase">Network Type</div>
                      <div className="font-bold text-white font-mono">{searchResult.simNetwork || '4G/5G VoLTE'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDraftModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/70 hover:bg-blue-900/60 border border-blue-500/40 text-xs text-blue-200 transition-colors"
                  title="Generate official cybercrime police complaint narrative"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Police/1930 Draft</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
                  title="Copy warning summary"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied' : 'Share Warning'}</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/50 border border-red-500/40 text-xs font-semibold text-red-300 transition-colors"
              >
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span>Report Activity</span>
              </button>
            </div>
          </div>

            {/* Middle Section: Risk Gauge & Threat Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6 items-center">
              
              {/* Left Column: Risk Gauge */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/40 rounded-xl border border-slate-800/60">
                <RiskGauge 
                  score={searchResult.riskScore} 
                  levelInfo={searchResult.levelInfo} 
                />
              </div>

              {/* Right Column: Threat Category & Specific Reasons */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    Identified Threat Category
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {searchResult.categoryName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Caller Alias / Stated Identity: <strong className="text-slate-200">{searchResult.callerName}</strong>
                  </p>
                </div>

                {/* Reasons behind result */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Algorithmic Factor Breakdown ({searchResult.reasons?.length || 0} signals)</span>
                  </div>
                  <ul className="space-y-2">
                    {searchResult.reasons?.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        {searchResult.riskScore >= 50 ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monetary Loss Flag */}
                {searchResult.monetaryLossReported && (
                  <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 flex items-center gap-2 text-xs text-red-300 font-mono">
                    <DollarSign className="w-4 h-4 text-red-400 shrink-0" />
                    <span>CRITICAL ALERT: Citizens reported direct financial extortion associated with this number.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>Community Reports: <strong className="text-white font-mono">{searchResult.reportCount}</strong></span>
                <span>Threat Status: <strong className="text-cyan-400 font-mono uppercase">{searchResult.riskLevel}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400/90 font-mono text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulated demonstration evaluation</span>
              </div>
            </div>

          </div>

          {/* Community Reports History Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Community Incident Reports</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                    {searchResult.reports?.length || 0} incidents
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Citizen reports submitted for this specific telephone number.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline self-start sm:self-auto"
              >
                + Add Your Incident Experience
              </button>
            </div>

            {searchResult.reports && searchResult.reports.length > 0 ? (
              <div className="space-y-3 pt-2">
                {searchResult.reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {rep.callerClaimed || 'Unknown caller'}
                        </span>
                        {rep.location && (
                          <span className="text-slate-400 flex items-center gap-1 font-mono">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {rep.location}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 font-mono text-slate-400">
                        {rep.lossAmount && rep.lossAmount !== 'None' && (
                          <span className="text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
                            {rep.lossAmount}
                          </span>
                        )}
                        <span>{rep.reportedAt}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      "{rep.description}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs sm:text-sm border border-dashed border-slate-800 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400/60 mx-auto mb-2" />
                <p className="font-semibold text-slate-300">No community incidents reported for this number yet.</p>
                <p className="text-slate-400 mt-1">If you received an unsolicited call from this line, you can file a report to alert others.</p>
              </div>
            )}
          </div>

          {/* Recent Search History Bar */}
          {searchHistory.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Recent Queries:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {searchHistory.slice(0, 5).map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handlePreset(h.number)}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{h.formatted}</span>
                    <span className={`text-[10px] font-bold ${
                      h.riskScore >= 75 ? 'text-red-400' : h.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {h.riskScore}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Empty State when no query has been verified */}
      {!isScanning && !searchResult && (
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Enter a Number to Begin Verification</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Provide an Indian mobile number above (e.g. 98765 43210) to cross-reference telecom carrier routing, community risk index, and cyber police complaint drafts.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}


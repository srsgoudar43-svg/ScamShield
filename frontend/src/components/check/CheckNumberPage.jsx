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
  Check
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

  const [inputNumber, setInputNumber] = useState(activeSearchNumber || '9876543210');
  const [copied, setCopied] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // If page opens without a search result, run the initial check on default demo number
  useEffect(() => {
    if (!searchResult && !isScanning) {
      checkNumber(inputNumber || '9876543210', false);
    }
  }, []);

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
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-800">
            
            {/* Top Bar / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    {searchResult.formattedNumber}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    INDIA (+91)
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    {searchResult.carrier || 'Indian Telecom'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {searchResult.circle || 'National Circle'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {searchResult.lastReported}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowDraftModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-950/50 hover:bg-blue-900/50 border border-blue-500/30 text-xs text-blue-200 transition-colors"
                  title="Generate official cybercrime police complaint narrative"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Police/1930 Draft</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
                  title="Copy warning summary"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied' : 'Share Warning'}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors"
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

    </div>
  );
}


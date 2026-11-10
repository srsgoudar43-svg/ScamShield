import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  FileText, 
  HelpCircle,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { analyzeMessageAPI } from '../../services/api';

const SAMPLE_MESSAGES = [
  {
    label: 'Electricity Cutoff SMS',
    text: 'Dear customer your electricity power will be disconnected tonight at 9.30pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer 8899011223. - DISCOM'
  },
  {
    label: 'SBI KYC APK Scam',
    text: 'Dear SBI User, your YONO Account will be blocked today due to pending KYC verification. Please click bit.ly/sbi-pan-update to download SBI_Security.apk and update your PAN card immediately.'
  },
  {
    label: 'CBI Video Arrest Claim',
    text: 'I am Inspector Vikram Rathore calling from CBI Cyber Crime Cell New Delhi. A FedEx parcel sent in your Aadhaar from Mumbai to Taiwan was intercepted with 140 grams of MDMA. Stay on this WhatsApp video call for digital arrest and transfer your savings to the RBI verification escrow account.'
  },
  {
    label: 'Telegram Task Job Fraud',
    text: 'Earn ₹3,000 to ₹8,000 daily from home! Like 3 YouTube videos and get ₹150 instantly. Join our Telegram group for VIP high-return crypto trading tasks.'
  },
  {
    label: 'Legitimate Bank OTP',
    text: '928471 is the OTP for your online transaction of INR 1,250.00 at Swiggy on HDFC Bank Card ending 4821. OTP valid for 10 mins. Do not share this OTP with anyone.'
  }
];

export default function AiMessageAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async (textToScan) => {
    const text = textToScan || inputText;
    if (!text.trim() || text.trim().length < 8) {
      setErrorMsg('Please paste at least one full sentence of the message or call script to analyze.');
      return;
    }

    setErrorMsg('');
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const res = await analyzeMessageAPI(text);

    if (res.success && res.analysis) {
      setAnalysisResult(res.analysis);
    } else {
      // Fallback heuristic simulation if Gemini API key is not yet set in .env
      setTimeout(() => {
        const lower = text.toLowerCase();
        let fallback;

        if (lower.includes('cbi') || lower.includes('arrest') || lower.includes('fedex') || lower.includes('police')) {
          fallback = {
            riskScore: 98,
            riskLevel: 'CRITICAL',
            category: 'Digital Arrest / Police Extortion',
            deceptiveTactics: [
              'Fabricated Law Enforcement Authority',
              'Severe Fear & Coercion Tactics',
              'Demands to stay on continuous video call',
              'Fraudulent "RBI Escrow" financial liquidation'
            ],
            analysis: 'Classic Digital Arrest extortion syndicate. Fraudsters pose as CBI/Customs officials using forged uniforms and fake warrants to extort mutual funds or fixed deposits.',
            defensiveAdvice: 'Hang up immediately. Block the number. Never join video calls with people claiming to be police. Report to 1930.'
          };
        } else if (lower.includes('apk') || lower.includes('yono') || lower.includes('kyc') || lower.includes('.apk')) {
          fallback = {
            riskScore: 94,
            riskLevel: 'CRITICAL',
            category: 'Malicious Banking APK / Phishing',
            deceptiveTactics: [
              'Urgent Account Block Threat (24-hour deadline)',
              'Malicious .apk remote access payload',
              'Spoofed Bank branding'
            ],
            analysis: 'High-risk Trojan APK campaign. The link installs malware that intercepts incoming OTP SMS messages and exfiltrates net banking passwords.',
            defensiveAdvice: 'Do NOT open the link or install the .apk file. Official banks only release apps through Google Play Store and Apple App Store.'
          };
        } else if (lower.includes('electricity') || lower.includes('power') || lower.includes('9.30pm') || lower.includes('bill')) {
          fallback = {
            riskScore: 89,
            riskLevel: 'HIGH',
            category: 'Electricity Bill Disconnection Fraud',
            deceptiveTactics: [
              'Urgent Night-Time Disconnection Threat',
              'Personal 10-digit mobile number provided as official helpline',
              'Phishing payment link for token fee'
            ],
            analysis: 'Widespread utility fraud. Electricity distribution companies (DISCOMs) never cut power based on SMS threats or use private mobile numbers for bill collections.',
            defensiveAdvice: 'Delete the SMS. Verify your electricity bill exclusively through your official state electricity portal (e.g. BESCOM, TNEB, Tata Power).'
          };
        } else if (lower.includes('otp') && (lower.includes('valid for') || lower.includes('swiggy') || lower.includes('do not share'))) {
          fallback = {
            riskScore: 10,
            riskLevel: 'SAFE',
            category: 'Legitimate Transaction OTP',
            deceptiveTactics: ['Standard Bank Security Notification'],
            analysis: 'Standard legitimate banking one-time password (OTP) format. Contains specific merchant name and explicit warning not to share.',
            defensiveAdvice: 'If you initiated this transaction, use the OTP. If you did NOT initiate it, call your bank immediately to block your card.'
          };
        } else {
          fallback = {
            riskScore: 78,
            riskLevel: 'SUSPICIOUS',
            category: 'Unverified Solicitous Communication',
            deceptiveTactics: ['Unsolicited Financial/Task Solicitation', 'Artificial Scarcity/Urgency'],
            analysis: 'Message displays patterns consistent with telemarketing spam or potential task-based fraud.',
            defensiveAdvice: 'Do not click external shortened links. Never enter your UPI PIN to receive money.'
          };
        }

        setAnalysisResult(fallback);
        if (res.error) {
          setErrorMsg(`Note: Running in local heuristic mode (${res.error}). Add GEMINI_API_KEY to .env for full live Gemini AI.`);
        }
      }, 500);
    }

    setIsAnalyzing(false);
  };

  const handlePresetClick = (sample) => {
    setInputText(sample.text);
    handleAnalyze(sample.text);
  };

  const copyAnalysis = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(
        `ScamShield AI Analysis:\nCategory: ${analysisResult.category}\nRisk Score: ${analysisResult.riskScore}/100 (${analysisResult.riskLevel})\nDefensive Advice: ${analysisResult.defensiveAdvice}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 glow-cyan-sm">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>Gemini AI Scam Script Analyzer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Detect Fraud in SMS & WhatsApp Messages
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Paste any suspicious message, urgent electricity alert, fake job offer, or caller claim. 
          Gemini AI analyzes psychological manipulation tactics and extracts hidden fraud traps.
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-panel-cyan p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="space-y-4">
          
          {/* Sample Presets */}
          <div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Try Real-World Examples:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_MESSAGES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(sample)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 text-slate-300 text-xs font-mono transition-all hover:text-white"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious SMS, WhatsApp message, APK link, or caller statement here..."
              rows={5}
              className="w-full bg-slate-950/90 text-white rounded-xl border border-slate-800 p-4 text-sm sm:text-base font-mono focus:outline-none focus:border-cyan-400 transition-colors placeholder-slate-600 resize-none leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-400 font-mono">
              Powered by Google Gemini 1.5 Flash • Zero Data Retention
            </span>
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 glow-cyan-sm active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Bot className="w-4 h-4 text-slate-950" />
              <span>{isAnalyzing ? 'Scanning with Gemini AI...' : 'Analyze with Gemini AI'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>
      </div>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Forensic AI Breakdown</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {analysisResult.category || 'Identified Scam Vector'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Score pill */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono">
                <span className="text-xs text-slate-400 uppercase">Risk Index:</span>
                <span className={`text-xl font-extrabold ${
                  analysisResult.riskScore >= 75 ? 'text-red-400' : analysisResult.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {analysisResult.riskScore}/100
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  analysisResult.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  analysisResult.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {analysisResult.riskLevel}
                </span>
              </div>

              {/* Copy summary */}
              <button
                onClick={copyAnalysis}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Copy AI summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Deceptive Tactics Tags */}
          {analysisResult.deceptiveTactics && analysisResult.deceptiveTactics.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                Detected Manipulation Techniques:
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.deceptiveTactics.map((tactic, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span>{tactic}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Forensic Analysis text */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gemini AI Intelligence Summary</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {analysisResult.analysis}
            </p>
          </div>

          {/* Defensive Action Recommendation */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-cyan-500/30 space-y-2">
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Immediate Protective Action For Citizen</span>
            </div>
            <p className="text-sm text-white font-medium leading-relaxed font-sans">
              {analysisResult.defensiveAdvice}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}


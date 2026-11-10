import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  Users, 
  Cpu, 
  EyeOff, 
  ExternalLink, 
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Radio,
  FileCheck2
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function AboutPage() {
  const { setActiveTab } = useScam();

  const architecturalPillars = [
    {
      title: 'Algorithmic Heuristics',
      description: 'Dynamic scoring balancing incident volume, category severity, recency decay, and telecom circle anomaly markers.',
      icon: Cpu,
      tag: 'Scoring Engine'
    },
    {
      title: 'Decentralized Citizen Intel',
      description: 'Crowdsourced reports with caller script transcripts and impersonation metadata to flag new fraud syndicates in minutes.',
      icon: Users,
      tag: 'Community Grid'
    },
    {
      title: 'Strict Privacy Sandbox',
      description: 'No contact book uploads, no address book scraping, and no intrusive device background permissions.',
      icon: EyeOff,
      tag: 'Zero-Harvesting'
    }
  ];

  const redFlags = [
    {
      rule: 'Demands to stay on video call (Digital Arrest)',
      explanation: 'Indian police, CBI, Customs, and court judges never conduct arrests, custody hearings, or bail payments over WhatsApp or Skype video calls.'
    },
    {
      rule: 'Urgent Electricity Bill Disconnection at 9:30 PM',
      explanation: 'Power DISCOMs never use personal 10-digit mobile numbers for bill reminders or cut power based on SMS threats.'
    },
    {
      rule: 'Downloading .apk files via WhatsApp or Telegram',
      explanation: 'Official banks (SBI, HDFC, ICICI, etc.) never distribute applications via messaging apps. APKs grant total device remote access.'
    },
    {
      rule: 'Entering UPI PIN to "receive" cashback or lottery prize',
      explanation: 'In the Indian UPI architecture, entering your UPI PIN is ONLY ever required to SEND money, NEVER to receive funds.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Mission & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          About ScamShield India
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          A proactive cyber defense project engineered to protect Indian smartphone users from organized telephone fraud rings, digital arrest extortions, and financial phishing.
        </p>
      </div>

      {/* Mission Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          Project Mission & Purpose
        </h2>
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            India is experiencing an unprecedented surge in sophisticated telephone fraud syndicates. Cybercriminals exploit psychological manipulation—impersonating law enforcement officers threatening "digital arrest", posing as electricity board managers threatening instant blackout, or offering fake work-from-home tasks.
          </p>
          <p>
            Traditional caller identification services frequently depend on invasive contact book harvesting or delay tagging until thousands have been victimized. <strong>ScamShield</strong> was conceptualized to provide transparent, explainable risk assessment powered by citizen-contributed incident metadata without invading private contact lists.
          </p>
        </div>
      </div>

      {/* How ScamShield Works */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            How ScamShield Works Under the Hood
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Three core pillars powering our telephone fraud assessment system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architecturalPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-slate-800 relative hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Information */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 space-y-4">
        <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>Strict Privacy Framework</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Data Minimization & User Privacy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Zero Contact Book Harvesting</span>
            </div>
            <p className="text-slate-400 text-xs">
              ScamShield will never ask for your address book. We do not correlate your friends' or family's names to phone numbers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Anonymous Community Submissions</span>
            </div>
            <p className="text-slate-400 text-xs">
              When you report a scammer, your personal identifier or device IP is not published or attached to the public report transcript.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>No Location Tracking</span>
            </div>
            <p className="text-slate-400 text-xs">
              Telecom circles are inferred purely from public TRAI national numbering plan prefix allocations, never device GPS.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Right to Retraction</span>
            </div>
            <p className="text-slate-400 text-xs">
              Subscribers who believe their legitimate business line has been falsely reported can request verification review.
            </p>
          </div>
        </div>
      </div>

      {/* Red Flags Quick Checklist */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Universal Scam Red Flags (Indian Context)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Memorize these four golden indicators to instantly recognize active fraud calls:
        </p>

        <div className="space-y-3 pt-2">
          {redFlags.map((rf, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm space-y-1">
              <div className="font-bold text-red-300 flex items-center gap-2">
                <span className="font-mono text-red-400">0{idx + 1}.</span>
                <span>{rf.rule}</span>
              </div>
              <p className="text-slate-300 leading-relaxed pl-6">
                {rf.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* National Cyber Helpline 1930 Information */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-red-950/40 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Golden Hour Financial Fraud Protection</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Lost Money to a Phone Scam? Dial 1930
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            The Indian Ministry of Home Affairs operates the Citizen Financial Cyber Fraud Reporting System. If reported within 2 to 3 hours, banks can place a lien hold to freeze defrauded amounts.
          </p>
        </div>
        <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
          <a
            href="tel:1930"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-base transition-all shadow-lg shadow-red-500/25 glow-red"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1930 Now</span>
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Clear Demonstration Data Notice */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-center font-mono">
        ScamShield Demonstration Sandbox • All threat records and scores shown are simulated test data.
      </div>

    </div>
  );
}


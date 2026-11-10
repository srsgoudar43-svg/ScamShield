import React, { useState } from 'react';
import { 
  Flag, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneForwarded, 
  ArrowRight, 
  HelpCircle,
  Building,
  DollarSign,
  FileText,
  Sparkles
} from 'lucide-react';
import { useScam } from '../../context/ScamContext';

export default function ReportScamPage() {
  const { categories, submitReport, checkNumber, setActiveTab } = useScam();

  // Form states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'digital_arrest');
  const [callerClaimed, setCallerClaimed] = useState('');
  const [lossIncurred, setLossIncurred] = useState(false);
  const [lossAmount, setLossAmount] = useState('');
  const [description, setDescription] = useState('');

  const [formError, setFormError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!phoneNumber.trim()) {
      setFormError('Please enter the 10-digit phone number of the suspected scammer.');
      return;
    }

    if (!description.trim() || description.length < 15) {
      setFormError('Please describe the interaction (at least 15 characters) to assist fellow citizens.');
      return;
    }

    const res = submitReport({
      phoneNumber,
      categoryId,
      callerClaimed,
      description,
      lossIncurred,
      lossAmount: lossIncurred ? lossAmount : ''
    });

    if (!res.success) {
      setFormError(res.error);
      return;
    }

    setSubmittedData(res);
  };

  const handleViewThreat = () => {
    if (submittedData?.digits) {
      checkNumber(submittedData.digits, true);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setPhoneNumber('');
    setCallerClaimed('');
    setDescription('');
    setLossIncurred(false);
    setLossAmount('');
    setFormError('');
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 uppercase tracking-wider mb-3">
          <Flag className="w-3.5 h-3.5 text-red-400" />
          <span>Crowdsourced Scam Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Report a Fraudulent Phone Call
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Your report immediately alerts other Indian citizens searching this number and updates the national risk telemetry.
        </p>
      </div>

      {/* Success View */}
      {submittedData ? (
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-emerald-500/40 text-center space-y-6 glow-emerald">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Incident Report Registered
            </h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Thank you for protecting fellow citizens. Number <strong className="text-white font-mono">{submittedData.formatted}</strong> has been tagged in the ScamShield threat grid.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-400 text-left space-y-1">
            <div className="text-cyan-400 font-mono font-semibold">Immediate System Action:</div>
            <div>• Algorithmic risk score recalculated with elevated priority.</div>
            <div>• Added to community incident records & recent threat feed.</div>
            <div>• Ready for inspection by any citizen searching this number.</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleViewThreat}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>View Updated Number Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              Report Another Number
            </button>
          </div>
        </div>
      ) : (
        /* Report Form Card */
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Banner */}
            {formError && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            {/* Row 1: Phone Number & Caller Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Number Field */}
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Suspicious Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 focus-within:border-cyan-400 transition-colors">
                  <div className="flex items-center pl-3 pr-2 py-3 text-slate-400 font-mono text-sm border-r border-slate-800">
                    <PhoneForwarded className="w-4 h-4 text-cyan-400 mr-1.5" />
                    <span>+91</span>
                  </div>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={14}
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-slate-600 font-mono text-sm focus:outline-none"
                    required
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Enter 10-digit Indian mobile or landline without leading 0.
                </p>
              </div>

              {/* Impersonated Identity */}
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Claimed Caller Name / Org (Optional)
                </label>
                <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 focus-within:border-cyan-400 transition-colors">
                  <div className="pl-3 text-slate-400">
                    <Building className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={callerClaimed}
                    onChange={(e) => setCallerClaimed(e.target.value)}
                    placeholder="e.g. CBI Officer / SBI Yono Support / FedEx"
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-slate-600 text-sm focus:outline-none"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  What organization did the caller falsely claim to represent?
                </p>
              </div>

            </div>

            {/* Row 2: Scam Category Dropdown */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Scam Category <span className="text-red-400">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-950/90 text-white rounded-xl border border-slate-800 px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-slate-900 py-2">
                    {cat.name} ({cat.severity.toUpperCase()})
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Categorizing ensures appropriate threat scoring and awareness matching.
              </p>
            </div>

            {/* Row 3: Financial Loss Toggle */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    Did any financial loss occur?
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Flagging monetary loss immediately elevates the number's threat index.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLossIncurred(!lossIncurred)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    lossIncurred ? 'bg-red-500' : 'bg-slate-800'
                  }`}
                  aria-pressed={lossIncurred}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      lossIncurred ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {lossIncurred && (
                <div className="pt-2">
                  <label className="block text-[11px] font-mono text-red-300 mb-1">
                    Approximate Loss Amount (Optional, for statistical tracking)
                  </label>
                  <div className="flex items-center bg-slate-900 rounded-lg border border-red-500/30 px-3 py-2">
                    <span className="text-slate-400 text-xs font-mono mr-2">₹</span>
                    <input
                      type="text"
                      value={lossAmount}
                      onChange={(e) => setLossAmount(e.target.value)}
                      placeholder="e.g. 25,000"
                      className="bg-transparent text-white text-xs w-full focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Row 4: Detailed Description */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Incident Description & Modus Operandi <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the caller said, any links or APKs sent, WhatsApp threats, OTP requests, or fake police accusations..."
                rows={4}
                className="w-full bg-slate-950/80 text-white rounded-xl border border-slate-800 px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder-slate-600 resize-none leading-relaxed"
                required
              />
              <div className="flex items-center justify-between mt-1.5 text-[11px] text-slate-400">
                <span>Minimum 15 characters required.</span>
                <span className="font-mono">{description.length} characters</span>
              </div>
            </div>

            {/* Official 1930 Notice Box */}
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-2.5 text-xs text-blue-200">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong>Important Legal Note:</strong> ScamShield is a citizen community platform. If you have been defrauded of money within the last 24 hours, immediately call the <strong>National Cyber Helpline at 1930</strong> or register at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">cybercrime.gov.in</a> to trigger the banking golden-hour lien freeze.
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-500/25 glow-red active:scale-98 flex items-center justify-center gap-2"
              >
                <Flag className="w-4 h-4 text-white" />
                <span>Submit Scam Report to Network</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}


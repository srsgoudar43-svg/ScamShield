import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  PhoneCall, 
  ShieldAlert,
  AlertOctagon
} from 'lucide-react';

export default function PoliceDraftModal({ isOpen, onClose, record }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !record) return null;

  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  const complaintText = `FORMAL INCIDENT NARRATIVE DRAFT FOR NATIONAL CYBER CRIME REPORTING PORTAL
=============================================================================
Incident Submission Date: ${now}
Target Entity: National Cyber Crime Portal (cybercrime.gov.in) / Citizen Helpline 1930

1. SUSPECT TELECOMMUNICATION DETAILS
- Suspect Telephone Number: ${record.formattedNumber || '+91 ' + record.phoneNumber}
- Inferred Telecom Operator: ${record.carrier || 'Indian Mobile Network'}
- Telecom Circle / State: ${record.circle || 'National'}
- Impersonation Alias / Claimed Identity: ${record.callerName || 'Unknown Caller'}

2. FRAUD CLASSIFICATION & THREAT TELEMETRY
- Modus Operandi Classification: ${record.categoryName}
- ScamShield Algorithmic Risk Index: ${record.riskScore}/100 (${record.riskLevel})
- Financial Extortion Status: ${record.monetaryLossReported ? 'MONETARY LOSS RECORDED' : 'Attempted Phishing / Financial Extortion'}

3. SUMMARY OF DECEPTIVE TACTICS & EVIDENCE
${record.reasons && record.reasons.length > 0 
  ? record.reasons.map((r, i) => `${i + 1}. ${r}`).join('\n') 
  : '1. Suspect initiated unsolicited communication attempting unauthorized financial transactions.'}

${record.reports && record.reports.length > 0 
  ? `Citizen Testimony On Record:\n"${record.reports[0].description}"` 
  : ''}

4. LEGAL PROVISIONS APPLICABLE
- Section 66D of the Information Technology (IT) Act, 2000 (Punishment for cheating by personation by using computer resource).
- Bharatiya Nyaya Sanhita (BNS), 2023 - Section 318(4) (Cheating and dishonestly inducing delivery of property).
- Section 43 of the IT Act (Penalty and compensation for damage to computer systems/data theft).

5. ACTION REQUESTED FROM LAW ENFORCEMENT
Kindly request Call Detail Records (CDR) and IP Detail Records (IPDR) from the concerned telecom service provider for telephone number ${record.formattedNumber}, freeze associated beneficiary UPI handles/mule bank accounts under Golden Hour lien protocols, and initiate legal proceedings against the operating syndicate.
=============================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(complaintText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyan-500/30 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Cybercrime Police Complaint Draft</span>
              </h3>
              <p className="text-xs text-slate-400">
                Pre-formatted incident report for <strong>cybercrime.gov.in</strong> or local police FIR.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="my-4 flex-1 overflow-y-auto pr-1">
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
            {complaintText}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1 font-mono font-medium"
            >
              <span>Go to cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="tel:1930"
              className="text-red-400 hover:text-red-300 underline flex items-center gap-1 font-mono font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helpline 1930</span>
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Full Draft'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


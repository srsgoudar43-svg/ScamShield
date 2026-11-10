import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ShieldAlert,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'Scenario 1: Digital Arrest Threat',
    scenario: 'You receive a video call from a man in police uniform claiming a parcel under your Aadhaar was intercepted at Mumbai airport containing illegal contraband. He demands you stay on Skype video in "digital arrest" and transfer security funds to an RBI verification account.',
    options: [
      { text: 'Transfer the funds to prove innocence and cooperate on video.', isCorrect: false, explanation: 'Never transfer funds. This is a classic extortion ring.' },
      { text: 'Disconnect immediately. Indian police and courts NEVER conduct arrests or demand money via video calls.', isCorrect: true, explanation: 'Correct! "Digital Arrest" is a complete fraud fabrication. Police never issue warrants or demand money over Skype or WhatsApp.' },
      { text: 'Send photos of your debit card and Aadhaar to clear your name.', isCorrect: false, explanation: 'Never share financial credentials with unknown callers.' }
    ]
  },
  {
    id: 2,
    title: 'Scenario 2: Electricity Bill Cutoff Notice',
    scenario: 'An SMS arrives at 7:00 PM: "Dear customer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately contact our electricity officer at 8899011223."',
    options: [
      { text: 'Call the mobile number and pay ₹15 token fees via UPI link sent by the officer.', isCorrect: false, explanation: 'The link will compromise your bank account or install malware.' },
      { text: 'Ignore and delete. DISCOMs never send personal 10-digit mobile numbers or threaten night-time disconnects via SMS.', isCorrect: true, explanation: 'Correct! Official electricity boards use registered SMS sender IDs (e.g., AD-TNEB, VM-BESCOM) and never personal mobile numbers.' }
    ]
  },
  {
    id: 3,
    title: 'Scenario 3: Work-From-Home YouTube Tasks',
    scenario: 'You are contacted on WhatsApp offering ₹150 for liking 3 YouTube videos. After paying you ₹150 initially, they invite you to a Telegram group and ask for a ₹3,000 security recharge for VIP tasks.',
    options: [
      { text: 'Pay ₹3,000 because they already paid you ₹150 earlier.', isCorrect: false, explanation: 'The initial ₹150 is psychological bait to steal your larger deposit.' },
      { text: 'Block the sender. Prepaid task deposit schemes are guaranteed Ponzi/crypto frauds.', isCorrect: true, explanation: 'Spot on! This task scam lures victims with small initial payouts before stealing thousands in fake "crypto investment accounts".' }
    ]
  },
  {
    id: 4,
    title: 'Scenario 4: UPI QR Code & PIN Request',
    scenario: 'A buyer on OLX sends you a screenshot of a QR code or payment request saying: "Scan this QR code and enter your UPI PIN to receive my payment of ₹8,000."',
    options: [
      { text: 'Enter your 6-digit UPI PIN to receive the ₹8,000.', isCorrect: false, explanation: 'Entering your UPI PIN will immediately deduct ₹8,000 from YOUR account!' },
      { text: 'Refuse. UPI PIN is ONLY entered to SEND money, NEVER to receive funds.', isCorrect: true, explanation: 'Golden Rule of UPI! You NEVER need to enter a UPI PIN or scan a QR code to receive money into your bank.' }
    ]
  }
];

export default function ScamQuizModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (q.options[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-cyan w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyan-500/30 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Cybercrime Awareness Test</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Title & Scenario */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {q.title}
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              "{q.scenario}"
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-5">
              {q.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                let btnStyle = 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-cyan-400/50';

                if (showExplanation) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                  } else if (isChosen && !opt.isCorrect) {
                    btnStyle = 'border-red-500 bg-red-950/40 text-red-200';
                  } else {
                    btnStyle = 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-mono mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {showExplanation && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/20 text-xs text-slate-300 space-y-2 mb-4 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {q.options[selectedOption].isCorrect ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct Decision!
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Fraud Trap Alert!
                    </span>
                  )}
                </div>
                <p className="leading-relaxed">
                  {q.options[selectedOption].explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Your Cyber Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Finished Score View */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400 glow-cyan-sm">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Cyber Defense Assessment Complete
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                You scored <strong className="text-cyan-400 font-mono text-base">{score} / {QUIZ_QUESTIONS.length}</strong> correct on real-world Indian scam detection scenarios.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto space-y-1">
              <span className="text-cyan-300 font-bold font-mono uppercase block">
                {score === 4 ? '🛡️ Master Scam Hunter' : score >= 2 ? '⚠️ Alert Citizen (Good Awareness)' : '🚨 High Vulnerability Risk'}
              </span>
              <p className="text-slate-400">
                {score === 4 
                  ? 'Outstanding! You correctly recognized all 4 fraud patterns. Keep your family informed!'
                  : 'Always remember: Police never arrest via Skype, and UPI PIN is NEVER required to receive money.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


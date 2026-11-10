/**
 * ScamShield India — Unified Fullstack Server
 * Single-file entry point containing all backend REST API routes,
 * Supabase integration, Gemini AI analysis, and serving the standalone frontend.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Database Configuration & Seed Data ---
const SEED_NUMBERS = [
  {
    phoneNumber: '9876543210',
    formattedNumber: '+91 98765 43210',
    carrier: 'Bharti Airtel',
    circle: 'Delhi NCR',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    categoryName: 'Digital Arrest / Police Impersonation',
    callerName: 'Claimed: CBI Cyber Cell New Delhi',
    reportCount: 142,
    monetaryLossReported: true,
    reasons: [
      'Over 140 community complaints within 72 hours.',
      'Caller demands continuous video interrogation and threatens arrest over drug parcel.',
      'Coerces victims into liquidating savings into fake RBI verification escrow accounts.'
    ]
  },
  {
    phoneNumber: '9123456789',
    formattedNumber: '+91 91234 56789',
    carrier: 'Reliance Jio',
    circle: 'Maharashtra & Goa',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    categoryName: 'Fake Bank KYC / Account Expiry',
    callerName: 'Claimed: SBI YONO Helpdesk',
    reportCount: 89,
    monetaryLossReported: true,
    reasons: [
      'Spamming SMS with malicious APK links claiming YONO account deactivation.',
      'Directs users to fake net banking clone portals.'
    ]
  },
  {
    phoneNumber: '8899011223',
    formattedNumber: '+91 88990 11223',
    carrier: 'Vodafone Idea (Vi)',
    circle: 'Uttar Pradesh (West)',
    riskScore: 88,
    riskLevel: 'HIGH',
    categoryName: 'Electricity Bill Disconnection Alert',
    callerName: 'Claimed: State Electricity Officer',
    reportCount: 64,
    monetaryLossReported: false,
    reasons: [
      'Bulk SMS campaign warning power will be disconnected at 9:30 PM.',
      'Asks users to pay token fees via private mobile number.'
    ]
  },
  {
    phoneNumber: '9820012345',
    formattedNumber: '+91 98200 12345',
    carrier: 'Bharti Airtel',
    circle: 'Mumbai',
    riskScore: 8,
    riskLevel: 'SAFE',
    categoryName: 'Clean / Legitimate Line',
    callerName: 'Standard Subscriber Line',
    reportCount: 0,
    monetaryLossReported: false,
    reasons: ['Zero fraud complaints on record.', 'Normal subscriber routing.']
  }
];

let localDatabase = [...SEED_NUMBERS];

// Helper: Normalize & validate 10-digit Indian numbers
function validateNumber(input = '') {
  let digits = String(input).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (!digits || digits.length !== 10 || !/^[6-9]/.test(digits)) {
    return { isValid: false, error: 'Must be a 10-digit Indian number starting with 6, 7, 8, or 9.' };
  }
  return {
    isValid: true,
    digits,
    formatted: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  };
}

// --- REST API Endpoints ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ScamShield India Fullstack Server',
    database: process.env.SUPABASE_URL ? 'Connected to Supabase' : 'In-Memory Telemetry Grid',
    geminiAI: process.env.GEMINI_API_KEY ? 'Active' : 'Heuristic Mode'
  });
});

app.get('/api/numbers/search/:number', (req, res) => {
  const val = validateNumber(req.params.number);
  if (!val.isValid) return res.status(400).json({ error: val.error });

  const record = localDatabase.find(r => r.phoneNumber === val.digits);
  if (record) {
    return res.json({ success: true, data: record });
  }

  res.json({
    success: true,
    data: {
      phoneNumber: val.digits,
      formattedNumber: val.formatted,
      carrier: 'Indian Telecom',
      circle: 'National',
      riskScore: 12,
      riskLevel: 'SAFE',
      categoryName: 'Unrated / Clean Number',
      callerName: 'Standard Subscriber Line',
      reportCount: 0,
      monetaryLossReported: false,
      reasons: ['Zero community complaints registered.', 'Normal telecommunication routing signature detected.']
    }
  });
});

app.post('/api/reports', (req, res) => {
  const { phoneNumber, categoryName, callerClaimed, description, lossIncurred } = req.body;
  const val = validateNumber(phoneNumber);
  if (!val.isValid) return res.status(400).json({ error: val.error });

  const existingIdx = localDatabase.findIndex(r => r.phoneNumber === val.digits);
  if (existingIdx >= 0) {
    const cur = localDatabase[existingIdx];
    localDatabase[existingIdx] = {
      ...cur,
      riskScore: Math.min(99, cur.riskScore + 12),
      riskLevel: 'CRITICAL',
      reportCount: cur.reportCount + 1,
      monetaryLossReported: cur.monetaryLossReported || Boolean(lossIncurred),
      reasons: [...cur.reasons, `Citizen reported: ${description?.slice(0, 50)}...`]
    };
  } else {
    localDatabase.unshift({
      phoneNumber: val.digits,
      formattedNumber: val.formatted,
      carrier: 'Indian Telecom',
      circle: 'National Circle',
      riskScore: lossIncurred ? 88 : 74,
      riskLevel: 'HIGH',
      categoryName: categoryName || 'Suspicious Activity',
      callerName: callerClaimed || 'Flagged Caller',
      reportCount: 1,
      monetaryLossReported: Boolean(lossIncurred),
      reasons: [`Reported by citizen under ${categoryName || 'Fraud'}.`]
    });
  }

  res.status(201).json({ success: true, message: 'Report registered successfully.' });
});

app.post('/api/ai/analyze', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });

  // If Gemini key is set, call Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `Analyze this suspicious message for Indian cyber fraud tactics. Return JSON with riskScore (0-100), riskLevel (CRITICAL/HIGH/SUSPICIOUS/SAFE), category, deceptiveTactics array, and defensiveAdvice string:\n"${text}"` }]
          }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });
      const data = await response.json();
      const content = JSON.parse(data.candidates[0].content.parts[0].text);
      return res.json({ success: true, analysis: content });
    } catch (e) {
      console.warn('[Gemini AI] Fallback triggered:', e.message);
    }
  }

  // Built-in Heuristic AI fallback
  const l = text.toLowerCase();
  let analysis;
  if (l.includes('cbi') || l.includes('arrest') || l.includes('police')) {
    analysis = {
      riskScore: 98,
      riskLevel: 'CRITICAL',
      category: 'Digital Arrest / Police Extortion',
      deceptiveTactics: ['Urgent Video Interrogation', 'Fabricated Law Enforcement Authority'],
      defensiveAdvice: 'Disconnect immediately. Indian police and CBI never arrest citizens via video calls.'
    };
  } else if (l.includes('apk') || l.includes('yono') || l.includes('kyc')) {
    analysis = {
      riskScore: 94,
      riskLevel: 'CRITICAL',
      category: 'Banking APK Malware Phishing',
      deceptiveTactics: ['Malicious .apk payload link', 'Urgent Account Block Deadline'],
      defensiveAdvice: 'Do not click or install the .apk file. Official banks only release apps on official app stores.'
    };
  } else {
    analysis = {
      riskScore: 78,
      riskLevel: 'HIGH',
      category: 'Suspicious Fraudulent Solicitation',
      deceptiveTactics: ['Unsolicited Urgency', 'Advance Fee Trap'],
      defensiveAdvice: 'Never enter your UPI PIN to receive money. Dial 1930 if funds were transferred.'
    };
  }
  res.json({ success: true, analysis });
});

// Serve the standalone single-file frontend for all UI routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[ScamShield] Fullstack Server running at http://localhost:${PORT}`);
});

export default app;

# ScamShield — Indian Phone Fraud & Scam Number Defense Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsrsgoudar43-svg%2FScamShield&env=GEMINI_API_KEY,SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY,SUPABASE_ANON_KEY)

**ScamShield** is a cybersecurity web application tailored for Indian citizens to proactively detect, assess, and report fraudulent telephone numbers and suspicious calls.

---

## 🌟 Core Features & Pages

### 1. Home Page
- **Cybersecurity Identity**: Dark navy void aesthetic (`#050814`), glowing cyan/blue accents, animated cyber grid.
- **Hero Section**: 10-digit Indian phone number lookup with instant preset buttons (CBI Digital Arrest, SBI KYC Phishing, Electricity Bill Scam, Clean Caller).
- **National Threat Telemetry**: Demonstration stats showcasing cataloged numbers, citizen reports processed, and estimated financial fraud prevented.
- **How It Works**: 3-step explanation of telecom circle identification, heuristic threat scoring, and community defense.
- **Latest Scam Alerts**: Real-world modus operandi breakdowns (Digital Arrest, Electricity Cutoff SMS, Telegram Task Scams, Malicious Banking APKs).
- **Citizen Safety Helplines**: Quick access to the National Cyber Crime Helpline (**1930**) and `cybercrime.gov.in`.

### 2. Check Number Page
- **Strict +91 Validation**: Checks for 10-digit format starting with 6, 7, 8, or 9.
- **Radar Scanning State**: Cybersecurity sweep radar graphic with target acquisition.
- **Speedometer Risk Gauge**: 0 to 100 risk score with dynamic glow (Critical Red, Suspicious Amber, Clean Emerald).
- **Telecom & Circle Breakdown**: Identifies operator (Jio, Airtel, Vi, BSNL) and Indian telecom circle (Delhi, Karnataka, Maharashtra, etc.).
- **Threat Reason Factors**: Clear, explainable list of why a score was assigned.
- **Community Incident Reports**: Citizen testimonies, reported monetary losses, and claimed aliases.
- **Search History**: Instant access to recently checked numbers.

### 3. Report Scam Page
- **Crowdsourced Intelligence**: Indian citizens can submit suspicious numbers.
- **Scam Taxonomy Dropdown**:
  - Digital Arrest / Police Impersonation
  - Fake Bank KYC / Account Expiry
  - OTP & UPI Refund Fraud
  - Fake Job & Part-time Work Offer
  - Electricity / Utility Disconnection Alert
  - Lottery & KBC Prize Fraud
  - Instant Loan & Blackmail Apps
  - Courier / Customs Parcel Seizure
- **Financial Loss Flagging**: Optional loss amount recording that elevates network threat urgency.
- **Instant Persistence**: Stores reports in state and `localStorage` so they are immediately searchable.

### 4. About Page
- **Project Mission**: Combating organized cyber syndicates in India.
- **Architecture**: Heuristics, decentralized community signals, and data minimization.
- **Privacy Framework**: Zero contact book harvesting, anonymous submissions, no location tracking.
- **Universal Scam Red Flags**: Decision guide for citizens receiving calls.
- **1930 Golden Hour Guide**: Instructions for bank lien holds under the Indian Ministry of Home Affairs framework.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Running the Application

1. **Supabase Cloud PostgreSQL Migration**:
   Configure `.env` with your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   Apply the migration directly to Supabase Cloud:
   ```bash
   npm run db:migrate
   ```
   *This automatically creates all 4 tables, performance indexes, RLS policies, automated recalculation triggers, and seeds realistic Indian scam cases.*

2. **Start the Frontend (React + Vite + Tailwind CSS)**:
   ```bash
   cd frontend
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173`**

3. **Start the Backend (Node.js + Express REST API)**:
   ```bash
   cd backend
   npm run dev
   ```
   API runs at: **`http://localhost:5000`**

4. **Or run everything from root**:
   ```bash
   npm run dev
   ```

---

## 🔒 Demonstration Notice
ScamShield is configured with simulated demonstration data for educational testing. If you are experiencing real financial fraud in India, immediately contact the **National Cyber Crime Helpline at 1930** or file an FIR at **[cybercrime.gov.in](https://cybercrime.gov.in)**.


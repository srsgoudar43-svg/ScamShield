// Backend Seed Data for ScamShield India

export const SEED_CATEGORIES = [
  { id: 'digital_arrest', name: 'Digital Arrest / Police Impersonation', severity: 'critical' },
  { id: 'bank_kyc', name: 'Fake Bank KYC / Account Expiry', severity: 'critical' },
  { id: 'otp_upi', name: 'OTP & UPI Refund / Request Fraud', severity: 'high' },
  { id: 'fake_job', name: 'Fake Job & Part-Time Task Scam', severity: 'high' },
  { id: 'electricity_bill', name: 'Electricity / Utility Disconnection Alert', severity: 'high' },
  { id: 'lottery_gift', name: 'Lottery, Gift & KBC Prize Fraud', severity: 'medium' },
  { id: 'loan_app', name: 'Instant Loan & Blackmail Apps', severity: 'critical' },
  { id: 'courier_customs', name: 'FedEx / DHL Customs Seizure Fraud', severity: 'high' }
];

export const INITIAL_NUMBERS = [
  {
    id: 'scam-001',
    phoneNumber: '9876543210',
    formattedNumber: '+91 98765 43210',
    carrier: 'Bharti Airtel',
    circle: 'Delhi NCR',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    category: 'digital_arrest',
    categoryName: 'Digital Arrest / Police Impersonation',
    callerName: 'Claimed: CBI Cyber Cell New Delhi',
    reportCount: 142,
    monetaryLossReported: true,
    lastReported: '14 minutes ago',
    reasons: [
      'Over 140 community complaints within 72 hours.',
      'Caller uses threats of "immediate arrest warrant" and demands Skype video interrogation.',
      'Associated with fake courier seizure threats (FedEx parcel containing narcotics).',
      'Requests victims to liquidate mutual funds into "RBI verification escrow accounts".'
    ],
    reports: [
      {
        id: 'rep-1',
        reportedAt: '14 minutes ago',
        callerClaimed: 'Inspector Vikram Rathore (CBI)',
        location: 'New Delhi',
        lossAmount: 'Attempted ₹3.5 Lakhs (Blocked)',
        description: 'Received a video call on WhatsApp. Man in police uniform claimed a parcel under my Aadhaar was caught at Mumbai airport with drugs. Demanded I stay on video and transfer money to verify.'
      }
    ]
  },
  {
    id: 'scam-002',
    phoneNumber: '9123456789',
    formattedNumber: '+91 91234 56789',
    carrier: 'Reliance Jio',
    circle: 'Maharashtra & Goa',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    category: 'bank_kyc',
    categoryName: 'Fake Bank KYC / Account Expiry',
    callerName: 'Claimed: SBI YONO Head Office Helpdesk',
    reportCount: 89,
    monetaryLossReported: true,
    lastReported: '42 minutes ago',
    reasons: [
      'Sending spoofed SMS with malicious .apk file download links.',
      'Falsely claims debit card or net banking will be deactivated within 24 hours.'
    ],
    reports: [
      {
        id: 'rep-4',
        reportedAt: '42 minutes ago',
        callerClaimed: 'SBI NetBanking Support',
        location: 'Mumbai',
        lossAmount: '₹84,000 lost',
        description: 'Got an SMS saying "Dear SBI user, your YONO account is locked. Update PAN immediately via bit.ly/sbi-pan-update".'
      }
    ]
  },
  {
    id: 'scam-003',
    phoneNumber: '8899011223',
    formattedNumber: '+91 88990 11223',
    carrier: 'Vodafone Idea (Vi)',
    circle: 'Uttar Pradesh (West)',
    riskScore: 88,
    riskLevel: 'HIGH',
    category: 'electricity_bill',
    categoryName: 'Electricity / Utility Disconnection Alert',
    callerName: 'Claimed: State Electricity Board Officer',
    reportCount: 64,
    monetaryLossReported: false,
    lastReported: '1 hour ago',
    reasons: [
      'Bulk SMS campaign warning power will be disconnected at 9:30 PM.',
      'Asks users to pay ₹10 or ₹15 token amount via a phishing payment portal.'
    ],
    reports: []
  },
  {
    id: 'scam-004',
    phoneNumber: '7001122334',
    formattedNumber: '+91 70011 22334',
    carrier: 'Reliance Jio',
    circle: 'Karnataka',
    riskScore: 68,
    riskLevel: 'SUSPICIOUS',
    category: 'fake_job',
    categoryName: 'Fake Job & Part-Time Task Scam',
    callerName: 'Claimed: Global HR Talent Coordinator',
    reportCount: 31,
    monetaryLossReported: true,
    lastReported: '3 hours ago',
    reasons: [
      'Unsolicited WhatsApp messaging promising ₹150 per YouTube video liked.',
      'Transitions victim into a Telegram group requiring prepaid security deposits.'
    ],
    reports: []
  },
  {
    id: 'scam-005',
    phoneNumber: '9455667788',
    formattedNumber: '+91 94556 67788',
    carrier: 'BSNL Mobile',
    circle: 'West Bengal',
    riskScore: 54,
    riskLevel: 'SUSPICIOUS',
    category: 'otp_upi',
    categoryName: 'OTP & UPI Refund / Request Fraud',
    callerName: 'Claimed: PhonePe Merchant Support',
    reportCount: 18,
    monetaryLossReported: false,
    lastReported: '6 hours ago',
    reasons: [
      'Sends QR code claiming user has won cashback.',
      'Prompts user to scan QR and enter UPI PIN to receive money.'
    ],
    reports: []
  },
  {
    id: 'scam-006',
    phoneNumber: '9820012345',
    formattedNumber: '+91 98200 12345',
    carrier: 'Bharti Airtel',
    circle: 'Mumbai',
    riskScore: 8,
    riskLevel: 'SAFE',
    category: 'clean',
    categoryName: 'Clean Number / No Flags',
    callerName: 'Standard Subscriber Line',
    reportCount: 0,
    monetaryLossReported: false,
    lastReported: 'Never reported',
    reasons: [
      'Zero community fraud reports recorded.',
      'Clean subscriber behavior on Indian telecom network.'
    ],
    reports: []
  }
];


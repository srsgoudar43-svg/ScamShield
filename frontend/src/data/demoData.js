// ScamShield Demonstration Dataset & Heuristics Configuration
// IMPORTANT: All phone numbers and reports here are simulated demonstration data for educational & testing purposes.

export const SCAM_CATEGORIES = [
  {
    id: 'digital_arrest',
    name: 'Digital Arrest / Police Impersonation',
    icon: 'ShieldAlert',
    severity: 'critical',
    description: 'Fraudsters impersonating CBI, ED, Mumbai Police, or Customs threatening arrest over fake parcels or illegal transactions.'
  },
  {
    id: 'bank_kyc',
    name: 'Fake Bank KYC / Account Expiry',
    icon: 'CreditCard',
    severity: 'critical',
    description: 'Urgent SMS or call claiming SBI, HDFC, or ICICI account is suspended unless PAN/Aadhaar is updated via phishing links or APK downloads.'
  },
  {
    id: 'otp_upi',
    name: 'OTP & UPI Refund / Request Fraud',
    icon: 'KeyRound',
    severity: 'high',
    description: 'Tricking victims into entering their UPI PIN on "Receive Money" requests, or sharing 6-digit OTPs under false pretenses.'
  },
  {
    id: 'fake_job',
    name: 'Fake Job & Part-Time Task Scam',
    icon: 'Briefcase',
    severity: 'high',
    description: 'Promises of ₹3,000 - ₹10,000 daily for liking YouTube videos or reviewing Google maps, leading to prepaid crypto deposit traps.'
  },
  {
    id: 'electricity_bill',
    name: 'Electricity / Utility Disconnection Alert',
    icon: 'ZapOff',
    severity: 'high',
    description: 'Urgent SMS threatening power disconnection tonight unless an overdue bill is paid to a private mobile number.'
  },
  {
    id: 'lottery_gift',
    name: 'Lottery, Gift & KBC Prize Fraud',
    icon: 'Gift',
    severity: 'medium',
    description: 'Bogus notices claiming the recipient has won ₹25 Lakhs or a luxury vehicle, requiring advance tax or processing fees.'
  },
  {
    id: 'loan_app',
    name: 'Instant Loan & Blackmail Apps',
    icon: 'Coins',
    severity: 'critical',
    description: 'Predatory lending apps that harvest phone contacts and extort users with morphed photos.'
  },
  {
    id: 'courier_customs',
    name: 'FedEx / DHL Customs Seizure Fraud',
    icon: 'Package',
    severity: 'high',
    description: 'Automated robocall claiming a parcel sent to Taiwan or UAE containing passports and contraband was intercepted.'
  }
];

export const INITIAL_DEMO_NUMBERS = [
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
      },
      {
        id: 'rep-2',
        reportedAt: '2 hours ago',
        callerClaimed: 'Customs Department Officer',
        location: 'Bengaluru',
        lossAmount: 'None (Hung up)',
        description: 'Automated interactive voice response said "Press 9 to speak with customs officer". Then an aggressive man demanded my Aadhaar number.'
      },
      {
        id: 'rep-3',
        reportedAt: 'Yesterday',
        callerClaimed: 'Cyber Crime Branch',
        location: 'Pune',
        lossAmount: '₹50,000 lost',
        description: 'Terrified my elderly father saying his bank account was used in hawala money laundering. Coerced him to transfer savings.'
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
      'Falsely claims debit card or net banking will be deactivated within 24 hours.',
      'Directs users to fake SBI YONO clone login portals to steal credentials.',
      'Multiple victims reported unauthorized transactions via net banking.'
    ],
    reports: [
      {
        id: 'rep-4',
        reportedAt: '42 minutes ago',
        callerClaimed: 'SBI NetBanking Support',
        location: 'Mumbai',
        lossAmount: '₹84,000 lost',
        description: 'Got an SMS saying "Dear SBI user, your YONO account is locked. Update PAN immediately via bit.ly/sbi-pan-update". Called this number and was asked for OTP.'
      },
      {
        id: 'rep-5',
        reportedAt: '3 hours ago',
        callerClaimed: 'Bank Compliance Officer',
        location: 'Nagpur',
        lossAmount: 'None',
        description: 'Caller asked me to download "SBI QuickSupport.apk". Truecaller showed it as spam so I immediately hung up.'
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
      'Asks users to pay ₹10 or ₹15 token amount via a phishing payment portal to restore connection.',
      'Uses urgent psychological pressure to force hasty transactions.'
    ],
    reports: [
      {
        id: 'rep-6',
        reportedAt: '1 hour ago',
        callerClaimed: 'Electricity Officer RK Verma',
        location: 'Lucknow',
        lossAmount: 'Attempted ₹1,200',
        description: 'Message said: "Dear customer your electricity power will be disconnected tonight at 9.30pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer 8899011223".'
      }
    ]
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
      'Transitions victim into a Telegram group with fake testimonials.',
      'Requires "prepaid security deposit" for VIP earning tasks that cannot be withdrawn.'
    ],
    reports: [
      {
        id: 'rep-7',
        reportedAt: '3 hours ago',
        callerClaimed: 'Recruiter Tanya',
        location: 'Bengaluru',
        lossAmount: '₹12,000 lost',
        description: 'They paid ₹300 initially for liking 3 videos. Then asked for ₹5000 crypto recharge for the next task and refused to return money.'
      }
    ]
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
      'Sends QR code claiming user has won a cashback reward.',
      'Prompts user to scan QR and enter their UPI PIN to "receive" funds.',
      'Mimics official digital wallet support representatives.'
    ],
    reports: [
      {
        id: 'rep-8',
        reportedAt: '6 hours ago',
        callerClaimed: 'PhonePe Help Desk',
        location: 'Kolkata',
        lossAmount: 'None',
        description: 'Caller told me I won a ₹2,499 cashback voucher and asked me to accept the payment request on Google Pay. I noticed it was a debit request.'
      }
    ]
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
      'Consistent carrier registration with normal calling patterns.',
      'No association with phishing URLs, SMS spam blasts, or impersonation complaints.'
    ],
    reports: []
  }
];

export const DEMO_PRESET_NUMBERS = [
  { label: 'CBI / Digital Arrest Scam', number: '9876543210', badge: 'Critical' },
  { label: 'Fake SBI KYC Notice', number: '9123456789', badge: 'Critical' },
  { label: 'Electricity Bill Cutoff', number: '8899011223', badge: 'High' },
  { label: 'Telegram Job Fraud', number: '7001122334', badge: 'Suspicious' },
  { label: 'Legitimate Caller (Safe)', number: '9820012345', badge: 'Safe' }
];

export const DEMO_STATS = {
  numbersCataloged: '14,820',
  fraudsPrevented: '₹3.8 Cr+',
  communityReports: '48,930',
  avgScanTime: '0.4s'
};

export const LATEST_ALERTS = [
  {
    id: 'alert-1',
    title: 'Surge in "Digital Arrest" Video Calls Impersonating CBI & Customs',
    date: 'Today, 08:30 AM',
    category: 'Impersonation',
    severity: 'critical',
    advice: 'Never join a video call demanding payment for legal clearance. Police and CBI do not arrest citizens via Skype or WhatsApp.'
  },
  {
    id: 'alert-2',
    title: 'Fake "Electricity Bill Not Updated" SMS with Malicious Helpline Numbers',
    date: 'Yesterday, 07:15 PM',
    category: 'Utility Fraud',
    severity: 'high',
    advice: 'Electricity distribution companies (DISCOMs) never send personal 10-digit mobile numbers for overdue bill settlements.'
  },
  {
    id: 'alert-3',
    title: 'Work-from-Home Telegram Groups Promising ₹5,000/day for Simple Tasks',
    date: 'Nov 08, 2026',
    category: 'Job Scam',
    severity: 'high',
    advice: 'Any job asking you to deposit money or recharge a wallet to withdraw earnings is guaranteed fraud.'
  },
  {
    id: 'alert-4',
    title: 'Bank APK Malware ("SBI_Reward.apk") Circulating via WhatsApp',
    date: 'Nov 07, 2026',
    category: 'Malware / APK',
    severity: 'critical',
    advice: 'Never install .apk files received via WhatsApp or SMS. Banks only distribute official apps through Google Play Store and Apple App Store.'
  }
];

export const INDIAN_TELECOM_CIRCLES = [
  'Delhi NCR', 'Mumbai', 'Maharashtra & Goa', 'Karnataka', 'Tamil Nadu & Chennai',
  'Andhra Pradesh & Telangana', 'Uttar Pradesh (West)', 'Uttar Pradesh (East)',
  'West Bengal & Kolkata', 'Gujarat', 'Rajasthan', 'Madhya Pradesh & CG',
  'Kerala', 'Punjab', 'Haryana', 'Bihar & Jharkhand'
];

export const INDIAN_CARRIERS = [
  'Reliance Jio', 'Bharti Airtel', 'Vodafone Idea (Vi)', 'BSNL Mobile'
];


// Phone validation and Indian telecom carrier heuristics
import { INDIAN_TELECOM_CIRCLES, INDIAN_CARRIERS } from '../data/demoData';

/**
 * Strips all non-digit characters from the input string
 */
export function extractDigits(input = '') {
  return String(input).replace(/\D/g, '');
}

/**
 * Normalizes an Indian phone number to clean 10 digits.
 * Handles '+91', '91', '0' prefixes.
 */
export function normalizeIndianNumber(input = '') {
  let digits = extractDigits(input);

  // If starts with 91 and has 12 digits (+91 XXXXXXXXXX)
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  // If starts with 0 and has 11 digits (0XXXXXXXXXX)
  else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits;
}

/**
 * Validates whether the given string is a valid 10-digit Indian mobile number
 * (Starts with 6, 7, 8, or 9 and has exactly 10 digits)
 */
export function validateIndianNumber(input = '') {
  const normalized = normalizeIndianNumber(input);

  if (!normalized) {
    return {
      isValid: false,
      error: 'Please enter a phone number to check.'
    };
  }

  if (normalized.length !== 10) {
    return {
      isValid: false,
      error: `Invalid length. Indian mobile numbers must be 10 digits (you entered ${normalized.length}).`
    };
  }

  if (!/^[6-9]/.test(normalized)) {
    return {
      isValid: false,
      error: 'Invalid start digit. Indian mobile numbers start with 6, 7, 8, or 9.'
    };
  }

  return {
    isValid: true,
    digits: normalized,
    formatted: formatIndianNumber(normalized),
    error: null
  };
}

/**
 * Formats a 10-digit number into standard +91 XXXXX XXXXX format
 */
export function formatIndianNumber(digits = '') {
  const clean = extractDigits(digits).slice(-10);
  if (clean.length < 10) return `+91 ${clean}`;
  return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
}

// Realistic Indian Telecom Circles and Cities for Truecaller reverse lookup
const INDIAN_LOCATIONS = [
  { city: 'Bengaluru', circle: 'Karnataka', state: 'Karnataka' },
  { city: 'Mumbai', circle: 'Mumbai Metro', state: 'Maharashtra' },
  { city: 'New Delhi', circle: 'Delhi NCR', state: 'Delhi' },
  { city: 'Hyderabad', circle: 'Telangana', state: 'Telangana' },
  { city: 'Pune', circle: 'Maharashtra & Goa', state: 'Maharashtra' },
  { city: 'Chennai', circle: 'Tamil Nadu', state: 'Tamil Nadu' },
  { city: 'Kolkata', circle: 'West Bengal', state: 'West Bengal' },
  { city: 'Ahmedabad', circle: 'Gujarat', state: 'Gujarat' },
  { city: 'Lucknow', circle: 'Uttar Pradesh (East)', state: 'Uttar Pradesh' },
  { city: 'Noida', circle: 'Uttar Pradesh (West)', state: 'Uttar Pradesh' },
  { city: 'Jaipur', circle: 'Rajasthan', state: 'Rajasthan' },
  { city: 'Chandigarh', circle: 'Punjab', state: 'Punjab' },
  { city: 'Kochi', circle: 'Kerala', state: 'Kerala' },
  { city: 'Indore', circle: 'Madhya Pradesh', state: 'Madhya Pradesh' }
];

const INDIAN_OPERATORS = [
  { name: 'Reliance Jio', network: 'Jio True 5G / VoLTE', simType: 'Prepaid SIM' },
  { name: 'Bharti Airtel', network: 'Airtel 5G Plus', simType: 'Prepaid SIM' },
  { name: 'Vodafone Idea (Vi)', network: 'Vi GIGAnet 4G', simType: 'Prepaid SIM' },
  { name: 'Bharti Airtel', network: 'Airtel 5G Plus', simType: 'Postpaid Corporate SIM' },
  { name: 'Reliance Jio', network: 'Jio True 5G', simType: 'Postpaid SIM' },
  { name: 'BSNL Mobile', network: 'BSNL 4G VoLTE', simType: 'Prepaid SIM' }
];

const INDIAN_FIRST_NAMES = [
  'Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Pooja', 'Rahul', 'Ananya',
  'Suresh', 'Kavita', 'Rohan', 'Divya', 'Deepak', 'Neha', 'Arjun', 'Sunita',
  'Manoj', 'Swati', 'Sanjay', 'Meera', 'Ramesh', 'Aakash', 'Shweta', 'Naveen'
];

const INDIAN_LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Reddy', 'Rao', 'Gupta',
  'Deshmukh', 'Nair', 'Mehta', 'Joshi', 'Choudhury', 'Bhatt', 'Kulkarni', 'Iyer',
  'Mishra', 'Gowda', 'Banerjee', 'Patil'
];

const REALISTIC_PORTRAITS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&auto=format&fit=crop&q=80'
];

/**
 * Generates deterministic telecom circle, carrier and realistic Truecaller profile
 */
export function inferTruecallerProfile(digits = '') {
  const clean = normalizeIndianNumber(digits);
  if (clean.length !== 10) {
    return {
      callerName: 'Standard Subscriber Line',
      carrier: 'Indian Telecom',
      simNetwork: '4G VoLTE',
      simType: 'Prepaid SIM',
      circle: 'National',
      location: 'India',
      city: 'National',
      state: 'India',
      profilePic: REALISTIC_PORTRAITS[0],
      callerType: 'Mobile Subscriber',
      isVerified: true,
      truecallerTag: 'Identified by Truecaller Community',
      searchCount: 42
    };
  }

  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) & 0xffffffff;
  }
  hash = Math.abs(hash);

  const fn = INDIAN_FIRST_NAMES[hash % INDIAN_FIRST_NAMES.length];
  const ln = INDIAN_LAST_NAMES[(Math.floor(hash / 5)) % INDIAN_LAST_NAMES.length];
  const loc = INDIAN_LOCATIONS[(Math.floor(hash / 11)) % INDIAN_LOCATIONS.length];
  const carrierObj = INDIAN_OPERATORS[(Math.floor(hash / 17)) % INDIAN_OPERATORS.length];

  return {
    callerName: `${fn} ${ln}`,
    carrier: carrierObj.name,
    simNetwork: carrierObj.network,
    simType: carrierObj.simType,
    circle: loc.circle,
    location: `${loc.city}, ${loc.state}, India`,
    city: loc.city,
    state: loc.state,
    profilePic: REALISTIC_PORTRAITS[hash % REALISTIC_PORTRAITS.length],
    callerType: (hash % 3 === 0) ? 'Personal Mobile' : (hash % 3 === 1) ? 'Verified Individual' : 'Mobile Subscriber',
    isVerified: true,
    truecallerTag: 'Identified by Truecaller Community',
    searchCount: 15 + (hash % 240)
  };
}

/**
 * Generates deterministic telecom circle and carrier based on phone prefix
 * for realistic demonstration purposes.
 */
export function inferTelecomInfo(digits = '') {
  return inferTruecallerProfile(digits);
}

/**
 * Helper to get risk styling and badge colors
 */
export function getRiskLevelInfo(score) {
  if (score >= 80) {
    return {
      level: 'CRITICAL RISK',
      color: 'red',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      glowClass: 'glow-red',
      description: 'Dangerous scam number with confirmed fraudulent activity reported by citizens.'
    };
  } else if (score >= 50) {
    return {
      level: 'SUSPICIOUS',
      color: 'amber',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      glowClass: 'glow-amber',
      description: 'Multiple suspicious reports or high-risk behavior patterns detected.'
    };
  } else if (score > 20) {
    return {
      level: 'MODERATE',
      color: 'blue',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      glowClass: 'glow-cyan-sm',
      description: 'Few low-confidence inquiries or telemarketing spam patterns.'
    };
  } else {
    return {
      level: 'SAFE / CLEAN',
      color: 'emerald',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      glowClass: 'glow-emerald',
      description: 'No scam reports recorded. Clean subscriber behavior.'
    };
  }
}


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

/**
 * Generates deterministic telecom circle and carrier based on phone prefix
 * for realistic demonstration purposes.
 */
export function inferTelecomInfo(digits = '') {
  const clean = normalizeIndianNumber(digits);
  if (clean.length !== 10) {
    return { carrier: 'Unknown Carrier', circle: 'National' };
  }

  const prefix = parseInt(clean.slice(0, 4), 10);
  const carrierIndex = (prefix % INDIAN_CARRIERS.length);
  const circleIndex = (prefix % INDIAN_TELECOM_CIRCLES.length);

  return {
    carrier: INDIAN_CARRIERS[carrierIndex],
    circle: INDIAN_TELECOM_CIRCLES[circleIndex]
  };
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


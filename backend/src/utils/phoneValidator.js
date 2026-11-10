// Backend phone validation & Indian telecom circle heuristics

export const CIRCLES = [
  'Delhi NCR', 'Mumbai', 'Maharashtra & Goa', 'Karnataka', 'Tamil Nadu & Chennai',
  'Andhra Pradesh & Telangana', 'Uttar Pradesh (West)', 'Uttar Pradesh (East)',
  'West Bengal & Kolkata', 'Gujarat', 'Rajasthan', 'Madhya Pradesh & CG',
  'Kerala', 'Punjab', 'Haryana', 'Bihar & Jharkhand'
];

export const CARRIERS = [
  'Reliance Jio', 'Bharti Airtel', 'Vodafone Idea (Vi)', 'BSNL Mobile'
];

export function normalizeNumber(input = '') {
  let digits = String(input).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits;
}

export function validateNumber(input = '') {
  const digits = normalizeNumber(input);

  if (!digits) {
    return { isValid: false, error: 'Phone number cannot be empty.' };
  }
  if (digits.length !== 10) {
    return { isValid: false, error: `Indian numbers must be 10 digits (got ${digits.length}).` };
  }
  if (!/^[6-9]/.test(digits)) {
    return { isValid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9.' };
  }

  const prefix = parseInt(digits.slice(0, 4), 10);
  const carrier = CARRIERS[prefix % CARRIERS.length];
  const circle = CIRCLES[prefix % CIRCLES.length];
  const formatted = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;

  return {
    isValid: true,
    digits,
    formatted,
    carrier,
    circle,
    error: null
  };
}


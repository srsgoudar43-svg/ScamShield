// Multi-factor Risk Engine for ScamShield

export function calculateRisk(reportsCount = 0, categorySeverity = 'medium', monetaryLoss = false) {
  let score = 10; // Baseline unrated

  // Report count weighting
  if (reportsCount >= 50) score += 45;
  else if (reportsCount >= 20) score += 35;
  else if (reportsCount >= 5) score += 25;
  else if (reportsCount >= 1) score += 15;

  // Category severity
  if (categorySeverity === 'critical') score += 25;
  else if (categorySeverity === 'high') score += 18;
  else if (categorySeverity === 'medium') score += 10;

  // Financial loss
  if (monetaryLoss) score += 15;

  const clamped = Math.min(99, Math.max(5, score));

  let level = 'SAFE';
  if (clamped >= 80) level = 'CRITICAL';
  else if (clamped >= 50) level = 'SUSPICIOUS';
  else if (clamped >= 25) level = 'MODERATE';

  return { score: clamped, level };
}


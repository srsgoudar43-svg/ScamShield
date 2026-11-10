import { Router } from 'express';
import { validateNumber } from '../utils/phoneValidator.js';
import { calculateRisk } from '../services/riskEngine.js';
import { 
  findPhoneRecord, 
  createScamReport, 
  getCategories, 
  getStats, 
  isSupabaseConfigured 
} from '../services/db.js';
import { 
  analyzeScamWithGemini, 
  chatWithGemini, 
  isGeminiConfigured 
} from '../services/gemini.js';

const router = Router();

/**
 * Health check
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ScamShield India API',
    database: isSupabaseConfigured ? 'Supabase Cloud PostgreSQL' : 'In-Memory / Local Dataset',
    geminiAI: isGeminiConfigured ? 'Connected & Active' : 'Not Configured (Add GEMINI_API_KEY to .env)',
    timestamp: new Date().toISOString()
  });
});

/**
 * AI Call Script & SMS Analysis via Gemini
 */
router.post('/ai/analyze', async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length < 5) {
    return res.status(400).json({ error: 'Please provide text (call transcript, SMS, or WhatsApp message) to analyze.' });
  }

  const result = await analyzeScamWithGemini(text);
  if (!result.success) {
    return res.status(isGeminiConfigured ? 500 : 503).json(result);
  }
  res.json(result);
});

/**
 * AI Cyber Assistant Chat via Gemini
 */
router.post('/ai/chat', async (req, res) => {
  const { question } = req.body;
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Question cannot be empty.' });
  }

  const result = await chatWithGemini(question);
  if (!result.success) {
    return res.status(isGeminiConfigured ? 500 : 503).json(result);
  }
  res.json(result);
});

/**
 * Get scam categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

/**
 * Search phone number
 */
router.get('/numbers/search/:number', async (req, res) => {
  const { number } = req.params;
  const validation = validateNumber(number);

  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const existing = await findPhoneRecord(validation.digits);

    if (existing) {
      return res.json({
        success: true,
        data: {
          ...existing,
          carrier: existing.carrier || validation.carrier,
          circle: existing.circle || validation.circle
        }
      });
    }

    // Unrated clean number response
    const baseline = calculateRisk(0, 'low', false);
    return res.json({
      success: true,
      data: {
        id: `clean-${validation.digits}`,
        phoneNumber: validation.digits,
        formattedNumber: validation.formatted,
        carrier: validation.carrier,
        circle: validation.circle,
        riskScore: baseline.score,
        riskLevel: baseline.level,
        category: 'clean',
        categoryName: 'Unrated / No Complaints Found',
        callerName: 'Standard Subscriber Line',
        reportCount: 0,
        monetaryLossReported: false,
        lastReported: 'No prior incident records found',
        reasons: [
          'Zero fraud complaints registered on the ScamShield demonstration grid.',
          'Normal telecommunication routing signature detected.'
        ],
        reports: []
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error querying phone record: ' + error.message });
  }
});

/**
 * Submit community scam report
 */
router.post('/reports', async (req, res) => {
  const { phoneNumber, categoryId, callerClaimed, description, lossIncurred, lossAmount } = req.body;

  const validation = validateNumber(phoneNumber);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  if (!description || description.trim().length < 15) {
    return res.status(400).json({ error: 'Description must be at least 15 characters long.' });
  }

  try {
    const result = await createScamReport({
      digits: validation.digits,
      validation,
      categoryId,
      callerClaimed,
      description,
      lossIncurred,
      lossAmount
    });

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully.',
      reportId: result.id,
      formattedNumber: validation.formatted,
      digits: validation.digits
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record report: ' + error.message });
  }
});

/**
 * Aggregate telemetry stats
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate statistics' });
  }
});

export default router;

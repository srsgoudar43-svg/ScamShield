import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const isGeminiConfigured = Boolean(GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here');

/**
 * Analyzes a suspicious call transcript, SMS, or WhatsApp message using Gemini 1.5/2.5 Flash
 */
export async function analyzeScamWithGemini(userText) {
  if (!isGeminiConfigured) {
    return {
      success: false,
      error: 'GEMINI_API_KEY is not configured in .env. Please add GEMINI_API_KEY=your_key to enable Gemini AI analysis.'
    };
  }

  const systemInstruction = `You are ScamShield AI, an expert cybersecurity fraud detection analyst specializing in Indian telecommunications and digital payments fraud.
Your job is to analyze suspicious phone scripts, WhatsApp messages, or SMS alerts received by Indian citizens.
Evaluate:
1. Deceptive Tactics: (Urgency, Digital Arrest threat, APK download, fake KYC, UPI PIN theft, etc.)
2. Risk Score: 0 to 100
3. Risk Level: CRITICAL, HIGH, SUSPICIOUS, or SAFE
4. Immediate Defensive Action for the citizen (e.g., dial 1930, do not enter UPI PIN, verify via official bank app).

Return your response in clean JSON format matching this schema:
{
  "riskScore": number,
  "riskLevel": "CRITICAL" | "HIGH" | "SUSPICIOUS" | "SAFE",
  "category": string,
  "deceptiveTactics": string[],
  "analysis": string,
  "defensiveAdvice": string
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemInstruction}\n\nSuspicious Communication Text to analyze:\n"${userText}"` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No response text received from Gemini API');
    }

    const parsed = JSON.parse(candidateText);
    return { success: true, analysis: parsed };
  } catch (error) {
    console.error('[Gemini Service] Analysis error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Interactive Cyber Safety Assistant powered by Gemini
 */
export async function chatWithGemini(userQuestion) {
  if (!isGeminiConfigured) {
    return {
      success: false,
      error: 'GEMINI_API_KEY is not set. Add GEMINI_API_KEY to your .env file to activate the AI Cyber Assistant.'
    };
  }

  const prompt = `You are ScamShield AI, a helpful cybersecurity assistant protecting Indian citizens from online fraud.
Answer the user's question clearly and concisely. If they lost money, emphasize calling the National Cyber Crime Helpline at 1930 immediately within the golden hour.
User question: "${userQuestion}"`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4 }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return { success: true, reply };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


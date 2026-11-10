// API Service layer connecting ScamShield Frontend to Backend / Vercel Serverless Function
const isLocalDev = typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173';
const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocalDev ? 'http://localhost:5000/api' : '/api');

/**
 * Searches a number from the backend REST API
 */
export async function searchNumberAPI(phoneNumber) {
  try {
    const res = await fetch(`${API_BASE_URL}/numbers/search/${encodeURIComponent(phoneNumber)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.warn('[ScamShield API] Remote search unavailable, using client fallback:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Submits a community report to the backend REST API
 */
export async function submitReportAPI(reportPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportPayload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.warn('[ScamShield API] Remote report submission failed, using client fallback:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches dynamic statistics from the backend
 */
export async function fetchStatsAPI() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Analyzes suspicious text with Gemini AI via backend endpoint
 */
export async function analyzeMessageAPI(text) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Chats with the ScamShield AI Cyber Assistant
 */
export async function chatWithAIAPI(question) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_DEMO_NUMBERS, 
  SCAM_CATEGORIES, 
  DEMO_STATS, 
  LATEST_ALERTS 
} from '../data/demoData';
import { 
  validateIndianNumber, 
  formatIndianNumber, 
  inferTelecomInfo, 
  getRiskLevelInfo 
} from '../utils/phoneValidator';

const ScamContext = createContext(null);

const STORAGE_KEY = 'scamshield_demo_database_v1';
const HISTORY_KEY = 'scamshield_search_history_v1';

export function ScamProvider({ children }) {
  // Navigation active tab: 'home' | 'check' | 'report' | 'about'
  const [activeTab, setActiveTab] = useState('home');

  // Currently inspected number in "Check Number" view
  const [activeSearchNumber, setActiveSearchNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Persistent database state (pre-seeded with demo data + custom reports)
  const [database, setDatabase] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial dataset', e);
    }
    return INITIAL_DEMO_NUMBERS;
  });

  // Recent search history
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read history', e);
    }
    return [
      { number: '9876543210', formatted: '+91 98765 43210', riskScore: 96, riskLevel: 'CRITICAL', time: '10m ago' },
      { number: '9123456789', formatted: '+91 91234 56789', riskScore: 92, riskLevel: 'CRITICAL', time: '35m ago' },
      { number: '9820012345', formatted: '+91 98200 12345', riskScore: 8, riskLevel: 'SAFE', time: '1h ago' }
    ];
  });

  // Global demo banner visibility
  const [showDemoNotice, setShowDemoNotice] = useState(true);

  // Sync database to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
    } catch (e) {
      console.error('Failed to sync database to localStorage', e);
    }
  }, [database]);

  // Sync search history
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    } catch (e) {
      console.error('Failed to sync history', e);
    }
  }, [searchHistory]);

  /**
   * Performs an algorithmic threat assessment on an Indian phone number
   */
  const checkNumber = (rawNumber, navigateToCheckPage = true) => {
    setSearchError('');
    const validation = validateIndianNumber(rawNumber);

    if (!validation.isValid) {
      setSearchError(validation.error);
      if (navigateToCheckPage) {
        setActiveTab('check');
      }
      return null;
    }

    const digits = validation.digits;
    setActiveSearchNumber(digits);
    setIsScanning(true);

    if (navigateToCheckPage) {
      setActiveTab('check');
    }

    // Simulate an advanced cybersecurity scan delay (600ms) for realistic UX
    setTimeout(() => {
      // Look up existing record
      const existing = database.find(item => item.phoneNumber === digits);
      const telecom = inferTelecomInfo(digits);

      let result;

      if (existing) {
        result = {
          ...existing,
          carrier: existing.carrier || telecom.carrier,
          circle: existing.circle || telecom.circle,
          levelInfo: getRiskLevelInfo(existing.riskScore)
        };
      } else {
        // Uncataloged number assessment
        const defaultScore = 12; // Unrated / Clean baseline
        result = {
          id: `clean-${digits}`,
          phoneNumber: digits,
          formattedNumber: validation.formatted,
          carrier: telecom.carrier,
          circle: telecom.circle,
          riskScore: defaultScore,
          riskLevel: 'SAFE',
          category: 'unverified',
          categoryName: 'Unrated / No Complaints Found',
          callerName: 'Standard Subscriber Line',
          reportCount: 0,
          monetaryLossReported: false,
          lastReported: 'No prior incident records found',
          reasons: [
            'Zero fraud complaints registered on the ScamShield demonstration grid.',
            'Normal telecommunication routing signature detected.',
            'No associated phishing links, SMS spam patterns, or bank impersonation logs.'
          ],
          reports: [],
          levelInfo: getRiskLevelInfo(defaultScore)
        };
      }

      setSearchResult(result);
      setIsScanning(false);

      // Add to search history
      setSearchHistory(prev => {
        const filtered = prev.filter(h => h.number !== digits);
        return [
          {
            number: digits,
            formatted: validation.formatted,
            riskScore: result.riskScore,
            riskLevel: result.levelInfo.level,
            time: 'Just now'
          },
          ...filtered.slice(0, 7)
        ];
      });
    }, 600);
  };

  /**
   * Submits a community scam report and updates database
   */
  const submitReport = ({ phoneNumber, categoryId, callerClaimed, description, lossIncurred, lossAmount }) => {
    const validation = validateIndianNumber(phoneNumber);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const digits = validation.digits;
    const categoryObj = SCAM_CATEGORIES.find(c => c.id === categoryId) || SCAM_CATEGORIES[0];
    const telecom = inferTelecomInfo(digits);

    const newCommunityReport = {
      id: `rep-${Date.now()}`,
      reportedAt: 'Just now',
      callerClaimed: callerClaimed || 'Unknown caller',
      location: telecom.circle,
      lossAmount: lossIncurred ? (lossAmount || 'Financial loss reported') : 'None reported',
      description: description
    };

    setDatabase(prevDb => {
      const existingIndex = prevDb.findIndex(item => item.phoneNumber === digits);

      if (existingIndex >= 0) {
        // Update existing record with higher risk and additional report
        const current = prevDb[existingIndex];
        const updatedScore = Math.min(99, Math.max(current.riskScore + 12, 75));
        const updatedCount = (current.reportCount || 0) + 1;
        const updatedReasons = [...new Set([
          ...current.reasons,
          `Citizen reported: "${description.slice(0, 60)}..."`,
          `Flagged under category: ${categoryObj.name}`
        ])];

        const updatedRecord = {
          ...current,
          riskScore: updatedScore,
          riskLevel: updatedScore >= 80 ? 'CRITICAL' : 'HIGH',
          reportCount: updatedCount,
          lastReported: 'Just now',
          reasons: updatedReasons,
          reports: [newCommunityReport, ...current.reports]
        };

        const copy = [...prevDb];
        copy[existingIndex] = updatedRecord;
        return copy;
      } else {
        // Create new record with elevated risk
        const initialRiskScore = lossIncurred ? 84 : 72;
        const newRecord = {
          id: `scam-${Date.now()}`,
          phoneNumber: digits,
          formattedNumber: validation.formatted,
          carrier: telecom.carrier,
          circle: telecom.circle,
          riskScore: initialRiskScore,
          riskLevel: initialRiskScore >= 80 ? 'CRITICAL' : 'HIGH',
          category: categoryObj.id,
          categoryName: categoryObj.name,
          callerName: callerClaimed ? `Claimed: ${callerClaimed}` : `Flagged: ${categoryObj.name}`,
          reportCount: 1,
          monetaryLossReported: !!lossIncurred,
          lastReported: 'Just now',
          reasons: [
            `Newly reported by citizen for suspected ${categoryObj.name}.`,
            lossIncurred ? 'Monetary loss was reported during this interaction.' : 'Suspicious fraudulent solicitation reported.',
            `Caller claimed identity: "${callerClaimed || 'Unknown'}"`
          ],
          reports: [newCommunityReport]
        };
        return [newRecord, ...prevDb];
      }
    });

    return { success: true, formatted: validation.formatted, digits };
  };

  /**
   * Resets database back to default demonstration set
   */
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    setDatabase(INITIAL_DEMO_NUMBERS);
    setSearchResult(null);
    setActiveSearchNumber('');
  };

  return (
    <ScamContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSearchNumber,
        setActiveSearchNumber,
        searchResult,
        setSearchResult,
        isScanning,
        searchError,
        setSearchError,
        checkNumber,
        submitReport,
        database,
        searchHistory,
        showDemoNotice,
        setShowDemoNotice,
        categories: SCAM_CATEGORIES,
        stats: DEMO_STATS,
        alerts: LATEST_ALERTS,
        resetDemoData
      }}
    >
      {children}
    </ScamContext.Provider>
  );
}

export function useScam() {
  const context = useContext(ScamContext);
  if (!context) {
    throw new Error('useScam must be used within a ScamProvider');
  }
  return context;
}


'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { type SeasonType, seasons } from '@/lib/constants/seasons';

interface SeasonContextType {
  currentSeason: SeasonType;
  setSeason: (season: SeasonType) => void;
  seasonData: (typeof seasons)[0];
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

function getSeasonFromDate(): SeasonType {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Fechas astronomicas aproximadas para el hemisferio norte
  // Primavera: 21 marzo - 20 junio
  // Verano: 21 junio - 22 septiembre
  // Otono: 23 septiembre - 20 diciembre
  // Invierno: 21 diciembre - 20 marzo
  
  if ((month === 3 && day >= 21) || month === 4 || month === 5 || (month === 6 && day <= 20)) {
    return 'spring';
  }
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) {
    return 'summer';
  }
  if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day <= 20)) {
    return 'autumn';
  }
  return 'winter';
}

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [currentSeason, setCurrentSeason] = useState<SeasonType>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('jacaranda-season');
      if (saved && ['spring', 'summer', 'autumn', 'winter'].includes(saved)) {
        return saved as SeasonType;
      }
    }
    return getSeasonFromDate();
  });

  const seasonData = seasons.find((s) => s.id === currentSeason) ?? seasons[0];

  useEffect(() => {
    sessionStorage.setItem('jacaranda-season', currentSeason);
    
    // Update CSS custom properties for season colors
    const root = document.documentElement;
    root.style.setProperty('--season-primary', seasonData.colors.primary);
    root.style.setProperty('--season-secondary', seasonData.colors.secondary);
    root.style.setProperty('--season-accent', seasonData.colors.accent);
    root.style.setProperty('--season-background', seasonData.colors.background);
    root.style.setProperty('--season-card', seasonData.colors.card);
    root.style.setProperty('--season-text', seasonData.colors.text);
  }, [currentSeason, seasonData]);

  const setSeason = (season: SeasonType) => {
    setCurrentSeason(season);
  };

  return (
    <SeasonContext.Provider value={{ currentSeason, setSeason, seasonData }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}

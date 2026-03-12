'use client';

import { motion } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { seasons, type SeasonType } from '@/lib/constants/seasons';

export function SeasonSelector() {
  const { currentSeason, setSeason } = useSeason();

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 flex gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      {seasons.map((season) => {
        const Icon = season.icon;
        const isActive = currentSeason === season.id;

        return (
          <motion.button
            key={season.id}
            onClick={() => setSeason(season.id as SeasonType)}
            className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all"
            style={{
              backgroundColor: isActive ? season.colors.primary : season.colors.background,
              border: isActive ? 'none' : `2px solid ${season.colors.primary}`,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={season.label}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: isActive ? 'white' : season.colors.primary }}
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}

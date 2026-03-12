'use client';

import { Flower } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { seasons, type SeasonType } from '@/lib/constants/seasons';

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const { currentSeason, setSeason, seasonData } = useSeason();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full border-b-4 shadow-lg"
      style={{
        backgroundColor: seasonData.colors.card,
        borderColor: seasonData.colors.primary,
      }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <motion.button
          onClick={onLogoClick}
          className="flex items-center gap-3 text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full shadow-md"
            style={{ backgroundColor: seasonData.colors.primary }}
          >
            <Flower className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: seasonData.colors.text }}
            >
              Colegio Jacaranda
            </h1>
            <p
              className="text-sm font-medium opacity-80"
              style={{ color: seasonData.colors.text }}
            >
              3º de Infantil
            </p>
          </div>
        </motion.button>

        {/* Season Selector */}
        <div className="flex items-center gap-1">
          {seasons.map((season) => {
            const Icon = season.icon;
            const isActive = currentSeason === season.id;

            return (
              <motion.button
                key={season.id}
                onClick={() => setSeason(season.id as SeasonType)}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 transition-all"
                style={{
                  backgroundColor: isActive ? season.colors.primary : 'transparent',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={season.label}
              >
                <Icon
                  className="h-5 w-5 shrink-0"
                  style={{ color: isActive ? 'white' : season.colors.primary }}
                />
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="overflow-hidden text-sm font-semibold whitespace-nowrap text-white"
                  >
                    {season.label}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}

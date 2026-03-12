'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { syllables } from '@/lib/constants/learning';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

export function LearnSyllables() {
  const { seasonData } = useSeason();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const randomSyllable = () => {
    const random = syllables[Math.floor(Math.random() * syllables.length)];
    setHighlighted(random);
  };

  return (
    <section className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-4 flex items-center justify-center gap-4">
          <h2
            className="text-3xl font-bold"
            style={{ color: seasonData.colors.text }}
          >
            🔤 Sílabas
          </h2>
          <Button
            size="sm"
            variant="outline"
            className="font-semibold"
            style={{
              borderColor: seasonData.colors.primary,
              color: seasonData.colors.text,
            }}
            onClick={randomSyllable}
          >
            <Shuffle className="mr-1 h-4 w-4" />
            Modo aleatorio
          </Button>
        </div>

        {highlighted && (
          <motion.div
            key={highlighted}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mb-5 flex justify-center"
          >
            <span
              className="rounded-2xl px-10 py-4 text-5xl font-extrabold text-white shadow-xl"
              style={{ backgroundColor: seasonData.colors.secondary ?? seasonData.colors.primary }}
            >
              {highlighted}
            </span>
          </motion.div>
        )}

        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-5 gap-2">
            {syllables.map((syl) => {
              const isActive = highlighted === syl;
              return (
                <motion.button
                  key={syl}
                  onClick={() => setHighlighted(isActive ? null : syl)}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.08 }}
                  animate={
                    isActive
                      ? { scale: 1.15 }
                      : { scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="rounded-xl px-2 py-2 text-center text-sm font-bold transition-shadow"
                  style={{
                    backgroundColor: isActive
                      ? seasonData.colors.accent
                      : seasonData.colors.primary,
                    color: 'white',
                    boxShadow: isActive
                      ? `0 0 0 3px ${seasonData.colors.text}`
                      : 'none',
                  }}
                >
                  {syl}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

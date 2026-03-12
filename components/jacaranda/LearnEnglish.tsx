'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { englishWords, colors } from '@/lib/constants/learning';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function LearnEnglish() {
  const { seasonData } = useSeason();
  const [wordIndex, setWordIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealedColors, setRevealedColors] = useState<Set<number>>(new Set());

  const currentWord = englishWords[wordIndex];

  const nextWord = () => {
    setDirection(1);
    setWordIndex((prev) => {
      let next = Math.floor(Math.random() * englishWords.length);
      while (next === prev && englishWords.length > 1) {
        next = Math.floor(Math.random() * englishWords.length);
      }
      return next;
    });
  };

  const toggleColor = (index: number) => {
    setRevealedColors((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-4 text-center">
          <h2
            className="text-3xl font-bold"
            style={{ color: seasonData.colors.text }}
          >
            🇬🇧 Inglés
          </h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row">
          {/* LEFT: Vocabulary cards */}
          <Card
            className="flex flex-1 flex-col items-center justify-between border-4 p-6 shadow-xl"
            style={{
              borderColor: seasonData.colors.primary,
              backgroundColor: seasonData.colors.card,
            }}
          >
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-widest opacity-70"
              style={{ color: seasonData.colors.text }}
            >
              Vocabulario
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={wordIndex}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="text-8xl">{currentWord.emoji}</span>
                <span
                  className="text-4xl font-extrabold"
                  style={{ color: seasonData.colors.primary }}
                >
                  {currentWord.word}
                </span>
                <span
                  className="text-xl font-medium opacity-80"
                  style={{ color: seasonData.colors.text }}
                >
                  {currentWord.translation}
                </span>
              </motion.div>
            </AnimatePresence>

            <Button
              size="lg"
              className="mt-6 font-bold text-white"
              style={{ backgroundColor: seasonData.colors.primary }}
              onClick={nextWord}
            >
              Siguiente
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </Card>

          {/* RIGHT: Color circles */}
          <Card
            className="flex flex-1 flex-col border-4 p-6 shadow-xl"
            style={{
              borderColor: seasonData.colors.primary,
              backgroundColor: seasonData.colors.card,
            }}
          >
            <h3
              className="mb-4 text-center text-sm font-semibold uppercase tracking-widest opacity-70"
              style={{ color: seasonData.colors.text }}
            >
              Colores — toca para ver el nombre
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color, index) => {
                const isRevealed = revealedColors.has(index);
                return (
                  <motion.button
                    key={color.nameEn}
                    onClick={() => toggleColor(index)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <motion.div
                      className="h-16 w-16 rounded-full border-4 shadow-md"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: isRevealed
                          ? seasonData.colors.primary
                          : 'transparent',
                      }}
                      animate={isRevealed ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-lg font-bold"
                          style={{ color: seasonData.colors.text }}
                        >
                          {color.nameEn}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span
                      className="text-lg opacity-70"
                      style={{ color: seasonData.colors.text }}
                    >
                      {color.nameEs}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}

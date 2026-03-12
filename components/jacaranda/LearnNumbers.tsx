'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { getRandomNumber } from '@/lib/constants/learning';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dices } from 'lucide-react';

export function LearnNumbers() {
  const { seasonData } = useSeason();
  const [number, setNumber] = useState<number>(() => getRandomNumber());
  const [count, setCount] = useState(1);

  const nextNumber = () => {
    setNumber(getRandomNumber());
    setCount((prev) => prev + 1);
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
            🔢 Números
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          <Card
            className="flex flex-col items-center border-4 px-8 py-10 shadow-xl"
            style={{
              borderColor: seasonData.colors.primary,
              backgroundColor: seasonData.colors.card,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={number}
                initial={{ scale: 0.3, opacity: 0, y: -30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18,
                  mass: 0.8,
                }}
                className="select-none font-extrabold leading-none"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 9rem)',
                  color: seasonData.colors.primary,
                }}
              >
                {number}
              </motion.span>
            </AnimatePresence>

            <Button
              size="lg"
              className="mt-8 text-lg font-bold text-white"
              style={{ backgroundColor: seasonData.colors.primary }}
              onClick={nextNumber}
            >
              <Dices className="mr-2 h-5 w-5" />
              ¡Siguiente número!
            </Button>
          </Card>

          <p
            className="mt-4 text-center text-sm font-medium opacity-60"
            style={{ color: seasonData.colors.text }}
          >
            {count === 1
              ? 'Primer número de la sesión'
              : `${count} números vistos en esta sesión`}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

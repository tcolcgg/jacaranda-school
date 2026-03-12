'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Eye, Lightbulb, Shuffle, Clock } from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';
import { riddles } from '@/lib/constants/riddles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Riddles() {
  const { seasonData } = useSeason();
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(() =>
    Math.floor(Math.random() * riddles.length)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentRiddle = riddles[currentRiddleIndex];

  const getRandomRiddle = useCallback(() => {
    let newIndex = Math.floor(Math.random() * riddles.length);
    while (newIndex === currentRiddleIndex && riddles.length > 1) {
      newIndex = Math.floor(Math.random() * riddles.length);
    }
    setCurrentRiddleIndex(newIndex);
    setShowAnswer(false);
    setCountdown(null);
    setShowHint(false);
  }, [currentRiddleIndex]);

  const startReveal = () => {
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setShowAnswer(true);
      setCountdown(null);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-4 text-center">
          <h2
            className="mb-1 text-3xl font-bold"
            style={{ color: seasonData.colors.text }}
          >
            Adivinanzas
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card
            className="overflow-hidden border-4 shadow-xl"
            style={{ borderColor: seasonData.colors.primary, backgroundColor: seasonData.colors.card }}
          >
            {/* Riddle Question */}
            <div className="p-4">
              <motion.div
                key={currentRiddle.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: seasonData.colors.primary }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <HelpCircle className="h-6 w-6 text-white" />
                </motion.div>

                <motion.p
                  className="text-xl font-medium leading-relaxed"
                  style={{ color: seasonData.colors.text }}
                >
                  {'"'}{currentRiddle.question}{'"'}
                </motion.p>

                {/* Hint Section */}
                {currentRiddle.hint && !showAnswer && (
                  <AnimatePresence>
                    {showHint ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl p-3"
                        style={{ backgroundColor: seasonData.colors.background }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Lightbulb
                            className="h-5 w-5 shrink-0"
                            style={{ color: seasonData.colors.accent }}
                          />
                          <span
                            className="font-medium"
                            style={{ color: seasonData.colors.text }}
                          >
                            Pista: {currentRiddle.hint}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 rounded-full border-2 px-3 py-1 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
                        style={{ color: seasonData.colors.text, borderColor: seasonData.colors.primary }}
                        onClick={() => setShowHint(true)}
                      >
                        <Lightbulb className="h-4 w-4" />
                        Ver pista
                      </motion.button>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>

            {/* Answer Section */}
            <div
              className="border-t-2 p-4"
              style={{
                borderColor: seasonData.colors.primary,
                backgroundColor: seasonData.colors.background,
              }}
            >
              <AnimatePresence mode="wait">
                {showAnswer ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <motion.p
                      className="mb-2 text-sm font-medium opacity-70"
                      style={{ color: seasonData.colors.text }}
                    >
                      La respuesta es...
                    </motion.p>
                    <motion.h3
                      className="text-3xl font-bold"
                      style={{ color: seasonData.colors.primary }}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                    >
                      {currentRiddle.answer}
                    </motion.h3>
                  </motion.div>
                ) : countdown !== null ? (
                  <motion.div
                    key="countdown"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Clock
                      className="mb-2 h-8 w-8"
                      style={{ color: seasonData.colors.primary }}
                    />
                    <motion.span
                      key={countdown}
                      className="text-5xl font-bold"
                      style={{ color: seasonData.colors.primary }}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {countdown}
                    </motion.span>
                    <p
                      className="mt-2 text-sm font-medium opacity-70"
                      style={{ color: seasonData.colors.text }}
                    >
                      Preparados...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="reveal-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Button
                      size="lg"
                      className="text-lg font-bold text-white"
                      style={{ backgroundColor: seasonData.colors.primary }}
                      onClick={startReveal}
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Revelar respuesta
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* New Riddle Button */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-bold"
              style={{
                borderColor: seasonData.colors.primary,
                color: seasonData.colors.text,
              }}
              onClick={getRandomRiddle}
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Otra adivinanza
            </Button>
          </motion.div>

          {/* Riddle Counter */}
          <p
            className="mt-4 text-center text-sm font-medium opacity-60"
            style={{ color: seasonData.colors.text }}
          >
            Adivinanza {currentRiddleIndex + 1} de {riddles.length}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeason } from '@/lib/context/SeasonContext';
import { weatherOptions, type WeatherType } from '@/lib/constants/weather';
import { Card } from '@/components/ui/card';

export function WeatherAdvisor() {
  const { seasonData } = useSeason();
  const [selectedWeather, setSelectedWeather] = useState<WeatherType | null>(
    null
  );

  const selectedOption = weatherOptions.find((w) => w.id === selectedWeather);

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
            className="mb-1 text-3xl font-bold"
            style={{ color: seasonData.colors.text }}
          >
            ¿Qué tiempo hace hoy?
          </h2>
        </div>

        {/* Weather Options */}
        <div className="mb-4 flex flex-wrap justify-center gap-3">
          {weatherOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedWeather === option.id;

            return (
              <motion.button
                key={option.id}
                onClick={() =>
                  setSelectedWeather(isSelected ? null : option.id)
                }
                className="flex flex-col items-center gap-1 rounded-2xl border-4 p-4 transition-all"
                style={{
                  backgroundColor: isSelected
                    ? option.bgColor
                    : seasonData.colors.card,
                  borderColor: isSelected
                    ? option.color.replace('text-', '#')
                    : 'transparent',
                  boxShadow: isSelected
                    ? `0 8px 30px -5px ${option.color.replace('text-', 'rgba(').replace('-500', ', 0.3)')}`
                    : 'none',
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={
                    isSelected
                      ? {
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`h-10 w-10 ${option.color}`} />
                </motion.div>
                <span
                  className="text-sm font-bold"
                  style={{ color: seasonData.colors.text }}
                >
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Weather Advice Card */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="mx-auto max-w-lg"
            >
              <Card
                className={`overflow-hidden border-4 shadow-xl ${selectedOption.bgColor}`}
                style={{
                  borderColor: selectedOption.color.replace('text-', '#'),
                }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="shrink-0"
                    >
                      <selectedOption.icon
                        className={`h-14 w-14 ${selectedOption.color}`}
                      />
                    </motion.div>

                    <div className="flex-1">
                      <motion.h3
                        className={`mb-2 text-xl font-bold ${selectedOption.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedOption.message}
                      </motion.h3>

                      <motion.div
                        className="p-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <p
                          className="text-base font-medium"
                          style={{ color: seasonData.colors.text }}
                        >
                          {selectedOption.advice}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedWeather && (
          <motion.div
            className="text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p
              className="text-lg font-medium"
              style={{ color: seasonData.colors.text }}
            >
              Pulsa un icono para ver el consejo del día
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

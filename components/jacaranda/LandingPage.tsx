'use client';

import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';

interface LandingPageProps {
  onEnter: (section?: string) => void;
}

const navButtons = [
  { emoji: '👥', label: 'NUESTRA CLASE', section: 'class' },
  { emoji: '🎲', label: 'ENCARGADO', section: 'encargado' },
  { emoji: '🎂', label: 'CUMPLEAÑOS', section: 'birthdays' },
  { emoji: '❓', label: 'ADIVINANZAS', section: 'riddles' },
  { emoji: '🌤️', label: 'EL TIEMPO', section: 'weather' },
  { emoji: '📚', label: 'VAMOS A APRENDER', section: 'english' },
];

export function LandingPage({ onEnter }: LandingPageProps) {
  const { seasonData } = useSeason();
  const SeasonIcon = seasonData.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: seasonData.colors.background }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden px-4 py-5 text-center md:py-7"
        style={{
          backgroundColor: seasonData.colors.card,
          borderBottom: `4px solid ${seasonData.colors.primary}`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Season decoration */}
        <motion.div
          className="absolute right-4 top-4 md:right-12 md:top-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SeasonIcon
            className="h-12 w-12 md:h-16 md:w-16"
            style={{ color: seasonData.colors.primary }}
          />
        </motion.div>

        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-2">
            {/* Logo */}
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-lg md:h-20 md:w-20"
              style={{ backgroundColor: seasonData.colors.primary }}
            >
              <Flower className="h-10 w-10 text-white md:h-12 md:w-12" />
            </div>

            <div className="text-left">
              <h1
                className="text-2xl font-black tracking-wide md:text-3xl"
                style={{ color: seasonData.colors.text }}
              >
                COLEGIO JACARANDA
              </h1>
              <h2
                className="text-base font-bold md:text-xl"
                style={{ color: seasonData.colors.primary }}
              >
                3º DE INFANTIL
              </h2>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-lg text-sm font-semibold md:text-base"
            style={{ color: seasonData.colors.text, opacity: 0.8 }}
          >
            ¡BIENVENIDOS A LA CLASE MÁS MOLONA DEL COLE!
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Navigation Buttons Section */}
      <motion.section
        className="px-4 py-6 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h3
          className="mb-8 text-center text-2xl font-black md:text-3xl"
          style={{ color: seasonData.colors.text }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          ¿QUÉ QUIERES HACER?
        </motion.h3>
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 md:gap-6">
          {navButtons.map((button, index) => (
            <motion.button
              key={button.label}
              onClick={() => onEnter(button.section)}
              className="flex flex-col items-center justify-center rounded-3xl p-3 shadow-xl transition-shadow hover:shadow-2xl md:p-4"
              style={{
                backgroundColor: seasonData.colors.card,
                border: `3px solid ${seasonData.colors.secondary}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mb-1 text-4xl md:text-5xl">{button.emoji}</span>
              <span
                className="text-center text-sm font-black md:text-base"
                style={{ color: seasonData.colors.text }}
              >
                {button.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="px-4 py-8 text-center"
        style={{ backgroundColor: seasonData.colors.primary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3">
          <Flower className="h-6 w-6 text-white" />
          <p className="text-base font-bold text-white md:text-lg">
            CLASE DE INFANTIL 5 AÑOS - COLEGIO JACARANDA
          </p>
          <Flower className="h-6 w-6 text-white" />
        </div>
        <p className="mt-2 text-xs text-white opacity-70">
          Desarrollado por los papás de Darío
        </p>
      </motion.footer>
    </div>
  );
}

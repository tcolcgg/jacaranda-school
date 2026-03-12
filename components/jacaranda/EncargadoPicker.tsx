'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, RotateCcw, Crown } from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';
import { useEncargado } from '@/hooks/use-encargado';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { students } from '@/lib/constants/students';

export function EncargadoPicker() {
  const { seasonData } = useSeason();
  const {
    currentEncargado,
    usedStudents,
    remainingCount,
    isComplete,
    isSpinning,
    selectNextEncargado,
    resetCycle,
    totalStudents,
  } = useEncargado();

  const progress = ((totalStudents - remainingCount) / totalStudents) * 100;

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-8 text-center">
          <h2
            className="mb-2 text-3xl font-bold"
            style={{ color: seasonData.colors.text }}
          >
            Encargado/a del Día
          </h2>
          <p
            className="text-lg opacity-80"
            style={{ color: seasonData.colors.text }}
          >
            ¿Quién será hoy el encargado de la clase?
          </p>
        </div>

        <div className="mx-auto max-w-md">
          {/* Current Encargado Display */}
          <Card
            className="mb-6 overflow-hidden border-4 shadow-xl"
            style={{ borderColor: seasonData.colors.primary, backgroundColor: seasonData.colors.card }}
          >
            <div className="p-0">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="mb-2 flex h-14 w-14 items-center justify-center rounded-full"
                      style={{ backgroundColor: seasonData.colors.primary }}
                    >
                      <Sparkles className="h-7 w-7 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <p
                        className="text-xl font-bold"
                        style={{ color: seasonData.colors.text }}
                      >
                        Eligiendo...
                      </p>
                    </motion.div>

                    {/* Shuffling names animation */}
                    <motion.div className="mt-4 h-8 overflow-hidden">
                      <motion.div
                        animate={{ y: [-400, 0] }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className="flex flex-col items-center"
                      >
                        {students.map((name, i) => (
                          <motion.span
                            key={i}
                            className="block py-1 text-lg font-medium opacity-50"
                            style={{ color: seasonData.colors.text }}
                          >
                            {name}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : currentEncargado ? (
                  <motion.div
                    key="selected"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="flex flex-col items-center py-3"
                  >
                    <motion.h3
                      className="text-3xl font-bold"
                      style={{ color: seasonData.colors.text }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {currentEncargado}
                    </motion.h3>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center py-2"
                  >
                    <p
                      className="text-lg font-medium opacity-60"
                      style={{ color: seasonData.colors.text }}
                    >
                      Pulsa el botón para elegir
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span style={{ color: seasonData.colors.text }}>
                Progreso del ciclo
              </span>
              <span style={{ color: seasonData.colors.text }}>
                {totalStudents - remainingCount} / {totalStudents}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p
              className="mt-2 text-center text-sm opacity-70"
              style={{ color: seasonData.colors.text }}
            >
              {isComplete
                ? '¡Todos han sido encargados! Puedes reiniciar el ciclo.'
                : `Quedan ${remainingCount} alumnos por ser encargados`}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 text-lg font-bold text-white"
              style={{ backgroundColor: seasonData.colors.primary }}
              onClick={selectNextEncargado}
              disabled={isSpinning}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {currentEncargado ? 'Elegir otro' : 'Elegir encargado'}
            </Button>

            {usedStudents.length > 0 && (
              <Button
                size="lg"
                variant="outline"
                onClick={resetCycle}
                disabled={isSpinning}
                style={{
                  borderColor: seasonData.colors.primary,
                  color: seasonData.colors.text,
                }}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Used Students List */}
          {usedStudents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              <p
                className="mb-3 text-sm font-medium"
                style={{ color: seasonData.colors.text }}
              >
                Ya han sido encargados:
              </p>
              <div className="flex flex-wrap gap-2">
                {usedStudents.map((name) => (
                  <motion.span
                    key={name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-full px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: seasonData.colors.card,
                      color: seasonData.colors.text,
                    }}
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cake, Gift, PartyPopper, CalendarDays } from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';
import { birthdays } from '@/lib/constants/students';
import { Card } from '@/components/ui/card';

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function BirthdayBoard() {
  const { seasonData } = useSeason();

  const today = new Date(2026, 2, 23); // Simulación: 23 de Marzo
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const { birthdaysThisMonth, todaysBirthdays, orderedBirthdays } = useMemo(() => {
    const thisMonth = birthdays.filter((b) => b.month === currentMonth);
    const todayBirthdays = thisMonth.filter((b) => b.day === currentDay);
    
    // Sort: today's birthdays first, then by day
    const ordered = [...thisMonth].sort((a, b) => {
      const aIsToday = a.day === currentDay;
      const bIsToday = b.day === currentDay;
      if (aIsToday && !bIsToday) return -1;
      if (!aIsToday && bIsToday) return 1;
      return a.day - b.day;
    });

    return {
      birthdaysThisMonth: thisMonth,
      todaysBirthdays: todayBirthdays,
      orderedBirthdays: ordered,
    };
  }, [currentMonth, currentDay]);

  const hasBirthdayToday = todaysBirthdays.length > 0;

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
            Cumpleaños de {monthNames[currentMonth - 1]}
          </h2>
          <p
            className="text-lg opacity-80"
            style={{ color: seasonData.colors.text }}
          >
            {birthdaysThisMonth.length === 0
              ? 'No hay cumpleaños este mes'
              : `${birthdaysThisMonth.length} cumpleaños este mes`}
          </p>
        </div>

        {/* Today's Birthday Special Banner */}
        {hasBirthdayToday && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <Card
              className="overflow-hidden border-4 shadow-xl bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100"
              style={{ borderColor: '#facc15' }}
            >
              <motion.div
                className="p-6"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="mb-4 flex gap-3"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <PartyPopper className="h-10 w-10 text-yellow-600" />
                    <Cake className="h-10 w-10 text-pink-500" />
                    <PartyPopper className="h-10 w-10 text-yellow-600" />
                  </motion.div>

                  <h3 className="mb-2 text-2xl font-bold text-yellow-800">
                    ¡Hoy es un día especial!
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2">
                    {todaysBirthdays.map((birthday) => (
                      <motion.span
                        key={birthday.name}
                        className="rounded-full bg-yellow-400 px-4 py-2 text-lg font-bold text-yellow-900"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {birthday.name}
                      </motion.span>
                    ))}
                  </div>

                  <p className="mt-3 text-lg font-medium text-yellow-700">
                    ¡Feliz cumpleaños!
                  </p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        )}

        {/* Birthday Cards Grid */}
        {birthdaysThisMonth.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedBirthdays.map((birthday, index) => {
              const isToday = birthday.day === currentDay;

              return (
                <motion.div
                  key={birthday.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`overflow-hidden border-2 transition-all ${
                      isToday
                        ? 'ring-4 ring-yellow-400'
                        : ''
                    }`}
                    style={{
                      borderColor: isToday
                        ? '#facc15'
                        : seasonData.colors.primary,
                      backgroundColor: isToday
                        ? '#fef9c3'
                        : seasonData.colors.card,
                    }}
                  >
                    <motion.div
                      className="p-5"
                      animate={isToday ? { scale: [1, 1.02, 1] } : {}}
                      transition={
                        isToday
                          ? { duration: 2, repeat: Infinity }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: isToday
                              ? '#facc15'
                              : seasonData.colors.primary,
                          }}
                          animate={
                            isToday
                              ? { rotate: [0, 10, -10, 0] }
                              : {}
                          }
                          transition={
                            isToday
                              ? { duration: 1, repeat: Infinity }
                              : {}
                          }
                        >
                          {isToday ? (
                            <Cake className="h-7 w-7 text-white" />
                          ) : (
                            <Gift className="h-7 w-7 text-white" />
                          )}
                        </motion.div>

                        <div className="flex-1">
                          <h4
                            className="text-xl font-bold"
                            style={{
                              color: isToday
                                ? '#854d0e'
                                : seasonData.colors.text,
                            }}
                          >
                            {birthday.name}
                          </h4>
                          <div
                            className="flex items-center gap-1 text-sm font-medium opacity-70"
                            style={{
                              color: isToday
                                ? '#854d0e'
                                : seasonData.colors.text,
                            }}
                          >
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {birthday.day} de {monthNames[birthday.month - 1]}
                            </span>
                          </div>
                        </div>

                        {isToday && (
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            <PartyPopper className="h-8 w-8 text-yellow-600" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card
            className="p-8 text-center"
            style={{ backgroundColor: seasonData.colors.card }}
          >
            <CalendarDays
              className="mx-auto mb-4 h-16 w-16 opacity-30"
              style={{ color: seasonData.colors.primary }}
            />
            <p
              className="text-lg font-medium"
              style={{ color: seasonData.colors.text }}
            >
              No hay cumpleaños en {monthNames[currentMonth - 1]}
            </p>
          </Card>
        )}
      </motion.div>
    </section>
  );
}

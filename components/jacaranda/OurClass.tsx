'use client';

import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';
import { students } from '@/lib/constants/students';
import { teacher } from '@/lib/constants/teacher';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-pink-400',
    'bg-rose-400',
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-400',
    'bg-yellow-400',
    'bg-lime-400',
    'bg-green-400',
    'bg-emerald-400',
    'bg-teal-400',
    'bg-cyan-400',
    'bg-sky-400',
    'bg-blue-400',
    'bg-indigo-400',
    'bg-violet-400',
    'bg-purple-400',
    'bg-fuchsia-400',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export function OurClass() {
  const { seasonData } = useSeason();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        {/* Class Photo + Teacher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:w-fit md:mx-auto"
        >
          {/* Foto de clase */}
          <div>
            <div
              className="inline-block overflow-hidden rounded-2xl border-4 shadow-xl"
              style={{ borderColor: seasonData.colors.primary }}
            >
              <img
                src="/images/foto-clase.png"
                alt="Foto de clase de 3º de Infantil del Colegio Jacaranda"
                className="block"
                style={{ maxHeight: '450px', width: 'auto' }}
              />
            </div>
          </div>

          {/* Tarjeta profesora */}
          <Card
            className="overflow-hidden border-4 shadow-xl md:w-56"
            style={{ borderColor: seasonData.colors.primary, backgroundColor: seasonData.colors.card }}
          >
            <div className="flex h-full flex-col items-center justify-center p-4 text-center">
              <motion.div whileHover={{ scale: 1.05 }} className="relative mb-3">
                <img
                  src="/images/profesora.png"
                  alt="Profesora Patricia"
                  className="h-20 w-20 rounded-full object-cover shadow-lg"
                  style={{ border: `4px solid ${seasonData.colors.primary}` }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart
                    className="h-7 w-7"
                    style={{ color: seasonData.colors.accent }}
                    fill={seasonData.colors.accent}
                  />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-bold" style={{ color: seasonData.colors.text }}>
                {teacher.name}
              </h3>
              <p className="text-sm font-medium opacity-80" style={{ color: seasonData.colors.text }}>
                {teacher.role}
              </p>
              <p className="mt-1 text-xs opacity-60" style={{ color: seasonData.colors.text }}>
                Colegio Jacaranda
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Students Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center justify-center gap-2"
        >
          <Users
            className="h-6 w-6"
            style={{ color: seasonData.colors.primary }}
          />
          <span
            className="text-lg font-semibold"
            style={{ color: seasonData.colors.text }}
          >
            {students.length} alumnos
          </span>
        </motion.div>

        {/* Students Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {students.map((student) => (
            <motion.div
              key={student}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center"
            >
              <Card
                className="w-full border-2 p-3 transition-shadow hover:shadow-lg"
                style={{
                  borderColor: seasonData.colors.card,
                  backgroundColor: seasonData.colors.card,
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                    <AvatarFallback
                      className={`text-lg font-bold text-white ${getColorFromName(student)}`}
                    >
                      {getInitials(student)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="line-clamp-2 text-center text-xs font-semibold sm:text-sm"
                    style={{ color: seasonData.colors.text }}
                  >
                    {student}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SeasonProvider, useSeason } from '@/lib/context/SeasonContext';
import {
  Header,
  Navigation,
  WeatherAdvisor,
  EncargadoPicker,
  BirthdayBoard,
  Riddles,
  OurClass,
  LandingPage,
  LearnEnglish,
  LearnNumbers,
  LearnSyllables,
} from '@/components/jacaranda';

function JacarandaContent() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState('weather');
  const { seasonData } = useSeason();

  const sections: Record<string, React.ReactNode> = {
    weather: <WeatherAdvisor />,
    encargado: <EncargadoPicker />,
    birthdays: <BirthdayBoard />,
    riddles: <Riddles />,
    class: <OurClass />,
    english: <LearnEnglish />,
    numbers: <LearnNumbers />,
    syllables: <LearnSyllables />,
  };

  const handleEnter = (section?: string) => {
    if (section) {
      setActiveSection(section);
    }
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: seasonData.colors.background }}
    >
      <Header onLogoClick={() => setShowLanding(true)} />
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {sections[activeSection]}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

export default function Home() {
  return (
    <SeasonProvider>
      <JacarandaContent />
    </SeasonProvider>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudSun,
  Users,
  Cake,
  HelpCircle,
  School,
  Star,
  Menu,
  X,
  BookOpen,
  ChevronDown,
  Globe,
  Hash,
  Type,
} from 'lucide-react';
import { useSeason } from '@/lib/context/SeasonContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: typeof CloudSun;
}

const navItems: NavItem[] = [
  { id: 'class', label: 'Nuestra Clase', icon: School },
  { id: 'encargado', label: 'Encargado', icon: Star },
  { id: 'riddles', label: 'Adivinanzas', icon: HelpCircle },
  { id: 'birthdays', label: 'Cumpleaños', icon: Cake },
  { id: 'weather', label: 'El Tiempo', icon: CloudSun },
];

const learnSubItems = [
  { id: 'english', label: 'Inglés', icon: Globe },
  { id: 'numbers', label: 'Números', icon: Hash },
  { id: 'syllables', label: 'Sílabas', icon: Type },
];

const learnIds = new Set(learnSubItems.map((i) => i.id));

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({
  activeSection,
  onSectionChange,
}: NavigationProps) {
  const { seasonData } = useSeason();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnMenuOpen, setLearnMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const isLearnActive = learnIds.has(activeSection);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLearnMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="sticky top-20 z-30 hidden border-b-2 shadow-sm md:block"
        style={{
          backgroundColor: seasonData.colors.background,
          borderColor: seasonData.colors.card,
        }}
      >
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-2 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => onSectionChange(item.id)}
                    className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: isActive
                        ? seasonData.colors.primary
                        : 'transparent',
                      color: isActive ? 'white' : seasonData.colors.text,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{ backgroundColor: seasonData.colors.primary }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </li>
              );
            })}

            {/* Vamos a Aprender dropdown */}
            <li ref={dropdownRef} className="relative">
              <motion.button
                onClick={() => setLearnMenuOpen((prev) => !prev)}
                className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                style={{
                  backgroundColor: isLearnActive
                    ? seasonData.colors.primary
                    : 'transparent',
                  color: isLearnActive ? 'white' : seasonData.colors.text,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>Vamos a Aprender</span>
                <motion.span
                  animate={{ rotate: learnMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
                {isLearnActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ backgroundColor: seasonData.colors.primary }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {learnMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full z-50 mt-2 w-44 -translate-x-1/2 rounded-2xl border-2 p-2 shadow-xl"
                    style={{
                      backgroundColor: seasonData.colors.card,
                      borderColor: seasonData.colors.primary,
                    }}
                  >
                    {learnSubItems.map((sub) => {
                      const isSubActive = activeSection === sub.id;
                      const SubIcon = sub.icon;
                      return (
                        <motion.button
                          key={sub.id}
                          onClick={() => {
                            onSectionChange(sub.id);
                            setLearnMenuOpen(false);
                          }}
                          whileTap={{ scale: 0.96 }}
                          whileHover={{ scale: 1.03 }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: isSubActive
                              ? seasonData.colors.primary
                              : 'transparent',
                            color: isSubActive ? 'white' : seasonData.colors.text,
                          }}
                        >
                          <SubIcon className="h-4 w-4" />
                          <span>{sub.label}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          style={{ backgroundColor: seasonData.colors.primary }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-4 bottom-20 z-40 rounded-2xl border-2 p-4 shadow-xl md:hidden"
            style={{
              backgroundColor: seasonData.colors.card,
              borderColor: seasonData.colors.primary,
            }}
          >
            <ul className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <motion.button
                      onClick={() => {
                        onSectionChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                      style={{
                        backgroundColor: isActive
                          ? seasonData.colors.primary
                          : seasonData.colors.background,
                        color: isActive ? 'white' : seasonData.colors.text,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  </li>
                );
              })}

              {/* Vamos a Aprender header (mobile) */}
              <li className="col-span-2">
                <div
                  className="flex items-center gap-2 px-2 py-1 text-xs font-bold uppercase tracking-wider opacity-60"
                  style={{ color: seasonData.colors.text }}
                >
                  <BookOpen className="h-3 w-3" />
                  Vamos a Aprender
                </div>
              </li>

              {learnSubItems.map((sub) => {
                const isSubActive = activeSection === sub.id;
                const SubIcon = sub.icon;
                return (
                  <li key={sub.id}>
                    <motion.button
                      onClick={() => {
                        onSectionChange(sub.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                      style={{
                        backgroundColor: isSubActive
                          ? seasonData.colors.primary
                          : seasonData.colors.background,
                        color: isSubActive ? 'white' : seasonData.colors.text,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SubIcon className="h-5 w-5" />
                      <span>{sub.label}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { students } from '@/lib/constants/students';

interface EncargadoState {
  current: string | null;
  usedStudents: string[];
  isSpinning: boolean;
}

const STORAGE_KEY = 'jacaranda-encargado';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useEncargado() {
  const [state, setState] = useState<EncargadoState>({
    current: null,
    usedStudents: [],
    isSpinning: false,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState({
          current: parsed.current ?? null,
          usedStudents: parsed.usedStudents ?? [],
          isSpinning: false,
        });
      } catch {
        // Invalid JSON, start fresh
      }
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (state.current !== null || state.usedStudents.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          current: state.current,
          usedStudents: state.usedStudents,
        })
      );
    }
  }, [state.current, state.usedStudents]);

  const selectNextEncargado = useCallback(() => {
    setState((prev) => ({ ...prev, isSpinning: true }));

    // Simulate spinning animation delay
    setTimeout(() => {
      setState((prev) => {
        let availableStudents = students.filter(
          (s) => !prev.usedStudents.includes(s)
        );

        // If all students have been used, reset the cycle
        if (availableStudents.length === 0) {
          availableStudents = students;
          return {
            current: shuffleArray(availableStudents)[0],
            usedStudents: [shuffleArray(availableStudents)[0]],
            isSpinning: false,
          };
        }

        const selected = shuffleArray(availableStudents)[0];
        return {
          current: selected,
          usedStudents: [...prev.usedStudents, selected],
          isSpinning: false,
        };
      });
    }, 2000);
  }, []);

  const resetCycle = useCallback(() => {
    setState({
      current: null,
      usedStudents: [],
      isSpinning: false,
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const remainingCount = students.length - state.usedStudents.length;
  const isComplete = state.usedStudents.length === students.length;

  return {
    currentEncargado: state.current,
    usedStudents: state.usedStudents,
    remainingCount,
    isComplete,
    isSpinning: state.isSpinning,
    selectNextEncargado,
    resetCycle,
    totalStudents: students.length,
  };
}

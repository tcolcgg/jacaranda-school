import { Flower2, Sun, Leaf, Snowflake, type LucideIcon } from 'lucide-react';

export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Season {
  id: SeasonType;
  label: string;
  description: string;
  icon: LucideIcon;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
  };
}

export const seasons: Season[] = [
  {
    id: 'spring',
    label: 'Primavera',
    description: 'Las flores florecen y los pajaritos cantan',
    icon: Flower2,
    colors: {
      primary: '#ec4899', // pink-500
      secondary: '#a855f7', // purple-500
      accent: '#22c55e', // green-500
      background: '#fdf2f8', // pink-50
      card: '#fce7f3', // pink-100
      text: '#831843', // pink-900
    },
  },
  {
    id: 'summer',
    label: 'Verano',
    description: 'Hace calor y vamos a la playa',
    icon: Sun,
    colors: {
      primary: '#f59e0b', // amber-500
      secondary: '#ef4444', // red-500
      accent: '#06b6d4', // cyan-500
      background: '#fffbeb', // amber-50
      card: '#fef3c7', // amber-100
      text: '#78350f', // amber-900
    },
  },
  {
    id: 'autumn',
    label: 'Otoño',
    description: 'Las hojas caen de los arboles',
    icon: Leaf,
    colors: {
      primary: '#ea580c', // orange-600
      secondary: '#b45309', // amber-700
      accent: '#65a30d', // lime-600
      background: '#fff7ed', // orange-50
      card: '#ffedd5', // orange-100
      text: '#7c2d12', // orange-900
    },
  },
  {
    id: 'winter',
    label: 'Invierno',
    description: 'Hace frio y cae la nieve',
    icon: Snowflake,
    colors: {
      primary: '#3b82f6', // blue-500
      secondary: '#6366f1', // indigo-500
      accent: '#06b6d4', // cyan-500
      background: '#eff6ff', // blue-50
      card: '#dbeafe', // blue-100
      text: '#1e3a8a', // blue-900
    },
  },
];

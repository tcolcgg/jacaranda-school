import { Sun, Cloud, CloudRain, Wind, type LucideIcon } from 'lucide-react';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'windy';

export interface WeatherOption {
  id: WeatherType;
  label: string;
  icon: LucideIcon;
  message: string;
  advice: string;
  color: string;
  bgColor: string;
}

export const weatherOptions: WeatherOption[] = [
  {
    id: 'sunny',
    label: 'Sol',
    icon: Sun,
    message: '¡Hoy hace un día soleado y bonito!',
    advice: 'Recuerda llevar gorra y beber mucha agua.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'cloudy',
    label: 'Nube',
    icon: Cloud,
    message: 'Hoy el cielo está nublado.',
    advice: 'Puede que llueva, lleva una chaqueta por si acaso.',
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
  },
  {
    id: 'rainy',
    label: 'Lluvia',
    icon: CloudRain,
    message: '¡Hoy llueve! Escucha cómo caen las gotas.',
    advice: 'No olvides el paraguas y las botas de agua.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'windy',
    label: 'Viento',
    icon: Wind,
    message: '¡Hoy hace mucho viento! ¡Cuidado con los sombreros!',
    advice: 'Abrígate bien y sujeta tu gorro.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
];

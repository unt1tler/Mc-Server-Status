import { type Theme } from './types';

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
    bgGradient: 'from-gray-900 via-purple-900 to-violet-900',
    cardBg: 'bg-white/10',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    accent: 'purple'
  },
  {
    id: 'light',
    name: 'Light',
    bgGradient: 'from-gray-50 via-purple-50 to-violet-50',
    cardBg: 'bg-white/80',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'purple'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    bgGradient: 'from-orange-900 via-red-800 to-pink-900',
    cardBg: 'bg-white/10',
    textPrimary: 'text-white',
    textSecondary: 'text-orange-100',
    accent: 'orange'
  },
  {
    id: 'forest',
    name: 'Forest',
    bgGradient: 'from-green-900 via-emerald-800 to-teal-900',
    cardBg: 'bg-white/10',
    textPrimary: 'text-white',
    textSecondary: 'text-green-100',
    accent: 'emerald'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    bgGradient: 'from-blue-900 via-cyan-800 to-indigo-900',
    cardBg: 'bg-white/10',
    textPrimary: 'text-white',
    textSecondary: 'text-blue-100',
    accent: 'blue'
  }
];
import { ThemeColors, ThemeId } from '../types';

export const SLIDE_THEMES: Record<ThemeId, ThemeColors> = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimal Light',
    nameUz: 'Minimal Oq',
    nameRu: 'Минимал Светлый',
    bgGradient: 'from-slate-50 via-gray-100 to-slate-200',
    cardBg: 'bg-white/95',
    cardBorder: 'border-slate-200',
    primary: '#0f172a', // Slate 900
    accent: '#2563eb', // Blue 600
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    pptx: {
      bg: 'F8FAFC',
      cardBg: 'FFFFFF',
      cardBorder: 'E2E8F0',
      primary: '0F172A',
      accent: '2563EB',
      text: '0F172A',
      textMuted: '64748B'
    }
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Dark',
    nameUz: 'Tungi Qora',
    nameRu: 'Ночной Черный',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80',
    primary: '#6366f1', // Indigo 500
    accent: '#a855f7', // Purple 500
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    pptx: {
      bg: '0B0F19',
      cardBg: '161F30',
      cardBorder: '1E293B',
      primary: '6366F1',
      accent: 'A855F7',
      text: 'FFFFFF',
      textMuted: '94A3B8'
    }
  },
  indigo: {
    id: 'indigo',
    name: 'Royal Business',
    nameUz: 'Biznes Ko\'k',
    nameRu: 'Королевский Синий',
    bgGradient: 'from-blue-950 via-slate-900 to-sky-950',
    cardBg: 'bg-blue-950/70',
    cardBorder: 'border-blue-800/60',
    primary: '#38bdf8', // Sky 400
    accent: '#60a5fa', // Blue 400
    textPrimary: 'text-white',
    textSecondary: 'text-blue-100/80',
    pptx: {
      bg: '081B33',
      cardBg: '0F2D54',
      cardBorder: '1E3A8A',
      primary: '38BDF8',
      accent: '60A5FA',
      text: 'FFFFFF',
      textMuted: '93C5FD'
    }
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Nature',
    nameUz: 'Zumrad Yashil',
    nameRu: 'Изумрудный Зеленый',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    cardBg: 'bg-emerald-950/70',
    cardBorder: 'border-emerald-800/60',
    primary: '#34d399', // Emerald 400
    accent: '#10b981', // Emerald 500
    textPrimary: 'text-white',
    textSecondary: 'text-emerald-100/80',
    pptx: {
      bg: '062419',
      cardBg: '0D3B2C',
      cardBorder: '065F46',
      primary: '34D399',
      accent: '10B981',
      text: 'FFFFFF',
      textMuted: 'A7F3D0'
    }
  },
  crimson: {
    id: 'crimson',
    name: 'Sunset Pitch',
    nameUz: 'Qizil Sunset',
    nameRu: 'Закат Стартап',
    bgGradient: 'from-rose-950 via-slate-950 to-amber-950',
    cardBg: 'bg-rose-950/60',
    cardBorder: 'border-rose-900/60',
    primary: '#fb7185', // Rose 400
    accent: '#f59e0b', // Amber 500
    textPrimary: 'text-white',
    textSecondary: 'text-rose-100/80',
    pptx: {
      bg: '1F0A10',
      cardBg: '38131E',
      cardBorder: '881337',
      primary: 'FB7185',
      accent: 'F59E0B',
      text: 'FFFFFF',
      textMuted: 'FECDD3'
    }
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyber Neon',
    nameUz: 'Kiber Neon',
    nameRu: 'Кибер Неон',
    bgGradient: 'from-violet-950 via-purple-950 to-fuchsia-950',
    cardBg: 'bg-purple-950/70',
    cardBorder: 'border-fuchsia-700/60',
    primary: '#22d3ee', // Cyan 400
    accent: '#f43f5e', // Rose 500
    textPrimary: 'text-white',
    textSecondary: 'text-purple-100/80',
    pptx: {
      bg: '130826',
      cardBg: '2A124E',
      cardBorder: '581C87',
      primary: '22D3EE',
      accent: 'F43F5E',
      text: 'FFFFFF',
      textMuted: 'E9D5FF'
    }
  }
};

export type Language = 'uz' | 'ru' | 'en';

export type AudienceType = 'student' | 'business' | 'academic' | 'speaker';

export type SlideLayout = 
  | 'title'       // Sarlavha slaydi
  | 'bullets'     // Asosiy fikrlar ro'yxati
  | 'stats'       // Katta raqamlar va statistika
  | 'compare'     // Solishtirma 2-ustun
  | 'timeline'    // Bosqichlar yoki vaqt xaritasi
  | 'quote'       // Iqtibos yoki asosiy shior
  | 'conclusion'; // Xulosa va keyingi qadamlar

export type VisualMode = 'ai_graphic' | 'photo' | 'ai_image';

export interface SlideStat {
  value: string;
  label: string;
  trend?: string;
}

export interface SlideCompare {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export interface SlideTimelineItem {
  step: string;
  title: string;
  description: string;
}

export interface SlideQuote {
  text: string;
  author: string;
  role?: string;
}

export interface SlideConclusion {
  mainMessage: string;
  takeaways: string[];
  callToAction: string;
  contact?: string;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  badge?: string;
  points?: string[];
  stats?: SlideStat[];
  compare?: SlideCompare;
  timeline?: SlideTimelineItem[];
  quote?: SlideQuote;
  conclusion?: SlideConclusion;
  imageUrl?: string;
  visualMode?: VisualMode; // 'ai_graphic' (Minimalist AI vector visual) or 'photo' (HD curated photo)
  showImage?: boolean;
  selected?: boolean; // For page selection
  imageSide?: 'left' | 'right'; // Visual placement — varies per slide for design diversity
  speakerNotes?: string;
}

export type ThemeId = 'midnight' | 'minimalist' | 'indigo' | 'emerald' | 'crimson' | 'cyberpunk';

export interface ThemeColors {
  id: ThemeId;
  name: string;
  nameUz: string;
  nameRu: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  primary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  pptx: {
    bg: string;
    cardBg: string;
    cardBorder?: string;
    primary: string;
    accent: string;
    text: string;
    textMuted: string;
  };
}

export interface Presentation {
  id: string;
  title: string;
  subtitle?: string;
  topic: string;
  language: Language;
  theme: ThemeId;
  audience: AudienceType;
  slides: Slide[];
  createdAt: string;
}

export interface GenerateOptions {
  topic: string;
  language: Language;
  slideCount: number;
  audience: AudienceType;
  theme: ThemeId;
  apiKey?: string;
  additionalInfo?: string;
}

import { Language } from '../types';

export const TRANSLATIONS: Record<Language, {
  appName: string;
  tagline: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroDesc: string;
  topicPlaceholder: string;
  slideCountLabel: string;
  audienceLabel: string;
  languageLabel: string;
  themeLabel: string;
  generateBtn: string;
  generatingBtn: string;
  samplesTitle: string;
  exportPptx: string;
  exportPdf: string;
  presentMode: string;
  editSlide: string;
  addSlide: string;
  deleteSlide: string;
  duplicateSlide: string;
  slideOf: string;
  freeBadge: string;
  noApiKeyRequired: string;
  apiKeyModalTitle: string;
  apiKeyModalDesc: string;
  apiKeyPlaceholder: string;
  saveApiKey: string;
  clearApiKey: string;
  apiKeyOptional: string;
  audiences: {
    student: string;
    business: string;
    academic: string;
    speaker: string;
  };
  sampleTopics: string[];
  notesLabel: string;
  copiedNotice: string;
  fullScreenHint: string;
  regenerateSlide: string;
}> = {
  uz: {
    appName: 'SlaydAI',
    tagline: 'Sun\'iy intellekt yordamida bir zumda tayyor slaydlar',
    heroBadge: '✨ 100% Bepul & Cheklovsiz Slayd Yaratish',
    heroTitle1: 'Mavzuni kiriting,',
    heroTitleHighlight: 'Mukammal Slayd',
    heroTitle2: 'tayyor bo\'lsin!',
    heroDesc: 'O\'zbekcha, Ruscha va Inglizcha tillarda professional taqdimotlar yarating. PowerPoint (.pptx) formatida bepul yuklab oling.',
    topicPlaceholder: 'Mavzuni kiriting... (masalan: "Sun\'iy intellekt tibbiyotda", "Startap pitch", "Ekologiya muammolari")',
    slideCountLabel: 'Slaydlar soni',
    audienceLabel: 'Auditoriya turi',
    languageLabel: 'Taqdimot tili',
    themeLabel: 'Dizayn mavzusi',
    generateBtn: '✨ Slaydlarni Yaratish (Bepul)',
    generatingBtn: 'Slaydlar yaratilmoqda...',
    samplesTitle: 'Ommabop mavzular:',
    exportPptx: 'PowerPoint (.pptx) yuklab olish',
    exportPdf: 'Chop etish / PDF',
    presentMode: 'Taqdimot rejimi',
    editSlide: 'Matnni to\'g\'ridan-to\'g\'ri tahrirlash mumkin',
    addSlide: 'Yangi slayd qo\'shish',
    deleteSlide: 'Slaydni o\'chirish',
    duplicateSlide: 'Nusxa olish',
    slideOf: 'slayd / jami',
    freeBadge: 'Tekin',
    noApiKeyRequired: 'API kalitsiz ham 100% ishlaydi',
    apiKeyModalTitle: 'Google Gemini API Sozlamalari',
    apiKeyModalDesc: 'Ilova sukut bo\'yicha bepul AI server orqali ishlaydi. Agar o\'zingizning bepul Google Gemini API kalitingizdan foydalanmoqchi bo\'lsangiz, uni shu yerga kiritishingiz mumkin.',
    apiKeyPlaceholder: 'AIzaSy...',
    saveApiKey: 'Saqlash',
    clearApiKey: 'Tozalash',
    apiKeyOptional: '(Ixtiyoriy)',
    audiences: {
      student: 'Maktab / Talabalar',
      business: 'Biznes / Startap',
      academic: 'Ilmiy / Anjuman',
      speaker: 'Notiqlik / Motivatsion'
    },
    sampleTopics: [
      'Sun\'iy intellektning tibbiyotdagi inqilobi',
      'O\'zbekiston IT ekotizimi va startaplar',
      'Yashil energiya: Quyosh va shamol kelajagi',
      'Biznesda samarali vaqt boshqaruvi (Time Management)'
    ],
    notesLabel: 'Ma\'ruzachi eslatmalari',
    copiedNotice: 'Nusxalandi!',
    fullScreenHint: 'Keyingi slayd uchun Space / O\'ng strelka, chiqish uchun ESC tugmasini bosing',
    regenerateSlide: 'Qayta generatsiya qilish'
  },
  ru: {
    appName: 'SlaydAI',
    tagline: 'Мгновенное создание презентаций с искусственным интеллектом',
    heroBadge: '✨ 100% Бесплатно и Без ограничений',
    heroTitle1: 'Введите тему — получите',
    heroTitleHighlight: 'Идеальные Слайды',
    heroTitle2: 'за секунды!',
    heroDesc: 'Создавайте презентации на русском, узбекском и английском языках. Скачивайте напрямую в формате PowerPoint (.pptx).',
    topicPlaceholder: 'Введите тему... (например: "Искусственный интеллект в медицине", "Pitch Deck для стартапа", "Финансовая грамотность")',
    slideCountLabel: 'Количество слайдов',
    audienceLabel: 'Аудитория',
    languageLabel: 'Язык презентации',
    themeLabel: 'Тема оформления',
    generateBtn: '✨ Создать слайды (Бесплатно)',
    generatingBtn: 'Создание презентации...',
    samplesTitle: 'Популярные темы:',
    exportPptx: 'Скачать PowerPoint (.pptx)',
    exportPdf: 'Печать / PDF',
    presentMode: 'Режим показа',
    editSlide: 'Кликните на любой текст для редактирования',
    addSlide: 'Добавить слайд',
    deleteSlide: 'Удалить слайд',
    duplicateSlide: 'Дублировать',
    slideOf: 'слайд из',
    freeBadge: 'Бесплатно',
    noApiKeyRequired: 'Работает 100% без API-ключа',
    apiKeyModalTitle: 'Настройки Google Gemini API',
    apiKeyModalDesc: 'Приложение по умолчанию использует бесплатный AI сервер. При желании вы можете указать собственный ключ Google Gemini API.',
    apiKeyPlaceholder: 'AIzaSy...',
    saveApiKey: 'Сохранить',
    clearApiKey: 'Очистить',
    apiKeyOptional: '(Опционально)',
    audiences: {
      student: 'Студенты / Школа',
      business: 'Бизнес / Стартап',
      academic: 'Научная / Конференция',
      speaker: 'Выступление / Мотивация'
    },
    sampleTopics: [
      'Революция искусственного интеллекта в медицине',
      'Цифровой маркетинг и тренды 2026 года',
      'Зеленая энергетика: будущее возобновляемых источников',
      'Эффективный тайм-менеджмент для лидеров'
    ],
    notesLabel: 'Заметки докладчика',
    copiedNotice: 'Скопировано!',
    fullScreenHint: 'Используйте стрелки вправо/влево или пробел, выход — ESC',
    regenerateSlide: 'Сгенерировать заново'
  },
  en: {
    appName: 'SlaydAI',
    tagline: 'Instant AI-Powered Presentation Generator',
    heroBadge: '✨ 100% Free & Unlimited Presentation Maker',
    heroTitle1: 'Enter your topic, get',
    heroTitleHighlight: 'Stunning Slides',
    heroTitle2: 'in seconds!',
    heroDesc: 'Generate presentations in Uzbek, Russian, and English. Export directly to PowerPoint (.pptx) with modern visuals.',
    topicPlaceholder: 'Enter any topic... (e.g., "AI in Healthcare", "Startup Pitch Deck", "Renewable Energy Future")',
    slideCountLabel: 'Slide count',
    audienceLabel: 'Target audience',
    languageLabel: 'Presentation language',
    themeLabel: 'Visual theme',
    generateBtn: '✨ Generate Slides (Free)',
    generatingBtn: 'Generating presentation...',
    samplesTitle: 'Trending topics:',
    exportPptx: 'Download PowerPoint (.pptx)',
    exportPdf: 'Print / PDF',
    presentMode: 'Present Mode',
    editSlide: 'Click on any text to edit directly',
    addSlide: 'Add Slide',
    deleteSlide: 'Delete Slide',
    duplicateSlide: 'Duplicate',
    slideOf: 'slide of',
    freeBadge: 'Free',
    noApiKeyRequired: 'Works 100% free with no API key',
    apiKeyModalTitle: 'Google Gemini API Settings',
    apiKeyModalDesc: 'By default, SlaydAI uses our built-in free AI engine. You can optionally provide your own Google Gemini API key.',
    apiKeyPlaceholder: 'AIzaSy...',
    saveApiKey: 'Save',
    clearApiKey: 'Clear',
    apiKeyOptional: '(Optional)',
    audiences: {
      student: 'Students / Academic',
      business: 'Business / Pitch Deck',
      academic: 'Research / Conference',
      speaker: 'Keynote / Motivational'
    },
    sampleTopics: [
      'The Revolution of AI in Modern Medicine',
      'Digital Marketing & Growth Strategies 2026',
      'The Future of Clean & Renewable Energy',
      'High-Impact Leadership & Time Mastery'
    ],
    notesLabel: 'Speaker Notes',
    copiedNotice: 'Copied to clipboard!',
    fullScreenHint: 'Use Left/Right arrow keys or Space, ESC to exit presentation',
    regenerateSlide: 'Regenerate'
  }
};

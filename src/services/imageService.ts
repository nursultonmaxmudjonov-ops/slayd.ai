// Professional Curated Image and Visual Engine
// 100% Reliable, Zero Watermarks, Instant CDN Delivery

export type VisualCategory = 
  | 'ai' 
  | 'business' 
  | 'medicine' 
  | 'ecology' 
  | 'education' 
  | 'history' 
  | 'sport' 
  | 'solar' 
  | 'general';

interface PhotoCollection {
  photos: string[];
}

const CATEGORY_PHOTOS: Record<VisualCategory, PhotoCollection> = {
  // 1. Sun'iy intellekt, IT, Texnologiya, Robototexnika, Dasturlash
  ai: {
    photos: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80', // Neural network AI
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // 3D abstract waves
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', // Modern robotic concept
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Futuristic chip
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'  // Cyber digital grid
    ]
  },

  // 2. Biznes, Startap, Moliya, Vaqt boshqaruvi, Liderlik
  business: {
    photos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', // Modern architecture tower
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80', // Business meeting & strategy
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', // Financial analytics & charts
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', // Executive leadership
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'  // Modern corporate workspace
    ]
  },

  // 3. Tibbiyot, Salomatlik, Shifoxona, Vrach, Biologiya
  medicine: {
    photos: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', // Lab diagnostics & science
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80', // Digital doctor & healthcare
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80', // DNA helix
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'  // Modern clinic & research
    ]
  },

  // 4. Yashil energiya, Ekologiya, Tabiat, Iqlim
  ecology: {
    photos: [
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80', // Green forest & sunlight
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', // Wind turbines
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80', // Clean solar panels
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'  // Pristine lake & nature
    ]
  },

  // 5. Talaba, Maktab, Ilm, Ta'lim, Universitet
  education: {
    photos: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // Students team
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80', // Library and books
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', // Scientific research
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'  // Learning and notebook
    ]
  },

  // 6. Tarix, Madaniyat, Arxeologiya, O'zbekiston obidalari
  history: {
    photos: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80', // Registan Samarkand mosaic dome
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Ancient historical monuments
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80', // Ancient manuscripts & archives
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80'  // Classical museum columns
    ]
  },

  // 7. Sport, Futbol, Fitness, Salomat turmush
  sport: {
    photos: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', // Football soccer stadium
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', // Running athlete track
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80', // Fitness gym workout
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'  // Sports arena
    ]
  },

  // 8. FAQAT Koinot, Quyosh, Astronomiya, Kosmos (Quyosh haqidagi maxsus taqdimotlar)
  solar: {
    photos: [
      'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=1200&q=80', // Solar flare / Sun
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80', // Galaxy nebula
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // Earth and solar sunrise
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80'  // Orbit in space
    ]
  },

  // 9. Umumiy professional minimal abstrakt (default)
  general: {
    photos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80'
    ]
  }
};

/**
 * Intelligent topic category classifier
 * Prevents false-positives between Uzbek "sun'iy" (artificial) and English "sun" (solar)!
 */
export function detectCategory(text: string): VisualCategory {
  let clean = text.toLowerCase();

  // Strip generic boilerplate subtitles so they don't skew the topic
  clean = clean
    .replace(/sun['’`]?iy\s+intellekt\s+tomonidan\s+yaratilgan.*/gi, '')
    .replace(/professional\s+presentation\s+generated\s+by.*/gi, '')
    .replace(/созданная\s+искусственным\s+интеллектом.*/gi, '');

  // 1. FIRST: Check AI, Tech, IT, Robotics (Crucial: checks BEFORE solar!)
  const isAI = 
    clean.includes("sun'iy") ||
    clean.includes("suniy") ||
    clean.includes("intellekt") ||
    clean.includes("нейрон") ||
    clean.includes("робот") ||
    clean.includes("искусствен") ||
    clean.includes("интеллект") ||
    clean.includes("программ") ||
    clean.includes("технолог") ||
    clean.includes("dastur") ||
    clean.includes("kiber") ||
    /\b(ai|ml|gpt|robot|it|software|hardware|cyber|tech|code|coding|algorithm|data|digital)\b/i.test(clean);

  if (isAI) {
    return 'ai';
  }

  // 2. History, Culture & Heritage
  const isHistory =
    clean.includes('tarix') ||
    clean.includes('o\'tmish') ||
    clean.includes('otmish') ||
    clean.includes('madaniyat') ||
    clean.includes('meros') ||
    clean.includes('qadim') ||
    clean.includes('obida') ||
    clean.includes('temur') ||
    clean.includes('samarqand') ||
    clean.includes('buxoro') ||
    clean.includes('xiva') ||
    clean.includes('sivilizats') ||
    clean.includes('arxeolog') ||
    clean.includes('истори') ||
    clean.includes('культур') ||
    clean.includes('наследи') ||
    clean.includes('древн') ||
    /\b(history|heritage|ancient|culture|monument|museum|civilization)\b/i.test(clean);

  if (isHistory) {
    return 'history';
  }

  // 3. Sport & Fitness
  const isSport =
    clean.includes('sport') ||
    clean.includes('futbol') ||
    clean.includes('mashg\'ulot') ||
    clean.includes('mashq') ||
    clean.includes('fitnes') ||
    clean.includes('atlet') ||
    clean.includes('yugur') ||
    clean.includes('chempion') ||
    clean.includes('olimpiada') ||
    clean.includes('спорт') ||
    clean.includes('футбол') ||
    clean.includes('трениров') ||
    clean.includes('фитнес') ||
    /\b(sport|sports|football|soccer|fitness|workout|athlete|champion)\b/i.test(clean);

  if (isSport) {
    return 'sport';
  }

  // 4. Medicine & Healthcare
  const isMedicine =
    clean.includes('tibbi') ||
    clean.includes('salomat') ||
    clean.includes('vrach') ||
    clean.includes('shifo') ||
    clean.includes('kasal') ||
    clean.includes('dori') ||
    clean.includes('biolog') ||
    clean.includes('dna') ||
    clean.includes('genetik') ||
    clean.includes('медицин') ||
    clean.includes('здоров') ||
    clean.includes('врач') ||
    clean.includes('больниц') ||
    /\b(medicine|medical|health|doctor|hospital|clinic|pharma|biology)\b/i.test(clean);

  if (isMedicine) {
    return 'medicine';
  }

  // 5. Business, Finance & Startups
  const isBusiness =
    clean.includes('biznes') ||
    clean.includes('startap') ||
    clean.includes('moliya') ||
    clean.includes('pul') ||
    clean.includes('daromad') ||
    clean.includes('boshqaruv') ||
    clean.includes('strateg') ||
    clean.includes('iqtisod') ||
    clean.includes('invest') ||
    clean.includes('marketing') ||
    clean.includes('reja') ||
    clean.includes('savdo') ||
    clean.includes('mijoz') ||
    clean.includes('бизнес') ||
    clean.includes('стартап') ||
    clean.includes('финанс') ||
    clean.includes('деньги') ||
    clean.includes('управлен') ||
    clean.includes('стратег') ||
    clean.includes('инвест') ||
    /\b(business|startup|finance|money|management|strategy|market|economy|sales)\b/i.test(clean);

  if (isBusiness) {
    return 'business';
  }

  // 6. Ecology & Nature
  const isEcology =
    clean.includes('ekolog') ||
    clean.includes('tabiat') ||
    clean.includes('yashil') ||
    clean.includes('atrof-muhit') ||
    clean.includes('iqlim') ||
    clean.includes('daraxt') ||
    clean.includes('o\'rmon') ||
    clean.includes('shamol') ||
    clean.includes('quyosh paneli') ||
    clean.includes('qayta tiklanuvchi') ||
    clean.includes('эколог') ||
    clean.includes('природ') ||
    clean.includes('климат') ||
    /\b(ecology|nature|green|climate|forest|eco|earth|environment|energy)\b/i.test(clean);

  if (isEcology) {
    return 'ecology';
  }

  // 7. Education & Science
  const isEducation =
    clean.includes('ta\'lim') ||
    clean.includes('talim') ||
    clean.includes('maktab') ||
    clean.includes('universitet') ||
    clean.includes('talaba') ||
    clean.includes('o\'quv') ||
    clean.includes('ilm') ||
    clean.includes('fan') ||
    clean.includes('dars') ||
    clean.includes('kitob') ||
    clean.includes('obrazovan') ||
    clean.includes('школ') ||
    clean.includes('студент') ||
    clean.includes('университет') ||
    clean.includes('наук') ||
    /\b(education|school|student|study|science|university|learning|book)\b/i.test(clean);

  if (isEducation) {
    return 'education';
  }

  // 8. SOLAR / SPACE (STRICTLY Astronomy! Never matches Uzbek 'sun'iy'!)
  const isSolar =
    clean.includes('quyosh') ||
    clean.includes('koinot') ||
    clean.includes('kosmos') ||
    clean.includes('yulduz') ||
    clean.includes('sayyora') ||
    clean.includes('galaktika') ||
    clean.includes('astronom') ||
    clean.includes('солнц') ||
    clean.includes('космос') ||
    clean.includes('планет') ||
    clean.includes('галактик') ||
    clean.includes('звезд') ||
    /\b(sun|solar|astronomy|cosmos|space|galaxy|planets|stars)\b/i.test(clean);

  if (isSolar) {
    return 'solar';
  }

  return 'general';
}

/**
 * AI-generated image via free Pollinations image API (no API key needed).
 * Builds a deterministic URL — the image is generated on-demand by the CDN.
 */
export function getAIImageUrl(prompt: string, seed: number = 0, wide: boolean = false): string {
  const text = encodeURIComponent(prompt.slice(0, 220));
  const w = wide ? 1280 : 1024;
  const h = wide ? 720 : 1024;
  const finalSeed = seed || Math.floor(Math.random() * 100000);
  return `https://image.pollinations.ai/prompt/${text}?width=${w}&height=${h}&seed=${finalSeed}&nologo=true&model=flux`;
}

/**
 * Auto theme suggestion based on the topic's detected category.
 * Chooses a background theme that matches the subject matter.
 */
export function suggestTheme(topic: string): 'midnight' | 'minimalist' | 'indigo' | 'emerald' | 'crimson' | 'cyberpunk' {
  const category = detectCategory(topic);
  switch (category) {
    case 'ai': return 'cyberpunk';
    case 'business': return 'indigo';
    case 'ecology': return 'emerald';
    case 'sport': return 'crimson';
    case 'solar': return 'midnight';
    case 'history': return 'midnight';
    case 'education': return 'minimalist';
    case 'medicine': return 'indigo';
    default: return 'midnight';
  }
}

export function getCleanImageUrl(topic: string, slideTitle: string = '', index: number = 0): string {
  // Extract category based on topic and slideTitle
  const category = detectCategory(`${topic} ${slideTitle}`);
  const collection = CATEGORY_PHOTOS[category] || CATEGORY_PHOTOS.general;
  const photoIndex = Math.abs(index) % collection.photos.length;
  return collection.photos[photoIndex];
}

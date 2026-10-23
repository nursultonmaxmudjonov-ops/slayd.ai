import React, { useState } from 'react';
import { 
  Slide, 
  ThemeColors, 
  SlideLayout, 
  Language,
  VisualMode
} from '../types';
import { 
  Plus, 
  Trash2, 
  MessageSquare, 
  Layout, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles, 
  Sparkle,
  Image as ImageIcon
} from 'lucide-react';
import { TRANSLATIONS } from '../locales/translations';
import { MinimalistAIVisual } from './MinimalistAIVisual';
import { getAIImageUrl } from '../services/imageService';

interface SlideCanvasProps {
  slide: Slide;
  theme: ThemeColors;
  language: Language;
  onUpdateSlide: (updatedSlide: Slide) => void;
  slideIndex: number;
  totalSlides: number;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  theme,
  language,
  onUpdateSlide,
  slideIndex,
  totalSlides
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const t = TRANSLATIONS[language];

  const updateTitle = (val: string) => onUpdateSlide({ ...slide, title: val });
  const updateSubtitle = (val: string) => onUpdateSlide({ ...slide, subtitle: val });
  const updateBadge = (val: string) => onUpdateSlide({ ...slide, badge: val });
  const updateNotes = (val: string) => onUpdateSlide({ ...slide, speakerNotes: val });

  // Toggle visual on/off
  const toggleVisual = () => {
    const willShow = slide.showImage === false ? true : false;
    onUpdateSlide({
      ...slide,
      showImage: willShow,
      visualMode: slide.visualMode || 'ai_graphic'
    });
  };

  // Switch visual mode: Minimalist AI Graphic vs HD Photo vs AI Generated Image
  const switchVisualMode = (mode: VisualMode) => {
    const updates: Partial<Slide> = {
      visualMode: mode,
      showImage: true
    };

    // If AI image requested but slide has no generated image yet, create one on the fly
    if (mode === 'ai_image' && !(slide.imageUrl || '').includes('pollinations.ai')) {
      updates.imageUrl = getAIImageUrl(
        `${slide.title} ${slide.subtitle || ''}, professional presentation illustration, high quality, detailed, no text`,
        slideIndex + 1,
        slide.layout === 'title'
      );
    }

    onUpdateSlide({ ...slide, ...updates });
  };

  const handleLayoutChange = (newLayout: SlideLayout) => {
    setShowLayoutMenu(false);
    if (newLayout === slide.layout) return;

    const updated: Slide = { ...slide, layout: newLayout };

    if (newLayout === 'bullets' && (!updated.points || updated.points.length === 0)) {
      updated.points = [
        'Birinchi asosiy fikr yoki omil',
        'Ikkinchi muhim jihat va dalil',
        'Uchinchi amaliy xulosa'
      ];
    } else if (newLayout === 'stats' && (!updated.stats || updated.stats.length === 0)) {
      updated.stats = [
        { value: '+85%', label: 'Samaradorlik', trend: 'Yillik' },
        { value: '3.4x', label: 'Tezlik', trend: 'O\'sish' },
        { value: '98%', label: 'Qoniqish', trend: 'Mijozlar' }
      ];
    } else if (newLayout === 'compare' && !updated.compare) {
      updated.compare = {
        leftTitle: 'Avvalgi holat',
        leftItems: ['Qo\'l mehnati', 'Sekin jarayon', 'Xatolar ehtimoli'],
        rightTitle: 'Yangi yondashuv',
        rightItems: ['Avtomatlashtirish', 'Tezkor natija', 'Yuqori aniqlik']
      };
    } else if (newLayout === 'timeline' && (!updated.timeline || updated.timeline.length === 0)) {
      updated.timeline = [
        { step: '01', title: 'Tahlil', description: 'Mavjud holatni o\'rganish' },
        { step: '02', title: 'Reja', description: 'Strategiyani belgilash' },
        { step: '03', title: 'Joriy etish', description: 'Amaliyotga tatbiq qilish' },
        { step: '04', title: 'Natija', description: 'Kuzatuv va baholash' }
      ];
    } else if (newLayout === 'quote' && !updated.quote) {
      updated.quote = {
        text: 'Kelajak bugun qilingan qarorlarimiz asosida shakllanadi.',
        author: 'Ekspert Fikri',
        role: 'Loyiha Rahbari'
      };
    } else if (newLayout === 'conclusion' && !updated.conclusion) {
      updated.conclusion = {
        mainMessage: 'Mavzuning asosiy natijasi va ahamiyati',
        takeaways: ['Birinchi muhim xulosa', 'Ikkinchi strategik yo\'nalish'],
        callToAction: 'Savollar uchun marhamat!'
      };
    }

    onUpdateSlide(updated);
  };

  const updateBullet = (idx: number, val: string) => {
    const pts = [...(slide.points || [])];
    pts[idx] = val;
    onUpdateSlide({ ...slide, points: pts });
  };

  const addBullet = () => {
    const pts = [...(slide.points || []), 'Yangi muhim fikr...'];
    onUpdateSlide({ ...slide, points: pts });
  };

  const removeBullet = (idx: number) => {
    const pts = (slide.points || []).filter((_, i) => i !== idx);
    onUpdateSlide({ ...slide, points: pts });
  };

  const hasImage = slide.showImage !== false;
  const currentVisualMode: VisualMode = slide.visualMode || 'ai_graphic';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 select-text overflow-hidden">
      {/* Top Action Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between pb-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {/* Layout Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLayoutMenu(!showLayoutMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
            >
              <Layout className="w-3.5 h-3.5 text-brand-400" />
              <span className="capitalize">{slide.layout}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showLayoutMenu && (
              <div className="absolute left-0 top-full mt-1.5 z-30 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 space-y-0.5">
                {[
                  { id: 'title', label: 'Sarlavha' },
                  { id: 'bullets', label: 'Ro\'yxat (Fikrlar)' },
                  { id: 'stats', label: 'Statistika' },
                  { id: 'compare', label: 'Solishtirma' },
                  { id: 'timeline', label: 'Bosqichlar' },
                  { id: 'quote', label: 'Iqtibos' },
                  { id: 'conclusion', label: 'Xulosa' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLayoutChange(item.id as SlideLayout)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      slide.layout === item.id
                        ? 'bg-brand-600 text-white font-medium'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Minimalist AI / Photo Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => switchVisualMode('ai_graphic')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                hasImage && currentVisualMode === 'ai_graphic'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkle className="w-3 h-3 text-yellow-300" />
              <span>Minimalist AI</span>
            </button>
            <button
              onClick={() => switchVisualMode('ai_image')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                hasImage && currentVisualMode === 'ai_image'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-fuchsia-300" />
              <span>AI Rasm</span>
            </button>
            <button
              onClick={() => switchVisualMode('photo')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                hasImage && currentVisualMode === 'photo'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3 h-3 text-cyan-300" />
              <span>HD Foto</span>
            </button>
            <button
              onClick={toggleVisual}
              className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                !hasImage ? 'bg-slate-800 text-rose-300' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Rasmni butunlay o'chirish"
            >
              {hasImage ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Notes Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
              showNotes
                ? 'bg-brand-950/60 border-brand-500/50 text-brand-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.notesLabel}</span>
          </button>
        </div>
      </div>

      {/* 16:9 Presentation Canvas Container (Strictly Bound, No Overflow) */}
      <div 
        className={`w-full max-w-5xl aspect-video rounded-3xl shadow-2xl border ${theme.cardBorder} bg-gradient-to-br ${theme.bgGradient} p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all select-text`}
      >
        {/* Glow decoration */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Slide Header (Badge, Title, Subtitle) */}
        {slide.layout !== 'title' && (
          <div className="relative z-10 shrink-0 space-y-1 mb-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={slide.badge || ''}
                onChange={(e) => updateBadge(e.target.value)}
                placeholder="Bo'lim / 01"
                className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-0.5 rounded-full ${theme.id === 'minimalist' ? 'bg-slate-900 text-white' : 'bg-black/30 text-white/90 border border-white/10'} focus:outline-none focus:ring-1 focus:ring-white/30 w-fit max-w-[140px]`}
              />
              <span className={`text-xs font-semibold opacity-70 ${theme.textSecondary}`}>
                {slideIndex + 1} / {totalSlides}
              </span>
            </div>

            <textarea
              value={slide.title}
              onChange={(e) => updateTitle(e.target.value)}
              rows={1}
              placeholder="Slayd sarlavhasi..."
              className={`w-full bg-transparent font-extrabold text-xl sm:text-3xl ${theme.textPrimary} border-b border-transparent hover:border-white/20 focus:border-white/40 focus:outline-none resize-none transition-colors leading-tight`}
            />

            <input
              type="text"
              value={slide.subtitle || ''}
              onChange={(e) => updateSubtitle(e.target.value)}
              placeholder="Qo'shimcha izoh yoki kichik sarlavha..."
              className={`w-full bg-transparent text-xs sm:text-sm ${theme.textSecondary} border-b border-transparent hover:border-white/10 focus:border-white/30 focus:outline-none transition-colors`}
            />
          </div>
        )}

        {/* Slide Body Content (Fully Responsive, Flex-Distributed, No Overflow!) */}
        <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center overflow-hidden my-1">
          {/* TITLE LAYOUT */}
          {slide.layout === 'title' && (
            <div className={`flex flex-col sm:flex-row ${slide.imageSide === 'left' ? 'sm:flex-row-reverse' : ''} items-center justify-between gap-6 my-auto`}>
              <div className="flex-1 text-left space-y-3">
                <input
                  type="text"
                  value={slide.badge || 'SLAYDAI TAQDIMOT'}
                  onChange={(e) => updateBadge(e.target.value)}
                  className="text-[11px] uppercase tracking-widest font-extrabold px-3.5 py-1 rounded-full bg-black/30 text-white border border-white/15 focus:outline-none focus:ring-1 focus:ring-white/40"
                />

                <textarea
                  value={slide.title}
                  onChange={(e) => updateTitle(e.target.value)}
                  rows={2}
                  placeholder="Asosiy Mavzu Sarlavhasi..."
                  className={`w-full bg-transparent font-extrabold text-2xl sm:text-4xl lg:text-5xl ${theme.textPrimary} border-b border-transparent hover:border-white/20 focus:border-white/40 focus:outline-none resize-none transition-colors leading-tight font-display`}
                />

                <textarea
                  value={slide.subtitle || ''}
                  onChange={(e) => updateSubtitle(e.target.value)}
                  rows={2}
                  placeholder="Kichik izoh yoki taqdimot maqsadi..."
                  className={`w-full bg-transparent text-sm sm:text-base ${theme.textSecondary} border-b border-transparent hover:border-white/10 focus:border-white/30 focus:outline-none resize-none transition-colors`}
                />

                <div className="pt-2 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-medium">
                    ✨ SlaydAI • Minimalist Taqdimot
                  </span>
                </div>
              </div>

              {/* Cover Slide Visual Card */}
              {hasImage && (
                <div className="w-full sm:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group/img bg-slate-900/60">
                  {currentVisualMode === 'ai_graphic' ? (
                    <MinimalistAIVisual
                      topic={slide.title}
                      slideTitle={slide.subtitle}
                      primaryColor={theme.primary}
                      accentColor={theme.accent}
                    />
                  ) : (
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.3';
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* BULLETS LAYOUT (Side-by-side with Minimalist AI Visual or full-width) */}
          {slide.layout === 'bullets' && (
            <div className={`flex flex-col sm:flex-row ${slide.imageSide === 'left' ? 'sm:flex-row-reverse' : ''} gap-4 h-full max-h-full items-stretch overflow-hidden`}>
              {/* Bullet Cards Column */}
              <div className={`${hasImage ? 'w-full sm:w-3/5' : 'w-full'} flex flex-col justify-center gap-2.5 overflow-hidden`}>
                {(slide.points || []).map((pt, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md group/item transition-all hover:border-brand-500/50 shadow-sm`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 text-white shadow-md"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {idx + 1}
                    </div>
                    <textarea
                      value={pt}
                      onChange={(e) => updateBullet(idx, e.target.value)}
                      rows={1}
                      className={`flex-1 bg-transparent text-xs sm:text-sm ${theme.textPrimary} border-b border-transparent hover:border-white/10 focus:border-white/30 focus:outline-none resize-none leading-snug`}
                    />
                    <button
                      onClick={() => removeBullet(idx)}
                      className="opacity-0 group-hover/item:opacity-100 p-1 rounded text-rose-400 hover:bg-rose-950/40 transition-opacity shrink-0"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {(slide.points || []).length < 5 && (
                  <button
                    onClick={addBullet}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl border border-dashed ${theme.id === 'minimalist' ? 'border-slate-300 text-slate-600 hover:text-slate-900' : 'border-white/20 text-white/70 hover:text-white'} transition-colors w-fit mt-1`}
                  >
                    <Plus className="w-3 h-3" />
                    <span>Band qo'shish</span>
                  </button>
                )}
              </div>

              {/* Side Minimalist AI Visual / HD Photo Card */}
              {hasImage && (
                <div className="hidden sm:block w-2/5 rounded-2xl overflow-hidden border border-white/15 shadow-xl relative group/img self-stretch bg-slate-900/60">
                  {currentVisualMode === 'ai_graphic' ? (
                    <MinimalistAIVisual
                      topic={slide.title}
                      slideTitle={slide.subtitle}
                      primaryColor={theme.primary}
                      accentColor={theme.accent}
                    />
                  ) : (
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.3';
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* STATS LAYOUT */}
          {slide.layout === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
              {(slide.stats || []).map((st, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md text-center flex flex-col justify-between shadow-lg`}
                >
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => {
                      const newStats = [...(slide.stats || [])];
                      newStats[idx].value = e.target.value;
                      onUpdateSlide({ ...slide, stats: newStats });
                    }}
                    className="w-full bg-transparent text-2xl sm:text-4xl font-extrabold text-center font-display focus:outline-none"
                    style={{ color: theme.primary }}
                  />

                  <textarea
                    value={st.label}
                    onChange={(e) => {
                      const newStats = [...(slide.stats || [])];
                      newStats[idx].label = e.target.value;
                      onUpdateSlide({ ...slide, stats: newStats });
                    }}
                    rows={2}
                    className={`mt-1 w-full bg-transparent text-xs sm:text-sm font-bold text-center ${theme.textPrimary} focus:outline-none resize-none leading-tight`}
                  />

                  {st.trend && (
                    <input
                      type="text"
                      value={st.trend}
                      onChange={(e) => {
                        const newStats = [...(slide.stats || [])];
                        newStats[idx].trend = e.target.value;
                        onUpdateSlide({ ...slide, stats: newStats });
                      }}
                      className={`mt-2 text-[10px] text-center ${theme.id === 'minimalist' ? 'text-slate-600 bg-slate-100' : 'text-white/70 bg-black/30'} px-2 py-0.5 rounded-md focus:outline-none`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* COMPARE LAYOUT */}
          {slide.layout === 'compare' && slide.compare && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
              {/* Left Column */}
              <div className={`p-4 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md space-y-2`}>
                <input
                  type="text"
                  value={slide.compare.leftTitle}
                  onChange={(e) => {
                    const comp = { ...slide.compare!, leftTitle: e.target.value };
                    onUpdateSlide({ ...slide, compare: comp });
                  }}
                  className={`w-full bg-transparent font-bold text-sm sm:text-base ${theme.textSecondary} focus:outline-none border-b border-white/10 pb-1`}
                />
                <div className="space-y-1.5">
                  {slide.compare.leftItems.map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-2 text-xs ${theme.textSecondary}`}>
                      <span className="opacity-60 font-bold">•</span>
                      <textarea
                        value={item}
                        onChange={(e) => {
                          const items = [...slide.compare!.leftItems];
                          items[idx] = e.target.value;
                          onUpdateSlide({ ...slide, compare: { ...slide.compare!, leftItems: items } });
                        }}
                        rows={1}
                        className="w-full bg-transparent focus:outline-none resize-none leading-snug"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className={`p-4 rounded-2xl ${theme.cardBg} border-2 border-brand-500/60 backdrop-blur-md space-y-2 shadow-lg`}>
                <input
                  type="text"
                  value={slide.compare.rightTitle}
                  onChange={(e) => {
                    const comp = { ...slide.compare!, rightTitle: e.target.value };
                    onUpdateSlide({ ...slide, compare: comp });
                  }}
                  className="w-full bg-transparent font-bold text-sm sm:text-base focus:outline-none border-b border-white/20 pb-1"
                  style={{ color: theme.primary }}
                />
                <div className="space-y-1.5">
                  {slide.compare.rightItems.map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-2 text-xs ${theme.textPrimary}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                      <textarea
                        value={item}
                        onChange={(e) => {
                          const items = [...slide.compare!.rightItems];
                          items[idx] = e.target.value;
                          onUpdateSlide({ ...slide, compare: { ...slide.compare!, rightItems: items } });
                        }}
                        rows={1}
                        className="w-full bg-transparent focus:outline-none resize-none leading-snug"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TIMELINE LAYOUT */}
          {slide.layout === 'timeline' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto">
              {(slide.timeline || []).map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md space-y-1.5 flex flex-col justify-between`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {step.step || `0${idx + 1}`}
                  </div>
                  <textarea
                    value={step.title}
                    onChange={(e) => {
                      const tl = [...(slide.timeline || [])];
                      tl[idx].title = e.target.value;
                      onUpdateSlide({ ...slide, timeline: tl });
                    }}
                    rows={1}
                    className={`w-full bg-transparent font-bold text-xs sm:text-sm ${theme.textPrimary} focus:outline-none resize-none`}
                  />
                  <textarea
                    value={step.description}
                    onChange={(e) => {
                      const tl = [...(slide.timeline || [])];
                      tl[idx].description = e.target.value;
                      onUpdateSlide({ ...slide, timeline: tl });
                    }}
                    rows={3}
                    className={`w-full bg-transparent text-[11px] ${theme.textSecondary} focus:outline-none resize-none leading-tight`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* QUOTE LAYOUT */}
          {slide.layout === 'quote' && slide.quote && (
            <div className={`p-6 sm:p-8 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl relative my-auto shadow-xl`}>
              <textarea
                value={slide.quote.text}
                onChange={(e) => {
                  const q = { ...slide.quote!, text: e.target.value };
                  onUpdateSlide({ ...slide, quote: q });
                }}
                rows={2}
                className={`w-full bg-transparent text-lg sm:text-2xl font-semibold italic ${theme.textPrimary} focus:outline-none resize-none leading-relaxed`}
              />
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <input
                    type="text"
                    value={slide.quote.author}
                    onChange={(e) => {
                      const q = { ...slide.quote!, author: e.target.value };
                      onUpdateSlide({ ...slide, quote: q });
                    }}
                    className="bg-transparent font-bold text-sm focus:outline-none"
                    style={{ color: theme.primary }}
                  />
                  <input
                    type="text"
                    value={slide.quote.role || ''}
                    onChange={(e) => {
                      const q = { ...slide.quote!, role: e.target.value };
                      onUpdateSlide({ ...slide, quote: q });
                    }}
                    className={`block bg-transparent text-xs ${theme.textSecondary} focus:outline-none`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* CONCLUSION LAYOUT */}
          {slide.layout === 'conclusion' && slide.conclusion && (
            <div className={`p-5 sm:p-7 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl space-y-3 my-auto shadow-xl`}>
              <textarea
                value={slide.conclusion.mainMessage}
                onChange={(e) => {
                  const c = { ...slide.conclusion!, mainMessage: e.target.value };
                  onUpdateSlide({ ...slide, conclusion: c });
                }}
                rows={2}
                className={`w-full bg-transparent text-base sm:text-xl font-bold ${theme.textPrimary} focus:outline-none resize-none leading-snug`}
              />

              <div className="space-y-1.5 pt-1">
                {(slide.conclusion.takeaways || []).map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-xs sm:text-sm ${theme.textPrimary}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const tak = [...slide.conclusion!.takeaways];
                        tak[idx] = e.target.value;
                        onUpdateSlide({ ...slide, conclusion: { ...slide.conclusion!, takeaways: tak } });
                      }}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                <input
                  type="text"
                  value={slide.conclusion.callToAction}
                  onChange={(e) => {
                    const c = { ...slide.conclusion!, callToAction: e.target.value };
                    onUpdateSlide({ ...slide, conclusion: c });
                  }}
                  className="px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-white text-center shadow-md focus:outline-none"
                  style={{ backgroundColor: theme.primary }}
                />
                <input
                  type="text"
                  value={slide.conclusion.contact || ''}
                  onChange={(e) => {
                    const c = { ...slide.conclusion!, contact: e.target.value };
                    onUpdateSlide({ ...slide, conclusion: c });
                  }}
                  placeholder="Aloqa / Email"
                  className={`bg-transparent text-xs ${theme.textSecondary} text-right focus:outline-none`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Slide Footer: Sleek Minimalist Presentation Meta */}
        <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-1.5 font-medium text-slate-400">
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>SlaydAI Presentation</span>
          </div>
          <span className="font-mono text-slate-400">{slideIndex + 1} / {totalSlides}</span>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="w-full max-w-5xl mt-2.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 animate-in fade-in duration-200">
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-brand-400" />
            {t.notesLabel}
          </label>
          <textarea
            value={slide.speakerNotes || ''}
            onChange={(e) => updateNotes(e.target.value)}
            rows={2}
            placeholder="Taqdimotchi uchun nutq matni yoki eslatmalar..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>
      )}
    </div>
  );
};

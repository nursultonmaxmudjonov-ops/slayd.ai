import React, { useEffect, useCallback } from 'react';
import { Slide, ThemeColors, Language } from '../types';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Quote as QuoteIcon, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../locales/translations';
import { MinimalistAIVisual } from './MinimalistAIVisual';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  theme: ThemeColors;
  language: Language;
  initialIndex?: number;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  slides,
  theme,
  language,
  initialIndex = 0
}) => {
  const activeSlides = slides.filter(s => s.selected !== false);
  const slidesList = activeSlides.length > 0 ? activeSlides : slides;

  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    setCurrentIndex(Math.min(initialIndex, slidesList.length - 1));
  }, [initialIndex, slidesList.length]);

  const nextSlide = useCallback(() => {
    if (currentIndex < slidesList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, slidesList.length]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextSlide, prevSlide, onClose]);

  if (!isOpen || slidesList.length === 0) return null;

  const currentSlide = slidesList[currentIndex];
  const hasImage = currentSlide.showImage !== false;
  const currentVisualMode = currentSlide.visualMode || 'ai_graphic';

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200 overflow-hidden">
      {/* Top Bar with exit and hint */}
      <div className="flex items-center justify-between text-xs text-slate-400 z-20 shrink-0">
        <span className="opacity-70 hidden sm:inline">{t.fullScreenHint}</span>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-auto"
          title="Chiqish (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Canvas Container (Strictly 16:9, No Overflow) */}
      <div className="flex-1 min-h-0 flex items-center justify-center my-auto overflow-hidden">
        <div 
          className={`w-full max-w-6xl aspect-video rounded-3xl shadow-2xl border ${theme.cardBorder} bg-gradient-to-br ${theme.bgGradient} p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-all`}
        >
          {/* Header */}
          {currentSlide.layout !== 'title' && (
            <div className="space-y-1.5 shrink-0 mb-2">
              <div className="flex items-center justify-between">
                {currentSlide.badge && (
                  <span className="text-[11px] uppercase tracking-widest font-extrabold px-3 py-0.5 rounded-full bg-black/30 text-white border border-white/10">
                    {currentSlide.badge}
                  </span>
                )}
                <span className="text-xs font-semibold opacity-60 text-white">
                  {currentIndex + 1} / {slidesList.length}
                </span>
              </div>
              <h2 className={`font-extrabold text-2xl sm:text-4xl ${theme.textPrimary} font-display leading-tight`}>
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>
                  {currentSlide.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Slide Layout Body */}
          <div className="flex-1 min-h-0 my-auto flex flex-col justify-center overflow-hidden">
            {/* TITLE */}
            {currentSlide.layout === 'title' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 my-auto">
                <div className="flex-1 space-y-4">
                  {currentSlide.badge && (
                    <div className="inline-block text-[11px] uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full bg-black/40 text-white border border-white/20">
                      {currentSlide.badge}
                    </div>
                  )}
                  <h1 className={`font-extrabold text-3xl sm:text-5xl lg:text-6xl ${theme.textPrimary} font-display leading-tight`}>
                    {currentSlide.title}
                  </h1>
                  {currentSlide.subtitle && (
                    <p className={`text-sm sm:text-lg ${theme.textSecondary}`}>
                      {currentSlide.subtitle}
                    </p>
                  )}
                  <div className="pt-2">
                    <span className="px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Made with dev NURSULTON
                    </span>
                  </div>
                </div>

                {hasImage && (
                  <div className="w-full sm:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    {currentVisualMode === 'ai_graphic' ? (
                      <MinimalistAIVisual
                        topic={currentSlide.title}
                        slideTitle={currentSlide.subtitle}
                        primaryColor={theme.primary}
                        accentColor={theme.accent}
                      />
                    ) : (
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* BULLETS */}
            {currentSlide.layout === 'bullets' && (
              <div className="flex flex-col sm:flex-row gap-5 h-full items-stretch overflow-hidden">
                <div className={`${hasImage ? 'w-full sm:w-3/5' : 'w-full'} flex flex-col justify-center gap-3 overflow-hidden`}>
                  {(currentSlide.points || []).map((pt, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md shadow-md`}
                    >
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 text-white shadow-md"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {idx + 1}
                      </div>
                      <div className={`text-xs sm:text-base ${theme.textPrimary} leading-relaxed`}>
                        {pt}
                      </div>
                    </div>
                  ))}
                </div>

                {hasImage && (
                  <div className="hidden sm:block w-2/5 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative">
                    {currentVisualMode === 'ai_graphic' ? (
                      <MinimalistAIVisual
                        topic={currentSlide.title}
                        slideTitle={currentSlide.subtitle}
                        primaryColor={theme.primary}
                        accentColor={theme.accent}
                      />
                    ) : (
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STATS */}
            {currentSlide.layout === 'stats' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
                {(currentSlide.stats || []).map((st, idx) => (
                  <div
                    key={idx}
                    className={`p-6 sm:p-8 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl text-center space-y-2 shadow-2xl`}
                  >
                    <div 
                      className="text-3xl sm:text-5xl font-extrabold font-display"
                      style={{ color: theme.primary }}
                    >
                      {st.value}
                    </div>
                    <div className={`text-sm sm:text-lg font-bold ${theme.textPrimary}`}>
                      {st.label}
                    </div>
                    {st.trend && (
                      <div className="text-[11px] text-white/70 bg-black/30 px-3 py-1 rounded-full inline-block">
                        {st.trend}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* COMPARE */}
            {currentSlide.layout === 'compare' && currentSlide.compare && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-auto">
                <div className={`p-5 sm:p-7 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md space-y-3`}>
                  <h3 className={`font-bold text-base sm:text-lg ${theme.textSecondary} border-b border-white/10 pb-2`}>
                    {currentSlide.compare.leftTitle}
                  </h3>
                  <div className="space-y-2">
                    {currentSlide.compare.leftItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${theme.textSecondary}`}>
                        <span className="opacity-60 font-bold">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-5 sm:p-7 rounded-3xl ${theme.cardBg} border-2 border-brand-500/80 backdrop-blur-md space-y-3 shadow-2xl`}>
                  <h3 className="font-bold text-base sm:text-lg border-b border-white/20 pb-2" style={{ color: theme.primary }}>
                    {currentSlide.compare.rightTitle}
                  </h3>
                  <div className="space-y-2">
                    {currentSlide.compare.rightItems.map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${theme.textPrimary}`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TIMELINE */}
            {currentSlide.layout === 'timeline' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-auto">
                {(currentSlide.timeline || []).map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-md space-y-2`}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-md"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {step.step || `0${idx + 1}`}
                    </div>
                    <div className={`font-bold text-xs sm:text-sm ${theme.textPrimary}`}>
                      {step.title}
                    </div>
                    <div className={`text-[11px] sm:text-xs ${theme.textSecondary} leading-relaxed`}>
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* QUOTE */}
            {currentSlide.layout === 'quote' && currentSlide.quote && (
              <div className={`p-8 sm:p-12 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl relative my-auto shadow-2xl`}>
                <QuoteIcon 
                  className="w-12 h-12 opacity-30 absolute top-5 left-6 pointer-events-none" 
                  style={{ color: theme.primary }} 
                />
                <p className={`text-xl sm:text-3xl font-semibold italic ${theme.textPrimary} relative z-10 leading-relaxed`}>
                  "{currentSlide.quote.text}"
                </p>
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="font-bold text-sm sm:text-base" style={{ color: theme.primary }}>
                    — {currentSlide.quote.author}
                  </div>
                  {currentSlide.quote.role && (
                    <div className={`text-xs ${theme.textSecondary}`}>
                      {currentSlide.quote.role}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONCLUSION */}
            {currentSlide.layout === 'conclusion' && currentSlide.conclusion && (
              <div className={`p-6 sm:p-10 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl space-y-4 my-auto shadow-2xl`}>
                <p className={`text-xl sm:text-2xl font-bold ${theme.textPrimary} leading-snug`}>
                  {currentSlide.conclusion.mainMessage}
                </p>
                <div className="space-y-2">
                  {(currentSlide.conclusion.takeaways || []).map((t, idx) => (
                    <div key={idx} className={`flex items-center gap-2.5 text-xs sm:text-base ${theme.textPrimary}`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span 
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {currentSlide.conclusion.callToAction}
                  </span>
                  {currentSlide.conclusion.contact && (
                    <span className={`text-xs sm:text-sm ${theme.textSecondary}`}>
                      {currentSlide.conclusion.contact}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer: Sleek Minimalist Presentation Meta */}
          <div className="pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-1.5 font-medium text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>SlaydAI Presentation</span>
            </div>
            <span className="font-mono text-slate-400">{currentIndex + 1} / {slidesList.length}</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigator */}
      <div className="flex items-center justify-center gap-3 z-20 shrink-0 py-2">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold text-white/80 px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-md">
          {currentIndex + 1} / {slidesList.length}
        </span>
        <button
          onClick={nextSlide}
          disabled={currentIndex === slidesList.length - 1}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

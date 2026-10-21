import React, { useState } from 'react';
import { 
  Download, 
  Play, 
  Printer, 
  Palette, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  PlusCircle,
  Check,
  Sparkles
} from 'lucide-react';
import { ThemeId, Language } from '../types';
import { SLIDE_THEMES } from '../themes/slideThemes';
import { TRANSLATIONS } from '../locales/translations';

interface ExportToolbarProps {
  onExportPptx: () => Promise<void>;
  onStartPresentation: () => void;
  onPrintPdf: () => void;
  onNewPresentation: () => void;
  currentTheme: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
  activeIndex: number;
  totalSlides: number;
  selectedCount: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  language: Language;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onExportPptx,
  onStartPresentation,
  onPrintPdf,
  onNewPresentation,
  currentTheme,
  onThemeChange,
  activeIndex,
  totalSlides,
  selectedCount,
  onPrevSlide,
  onNextSlide,
  language
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const t = TRANSLATIONS[language];

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await onExportPptx();
    } catch (err) {
      console.error("Export error:", err);
      alert("Eksport qilishda xatolik yuz berdi");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 py-2.5 shrink-0">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: New presentation & Theme selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNewPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-brand-400" />
            <span>Yangi mavzu</span>
          </button>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-brand-400" />
              <span>Dizayn</span>
              <span 
                className="w-2.5 h-2.5 rounded-full ml-1"
                style={{ backgroundColor: SLIDE_THEMES[currentTheme].primary }}
              />
            </button>

            {showThemeMenu && (
              <div className="absolute left-0 bottom-full mb-2 z-40 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 space-y-1">
                {Object.values(SLIDE_THEMES).map((thm) => {
                  const name = language === 'uz' ? thm.nameUz : language === 'ru' ? thm.nameRu : thm.name;
                  return (
                    <button
                      key={thm.id}
                      onClick={() => {
                        onThemeChange(thm.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        currentTheme === thm.id
                          ? 'bg-brand-600 text-white font-medium'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: thm.primary }} 
                        />
                        <span>{name}</span>
                      </div>
                      {currentTheme === thm.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-500 pl-2">
            <span>Made with dev NURSULTON</span>
          </div>
        </div>

        {/* Center: Slide Prev / Next Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevSlide}
            disabled={activeIndex === 0}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-300 min-w-[70px] text-center">
            {activeIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={onNextSlide}
            disabled={activeIndex === totalSlides - 1}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions (PPTX, Fullscreen, Print) */}
        <div className="flex items-center gap-2">
          {/* Print / PDF */}
          <button
            onClick={onPrintPdf}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            title={t.exportPdf}
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>PDF</span>
          </button>

          {/* Present Mode */}
          <button
            onClick={onStartPresentation}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.presentMode}</span>
          </button>

          {/* Export PPTX */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Yuklanmoqda...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>PPTX Yuklab Olish ({selectedCount})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

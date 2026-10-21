import React from 'react';
import { Slide, ThemeColors, Language } from '../types';
import { Plus, Trash2, Copy, ArrowUp, ArrowDown, CheckSquare, Square } from 'lucide-react';
import { TRANSLATIONS } from '../locales/translations';

interface SlideSidebarProps {
  slides: Slide[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  onToggleSlideSelection: (index: number) => void;
  onSelectAllSlides: (select: boolean) => void;
  onAddSlide: () => void;
  onDeleteSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
  theme: ThemeColors;
  language: Language;
}

export const SlideSidebar: React.FC<SlideSidebarProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
  onToggleSlideSelection,
  onSelectAllSlides,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onMoveSlide,
  theme,
  language
}) => {
  const t = TRANSLATIONS[language];
  const selectedCount = slides.filter(s => s.selected !== false).length;
  const allSelected = selectedCount === slides.length;

  return (
    <aside className="w-full lg:w-72 border-r border-slate-800/80 bg-slate-950/60 p-4 flex flex-col gap-3 shrink-0">
      {/* Top Header & Page Selector */}
      <div className="space-y-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Slaydlar ({slides.length})
          </span>
          <button
            onClick={onAddSlide}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 border border-brand-500/30 text-xs font-semibold transition-colors"
            title={t.addSlide}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Qo'shish</span>
          </button>
        </div>

        {/* Page selection toggle */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
          <button
            onClick={() => onSelectAllSlides(!allSelected)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            {allSelected ? (
              <CheckSquare className="w-4 h-4 text-brand-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-500" />
            )}
            <span>Hammasi</span>
          </button>
          <span className="text-[11px] font-semibold text-brand-300">
            {selectedCount} / {slides.length} ta faol
          </span>
        </div>
      </div>

      {/* Slide Thumbnails List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[calc(100vh-250px)]">
        {slides.map((s, idx) => {
          const isActive = idx === activeIndex;
          const isSelected = s.selected !== false;

          return (
            <div
              key={s.id || idx}
              onClick={() => onSelectSlide(idx)}
              className={`group relative p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                isActive
                  ? 'border-brand-500 bg-slate-800/90 ring-1 ring-brand-500/50 shadow-lg'
                  : isSelected
                  ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                  : 'border-slate-800/40 bg-slate-950/40 opacity-50 hover:opacity-80'
              }`}
            >
              {/* Header inside thumbnail card with Checkbox */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSlideSelection(idx);
                    }}
                    className="text-slate-400 hover:text-white"
                    title={isSelected ? "Eksportdan chiqarish" : "Eksportga qo'shish"}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-brand-400" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>
                  <span className="text-[11px] font-bold text-slate-400">
                    #{idx + 1}
                  </span>
                </div>

                <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                  {s.layout}
                </span>
              </div>

              {/* Title preview */}
              <div className="text-xs font-medium text-slate-200 line-clamp-2 leading-snug">
                {s.title || `Slayd ${idx + 1}`}
              </div>

              {/* Quick Actions */}
              <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {idx > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'up');
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/50"
                    title="Yuqoriga"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                )}
                {idx < slides.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'down');
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/50"
                    title="Pastga"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSlide(idx);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/50"
                  title={t.duplicateSlide}
                >
                  <Copy className="w-3 h-3" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSlide(idx);
                    }}
                    className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                    title={t.deleteSlide}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

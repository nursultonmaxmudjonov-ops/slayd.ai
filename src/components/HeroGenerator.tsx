import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Users, 
  Palette, 
  ArrowRight, 
  Loader2, 
  Check, 
  Flame,
  Wand2,
  Globe
} from 'lucide-react';
import { Language, AudienceType, ThemeId, GenerateOptions } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { SLIDE_THEMES } from '../themes/slideThemes';

interface HeroGeneratorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onGenerate: (options: GenerateOptions) => void;
  isGenerating: boolean;
}

export const HeroGenerator: React.FC<HeroGeneratorProps> = ({
  language,
  onLanguageChange,
  onGenerate,
  isGenerating
}) => {
  const t = TRANSLATIONS[language];
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState<number>(8);
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [customSlideCount, setCustomSlideCount] = useState<string>('8');
  const [audience, setAudience] = useState<AudienceType>('business');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('minimalist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const count = isCustomCount ? Math.max(2, Math.min(25, parseInt(customSlideCount) || 8)) : slideCount;

    onGenerate({
      topic: topic.trim(),
      language,
      slideCount: count,
      audience,
      theme: selectedTheme
    });
  };

  const handleSelectSample = (sample: string) => {
    setTopic(sample);
  };

  return (
    <div className="relative max-w-4xl mx-auto pt-5 pb-10 px-4 sm:px-6">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center space-y-3.5 mb-7">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>{t.heroBadge}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-bold">dev NURSULTON</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
          {t.heroTitle1}{' '}
          <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {t.heroTitleHighlight}
          </span>{' '}
          {t.heroTitle2}
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t.heroDesc}
        </p>
      </div>

      {/* Generator Card */}
      <div className="relative glass-panel rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main Topic Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-brand-400" />
                Mavzuni kiriting
              </span>
              <span className="text-[11px] text-emerald-400 font-normal">
                {t.noApiKeyRequired}
              </span>
            </label>
            <div className="relative">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.topicPlaceholder}
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none shadow-inner"
              />
            </div>
          </div>

          {/* Sample Topic Chips */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.samplesTitle}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.sampleTopics.map((sample, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-brand-900/40 border border-slate-700/60 hover:border-brand-500/50 text-slate-300 hover:text-white transition-all text-left"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            {/* Slide Count (Customizable) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-400" />
                  {t.slideCountLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomCount(!isCustomCount)}
                  className="text-[11px] text-brand-400 hover:underline"
                >
                  {isCustomCount ? 'Oddiy' : 'Boshqa son'}
                </button>
              </div>

              {!isCustomCount ? (
                <div className="grid grid-cols-4 gap-1.5">
                  {[5, 8, 10, 12].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setSlideCount(num)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        slideCount === num
                          ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/30'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={2}
                    max={25}
                    value={customSlideCount}
                    onChange={(e) => setCustomSlideCount(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white text-center focus:outline-none focus:border-brand-500"
                    placeholder="Masalan: 7"
                  />
                  <span className="text-xs text-slate-400 whitespace-nowrap">ta slayd</span>
                </div>
              )}
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-400" />
                {t.audienceLabel}
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as AudienceType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
              >
                <option value="student">{t.audiences.student}</option>
                <option value="business">{t.audiences.business}</option>
                <option value="academic">{t.audiences.academic}</option>
                <option value="speaker">{t.audiences.speaker}</option>
              </select>
            </div>

            {/* Presentation Language */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-400" />
                {t.languageLabel}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { code: 'uz', label: "O'zbek 🇺🇿" },
                  { code: 'ru', label: 'Рус 🇷🇺' },
                  { code: 'en', label: 'Eng 🇬🇧' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => onLanguageChange(item.code as Language)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      language === item.code
                        ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/30'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-brand-400" />
              {t.themeLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {Object.values(SLIDE_THEMES).map((thm) => {
                const isSelected = selectedTheme === thm.id;
                const displayName = language === 'uz' ? thm.nameUz : language === 'ru' ? thm.nameRu : thm.name;

                return (
                  <button
                    type="button"
                    key={thm.id}
                    onClick={() => setSelectedTheme(thm.id)}
                    className={`relative p-2 rounded-xl border text-left transition-all group overflow-hidden ${
                      isSelected
                        ? 'border-brand-500 bg-slate-800/90 ring-2 ring-brand-500/30'
                        : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <span 
                          className="w-3 h-3 rounded-full shadow-sm" 
                          style={{ backgroundColor: thm.primary }} 
                        />
                        <span 
                          className="w-2.5 h-2.5 rounded-full opacity-70" 
                          style={{ backgroundColor: thm.accent }} 
                        />
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-brand-400" />
                      )}
                    </div>
                    <div className="text-[11px] font-semibold text-white truncate">
                      {displayName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 group"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>{t.generatingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>{t.generateBtn}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Dev signature footer */}
      <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <span>Made with</span>
        <span className="text-rose-500">❤️</span>
        <span>by</span>
        <span className="font-semibold text-slate-300">dev NURSULTON</span>
      </div>
    </div>
  );
};

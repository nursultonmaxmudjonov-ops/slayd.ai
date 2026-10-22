import React from 'react';
import { Key, Globe, Sparkles, Coins, LogOut, Dices } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { Logo } from './Logo';
import { CreditUser } from '../services/creditsService';
import { canSpin } from '../services/creditsService';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  onNewPresentation: () => void;
  user: CreditUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onSpinClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenApiKeyModal,
  hasApiKey,
  onNewPresentation,
  user,
  onLoginClick,
  onLogout,
  onSpinClick
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand */}
        <div
          onClick={onNewPresentation}
          className="flex items-center gap-2 cursor-pointer group min-w-0 shrink"
        >
          <div className="group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Logo className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg" />
          </div>
          <span className="text-base sm:text-xl font-bold font-display bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent whitespace-nowrap">
            Slayd<span className="text-brand-400">AI</span>
          </span>
          <span className="hidden lg:inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            100% {t.freeBadge}
          </span>
          <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30 whitespace-nowrap">
            <Sparkles className="w-2.5 h-2.5 text-brand-400" />
            dev NURSULTON
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector — compact on mobile */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px] sm:text-xs font-medium">
            <button
              onClick={() => onLanguageChange('uz')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                language === 'uz'
                  ? 'bg-brand-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => onLanguageChange('ru')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                language === 'ru'
                  ? 'bg-brand-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                language === 'en'
                  ? 'bg-brand-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Credits / Login */}
          {user ? (
            <div className="flex items-center gap-1.5">
              {/* Weekly Spin button */}
              <button
                onClick={onSpinClick}
                className={`relative flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  canSpin(user)
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30 animate-pulse'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
                title="Haftalik Spin"
              >
                <Dices className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Spin</span>
                {canSpin(user) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-950" />
                )}
              </button>
              <div
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/50 to-slate-900 border border-amber-500/30 text-xs font-bold text-amber-300 whitespace-nowrap"
                title={`${user.name} • ${user.email}`}
              >
                <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{user.credits}</span>
                <span className="hidden lg:inline text-amber-500/60 font-medium">kredit</span>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-300 hover:border-rose-800 transition-colors shrink-0"
                title="Chiqish"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-brand-600/30 transition-all whitespace-nowrap"
            >
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span>Kirish</span>
            </button>
          )}

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shrink-0 ${
              hasApiKey
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Google Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden md:inline">API Key</span>
            {hasApiKey && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

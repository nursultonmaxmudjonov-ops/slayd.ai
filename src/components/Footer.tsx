import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const labels = {
    uz: { made: 'bilan yaratildi', free: 'Bepul • Tez • Professional' },
    ru: { made: 'сделано с', free: 'Бесплатно • Быстро • Профессионально' },
    en: { made: 'made with', free: 'Free • Fast • Professional' }
  }[language];

  return (
    <footer className="w-full border-t border-slate-800/60 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm font-bold font-display">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Slayd<span className="text-brand-400">AI</span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Free
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">{labels.free}</p>
            </div>
          </div>

          {/* Made with badge — the star of the footer */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 
                       hover:from-brand-950 hover:via-slate-900 hover:to-indigo-950
                       border border-slate-800 hover:border-brand-500/40 
                       shadow-lg shadow-black/20 hover:shadow-brand-500/10
                       transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              {labels.made}
            </span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 group-hover:animate-pulse" />
            <span className="text-xs font-bold font-display bg-gradient-to-r from-brand-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              Slayd.AI
            </span>
            <Sparkles className="w-3 h-3 text-brand-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
          </a>

          {/* Dev credit */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span>dev</span>
            <span className="font-semibold text-slate-300">NURSULTON</span>
            <span className="text-rose-500">❤</span>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="mt-4 pt-3 border-t border-slate-900/80 text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} Slayd.AI — {language === 'uz' ? 'Sun\'iy intellekt bilan professional taqdimotlar' : language === 'ru' ? 'Профессиональные презентации с ИИ' : 'Professional presentations powered by AI'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

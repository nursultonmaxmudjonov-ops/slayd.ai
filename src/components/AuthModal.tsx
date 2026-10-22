import React, { useState } from 'react';
import { X, Coins, Gift, Sun, User, Mail, Phone, Coins as CoinIcon } from 'lucide-react';
import { Language } from '../types';
import { Logo } from './Logo';
import { SIGNUP_BONUS, DAILY_BONUS, CREDITS_PER_SLIDE } from '../services/creditsService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string, phone: string) => void;
  language: Language;
}

const T = {
  uz: {
    title: 'Slayd.AI ga kirish',
    subtitle: 'Hisobingizga kiring yoki tez ro\'yxatdan o\'ting',
    name: 'Ismingiz',
    namePh: 'Masalan: Nursulton',
    phone: 'Telefon raqamingiz',
    phonePh: '+998 90 123 45 67',
    email: 'Email manzilingiz',
    emailPh: 'siz@example.com',
    submit: 'Kirish / Ro\'yxatdan o\'tish',
    bonusTitle: 'Sizga beriladigan bonuslar:',
    signupBonus: `Birinchi kirishda ${SIGNUP_BONUS} kredit sovg'a!`,
    dailyBonus: `Har kunlik kirishda +${DAILY_BONUS} kredit`,
    cost: `Bitta slayd narxi: ${CREDITS_PER_SLIDE} kredit`,
    howMany: 'Bir marta tanlanganingizda 3 ta slayd bepul!',
    nameRequired: 'Iltimos, ismingizni kiriting',
    phoneRequired: 'Iltimos, to\'g\'ri telefon raqam kiriting (+998...)',
    emailRequired: 'Iltimos, to\'g\'ri email kiriting',
    welcome: 'Xush kelibsiz',
    welcomeBack: 'Yana kandingiz — kunlik bonus qo\'shildi!'
  },
  ru: {
    title: 'Вход в Slayd.AI',
    subtitle: 'Войдите в аккаунт или быстро зарегистрируйтесь',
    name: 'Ваше имя',
    namePh: 'Например: Nursulton',
    phone: 'Ваш номер телефона',
    phonePh: '+998 90 123 45 67',
    email: 'Ваш email',
    emailPh: 'vy@example.com',
    submit: 'Войти / Зарегистрироваться',
    bonusTitle: 'Ваши бонусы:',
    signupBonus: `При первом входе ${SIGNUP_BONUS} кредитов в подарок!`,
    dailyBonus: `Ежедневный вход: +${DAILY_BONUS} кредитов`,
    cost: `Стоимость одного слайда: ${CREDITS_PER_SLIDE} кредитов`,
    howMany: 'При регистрации — 3 слайда бесплатно!',
    nameRequired: 'Пожалуйста, введите имя',
    phoneRequired: 'Введите корректный номер (+998...)',
    emailRequired: 'Пожалуйста, введите корректный email',
    welcome: 'Добро пожаловать',
    welcomeBack: 'С возвращением — ежедневный бонус добавлен!'
  },
  en: {
    title: 'Sign in to Slayd.AI',
    subtitle: 'Log in or quickly create an account',
    name: 'Your name',
    namePh: 'e.g. Nursulton',
    phone: 'Your phone number',
    phonePh: '+998 90 123 45 67',
    email: 'Your email',
    emailPh: 'you@example.com',
    submit: 'Sign in / Sign up',
    bonusTitle: 'Your bonuses:',
    signupBonus: `Get ${SIGNUP_BONUS} bonus credits on first sign-in!`,
    dailyBonus: `Daily login: +${DAILY_BONUS} credits every day`,
    cost: `Cost per slide: ${CREDITS_PER_SLIDE} credits`,
    howMany: 'Sign up and get 3 slides free!',
    nameRequired: 'Please enter your name',
    phoneRequired: 'Please enter a valid phone number (+998...)',
    emailRequired: 'Please enter a valid email',
    welcome: 'Welcome',
    welcomeBack: 'Welcome back — daily bonus added!'
  }
} as const;

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const t = T[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t.nameRequired);
      return;
    }
    if (!/^\+?[\d\s()\-]{9,18}$/.test(phone.trim())) {
      setError(t.phoneRequired);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(t.emailRequired);
      return;
    }
    setError('');
    onLogin(name.trim(), email.trim(), phone.trim());
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <Logo className="w-14 h-14 drop-shadow-xl" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {t.title}
            </h2>
            <p className="text-xs text-slate-400">{t.subtitle}</p>
          </div>

          {/* Bonus card */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-950/60 via-slate-900 to-indigo-950/60 border border-brand-500/25 p-4 mb-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-300">
              <Gift className="w-3.5 h-3.5" />
              {t.bonusTitle}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <Coins className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.signupBonus}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <Sun className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{t.dailyBonus}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1 border-t border-slate-800">
              <CoinIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{t.cost}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1.5">
                <User className="w-3.5 h-3.5 text-brand-400" />
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                {t.phone}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePh}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPh}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>

            {error && (
              <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Coins className="w-4 h-4 text-amber-300" />
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

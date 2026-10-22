import React, { useEffect, useState } from 'react';
import { X, Coins, RotateCw, PartyPopper, Clock, Ticket, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { Logo } from './Logo';
import {
  SPIN_SEGMENTS,
  SPIN_JACKPOT_INDEX,
  claimSpin,
  canSpin,
  msUntilNextSpin,
  checkPromo,
  redeemPromo,
  getWeeklyFeaturedPromo,
  CreditUser
} from '../services/creditsService';

interface SpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: CreditUser;
  onWin: (user: CreditUser, won: number) => void;
  language: Language;
}

const T = {
  uz: {
    title: 'Haftalik Spin',
    subtitle: 'Har hafta bitta bepul aylanish — 1000 kreditgacha!',
    spin: 'AYLANTIRISH',
    spinning: 'Aylanmoqda...',
    comeBack: 'Keyingi spin:',
    won: 'Siz yutdingiz!',
    jackpot: '🏆 JACKPOT! BESH YULDUZLI 1000 KREDIT! 🏆',
    days: 'kun',
    hours: 'soat',
    min: 'daqiqa',
    seg: 'kredit',
    promoTitle: 'Promo kod',
    promoPh: 'Kodni kiriting',
    promoBtn: 'Qo\'llash',
    promoOk: 'muvaffaqiyatli! +',
    promoUsed: 'Bu kod allaqachon ishlatilgan',
    promoBad: 'Noto\'g\'ri promo kod',
    weeklyPromo: "Bu haftaning tanlangan kodi (TG botda ham bor):"
  },
  ru: {
    title: 'Недельный спин',
    subtitle: 'Одно бесплатное вращение каждую неделю — до 1000 кредитов!',
    spin: 'ВРАЩАТЬ',
    spinning: 'Вращается...',
    comeBack: 'Следующий спин:',
    won: 'Вы выиграли!',
    jackpot: '🏆 ДЖЕКПОТ! 1000 КРЕДИТОВ! 🏆',
    days: 'дн',
    hours: 'ч',
    min: 'мин',
    seg: 'кред.',
    promoTitle: 'Промокод',
    promoPh: 'Введите код',
    promoBtn: 'Применить',
    promoOk: 'успешно! +',
    promoUsed: 'Этот код уже использован',
    promoBad: 'Неверный промокод',
    weeklyPromo: 'Промокод недели (есть и в TG-боте):'
  },
  en: {
    title: 'Weekly Spin',
    subtitle: 'One free spin every week — win up to 1000 credits!',
    spin: 'SPIN',
    spinning: 'Spinning...',
    comeBack: 'Next spin in:',
    won: 'You won',
    jackpot: '🏆 JACKPOT! 1000 CREDITS! 🏆',
    days: 'd',
    hours: 'h',
    min: 'm',
    seg: 'cr',
    promoTitle: 'Promo code',
    promoPh: 'Enter code',
    promoBtn: 'Redeem',
    promoOk: 'redeemed! +',
    promoUsed: 'This code was already used',
    promoBad: 'Invalid promo code',
    weeklyPromo: "This week's featured code (also in our TG bot):"
  }
} as const;

const SEG_COLORS = [
  '#059669', '#0891b2', '#b45309', '#7c3aed',
  '#0d9488', '#be123c', '#4f46e5', '#ca8a04'
];

function fmtTime(ms: number, lang: 'uz' | 'ru' | 'en'): string {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const t = T[lang];
  return `${d}${t.days} ${h}${t.hours} ${m}${t.min}`;
}

export const SpinModal: React.FC<SpinModalProps> = ({ isOpen, onClose, user, onWin, language }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [jackpot, setJackpot] = useState(false);
  const [remaining, setRemaining] = useState(msUntilNextSpin());
  const [promoCode, setPromoCode] = useState('');
  const [promoState, setPromoState] = useState<{ type: 'ok' | 'used' | 'bad'; amount?: number } | null>(null);
  const weeklyPromo = getWeeklyFeaturedPromo();
  const t = T[language];

  const eligible = canSpin(user);

  // Countdown ticker
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setRemaining(msUntilNextSpin()), 1000);
    return () => clearInterval(id);
  }, [isOpen]);

  if (!isOpen) return null;

  const n = SPIN_SEGMENTS.length;
  const segAngle = 360 / n;

  const handleSpin = () => {
    if (isSpinning || !eligible) return;
    setIsSpinning(true);
    setResult(null);
    setJackpot(false);

    const claim = claimSpin();
    if (!claim) {
      setIsSpinning(false);
      return;
    }

    // Pointer is at the top (0deg). Rotate so the winning segment lands there.
    const targetSegCenter = claim.segmentIndex * segAngle + segAngle / 2;
    const extraTurns = 5 * 360;
    const finalRotation = rotation + extraTurns + (360 - targetSegCenter) - (rotation % 360);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(claim.won);
      const isJackpot = claim.segmentIndex === SPIN_JACKPOT_INDEX;
      setJackpot(isJackpot);
      onWin(claim.user, claim.won);
      confetti({
        particleCount: isJackpot ? 200 : 80,
        spread: isJackpot ? 120 : 80,
        origin: { y: 0.5 }
      });
    }, 4200);
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/25 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          disabled={isSpinning}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors z-10 disabled:opacity-40"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-5 sm:p-7 flex flex-col items-center gap-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 text-center">
            <Logo className="w-9 h-9" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">{t.title}</h2>
              <p className="text-[11px] text-slate-400">{t.subtitle}</p>
            </div>
          </div>

          {/* Wheel */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64">
            {/* Pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-amber-400 drop-shadow-lg" />

            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
              }}
            >
              {SPIN_SEGMENTS.map((val, i) => {
                const a0 = (i * segAngle - 90) * (Math.PI / 180);
                const a1 = ((i + 1) * segAngle - 90) * (Math.PI / 180);
                const x0 = 100 + 95 * Math.cos(a0);
                const y0 = 100 + 95 * Math.sin(a0);
                const x1 = 100 + 95 * Math.cos(a1);
                const y1 = 100 + 95 * Math.sin(a1);
                const mid = (i * segAngle + segAngle / 2 - 90) * (Math.PI / 180);
                const tx = 100 + 60 * Math.cos(mid);
                const ty = 100 + 60 * Math.sin(mid);
                const isJackpotSeg = i === SPIN_JACKPOT_INDEX;
                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x0},${y0} A95,95 0 0,1 ${x1},${y1} Z`}
                      fill={SEG_COLORS[i]}
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                    <text
                      x={tx}
                      y={ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isJackpotSeg ? '#fde047' : '#ffffff'}
                      fontSize={isJackpotSeg ? '13' : '11'}
                      fontWeight="bold"
                      transform={`rotate(${i * segAngle + segAngle / 2},${tx},${ty})`}
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
              {/* Hub */}
              <circle cx="100" cy="100" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#fbbf24" fontSize="13">
                ★
              </text>
            </svg>
          </div>

          {/* Result banner */}
          {result !== null && (
            <div className={`w-full rounded-2xl border px-4 py-3 text-center animate-pulse ${
              jackpot
                ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 border-amber-400/60'
                : 'bg-emerald-950/50 border-emerald-500/40'
            }`}>
              <div className="flex items-center justify-center gap-2 font-bold text-white">
                <PartyPopper className="w-4 h-4 text-amber-400" />
                <span className="text-sm">{jackpot ? t.jackpot : `${t.won} +${result}`}</span>
                <Coins className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          )}

          {/* Promo code section */}
          <div className="w-full rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              {t.promoTitle}
            </div>

            {/* Weekly featured promo */}
            {weeklyPromo && (
              <button
                onClick={() => {
                  setPromoCode(weeklyPromo.code);
                  setPromoState(null);
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group"
              >
                <span className="text-[10px] text-emerald-300/80 text-left leading-tight">{t.weeklyPromo}</span>
                <span className="font-mono text-xs font-bold text-emerald-300 group-hover:text-white whitespace-nowrap">
                  {weeklyPromo.code} · +{weeklyPromo.amount}
                </span>
              </button>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setPromoState(null);
                }}
                placeholder={t.promoPh}
                maxLength={20}
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs font-mono tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={() => {
                  if (!promoCode.trim()) return;
                  const check = checkPromo(promoCode);
                  if (check.status === 'valid') {
                    const res = redeemPromo(promoCode);
                    if (res) {
                      onWin(res.user, res.amount);
                      setPromoState({ type: 'ok', amount: res.amount });
                      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                      setPromoCode('');
                    }
                  } else {
                    setPromoState({ type: check.status === 'used' ? 'used' : 'bad' });
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all active:scale-95 shrink-0"
              >
                {t.promoBtn}
              </button>
            </div>
            {promoState && (
              <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                promoState.type === 'ok' ? 'text-emerald-400' :
                promoState.type === 'used' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {promoState.type === 'ok' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {promoState.type === 'ok' ? `${t.promoOk}${promoState.amount}` : promoState.type === 'used' ? t.promoUsed : t.promoBad}
              </div>
            )}
          </div>

          {/* Spin button or countdown */}
          {eligible ? (
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-amber-600/40 disabled:opacity-60 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSpinning ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  {t.spinning}
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4 text-yellow-200" />
                  {t.spin}
                </>
              )}
            </button>
          ) : (
            <div className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {t.comeBack}
              </div>
              <div className="text-sm font-bold text-sky-300 mt-1 tabular-nums">
                {fmtTime(remaining, language)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinModal;

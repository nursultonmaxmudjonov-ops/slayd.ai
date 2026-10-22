/**
 * SlaydAI Credit System
 * - New user signup bonus: 300 credits
 * - Daily login bonus: 100 credits (once per calendar day)
 * - Weekly SPIN: once per week — jackpot segment 1000, others 10-100
 * - Cost: 100 credits per slide
 */

export const SIGNUP_BONUS = 300;
export const DAILY_BONUS = 100;
export const CREDITS_PER_SLIDE = 100;

/** Weekly spin wheel segments (8 segments, indexed by wheel position) */
export const SPIN_SEGMENTS = [100, 25, 1000, 50, 100, 10, 75, 40];
export const SPIN_JACKPOT_INDEX = 2; // the 1000 segment

const STORAGE_KEY = 'slaydai_user';

export interface CreditUser {
  name: string;
  email: string;
  phone: string;
  credits: number;
  /** ISO date (yyyy-mm-dd) of the last daily bonus claim */
  lastDailyBonus: string | null;
  /** ISO date (yyyy-mm-dd) of the last weekly spin — new week resets it */
  lastWeeklySpin: string | null;
  /** ISO date the account was created (first login) */
  joinedAt: string;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** ISO week key (yyyy-Wnn) — spin resets every calendar week */
export function weekKey(d: Date = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/** Milliseconds until the spin becomes available again (end of current week, Sunday 23:59:59) */
export function msUntilNextSpin(): number {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = now.getDay() || 7; // Mon=1..Sun=7
  end.setDate(end.getDate() + (8 - day)); // next Monday 00:00
  return Math.max(0, end.getTime() - now.getTime());
}

export function canSpin(user: CreditUser): boolean {
  return user.lastWeeklySpin !== weekKey();
}

export function loadUser(): CreditUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as CreditUser;
    if (typeof user.credits !== 'number') return null;
    return user;
  } catch {
    return null;
  }
}

function saveUser(user: CreditUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

/** Is the daily bonus available right now? */
export function canClaimDaily(user: CreditUser): boolean {
  return user.lastDailyBonus !== today();
}

/** Milliseconds until the next daily bonus resets (next local midnight) */
export function msUntilNextDaily(): number {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.max(0, nextMidnight.getTime() - now.getTime());
}

/**
 * Auto-claim the daily bonus if a new day has started. Call this on app load / focus.
 * Returns the updated user and whether the bonus was granted, or null if not eligible.
 */
export function autoClaimDaily(): { user: CreditUser; granted: boolean } | null {
  const user = loadUser();
  if (!user) return null;
  if (user.lastDailyBonus === today()) return { user, granted: false };
  user.credits += DAILY_BONUS;
  user.lastDailyBonus = today();
  saveUser(user);
  return { user, granted: true };
}

/**
 * Login / Signup. If the user already exists, adds the daily bonus when eligible.
 * Returns the user and whether bonuses were granted this call.
 */
export function login(name: string, email: string, phone: string): {
  user: CreditUser;
  signupBonus: boolean;
  dailyBonus: boolean;
} {
  const existing = loadUser();

  // Existing user: check daily bonus
  if (existing) {
    let dailyBonus = false;
    if (existing.lastDailyBonus !== today()) {
      existing.credits += DAILY_BONUS;
      existing.lastDailyBonus = today();
      dailyBonus = true;
    }
    if (!existing.phone) existing.phone = phone.trim(); // migration for old accounts
    if (!existing.lastWeeklySpin) existing.lastWeeklySpin = null; // migration field
    saveUser(existing);
    return { user: existing, signupBonus: false, dailyBonus };
  }

  // New user: signup bonus + daily bonus on day one
  const user: CreditUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    credits: SIGNUP_BONUS + DAILY_BONUS,
    lastDailyBonus: today(),
    lastWeeklySpin: null,
    joinedAt: today()
  };
  saveUser(user);
  return { user, signupBonus: true, dailyBonus: true };
}

/**
 * Claim the weekly spin. Returns the won segment value and updated user,
 * or null if the spin was already used this week.
 */
export function claimSpin(): { user: CreditUser; won: number; segmentIndex: number } | null {
  const user = loadUser();
  if (!user || !canSpin(user)) return null;

  const segmentIndex = Math.floor(Math.random() * SPIN_SEGMENTS.length);
  const won = SPIN_SEGMENTS[segmentIndex];

  user.credits += won;
  user.lastWeeklySpin = weekKey();
  saveUser(user);
  return { user, won, segmentIndex };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ==================== PROMO CODES ==================== */

/** Promo codes and their credit rewards. Codes are case-insensitive, single-use per account. */
export const PROMO_CODES: Record<string, number> = {
  'UZUMNEW': 300,
  'EXPRESS10': 100,
  'YANDEXSTART': 250,
  'DISCOUNT10': 100,
  'FREESHIP': 150,
  'WELCOME2026': 500,
  'SALE50000': 400,
  'ONLINEONLY': 200,
  'GIFT20': 100,
  'BONUSAPP': 250,

  // WELCOME series (TG bot daily posts)
  'WELCOME0001': 200, 'WELCOME0002': 200, 'WELCOME0003': 200,
  'WELCOME0004': 200, 'WELCOME0005': 200, 'WELCOME0006': 200,
  'WELCOME0007': 200, 'WELCOME0008': 200, 'WELCOME0009': 200,
  'WELCOME0010': 200,

  // DISCOUNT series
  'DISCOUNT001': 150, 'DISCOUNT002': 150, 'DISCOUNT003': 150,
  'DISCOUNT004': 150, 'DISCOUNT005': 150,

  // BONUS2026 series
  'BONUS2026-001': 300, 'BONUS2026-002': 300, 'BONUS2026-003': 300,
  'BONUS2026-004': 300, 'BONUS2026-005': 300,

  // PROMO series
  'PROMO1001': 100, 'PROMO1002': 100, 'PROMO1003': 100,
  'PROMO1004': 100, 'PROMO1005': 100,

  // EXPRESS series
  'EXPRESS001': 150, 'EXPRESS002': 150, 'EXPRESS003': 150,
  'EXPRESS004': 150, 'EXPRESS005': 150,

  // SALE series
  'SALE100': 250, 'SALE101': 250, 'SALE102': 250,
  'SALE103': 250, 'SALE104': 250,

  // VIP series
  'VIPGIFT01': 500, 'VIPGIFT02': 500, 'VIPGIFT03': 500,
  'VIPGIFT04': 500, 'VIPGIFT05': 500,

  // FREESHIP series
  'FREESHIP01': 200, 'FREESHIP02': 200, 'FREESHIP03': 200,
  'FREESHIP04': 200, 'FREESHIP05': 200,

  // APPONLY series
  'APPONLY01': 250, 'APPONLY02': 250, 'APPONLY03': 250,
  'APPONLY04': 250, 'APPONLY05': 250
};

/**
 * Weekly featured promo: one random UNUSED code is highlighted each week.
 * Deterministic per ISO week — same code for everyone during that week.
 */
export function getWeeklyFeaturedPromo(): { code: string; amount: number } | null {
  const used = loadUsedPromos();
  const available = Object.keys(PROMO_CODES).filter(c => !used.includes(c));
  if (available.length === 0) return null;

  // Deterministic: seed by week key + list of available codes
  const wk = weekKey();
  let seed = 0;
  for (const ch of wk) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  for (const c of available) {
    for (const ch of c) seed = (seed * 33 + ch.charCodeAt(0)) >>> 0;
  }
  const code = available[seed % available.length];
  return { code, amount: PROMO_CODES[code] };
}

const USED_PROMOS_KEY = 'slaydai_used_promos';

function loadUsedPromos(): string[] {
  try {
    const raw = localStorage.getItem(USED_PROMOS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveUsedPromos(promos: string[]) {
  localStorage.setItem(USED_PROMOS_KEY, JSON.stringify(promos));
}

/** Check a promo code. Returns reward amount if valid & unused, 0 if invalid, -1 if already used. */
export function checkPromo(code: string): { status: 'valid' | 'invalid' | 'used'; amount: number } {
  const normalized = code.trim().toUpperCase();
  const amount = PROMO_CODES[normalized];
  if (!amount) return { status: 'invalid', amount: 0 };
  if (loadUsedPromos().includes(normalized)) return { status: 'used', amount };
  return { status: 'valid', amount };
}

/** Redeem a promo code: adds credits and marks it used. Returns updated user or null. */
export function redeemPromo(code: string): { user: CreditUser; amount: number } | null {
  const check = checkPromo(code);
  if (check.status !== 'valid') return null;

  const user = loadUser();
  if (!user) return null;

  user.credits += check.amount;
  saveUser(user);

  const used = loadUsedPromos();
  used.push(code.trim().toUpperCase());
  saveUsedPromos(used);

  return { user, amount: check.amount };
}

/** Promo codes the user hasn't used yet (for UI hints) */
export function getAvailablePromoCount(): number {
  const used = loadUsedPromos();
  return Object.keys(PROMO_CODES).filter(c => !used.includes(c)).length;
}

/** Does the user have enough credits for `slideCount` slides? */
export function hasEnoughCredits(credits: number, slideCount: number): boolean {
  return credits >= slideCount * CREDITS_PER_SLIDE;
}

/**
 * Spend credits for a generation. Returns the updated user,
 * or null if balance is insufficient.
 */
export function spendCredits(credits: number, slideCount: number): CreditUser | null {
  const cost = slideCount * CREDITS_PER_SLIDE;
  if (credits < cost) return null;
  const user = loadUser();
  if (!user || user.credits < cost) return null;
  user.credits -= cost;
  saveUser(user);
  return user;
}

/** Credits remaining needed, for "need X more" messages */
export function creditsNeeded(credits: number, slideCount: number): number {
  const cost = slideCount * CREDITS_PER_SLIDE;
  return Math.max(0, cost - credits);
}

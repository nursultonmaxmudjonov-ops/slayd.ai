import React from 'react';
import { detectCategory, VisualCategory } from '../services/imageService';

interface MinimalistAIVisualProps {
  topic: string;
  slideTitle?: string;
  primaryColor?: string;
  accentColor?: string;
}

export const MinimalistAIVisual: React.FC<MinimalistAIVisualProps> = ({
  topic,
  slideTitle = '',
  primaryColor = '#6366f1',
  accentColor = '#a855f7'
}) => {
  const category: VisualCategory = detectCategory(`${topic} ${slideTitle}`);

  return (
    <div className="w-full h-full min-h-[220px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-white/10 shadow-inner group">
      {/* Background ambient lighting */}
      <div 
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      {/* CATEGORY 1: SOLAR / SUN / SPACE (e.g., QUYOSH TARKIBI) */}
      {category === 'solar' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          <defs>
            <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="sunCorona" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer orbital rings */}
          <circle cx="200" cy="150" r="120" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
          <circle cx="200" cy="150" r="95" fill="none" stroke="#ea580c" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
          <circle cx="200" cy="150" r="135" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.2" />

          {/* Corona atmosphere */}
          <circle cx="200" cy="150" r="85" fill="url(#sunCorona)" />

          {/* Glowing Sun Core */}
          <circle cx="200" cy="150" r="55" fill="url(#sunCore)" className="animate-pulse" />

          {/* Solar Prominences / Plasma Flares */}
          <path d="M 170 100 Q 150 70 190 85" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 230 110 Q 260 80 240 100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M 255 160 Q 290 170 250 185" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 145 165 Q 110 150 145 180" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

          {/* Composition Labels (Hydrogen & Helium) */}
          <g transform="translate(60, 60)" className="text-[10px] font-mono fill-amber-200">
            <rect x="0" y="0" width="75" height="24" rx="6" fill="#1e293b" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="37" y="16" textAnchor="middle" fontWeight="bold">H₂ (74%)</text>
          </g>

          <g transform="translate(265, 210)" className="text-[10px] font-mono fill-amber-200">
            <rect x="0" y="0" width="75" height="24" rx="6" fill="#1e293b" fillOpacity="0.8" stroke="#ea580c" strokeWidth="0.8" />
            <text x="37" y="16" textAnchor="middle" fontWeight="bold">He (24%)</text>
          </g>

          {/* Orbiting fusion particles */}
          <circle cx="105" cy="150" r="3.5" fill="#fde047" />
          <circle cx="295" cy="150" r="2.5" fill="#f97316" />
          <circle cx="200" cy="30" r="3" fill="#fde047" />
        </svg>
      )}

      {/* CATEGORY 2: AI / TECH / IT */}
      {category === 'ai' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          {/* Connecting Synapse Lines */}
          <g stroke="#6366f1" strokeWidth="1.5" opacity="0.4">
            <line x1="80" y1="150" x2="160" y2="80" />
            <line x1="80" y1="150" x2="160" y2="150" />
            <line x1="80" y1="150" x2="160" y2="220" />
            <line x1="160" y1="80" x2="240" y2="100" />
            <line x1="160" y1="150" x2="240" y2="100" />
            <line x1="160" y1="150" x2="240" y2="200" />
            <line x1="160" y1="220" x2="240" y2="200" />
            <line x1="240" y1="100" x2="320" y2="150" />
            <line x1="240" y1="200" x2="320" y2="150" />
          </g>

          {/* Glowing Synapse Nodes */}
          {[
            { cx: 80, cy: 150, r: 8, col: '#818cf8' },
            { cx: 160, cy: 80, r: 7, col: '#6366f1' },
            { cx: 160, cy: 150, r: 9, col: '#a855f7' },
            { cx: 160, cy: 220, r: 7, col: '#6366f1' },
            { cx: 240, cy: 100, r: 9, col: '#a855f7' },
            { cx: 240, cy: 200, r: 8, col: '#6366f1' },
            { cx: 320, cy: 150, r: 11, col: '#22d3ee' }
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r={n.r + 5} fill={n.col} opacity="0.25" />
              <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.col} />
              <circle cx={n.cx} cy={n.cy} r={n.r / 2.5} fill="#ffffff" />
            </g>
          ))}

          {/* AI Badge */}
          <g transform="translate(145, 245)">
            <rect x="0" y="0" width="110" height="24" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="55" y="16" fill="#c7d2fe" textAnchor="middle" fontSize="10" fontWeight="bold">NEURAL ENGINE</text>
          </g>
        </svg>
      )}

      {/* CATEGORY 3: MEDICINE / HEALTH */}
      {category === 'medicine' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          {/* DNA Double Helix Strands */}
          <path d="M 100 80 Q 200 120 300 80 Q 200 180 100 220" fill="none" stroke="#10b981" strokeWidth="3" opacity="0.8" />
          <path d="M 100 220 Q 200 180 300 220 Q 200 120 100 80" fill="none" stroke="#06b6d4" strokeWidth="3" opacity="0.8" />

          {/* Base pairs */}
          {[120, 150, 180, 210, 240, 270].map((x, i) => (
            <line key={i} x1={x} y1="120" x2={x} y2="180" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="2 3" opacity="0.6" />
          ))}

          {/* Molecular Nodes */}
          <circle cx="200" cy="150" r="14" fill="#10b981" opacity="0.3" />
          <circle cx="200" cy="150" r="8" fill="#10b981" />
          <circle cx="200" cy="150" r="3" fill="#ffffff" />

          <g transform="translate(135, 245)">
            <rect x="0" y="0" width="130" height="24" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
            <text x="65" y="16" fill="#a7f3d0" textAnchor="middle" fontSize="10" fontWeight="bold">BIO-METRIC CORE</text>
          </g>
        </svg>
      )}

      {/* CATEGORY 4: BUSINESS / FINANCE / GROWTH */}
      {category === 'business' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          {/* Grid lines */}
          <line x1="80" y1="220" x2="320" y2="220" stroke="#334155" strokeWidth="1.5" />
          <line x1="80" y1="160" x2="320" y2="160" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
          <line x1="80" y1="100" x2="320" y2="100" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

          {/* 3D Growth Bars */}
          <rect x="100" y="150" width="35" height="70" rx="6" fill="#3b82f6" opacity="0.8" />
          <rect x="155" y="120" width="35" height="100" rx="6" fill="#6366f1" opacity="0.85" />
          <rect x="210" y="80" width="35" height="140" rx="6" fill="#8b5cf6" opacity="0.9" />
          <rect x="265" y="50" width="35" height="170" rx="6" fill="#ec4899" />

          {/* Upward Growth Arrow Curve */}
          <path d="M 115 140 Q 200 90 282 38" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
          <polygon points="285,32 288,46 276,40" fill="#22d3ee" />

          <g transform="translate(130, 245)">
            <rect x="0" y="0" width="140" height="24" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="70" y="16" fill="#c7d2fe" textAnchor="middle" fontSize="10" fontWeight="bold">GROWTH STRATEGY</text>
          </g>
        </svg>
      )}

      {/* CATEGORY 5: ECOLOGY / GREEN ENERGY */}
      {category === 'ecology' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          {/* Energy Leaf */}
          <path d="M 200 70 Q 280 120 230 210 Q 180 230 160 180 Q 140 100 200 70 Z" fill="#10b981" opacity="0.8" />
          <path d="M 200 80 Q 195 150 180 200" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

          {/* Sun / Energy rays */}
          <circle cx="280" cy="70" r="24" fill="#fbbf24" opacity="0.7" />
          <circle cx="280" cy="70" r="35" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />

          {/* Wind Wave lines */}
          <path d="M 80 180 Q 120 160 160 180 T 240 180" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M 100 210 Q 140 190 180 210 T 260 210" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          <g transform="translate(130, 245)">
            <rect x="0" y="0" width="140" height="24" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
            <text x="70" y="16" fill="#a7f3d0" textAnchor="middle" fontSize="10" fontWeight="bold">CLEAN ENERGY ECO</text>
          </g>
        </svg>
      )}

      {/* CATEGORY 6: GENERAL / ABSTRACT */}
      {(category === 'general' || category === 'education') && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] p-4 drop-shadow-2xl">
          {/* Geometric isometric polygon */}
          <polygon points="200,60 280,110 280,200 200,250 120,200 120,110" fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.7" />
          <polygon points="200,60 200,150 280,200" fill="#6366f1" opacity="0.4" />
          <polygon points="200,150 120,200 200,250" fill="#4f46e5" opacity="0.6" />
          <polygon points="200,60 120,110 200,150" fill="#818cf8" opacity="0.5" />

          {/* Glowing central orb */}
          <circle cx="200" cy="150" r="15" fill="#a855f7" className="animate-ping" opacity="0.3" />
          <circle cx="200" cy="150" r="8" fill="#ffffff" />

          <g transform="translate(145, 260)">
            <rect x="0" y="0" width="110" height="22" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.8" />
            <text x="55" y="15" fill="#c7d2fe" textAnchor="middle" fontSize="9" fontWeight="bold">INNOVATION</text>
          </g>
        </svg>
      )}

      {/* Floating Badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-semibold text-slate-300 backdrop-blur-md flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Minimalist AI</span>
      </div>
    </div>
  );
};

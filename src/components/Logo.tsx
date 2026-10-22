import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * SlaydAI brand logo — a stylized "S" slide deck mark with an AI spark.
 * Pure SVG, scales to any size.
 */
export const Logo: React.FC<LogoProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SlaydAI logo"
    >
      <defs>
        <linearGradient id="slaydai-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="slaydai-spark" x1="30" y1="8" x2="42" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#slaydai-grad)" />

      {/* Slide deck layers */}
      <rect x="12" y="14" width="24" height="16" rx="3" fill="#ffffff" opacity="0.95" />
      <rect x="12" y="32" width="24" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />

      {/* "S" curve on the slide */}
      <path
        d="M27 17.5c-1.4-1-4.6-1-5.7 0.5-1.1 1.6 0.4 2.7 2.9 3.2 2.5 0.5 4 1.6 2.9 3.2-1.1 1.5-4.3 1.5-5.7 0.5"
        stroke="#7c3aed"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* AI spark */}
      <path
        d="M36 7l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2L36 7z"
        fill="url(#slaydai-spark)"
      />
    </svg>
  );
};

export default Logo;

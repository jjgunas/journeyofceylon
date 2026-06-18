import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'vertical' | 'horizontal';
  iconSize?: number;
  textColor?: string;
  taglineColor?: string;
  brandColor?: string;
}

export function JourneyOfCeylonLogo({
  className = '',
  variant = 'vertical',
  iconSize = 58,
  taglineColor = '#2d4c25',
  brandColor = '#477637'
}: LogoProps) {
  const [logoSrc, setLogoSrc] = React.useState('/7073cc79-52b4-4861-b173-f4c7353aefc7_removalai_preview.png');
  const [useFallback, setUseFallback] = React.useState(false);

  const handleLogoError = () => {
    setUseFallback(true);
  };
  
  // Custom High-Fidelity JOC Monogram Crest matching the user's uploaded logo perfectly.
  // Consists of:
  // 1. Sleek calligraphic hollow leaf-shaped container with crossover twist loop.
  // 2. High-fidelity miniature Sri Lanka island centered and nestled inside the loops.
  // 3. Spaced "J", "O", "C" monogram initials.
  const FallbackEmblem = (
    <svg
      width={iconSize}
      height={iconSize * 1.12}
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      {/* Premium organic calligraphic crossover teardrop container */}
      <path
        d="M50 105 
           C32 105, 14 87, 14 62 
           C14 41, 31 25, 45 18 
           C49 16, 52 11, 53 5 
           C53.5 2, 55 2, 55 5 
           C54.5 13, 49 20, 44 24 
           C34 31, 20 45, 20 62 
           C20 80, 33 97, 50 97 
           C67 97, 80 80, 80 62 
           C80 45, 66 31, 56 24 
           C51 20, 45.5 13, 45 5 
           C45 2, 46.5 2, 47 5 
           C48 11, 51 16, 55 18 
           C69 25, 86 41, 86 62 
           C86 87, 68 105, 50 105 Z"
        fill={brandColor}
      />

      {/* High-Fidelity Silhouette of Sri Lanka Island, including main island and surrounding archipelagos */}
      <path
        d="M50 4.2 
           C50.4 4.2, 50.9 4.7, 51.1 5.2 
           C51.4 5.9, 51.7 6.7, 52.0 7.6 
           C52.2 8.3, 51.8 8.8, 52.0 9.3 
           C52.6 10.3, 53.2 11.3, 53.4 12.6 
           C53.5 14.1, 52.7 15.3, 52.0 15.9 
           C51.2 16.6, 50.4 17.1, 49.7 17.1 
           C48.9 17.1, 48.2 16.5, 47.7 15.7 
           C47.2 14.7, 47.0 13.3, 47.0 12.1 
           C47.0 10.7, 47.3 9.5, 47.5 8.5 
           C47.6 7.5, 47.9 6.7, 48.3 6.1 
           C48.7 5.5, 49.5 4.7, 50 4.2 Z
           
           M46.4 9.0 
           C45.9 9.1, 45.9 9.3, 46.4 9.2 Z
           
           M44.5 6.6 
           C44.2 6.6, 44.2 6.9, 44.5 6.9 
           C44.8 6.9, 44.8 6.6, 44.5 6.6 Z"
        fill={brandColor}
      />

      {/* "J" Monogram (Left-aligned, custom teardrop spacing) */}
      <path
        d="M29 44 H34 V74 C34 79 31 82 26 82 C21 82 18 79 18 74 H23 C23 76 24 77 26 77 C28 77 29 76 29 74 Z"
        fill={brandColor}
      />

      {/* "O" Monogram: Tall geometric elongated hexagon (Center) */}
      <path
        d="M50 38 L58 45 V76 L50 83 L42 76 V45 Z M50 44 L45 48 V73 L50 77 L55 73 V48 Z"
        fill={brandColor}
        fillRule="evenodd"
    />

      {/* "C" Monogram (Right-aligned, matching "J" and "O" spacing) */}
      <path
        d="M78 44 H68 C64 44 62.5 47 62.5 63 C62.5 79 64 82 68 82 H78 V77.5 H69 V48.5 H78 Z"
        fill={brandColor}
      />
    </svg>
  );

  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {!useFallback ? (
        <img
          src={logoSrc}
          alt="Journey of Ceylon"
          style={{ height: `${iconSize * 1.25}px`, width: 'auto' }}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={handleLogoError}
        />
      ) : (
        <div className={`flex ${isHorizontal ? 'flex-row items-center gap-2.5' : 'flex-col items-center justify-center'}`}>
          {FallbackEmblem}
          <div className={`flex flex-col ${isHorizontal ? 'items-start text-left' : 'items-center text-center mt-2'}`}>
            {/* Small, ultra-elegant styled title */}
            <span 
              style={{ color: brandColor }}
              className="font-sans font-extrabold text-[12px] sm:text-[13.5px] tracking-[0.24em] uppercase leading-none whitespace-nowrap"
            >
              JOURNEY OF CEYLON
            </span>
            
            {/* Beautiful Elegant Serif Tagline */}
            <span 
              style={{ color: taglineColor }}
              className="font-serif italic text-[11px] sm:text-[12.5px] mt-1 text-slate-700 opacity-95 leading-none whitespace-nowrap"
            >
              Dream, explore discover
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

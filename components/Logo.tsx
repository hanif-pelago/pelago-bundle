import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto", variant = 'color' }) => {
  const [useFallback, setUseFallback] = useState(false);

  // If variant is white, we force SVG because we don't have a white PNG URL readily available
  // The SVG is constructed to look good on dark backgrounds when variant is white
  const forceSvg = variant === 'white';

  if (useFallback || forceSvg) {
    const textColor = variant === 'white' ? '#FFFFFF' : '#1A1A1A';
    const subTextColor = variant === 'white' ? '#FFFFFF' : '#00266B';
    const pFill = variant === 'white' ? '#DDF000' : '#1A1A1A'; // Lime P on dark, Black P on light
    const circleFill = variant === 'white' ? '#1A1A1A' : '#FFFFFF';
    const birdStroke = variant === 'white' ? '#FFFFFF' : '#FDB022';

    return (
      <svg 
        viewBox="0 0 360 80" 
        className={className} 
        aria-label="Pelago by Singapore Airlines"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pelago 'P' Mark */}
        <path d="M40 40 C40 62.09 22.09 80 0 80 L0 0 L20 0 C42.09 0 60 17.91 60 40 L40 40 Z" fill={pFill} />
        <circle cx="20" cy="40" r="12" fill={circleFill} />
        
        {/* 'pelago' text */}
        <text x="75" y="58" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="52" fill={textColor} letterSpacing="-2">pelago</text>
        
        {/* 'by' text */}
        <text x="250" y="58" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="20" fill={textColor}>by</text>
        
        {/* SINGAPORE AIRLINES Lockup */}
        <g transform="translate(285, 28)">
           <text x="0" y="0" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill={subTextColor} letterSpacing="0.5">SINGAPORE</text>
           <text x="0" y="16" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill={subTextColor} letterSpacing="0.5">AIRLINES</text>
        </g>

        {/* SIA Bird Icon (Stylized Wings) */}
        <g transform="translate(390, 15) scale(0.8)">
          <path d="M0,40 Q20,10 50,25 T80,40" fill="none" stroke={birdStroke} strokeWidth="8" />
          <path d="M10,55 Q30,25 60,40 T90,55" fill="none" stroke={birdStroke} strokeWidth="6" />
          <path d="M20,70 Q40,40 70,55" fill="none" stroke={birdStroke} strokeWidth="4" />
        </g>
      </svg>
    );
  }

  return (
    <img 
      src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt02206774e1d5203f/63c0e3a68134261563f69904/Pelago_Logo_Primary_Full_Color.png" 
      alt="Pelago by Singapore Airlines" 
      className={`object-contain ${className}`}
      onError={() => setUseFallback(true)}
    />
  );
};

export default Logo;
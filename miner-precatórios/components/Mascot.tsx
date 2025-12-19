
import React from 'react';

interface MascotProps {
  variant?: 'logo' | 'full' | 'mining';
  className?: string;
  size?: number;
}

const Mascot: React.FC<MascotProps> = ({ variant = 'full', className = '', size = 64 }) => {
  // Palette matching the "cartoon sticker" style
  const c = {
    outline: '#1E293B', // Dark Slate/Black for thick outlines
    skin: '#FFE4C4',    // Bisque/Light Skin
    helmet: '#FFC107',  // Amber/Gold Yellow
    helmetDark: '#F59E0B', // Darker yellow for depth
    shirt: '#334155',   // Dark Blue/Grey Shirt
    shirtLight: '#475569', // Lighter shirt fold
    lens: '#FFFFFF',    // White glass reflection
    tabletBack: '#1E293B', // Dark Tablet
    tabletScreen: '#1E293B', // Dark Screen bg
    chartLine: '#4ADE80', // Green ascending line
    chartArrow: '#4ADE80'
  };

  const sw = 3.5; // Stroke Width - thick for cartoon effect

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Reusable Head Component */}
        <g id="minerHead">
          {/* Ears */}
          <circle cx="24" cy="55" r="5" fill={c.skin} stroke={c.outline} strokeWidth={sw} />
          <circle cx="76" cy="55" r="5" fill={c.skin} stroke={c.outline} strokeWidth={sw} />

          {/* Face Shape (Extended up for forehead) */}
          {/* Starting higher (y=32) to create forehead space below helmet */}
          <path d="M28 32 V60 Q28 75 50 75 Q72 75 72 60 V32" fill={c.skin} stroke={c.outline} strokeWidth={sw} />

          {/* Nose */}
          <path d="M50 58 Q48 62 52 62" fill="none" stroke={c.outline} strokeWidth={sw} strokeLinecap="round" />

          {/* Mouth (Smile) */}
          <path d="M42 66 Q50 72 58 66" fill="none" stroke={c.outline} strokeWidth={sw} strokeLinecap="round" />

          {/* Glasses (Big Round Frames) - Centered at y=52 to have space below hat */}
          <g>
            <circle cx="38" cy="52" r="8" fill={c.lens} stroke={c.outline} strokeWidth={sw} />
            <circle cx="62" cy="52" r="8" fill={c.lens} stroke={c.outline} strokeWidth={sw} />
            {/* Bridge */}
            <line x1="46" y1="52" x2="54" y2="52" stroke={c.outline} strokeWidth={sw} />
            {/* Eyes (Dots) */}
            <circle cx="38" cy="52" r="2.5" fill={c.outline} />
            <circle cx="62" cy="52" r="2.5" fill={c.outline} />
          </g>

          {/* Helmet - MOVED UP significantly to reveal forehead */}
          {/* Back Rim - narrower */}
          <path d="M20 34 H80" stroke={c.outline} strokeWidth={sw} strokeLinecap="round" />
          
          {/* Dome - Base at y=34, Peak at y=12 */}
          <path d="M24 34 Q24 12 50 12 Q76 12 76 34 Z" fill={c.helmet} stroke={c.outline} strokeWidth={sw} />
          
          {/* Front Rim - Base at y=34 */}
          <path d="M20 34 Q20 29 24 29 H76 Q80 29 80 34 Q80 39 76 39 H24 Q20 39 20 34 Z" fill={c.helmet} stroke={c.outline} strokeWidth={sw} />
          
          {/* Lamp Mount - Moved up */}
          <rect x="43" y="18" width="14" height="10" rx="2" fill={c.helmetDark} stroke={c.outline} strokeWidth={sw} />
        </g>

        {/* Reusable Tablet Component */}
        <g id="tabletGraphic">
          <rect x="0" y="0" width="44" height="34" rx="4" fill={c.tabletBack} stroke={c.outline} strokeWidth={sw} />
          {/* Chart Line */}
          <polyline points="8,24 16,18 22,22 30,12 36,10" fill="none" stroke={c.chartLine} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arrow */}
          <path d="M32 10 H36 V14" stroke={c.chartLine} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </defs>

      {/* === RENDER LOGO VARIANT (Head only) === */}
      {variant === 'logo' && (
        <g transform="translate(0, 5)">
           <use href="#minerHead" />
        </g>
      )}

      {/* === RENDER FULL VARIANT (Body + Tablet) === */}
      {(variant === 'full' || variant === 'mining') && (
        <g>
          {/* Body / Shirt */}
          {/* Shoulders */}
          <path d="M25 75 Q20 85 15 100 H85 Q80 85 75 75" fill={c.shirt} stroke={c.outline} strokeWidth={sw} />
          
          {/* Collar */}
          <path d="M50 75 L38 82 L35 75 M50 75 L62 82 L65 75" fill="none" stroke={c.outline} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M50 75 V100" stroke={c.outline} strokeWidth={sw} />

          {/* Head (Layered on top of neck/body) */}
          <use href="#minerHead" />

          {/* Arms holding tablet */}
          {/* Left Arm curve */}
          <path d="M20 90 Q25 95 30 95" fill="none" stroke={c.shirt} strokeWidth="6" strokeLinecap="round" />
          {/* Right Arm curve */}
          <path d="M80 90 Q75 95 70 95" fill="none" stroke={c.shirt} strokeWidth="6" strokeLinecap="round" />

          {/* Tablet (Centered) */}
          <g transform="translate(28, 70)">
             <use href="#tabletGraphic" />
          </g>

          {/* Hands (Simple thumb overlay) */}
          {/* Left Thumb */}
          <ellipse cx="26" cy="85" rx="5" ry="4" fill={c.skin} stroke={c.outline} strokeWidth={sw} />
          {/* Right Thumb */}
          <ellipse cx="74" cy="85" rx="5" ry="4" fill={c.skin} stroke={c.outline} strokeWidth={sw} />
        </g>
      )}

    </svg>
  );
};

export default Mascot;

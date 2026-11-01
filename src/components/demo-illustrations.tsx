/**
 * Flat illustrations for the Business demos. They stand in for the photos a real
 * business would send us, and take the site's colours so every demo looks its own.
 */

type IllustrationProps = {
  primary: string;
  accent: string;
  light: string;
  className?: string;
  /** Shows wear and damage: used as the "before" side of the before/after slider. */
  damaged?: boolean;
  /** Fill the box like a cover photo instead of letterboxing. */
  cover?: boolean;
};

export function BathroomIllustration({primary, accent, light, className, damaged, cover}: IllustrationProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} preserveAspectRatio={cover ? 'xMidYMid slice' : undefined} role="img" aria-hidden="true">
      <rect width="640" height="480" fill={light} />
      {/* tiled wall */}
      <g opacity="0.55">
        {Array.from({length: 9}).map((_, row) =>
          Array.from({length: 7}).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={300 + col * 48}
              y={20 + row * 40}
              width="46"
              height="38"
              rx="3"
              fill="#ffffff"
              stroke={primary}
              strokeOpacity="0.12"
            />
          ))
        )}
      </g>
      {/* floor */}
      <rect y="380" width="640" height="100" fill={primary} opacity="0.12" />
      {/* walk-in shower glass */}
      <rect x="360" y="70" width="230" height="310" rx="6" fill="#ffffff" opacity="0.35" stroke={primary} strokeOpacity="0.35" strokeWidth="3" />
      <line x1="420" y1="70" x2="420" y2="380" stroke={primary} strokeOpacity="0.2" strokeWidth="2" />
      {/* shower head and water */}
      <path d="M520 70 v40 h-30" stroke={primary} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="465" y="104" width="50" height="12" rx="6" fill={primary} />
      {!damaged
        ? Array.from({length: 7}).map((_, index) => (
            <line
              key={index}
              x1={470 + index * 7}
              y1="124"
              x2={462 + index * 9}
              y2="260"
              stroke={accent}
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="10 12"
            />
          ))
        : null}
      {/* vanity */}
      <rect x="60" y="250" width="200" height="110" rx="10" fill={primary} />
      <rect x="76" y="270" width="78" height="72" rx="6" fill="#ffffff" opacity="0.12" />
      <rect x="166" y="270" width="78" height="72" rx="6" fill="#ffffff" opacity="0.12" />
      <rect x="50" y="236" width="220" height="18" rx="6" fill="#ffffff" />
      <ellipse cx="160" cy="236" rx="52" ry="10" fill={light} />
      <path d="M160 200 v-22 h24" stroke={primary} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* mirror */}
      <rect x="90" y="60" width="140" height="120" rx="60" fill="#ffffff" stroke={primary} strokeOpacity="0.25" strokeWidth="4" />
      <path d="M130 90 l30 -14" stroke={primary} strokeOpacity="0.15" strokeWidth="8" strokeLinecap="round" />
      {/* boiler */}
      <rect x="290" y="150" width="56" height="86" rx="8" fill="#ffffff" stroke={primary} strokeOpacity="0.3" strokeWidth="3" />
      <circle cx="318" cy="180" r="10" fill={accent} />
      <rect x="302" y="204" width="32" height="6" rx="3" fill={primary} opacity="0.3" />
      {/* plant + towel */}
      <rect x="282" y="330" width="34" height="50" rx="6" fill={accent} />
      <path d="M299 330 c-20 -30 -14 -60 0 -70 c14 10 20 40 0 70" fill={primary} opacity="0.7" />
      <rect x="40" y="380" width="120" height="10" rx="5" fill={accent} opacity="0.6" />
      {damaged ? <Damage primary={primary} /> : null}
    </svg>
  );
}

export function KitchenIllustration({primary, accent, light, className, damaged, cover}: IllustrationProps) {
  const wood = damaged ? '#9c8a78' : '#b07a4a';
  const woodDark = damaged ? '#7d6e60' : '#8a5a33';
  return (
    <svg viewBox="0 0 640 480" className={className} preserveAspectRatio={cover ? 'xMidYMid slice' : undefined} role="img" aria-hidden="true">
      <rect width="640" height="480" fill={light} />
      {/* sloped ceiling */}
      <path d="M0 0 H640 V40 L0 150 Z" fill={primary} opacity="0.12" />
      {/* window */}
      <rect x="440" y="70" width="140" height="120" rx="4" fill="#ffffff" stroke={woodDark} strokeWidth="8" />
      <line x1="510" y1="70" x2="510" y2="190" stroke={woodDark} strokeWidth="6" />
      <circle cx="560" cy="100" r="14" fill={accent} opacity="0.35" />
      {/* upper cabinets under the slope */}
      <path d="M40 150 L380 92 V200 H40 Z" fill={wood} />
      {[0, 1, 2, 3].map((index) => (
        <line key={index} x1={125 + index * 85} y1={140 - index * 14} x2={125 + index * 85} y2="200" stroke={woodDark} strokeWidth="3" />
      ))}
      {/* wood grain */}
      {Array.from({length: 6}).map((_, index) => (
        <path
          key={index}
          d={`M${60 + index * 55} 170 q20 -8 40 0 t40 0`}
          stroke={woodDark}
          strokeOpacity="0.35"
          strokeWidth="2"
          fill="none"
        />
      ))}
      {/* backsplash */}
      <rect x="40" y="200" width="560" height="80" fill="#ffffff" opacity="0.6" />
      {/* worktop + base cabinets */}
      <rect x="30" y="280" width="580" height="18" rx="3" fill={primary} />
      <rect x="40" y="298" width="560" height="120" fill={wood} />
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={index}>
          <rect x={52 + index * 110} y="310" width="98" height="96" rx="4" fill="none" stroke={woodDark} strokeWidth="3" />
          <rect x={86 + index * 110} y="322" width="30" height="5" rx="2.5" fill={primary} />
        </g>
      ))}
      {/* hob and hood */}
      <rect x="250" y="272" width="110" height="8" rx="3" fill="#1f1f1f" opacity="0.8" />
      <path d="M270 200 h70 l-12 -40 h-46 z" fill={primary} opacity="0.85" />
      {/* tap, pots, herbs */}
      <path d="M470 280 v-34 q0 -12 14 -12 h16" stroke={primary} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="120" y="250" width="44" height="30" rx="6" fill={accent} />
      <path d="M142 250 c-16 -24 -8 -40 0 -46 c8 6 16 22 0 46" fill="#3f7d4e" />
      <rect x="180" y="258" width="30" height="22" rx="4" fill="#ffffff" />
      {/* floor */}
      <rect y="418" width="640" height="62" fill={woodDark} opacity="0.35" />
      {damaged ? <Damage primary={primary} /> : null}
    </svg>
  );
}

export function RoofIllustration({primary, accent, light, className, damaged, cover}: IllustrationProps) {
  return (
    <svg viewBox="0 0 640 480" className={className} preserveAspectRatio={cover ? 'xMidYMid slice' : undefined} role="img" aria-hidden="true">
      <rect width="640" height="480" fill={light} />
      {/* sky and hills */}
      <circle cx="530" cy="90" r="40" fill={accent} opacity="0.35" />
      <path d="M0 360 Q160 300 320 350 T640 330 V480 H0 Z" fill={primary} opacity="0.12" />
      {/* house body */}
      <rect x="150" y="250" width="340" height="170" fill="#f2efe9" />
      <rect x="290" y="320" width="60" height="100" rx="3" fill={primary} opacity="0.8" />
      <rect x="185" y="290" width="70" height="60" rx="3" fill="#ffffff" stroke={primary} strokeOpacity="0.4" strokeWidth="4" />
      <rect x="385" y="290" width="70" height="60" rx="3" fill="#ffffff" stroke={primary} strokeOpacity="0.4" strokeWidth="4" />
      {/* roof */}
      <path d="M120 262 L320 110 L520 262 Z" fill={primary} />
      {Array.from({length: 7}).map((_, row) => {
        const y = 140 + row * 18;
        const half = ((y - 110) / 152) * 200;
        return (
          <line
            key={row}
            x1={320 - half}
            y1={y}
            x2={320 + half}
            y2={y}
            stroke="#ffffff"
            strokeOpacity="0.14"
            strokeWidth="3"
          />
        );
      })}
      {/* chimney with copper flashing */}
      <rect x="390" y="130" width="34" height="70" fill="#8a8f91" />
      <rect x="386" y="188" width="42" height="10" fill={damaged ? '#7a6a5e' : accent} />
      {/* copper gutter and downpipe */}
      <rect x="112" y="258" width="416" height="10" rx="5" fill={damaged ? '#7a6a5e' : accent} />
      <rect x="506" y="266" width="10" height="154" fill={damaged ? '#7a6a5e' : accent} />
      {/* ladder */}
      <g stroke={primary} strokeWidth="5" opacity="0.7">
        <line x1="90" y1="420" x2="150" y2="240" />
        <line x1="116" y1="420" x2="176" y2="240" />
        {Array.from({length: 7}).map((_, index) => (
          <line key={index} x1={96 + index * 8.5} y1={400 - index * 25} x2={122 + index * 8.5} y2={400 - index * 25} />
        ))}
      </g>
      {damaged ? (
        <g>
          {/* missing tiles and a tarp-free hole */}
          <path d="M300 170 l40 0 l10 22 l-56 0 z" fill="#3b2f2a" />
          <path d="M230 214 l30 -4 l6 18 l-32 4 z" fill="#3b2f2a" />
          <path d="M120 262 L150 250" stroke="#3b2f2a" strokeWidth="8" />
        </g>
      ) : null}
      <rect y="420" width="640" height="60" fill={primary} opacity="0.2" />
      {damaged ? <Damage primary={primary} /> : null}
    </svg>
  );
}

/** Stains and cracks drawn on top of the "before" state. */
function Damage({primary}: {primary: string}) {
  return (
    <g opacity="0.55">
      <ellipse cx="140" cy="110" rx="70" ry="40" fill="#6b5b4a" opacity="0.35" />
      <ellipse cx="520" cy="300" rx="60" ry="34" fill="#6b5b4a" opacity="0.3" />
      <path d="M40 40 l30 40 l-10 30 l26 40" stroke={primary} strokeWidth="3" fill="none" />
      <path d="M600 120 l-24 30 l12 26 l-30 34" stroke={primary} strokeWidth="3" fill="none" />
      <rect width="640" height="480" fill="#000000" opacity="0.08" />
    </g>
  );
}

export const illustrations = {
  bathroom: BathroomIllustration,
  kitchen: KitchenIllustration,
  roof: RoofIllustration
};

export type IllustrationKey = keyof typeof illustrations;

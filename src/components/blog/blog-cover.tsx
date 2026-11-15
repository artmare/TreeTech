import type {ReactElement, ReactNode} from 'react';

import type {CoverVariant} from '@/content/blog-types';
import {cn} from '@/lib/utils';

/**
 * Hand-drawn SVG covers for blog posts. No photos needed, sharp on every screen,
 * and they stay in the TreeTech palette.
 */

const INK = '#1c2220';
const GREEN = '#1f5a42';
const GREEN_DARK = '#163f2f';
const YELLOW = '#f3c431';
const PAPER = '#f2f3ef';
const WHITE = '#ffffff';
const LINE = '#d3d8d2';

type BlogCoverProps = {
  variant: CoverVariant;
  className?: string;
  /** Decorative by default; pass a label when the cover should be announced. */
  label?: string;
};

export function BlogCover({variant, className, label}: BlogCoverProps) {
  const Art = covers[variant];
  return (
    <svg
      viewBox="0 0 1200 630"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Art />
    </svg>
  );
}

function Grid({color, step = 60, opacity = 1}: {color: string; step?: number; opacity?: number}) {
  const lines = [];
  for (let x = step; x < 1200; x += step) lines.push(<line key={`x${x}`} x1={x} y1={0} x2={x} y2={630} />);
  for (let y = step; y < 630; y += step) lines.push(<line key={`y${y}`} x1={0} y1={y} x2={1200} y2={y} />);
  return (
    <g stroke={color} strokeWidth={1.5} opacity={opacity}>
      {lines}
    </g>
  );
}

function Browser({x, y, w, h, children, bar = PAPER}: {x: number; y: number; w: number; h: number; children?: ReactNode; bar?: string}) {
  return (
    <g>
      <rect x={x + 14} y={y + 14} width={w} height={h} rx={26} fill={INK} />
      <rect x={x} y={y} width={w} height={h} rx={26} fill={WHITE} stroke={INK} strokeWidth={6} />
      <path d={`M${x + 3} ${y + 62} H${x + w - 3}`} stroke={INK} strokeWidth={6} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={56} rx={23} fill={bar} />
      <rect x={x + 3} y={y + 30} width={w - 6} height={29} fill={bar} />
      <path d={`M${x + 3} ${y + 62} H${x + w - 3}`} stroke={INK} strokeWidth={6} />
      <circle cx={x + 34} cy={y + 32} r={9} fill={INK} />
      <circle cx={x + 62} cy={y + 32} r={9} fill={INK} opacity={0.35} />
      <circle cx={x + 90} cy={y + 32} r={9} fill={INK} opacity={0.35} />
      {children}
    </g>
  );
}

function Lines({x, y, widths, gap = 30, color = LINE, height = 14}: {x: number; y: number; widths: number[]; gap?: number; color?: string; height?: number}) {
  return (
    <g fill={color}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={height} rx={height / 2} />
      ))}
    </g>
  );
}

function CostsCover() {
  return (
    <>
      <rect width={1200} height={630} fill={YELLOW} />
      <Grid color={INK} opacity={0.08} />
      <Browser x={140} y={110} w={560} h={400}>
        <rect x={180} y={210} width={220} height={150} rx={16} fill={GREEN} />
        <path d="M215 320 l45 -55 l35 35 l25 -25 l45 45" stroke={WHITE} strokeWidth={10} fill="none" strokeLinejoin="round" />
        <Lines x={430} y={220} widths={[220, 170, 200, 120]} />
        <rect x={180} y={400} width={190} height={56} rx={14} fill={YELLOW} stroke={INK} strokeWidth={5} />
        <Lines x={205} y={421} widths={[140]} color={INK} />
      </Browser>
      {/* price tag */}
      <g transform="rotate(-14 900 300)">
        <path d="M760 200 H1010 a24 24 0 0 1 24 24 V430 a24 24 0 0 1 -24 24 H760 L680 327 Z" fill={INK} transform="translate(12 12)" />
        <path d="M760 200 H1010 a24 24 0 0 1 24 24 V430 a24 24 0 0 1 -24 24 H760 L680 327 Z" fill={GREEN} stroke={INK} strokeWidth={6} />
        <circle cx={752} cy={327} r={18} fill={YELLOW} stroke={INK} strokeWidth={6} />
        <text x={905} y={375} textAnchor="middle" fontSize={150} fontWeight={800} fill={WHITE} fontFamily="Archivo Variable, system-ui, sans-serif">€</text>
      </g>
      {/* coins */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <ellipse cx={980} cy={560 - i * 26} rx={78} ry={26} fill={INK} />
          <ellipse cx={980} cy={552 - i * 26} rx={78} ry={26} fill={WHITE} stroke={INK} strokeWidth={5} />
        </g>
      ))}
    </>
  );
}

function GoogleCover() {
  return (
    <>
      <rect width={1200} height={630} fill={GREEN} />
      {/* map roads */}
      <g stroke={GREEN_DARK} strokeWidth={34} fill="none" strokeLinecap="round">
        <path d="M-20 470 C 220 420, 360 520, 620 430 S 1000 300, 1240 360" />
        <path d="M300 -20 C 330 200, 260 380, 330 660" />
        <path d="M860 -20 C 820 160, 940 330, 880 660" />
      </g>
      <g stroke="#2d6e53" strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="2 26">
        <path d="M-20 470 C 220 420, 360 520, 620 430 S 1000 300, 1240 360" />
      </g>
      {/* pin */}
      <g transform="translate(330 70)">
        <path d="M130 0 C 60 0 0 56 0 130 C 0 230 130 360 130 360 C 130 360 260 230 260 130 C 260 56 200 0 130 0 Z" fill={INK} transform="translate(12 12)" />
        <path d="M130 0 C 60 0 0 56 0 130 C 0 230 130 360 130 360 C 130 360 260 230 260 130 C 260 56 200 0 130 0 Z" fill={YELLOW} stroke={INK} strokeWidth={6} />
        <circle cx={130} cy={128} r={54} fill={WHITE} stroke={INK} strokeWidth={6} />
      </g>
      <ellipse cx={460} cy={470} rx={90} ry={18} fill={GREEN_DARK} />
      {/* review card */}
      <g transform="translate(660 170)">
        <rect x={14} y={14} width={420} height={250} rx={24} fill={INK} />
        <rect width={420} height={250} rx={24} fill={WHITE} stroke={INK} strokeWidth={6} />
        <circle cx={70} cy={70} r={32} fill={GREEN} />
        <Lines x={122} y={52} widths={[180, 120]} gap={28} />
        <g fill={YELLOW} stroke={INK} strokeWidth={4} strokeLinejoin="round">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              transform={`translate(${44 + i * 66} 128)`}
              d="M24 0 L31 16 L48 17 L35 29 L39 46 L24 37 L9 46 L13 29 L0 17 L17 16 Z"
            />
          ))}
        </g>
        <Lines x={44} y={200} widths={[300]} />
      </g>
    </>
  );
}

function ChecklistCover() {
  const rows = [0, 1, 2, 3];
  return (
    <>
      <rect width={1200} height={630} fill="#e4e9e2" />
      <Grid color={INK} opacity={0.06} />
      {/* clipboard */}
      <g transform="rotate(-6 420 330)">
        <rect x={204} y={104} width={420} height={470} rx={28} fill={INK} />
        <rect x={190} y={90} width={420} height={470} rx={28} fill={YELLOW} stroke={INK} strokeWidth={6} />
        <rect x={230} y={140} width={340} height={390} rx={14} fill={WHITE} stroke={INK} strokeWidth={5} />
        <rect x={330} y={66} width={140} height={54} rx={14} fill={GREEN} stroke={INK} strokeWidth={6} />
        {rows.map((i) => (
          <g key={i} transform={`translate(262 ${178 + i * 84})`}>
            <rect width={44} height={44} rx={10} fill={i < 3 ? GREEN : WHITE} stroke={INK} strokeWidth={5} />
            {i < 3 ? <path d="M10 23 l9 9 l16 -18" stroke={WHITE} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
            <Lines x={66} y={6} widths={[200, 130]} gap={20} height={12} />
          </g>
        ))}
      </g>
      {/* phone */}
      <g transform="translate(730 110)">
        <rect x={14} y={14} width={250} height={440} rx={40} fill={INK} />
        <rect width={250} height={440} rx={40} fill={INK} />
        <rect x={16} y={16} width={218} height={408} rx={28} fill={WHITE} />
        <rect x={95} y={26} width={60} height={12} rx={6} fill={INK} />
        <rect x={36} y={62} width={178} height={110} rx={14} fill={GREEN} />
        <Lines x={36} y={196} widths={[160, 120, 150]} gap={26} height={12} />
        <rect x={36} y={300} width={178} height={48} rx={12} fill={YELLOW} stroke={INK} strokeWidth={4} />
        <rect x={36} y={360} width={178} height={48} rx={12} fill={WHITE} stroke={INK} strokeWidth={4} />
      </g>
    </>
  );
}

function RemarketingCover() {
  return (
    <>
      <rect width={1200} height={630} fill={INK} />
      <Grid color={WHITE} opacity={0.05} />
      {/* return loop */}
      <path
        d="M720 200 C 980 120, 1120 300, 1010 420 C 920 520, 720 520, 640 450"
        stroke={YELLOW}
        strokeWidth={10}
        fill="none"
        strokeDasharray="4 26"
        strokeLinecap="round"
      />
      <path d="M676 420 L628 446 L682 470" stroke={YELLOW} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Browser x={110} y={120} w={560} h={390}>
        {/* search bar */}
        <rect x={160} y={220} width={460} height={64} rx={32} fill={PAPER} stroke={INK} strokeWidth={5} />
        <circle cx={200} cy={252} r={14} stroke={INK} strokeWidth={5} fill="none" />
        <path d="M210 262 l12 12" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        <Lines x={236} y={245} widths={[230]} color={INK} />
        <rect x={160} y={316} width={460} height={66} rx={14} fill={GREEN} />
        <Lines x={184} y={333} widths={[240, 150]} gap={22} color="#7fa894" height={11} />
        <Lines x={160} y={410} widths={[400, 300]} gap={28} />
      </Browser>
      {/* ad cards along the loop */}
      <g transform="translate(900 150) rotate(8)">
        <rect x={10} y={10} width={170} height={110} rx={16} fill="#000" opacity={0.4} />
        <rect width={170} height={110} rx={16} fill={GREEN} stroke={WHITE} strokeWidth={4} />
        <Lines x={20} y={22} widths={[110, 80]} gap={22} color="#7fa894" height={11} />
        <rect x={20} y={72} width={70} height={22} rx={11} fill={YELLOW} />
      </g>
      <g transform="translate(980 380) rotate(-6)">
        <rect x={10} y={10} width={150} height={96} rx={16} fill="#000" opacity={0.4} />
        <rect width={150} height={96} rx={16} fill={WHITE} stroke={YELLOW} strokeWidth={4} />
        <Lines x={18} y={20} widths={[100, 70]} gap={22} height={11} />
        <rect x={18} y={62} width={60} height={20} rx={10} fill={GREEN} />
      </g>
      {/* cursor */}
      <g transform="translate(760 230)">
        <path d="M0 0 L0 74 L20 56 L34 86 L48 80 L34 50 L60 48 Z" fill={WHITE} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      </g>
    </>
  );
}

function PartnershipCover() {
  return (
    <>
      <rect width={1200} height={630} fill={GREEN} />
      <Grid color={WHITE} opacity={0.06} />
      {/* route between cities */}
      <path d="M150 520 C 400 380, 800 380, 1050 520" stroke={YELLOW} strokeWidth={8} fill="none" strokeDasharray="2 22" strokeLinecap="round" />
      <circle cx={150} cy={520} r={18} fill={YELLOW} stroke={INK} strokeWidth={5} />
      <circle cx={1050} cy={520} r={18} fill={YELLOW} stroke={INK} strokeWidth={5} />
      {/* TreeTech card */}
      <g transform="translate(160 110)">
        <rect x={14} y={14} width={400} height={260} rx={28} fill={INK} />
        <rect width={400} height={260} rx={28} fill={WHITE} stroke={INK} strokeWidth={6} />
        <rect x={44} y={58} width={22} height={52} rx={4} fill={GREEN} />
        <text x={82} y={104} fontSize={56} fontWeight={800} fill={INK} fontFamily="Archivo Variable, system-ui, sans-serif">TreeTech</text>
        <Lines x={44} y={150} widths={[300, 220, 260]} gap={28} />
      </g>
      {/* iWeb card */}
      <g transform="translate(640 110)">
        <rect x={14} y={14} width={400} height={260} rx={28} fill={INK} />
        <rect width={400} height={260} rx={28} fill={YELLOW} stroke={INK} strokeWidth={6} />
        <text x={44} y={104} fontSize={56} fontWeight={800} fill={INK} fontFamily="Archivo Variable, system-ui, sans-serif">iWeb</text>
        <g fill={INK} opacity={0.25}>
          <rect x={44} y={150} width={300} height={14} rx={7} />
          <rect x={44} y={178} width={220} height={14} rx={7} />
          <rect x={44} y={206} width={260} height={14} rx={7} />
        </g>
      </g>
      {/* × */}
      <g transform="translate(600 250)">
        <circle r={64} fill={INK} />
        <circle r={58} fill={INK} stroke={WHITE} strokeWidth={5} />
        <path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke={YELLOW} strokeWidth={11} strokeLinecap="round" />
      </g>
    </>
  );
}

const covers: Record<CoverVariant, () => ReactElement> = {
  costs: CostsCover,
  google: GoogleCover,
  checklist: ChecklistCover,
  remarketing: RemarketingCover,
  partnership: PartnershipCover
};

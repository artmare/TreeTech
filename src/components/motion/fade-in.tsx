import type {CSSProperties, ReactNode} from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({children, className, delay = 0}: FadeInProps) {
  return (
    <div
      className={className}
      data-reveal="fade"
      style={{'--reveal-delay': `${delay}s`} as CSSProperties}
    >
      {children}
    </div>
  );
}

export function SoftScaleIn({children, className, delay = 0}: FadeInProps) {
  return (
    <div
      className={className}
      data-reveal="scale"
      style={{'--reveal-delay': `${delay}s`} as CSSProperties}
    >
      {children}
    </div>
  );
}

'use client';

import {motion} from 'framer-motion';
import type {ReactNode} from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({children, className, delay = 0}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.55, ease: 'easeOut', delay}}
    >
      {children}
    </motion.div>
  );
}

export function SoftScaleIn({children, className, delay = 0}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{opacity: 1, scale: 1}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.6, ease: 'easeOut', delay}}
    >
      {children}
    </motion.div>
  );
}

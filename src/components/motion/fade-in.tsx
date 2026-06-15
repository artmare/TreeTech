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
      initial={{opacity: 0, y: 26}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.22, margin: '-60px'}}
      transition={{duration: 0.62, ease: [0.22, 1, 0.36, 1], delay}}
    >
      {children}
    </motion.div>
  );
}

export function SoftScaleIn({children, className, delay = 0}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, scale: 0.96, y: 18}}
      whileInView={{opacity: 1, scale: 1, y: 0}}
      viewport={{once: true, amount: 0.22, margin: '-60px'}}
      transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1], delay}}
    >
      {children}
    </motion.div>
  );
}

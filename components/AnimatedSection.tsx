'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type AnimatedSectionProps = HTMLMotionProps<'section'>;

export function AnimatedSection({ children, className = '', ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

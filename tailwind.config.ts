import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.ts', './lib/**/*.ts'],
  theme: {
    extend: {
      colors: {
        ink: '#05070b',
        graphite: '#0b0f17',
        panel: '#111824',
        steel: '#8a94a7',
        line: 'rgba(148, 163, 184, 0.18)',
        electric: '#3b82f6',
        cyan: '#38bdf8'
      },
      boxShadow: {
        glow: '0 0 80px rgba(59, 130, 246, 0.24)',
        panel: '0 24px 80px rgba(2, 6, 23, 0.18)'
      },
      backgroundImage: {
        'radial-blue': 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.28), rgba(5, 7, 11, 0) 46%)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;

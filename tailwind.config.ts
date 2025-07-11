import { color } from 'motion/react';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const textSizes = {
  'display-3xl': '--text-display-3xl',
  'display-2xl': '--text-display-2xl',
  'display-xl': '--text-display-xl',
  'display-lg': '--text-display-lg',
  'display-md': '--text-display-md',
  'display-sm': '--text-display-sm',
  'display-xs': '--text-display-xs',
  'text-xl': '--text-xl',
  'text-lg': '--text-lg',
  'text-md': '--text-md',
  'text-sm': '--text-sm',
  'text-xs': '--text-xs',
};

const fontWeights = {
  regular: '--font-weight-regular',
  medium: '--font-weight-medium',
  semibold: '--font-weight-semibold',
  bold: '--font-weight-bold',
  extrabold: '--font-weight-extrabold',
};

const customTextPlugin = plugin(({ addUtilities }) => {
  const newUtilities: Record<string, any> = {};

  for (const [sizeName, sizeVar] of Object.entries(textSizes)) {
    for (const [weightName, weightVar] of Object.entries(fontWeights)) {
      const className = `.${sizeName}-${weightName}`;
      newUtilities[className] = {
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${sizeVar}--line-height)`,
        fontWeight: `var(${weightVar})`,
      };
    }
  }

  addUtilities(newUtilities);
});

export default {
  theme: {
    extend: {
      animation: {
        breathe: 'breathe 5s ease-in-out infinite',
        twinkle: 'twinkle 3s infinite ease-in-out;',
        pulse: 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' },
        },
        twinkle: {
          '0%, 100%': {
            opacity: 0.6,
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: 1,
            filter: 'brightness(0.9)',
          },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.95' },
        },
      },
      screens: {
        sc670: '670px',
      },
    },
  },
  plugins: [customTextPlugin],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050608',
        ink: '#0a0d12',
        panel: '#0d1117',
        cyan: {
          DEFAULT: '#00e5ff',
          soft: '#5ff2ff',
          deep: '#00a8c2',
        },
        indigo: {
          DEFAULT: '#5b5bf6',
          soft: '#8a8afb',
          deep: '#3a3ac2',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(rgba(95,242,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(95,242,255,0.06) 1px, transparent 1px)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out infinite 2s',
        drift: 'drift 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-24px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(4%, -6%) scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}

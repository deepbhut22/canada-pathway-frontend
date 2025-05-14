/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f5',
          500: '#0c89e8',
          600: '#006cc6',
          700: '#0056a0',
          800: '#064987',
          900: '#0a3d6f',
          950: '#062645',
        },
        secondary: {
          50: '#f5f8fa',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      fontFamily: {
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'sans-serif'
        ],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
    animation: {
      first: "first 30s linear infinite",
      second: "second 45s linear infinite",
      third: "third 35s linear infinite",
      fourth: "fourth 50s linear infinite",
      fifth: "fifth 60s linear infinite",
      pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounceSlow: 'bounce 1.2s infinite',
    },
    keyframes: {
      first: {
        "0%": { transform: "rotate(0deg) scale(1)" },
        "50%": { transform: "rotate(180deg) scale(1.2)" },
        "100%": { transform: "rotate(360deg) scale(1)" },
      },
      second: {
        "0%": { transform: "rotate(0deg) scale(1)" },
        "50%": { transform: "rotate(-180deg) scale(1.3)" },
        "100%": { transform: "rotate(-360deg) scale(1)" },
      },
      third: {
        "0%": { transform: "rotate(0deg) scale(1)" },
        "50%": { transform: "rotate(90deg) scale(1.1)" },
        "100%": { transform: "rotate(180deg) scale(1)" },
      },
      fourth: {
        "0%": { transform: "rotate(0deg) scale(1)" },
        "50%": { transform: "rotate(135deg) scale(1.4)" },
        "100%": { transform: "rotate(270deg) scale(1)" },
      },
      fifth: {
        "0%": { transform: "rotate(0deg) scale(1)" },
        "50%": { transform: "rotate(-135deg) scale(1.2)" },
        "100%": { transform: "rotate(-270deg) scale(1)" },
      },
    },
  },
  plugins: [],
};
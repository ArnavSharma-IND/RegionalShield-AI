/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#05070A',
          secondary: '#0A0E13',
          surface: '#0D131A',
          elevated: '#121820',
          panel: 'rgba(13, 19, 26, 0.85)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          line: '#1A222C',
          highlight: 'rgba(255, 255, 255, 0.16)',
          accent: '#C81B1C',
        },
        text: {
          primary: '#F4F5F6',
          secondary: '#858D97',
          technical: '#69727D',
          muted: '#4D5662',
        },
        accent: {
          DEFAULT: '#C81B1C',
          hover: '#E02627',
          subtle: 'rgba(200, 27, 28, 0.12)',
        },
        security: {
          blue: '#6E8FAE',
          safe: '#6F9B7A',
          warning: '#C49A55',
          critical: '#C81B1C',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'sharp': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.7)',
        'threat-glow': '0 0 35px -5px rgba(200, 27, 28, 0.25)',
        'blue-glow': '0 0 30px -5px rgba(110, 143, 174, 0.2)',
      },
      animation: {
        'scanline-fast': 'scanline 4s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

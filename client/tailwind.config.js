/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  /* Dark mode is driven by Mantine's color scheme: MantineProvider sets
     data-mantine-color-scheme="dark" on <html> when dark mode is active,
     so Tailwind's dark: utilities fire on the exact same trigger. */
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ============================================================
           SKILLX BRAND PALETTE
           primary   → Indigo   : main brand color (buttons, links, CTAs)
           secondary → Violet   : gradient partner, secondary accents
           accent    → Amber    : highlights, credits, stars, badges
           success   → Emerald  : positive states (online, saved, done)
           danger    → Rose     : destructive actions, errors
           warning   → Amber    : caution states
           info      → Sky      : informational states
           neutral   → Zinc     : text, borders, backgrounds
           ============================================================ */
        primary: {
          50: '#f2f7ed',
          100: '#e6efdc',
          200: '#d1e2bf',
          300: '#b2ce95',
          400: '#8fb76c',
          500: '#709c4f',
          600: '#527a3b',
          700: '#41622f',
          800: '#365029',
          900: '#2e4326',
          950: '#182513',
        },
        secondary: {
          50: '#eff9fa',
          100: '#d6eff0',
          200: '#b0dfe3',
          300: '#7ac7cf',
          400: '#42a9b6',
          500: '#268d9b',
          600: '#23717f',
          700: '#225b68',
          800: '#234c57',
          900: '#22414b',
          950: '#112b33',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        danger: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.5' }],
        sm: ['0.9375rem', { lineHeight: '1.55' }],
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        /* brand shadows — used by ui/Button & ui/Card */
        soft: '0 2px 8px -2px rgba(79, 70, 229, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)',
        medium: '0 8px 24px -6px rgba(79, 70, 229, 0.28), 0 2px 8px rgba(0, 0, 0, 0.06)',
        glow: '0 0 0 3px rgba(99, 102, 241, 0.25)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

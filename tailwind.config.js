export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === PERPLEXITY LIGHT THEME ===
        'surface': '#F9FAFB',       // Main background
        'surface-elevated': '#FFFFFF', // Cards, elevated surfaces
        'surface-hover': '#F3F4F6', // Hover states
        'border': '#E5E7EB',        // Subtle borders
        'border-strong': '#D1D5DB', // Stronger borders
        
        // === PERPLEXITY DARK THEME ===
        'surface-dark': '#111827',      // Main background dark
        'surface-elevated-dark': '#1F2937', // Cards dark
        'surface-hover-dark': '#374151',    // Hover dark
        'border-dark': '#374151',           // Borders dark
        'border-strong-dark': '#4B5563',    // Strong borders dark
        
        // === PRIMARY ACCENT (Perplexity Blue) ===
        'primary': '#3B82F6',       // Signature blue
        'primary-light': '#60A5FA', // Lighter blue
        'primary-dark': '#2563EB',  // Darker blue
        'primary-subtle': '#EFF6FF', // Very light blue bg
        
        // === TEXT COLORS ===
        'text-primary': '#111827',   // Main text
        'text-secondary': '#6B7280', // Secondary text
        'text-tertiary': '#9CA3AF',  // Muted text
        'text-primary-dark': '#F9FAFB',
        'text-secondary-dark': '#D1D5DB',
        'text-tertiary-dark': '#9CA3AF',
        
        // === ACCENT COLORS ===
        'accent-teal': '#14B8A6',
        'accent-purple': '#8B5CF6',
        'accent-amber': '#F59E0B',
        'accent-rose': '#F43F5E',
        
        // === STATUS COLORS ===
        'success': '#22C55E',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
      maxWidth: {
        'content': '680px',
        'wide': '1200px',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'elevated': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'nav': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

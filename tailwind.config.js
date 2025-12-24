export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === DARK THEME BASE (Nord-inspired) ===
        'ink': '#0d1117',           // GitHub dark bg
        'charcoal': '#161b22',      // Elevated surface
        'midnight': '#21262d',      // Cards/panels
        'slate': '#30363d',         // Borders
        
        // === LIGHT THEME BASE ===
        'paper': '#ffffff',
        'cream': '#f6f8fa',         // GitHub light bg
        'pearl': '#eaeef2',
        'silver': '#d0d7de',
        
        // === PRIMARY ACCENT (Teal/Cyan - accessible) ===
        'sage': '#2dd4bf',          // Teal 400
        'sage-light': '#5eead4',    // Teal 300
        'sage-dark': '#14b8a6',     // Teal 500
        
        // === SECONDARY ACCENT (Amber/Gold) ===
        'warm': '#fbbf24',          // Amber 400
        'warm-light': '#fcd34d',    // Amber 300
        'warm-dark': '#f59e0b',     // Amber 500
        
        // === ACCENT COLORS ===
        'violet-dusty': '#a78bfa',  // Violet 400
        'violet-light': '#c4b5fd',  // Violet 300
        'violet-dark': '#8b5cf6',   // Violet 500
        
        // === DOPPLER SPECTRUM (for visualizations) ===
        'doppler-blue': '#3b82f6',
        'doppler-cyan': '#06b6d4',
        'doppler-teal': '#14b8a6',
        'doppler-green': '#22c55e',
        'doppler-lime': '#84cc16',
        'doppler-yellow': '#eab308',
        'doppler-orange': '#f97316',
        'doppler-red': '#ef4444',
        
        // === STATUS COLORS ===
        'success': '#22c55e',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      fontFamily: {
        'blackletter': ['UnifrakturMaguntia', 'serif'],
        'display': ['UnifrakturCook', 'serif'],
        'serif': ['Spectral', 'EB Garamond', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'ripple': 'ripple 2s ease-out infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
      maxWidth: {
        'prose-narrow': '55ch',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark base colors
        'ink': '#0a0a0a',
        'charcoal': '#1a1a1a',
        'midnight': '#2a2a2a',
        'slate': '#3a3a3a',
        
        // Light base colors
        'paper': '#fafafa',
        'cream': '#f5f5f5',
        'pearl': '#eeeeee',
        'silver': '#e0e0e0',
        
        // Soft accent colors
        'sage': '#87a08a',
        'sage-light': '#a3b8a5',
        'sage-dark': '#6b8370',
        
        'teal-muted': '#5d8a8a',
        'teal-light': '#7aa3a3',
        'teal-dark': '#466969',
        
        'violet-dusty': '#8a7a8d',
        'violet-light': '#a396a5',
        'violet-dark': '#6e5f71',
        
        // Warm accent
        'warm': '#c9a882',
        'warm-light': '#dbc19c',
        'warm-dark': '#a78866',
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

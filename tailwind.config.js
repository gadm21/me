export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark base colors - deeper for contrast
        'ink': '#050508',
        'charcoal': '#0d0d12',
        'midnight': '#151520',
        'slate': '#252535',
        
        // Light base colors
        'paper': '#fafafa',
        'cream': '#f5f5f5',
        'pearl': '#eeeeee',
        'silver': '#e0e0e0',
        
        // Doppler spectrum - cold (low velocity)
        'doppler-blue': '#1a237e',
        'doppler-cyan': '#00838f',
        'doppler-teal': '#00695c',
        
        // Doppler spectrum - neutral
        'doppler-green': '#2e7d32',
        'doppler-lime': '#558b2f',
        
        // Doppler spectrum - warm (high velocity)
        'doppler-yellow': '#f9a825',
        'doppler-orange': '#ef6c00',
        'doppler-red': '#c62828',
        
        // Primary accent - cyan/teal from spectrum
        'sage': '#00acc1',
        'sage-light': '#4dd0e1',
        'sage-dark': '#00838f',
        
        // Secondary accent - warm orange
        'warm': '#ff8a65',
        'warm-light': '#ffab91',
        'warm-dark': '#e64a19',
        
        // Violet for variety
        'violet-dusty': '#7c4dff',
        'violet-light': '#b388ff',
        'violet-dark': '#651fff',
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

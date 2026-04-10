/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        cardIn: {
          '0%': { opacity: 0, transform: 'translateY(16px) scale(0.97)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        chatMessageIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        toastIn: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 6px rgba(239,68,68,0.35)' },
          '50%': { boxShadow: '0 0 22px rgba(239,68,68,0.55)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typingDot: {
          '0%, 80%, 100%': { opacity: 0.25, transform: 'scale(0.8)' },
          '40%': { opacity: 1, transform: 'scale(1)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: 0.6 },
          '100%': { transform: 'scale(1.8)', opacity: 0 },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(16px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 400ms ease-out both',
        cardIn: 'cardIn 500ms cubic-bezier(0.22,1,0.36,1) both',
        chatMessageIn: 'chatMessageIn 300ms cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        toastIn: 'toastIn 350ms cubic-bezier(0.22,1,0.36,1) both',
        slideUp: 'slideUp 600ms cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 3.5s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        gradientShift: 'gradientShift 6s ease infinite',
        pulseRing: 'pulseRing 1.5s ease-out infinite',
        slideInRight: 'slideInRight 400ms cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}

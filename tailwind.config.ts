import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        ivory: '#F5F0E8',
        gold: '#C9A84C',
        amber: '#E8853A',
        taupe: '#8C7B6B',
        surface: '#FFFFFF',
      },
      fontFamily: {
        // Headings revert to the elegant serif (Playfair).
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Geometric all-caps face (Round 8, currently Bebas) for prices, numbers, footer.
        geo: ['"Round 8"', 'var(--font-round-alt)', 'var(--font-display)', 'Georgia', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '4px',
        button: '2px',
        modal: '8px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.16)',
      },
      maxWidth: {
        site: '1440px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'draw-in': {
          '0%': { strokeDashoffset: '1', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        kenburns: 'kenburns 8s ease-out forwards',
        float: 'float 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config

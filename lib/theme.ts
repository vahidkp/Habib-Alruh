export const habibAlruhTheme = {
  colors: {
    primary: '#C9A84C',
    primaryForeground: '#0A0A0A',
    secondary: '#E8853A',
    background: '#F5F0E8',
    foreground: '#0A0A0A',
    muted: '#8C7B6B',
    surface: '#FFFFFF',
    surfaceDark: '#0A0A0A',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    accent: "'Cormorant Garamond', Georgia, serif",
  },
  radii: {
    card: '4px',
    button: '2px',
    modal: '8px',
  },
} as const

export type HabibAlruhTheme = typeof habibAlruhTheme

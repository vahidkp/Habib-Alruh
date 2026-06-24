---
name: antigravity-theme-setup
description: >
  Use this skill whenever you need to configure the Antigravity design system
  with custom brand tokens for the Habib Alruh project. Triggers: setting up
  Antigravity provider, creating brand color/typography/spacing tokens, mapping
  Habib Alruh brand identity to Antigravity's theming API, or overriding any Antigravity
  default visual tokens. Also use when onboarding a new developer to the design
  token structure.
---

# Antigravity Theme Setup — Habib Alruh

## Overview
Antigravity is the component library used for this project. All visual primitives (Button, Card, Input, Sheet, Dialog, Carousel, etc.) come from Antigravity. Brand identity is injected via its token system.

## Token File Location
```
/styles/tokens.css         ← All CSS variables (source of truth)
/styles/globals.css        ← Font-face + base resets + token import
/lib/theme.ts              ← TypeScript token object (mirrors tokens.css)
```

## Brand Token Definitions (tokens.css)
```css
:root {
  /* === COLOUR === */
  --color-primary-black: #0A0A0A;
  --color-ivory: #F5F0E8;
  --color-gold: #C9A84C;
  --color-amber: #E8853A;
  --color-taupe: #8C7B6B;
  --color-white: #FFFFFF;

  /* Mapped to Antigravity semantic tokens */
  --ag-color-background: var(--color-ivory);
  --ag-color-foreground: var(--color-primary-black);
  --ag-color-primary: var(--color-gold);
  --ag-color-primary-foreground: var(--color-primary-black);
  --ag-color-secondary: var(--color-amber);
  --ag-color-muted: var(--color-taupe);
  --ag-color-surface: var(--color-white);
  --ag-color-surface-dark: var(--color-primary-black);

  /* === TYPOGRAPHY === */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-accent: 'Cormorant Garamond', Georgia, serif;

  /* Mapped to Antigravity */
  --ag-font-heading: var(--font-display);
  --ag-font-body: var(--font-body);

  /* === SPACING === */
  --ag-spacing-section: 96px;      /* vertical padding between homepage sections */
  --ag-spacing-section-sm: 64px;   /* mobile section spacing */

  /* === BORDER RADIUS === */
  --ag-radius-card: 4px;           /* Habib Alruh uses nearly-square cards */
  --ag-radius-button: 2px;         /* sharp, luxury feel */

  /* === SHADOWS === */
  --ag-shadow-card: 0 4px 24px rgba(0,0,0,0.08);
  --ag-shadow-card-hover: 0 12px 40px rgba(0,0,0,0.16);
}
```

## Antigravity Provider Setup (app/layout.tsx)
```tsx
import { AntigravityProvider } from '@antigravity/react'
import { habibAlruhTheme } from '@/lib/theme'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntigravityProvider theme={habibAlruhTheme}>
          {children}
        </AntigravityProvider>
      </body>
    </html>
  )
}
```

## lib/theme.ts
```typescript
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
}
```

## Font Loading (app/layout.tsx)
```tsx
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
})

// Add font variables to <html> className
```

## Button Variants (Antigravity overrides)
```tsx
// Always use these variants, never custom inline styles on buttons
<Button variant="gold">Shop Now</Button>         // Gold fill, dark text
<Button variant="outline-gold">Explore</Button>   // Transparent, gold border
<Button variant="ghost">Learn More</Button>        // No border, text only
<Button variant="dark">Add to Cart</Button>        // Black fill, white text
```

## Common Mistakes to Avoid
- Never hardcode hex values in component files — always use CSS variables
- Don't override `--ag-*` tokens inline on individual components
- Ensure dark sections (`bg: surfaceDark`) re-declare foreground token for legibility
- Always test token changes against both light and dark section contexts

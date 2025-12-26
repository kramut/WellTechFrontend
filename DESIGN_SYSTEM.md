# 🎨 WellTech Hub - Design System

## Filosofia Design: "Well-Tech-Wealth-Being"

Equilibrio tra tecnologia e umanità, benessere e performance. Design pulito, credibile, ispirazionale.

## 🎨 Color Palette

### Base
```css
--white: #FFFFFF
--off-white: #FAFAF9
--gray-50: #F7F7F5
--gray-100: #E8E8E6
--gray-200: #D4D4D1
--gray-300: #A8A8A5
--gray-400: #7C7C79
--gray-500: #50504D
--gray-600: #383836
--gray-700: #242422
--gray-800: #1A1A19
--gray-900: #0F0F0E
```

### Accenti Wellbeing (Calmi e Naturali)
```css
--sage-50: #F4F7F4
--sage-100: #E3EAE3
--sage-200: #C7D5C7
--sage-300: #9BB39B
--sage-400: #6F8F6F
--sage-500: #5A7A5A    /* Primary wellbeing */
--sage-600: #4A664A
--sage-700: #3A523A
```

### Accenti Wealth/Performance (Energici)
```css
--gold-50: #FFFBF0
--gold-100: #FFF4D6
--gold-200: #FFE9AD
--gold-300: #FFDE84
--gold-400: #FFD35B
--gold-500: #FFC832    /* Primary wealth */
--gold-600: #E6B42D
--gold-700: #CC9F28

--orange-50: #FFF5F0
--orange-100: #FFE6D6
--orange-200: #FFCDAD
--orange-300: #FFB484
--orange-400: #FF9B5B
--orange-500: #FF8232    /* Secondary performance */
--orange-600: #E6752D
--orange-700: #CC6828
```

### Accenti Tech (Blu Petrolio)
```css
--teal-50: #F0F7F7
--teal-100: #D6EBEB
--teal-200: #ADD7D7
--teal-300: #84C3C3
--teal-400: #5BAFAF
--teal-500: #329B9B    /* Primary tech */
--teal-600: #2D8B8B
--teal-700: #287B7B
```

### Semantic Colors
```css
--success: var(--sage-500)
--warning: var(--gold-500)
--error: #DC2626
--info: var(--teal-500)
```

## 📝 Typography

### Font Families
```css
/* UI & Body */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Editorial Headlines (opzionale) */
--font-serif: 'Crimson Pro', 'Georgia', serif;
```

### Type Scale
```css
/* Headlines */
--text-6xl: 3.75rem;    /* 60px - Hero titles */
--text-5xl: 3rem;       /* 48px - Page titles */
--text-4xl: 2.25rem;    /* 36px - Section titles */
--text-3xl: 1.875rem;   /* 30px - Card titles */
--text-2xl: 1.5rem;     /* 24px - Subsection titles */
--text-xl: 1.25rem;     /* 20px - Large body */

/* Body */
--text-lg: 1.125rem;     /* 18px - Body large */
--text-base: 1rem;       /* 16px - Body */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-xs: 0.75rem;      /* 12px - Captions */

/* Line Heights */
--leading-tight: 1.2
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

### Font Weights
```css
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

## 📐 Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 🧩 Componenti Base

### Buttons
- **Primary**: Background sage-500, testo bianco
- **Secondary**: Bordo sage-500, testo sage-500
- **Tertiary**: Testo sage-500, no bordo
- **CTA Affiliate**: Background gold-500, testo bianco, più prominente

### Cards
- **Article Card**: Ombra soft, hover: sollevamento + ombra più marcata
- **Product Card**: Bordo sottile, hover: evidenzia CTA
- **Feature Card**: Background off-white, padding generoso

### Badges
- **Editor's Pick**: Gold background
- **Top Rated**: Sage background
- **New**: Teal background
- **Category**: Bordo sottile, testo categoria

## 🎭 Micro-interazioni

### Hover States
- **Cards**: `transform: translateY(-4px)`, `box-shadow` aumentato
- **Buttons**: Background più scuro, `transition: all 0.2s ease`
- **Links**: Sottolineatura animata

### Animations
- **Fade In**: `opacity 0 → 1`, `duration: 300ms`
- **Slide Up**: `translateY(20px) → 0`, `duration: 400ms`
- **Smooth**: `ease-out` timing function

## 🌓 Dark Mode

Palette invertita mantenendo:
- Contrasti leggibili
- Mood soft (non "cyberpunk")
- Accenti più tenui in dark mode






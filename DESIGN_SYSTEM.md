# Design System Documentation

## 🎨 Color Palette

This website uses a carefully crafted color palette to create an elegant, modern look:

### CSS Custom Properties

```css
--color-primary: #2c3e50;    /* Midnight Indigo - Main backgrounds, headlines */
--color-secondary: #fdf6e3;  /* Vanilla Cream - Light backgrounds, cards */
--color-accent: #87CEEB;     /* Sky Blue - Accent buttons, links, selection */
--color-optional: #8B4513;   /* Mocha Earth - Frames, icons, minor details */
--color-text-dark: #333;     /* Dark text */
--color-text-light: #fff;    /* Light text */
```

### Color Usage

- **Primary (#2c3e50)**: Headlines, main text, primary buttons
- **Secondary (#fdf6e3)**: Card backgrounds, light sections
- **Accent (#87CEEB)**: Interactive elements, hover states, links, selections
- **Optional (#8B4513)**: Borders, subtle accents, icons
- **Text Dark (#333)**: Body text on light backgrounds
- **Text Light (#fff)**: Text on dark backgrounds

## 📝 Typography

### Font Families

- **Inter**: Primary font for all UI text, paragraphs, and headings
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **JetBrains Mono**: Monospace font for code snippets and technical content
  - Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold)

### Usage

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

code, pre {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Type Scale

- Headings: 4xl - 8xl (36px - 96px)
- Body: base - xl (16px - 20px)
- Small: sm - xs (12px - 14px)

## 🎭 Design Style

### Neomorphism / Glassmorphism

The design combines two modern aesthetics:

1. **Neomorphism**: Soft shadows creating depth
   ```css
   box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), 
               -8px -8px 16px rgba(255, 255, 255, 0.7);
   ```

2. **Glassmorphism**: Frosted glass effect
   ```css
   background: rgba(253, 246, 227, 0.7);
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.3);
   ```

## 🎬 Animations & Transitions

### Transition Timing

- **Smooth**: `0.4s cubic-bezier(0.4, 0, 0.2, 1)` - Standard transitions
- **Bounce**: `0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful interactions

### Keyframe Animations

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}
```

#### Float
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

#### Bounce
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

## 🎯 Interactive Elements

### Card Hover Effect

Cards transform on hover with:
- **Lift**: `transform: translateY(-10px)`
- **Shadow**: Enhanced shadow with accent color
- **Border**: Changes from Mocha Earth to Sky Blue
- **Overlay**: Smooth appearance of action buttons

```css
/* Rest State */
background: var(--color-secondary);
border: 2px solid var(--color-optional);
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover State */
transform: translateY(-10px);
border-color: var(--color-accent);
box-shadow: 0 20px 40px rgba(135, 206, 235, 0.3);
```

### Button States

1. **Neomorphic Buttons**:
   - Rest: Soft dual shadows
   - Hover: Lift + enhanced shadow
   - Active: Inset shadows

2. **Action Buttons**:
   - Slide in from below on card hover
   - Staggered animation delays (100ms, 200ms)

### Form Fields

- **Focus State**:
  - Border color changes to Sky Blue
  - Shadow intensity increases
  - Smooth 300ms transition

- **Interaction**:
  ```css
  border-bottom: 2px solid var(--color-optional);
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);
  }
  ```

## 🖱️ Custom Cursor

Two-part cursor system:

1. **Main Cursor**: 20px circle, 20% opacity
   - Expands to 40px on hover over interactive elements
   - Changes to 40% opacity when hovering

2. **Trailing Dot**: 8px circle, 60% opacity
   - Follows with slight delay
   - Creates smooth trail effect

## 📱 Responsive Design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Grid Systems

- Posts: 2 columns on desktop, 1 on mobile
- Projects: 3 columns on large screens, 2 on tablet, 1 on mobile

## 🎨 Shadows

### Predefined Shadows

```css
--shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.1);
--shadow-hover: 0 20px 40px rgba(135, 206, 235, 0.3);
--shadow-neomorphic: 8px 8px 16px rgba(0, 0, 0, 0.1), 
                     -8px -8px 16px rgba(255, 255, 255, 0.7);
```

### Usage Context

- **Soft**: Cards, containers at rest
- **Hover**: Elevated cards, focused elements
- **Neomorphic**: Buttons, special UI elements

## 🌊 Scroll Behaviors

### Smooth Scroll

```css
html {
  scroll-behavior: smooth;
}
```

### Reveal Animations

Elements fade in and slide up when entering viewport:
- Intersection Observer triggers at 10% visibility
- 30px translate + opacity 0 → 1
- Staggered delays for grouped elements

### Parallax

Background decorative elements move at 60% speed of main content scroll.

## ✨ Micro Animations

1. **Social Icons**: Bounce on hover
2. **Back to Top**: Fade in after 300px scroll
3. **Loading Spinner**: Three pulsating dots with staggered timing
4. **Navigation**: Active indicator slides smoothly
5. **Form Submit**: Button changes color + pulsating loader

## 🎪 Special Effects

### Text Gradient

```css
.text-gradient {
  background: linear-gradient(135deg, 
    var(--color-accent) 0%, 
    var(--color-optional) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Blur Backgrounds

Large, blurred circles for ambient backgrounds:
```css
background: var(--color-accent);
filter: blur(100px);
opacity: 0.2;
animation: float 6s ease-in-out infinite;
```

## 🎯 Best Practices

1. **Performance**: Use `transform` and `opacity` for animations (GPU-accelerated)
2. **Accessibility**: Maintain contrast ratios above 4.5:1
3. **Consistency**: Use predefined timing functions and durations
4. **Progressive Enhancement**: Base experience works without animations
5. **Reduced Motion**: Respect `prefers-reduced-motion` media query

## 📐 Spacing System

Based on Tailwind's spacing scale (4px increments):
- xs: 4px (1 unit)
- sm: 8px (2 units)
- md: 16px (4 units)
- lg: 32px (8 units)
- xl: 64px (16 units)

## 🎨 Component Patterns

### Card Pattern
- Border radius: 16-24px (rounded-2xl to rounded-3xl)
- Padding: 32px (p-8)
- Background: Secondary color
- Border: 2px solid Optional color
- Hover: Transform + shadow + border color change

### Button Pattern
- Border radius: 9999px (fully rounded)
- Padding: 16px 32px (py-4 px-8)
- Font: Semi-bold (600)
- Transition: 300ms
- States: Rest, Hover, Active, Disabled

### Section Pattern
- Padding vertical: 128px (py-32)
- Max width: 1280px (max-w-7xl)
- Centered: mx-auto
- Responsive padding: Reduce on mobile

---

This design system creates a cohesive, elegant, and highly interactive user experience that represents your personal brand professionally.

# Project Architecture

This document outlines the architecture and structure of the personal blog/portfolio project, designed with senior-level code organization principles.

## 📁 Project Structure

```
personal-blog/
├── app/                      # Next.js 14 App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── posts/               # Blog posts routes
│   └── projects/            # Projects showcase routes
├── components/              # React components
│   └── ui/                  # Atomic UI components (Design System)
│       ├── Button.tsx       # Reusable button with variants
│       ├── Input.tsx        # Form input component
│       ├── Textarea.tsx     # Form textarea component
│       ├── Card.tsx         # Card component with variants
│       ├── Container.tsx    # Layout container
│       └── index.ts         # Barrel export
├── config/                  # Application configuration
│   └── site.ts             # Site-wide constants and config
├── lib/                     # Utility libraries
│   ├── hooks/              # Custom React hooks
│   │   ├── useFormValidation.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── index.ts
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # Utility functions
│   └── validations.ts      # Form validation functions
├── types/                   # TypeScript type definitions
│   ├── index.ts            # Shared types
│   └── database.ts         # Database schema types
└── public/                  # Static assets
```

## 🎨 Design System

### Atomic Components (UI Kit)

All reusable UI components are located in `components/ui/`. This follows the Atomic Design methodology:

#### **Button Component**
- Multiple variants: `primary`, `secondary`, `ghost`, `glass`
- Sizes: `sm`, `md`, `lg`
- Features: loading state, icons, full-width
- Accessibility: proper ARIA labels, keyboard support

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

#### **Input Component**
- Label, error, and helper text support
- Left/right icon slots
- Form validation integration
- Accessible with proper ARIA attributes

```tsx
<Input
  label="Email"
  type="email"
  error={errors.email}
  placeholder="Enter your email"
/>
```

#### **Card Component**
- Variants: `default`, `glass`, `bordered`, `elevated`
- Interactive mode with hover effects
- Compound components: CardHeader, CardTitle, CardContent, CardFooter

```tsx
<Card variant="glass" interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## 🔧 Custom Hooks

### useFormValidation
Generic form validation hook with field-level and form-level validation.

```tsx
const { errors, validate, clearError } = useFormValidation<FormData>({
  email: validateEmail,
  name: validateName,
})
```

### useIntersectionObserver
Observes element intersection with viewport for scroll animations.

```tsx
const { ref, isIntersecting } = useIntersectionObserver({
  threshold: 0.5,
  freezeOnceVisible: true,
})
```

## 📝 Type Safety

### Centralized Types
All shared types are defined in `types/index.ts`:
- `Post` - Blog post structure
- `Project` - Project data structure
- `ContactFormData` - Contact form fields
- `FormErrors<T>` - Generic form error type
- `ApiResponse<T>` - API response wrapper

### Type Inference
Leverage TypeScript's type inference for better developer experience:

```tsx
// Type is inferred from validation rules
const { errors } = useFormValidation<ContactFormData>({
  name: validateName,
  email: validateEmail,
})
```

## 🎯 Configuration Management

### Site Configuration (`config/site.ts`)
Centralized configuration for:
- Site metadata (name, description, URLs)
- Navigation links
- Social media links
- Skills and technologies
- Animation presets

```tsx
import { siteConfig, navLinks } from '@/config/site'
```

## 🔒 Best Practices

### 1. Component Structure
Every component follows this pattern:
```tsx
/**
 * Component description
 * 
 * Features and behavior explained
 * 
 * @component
 * @example
 */
export function ComponentName({ prop }: ComponentProps) {
  // Component implementation
}
```

### 2. Props Interfaces
All components have properly typed props:
```tsx
export interface ComponentProps {
  /** Prop description */
  propName: PropType
}
```

### 3. Separation of Concerns
- **Components**: UI presentation
- **Hooks**: Reusable stateful logic
- **Utils**: Pure utility functions
- **Config**: Static configuration
- **Types**: Type definitions

### 4. File Organization
- One component per file
- Barrel exports (`index.ts`) for clean imports
- Related files grouped in directories

### 5. Accessibility
- Proper semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management

### 6. Performance
- Use `will-change` for animations
- Lazy loading for heavy components
- Memoization where appropriate
- Optimized images and assets

## 🚀 Development Workflow

### 1. Adding a New UI Component
```bash
# Create component file
touch components/ui/NewComponent.tsx

# Add to barrel export
echo "export { NewComponent } from './NewComponent'" >> components/ui/index.ts
```

### 2. Creating a Custom Hook
```bash
# Create hook file
touch lib/hooks/useNewHook.ts

# Add to barrel export
echo "export { useNewHook } from './useNewHook'" >> lib/hooks/index.ts
```

### 3. Adding Types
```bash
# Add types to types/index.ts
export interface NewType {
  // type definition
}
```

## 📚 Code Style Guide

### Naming Conventions
- **Components**: PascalCase (`Button`, `ContactForm`)
- **Hooks**: camelCase with `use` prefix (`useFormValidation`)
- **Utils**: camelCase (`formatDate`, `slugify`)
- **Types**: PascalCase (`Post`, `ContactFormData`)
- **Constants**: UPPER_SNAKE_CASE or camelCase based on usage

### Import Order
```tsx
// 1. External libraries
import { useState } from 'react'
import { motion } from 'framer-motion'

// 2. Internal UI components
import { Button, Input } from '@/components/ui'

// 3. Other internal imports
import { useFormValidation } from '@/lib/hooks'
import { validateEmail } from '@/lib/validations'
import type { ContactFormData } from '@/types'
```

### Component Composition
Prefer composition over props drilling:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## 🧪 Testing Strategy

### Unit Tests
- Test utility functions in isolation
- Test custom hooks with React Testing Library
- Validate form validation logic

### Component Tests
- Test component rendering
- Test user interactions
- Test accessibility

### Integration Tests
- Test form submissions
- Test navigation flows
- Test API interactions

## 📖 Documentation Standards

### JSDoc Comments
All exported functions, components, and types should have JSDoc comments:

```tsx
/**
 * Brief description of what the function does
 * 
 * More detailed explanation if needed
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * ```tsx
 * // Usage example
 * const result = functionName(param)
 * ```
 */
```

## 🔄 State Management

### Local State
Use React hooks for component-level state:
- `useState` for simple state
- `useReducer` for complex state logic

### Form State
Use custom `useFormValidation` hook for form management.

### Server State
Use Next.js server components and server actions for data fetching.

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first styling
- Custom utilities in `globals.css`
- CSS custom properties for theming

### Component Variants
Use the `cn` utility for conditional classes:
```tsx
className={cn(
  'base-classes',
  variant === 'primary' && 'variant-classes',
  className
)}
```

## 🔐 Security Considerations

- All forms validate input on both client and server
- Use Supabase RLS (Row Level Security) for database access
- Sanitize user input before displaying
- Use HTTPS in production
- Environment variables for sensitive data

## 📈 Performance Optimization

- Use Next.js Image component for optimized images
- Implement code splitting with dynamic imports
- Lazy load non-critical components
- Use `useCallback` and `useMemo` judiciously
- Optimize animations with `will-change` and `transform`

## 🌐 Internationalization (Future)

The architecture supports future i18n implementation:
- Centralized content in config files
- Separation of UI and content
- Type-safe translation keys

## 🚢 Deployment

The project is deployment-ready with:
- Docker support
- Environment variable configuration
- Production build optimization
- SEO configuration
- Sitemap generation

---

**Last Updated**: January 2026
**Maintainer**: Egor Dultsev
**Version**: 1.0.0

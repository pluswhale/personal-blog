# UI Kit Documentation

A collection of reusable, accessible, and well-typed React components built with Framer Motion and Tailwind CSS.

## 📦 Components

### Button

A versatile button component with multiple variants, sizes, and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'glass'` | `'primary'` | Visual style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| fullWidth | `boolean` | `false` | Whether button spans full width |
| isLoading | `boolean` | `false` | Shows loading spinner |
| leftIcon | `ReactNode` | - | Icon before text |
| rightIcon | `ReactNode` | - | Icon after text |

#### Examples

```tsx
import { Button } from '@/components/ui'

// Primary button
<Button variant="primary" onClick={handleClick}>
  Submit
</Button>

// Button with icon
<Button
  variant="secondary"
  leftIcon={<SaveIcon />}
>
  Save
</Button>

// Loading state
<Button isLoading>
  Processing...
</Button>

// Full width button
<Button variant="primary" fullWidth>
  Continue
</Button>
```

---

### Input

A styled input field with label, error messages, and icon support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Input label text |
| error | `string` | - | Error message to display |
| helperText | `string` | - | Helper text below input |
| leftIcon | `ReactNode` | - | Icon on left side |
| rightIcon | `ReactNode` | - | Icon on right side |

#### Examples

```tsx
import { Input } from '@/components/ui'

// Basic input
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password is required"
/>

// With icons
<Input
  label="Search"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
```

---

### Textarea

A styled textarea component with validation support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Textarea label text |
| error | `string` | - | Error message to display |
| helperText | `string` | - | Helper text below textarea |
| resize | `boolean` | `true` | Allow manual resizing |

#### Examples

```tsx
import { Textarea } from '@/components/ui'

// Basic textarea
<Textarea
  label="Message"
  rows={5}
  placeholder="Enter your message"
/>

// With validation
<Textarea
  label="Description"
  error={errors.description}
  required
/>

// Non-resizable
<Textarea
  label="Bio"
  resize={false}
  rows={3}
/>
```

---

### Card

A flexible card component with multiple variants and compound components.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'glass' \| 'bordered' \| 'elevated'` | `'default'` | Visual style variant |
| interactive | `boolean` | `false` | Add hover effects |
| noPadding | `boolean` | `false` | Remove default padding |

#### Compound Components

- `CardHeader` - Card header section
- `CardTitle` - Card title
- `CardDescription` - Card description
- `CardContent` - Main card content
- `CardFooter` - Card footer

#### Examples

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui'

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Glass morphism card
<Card variant="glass" interactive>
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
    <CardDescription>Project description here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>

// Interactive card
<Card variant="elevated" interactive onClick={handleClick}>
  <p>Click me!</p>
</Card>
```

---

### Container

A responsive container with consistent max-width and padding.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| maxWidth | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'` | Maximum width |
| noPadding | `boolean` | `false` | Remove horizontal padding |

#### Examples

```tsx
import { Container } from '@/components/ui'

// Standard container
<Container>
  <h1>Page Content</h1>
</Container>

// Narrow container
<Container maxWidth="md">
  <article>Blog post content</article>
</Container>

// Full width
<Container maxWidth="full" noPadding>
  <HeroSection />
</Container>
```

---

## 🎨 Styling

All components use:
- **Tailwind CSS** for utility classes
- **CSS Custom Properties** for theming
- **Framer Motion** for animations

### Theme Variables

Components use these CSS variables (defined in `globals.css`):

```css
--color-bg-primary: #0a192f;
--color-bg-secondary: #112240;
--color-accent-primary: #64ffda;
--color-accent-secondary: #57cbff;
--color-text-primary: #e6f1ff;
--color-text-secondary: #8892b0;
```

### Custom Classes

Use the `cn` utility for merging classes:

```tsx
import { cn } from '@/lib/utils'

<Button className={cn('custom-class', isActive && 'active-class')} />
```

---

## ♿ Accessibility

All components are built with accessibility in mind:

- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly

### Example

```tsx
// Accessible button
<Button aria-label="Save document" leftIcon={<SaveIcon />}>
  Save
</Button>

// Accessible form
<form onSubmit={handleSubmit}>
  <Input
    label="Email"
    type="email"
    required
    aria-describedby="email-error"
    error={errors.email}
  />
</form>
```

---

## 🎭 Animations

Components use Framer Motion for smooth animations:

```tsx
// Button animations
<Button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</Button>

// Card animations
<Card
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</Card>
```

---

## 📱 Responsive Design

All components are responsive by default:

- Mobile-first approach
- Responsive padding and sizing
- Flexible layouts
- Touch-friendly interactive elements

---

## 🔧 Customization

### Extending Components

```tsx
// Create custom variant
<Button
  className="bg-gradient-to-r from-purple-500 to-pink-500"
  variant="ghost"
>
  Custom Gradient
</Button>

// Override styles
<Card
  variant="glass"
  style={{
    background: 'custom-gradient',
    border: '2px solid custom-color',
  }}
>
  Custom styled card
</Card>
```

### Creating New Variants

To add new variants, update the component's variant styles:

```tsx
// In Button.tsx
const variantStyles: Record<ButtonVariant, string> = {
  // ... existing variants
  custom: 'bg-custom text-custom hover:bg-custom-hover',
}

// Usage
<Button variant="custom">Custom Variant</Button>
```

---

## 📚 Best Practices

1. **Use semantic variants**
   ```tsx
   <Button variant="primary">Primary Action</Button>
   <Button variant="secondary">Secondary Action</Button>
   ```

2. **Provide labels for icons**
   ```tsx
   <Button leftIcon={<SaveIcon />} aria-label="Save document" />
   ```

3. **Handle loading states**
   ```tsx
   <Button isLoading={isSubmitting}>Submit</Button>
   ```

4. **Use compound components for cards**
   ```tsx
   <Card>
     <CardHeader>
       <CardTitle>Title</CardTitle>
     </CardHeader>
     <CardContent>Content</CardContent>
   </Card>
   ```

5. **Validate forms with proper error messages**
   ```tsx
   <Input
     label="Email"
     error={errors.email}
     helperText="We'll never share your email"
   />
   ```

---

## 🚀 Usage with Forms

Combine UI components with validation hooks:

```tsx
import { Button, Input, Textarea } from '@/components/ui'
import { useFormValidation } from '@/lib/hooks'
import { validateEmail, validateName } from '@/lib/validations'

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const { errors, validate } = useFormValidation({
    name: validateName,
    email: validateEmail,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate(formData)) {
      // Submit form
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button type="submit">Send</Button>
    </form>
  )
}
```

---

## 💡 Tips

- Import components from the barrel export: `import { Button, Input } from '@/components/ui'`
- Use TypeScript for better autocomplete and type checking
- Leverage Framer Motion props for custom animations
- Combine with custom hooks for reusable logic
- Follow accessibility guidelines for all interactive elements

---

**Last Updated**: January 2026

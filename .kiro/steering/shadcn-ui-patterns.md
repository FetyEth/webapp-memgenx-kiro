---
inclusion: always
---

# shadcn/ui Component Patterns

This steering doc ensures proper usage of shadcn/ui components in the Memory Layer web app.

## Core Principles

1. **Copy, don't install** - shadcn/ui components are copied into your project
2. **Customize freely** - Components are yours to modify
3. **Radix UI primitives** - Built on top of Radix UI for accessibility
4. **Tailwind styling** - Use Tailwind classes for styling
5. **TypeScript first** - Fully typed components

## Component Installation

```bash
# Install a component
npx shadcn-ui@latest add button

# Install multiple components
npx shadcn-ui@latest add button card dialog
```

## Component Structure

All shadcn/ui components follow this pattern:

```typescript
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
```

## Essential Components

### Button

```typescript
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// As child (renders as Link, etc.)
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

### Card

```typescript
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
  </DialogContent>
</Dialog>
```

### Input

```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Email" />
</div>
```

### Select

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Toast

```typescript
import { useToast } from "@/components/ui/use-toast"

export function Component() {
  const { toast } = useToast()
  
  return (
    <Button
      onClick={() => {
        toast({
          title: "Success",
          description: "Your action was successful",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
```

## Utility Function (cn)

The `cn` function is essential for merging Tailwind classes:

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage:

```typescript
<Button className={cn("custom-class", isActive && "active-class")}>
  Click me
</Button>
```

## Theming

shadcn/ui uses CSS variables for theming:

```css
/* app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... more variables */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... more variables */
  }
}
```

## Customization Patterns

### Extending Variants

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        outline: "...",
        // Add custom variant
        spooky: "bg-gradient-to-r from-purple-600 to-orange-600",
      },
    },
  }
)
```

### Custom Component Composition

```typescript
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="bg-purple-800/30 border-purple-600 hover:scale-105 transition">
      <CardHeader>
        <div className="text-4xl mb-4">{icon}</div>
        <CardTitle className="text-purple-200">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-purple-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
```

## Accessibility

shadcn/ui components are built with accessibility in mind:

- **Keyboard navigation** - All interactive elements are keyboard accessible
- **ARIA attributes** - Proper ARIA labels and roles
- **Focus management** - Visible focus indicators
- **Screen reader support** - Semantic HTML and labels

Always maintain these standards when customizing:

```typescript
<Button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" />
</Button>
```

## Form Patterns

```typescript
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email(),
})

export function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Common Patterns

### Loading States

```typescript
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </>
  ) : (
    "Submit"
  )}
</Button>
```

### Responsive Dialogs

```typescript
<Dialog>
  <DialogContent className="sm:max-w-[425px]">
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Card Grids

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

## Key Rules

1. **Use cn() for className merging** - Always use the cn utility
2. **Maintain accessibility** - Don't remove ARIA attributes
3. **Customize with Tailwind** - Use Tailwind classes for styling
4. **Compose components** - Build complex UIs from simple components
5. **Type everything** - Use TypeScript for all props
6. **Follow Radix patterns** - Understand underlying Radix UI components
7. **Use variants** - Leverage CVA for component variants
8. **Keep it simple** - Don't over-complicate component APIs
9. **Test responsiveness** - Ensure mobile-first design
10. **Document custom variants** - Comment custom additions

---

*These patterns ensure consistent, accessible shadcn/ui usage throughout the Memory Layer web app.*

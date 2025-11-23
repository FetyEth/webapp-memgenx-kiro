---
inclusion: always
---

# Next.js 14 App Router Conventions

This steering doc ensures consistent Next.js 14 patterns throughout the Memory Layer web app.

## App Router Structure

### File Conventions
- `page.tsx` - Route pages (Server Components by default)
- `layout.tsx` - Shared layouts with metadata
- `loading.tsx` - Loading UI with Suspense
- `error.tsx` - Error boundaries
- `not-found.tsx` - 404 pages

### Server vs Client Components
```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component (use 'use client' directive)
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState()}>Click</button>
}
```

## Metadata API

Always use the Metadata API for SEO:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Layer - Never Lose Context Again',
  description: 'AI-powered conversation memory for developers',
  openGraph: {
    title: 'Memory Layer',
    description: 'Never lose context again',
    images: ['/og-image.png'],
  },
}
```

## Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image'

<Image
  src="/brain-icon.png"
  alt="Memory Layer Brain"
  width={500}
  height={500}
  priority // for above-the-fold images
/>
```

## Route Handlers (API Routes)

```typescript
// app/api/memories/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const data = await fetchMemories()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ success: true })
}
```

## Data Fetching

### Server Components (Preferred)
```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store', // or 'force-cache'
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

### Client Components
```typescript
'use client'
import { useEffect, useState } from 'react'

export default function ClientPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return <div>{data}</div>
}
```

## Environment Variables

- `NEXT_PUBLIC_*` - Exposed to browser
- Regular env vars - Server-side only

```typescript
// Server-side only
const apiKey = process.env.API_KEY

// Client-side accessible
const publicUrl = process.env.NEXT_PUBLIC_API_URL
```

## TypeScript Best Practices

### Component Props
```typescript
interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>ID: {params.id}</div>
}
```

### Async Components
```typescript
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

## Performance Optimization

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('@/components/heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // disable server-side rendering if needed
})
```

### Streaming with Suspense
```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  )
}
```

## Routing

### Link Component
```typescript
import Link from 'next/link'

<Link href="/dashboard" prefetch={true}>
  Dashboard
</Link>
```

### Programmatic Navigation
```typescript
'use client'
import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()
  
  const navigate = () => {
    router.push('/dashboard')
    // router.replace('/dashboard')
    // router.back()
  }
  
  return <button onClick={navigate}>Go</button>
}
```

## Error Handling

### Error Boundaries
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication, redirect, etc.
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

## Project Structure

```
app/
├── (auth)/              # Route groups (doesn't affect URL)
│   ├── login/
│   └── signup/
├── dashboard/
│   ├── page.tsx
│   ├── layout.tsx
│   └── loading.tsx
├── api/
│   └── memories/
│       └── route.ts
├── layout.tsx           # Root layout
├── page.tsx             # Home page
└── globals.css
```

## Key Rules

1. **Server Components by default** - Only use 'use client' when needed
2. **Metadata API** - Always define metadata for SEO
3. **Image optimization** - Use Next.js Image component
4. **TypeScript** - Properly type all props and functions
5. **Error boundaries** - Handle errors gracefully
6. **Loading states** - Use loading.tsx or Suspense
7. **Environment variables** - Use NEXT_PUBLIC_ prefix for client-side
8. **Route handlers** - Use app/api for API routes
9. **Dynamic imports** - Code split heavy components
10. **Link prefetching** - Use Link component for navigation

---

*These conventions ensure consistent, performant Next.js 14 code throughout the Memory Layer web app.*

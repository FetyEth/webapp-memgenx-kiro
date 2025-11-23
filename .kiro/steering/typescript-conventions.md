---
inclusion: always
---

# TypeScript Conventions

This steering doc ensures consistent TypeScript usage throughout the Memory Layer web app.

## General Principles

1. **Strict mode enabled** - No implicit any, strict null checks
2. **Explicit types** - Prefer explicit over inferred when it improves clarity
3. **Interface over type** - Use interfaces for object shapes
4. **Type over interface** - Use types for unions, intersections, primitives
5. **No any** - Use unknown or proper types instead

## Component Props

### React Component Props

```typescript
// Use interface for component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  isLoading?: boolean
}

export function Button({ variant = 'default', size = 'default', ...props }: ButtonProps) {
  return <button {...props} />
}
```

### Children Props

```typescript
interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return <div className={className}>{children}</div>
}
```

### Event Handlers

```typescript
interface FormProps {
  onSubmit: (data: FormData) => void
  onChange?: (value: string) => void
}

// In component
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}
```

## API Types

### Request/Response Types

```typescript
// API request
interface CreateMemoryRequest {
  content: string
  platform: 'slack' | 'discord' | 'web'
  userId: string
}

// API response
interface CreateMemoryResponse {
  id: string
  content: string
  createdAt: string
  success: boolean
}

// Error response
interface ApiError {
  error: string
  message: string
  statusCode: number
}
```

### Fetch with Types

```typescript
async function createMemory(data: CreateMemoryRequest): Promise<CreateMemoryResponse> {
  const response = await fetch('/api/memories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error: ApiError = await response.json()
    throw new Error(error.message)
  }
  
  return response.json()
}
```

## State Management

### useState

```typescript
// Explicit type
const [count, setCount] = useState<number>(0)

// Inferred type (when initial value is clear)
const [name, setName] = useState('')

// Complex state
interface User {
  id: string
  name: string
  email: string
}

const [user, setUser] = useState<User | null>(null)
```

### useReducer

```typescript
interface State {
  count: number
  loading: boolean
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setLoading'; payload: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'setLoading':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, loading: false })
```

## Utility Types

### Common Patterns

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Omit properties
type UserWithoutPassword = Omit<User, 'password'>

// Partial (all optional)
type PartialUser = Partial<User>

// Required (all required)
type RequiredUser = Required<User>

// Record
type UserMap = Record<string, User>

// Extract from union
type Status = 'pending' | 'success' | 'error'
type SuccessStatus = Extract<Status, 'success'>

// Exclude from union
type NonErrorStatus = Exclude<Status, 'error'>
```

### Custom Utility Types

```typescript
// Make specific fields optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type UserWithOptionalEmail = Optional<User, 'email'>

// Make specific fields required
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

type UserWithRequiredEmail = RequireFields<Partial<User>, 'email'>
```

## Async/Await

### Async Functions

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const data: User = await response.json()
  return data
}

// With error handling
async function fetchUserSafe(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}
```

### Promise Types

```typescript
// Multiple promises
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
])

// Type inference works
users.forEach(user => console.log(user.name))
posts.forEach(post => console.log(post.title))
```

## Generics

### Generic Functions

```typescript
function identity<T>(value: T): T {
  return value
}

const num = identity(42) // number
const str = identity('hello') // string

// With constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'John', age: 30 }
const name = getProperty(user, 'name') // string
const age = getProperty(user, 'age') // number
```

### Generic Components

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

## Type Guards

### Custom Type Guards

```typescript
interface Dog {
  type: 'dog'
  bark: () => void
}

interface Cat {
  type: 'cat'
  meow: () => void
}

type Animal = Dog | Cat

// Type guard
function isDog(animal: Animal): animal is Dog {
  return animal.type === 'dog'
}

// Usage
function handleAnimal(animal: Animal) {
  if (isDog(animal)) {
    animal.bark() // TypeScript knows it's a Dog
  } else {
    animal.meow() // TypeScript knows it's a Cat
  }
}
```

### Built-in Type Guards

```typescript
// typeof
if (typeof value === 'string') {
  console.log(value.toUpperCase())
}

// instanceof
if (error instanceof Error) {
  console.log(error.message)
}

// in operator
if ('email' in user) {
  console.log(user.email)
}
```

## Enums vs Union Types

### Prefer Union Types

```typescript
// ❌ Avoid enums
enum Status {
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

// ✅ Use union types
type Status = 'pending' | 'success' | 'error'

// With const object for values
const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

type Status = typeof STATUS[keyof typeof STATUS]
```

## Discriminated Unions

```typescript
interface LoadingState {
  status: 'loading'
}

interface SuccessState {
  status: 'success'
  data: User[]
}

interface ErrorState {
  status: 'error'
  error: string
}

type State = LoadingState | SuccessState | ErrorState

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      return <Spinner />
    case 'success':
      return <UserList users={state.data} />
    case 'error':
      return <Error message={state.error} />
  }
}
```

## Module Declarations

### Extending Third-Party Types

```typescript
// types/global.d.ts
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}

export {}
```

### Module Augmentation

```typescript
// Extend Next.js types
declare module 'next' {
  interface PageProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
}
```

## Best Practices

### 1. Avoid Type Assertions

```typescript
// ❌ Avoid
const user = data as User

// ✅ Use type guards
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  )
}

if (isUser(data)) {
  console.log(data.name)
}
```

### 2. Use Const Assertions

```typescript
// ❌ Type is string[]
const colors = ['red', 'green', 'blue']

// ✅ Type is readonly ['red', 'green', 'blue']
const colors = ['red', 'green', 'blue'] as const
```

### 3. Prefer Unknown Over Any

```typescript
// ❌ Avoid any
function process(data: any) {
  return data.value
}

// ✅ Use unknown with type guards
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value
  }
  throw new Error('Invalid data')
}
```

### 4. Use Readonly for Immutability

```typescript
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

// Array
function process(items: readonly string[]) {
  // items.push('new') // Error: readonly
  return items.map(item => item.toUpperCase())
}
```

### 5. Proper Error Handling

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchData(): Promise<Data> {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new ApiError('Failed to fetch', response.status)
    }
    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.statusCode}: ${error.message}`)
    } else if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    } else {
      console.error('Unknown error:', error)
    }
    throw error
  }
}
```

## Key Rules

1. **Enable strict mode** - Always use strict TypeScript
2. **No implicit any** - Explicitly type everything
3. **Interface for objects** - Use interfaces for object shapes
4. **Type for unions** - Use types for unions and primitives
5. **Avoid type assertions** - Use type guards instead
6. **Use unknown over any** - Safer than any
7. **Const assertions** - For literal types
8. **Readonly when possible** - Immutability is good
9. **Generic when reusable** - Don't repeat yourself
10. **Discriminated unions** - For complex state

---

*These conventions ensure type-safe, maintainable TypeScript code throughout the Memory Layer web app.*

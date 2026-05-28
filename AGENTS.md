# AGENTS.md

## Stack

- Next.js App Router
- TypeScript strict
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query

## Structure

- Use the default `app/` structure.
- Do not use feature-first architecture.
- Prefer one function per file.
- Shared components go in `components/`.
- Global layout/navigation components shared by logged-in routes go in `components/`, not in `app/_components/`.
- Route-specific reusable components go in `_components/`.
- Shared types go in `types/`.
- Shared hooks go in `hooks/`.
- API routes go in `app/api/`.

## Components

- Keep components simple, small and functional.
- Reuse existing components before creating new ones.
- If a component is used in more than one route, move it to `components/`.
- If a component is reused only inside one route, place it in that route’s `_components/`.
- Create skeleton loading states for UI that depends on API data, even when using mocked data.

## Styling

- Use Tailwind only.
- Prioritize mobile-first layouts.
- Prefer semantic classes:
  - `bg-background`
  - `text-foreground`
  - `border-border`
- Use `size-*` when width and height are equal.

Good:

```tsx
size - 4
```

Avoid:

```tsx
w-4 h-4
```

- Avoid arbitrary values when Tailwind scale can represent it.

Prefer:

```tsx
w - 4
w - 14.5
mt - 3.75
```

Avoid:

```tsx
w-[16px]
w-[58px]
mt-[15px]
```

- Scale may use `.25`, `.5`, `.75` when needed.

## Data Fetching

- The project uses mocked data.
- Mocked data must simulate real API behavior.
- Always call endpoints through `/api`.
- Do not expose real external endpoints directly in components.
- API routes must act as a proxy/contract layer, even for mocks.

Preferred:

```ts
fetch('/api/products')
```

Avoid:

```ts
fetch('https://external-api.com/products')
```

## React Rules

- Prefer Server Components.
- Add `"use client"` only when necessary.
- Avoid `useEffect` whenever possible.
- Prefer:
  - `useMemo`
  - `useCallback`
  - `use`
  - Server Components
  - Server Actions
- Use `useEffect` only for real side effects:
  - subscriptions
  - browser APIs
  - event listeners
  - analytics

Do not use `useEffect` for basic data fetching.

## Performance

- Focus on performance by default.
- Minimize client-side JavaScript.
- Use dynamic imports when appropriate.
- Avoid unnecessary dependencies.
- Use `next/image` for images.
- Use `next/font` for fonts.

## SEO

- Add proper metadata.
- Use semantic HTML.
- Use meaningful headings.
- Keep pages indexable when applicable.

## Accessibility

- Use semantic HTML.
- Ensure keyboard navigation.
- Preserve focus states.
- Add `aria-*` only when necessary.

## Code Standards

- Avoid `any`.
- Prefer early returns.
- Keep files focused.
- Avoid overengineering.
- Do not add dependencies without justification.

## Before finishing

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

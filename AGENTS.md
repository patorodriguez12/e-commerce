# AGENTS.md — Smartech (e-commerce)

## Commands
- `npm run dev` — Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npm run start` — production server

No test, typecheck, or format scripts exist.

## Architecture
- **Next.js 16** App Router, React 19, TypeScript 5, Tailwind CSS 4
- **Path alias**: `@/*` → `./src/*`
- **Prices stored in cents** (integers). `formatPrice(n)` divides by 100 and formats as USD.
- **Remote images** from `images.unsplash.com` and `*.supabase.co` (configured in `next.config.ts`)
- **Styling**: CSS variables + inline `style` props (dark theme). No Tailwind utility classes in actual components.

## Supabase — three clients
| File | When to use |
|------|-------------|
| `src/lib/supabase/server.ts` | Server Components, Server Actions |
| `src/lib/supabase/client.ts` | Browser Client Components |
| `src/lib/supabase/admin.ts` | Webhook handler, admin server ops (uses `service_role` key) |

All three must be imported explicitly; there is no shared factory.

## Middleware (`src/middleware.ts`)
Checks session **only** (redirects unauthenticated users from `/dashboard`, `/checkout`, `/admin`). Role verification is deferred to `requireAdmin()` server function called inside protected pages/layouts (avoids DB query on every request).

## Auth
- Server Actions live in `src/lib/supabase/actions.ts` (login, register, logout, wishlist, review, OAuth)
- OAuth callback at `src/app/auth/callback/route.ts` exchanges code for session
- Admin-only Server Actions in `src/lib/supabase/admin-actions.ts` (gated by `requireAdmin()`)

## Cart
- Zustand store (`src/lib/store/cartStore.tsx`) persisted to localStorage under key `cart-storage`
- Cart drawer open/close state is a separate Zustand store (`src/lib/store/cartDrawerStore.ts`)
- Cart drawer is mounted in root layout (not inside Navbar) to avoid `position: fixed` bugs
- **Server sync**: `CartSync` component in root layout syncs cart to `cart_items` table for authenticated users (cross-device). Guest cart stays in localStorage. Merge on login: guest items + server items combined (quantities summed per product).
- **Required table** for sync:
  ```sql
  create table cart_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    product_id uuid not null references products(id) on delete cascade,
    quantity integer not null default 1 check (quantity > 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, product_id)
  );
  alter table cart_items enable row level security;
  create policy "Users can manage own cart"
    on cart_items for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  ```

## Checkout / Stripe
- `POST /api/checkout/session` — stock validation via admin client, creates Stripe Checkout Session
- `POST /api/stripe/webhook` — handles `checkout.session.completed`, creates order + order_items, calls `decrement_stock` RPC. Idempotency via unique constraint violation (`23505`) on `stripe_session_id` rather than a pre-check SELECT.
- Webhook uses `nodejs` runtime (`export const runtime = "nodejs"`)

## Products & catalog
- Home page (`src/app/(store)/page.tsx`) is a Server Component that reads `searchParams` for filtering/sorting
- Client-side filter state via `useFilters()` hook (URL search params)
- Prices stored as cents in DB, passed as integers to Stripe `unit_amount`

## Storage
- Product images in Supabase Storage `products` bucket via `src/lib/supabase/storage.ts`

## Role-based access
- Roles (`customer`/`admin`) in `profiles` table, enforced via SQL RLS policies
- `requireAdmin()` in `src/lib/supabase/auth.ts` checks profile role and redirects if not admin

## Project structure

```
src/
  app/
    (auth)/login, (auth)/register     — public auth pages
    (store)/                          — catalog + home
    admin/                            — admin panel (role-gated layout)
    api/checkout/session, api/stripe/webhook  — route handlers
    auth/callback                     — OAuth code exchange
    checkout/, dashboard/             — protected pages
  components/
    admin/         — ProductForm, OrderStatusSelect
    auth/          — OAuthButtons
    cart/          — CartDrawer, CartItem, CartButton
    dashboard/     — ProfileForm
    layout/        — Navbar, Hero, Footer, UserMenu, LogoutButton
    products/      — ProductCard, ProductGrid, FilterSidebar, Reviews
    ui/            — Skeleton
  lib/
    hooks/         — useFilters
    store/         — cartStore (localStorage), cartDrawerStore
    supabase/      — 3 clients, actions, auth helpers, storage
    stripe/        — initialized Stripe instance
    utils/         — formatPrice
  types/           — Product, Order, CartItem, Review, etc.
```

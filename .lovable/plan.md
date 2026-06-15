## What the uploaded zip contains

A full Vite + React + react-query + axios SPA (`frontend/`) plus shared packages (`api-client`, `ui`, `i18n`). Highlights:

- `src/api/client.ts` — axios client with bearer token from a zustand `useAuthStore`, `VITE_API_URL`, 401 auto-logout.
- `src/auth/` — login, session store, capability checks (`MANAGE_USERS`, `EDIT_FLIGHTS`, `MANAGE_PRICES`, `HELLOASSO`, `MANAGE_PLANCHE`, …).
- `src/modules/` — 17 business modules (flights, vi, pricing, members, planche, helloasso, rh, banque, planning, reporting, admin…). The big ones are real, working pages: `FlightsBillingPage` (1427 lines), `PricingPage` (1019), `FlightsPage` (676), `ViEntitlementsPage` (418), all wired to react-query hooks against a documented REST API.
- `src/shell/navigation.ts` — same 14-priority IA we already mirrored.
- `packages/i18n/` — `nav.*` translation keys.

The current Lovable app is TanStack Start with our blended sidebar, mock data, and empty route shells.

## Strategy: keep our UX shell, plug in their data + screens incrementally

We do **not** replace our TanStack Start shell, sidebar, header, alerts banner, role/member context, or design tokens. We import the existing front's **data layer** and the **screens that already work**, mounted inside our routes.

### Phase 1 — Infrastructure (this turn)

1. **Axios + react-query data layer**
   - `bun add axios @tanstack/react-query zustand` (react-query is likely already in template).
   - Port `src/api/client.ts` → `src/lib/api-client.ts` (same bearer-token logic, reads `VITE_API_URL`).
   - Port `src/auth/store/authStore.ts` → `src/lib/auth-store.ts` (zustand, `sessionStorage`, token + user + capabilities).
   - Wire `QueryClientProvider` in `__root.tsx` if not already present.

2. **Capabilities**
   - Replace our `role-context` consumers with a `useCapability(cap)` hook backed by the auth store. Keep the existing role switcher visually but drive it from real user capabilities when a session exists, fall back to mock when not.

3. **Env + login**
   - Add `VITE_API_URL` to `.env` (empty default → same-origin).
   - Port the minimal `LoginPage` to `/login` route so a real backend session can be obtained. When no token → redirect to `/login`; when token present → render shell.

### Phase 2 — Port the high-value modules into our routes

Each existing module page becomes the body of the matching route we already created. We swap our placeholder tabs for the real component, keeping our `AppShell`/`PageHeader`/`KpiCard` wrapper.

| Our route               | Existing component to mount                          |
|-------------------------|------------------------------------------------------|
| `/flights`              | `FlightsWorkspacePage` (tabs: flights / billing / packs / gesasso / osrt / sync) |
| `/discovery` → `/vi`    | `ViWorkspacePage` (entitlements / types / planning / helloasso / import / sync) |
| `/pricing`              | `PricingPage`                                        |
| `/members`              | members module                                       |
| `/sales`, `/purchases`  | sales / purchases modules                            |
| `/finance`, `/accounting` | banque + accounting                                |
| `/rh`, `/assets`, `/planning`, `/reporting`, `/administration`, `/integrations` | matching modules |
| `/portal/*`             | member-portal module, driven by our `useSelectedMember` so the operator view still works |

Each port is mechanical: copy the module folder under `src/modules/<name>/`, adjust imports (`@/lib/api-client`, lucide icons already match), drop the page into the route file.

### Phase 3 — Polish & cleanup

- Translate `labelKey` tokens via the ported i18n bundle (or hard-code FR strings if we want to stay light).
- Remove now-unused mock data once a route is fully wired.
- Hook the existing `Alerts` (fiscal year closing) into our `AlertsBanner` using real API data.

## Technical details

- **Routing**: their app uses `react-router-dom` with `?tab=` query params; we use TanStack Router with `#hash`. We keep our hash convention and translate inside each ported component (`useRouterState({select: s => s.location.hash})` → tab id). One small adapter per workspace page.
- **Styling**: their pages use `@/components/ui/*` from shadcn (same tokens). No restyling needed — they'll inherit our theme via `src/styles.css`.
- **License**: AGPL-3.0 (per file headers). We must keep the headers on ported files and add an `AGPL` notice to the repo.
- **Backend**: this app needs the existing Django/FastAPI backend at `VITE_API_URL`. Without it the screens render but mutations 404. That's expected — set the env var to point at your dev backend.

## What I will NOT do without your go-ahead

- Replace our sidebar, header, or root layout.
- Delete our `selected-member-context` or operator "view as" flow.
- Switch the router away from TanStack Start.
- Port the member-portal as a separate sub-app — we keep it as routes under `/portal/*` driven by selected member.

## Open questions

1. Do you have the backend running somewhere I should point `VITE_API_URL` to, or should I keep mock data fallbacks for unreachable endpoints?
2. Should the login page live at `/login` (gate everything) or behind a "Sign in" button while the app still works with mock data?
3. Want me to start Phase 1 + port **flights** and **VI** in this turn (the two most valuable, matches the brief), and queue the rest?

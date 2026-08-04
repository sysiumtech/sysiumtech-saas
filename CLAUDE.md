# SYSIUM TECH — Gestión de obras para constructoras

App de gestión de proyectos de construcción para PYMEs en LATAM. Next.js 16 (App Router) + Supabase (Postgres + Auth), desplegado en Vercel.

## Stack

- **Next.js 16** (Turbopack, App Router), React 18, TypeScript
- **Tailwind CSS**
- **Supabase**: Auth + Postgres. Los datos de la app viven en un schema propio, **no** en `public`.
- **Vercel**: hosting/deploy (proyecto `sysiumtech-saas` en el team `sysium-tech`)

## Modelo de datos (Supabase)

Schema: **`sysium_constructora`** (definido en `sysium_constructora_tablas.sql`, fuera del repo de código pero es la fuente de verdad del esquema).

Tablas: `constructoras`, `clientes`, `obras`, `etapas`, `checklist_items`, `actualizaciones`, `fotos`, `documentos`.

Multi-tenant: cada usuario autenticado es dueño de **una sola constructora** (`constructoras.owner_id = auth.uid()`, con `UNIQUE (owner_id)`). Todo el aislamiento entre constructoras se hace con **RLS** en Postgres vía `sysium_constructora.get_constructora_id()` — el código de Next.js nunca decide qué filas puede ver un usuario, solo Postgres.

### Gotchas al tocar este schema (ya resueltos, pero repetibles si se agregan tablas)

Un schema custom (no `public`) necesita **dos** opt-ins en Supabase para ser alcanzable vía la Data API, y si falta cualquiera de los dos el error es distinto y no obvio:

1. **Dashboard → Settings → API**: exponer el schema `sysium_constructora` y sus tablas. Si falta → `PGRST106 Invalid schema`.
2. **SQL** (GRANT, aparte de RLS):
   ```sql
   GRANT USAGE ON SCHEMA sysium_constructora TO anon, authenticated, service_role;
   GRANT ALL ON ALL TABLES IN SCHEMA sysium_constructora TO anon, authenticated, service_role;
   GRANT ALL ON ALL ROUTINES IN SCHEMA sysium_constructora TO anon, authenticated, service_role;
   GRANT ALL ON ALL SEQUENCES IN SCHEMA sysium_constructora TO anon, authenticated, service_role;
   ALTER DEFAULT PRIVILEGES IN SCHEMA sysium_constructora GRANT ALL ON TABLES TO anon, authenticated, service_role;
   ALTER DEFAULT PRIVILEGES IN SCHEMA sysium_constructora GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
   ALTER DEFAULT PRIVILEGES IN SCHEMA sysium_constructora GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
   ```
   Si falta → `42501 permission denied for schema`. Esto es una capa **antes** de RLS; RLS sola no basta.

Ambos ya están aplicados en el proyecto de Supabase actual.

## Autenticación y flujo de usuario

- `app/(auth)/register/page.tsx` → `supabase.auth.signUp()` (pide nombre, empresa, correo, contraseña). Requiere confirmar correo salvo que se desactive en Auth settings.
- `app/(auth)/login/page.tsx` → `supabase.auth.signInWithPassword()`.
- `proxy.ts` (convención Next.js 16, reemplaza `middleware.ts`): protege `/dashboard/*` redirigiendo a `/login` si no hay sesión, y redirige `/login`/`/register` → `/dashboard` si ya hay sesión. También aplica el header CSP.
- **Primer ingreso**: `lib/supabase/constructora.ts` → `getOrCreateConstructora()` crea la constructora del usuario si no existe, usando `user_metadata.company` capturado en el registro. Es idempotente ante condiciones de carrera (maneja `23505 unique_violation` re-consultando en vez de fallar).

## Rutas implementadas

| Ruta | Estado |
|---|---|
| `/register`, `/login` | Funcionales, usan Supabase Auth |
| `/dashboard` | Datos reales: obras activas, % presupuesto ejecutado, avance promedio, obras recientes, alertas (`actualizaciones` con `hubo_retraso = true`) |
| `/dashboard/obras` | Listado real de obras de la constructora del usuario (avance, presupuesto/abonado, fechas, estado) |
| `/dashboard/budgets`, `/dashboard/projects`, `/dashboard/projects/[id]` | Preexistentes del scaffold inicial, **no** conectadas a Supabase todavía (mock) |

### Pendiente / próximos pasos obvios (no incluidos aún)

- Crear/editar obra (formulario)
- Detalle de obra: etapas + checklist
- Subida de fotos/documentos (Supabase Storage)
- Portal del cliente (ya tiene políticas RLS `anon` listas vía `portal_token` en el SQL, falta el frontend)
- Conectar `/dashboard/budgets`, `/dashboard/team`, `/dashboard/inventory` a datos reales

## Archivos clave

- `lib/supabase/client.ts` / `server.ts` — clientes Supabase (browser/server), ambos apuntan a `db.schema: 'sysium_constructora'`
- `lib/supabase/database.types.ts` — tipos TS a mano de las 8 tablas (no autogenerados; actualizar manualmente si el schema SQL cambia)
- `lib/supabase/constructora.ts` — `getOrCreateConstructora()`
- `lib/format.ts` — `formatCurrency`, `formatCurrencyCompact`, `formatDate` (fechas se formatean en `timeZone: 'UTC'` a propósito, porque las columnas `date` de Postgres no tienen hora y se parsean como medianoche UTC)
- `components/dashboard/sidebar.tsx` — nav del dashboard

## Variables de entorno (`.env.local`, gitignored)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # solo para scripts admin/testing puntuales, JAMÁS en código de la app ni en el cliente
```

## Cómo probar el flujo completo (login → dashboard → obras)

El signup público (`/register` + `supabase.auth.signUp()`) depende del enviador de email por default de Supabase, que tiene un rate limit muy bajo (se agota rápido y **no** se libera aunque se desactive "Confirm email"). Para pruebas end-to-end, crear usuarios ya confirmados directo con la Admin API en un script suelto (no committeado):

```js
const admin = createClient(url, serviceRoleKey) // NUNCA en código de la app
await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { company } })
```

Luego probar con Playwright (headless) contra `npm run dev`, revisando además `.next/dev/logs/next-development.log` para ver el error real de Postgres/PostgREST cuando el navegador solo muestra "server error" genérico.

## Historial de cambios relevantes (2026-07-09)

- Clientes Supabase apuntando al schema `sysium_constructora` (antes usaban `public` por default)
- Subido `@supabase/ssr` de `0.5.1` a `0.12.0` — la versión vieja era incompatible con los tipos de `@supabase/supabase-js` ya instalado (2.10x), colapsaba todo a `never`
- Creados `lib/supabase/database.types.ts`, `lib/supabase/constructora.ts`, `lib/format.ts`
- `/dashboard` y `/dashboard/obras` conectados a datos reales
- Sidebar: "Proyectos" → "Obras" (ruta correcta), quitado badge "3" hardcodeado en Alertas
- Fix condición de carrera en `getOrCreateConstructora` (+ constraint `UNIQUE(owner_id)` en Supabase)
- Fix desfase de zona horaria en `formatDate`
- En Supabase: schema `sysium_constructora` expuesto en Data API + GRANTs aplicados

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
| `/dashboard/obras/new` | Alta de obra + cliente (nuevo o existente) en un mismo formulario. Sin esto, la única forma de crear una obra era por script/SQL directo |
| `/dashboard/obras/[id]` | Detalle de obra: resumen + etapas + checklist interactivo (marcar/desmarcar tareas). Altas mínimas de etapa y de tarea incluidas. El avance (`avance_pct` de etapa y de obra) lo recalcula solo el trigger `recalcular_avance()` de Postgres — el código nunca lo escribe |
| `/dashboard/budgets`, `/dashboard/projects`, `/dashboard/projects/[id]` | Preexistentes del scaffold inicial, **no** conectadas a Supabase todavía (mock) |

### Pendiente / próximos pasos obvios (no incluidos aún)

- Editar obra existente (hoy solo se puede crear, no editar desde la UI)
- Editar/eliminar etapas y tareas de checklist (hoy solo se pueden crear y marcar/desmarcar)
- Subida de fotos/documentos (Supabase Storage)
- Portal del cliente (ya tiene políticas RLS `anon` listas vía `portal_token` en el SQL, falta el frontend)
- Conectar `/dashboard/budgets`, `/dashboard/team`, `/dashboard/inventory` a datos reales

## Archivos clave

- `lib/supabase/client.ts` / `server.ts` — clientes Supabase (browser/server), ambos apuntan a `db.schema: 'sysium_constructora'`
- `lib/supabase/database.types.ts` — tipos TS a mano de las 8 tablas (no autogenerados; actualizar manualmente si el schema SQL cambia)
- `lib/supabase/constructora.ts` — `getOrCreateConstructora()`
- `app/(dashboard)/dashboard/obras/new/` — `page.tsx` (Server Component: carga constructora + clientes existentes) + `nueva-obra-form.tsx` (Client Component: inserta cliente si es nuevo, luego la obra, vía `lib/supabase/client.ts`)
- `lib/format.ts` — `formatCurrency`, `formatCurrencyCompact`, `formatDate` (fechas se formatean en `timeZone: 'UTC'` a propósito, porque las columnas `date` de Postgres no tienen hora y se parsean como medianoche UTC)
- `components/dashboard/sidebar.tsx` — nav del dashboard

## Variables de entorno (`.env.local`, gitignored)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # solo para scripts admin/testing puntuales, JAMÁS en código de la app ni en el cliente
```

## Deploy y variables de entorno en Vercel

`.env.local` es solo para desarrollo local — **nunca** sube a git (ver sección de git abajo) y Vercel no lo lee. Para que producción funcione, las variables tienen que estar cargadas por separado en:

**Vercel Dashboard → proyecto `sysiumtech-saas` → Settings → Environment Variables**, marcando **Production** y **Preview**:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
(`SUPABASE_SERVICE_ROLE_KEY` no hace falta ahí — la app nunca la usa en runtime, solo en scripts sueltos de testing/admin.)

Si estas variables faltan, el síntoma es que el login se queda pegado en "Ingresando..." con el error de consola `@supabase/ssr: Your project's URL and API key are required to create a Supabase client!`. Ya pasó una vez (2026-08-04) — producción nunca las tuvo configuradas hasta ese día, aunque el código llevaba tiempo dependiendo de ellas.

Después de agregar/cambiar variables hay que darle **Redeploy** al último deployment — los deployments ya existentes no las recogen solos.

## Flujo de git

- **`main`** = producción. Cada push aquí dispara un deploy real a `www.sysiumtech.com`.
- **`qa`** = donde se prueba antes de pasar a producción. Vercel le genera su propia URL de preview en cada push.
- Flujo: commits en `qa` → push → probar en su preview URL → Pull Request `qa` → `main` en GitHub → merge → producción.

**Nunca commitear `.env.local`** (ver `.env.local.example` para la plantilla sin secretos). El 2026-08-04 se descubrió que quedó trackeado en git desde antes (`git log -- .env.local`), exponiendo la anon key (pública, sin riesgo real) en el historial. Se corrigió con `git rm --cached .env.local` para que futuros cambios ya no se rastreen. **Ojo**: si vuelve a pasar algo similar, verificar que el archivo siga existiendo en disco después de un `git checkout`/`git pull` que cruce una rama donde el archivo todavía estaba trackeado — git puede borrarlo físicamente al aplicar el diff de "delete tracked file". Pasó una vez y se restauró a mano desde el contenido conocido.

También se desvinculó `.next/` (327 archivos de build que no deberían vivir en git, se regeneran solos) y se agregó `.expo/` al `.gitignore` (carpeta de Expo/React Native sin relación con este proyecto Next.js).

## Cómo probar el flujo completo (login → dashboard → obras)

El signup público (`/register` + `supabase.auth.signUp()`) depende del enviador de email por default de Supabase, que tiene un rate limit muy bajo (se agota rápido y **no** se libera aunque se desactive "Confirm email"). Para pruebas end-to-end, crear usuarios ya confirmados directo con la Admin API en un script suelto (no committeado):

```js
const admin = createClient(url, serviceRoleKey) // NUNCA en código de la app
await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { company } })
```

Luego probar con Playwright (headless) contra `npm run dev`, revisando además `.next/dev/logs/next-development.log` para ver el error real de Postgres/PostgREST cuando el navegador solo muestra "server error" genérico.

## Estado actual (2026-08-06)

Verificado end-to-end **en producción** (`www.sysiumtech.com`): registro/login real, alta automática de constructora, dashboard, `/dashboard/obras`, alta de obra + cliente, y detalle de obra con etapas + checklist (crear etapa → agregar tareas → marcar completada → avance recalculado solo). Sin errores de consola. `main` y `qa` están mergeados y sincronizados con `origin`.

Pendiente conocido, sin bloquear nada: `/forgot-password`, `/dashboard/alerts`, `/dashboard/settings`, `/dashboard/team`, `/dashboard/inventory` están enlazados desde el nav pero la página no existe (404). Ver `ESTRUCTURA.md` para el detalle de qué es cada archivo y los próximos pasos completos.

## Historial de cambios relevantes

**2026-07-09**
- Clientes Supabase apuntando al schema `sysium_constructora` (antes usaban `public` por default)
- Subido `@supabase/ssr` de `0.5.1` a `0.12.0` — la versión vieja era incompatible con los tipos de `@supabase/supabase-js` ya instalado (2.10x), colapsaba todo a `never`
- Creados `lib/supabase/database.types.ts`, `lib/supabase/constructora.ts`, `lib/format.ts`
- `/dashboard` y `/dashboard/obras` conectados a datos reales
- Sidebar: "Proyectos" → "Obras" (ruta correcta), quitado badge "3" hardcodeado en Alertas
- Fix condición de carrera en `getOrCreateConstructora` (+ constraint `UNIQUE(owner_id)` en Supabase)
- Fix desfase de zona horaria en `formatDate`
- En Supabase: schema `sysium_constructora` expuesto en Data API + GRANTs aplicados

**2026-08-04**
- Creada rama `qa` (staging) separada de `main` (producción)
- Desvinculados `.env.local` y `.next/` de git; `.expo/` agregado a `.gitignore`
- Merge de `qa` → `main` vía Pull Request, push a producción
- Variables de entorno de Supabase configuradas en Vercel (Production + Preview) — faltaban, bloqueaban el login en producción
- Verificación end-to-end contra producción real
- Limpieza de repo: borrados `app/dashboard.html`, `app/login.html`, `landing-page/` (prototipos estáticos muertos, Next.js nunca los sirvió) y el logo duplicado en la raíz
- `ESTRUCTURA.md` creado como mapa de archivos + roadmap, agregado al `.gitignore` (nota interna, no se publica)
- `/dashboard/obras/new`: formulario de alta de obra + cliente (nuevo o existente), verificado end-to-end
- `/dashboard/obras/[id]`: detalle de obra con etapas + checklist interactivo, verificado end-to-end (crear etapa → agregar tareas → marcar completada → avance se recalcula solo vía trigger de Postgres)

**2026-08-06**
- `/dashboard/obras/new`: 3 fixes — formato de miles en vivo en presupuesto/abonado (`lib/format.ts`: `formatNumberInput`/`parseNumberInput`), fecha de fin no puede ser anterior a la de inicio (`min` dinámico + validación), WhatsApp/correo del cliente validados (`lib/validation.ts`: `isValidWhatsapp`/`isValidEmail`)
- Merge de `qa` → `main` (PR #4), `/dashboard/obras/[id]` y los 3 fixes verificados end-to-end en producción real

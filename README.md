# Shop Learn

A learning project for building an online store with [Nuxt](https://nuxt.com/).

## Stack

- **Nuxt 4** — framework (frontend `app/` + Nitro backend `server/`)
- **Vue 3** — UI
- **Tailwind CSS** — styling
- **@nuxtjs/i18n** — internationalization
- **Prisma 7 + PostgreSQL** — database (auth)
- **argon2 / jose** — password hashing / JWT

Uses **pnpm**.

## Setup

Prerequisites: Node 20+, pnpm, Docker.

```bash
# 1. Install deps (builds native modules — argon2, prisma engine)
pnpm install

# 2. Start the database (postgres via docker-compose, port 5533)
pnpm db:up

# 3. Create your .env from the template
cp .env.example .env
# generate a JWT secret and paste it into JWT_ACCESS_SECRET:
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"

# 4. Apply migrations + generate the Prisma client
pnpm db:deploy && pnpm db:generate

# 5. Run
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)
(or the next free port — check the terminal).

> The `server/generated/` Prisma client and `.env` are gitignored.
> Step 1 and 4 recreate them on each machine.

## Frontend-only setup (shared backend)

Working on the UI only? Skip Docker, the database, and migrations — point
the app at a shared backend instead. The dev server proxies `/api` there,
so the browser sees everything as same-origin and auth cookies keep working.

```bash
pnpm install
cp .env.example .env
# set the shared backend URL (ask the backend dev for it):
#   API_PROXY_TARGET="https://abc-123.trycloudflare.com"
pnpm dev
```

**Backend dev — how to expose your local server** (while you're online):

```bash
pnpm dev                              # backend on http://localhost:3000
# in another terminal, with cloudflared installed:
cloudflared tunnel --url http://localhost:3000
# share the printed https URL → frontend devs put it in API_PROXY_TARGET
```

For a permanent URL, deploy the app + a managed Postgres (Railway, Render,
Fly.io) and share that URL instead.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (frontend + backend) |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm db:up` / `db:down` | Start / stop the postgres container |
| `pnpm db:migrate` | Create + apply a new migration (dev) |
| `pnpm db:deploy` | Apply existing migrations |
| `pnpm db:studio` | Open Prisma Studio (data GUI) |
| `pnpm db:reset` | Drop DB and re-run all migrations (dev) |

## Project structure

```
app/                # Pages and components (frontend)
server/             # Nitro backend
  api/auth/         # register, login, refresh, logout, me
  utils/            # prisma, jwt, password, cookies, ...
prisma/schema.prisma # Database schema
public/             # Static assets
nuxt.config.ts      # Nuxt configuration
```

## Roadmap

- [ ] Product catalog
- [ ] Product page
- [ ] Shopping cart
- [ ] Checkout

## Deployment

See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment).

# Shop Learn

A learning project for building an online store with [Nuxt](https://nuxt.com/).

## Stack

- **Nuxt 4** — framework (frontend `app/` + Nitro backend `server/`)
- **Vue 3** — UI
- **Tailwind CSS** — styling
- **@nuxtjs/i18n** — internationalization
- **Prisma 7 + PostgreSQL** — database (auth)
- **argon2 / jose** — password hashing / JWT

Uses **npm** or **pnpm**. **Docker** is recommended for a one-command local setup.

## Quick start (Docker — recommended)

Prerequisites: [Docker Desktop](https://www.docker.com/products/docker-desktop/) only.
No local `npm install` needed — dependencies are installed inside the container.

```bash
git clone <repo-url>
cd shop-learn
docker compose up -d
```

That's it. Docker starts:

- **PostgreSQL** on port `5533`
- **Nuxt dev server** on [http://localhost:3000](http://localhost:3000)

On first run the entrypoint automatically:

1. Copies `.env.example` → `.env` (if `.env` is missing)
2. Runs `npm install`
3. Applies Prisma migrations
4. Starts the dev server with hot reload

The first start can take **3–5 minutes** (image build + package install). Later starts are faster.

**Useful commands:**

```bash
docker compose up -d          # start everything (same as npm start)
docker compose logs -f app    # follow app logs
docker compose down           # stop everything
```

Or via npm scripts:

```bash
npm start       # docker compose up -d
npm run logs    # docker compose logs -f app
npm run stop    # docker compose down
```

After the first run, generate a real JWT secret in `.env` (don't use the dev default in production):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
# paste the output into JWT_ACCESS_SECRET in .env, then:
docker compose up -d --force-recreate app
```

Rebuild the image after Dockerfile changes:

```bash
docker compose up -d --build
```

## Local setup (without Docker for the app)

Prerequisites: Node 20+, Docker (for Postgres only).

```bash
# 1. Install deps (builds native modules — argon2, prisma engine)
npm install

# 2. Start the database (postgres via docker-compose, port 5533)
npm run db:up

# 3. Create your .env from the template
cp .env.example .env
# generate a JWT secret and paste it into JWT_ACCESS_SECRET:
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"

# 4. Apply migrations + generate the Prisma client
npm run db:deploy && npm run db:generate

# 5. Run
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)
(or the next free port — check the terminal).

> The `server/generated/` Prisma client and `.env` are gitignored.
> Steps 1 and 4 recreate them on each machine.

## Frontend-only setup (shared backend)

Working on the UI only? Skip Docker, the database, and migrations — point
the app at a shared backend instead. The dev server proxies `/api` there,
so the browser sees everything as same-origin and auth cookies keep working.

```bash
npm install
cp .env.example .env
# set the shared backend URL (ask the backend dev for it):
#   API_PROXY_TARGET="https://abc-123.trycloudflare.com"
npm run dev
```

**Backend dev — how to expose your local server** (while you're online):

```bash
npm run dev                              # backend on http://localhost:3000
# in another terminal, with cloudflared installed:
cloudflared tunnel --url http://localhost:3000
# share the printed https URL → frontend devs put it in API_PROXY_TARGET
```

For a permanent URL, deploy the app + a managed Postgres (Railway, Render,
Fly.io) and share that URL instead.

## Scripts

| Command | Description |
|---------|-------------|
| `docker compose up -d` / `npm start` | Start DB + Nuxt in Docker (recommended) |
| `npm run logs` | Follow app container logs |
| `npm run stop` / `docker compose down` | Stop all containers |
| `npm run dev` | Start Nuxt locally (DB must be running) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run db:up` / `db:down` | Start / stop the postgres container only |
| `npm run db:migrate` | Create + apply a new migration (dev) |
| `npm run db:deploy` | Apply existing migrations |
| `npm run db:studio` | Open Prisma Studio (data GUI) |
| `npm run db:reset` | Drop DB and re-run all migrations (dev) |

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

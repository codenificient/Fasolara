# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FasoLara is a solar energy startup platform built as a monorepo with 6 independent sub-projects (no shared workspace tooling — each has its own `node_modules` and must be operated from its own directory).

## Architecture

### Active Sub-Projects

**server/** — Primary Apollo GraphQL backend (TypeScript, ESM modules)
- Apollo Server v4 + Express + MongoDB (Mongoose) + WebSocket subscriptions
- Entry point: `api/index.ts`, compiles to `dist/`
- GraphQL schema is split per entity in `graphql/<entity>/index.ts` — each exports `{ typeDefs, resolvers }`, aggregated in `graphql/index.ts`
- 18+ domain entities: user, account, address, bank, comment, conversation, country, employee, investor, location, order, panel, project, province, salary, supplier, transaction, village
- Auth: JWT-based via `helpers/context.ts` (verifyUser middleware), role-based guards in `graphql/middleware/index.ts` (isAuthenticated, isAdmin, canModifyData)
- Roles: admin, manager, employee
- Deployed to Vercel with `vercel.json` rewrite rules; API served at `/api`

**admin/** — Admin dashboard (Next.js, App Router + Pages Router hybrid)
- Runs on port 5000 (`next dev -p 5000`)
- Uses Next.js 13+ App Router (`app/` directory) for all main pages, Pages Router only for `pages/api/auth/` (NextAuth)
- Auth: NextAuth with CredentialsProvider, authenticates against the GraphQL server's `loginUser` mutation
- `middleware.ts` protects all routes except `/auth/login`, API routes, and static assets
- UI: Chakra UI + TailwindCSS + SCSS modules
- Data fetching: Apollo Client connecting to the GraphQL server (env var `NEXT_PUBLIC_CLIENT_DEV` for dev, `NEXT_PUBLIC_CLIENT_URI` for prod)
- `lib/` directory contains shared queries, mutations, types, and validation (imported as `lib/queries`, `lib/mutations`, `lib/types`, etc.)
- Path aliases defined in `tsconfig.json`: `@h/*` (app), `@c/*` (components), `@chart/*` (charts), `@ui/*` (UI), `@s/*` (styles), `@css/*` (style components), `@data/*`, `@proj/*`, `@msg/*`, `@usr/*`, `@em/*`

**frontend/** — Public-facing website (Next.js, Pages Router)
- Runs on port 3000
- TailwindCSS + SCSS, mostly static pages with local JSON sample data
- Pages: home, provinces, users, villages, 404

**mobile/** — React Native companion app (Expo)
- Uses React Navigation (bottom tabs, drawer, native stack)
- NativeBase for UI components
- Early stage: Home and Profile screens

### Legacy/Paused Sub-Projects

**backend/** — Original Express + GraphQL backend (JavaScript, paused Jan 2023)
- Replaced by `server/` — uses express-graphql instead of Apollo

**apollo/** — Earlier iteration of the Apollo server (TypeScript)
- Prototype with only account and bank entities wired up
- Superseded by `server/` which has the full entity set

## Commands

All commands must be run from within the respective sub-project directory.

### server/
```bash
npm run dev          # Dev with nodemon (compiles TS then runs)
npm run compile      # tsc && node dist/api/index.js
npm start            # Same as compile + run
```

### admin/
```bash
npm run dev          # Next.js dev server on port 5000
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run cypress      # Open Cypress for e2e tests
```

### frontend/
```bash
npm run dev          # Next.js dev server on port 3000
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run cypress:open # Open Cypress for e2e tests
```

### mobile/
```bash
npm start            # expo start
npm run android      # expo start --android
npm run ios          # expo start --ios
npm test             # jest --watchAll
```

### backend/ (paused)
```bash
npm run dev          # nodemon index.js
```

## Environment Variables

- **server/**: Requires `.env` with `MONGO_URI`, `JWT_SECRET`, `PORT` (defaults to 4000)
- **admin/**: Requires `.env` with `NEXT_PUBLIC_CLIENT_DEV` (GraphQL endpoint for dev) and `NEXT_PUBLIC_CLIENT_URI` (for prod), plus NextAuth secrets
- **backend/**: Requires `.env.local` with MongoDB connection string

## Testing

- **admin/**: Cypress e2e tests in `cypress/e2e/`, Jest unit tests in `tests/` (configured with ts-jest + jsdom)
- **server/**: Jest config exists (`jest.config.js`), test files in `test/` (currently mostly commented out)
- **mobile/**: Jest with jest-expo preset
- **server tests**: Mocha/Chai + Supertest + EasyGraphQLTester (per README, not all wired up yet)

## Key Patterns

- Each GraphQL entity follows the same structure: `models/<entity>.ts` (Mongoose schema), `graphql/<entity>/index.ts` (typeDefs + resolvers with Query, Mutation, Subscription exports)
- Protected resolvers use `combineResolvers` from `graphql-resolvers` to chain auth middleware
- The helper file is named `helpers/grahql.ts` (note: typo in filename is intentional/historical — do not rename without updating all imports)
- Server uses ES modules (`"type": "module"` in package.json) — all local imports require `.js` extensions even for `.ts` source files
- Admin dashboard uses `"use client"` directive in layout and interactive components (React Server Components by default)

## Database

MongoDB Atlas with Mongoose ODM. Sample data generated via Mockaroo and Faker.js. Domain model covers solar energy operations in Burkina Faso (provinces, villages, panels, projects, employees, suppliers, transactions, etc.).

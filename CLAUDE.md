# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Panda Store is an e-commerce application for electronics built using:
- **Frontend**: React 19 with TypeScript and Tailwind CSS
- **Backend**: Hono API running on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 buckets
- **Authentication**: Mocha Users Service (@getmocha/users-service)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the application
npm run build

# Lint code
npm run lint

# Type check only
tsc

# Run full check (typecheck + build + dry deploy)
npm run check

# Generate Cloudflare Worker types
npm run cf-typegen

# Deploy to Cloudflare (requires proper environment setup)
wrangler deploy
```

## Architecture Overview

### Frontend Structure
- **`src/react-app/`**: React application code
  - `pages/`: Route components including admin pages
  - `components/`: Reusable UI components
  - `contexts/`: React contexts (CartContext for shopping cart state)
  - `hooks/`: Custom hooks (useApi for data fetching)
- **`src/shared/types.ts`**: Shared TypeScript types and Zod schemas

### Backend Structure
- **`src/worker/index.ts`**: Hono API server with endpoints for:
  - Public product/category APIs
  - Authentication endpoints (OAuth with Google)
  - Admin CRUD operations for products
- **`src/worker/types.ts`**: Worker environment type definitions

### Key Features
- **Shopping Cart**: Persistent cart using localStorage via CartContext
- **Admin Panel**: Protected routes for product management with authentication
- **Product Management**: Full CRUD operations with categories, pricing, inventory
- **Authentication**: Google OAuth integration via Mocha Users Service

### Database Schema
Products table includes fields: nome, descricao, preco, preco_promocional, categoria_id, marca, estoque, especificacoes, is_ativo, is_destaque, imagem_principal

### Important Patterns
- **API Routes**: All backend routes are prefixed with `/api/`
- **Admin Routes**: Frontend admin routes start with `/admin/` and require authentication
- **Type Safety**: Zod schemas in `shared/types.ts` validate API payloads
- **Error Handling**: useApi hook handles loading states and errors consistently
- **Path Aliases**: `@/` maps to `src/` directory via Vite config

### Environment Variables
- `MOCHA_USERS_SERVICE_API_URL`: Mocha authentication service URL
- `MOCHA_USERS_SERVICE_API_KEY`: API key for Mocha service

### Deployment
The application deploys to Cloudflare Workers with assets serving as SPA, D1 database binding as `DB`, and R2 bucket binding as `R2_BUCKET`.

## Database Migrations and Maintenance

### Migration Files
All database migrations are located in `/migrations/` directory with detailed execution order in `migrations/README.md`.

### Key Migration Commands
```bash
# Execute migration on remote database
npx wrangler d1 execute panda-store --remote --file=migrations/[file].sql

# Execute on local database
npx wrangler d1 execute panda-store --file=migrations/[file].sql

# Setup complete database from scratch
node scripts/setup-database.js

# Check database state
npx wrangler d1 execute panda-store --remote --command="SELECT COUNT(*) FROM produtos;"
```

### Image Testing
Use `test-images.js` to verify all product images are loading correctly:
```bash
node test-images.js
```

### Troubleshooting
- **Image loading issues**: Check `DOCUMENTACAO-CORRECOES.md` for common fixes
- **Migration failures**: Ensure proper execution order from `migrations/README.md`
- **Database connection**: Verify wrangler authentication with `npx wrangler whoami`

### Current Database State
- **35 products** across 8 categories
- **All images** using reliable Unsplash URLs
- **No CDN dependencies** (self-contained image URLs)
# AGenNext ProjectTrack

Agentic Project Management for Enterprise.

## Stack
Next.js + TypeScript + Tailwind + Prisma/PostgreSQL.

## Implemented MVP Scaffold
- Multi-tenant schema and RBAC-friendly models
- Dashboard, projects, tasks, boards, reports, agent inbox, clients, integrations, settings, admin pages
- Tenant-scoped API route scaffolds
- Risk detection utility for ProjectTrack Agent
- Seed data with 2 tenants, 5 users, 3 projects, 20 tasks, suggestions and reports

## Run
1. `npm install`
2. Set `DATABASE_URL`
3. `npx prisma migrate dev`
4. `npm run prisma:seed`
5. `npm run dev`

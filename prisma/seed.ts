/* eslint-disable no-console */
import { PrismaClient, Priority, ProjectStatus, TaskStatus, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const [starter, business, enterprise] = await Promise.all([
    prisma.subscriptionPlan.upsert({ where: { name: "Starter" }, update: {}, create: { name: "Starter", maxUsers: 10, maxProjects: 5, clientPortal: false, aiFeatures: false, reportGeneration: true, integrations: false, customDomain: false, prioritySupport: false } }),
    prisma.subscriptionPlan.upsert({ where: { name: "Business" }, update: {}, create: { name: "Business", maxUsers: 100, maxProjects: 50, clientPortal: true, aiFeatures: true, reportGeneration: true, integrations: true, customDomain: false, prioritySupport: false } }),
    prisma.subscriptionPlan.upsert({ where: { name: "Enterprise" }, update: {}, create: { name: "Enterprise", maxUsers: 1000, maxProjects: 500, clientPortal: true, aiFeatures: true, reportGeneration: true, integrations: true, customDomain: true, prioritySupport: true } })
  ]);
  void starter; void business; void enterprise;
  const acme = await prisma.tenant.create({ data: { name: "Acme Corp", slug: "acme", domain: "acme.projecttrack.app" } });
  const globex = await prisma.tenant.create({ data: { name: "Globex Inc", slug: "globex", domain: "globex.projecttrack.app" } });
  const users = await prisma.$transaction([
    prisma.user.create({ data: { tenantId: acme.id, email: "sadmin@agennext.io", name: "Sam Admin", role: UserRole.SUPER_ADMIN } }),
    prisma.user.create({ data: { tenantId: acme.id, email: "org@acme.io", name: "Olivia Org", role: UserRole.ORG_ADMIN } }),
    prisma.user.create({ data: { tenantId: acme.id, email: "pm@acme.io", name: "Peter PM", role: UserRole.PROJECT_MANAGER } }),
    prisma.user.create({ data: { tenantId: acme.id, email: "dev@acme.io", name: "Tina Team", role: UserRole.TEAM_MEMBER } }),
    prisma.user.create({ data: { tenantId: globex.id, email: "client@globex.com", name: "Chris Client", role: UserRole.CLIENT } })
  ]);
  const project = await prisma.project.create({ data: { tenantId: acme.id, name: "ERP Modernization", description: "Cloud ERP rollout", clientName: "Acme Internal", ownerId: users[2].id, startDate: new Date("2026-04-01"), dueDate: new Date("2026-09-30"), status: ProjectStatus.AT_RISK, priority: Priority.CRITICAL } });
  await prisma.project.create({ data: { tenantId: acme.id, name: "Client Portal Revamp", description: "Improve CX", clientName: "Northwind", ownerId: users[1].id, startDate: new Date("2026-03-01"), dueDate: new Date("2026-06-15"), status: ProjectStatus.ACTIVE, priority: Priority.HIGH } });
  await prisma.project.create({ data: { tenantId: globex.id, name: "AI PM Rollout", description: "Adopt agentic PM", clientName: "Globex", ownerId: users[4].id, startDate: new Date("2026-02-01"), dueDate: new Date("2026-08-20"), status: ProjectStatus.ACTIVE, priority: Priority.MEDIUM } });
  for (let i = 1; i <= 20; i++) await prisma.task.create({ data: { tenantId: acme.id, projectId: project.id, title: `Task ${i}`, description: `Task details ${i}`, reporterId: users[2].id, assigneeId: i % 4 === 0 ? null : users[3].id, status: i % 5 === 0 ? TaskStatus.BLOCKED : i % 3 === 0 ? TaskStatus.IN_PROGRESS : TaskStatus.TODO, priority: i % 4 === 0 ? Priority.CRITICAL : Priority.MEDIUM, dueDate: new Date(Date.now() - (i % 6) * 86400000), estimatedHours: 4 } });
  await prisma.agentSuggestion.createMany({ data: [{ tenantId: acme.id, projectId: project.id, type: "RISK_ALERT", title: "Critical unassigned tasks", content: "3 critical tasks are unassigned." }, { tenantId: acme.id, projectId: project.id, type: "FOLLOW_UP", title: "Status follow-up draft", content: "Please update implementation progress." }, { tenantId: acme.id, projectId: project.id, type: "WEEKLY_REPORT", title: "Weekly summary draft", content: "Project health declined by 8%." }] });
  await prisma.report.createMany({ data: [{ tenantId: acme.id, projectId: project.id, type: "WEEKLY", title: "Week 17 Status", summary: "Risks increased", content: {} }, { tenantId: acme.id, projectId: project.id, type: "CLIENT", title: "Client View", summary: "Milestones on track", content: {} }] });
}
main().finally(async () => prisma.$disconnect());

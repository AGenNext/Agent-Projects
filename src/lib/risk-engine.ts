export type RiskSignal = { type: "OVERDUE"|"STALE"|"UNASSIGNED_CRITICAL"|"PROJECT_AT_RISK"; message: string; severity: "LOW"|"MEDIUM"|"HIGH" };
export function detectRisks(input: { overdue: number; stale: number; unassignedCritical: number; blocked: number }): RiskSignal[] {
  const out: RiskSignal[] = [];
  if (input.overdue > 0) out.push({ type: "OVERDUE", severity: "HIGH", message: `${input.overdue} overdue tasks detected`});
  if (input.stale > 3) out.push({ type: "STALE", severity: "MEDIUM", message: `${input.stale} stale tasks need update`});
  if (input.unassignedCritical > 0) out.push({ type: "UNASSIGNED_CRITICAL", severity: "HIGH", message: `${input.unassignedCritical} critical tasks are unassigned`});
  if (input.blocked > 2) out.push({ type: "PROJECT_AT_RISK", severity: "HIGH", message: "Blocked tasks exceed threshold"});
  return out;
}

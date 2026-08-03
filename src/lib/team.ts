import type { TeamMember } from "@/types";

export function orderOf(m: TeamMember): number {
  const n = typeof m.order === "number" ? m.order : Number(m.order);
  return Number.isFinite(n) ? n : Infinity;
}

export function sortMembers(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => orderOf(a) - orderOf(b));
}

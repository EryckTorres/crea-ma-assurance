import { cn } from "@/lib/utils";
import type { ProcessStatus, AlertSeverity } from "@/data/mockData";

const statusConfig: Record<ProcessStatus, { label: string; classes: string }> = {
  adherent: { label: "Aderente", classes: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendente", classes: "bg-warning/10 text-warning border-warning/20" },
  suspicious: { label: "Suspeito", classes: "bg-destructive/10 text-destructive border-destructive/20" },
};

const severityConfig: Record<AlertSeverity, { label: string; classes: string }> = {
  low: { label: "Baixo", classes: "bg-primary/10 text-primary border-primary/20" },
  medium: { label: "Médio", classes: "bg-warning/10 text-warning border-warning/20" },
  high: { label: "Alto", classes: "bg-destructive/10 text-destructive border-destructive/20" },
};

export const StatusBadge: React.FC<{ status: ProcessStatus }> = ({ status }) => {
  const cfg = statusConfig[status];
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", cfg.classes)}>{cfg.label}</span>;
};

export const SeverityBadge: React.FC<{ severity: AlertSeverity }> = ({ severity }) => {
  const cfg = severityConfig[severity];
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", cfg.classes)}>{cfg.label}</span>;
};

import { useMemo } from "react";
import { useLeads } from "@/hooks/useLeads";
import { Card } from "@/components/ui/card";
import { Inbox, Sparkles, PhoneCall, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { leads } = useLeads();

  const stats = useMemo(
    () => ({
      total: leads.length,
      newL: leads.filter((l) => l.status === "New").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      converted: leads.filter((l) => l.status === "Converted").length,
    }),
    [leads],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Panel</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your lead pipeline.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Inbox className="h-5 w-5" />} label="Total Leads" value={stats.total} tone="primary" />
        <StatCard icon={<Sparkles className="h-5 w-5" />} label="New Leads" value={stats.newL} tone="accent" />
        <StatCard icon={<PhoneCall className="h-5 w-5" />} label="Contacted" value={stats.contacted} tone="warning" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Converted" value={stats.converted} tone="success" />
      </div>
    </div>
  );
};

const toneMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
} as const;

const StatCard = ({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) => (
  <Card className="p-5 shadow-[var(--shadow-card)] border-border/60 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${toneMap[tone]}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  </Card>
);

export default Dashboard;

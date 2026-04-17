import { useMemo } from "react";
import { useLeads } from "@/hooks/useLeads";
import { LeadForm } from "@/components/LeadForm";
import { LeadCard } from "@/components/LeadCard";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Users, TrendingUp, Inbox } from "lucide-react";

const Index = () => {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  const stats = useMemo(() => ({
    total: leads.length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  }), [leads]);

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-tight">Client Lead Management System</h1>
              <p className="text-xs text-muted-foreground">Mini CRM</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Logged in as Admin
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Admin panel banner */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Panel</h2>
            <div className="sm:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Logged in as Admin
            </div>
          </div>
          <p className="text-muted-foreground">Manage leads, update statuses, and track conversions.</p>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={<Inbox className="h-5 w-5" />} label="Total Leads" value={stats.total} tone="primary" />
          <StatCard icon={<Users className="h-5 w-5" />} label="Contacted" value={stats.contacted} tone="warning" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Converted" value={stats.converted} tone="success" />
        </section>

        {/* Form */}
        <LeadForm onAdd={addLead} />

        {/* Leads */}
        <section>
          <h3 className="text-xl font-semibold mb-4">All Leads</h3>
          {leads.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No leads yet. Add your first lead above.</p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onUpdate={updateLead} onDelete={deleteLead} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const toneMap = {
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
} as const;

const StatCard = ({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: keyof typeof toneMap }) => (
  <Card className="p-5 shadow-[var(--shadow-card)] border-border/60 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${toneMap[tone]}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  </Card>
);

export default Index;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Tag, Pencil, Check, Trash2, X } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/lead";
import { toast } from "sonner";

interface Props {
  lead: Lead;
  onUpdate: (id: string, patch: Partial<Lead>) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-primary/10 text-primary border-primary/20",
  Contacted: "bg-warning/10 text-warning border-warning/30",
  Converted: "bg-success/10 text-success border-success/30",
};

export const LeadCard = ({ lead, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(lead.notes);

  const saveNotes = () => {
    onUpdate(lead.id, { notes: draft.trim() });
    setEditing(false);
    toast.success("Notes updated");
  };

  return (
    <Card className="p-5 shadow-[var(--shadow-card)] border-border/60 hover:shadow-[var(--shadow-elegant)] transition-[var(--transition-smooth)] hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg truncate">{lead.name}</h3>
          <a href={`mailto:${lead.email}`} className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 mt-0.5 truncate">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </a>
        </div>
        <Badge variant="outline" className={statusStyles[lead.status]}>
          {lead.status}
        </Badge>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Tag className="h-3 w-3" />
        <span>From {lead.source}</span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</span>
          {!editing && (
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => { setDraft(lead.notes); setEditing(true); }}>
              <Pencil className="h-3 w-3 mr-1" /> Edit
            </Button>
          )}
        </div>
        {editing ? (
          <div className="space-y-2">
            <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
            <div className="flex gap-2">
              <Button size="sm" onClick={saveNotes}><Check className="h-3 w-3 mr-1" />Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}><X className="h-3 w-3 mr-1" />Cancel</Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground/80 min-h-[1.25rem] whitespace-pre-wrap">
            {lead.notes || <span className="italic text-muted-foreground">No notes yet.</span>}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border/60">
        <Select value={lead.status} onValueChange={(v) => { onUpdate(lead.id, { status: v as LeadStatus }); toast.success("Status updated"); }}>
          <SelectTrigger className="h-9 flex-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => { onDelete(lead.id); toast.success("Lead deleted"); }}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

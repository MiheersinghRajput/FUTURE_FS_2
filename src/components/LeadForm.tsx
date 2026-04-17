import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import type { Lead, LeadSource, LeadStatus } from "@/types/lead";
import { toast } from "sonner";

interface Props {
  onAdd: (lead: Omit<Lead, "id" | "createdAt">) => void;
}

export const LeadForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState<LeadSource>("Website");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    onAdd({ name: name.trim(), email: email.trim(), source, status, notes: notes.trim() });
    toast.success("Lead added successfully");
    setName("");
    setEmail("");
    setSource("Website");
    setStatus("New");
    setNotes("");
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] border-border/60">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <UserPlus className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold">Add New Lead</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
        </div>
        <div className="space-y-2">
          <Label>Source</Label>
          <Select value={source} onValueChange={(v) => setSource(v as LeadSource)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional details about the lead..." rows={3} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto bg-[image:var(--gradient-primary)] hover:opacity-90 transition-[var(--transition-smooth)] shadow-[var(--shadow-elegant)]">
            Add Lead
          </Button>
        </div>
      </form>
    </Card>
  );
};

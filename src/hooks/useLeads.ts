import { useEffect, useState } from "react";
import type { Lead } from "@/types/lead";

const STORAGE_KEY = "mini-crm-leads";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Lead[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead: Omit<Lead, "id" | "createdAt">) => {
    setLeads((prev) => [
      { ...lead, id: crypto.randomUUID(), createdAt: Date.now() },
      ...prev,
    ]);
  };

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return { leads, addLead, updateLead, deleteLead };
}

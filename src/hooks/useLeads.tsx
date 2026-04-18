import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lead } from "@/types/lead";

const STORAGE_KEY = "mini-crm-leads";

interface LeadsContextValue {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

const loadLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
};

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(loadLeads);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // ignore quota errors
    }
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

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
};

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used within LeadsProvider");
  return ctx;
}

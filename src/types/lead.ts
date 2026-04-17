export type LeadStatus = "New" | "Contacted" | "Converted";
export type LeadSource = "Website" | "Instagram" | "Referral" | "LinkedIn" | "Other";

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  notes: string;
  createdAt: number;
}

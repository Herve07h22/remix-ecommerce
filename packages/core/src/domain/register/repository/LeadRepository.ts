import { Lead } from "../models/Lead";

export interface LeadRepository {
  getByEmail(email: string): Promise<Lead | undefined>;
  getByToken(token: string): Promise<Lead | undefined>;
  upsertLead(lead: Lead): Promise<void>;
}

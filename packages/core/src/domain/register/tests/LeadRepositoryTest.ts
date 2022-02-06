import { Lead } from "../models/Lead";
import { LeadRepository } from "../repository/LeadRepository";

export class LeadRepositoryTest implements LeadRepository {
  _leads: Map<string, Lead> = new Map<string, Lead>();

  async getByEmail(email: string) {
    return this._leads.get(email);
  }

  async getByToken(token: string): Promise<Lead | undefined> {
    return Array.from(this._leads.values()).find(
      (lead) => lead.token === token
    );
  }

  async upsertLead(lead: Lead) {
    this._leads.set(lead.email, lead);
  }

  setCreatedDatetoYesterday(email: string, ask: number) {
    const lead = this._leads.get(email);
    if (lead) {
      lead.validTokenUntil = new Date(new Date().valueOf() - ask * 24 * 60 * 60 * 1000);
    }
  }

  setLastGenerationBackTo(lead: Lead, back: number) {
    lead.lastGeneration = new Date(new Date().valueOf() - back);
  }
}

import { Lead } from "../../domain/register/models/Lead";
import { LeadRepository } from "../../domain/register/repository/LeadRepository";
import { db } from "./db.server";

export class LeadRepositoryPrisma implements LeadRepository {
  async getByEmail(email: string) {
    const lead = await db.lead.findUnique({ where: { email } });
    return lead || undefined;
  }
  async getByToken(token: string): Promise<Lead | undefined> {
    const lead = await db.lead.findUnique({ where: { token } });
    return lead || undefined;
  }
  async upsertLead(lead: Lead): Promise<void> {
    await db.lead.upsert({
      where: {
        email: lead.email,
      },
      update: lead,
      create: lead,
    });
  }
}

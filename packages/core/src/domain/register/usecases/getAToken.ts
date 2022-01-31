import { MailService } from "../../gateways/mail/MailService";
import { isValidToken, Lead, makeNewLead, newAsk } from "../models/Lead";
import { LeadRepository } from "../repository/LeadRepository";
import { addLeadAndsendToken } from "../services/addLeadAndsendToken";

const TOKEN_DURATION = 1000 * 60 * 60 * 24; // 1 day

export async function getAToken(
  params: { email: string },
  dependencies: {
    mailService: MailService;
    leadRepository: LeadRepository;
  }
): Promise<{ status: string; token?: string | null; message?: string }> {
  const lead = await dependencies.leadRepository.getByEmail(params.email);
  if (lead) {
    if (isValidToken(lead)) {
      return addLeadAndsendToken(
        lead,
        dependencies.mailService,
        dependencies.leadRepository
      );
    }
    // Expired token : deliver a brand new one
    return addLeadAndsendToken(
      newAsk(lead, TOKEN_DURATION),
      dependencies.mailService,
      dependencies.leadRepository
    );
  } else {
    const newLead = makeNewLead(params.email, TOKEN_DURATION);
    return addLeadAndsendToken(
      newLead,
      dependencies.mailService,
      dependencies.leadRepository
    );
  }
}

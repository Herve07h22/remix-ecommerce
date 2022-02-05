import { MailService } from "../../gateways/mail/MailService";
import {
  isRegisteredLead,
  hasValidToken,
  Lead,
  makeNewLead,
  registeredLeadWithNewToken,
} from "../models/Lead";
import { LeadRepository } from "../repository/LeadRepository";
import { upsertLeadAndsendTokenService } from "../services/upsertLeadAndsendTokenService";

const TOKEN_DURATION = 1000 * 60 * 60 * 24; // 1 day

export async function getAToken(
  params: { email: string },
  dependencies: {
    mailService: MailService;
    leadRepository: LeadRepository;
  }
): Promise<{ status: string; token?: string | null; message?: string }> {
  // Rename the curried function
  const upsertAndSendToken = (lead: Lead) =>
    upsertLeadAndsendTokenService(
      lead,
      dependencies.mailService,
      dependencies.leadRepository
    );

  const maybeRegisteredLead = await dependencies.leadRepository.getByEmail(
    params.email
  );

  if (isRegisteredLead(maybeRegisteredLead)) {
    const registeredLead = maybeRegisteredLead; // Rename the lead since its type has changed
    return upsertAndSendToken(
      hasValidToken(registeredLead)
        ? registeredLead
        : registeredLeadWithNewToken(registeredLead, TOKEN_DURATION)
    );
  }

  return upsertAndSendToken(makeNewLead(params.email, TOKEN_DURATION));
}

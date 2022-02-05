import { v4 as uuidv4 } from "uuid";

export type Lead = {
  email: string;
  createdAt: number;
  validTokenUntil: number;
  token: string;
  asksForToken: number; // No limit, just to monitor haw frequently a lead asks for a token
  lastGeneration?: number;
  generationCount: number;
};

export function makeNewLead(email: string, tokenDuration: number): Lead {
  return {
    email,
    createdAt: new Date().valueOf(),
    validTokenUntil: new Date().valueOf() + tokenDuration,
    token: uuidv4(),
    asksForToken: 1,
    generationCount: 0,
  };
}

export function registeredLeadWithNewToken(
  lead: Lead,
  tokenDuration: number
): Lead {
  return {
    ...lead,
    generationCount: 0,
    asksForToken: lead.asksForToken + 1,
    validTokenUntil: new Date().valueOf() + tokenDuration,
    token: uuidv4(),
  };
}

export function hasValidToken(lead: Lead): boolean {
  return lead.validTokenUntil > new Date().valueOf();
}

export function tooFrequentGeneration(lead: Lead, intervallInMs: number) {
  return (
    lead.lastGeneration &&
    lead.lastGeneration + intervallInMs > new Date().valueOf()
  );
}

export function tooManyGeneration(lead: Lead, nbMax: number) {
  return lead.generationCount && lead.generationCount >= nbMax;
}

export function isRegisteredLead(lead: Lead | undefined): lead is Lead {
  return !!lead;
}

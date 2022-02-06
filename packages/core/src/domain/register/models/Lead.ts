import { v4 as uuidv4 } from "uuid";

export type Lead = {
  email: string;
  createdAt: Date;
  validTokenUntil: Date;
  token: string;
  asksForToken: number; // No limit, just to monitor haw frequently a lead asks for a token
  lastGeneration: Date | null;
  generationCount: number;
};

export function makeNewLead(email: string, tokenDuration: number): Lead {
  return {
    email,
    createdAt: new Date(),
    validTokenUntil: new Date(new Date().valueOf() + tokenDuration),
    token: uuidv4(),
    asksForToken: 1,
    generationCount: 0,
    lastGeneration:null,
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
    validTokenUntil: new Date(new Date().valueOf() + tokenDuration),
    token: uuidv4(),
  };
}

export function hasValidToken(lead: Lead): boolean {
  return lead.validTokenUntil.valueOf() > new Date().valueOf();
}

export function tooFrequentGeneration(lead: Lead, intervallInMs: number) {
  return (
    lead.lastGeneration &&
    lead.lastGeneration.valueOf() + intervallInMs > new Date().valueOf() ? true : false
  );
}

export function tooManyGeneration(lead: Lead, nbMax: number) {
  return lead.generationCount >= nbMax ;
}

export function isRegisteredLead(lead: Lead | undefined): lead is Lead {
  return !!lead;
}

export function addNewGeneration(lead:Lead) {
  return {
    ...lead,
    lastGeneration: new Date(),
    generationCount: lead.generationCount + 1,
  }
}
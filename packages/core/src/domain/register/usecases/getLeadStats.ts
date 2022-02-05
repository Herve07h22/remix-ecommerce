import {
  MAX_DAILY_NB_GENERATION,
  MIN_DELAY_BETWWEEN_EACH_GENERATION,
} from "../../textgen/usecases/textGen";
import {
  tooFrequentGeneration,
  tooManyGeneration,
  hasValidToken,
} from "../models/Lead";
import { LeadRepository } from "../repository/LeadRepository";

export type GetLeadStatsResult =
  | {
      status: "error";
      message?: string;
    }
  | {
      status: "success";
      validTokenUntil: number;
      generationCount: number;
      tooFrequentGeneration: boolean;
      tooManyGeneration: boolean;
      hasValidToken: boolean;
    };

export async function getLeadStats(
  params: { token: string },
  dependencies: {
    leadRepository: LeadRepository;
  }
): Promise<GetLeadStatsResult> {
  const lead = await dependencies.leadRepository.getByToken(params.token);
  if (lead) {
    return {
      status: "success",
      validTokenUntil: lead.validTokenUntil,
      generationCount: lead.generationCount,
      tooFrequentGeneration: tooFrequentGeneration(
        lead,
        MIN_DELAY_BETWWEEN_EACH_GENERATION
      ),
      tooManyGeneration: tooManyGeneration(
        lead,
        MAX_DAILY_NB_GENERATION
      ),
      hasValidToken: hasValidToken(lead),
    };
  }
  return { status: "error", message: "token not found" };
}

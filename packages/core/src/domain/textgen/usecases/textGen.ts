import { IAService } from "../../gateways/ia/IAService";
import {
  hasValidToken,
  tooFrequentGeneration,
  tooManyGeneration,
} from "../../register/models/Lead";
import { LeadRepository } from "../../register/repository/LeadRepository";
import { getPostSentence, isValidContext } from "../models/postSentence";

export const MIN_DELAY_BETWEEN_EACH_GENERATION =
  parseInt(process.env.MIN_DELAY_BETWEEN_EACH_GENERATION || "0") || 1000 * 10; // 10 seconds
export const MAX_DAILY_NB_GENERATION =
  parseInt(process.env.MAX_DAILY_NB_GENERATION || "0") || 10;

export async function textGen(
  params: { token: string; input: string; context: string },
  dependencies: {
    iaService: IAService;
    leadRepository: LeadRepository;
  }
): Promise<{ status: string; message?: string; results?: string[] }> {
  const lead = await dependencies.leadRepository.getByToken(params.token);
  if (lead && hasValidToken(lead) && isValidContext(params.context)) {
    if (tooFrequentGeneration(lead, MIN_DELAY_BETWEEN_EACH_GENERATION)) {
      return {
        status: "error",
        message: "MIN_DELAY_BETWEEN_EACH_GENERATION",
      };
    }
    if (tooManyGeneration(lead, MAX_DAILY_NB_GENERATION)) {
      return {
        status: "error",
        message: "MAX_DAILY_NB_GENERATION",
      };
    }
    const generatedText = await dependencies.iaService.generate(
      params.input + ". " + getPostSentence(params.context)
    );
    await dependencies.leadRepository.saveNewGeneration(lead);
    if (generatedText.length > 0) {
      return { status: "success", results: generatedText };
    } else {
      return { status: "error", message: "IA_MODEL_ERROR" };
    }
  }

  return { status: "error", message: "TOKEN_NOT_FOUND" };
}

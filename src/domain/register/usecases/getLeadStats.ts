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
      validTokenUntil: lead.validTokenUntil.valueOf(),
      generationCount: lead.generationCount,
    };
  }
  return { status: "error", message: "token not found" };
}

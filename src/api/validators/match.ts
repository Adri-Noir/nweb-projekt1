import * as z from "zod";

export const updateRoundScorePostRequestSchema = z.object({
  competitionId: z.string(),
  matchId: z.string(),
  outcome: z.string(),
});

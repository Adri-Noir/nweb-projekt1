import * as z from "zod";

export const updateRoundScorePostRequestSchema = z.object({
  competitionId: z.string().uuid(),
  matchId: z.string().uuid(),
  roundId: z.string().uuid(),
  outcome: z.string().refine((outcome) => {
    const [competitor1, competitor2] = outcome.split("-");
    return (
      (competitor1 === "1" || competitor1 === "0") &&
      (competitor2 === "1" || competitor2 === "0")
    );
  }),
});

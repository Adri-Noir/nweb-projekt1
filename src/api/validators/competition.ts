import { z } from "zod";

export const newCompetitionPostRequestSchema = z.object({
  name: z.string(),
  competitors: z.string().array().min(4).max(8),
  win: z.number(),
  loss: z.number(),
  draw: z.number(),
});

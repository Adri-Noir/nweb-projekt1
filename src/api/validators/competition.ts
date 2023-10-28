import { z } from "zod";
import datasource from "@/database/datasource";

export const newCompetitionPostRequestSchema = z.object({
  name: z.string().refine(
    (name) => {
      const competition = datasource.competition.findUnique({
        where: {
          name: name,
        },
      });

      return competition !== null;
    },
    { message: "Competition name must be unique" },
  ),
  competitors: z
    .string()
    .array()
    .min(4, { message: "At least 4 competitors are required" })
    .max(8, { message: "At most 8 competitors are allowed" })
    .refine(
      (competitors) => {
        return competitors.length === new Set(competitors).size;
      },
      { message: "Competitors must be unique" },
    ),
  win: z.number(),
  loss: z.number(),
  draw: z.number(),
});

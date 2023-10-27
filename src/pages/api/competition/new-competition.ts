import { NextApiRequest, NextApiResponse } from "next";
import { NewCompetitionPostResponse } from "@/api/@types/competition";
import JWTValidator from "@/api/validators/JWTValidator";
import invalidJWTResponse from "@/api/standard_response/invalidJWTResponse";
import datasource from "@/database/datasource";
import { newCompetitionPostRequestSchema } from "@/api/validators/competition";
import round_robin_pairs from "@/api/algorithms/round_robin";
import DataValidationFailedResponse from "@/api/standard_response/DataValidationFailedResponse";
import MethodNotAllowedResponse from "@/api/standard_response/MethodNotAllowedResponse";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewCompetitionPostResponse>,
) {
  if (req.method === "POST") {
    const JWTValidation = await JWTValidator(req, res);
    if (!JWTValidation) return invalidJWTResponse(res);

    const validate = newCompetitionPostRequestSchema.safeParse(req.body);
    if (!validate.success)
      return DataValidationFailedResponse(res, validate.error);

    const session = await getSession(req, res);
    const user_id = session?.user.sub;

    const data = validate.data;

    const round_robin_rounds = round_robin_pairs(data.competitors);

    await datasource.competition.create({
      data: {
        name: data.name,
        user_id: user_id,
        win: data.win,
        loss: data.loss,
        draw: data.draw,
        rounds: {
          create: round_robin_rounds.map((round) => ({
            matches: {
              create: round.map((match) => ({
                competitor1: match[0],
                competitor2: match[1],
                outcome: "0-0",
              })),
            },
          })),
        },
      },
    });

    return res.status(200).json({});
  }

  return MethodNotAllowedResponse(res);
}

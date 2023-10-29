import { NextApiRequest, NextApiResponse } from "next";
import MethodNotAllowedResponse from "@/api/standard_response/MethodNotAllowedResponse";
import JWTValidator from "@/api/validators/JWTValidator";
import InvalidJWTResponse from "@/api/standard_response/InvalidJWTResponse";
import DataValidationFailedResponse from "@/api/standard_response/DataValidationFailedResponse";
import { updateRoundScorePostRequestSchema } from "@/api/validators/match";
import { getSession } from "@auth0/nextjs-auth0";
import datasource from "@/database/datasource";
import NotFoundResponse from "@/api/standard_response/NotFoundResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const JWTValidation = await JWTValidator(req, res);
    if (!JWTValidation) return InvalidJWTResponse(res);

    const validate = updateRoundScorePostRequestSchema.safeParse(req.body);
    if (!validate.success)
      return DataValidationFailedResponse(res, validate.error);

    const data = validate.data;
    const session = await getSession(req, res);
    const userId = session?.user.sub;

    const competition = await datasource.competition.findUnique({
      where: {
        id: data.competitionId,
        user_id: userId,
      },
      include: {
        rounds: {
          include: {
            matches: {
              where: {
                id: data.matchId,
              },
            },
          },
          where: {
            id: data.roundId,
          },
        },
      },
    });

    if (!competition) return NotFoundResponse(res, "Competition not found");

    if (competition.rounds.length === 0)
      return NotFoundResponse(res, "Round not found");

    const round = competition.rounds[0];
    if (round.matches.length === 0)
      return NotFoundResponse(res, "Match not found");

    const match = round.matches[0];
    match.outcome = data.outcome;
    await datasource.match.update({
      where: {
        id: data.matchId,
      },
      data: {
        outcome: data.outcome,
      },
    });

    datasource.$disconnect();
    return res.status(200).json({});
  }

  return MethodNotAllowedResponse(res);
}

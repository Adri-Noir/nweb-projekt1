import { NextApiRequest, NextApiResponse } from "next";
import datasource from "@/database/datasource";
import MethodNotAllowedResponse from "@/api/standard_response/MethodNotAllowedResponse";
import { GetCompetition } from "@/api/validators/competition";
import DataValidationFailedResponse from "@/api/standard_response/DataValidationFailedResponse";
import { GetCompetitionResponse } from "@/api/@types/competition";
import NotFoundResponse from "@/api/standard_response/NotFoundResponse";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCompetitionResponse>,
) {
  if (req.method === "POST") {
    const validate = GetCompetition.safeParse(req.body);
    if (!validate.success)
      return DataValidationFailedResponse(res, validate.error);

    const { id } = validate.data;

    return datasource.competition
      .findUnique({
        where: {
          id: id,
        },
        include: {
          rounds: {
            include: {
              matches: {
                orderBy: {
                  id: "asc",
                },
              },
            },
          },
        },
      })
      .then((competition) => {
        datasource.$disconnect();
        if (!competition) return NotFoundResponse(res, "Competition not found");
        return res.status(200).json(competition);
      });
  }

  return MethodNotAllowedResponse(res);
}

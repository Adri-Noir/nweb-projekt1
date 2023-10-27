import { NextApiRequest, NextApiResponse } from "next";
import MethodNotAllowedResponse from "@/api/standard_response/MethodNotAllowedResponse";
import datasource from "@/database/datasource";
import { GetCompetitionsResponse } from "@/api/@types/competition";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCompetitionsResponse>,
) {
  if (req.method === "GET") {
    return datasource.competition
      .findMany({
        include: {
          rounds: {
            include: {
              matches: true,
            },
          },
        },
      })
      .then((competitions) => {
        return res.status(200).json(competitions);
      });
  }

  return MethodNotAllowedResponse(res);
}

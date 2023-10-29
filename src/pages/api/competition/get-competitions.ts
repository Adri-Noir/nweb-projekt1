import { NextApiRequest, NextApiResponse } from "next";
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
              matches: {
                orderBy: {
                  id: "asc",
                },
              },
            },
          },
        },
      })
      .then((competitions) => {
        datasource.$disconnect();
        return res.status(200).json(competitions);
      });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import MethodNotAllowedResponse from "@/api/standard_response/MethodNotAllowedResponse";
import datasource from "@/database/datasource";
import { GetRoundsResponse } from "@/api/@types/round";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetRoundsResponse>,
) {
  if (req.method === "GET") {
    return datasource.round
      .findMany({
        include: {
          matches: true,
        },
      })
      .then((rounds) => {
        datasource.$disconnect();
        return res.status(200).json(rounds);
      });
  }

  return MethodNotAllowedResponse(res);
}

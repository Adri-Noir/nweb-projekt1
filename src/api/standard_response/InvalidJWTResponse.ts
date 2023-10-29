import { NextApiResponse } from "next";

export default function InvalidJWTResponse(res: NextApiResponse) {
  return res.status(401).json({ error: "Unauthorized" });
}

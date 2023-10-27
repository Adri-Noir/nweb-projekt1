import { NextApiResponse } from "next";

export default function invalidJWTResponse(res: NextApiResponse) {
  return res.status(401).json({ error: "Unauthorized" });
}

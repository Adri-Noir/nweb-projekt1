import { NextApiResponse } from "next";

export default function MethodNotAllowedResponse(res: NextApiResponse) {
  return res.status(405).json({ error: "Method not allowed" });
}

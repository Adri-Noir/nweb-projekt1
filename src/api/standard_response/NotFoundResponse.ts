import { NextApiResponse } from "next";

export default function NotFoundResponse(
  res: NextApiResponse,
  message?: string,
) {
  return res.status(404).json({ error: message ?? "Not found" });
}

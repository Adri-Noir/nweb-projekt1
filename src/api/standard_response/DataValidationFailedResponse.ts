import { NextApiResponse } from "next";

export default function DataValidationFailedResponse(
  res: NextApiResponse,
  message: unknown,
) {
  return res.status(400).json({ error: message });
}

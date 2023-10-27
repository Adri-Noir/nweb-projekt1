import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export default async function JWTValidator(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession(req, res);

  return !!session?.user;
}

import { Match, Round } from ".prisma/client";

export type GetRoundsResponse = Round[] &
  {
    matches: Match[];
  }[];

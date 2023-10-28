import { Prisma } from ".prisma/client";
import Decimal = Prisma.Decimal;

export interface NewCompetitionPostRequest {
  name: string;
  competitors: string[];
  win: number;
  loss: number;
  draw: number;
}

export interface NewCompetitionPostResponse {}

export type CompetitionMatchRound = {
  rounds: ({
    matches: {
      id: string;
      competitor1: string;
      competitor2: string;
      outcome: string;
      roundId: string;
    }[];
  } & { id: string; competitionId: string })[];
} & {
  id: string;
  name: string;
  win: Decimal;
  loss: Decimal;
  draw: Decimal;
  user_id: string;
};

export type GetCompetitionsResponse =
  | CompetitionMatchRound[]
  | { error: unknown };

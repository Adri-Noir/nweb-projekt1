import { Competition } from ".prisma/client";

export interface NewCompetitionPostRequest {
  name: string;
  competitors: string;
  win: number;
  loss: number;
  draw: number;
}

export interface NewCompetitionPostResponse {}

export type GetCompetitionsResponse = Competition[] | { error: unknown };

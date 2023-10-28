import { CompetitionMatchRound } from "@/api/@types/competition";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

interface ICompetitionViewProps {
  data: CompetitionMatchRound;
}

const outcomeCalculator = (score: string) => {
  switch (score) {
    case "0-1":
      return 1;
    case "1-0":
      return -1;
    case "1-1":
      return 0;
    default:
      return -2;
  }
};

const columns: GridColDef[] = [
  { field: "name", type: "string", headerName: "Player", width: 150 },
  { field: "score", type: "number", headerName: "Score", width: 100 },
  {
    field: "numberOfWins",
    type: "number",
    headerName: "Wins",
    width: 100,
  },
  {
    field: "numberOfLosses",
    type: "number",
    headerName: "Losses",
    width: 100,
  },
  {
    field: "numberOfDraws",
    type: "number",
    headerName: "Draws",
    width: 100,
  },
];

const calculateScore = (data: CompetitionMatchRound, competitor: string) => {
  let score = 0;
  let numberOfWins = 0;
  let numberOfLosses = 0;
  let numberOfDraws = 0;
  data.rounds.forEach((round) => {
    round.matches.forEach((match) => {
      const outcome = outcomeCalculator(match.outcome);
      if (match.competitor1 === competitor && outcome === -1) {
        score += Number(data.win);
        numberOfWins++;
        return;
      } else if (match.competitor2 === competitor && outcome === 1) {
        score += Number(data.win);
        numberOfWins++;
        return;
      }

      if (match.competitor1 === competitor && outcome === 1) {
        score += Number(data.loss);
        numberOfLosses++;
        return;
      } else if (match.competitor2 === competitor && outcome === -1) {
        score += Number(data.loss);
        numberOfLosses++;
        return;
      }

      if (outcome === 0) {
        score += Number(data.draw);
        numberOfDraws++;
      }
    });
  });
  return { score, numberOfWins, numberOfLosses, numberOfDraws };
};

const CompetitionLeaderboard = ({ data }: ICompetitionViewProps) => {
  const allCompetitors = data.rounds
    .map((round) => {
      return round.matches.map((match) => {
        return [match.competitor1, match.competitor2];
      });
    })
    .flat()
    .flat();

  const allCompetitorsUnique = allCompetitors.filter(
    (value, index, self) => self.indexOf(value) === index,
  );

  const calculateScoreForAll = allCompetitorsUnique.map((competitor) => {
    return {
      id: competitor,
      name: competitor,
      ...calculateScore(data, competitor),
    };
  });

  return (
    <Box width={150 + 4 * 105}>
      <DataGrid rows={calculateScoreForAll} columns={columns} />
    </Box>
  );
};

export default CompetitionLeaderboard;

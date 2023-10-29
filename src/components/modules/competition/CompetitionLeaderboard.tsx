import { CompetitionMatchRound } from "@/api/@types/competition";
import { Box, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

interface ICompetitionViewProps {
  data: CompetitionMatchRound;
}

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
      if (match.competitor1 === competitor && match.outcome === "1-0") {
        score += Number(data.win);
        numberOfWins++;
        return;
      } else if (match.competitor2 === competitor && match.outcome === "0-1") {
        score += Number(data.win);
        numberOfWins++;
        return;
      }

      if (match.competitor1 === competitor && match.outcome === "0-1") {
        score += Number(data.loss);
        numberOfLosses++;
        return;
      } else if (match.competitor2 === competitor && match.outcome === "1-0") {
        score += Number(data.loss);
        numberOfLosses++;
        return;
      }

      if (
        match.outcome === "1-1" &&
        (match.competitor1 === competitor || match.competitor2 === competitor)
      ) {
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
    (value, index, self) => self.indexOf(value) === index && value !== "",
  );

  const calculateScoreForAll = allCompetitorsUnique.map((competitor) => {
    return {
      id: competitor,
      name: competitor,
      ...calculateScore(data, competitor),
    };
  });

  return (
    <Stack flexDirection={"row"} justifyContent={"center"}>
      <Box maxWidth={150 + 4 * 105} minWidth={0}>
        <DataGrid
          rows={calculateScoreForAll}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: "score",
                  sort: "desc",
                },
              ],
            },
            pagination: { paginationModel: { pageSize: 8 } },
          }}
        />
      </Box>
    </Stack>
  );
};

export default CompetitionLeaderboard;

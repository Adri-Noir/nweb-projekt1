import { Box, Typography } from "@mui/material";
import { CompetitionMatchRound } from "@/api/@types/competition";
import CompetitionLeaderboard from "@/components/modules/competition/CompetitionLeaderboard";

interface ICompetitionViewProps {
  data: CompetitionMatchRound;
}

const CompetitionView = ({ data }: ICompetitionViewProps) => {
  return (
    <Box>
      <Typography variant="h2">{data.name}</Typography>
      <CompetitionLeaderboard data={data} />
    </Box>
  );
};

export default CompetitionView;

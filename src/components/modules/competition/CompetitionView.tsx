import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { CompetitionMatchRound } from "@/api/@types/competition";
import CompetitionLeaderboard from "@/components/modules/competition/CompetitionLeaderboard";
import RoundView from "@/components/modules/competition/RoundView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const roundStatus = (round: CompetitionMatchRound["rounds"][0]) => {
  const notStarted = round.matches.every(
    (match) => match.outcome === "0-0" || match.competitor2 === "",
  );
  if (notStarted) return "Not Started";

  const completed = round.matches.every((match) => match.outcome !== "0-0");
  if (completed) return "Completed";

  return "In Progress";
};

const getColorBasedOnStatus = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "primary";
    case "Not Started":
      return "default";
    default:
      return "default";
  }
};

interface ICompetitionViewProps {
  data: CompetitionMatchRound;
  refetchData: () => void;
  showCopyToClipboard?: boolean;
}

const CompetitionView = ({
  data,
  refetchData,
  showCopyToClipboard = false,
}: ICompetitionViewProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setOpenSnackbar(true));
  };

  return (
    <Paper
      sx={{
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        borderRadius: 2,
      }}
      elevation={3}
    >
      <Stack
        direction={"row"}
        my={"1rem"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1rem"}
        width={"100%"}
      >
        <Link
          href={"/competition/" + data.id}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography textAlign={"center"} variant="h2">
            {data.name}
          </Typography>
        </Link>
        {showCopyToClipboard && (
          <IconButton onClick={copyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
        )}
      </Stack>

      <CompetitionLeaderboard data={data} />
      <Box mt={"0.5rem"}>
        {data.rounds.map((round, index) => (
          <Accordion
            key={round.id}
            defaultExpanded={
              roundStatus(round) === "In Progress" ||
              (index === 0 && roundStatus(round) !== "Completed")
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${round.id}panel${index + 1}-content`}
              id={`${round.id}panel${index + 1}-header`}
              sx={{
                "& .MuiAccordionSummary-content": {
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                },
              }}
            >
              <Typography variant="h6">Round {index + 1}</Typography>
              <Chip
                size={"small"}
                color={getColorBasedOnStatus(roundStatus(round))}
                label={roundStatus(round)}
              />
            </AccordionSummary>
            <AccordionDetails>
              <RoundView
                data={round.matches}
                competitionId={data.id}
                roundId={round.id}
                refetchData={refetchData}
                competitionUserId={data.user_id}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied competition URL to clipboard"
      />
    </Paper>
  );
};

export default CompetitionView;

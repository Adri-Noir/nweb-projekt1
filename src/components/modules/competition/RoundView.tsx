import React from "react";
import { CompetitionMatchRound } from "@/api/@types/competition";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { ApiPostAxios } from "@/api/client/ApiPost";
import { PostUpdateScore } from "@/api/client/routes";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ButtonWithDisable } from "@/components/common/ButtonWithDisableClick";

interface MutationData {
  competitionId: string;
  matchId: string;
  roundId: string;
  outcome: string;
}

const getButtonColor = (outcome: string, isCompetitor1: boolean) => {
  switch (outcome) {
    case "0-1":
      return isCompetitor1 ? "error" : "success";
    case "1-0":
      return isCompetitor1 ? "success" : "error";
    case "1-1":
      return "info";
    default:
      return "primary";
  }
};

const getMessage = (
  competitor1: string,
  competitor2: string,
  outcome: string,
) => {
  if (competitor2 === "") return `${competitor1} skips this round!`;

  switch (outcome) {
    case "0-1":
      return `${competitor2} won against ${competitor1}!`;
    case "1-0":
      return `${competitor1} won against ${competitor2}!`;
    case "1-1":
      return `${competitor1} and ${competitor2} drew!`;
    default:
      return "Match has not been played yet!";
  }
};

interface IRoundViewProps {
  data: CompetitionMatchRound["rounds"][0]["matches"];
  competitionId: string;
  roundId: string;
  refetchData: () => void;
  competitionUserId: string;
}

const RoundView = ({
  data,
  competitionId,
  roundId,
  refetchData,
  competitionUserId,
}: IRoundViewProps) => {
  const { user } = useUser();
  const isOwner = competitionUserId === user?.sub;

  const mutation = useMutation(
    (data: MutationData) => ApiPostAxios(data, PostUpdateScore),
    {
      onSuccess: () => {
        refetchData();
      },
    },
  );

  const onButtonClick = (outcome: string, matchId: string) => {
    if (!isOwner) return;
    mutation.mutate({
      competitionId,
      matchId,
      roundId,
      outcome,
    });
  };

  return (
    <>
      <Stack direction={"column"} justifyContent={"center"} gap={"1.75rem"}>
        {data.map((match) => (
          <Stack key={match.id} direction={"column"} gap={"0.25rem"}>
            <Typography variant={"body2"} textAlign={"center"}>
              {match.competitor1} vs {match.competitor2}
            </Typography>
            <Typography variant={"body2"} textAlign={"center"}>
              {getMessage(match.competitor1, match.competitor2, match.outcome)}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"0.5rem"}
            >
              <ButtonWithDisable
                variant="outlined"
                color={getButtonColor(match.outcome, true)}
                onClick={() => onButtonClick("1-0", match.id)}
                disabled={!isOwner}
              >
                {match.competitor1}
              </ButtonWithDisable>
              {match.competitor2 && (
                <>
                  <Box
                    sx={{
                      borderTop: "1px solid black",
                      height: "2px",
                      width: "8px",
                    }}
                  />
                  <ButtonWithDisable
                    variant="outlined"
                    color={getButtonColor(match.outcome, false)}
                    onClick={() => onButtonClick("0-1", match.id)}
                    disabled={!isOwner}
                  >
                    {match.competitor2}
                  </ButtonWithDisable>
                </>
              )}

              {isOwner && match.competitor2 !== "" && (
                <>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => onButtonClick("1-1", match.id)}
                  >
                    Draw
                  </Button>
                  <IconButton
                    size={"small"}
                    color={"error"}
                    onClick={() => onButtonClick("0-0", match.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default RoundView;

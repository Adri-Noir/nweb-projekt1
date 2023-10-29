import BodyWithHeader from "@/components/common/Layouts/BodyWithHeader";
import { useQuery } from "react-query";
import { ApiGetAxios } from "@/api/client/ApiGet";
import { GetCompetitions } from "@/api/client/routes";
import { GetCompetitionsResponse } from "@/api/@types/competition";
import CompetitionView from "@/components/modules/competition/CompetitionView";
import React from "react";
import { Backdrop, CircularProgress, Grid } from "@mui/material";

export default function Home() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "getAllCompetitions",
    queryFn: async () =>
      await ApiGetAxios<GetCompetitionsResponse>({}, GetCompetitions),
  });

  return (
    <BodyWithHeader refetchData={refetch}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container justifyContent={"space-around"} rowGap={"1rem"}>
        {data?.data &&
          !("error" in data.data) &&
          data?.data?.map((competition) => (
            <Grid item xs={11} md={5} key={competition.id}>
              <CompetitionView
                data={competition}
                key={competition.id}
                refetchData={refetch}
              />
            </Grid>
          ))}
      </Grid>
    </BodyWithHeader>
  );
}

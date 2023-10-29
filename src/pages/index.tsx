import BodyWithHeader from "@/components/common/Layouts/BodyWithHeader";
import { useQuery } from "react-query";
import { ApiGetAxios } from "@/api/client/ApiGet";
import { GetCompetitions } from "@/api/client/routes";
import { GetCompetitionsResponse } from "@/api/@types/competition";
import CompetitionView from "@/components/modules/competition/CompetitionView";
import React, { useState } from "react";
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import RenderWhen from "@/components/common/RenderWhen";

export default function Home() {
  const { data, isLoading, refetch, isError, isSuccess } = useQuery({
    queryKey: "getAllCompetitions",
    queryFn: async () =>
      await ApiGetAxios<GetCompetitionsResponse>({}, GetCompetitions),
  });

  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <BodyWithHeader
      refetchData={refetch}
      hideSearch={false}
      searchFn={handleSearchValueChange}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container justifyContent={"space-around"} rowGap={"1rem"}>
        {data?.data &&
          !("error" in data.data) &&
          data?.data
            ?.filter((value) =>
              value.name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((competition) => (
              <Grid item xs={11} md={5} key={competition.id}>
                <CompetitionView
                  data={competition}
                  key={competition.id}
                  refetchData={refetch}
                />
              </Grid>
            ))}
      </Grid>
      <RenderWhen condition={isError}>
        <Typography variant={"h5"} textAlign={"center"}>
          Something went wrong!
        </Typography>
      </RenderWhen>
      <RenderWhen
        condition={
          isSuccess &&
          !("error" in data.data) &&
          data?.data?.filter((value) =>
            value.name.toLowerCase().includes(searchValue.toLowerCase()),
          ).length === 0
        }
      >
        <Typography variant={"h5"} textAlign={"center"}>
          No competitions found!
        </Typography>
      </RenderWhen>
    </BodyWithHeader>
  );
}

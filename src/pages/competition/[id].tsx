import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GetCompetitionResponse } from "@/api/@types/competition";
import { GetCompetition } from "@/api/client/routes";
import { ApiPostAxios } from "@/api/client/ApiPost";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import CompetitionView from "@/components/modules/competition/CompetitionView";
import BodyWithHeader from "@/components/common/Layouts/BodyWithHeader";
import React from "react";

const SingleCompetition = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, refetch } = useQuery({
    queryKey: "getCompetition",
    enabled: !!id,
    queryFn: async () =>
      await ApiPostAxios<GetCompetitionResponse>({ id }, GetCompetition),
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
        {data?.data && !("error" in data.data) && (
          <Grid item xs={11} md={5} key={data.data.id}>
            <CompetitionView
              data={data.data}
              key={data.data.id}
              refetchData={refetch}
              showCopyToClipboard
            />
          </Grid>
        )}
      </Grid>
    </BodyWithHeader>
  );
};

export default SingleCompetition;

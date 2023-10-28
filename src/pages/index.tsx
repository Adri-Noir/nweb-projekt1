import { Inter } from "next/font/google";
import BodyWithHeader from "@/components/common/Layouts/BodyWithHeader";
import { useQuery } from "react-query";
import { ApiGetAxios } from "@/api/client/ApiGet";
import { GetCompetitions } from "@/api/client/routes";
import { GetCompetitionsResponse } from "@/api/@types/competition";
import CompetitionView from "@/components/modules/competition/CompetitionView";
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: "getAllCompetitions",
    queryFn: async () =>
      await ApiGetAxios<GetCompetitionsResponse>({}, GetCompetitions),
  });

  return (
    <BodyWithHeader>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {data?.data &&
        !("error" in data.data) &&
        data?.data?.map((competition) => (
          <CompetitionView data={competition} key={competition.id} />
        ))}
    </BodyWithHeader>
  );
}

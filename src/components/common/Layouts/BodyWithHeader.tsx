import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Header from "@/components/common/Header";

const BodyWithHeader = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box>
      <Header />
      <Box paddingTop={"1rem"}>{children}</Box>
    </Box>
  );
};

export default BodyWithHeader;

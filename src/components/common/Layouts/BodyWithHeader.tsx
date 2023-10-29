import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Header, { IHeaderProps } from "@/components/common/Header";

const BodyWithHeader = ({
  refetchData,
  searchFn,
  children,
}: PropsWithChildren<IHeaderProps>) => {
  return (
    <Box>
      <Header refetchData={refetchData} searchFn={searchFn} />
      <Box paddingY={"1rem"}>{children}</Box>
    </Box>
  );
};

export default BodyWithHeader;

import { Button, styled } from "@mui/material";

export const ButtonWithDisable = styled(Button)(({ theme, color }) => ({
  "&.Mui-disabled": {
    // @ts-ignore
    color: theme.palette[color].main,
    // @ts-ignore
    border: `1px solid ${theme.palette[color].main}80`,
  },
}));

import { createTheme } from "@mui/material";
import { blue, cyan, deepPurple, pink } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: deepPurple[400],
      light: deepPurple[300],
      dark: deepPurple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: cyan[400],
      light: cyan[300],
      dark: cyan[500],
      contrastText: "#fff",
    },
    info: {
      main: blue[400],
      light: blue[300],
      dark: blue[500],
      contrastText: "#fff",
    },
    warning: {
      main: pink[400],
      light: pink[300],
      dark: pink[500],
      contrastText: "#fff",
    },
  },
});

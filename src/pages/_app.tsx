import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className={"background"} />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

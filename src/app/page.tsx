"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import Title from "../components/Title";
import UserFlow from "../components/UserQuestions/UserFlow";
import theme from "../context/theme";
import Loader from "../components/UserQuestions/Loader";

export default function Home() {
  useEffect(() => {
    // disable scrolling when mounted
    document.body.style.overflow = "hidden";

    return () => {
      // enable scrolling when unmounted
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Title />
        <UserFlow />
        <Loader />
      </ThemeProvider>
    </main>
  );
}

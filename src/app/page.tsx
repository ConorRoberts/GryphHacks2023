"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import Title from "../components/Title";
import UserFlow from "../components/UserQuestions/UserFlow";
import theme from "../context/theme";
import Loader from "../components/UserQuestions/Loader";

export default function Home() {
  const [habitLoading, setHabitLoading] = useState(false);

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
        <UserFlow setHabitLoading={setHabitLoading} habitLoading={habitLoading} />
        <Loader habitLoading={habitLoading} />
      </ThemeProvider>
    </main>
  );
}

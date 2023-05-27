"use client";
import { ThemeProvider } from "@mui/material/styles";
import Title from "../components/Title";
import UserFlow from "../components/UserQuestions/UserFlow";
import theme from "../context/theme";

export default function Home() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Title />
        <UserFlow />
      </ThemeProvider>
    </main>
  );
}

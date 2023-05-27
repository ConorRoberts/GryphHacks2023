"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../context/theme";
import Title from "../components/Title";
import UserFlow from "../components/UserQuestions/UserFlow";

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

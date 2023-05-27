"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../context/theme";
import Title from "../components/Title";
import MainSearch from "../components/UserQuestions/MainSearch";

export default function Home() {
    return (
        <main>
            <ThemeProvider theme={theme}>
                <Title />
                <MainSearch />
            </ThemeProvider>
        </main>
    );
}

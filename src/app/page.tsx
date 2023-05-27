"use client";
import MainSearch from "../components/MainSearch";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../context/theme";

export default function Home() {
    return (
        <main>
            <ThemeProvider theme={theme}>
                <MainSearch />
            </ThemeProvider>
        </main>
    );
}

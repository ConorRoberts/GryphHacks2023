"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/context/theme";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

// need to re-include the meta data

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ThemeProvider theme={theme}>
                <body className={inter.className}>{children}</body>
            </ThemeProvider>
        </html>
    );
}

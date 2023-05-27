"use client";
import { Typography, Box } from "@mui/material";
import React from "react";

const Title = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 5,
                }}
            >
                <Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
                    Habit Maker
                </Typography>
                <Typography variant="h6" component="h1" sx={{ m: 0, opacity: 0.3 }}>
                    powered by AI
                </Typography>
            </Box>
        </>
    );
};

export default Title;

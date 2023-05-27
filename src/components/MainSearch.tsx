"use client";
import React, { useState } from "react";
import { Box, Typography, Input, useTheme } from "@mui/material";

const MainSearch: React.FC = () => {
    const theme = useTheme();
    const [promptValue, setPromptValue] = useState<string | undefined>();

    return (
        <Box>
            <Box
                sx={{
                    flexDirection: { xs: "column", lg: "row" },
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pb: 7,
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    color="primary"
                    sx={{ mr: 2, mb: { xs: 4, lg: 0.3 }, fontSize: { xs: 26, sm: 30, md: 33, lg: 35 } }}
                >
                    I want to build a habit of...
                </Typography>
                <Input
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: theme.palette.primary.main,
                        },
                        "&:focus-within .MuiInput-underline:before": {
                            borderBottomColor: theme.palette.primary.main,
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: theme.palette.primary.main,
                        },
                        "& .MuiInputBase-input": {
                            color: theme.palette.primary.main,
                            paddingBottom: 0,
                            fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
                            width: { xs: 350, md: 470, lg: 450 },
                        },
                    }}
                    placeholder="eating healthier"
                    noValidate
                    autoComplete="off"
                    multiline
                    hiddenLabel
                    id="prompt"
                    variant="outlined"
                    value={promptValue}
                    onChange={(event) => {
                        setPromptValue(event.target.value);
                    }}
                />
            </Box>
        </Box>
    );
};

export default MainSearch;

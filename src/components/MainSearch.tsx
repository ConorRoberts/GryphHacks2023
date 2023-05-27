"use client";
import React, { useState } from "react";
import { Box, Typography, Input, useTheme } from "@mui/material";

const MainSearch: React.FC = () => {
    const theme = useTheme();
    const [promptValue, setPromptValue] = useState<string | undefined>();

    return (
        <Box sx={{ mt: 10 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                }}
            >
                <Typography variant="h2" component="h1" color="primary" sx={{ mr: 2, mb: 0.3 }}>
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
                            fontSize: 23,
                            width: 350,
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

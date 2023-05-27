"use client";
import HandymanTwoToneIcon from "@mui/icons-material/HandymanTwoTone";
import { Box, IconButton, Input, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { scrollDown } from "../../utils/helper";
import axios from "axios";
import type { OpenAIApi } from "openai";

type GeneratedUserQuiz = Awaited<ReturnType<OpenAIApi["createCompletion"]>>;

const MainSearch: React.FC = () => {
  const theme = useTheme();
  const [promptValue, setPromptValue] = useState("");

  const submitHabit = async () => {
    try {
      const prompt = `I want to build a habit of ${promptValue}`;
      const response = await axios.post<GeneratedUserQuiz>("/api/questions/generate-user-quiz/", {
        params: {
          prompt: prompt,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          height: "60vh",
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
          sx={{
            mr: 2,
            mb: { xs: 4, lg: 0 },
            fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
          }}
        >
          I want to build a habit of...
        </Typography>
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              scrollDown();
            }}
          >
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
              placeholder="day drinking"
              autoComplete="off"
              value={promptValue}
              onChange={(event) => {
                setPromptValue(event.target.value);
              }}
            />
            <Tooltip title="Generate Plan" placement="top">
              <IconButton aria-label="enter" size="large" onClick={() => promptValue && submitHabit()}>
                <HandymanTwoToneIcon sx={{ fontSize: 29 }} />
              </IconButton>
            </Tooltip>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSearch;

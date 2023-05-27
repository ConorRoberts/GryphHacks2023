"use client";
import HandymanTwoToneIcon from "@mui/icons-material/HandymanTwoTone";
import { Box, IconButton, Input, Tooltip, Typography, useTheme, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { scrollDown } from "../../utils/helper";

const MainSearch: React.FC = ({ loading, promptValue, setPromptValue, submitHabit }) => {
  const theme = useTheme();

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
                  color: "#000",
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
              onKeyDown={(event) => {
                if (event.key === "Enter" && promptValue) {
                  submitHabit();
                }
              }}
            />
            <Tooltip title={!loading ? "Generate Plan" : "Generating... be patient"} placement="top">
              <IconButton aria-label="enter" size="large" onClick={() => promptValue && submitHabit()}>
                {!loading ? <HandymanTwoToneIcon sx={{ fontSize: 29 }} /> : <CircularProgress />}
              </IconButton>
            </Tooltip>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSearch;
